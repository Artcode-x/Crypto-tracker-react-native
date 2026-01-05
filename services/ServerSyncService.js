import AsyncStorage from "@react-native-async-storage/async-storage"
import { AppState, Platform } from "react-native"

// Конфигурация сервера
const SERVER_CONFIG = {
  BASE_URL: "http://192.168.1.144:3000",
  TIMEOUT: 10000,
  RETRY_COUNT: 3,
  RETRY_DELAY: 1000
}

class ServerSyncService {
  static deviceToken = null
  static appState = "active"
  static isInitialized = false
  static serverAvailable = false
  static pendingOperations = []
  static lastSyncTime = null
  static lastRegistrationTime = 0 // время последней регистрации

  // Инициализация службы
  static async initialize(fcmToken) {
    try {
      console.log("Инициализация ServerSyncService...")

      this.deviceToken = fcmToken
      this.isInitialized = true

      // Проверка доступности сервера
      await this.checkServerAvailability()

      // Регистрация устройства на сервере
      if (this.serverAvailable) {
        await this.registerDevice(fcmToken)
      }

      // Восстановление отложенных операций
      await this.processPendingOperations()

      console.log("ServerSyncService инициализирован")
      return true
    } catch (error) {
      console.warn("⚠️ Ошибка инициализации ServerSyncService:", error.message)
      return false
    }
  }

  // Проверка доступности сервера
  static async checkServerAvailability() {
    try {
      const response = await fetch(`${SERVER_CONFIG.BASE_URL}/ping`, {
        method: "GET",
        timeout: 5000
      })

      if (response.ok) {
        this.serverAvailable = true
        console.log("Сервер доступен")
      } else {
        this.serverAvailable = false
        console.warn("Сервер недоступен")
      }
    } catch (error) {
      this.serverAvailable = false
      console.warn("Не удалось подключиться к серверу:", error.message)
    }
  }

  // Регистрация устройства на сервере
  static async registerDevice(fcmToken) {
    // Проверка: если токен совпадает и регистрировали менее 30 секунд назад - пропускаем
    if (this.deviceToken === fcmToken && Date.now() - this.lastRegistrationTime < 30000) {
      console.log("Пропускаем регистрацию: уже регистрировали менее 30 секунд назад")
      return true
    }
    // ★★★★★★★★★★★★★★★★★★★★★★★★★

    if (!this.serverAvailable) {
      console.log("Сервер недоступен, откладываем регистрацию")
      this.addPendingOperation("register", { deviceToken: fcmToken })
      return false
    }

    try {
      const response = await fetch(`${SERVER_CONFIG.BASE_URL}/register-device`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          deviceToken: fcmToken,
          appState: this.appState,
          platform: Platform.OS,
          timestamp: new Date().toISOString()
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()

      // ★★★★ ЗАПОМИНАЕМ ВРЕМЯ РЕГИСТРАЦИИ ★★★★
      this.lastRegistrationTime = Date.now()

      console.log("Устройство зарегистрировано на сервере")
      return data.success
    } catch (error) {
      console.warn("Не удалось зарегистрировать устройство:", error.message)
      this.addPendingOperation("register", { deviceToken: fcmToken })
      return false
    }
  }

  // Синхронизация алертов с сервером
  static async syncAlertsWithServer(alerts) {
    // Если приложение активно - используем локальные уведомления
    if (this.appState === "active") {
      console.log("Приложение активно, используем локальные уведомления")
      return false
    }

    if (!this.deviceToken) {
      console.warn("FCM токен не доступен для синхронизации")
      return false
    }

    if (!this.serverAvailable) {
      console.log("Сервер недоступен, откладываем синхронизацию")
      this.addPendingOperation("sync", { alerts })
      return false
    }

    try {
      const activeAlerts = alerts.filter((alert) => alert.isActive && !alert.triggeredAt)

      console.log(`Синхронизация ${activeAlerts.length} активных алертов...`)

      const response = await fetch(`${SERVER_CONFIG.BASE_URL}/sync-alerts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          deviceToken: this.deviceToken,
          alerts: activeAlerts,
          appState: this.appState,
          timestamp: new Date().toISOString()
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()
      this.lastSyncTime = new Date().toISOString()

      console.log(`Алерты синхронизированы с сервером: ${data.count} шт.`)
      return data.success
    } catch (error) {
      console.warn("Не удалось синхронизировать алерты:", error.message)
      this.addPendingOperation("sync", { alerts })
      return false
    }
  }

  // Удаление алерта с сервера
  static async deleteAlertFromServer(alertId) {
    if (!this.deviceToken || !this.serverAvailable) {
      console.log("Не удалось удалить алерт, сервер недоступен")
      this.addPendingOperation("delete", { alertId })
      return false
    }

    try {
      const response = await fetch(`${SERVER_CONFIG.BASE_URL}/delete-alert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          deviceToken: this.deviceToken,
          alertId: alertId,
          timestamp: new Date().toISOString()
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      console.log(`Алерт удален с сервера: ${alertId}`)
      return true
    } catch (error) {
      console.warn("Не удалось удалить алерт с сервера:", error.message)
      this.addPendingOperation("delete", { alertId })
      return false
    }
  }

  // Обновление состояния приложения на сервере
  static async updateAppStateOnServer(newState) {
    this.appState = newState

    if (!this.deviceToken || !this.serverAvailable) {
      return false
    }

    try {
      const response = await fetch(`${SERVER_CONFIG.BASE_URL}/update-app-state`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          deviceToken: this.deviceToken,
          appState: newState,
          timestamp: new Date().toISOString()
        })
      })

      return response.ok
    } catch (error) {
      console.warn("⚠️ Не удалось обновить состояние приложения:", error.message)
      return false
    }
  }

  // Добавление операции в очередь ожидания
  static addPendingOperation(type, data) {
    this.pendingOperations.push({
      type,
      data,
      timestamp: new Date().toISOString(),
      retryCount: 0
    })

    // Сохраняем очередь в AsyncStorage
    this.savePendingOperations()
  }

  // Обработка отложенных операций
  static async processPendingOperations() {
    if (this.pendingOperations.length === 0 || !this.serverAvailable) {
      return
    }

    console.log(`Обработка ${this.pendingOperations.length} отложенных операций...`)

    const successfulOperations = []

    for (const operation of this.pendingOperations) {
      try {
        let success = false

        switch (operation.type) {
          case "register":
            success = await this.registerDevice(operation.data.deviceToken)
            break
          case "sync":
            success = await this.syncAlertsWithServer(operation.data.alerts)
            break
          case "delete":
            success = await this.deleteAlertFromServer(operation.data.alertId)
            break
        }

        if (success) {
          successfulOperations.push(operation)
        } else {
          operation.retryCount++
          // Если операция провалилась 3 раза, удаляем ее
          if (operation.retryCount >= 3) {
            console.warn(`Удаляем операцию после 3 неудачных попыток: ${operation.type}`)
            successfulOperations.push(operation)
          }
        }
      } catch (error) {
        console.warn(`Ошибка обработки операции ${operation.type}:`, error.message)
        operation.retryCount++
      }
    }

    // Удаляем успешные операции из очереди
    this.pendingOperations = this.pendingOperations.filter(
      (op) => !successfulOperations.includes(op)
    )

    await this.savePendingOperations()
  }

  // Сохранение очереди операций в AsyncStorage
  static async savePendingOperations() {
    try {
      await AsyncStorage.setItem(
        "pending_server_operations",
        JSON.stringify(this.pendingOperations)
      )
    } catch (error) {
      console.warn("Не удалось сохранить очередь операций:", error)
    }
  }

  // Загрузка очереди операций из AsyncStorage
  static async loadPendingOperations() {
    try {
      const operationsJson = await AsyncStorage.getItem("pending_server_operations")
      if (operationsJson) {
        this.pendingOperations = JSON.parse(operationsJson)
        console.log(`Загружено ${this.pendingOperations.length} отложенных операций`)
      }
    } catch (error) {
      console.warn("Не удалось загрузить очередь операций:", error)
    }
  }

  // Получение статуса синхронизации
  static getStatus() {
    return {
      initialized: this.isInitialized,
      serverAvailable: this.serverAvailable,
      deviceToken: this.deviceToken ? "Есть" : "Нет",
      appState: this.appState,
      pendingOperations: this.pendingOperations.length,
      lastSyncTime: this.lastSyncTime
    }
  }

  // Проверка, нужно ли синхронизировать с сервером
  static shouldSyncWithServer() {
    return this.appState !== "active" && this.deviceToken !== null
  }

  // Тестирование подключения к серверу
  static async testConnection() {
    try {
      const startTime = Date.now()
      const response = await fetch(`${SERVER_CONFIG.BASE_URL}/ping`)
      const endTime = Date.now()

      if (response.ok) {
        const data = await response.json()
        return {
          success: true,
          ping: endTime - startTime,
          status: data.status,
          timestamp: data.timestamp
        }
      } else {
        return {
          success: false,
          error: `HTTP ${response.status}`
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Сброс состояния службы
  static reset() {
    this.deviceToken = null
    this.isInitialized = false
    this.serverAvailable = false
    this.pendingOperations = []
    this.lastSyncTime = null
    this.lastRegistrationTime = 0 // Сброс времени регистрации
    console.log("ServerSyncService сброшен")
  }
}

// Загружаем отложенные операции при импорте
ServerSyncService.loadPendingOperations()

export default ServerSyncService
