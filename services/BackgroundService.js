import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"
import AsyncStorage from "@react-native-async-storage/async-storage"
import NotificationService from "./NotificationService"
import { fetchCurrentPrices } from "../components/Api/Api"
import store from "../store/store"
import { updatePriceAlert } from "../store/alertsSlice"
import { Platform } from "react-native"

// Название фоновой задачи
const BACKGROUND_TASK = "CHECK_PRICE_ALERTS"

// Регистрация задачи
TaskManager.defineTask(BACKGROUND_TASK, async () => {
  console.log("Фоновая задача запущена:", new Date().toLocaleTimeString())

  try {
    // 1. Получение сохраненных алертов из AsyncStorage
    const alertsJson = await AsyncStorage.getItem("priceAlerts")
    if (!alertsJson) {
      console.log("Нет сохраненных алертов")
      return BackgroundFetch.BackgroundFetchResult.NoData
    }

    const alerts = JSON.parse(alertsJson)
    const activeAlerts = alerts.filter((alert) => alert.isActive && !alert.triggeredAt)

    console.log(`Активных алертов: ${activeAlerts.length}`)

    if (activeAlerts.length === 0) {
      return BackgroundFetch.BackgroundFetchResult.NoData
    }

    // 2. Получение ID всех монет для проверки
    const coinIds = [...new Set(activeAlerts.map((alert) => alert.coinId))]
    console.log(`Монет для проверки: ${coinIds.length}`)

    // 3. Получение текущих цен
    const currentPrices = await fetchCurrentPrices(coinIds)

    // 4. Проверка каждого алерта
    const triggeredAlerts = []

    for (const alert of activeAlerts) {
      const currentPrice = currentPrices[alert.coinId]
      if (!currentPrice) continue

      const shouldTrigger = checkAlertCondition(
        alert.condition,
        alert.targetPrice,
        currentPrice
      )

      if (shouldTrigger) {
        console.log(`Сработал алерт: ${alert.coinName} @ $${currentPrice}`)
        triggeredAlerts.push({
          ...alert,
          currentPrice
        })
      }
    }

    // 5. Отправка уведомления и обновление алертов
    if (triggeredAlerts.length > 0) {
      console.log(`Отправляем ${triggeredAlerts.length} уведомлений`)

      for (const alert of triggeredAlerts) {
        // Отправка уведомления
        await NotificationService.sendPriceAlertNotification(alert)

        // Помечаем как сработавший в AsyncStorage
        const updatedAlerts = alerts.map((a) =>
          a.id === alert.id
            ? {
                ...a,
                triggeredAt: new Date().toISOString(),
                isActive: false,
                currentPrice: alert.currentPrice
              }
            : a
        )

        // Сохраняем обратно в AsyncStorage
        await AsyncStorage.setItem("priceAlerts", JSON.stringify(updatedAlerts))

        // СИНХРОНИЗИРУЕМ С REDUX
        try {
          if (store && store.dispatch) {
            store.dispatch(
              updatePriceAlert({
                id: alert.id,
                updates: {
                  triggeredAt: new Date().toISOString(),
                  isActive: false,
                  currentPrice: alert.currentPrice
                }
              })
            )
            console.log(`Алёрт ${alert.id} синхронизирован с Redux`)
          }
        } catch (error) {
          console.error("Ошибка синхронизации с Redux:", error)
        }
      }
    }

    // 6. Сохраняем время последней проверки
    await AsyncStorage.setItem("lastBackgroundCheck", new Date().toISOString())

    return BackgroundFetch.BackgroundFetchResult.NewData
  } catch (error) {
    console.error("Ошибка в фоновой задаче:", error)
    return BackgroundFetch.BackgroundFetchResult.Failed
  }
})

// Функция проверки условий алерта
function checkAlertCondition(condition, targetPrice, currentPrice) {
  switch (condition) {
    case "above":
      return currentPrice >= targetPrice
    case "below":
      return currentPrice <= targetPrice
    case "equals":
      return Math.abs(currentPrice - targetPrice) < 0.01
    default:
      return false
  }
}

//  Функция синхронизации Redux ↔ AsyncStorage
export async function syncAlertsWithStorage() {
  try {
    console.log("Синхронизация Redux ↔ AsyncStorage...")

    const storageAlertsJson = await AsyncStorage.getItem("priceAlerts")
    const storageAlerts = storageAlertsJson ? JSON.parse(storageAlertsJson) : []

    const reduxState = store.getState()
    const reduxAlerts = reduxState.alerts.alerts || []

    console.log(`AsyncStorage: ${storageAlerts.length} алертов`)
    console.log(`Redux: ${reduxAlerts.length} алертов`)

    // Если AsyncStorage пуст, а Redux нет - сохраняем из Redux
    if (storageAlerts.length === 0 && reduxAlerts.length > 0) {
      console.log("Сохраняем алерты из Redux в AsyncStorage...")
      await AsyncStorage.setItem("priceAlerts", JSON.stringify(reduxAlerts))
      return { synced: true, source: "redux", count: reduxAlerts.length }
    }

    // Если есть расхождения, синхронизируем
    if (JSON.stringify(storageAlerts) !== JSON.stringify(reduxAlerts)) {
      console.log("⚠️ Обнаружены расхождения, синхронизируем...")

      const storageLastModified = await AsyncStorage.getItem("lastBackgroundCheck")
      const reduxHasNewAlerts = reduxAlerts.some(
        (alert) => !storageAlerts.find((sa) => sa.id === alert.id)
      )

      if (reduxHasNewAlerts) {
        await AsyncStorage.setItem("priceAlerts", JSON.stringify(reduxAlerts))
      } else if (storageLastModified) {
        storageAlerts.forEach((alert) => {
          store.dispatch(
            updatePriceAlert({
              id: alert.id,
              updates: alert
            })
          )
        })
      }

      return { synced: true, merged: true }
    }

    console.log("Данные уже синхронизированы")
    return { synced: true, unchanged: true }
  } catch (error) {
    console.error("Ошибка синхронизации:", error)
    return { synced: false, error: error.message }
  }
}

//  Функция регистрации фоновой задачи (ЭКСПЕРИМЕНТАЛЬНЫЙ ВАРИАНТ)
export async function registerBackgroundTask() {
  try {
    console.log("📱 Попытка регистрации фоновой задачи...")

    // Проверка, зарегистрирована ли уже задача
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_TASK)
    console.log("Задача уже зарегистрирована?", isRegistered)

    if (!isRegistered) {
      console.log("Пытаемся зарегистрировать задачу...")

      // ПРОБУЕМ РАЗНЫЕ ВАРИАНТЫ ДЛЯ EXPO GO

      // Вариант 1: Старый API (может работать в Expo Go)
      try {
        console.log("Пробуем старый API...")
        await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK, {
          minimumInterval: 15 * 60, // 15 минут
          stopOnTerminate: false,
          startOnBoot: true
        })
        console.log("Фоновая задача зарегистрирована (старый API)")

        // Запускаем синхронизацию
        await syncAlertsWithStorage()

        return {
          success: true,
          message: "Task registered with old API",
          method: "old_api"
        }
      } catch (oldApiError) {
        console.warn(" Старый API не сработал:", oldApiError.message)

        // Вариант 2: Пробуем через setTimeout для Expo Go
        console.log("Пробуем альтернативный подход для Expo Go...")

        // Для Expo Go просто сохраняем задачу в AsyncStorage
        // и будем проверять при открытии приложения
        await AsyncStorage.setItem("backgroundTaskEnabled", "true")
        console.log("Для Expo Go используем альтернативный подход")

        return {
          success: true,
          message: "Using alternative approach for Expo Go",
          method: "expo_go_fallback"
        }
      }
    } else {
      console.log("Фоновая задача уже зарегистрирована")
      return {
        success: true,
        message: "Task already registered",
        method: "already_registered"
      }
    }
  } catch (error) {
    console.error("Общая ошибка регистрации фоновой задачи:", error)

    // Даже при ошибке продолжаем работу
    console.log(
      "⚠️Продолжаем без фоновой задачи, используем проверку при открытии приложения"
    )
    await AsyncStorage.setItem("backgroundTaskEnabled", "true")

    return {
      success: false,
      error: error.message,
      fallback: "using_app_open_check"
    }
  }
}

// 🔧 Функция отмены фоновой задачи (ИСПРАВЛЕННАЯ)
export async function unregisterBackgroundTask() {
  try {
    console.log("Попытка отмены фоновой задачи...")

    // Проверяем зарегистрирована ли задача
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_TASK)

    if (isRegistered) {
      console.log("Отменяем задачу...")
      // ⚠️ Старый API для отмены
      await BackgroundFetch.unregisterTaskAsync(BACKGROUND_TASK)
      console.log("Фоновая задача отменена")
    } else {
      console.log("Задача не была зарегистрирована, пропускаем отмену")
    }

    // Всегда очищаем флаг в AsyncStorage
    await AsyncStorage.removeItem("backgroundTaskEnabled")

    return { success: true }
  } catch (error) {
    console.error("Ошибка отмены фоновой задачи:", error.message)

    // Все равно очищаем флаг
    try {
      await AsyncStorage.removeItem("backgroundTaskEnabled")
    } catch (e) {}

    return {
      success: false,
      error: error.message
    }
  }
}

//  Функция для отладки
export async function getBackgroundTaskStatus() {
  try {
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_TASK)
    const status = await BackgroundFetch.getStatusAsync()
    const lastCheck = await AsyncStorage.getItem("lastBackgroundCheck")
    const backgroundTaskEnabled = await AsyncStorage.getItem("backgroundTaskEnabled")

    return {
      isRegistered,
      status,
      backgroundTaskEnabled: backgroundTaskEnabled === "true",
      lastCheck: lastCheck ? new Date(lastCheck).toLocaleString() : "Никогда",
      taskName: BACKGROUND_TASK,
      platform: Platform?.OS || "unknown"
    }
  } catch (error) {
    return {
      error: error.message,
      platform: Platform?.OS || "unknown"
    }
  }
}

//  Простая проверка алертов (для использования когда фоновая задача не работает)
export async function checkAlertsManually() {
  try {
    console.log("Ручная проверка алертов...")

    const alertsJson = await AsyncStorage.getItem("priceAlerts")
    if (!alertsJson) {
      console.log("Нет алертов для проверки")
      return { checked: 0, triggered: 0 }
    }

    const alerts = JSON.parse(alertsJson)
    const activeAlerts = alerts.filter((alert) => alert.isActive && !alert.triggeredAt)

    console.log(`Проверяем ${activeAlerts.length} активных алертов`)

    if (activeAlerts.length === 0) {
      return { checked: 0, triggered: 0 }
    }

    // Получаем цены
    const coinIds = [...new Set(activeAlerts.map((alert) => alert.coinId))]
    const currentPrices = await fetchCurrentPrices(coinIds)

    let triggeredCount = 0

    for (const alert of activeAlerts) {
      const currentPrice = currentPrices[alert.coinId]
      if (!currentPrice) continue

      const shouldTrigger = checkAlertCondition(
        alert.condition,
        alert.targetPrice,
        currentPrice
      )

      if (shouldTrigger) {
        console.log(`Ручная проверка: ${alert.coinName} @ $${currentPrice}`)
        triggeredCount++

        // Отправляем уведомление
        await NotificationService.sendPriceAlertNotification({
          ...alert,
          currentPrice
        })

        // Обновляем в AsyncStorage
        const updatedAlerts = alerts.map((a) =>
          a.id === alert.id
            ? {
                ...a,
                triggeredAt: new Date().toISOString(),
                isActive: false,
                currentPrice: currentPrice
              }
            : a
        )

        await AsyncStorage.setItem("priceAlerts", JSON.stringify(updatedAlerts))

        // Синхронизируем с Redux
        if (store && store.dispatch) {
          store.dispatch(
            updatePriceAlert({
              id: alert.id,
              updates: {
                triggeredAt: new Date().toISOString(),
                isActive: false,
                currentPrice: currentPrice
              }
            })
          )
        }
      }
    }

    console.log(`Ручная проверка завершена: сработало ${triggeredCount} алертов`)
    return { checked: activeAlerts.length, triggered: triggeredCount }
  } catch (error) {
    console.error("Ошибка ручной проверки:", error)
    return { error: error.message }
  }
}

export { BACKGROUND_TASK }
