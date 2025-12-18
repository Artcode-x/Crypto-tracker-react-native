import { configureStore } from "@reduxjs/toolkit"
import AsyncStorage from "@react-native-async-storage/async-storage"
import reducersSlice from "./reducersSlice"
import alertsSlice from "./alertsSlice"

// Константы
const ALERTS_STORAGE_KEY = "priceAlerts"
const LAST_SYNC_KEY = "last_alerts_sync"

// Middleware для автоматической синхронизации алертов с AsyncStorage
const alertsStorageMiddleware = (store) => (next) => (action) => {
  // Список всех действий, которые меняют состояние алертов
  const alertsActions = [
    "alerts/addPriceAlert",
    "alerts/updatePriceAlert",
    "alerts/deletePriceAlert",
    "alerts/markAlertAsRead",
    "alerts/markAllAlertsAsRead",
    "alerts/setLastAlertCheck",
    "alerts/updateAlertPrices",
    "alerts/triggerAlert",
    "alerts/clearAllAlerts",
    "alerts/clearTriggeredAlerts",
    "alerts/restoreAlert",
    "alerts/loadAlerts"
  ]

  // Определяем, является ли действие действием алерта
  const isAlertAction = alertsActions.includes(action.type)

  // Выполняем действие
  const result = next(action)

  // Если действие изменяет алерты - синхронизируем с AsyncStorage
  if (isAlertAction) {
    // Получаем текущее состояние алертов
    const state = store.getState()
    const alerts = state.alerts.alerts || []

    // Асинхронно сохраняем в AsyncStorage
    AsyncStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(alerts))
      .then(() => {
        // Сохраняем время последней синхронизации
        const syncTime = new Date().toISOString()
        AsyncStorage.setItem(LAST_SYNC_KEY, syncTime)

        // Логируем детали для отладки
        if (alerts.length > 0) {
          const activeAlerts = alerts.filter((a) => a.isActive && !a.triggeredAt).length
          const triggeredAlerts = alerts.filter((a) => a.triggeredAt).length
        }
      })
      .catch((error) => {
        console.error("Ошибка сохранения алертов в AsyncStorage:", error)

        // Попытка сохранить информацию об ошибке
        AsyncStorage.setItem(
          "last_sync_error",
          JSON.stringify({
            timestamp: new Date().toISOString(),
            error: error.message,
            action: action.type
          })
        ).catch(() => {})
      })
  }

  return result
}

// Middleware для логирования действий (опционально, для отладки)
const loggingMiddleware = (store) => (next) => (action) => {
  // Пропускаем определенные частые действия, чтобы не засорять логи
  const skipLogging = [
    "store/setMarketCurrentPage",
    "store/setMarketIsLoadingMore",
    "store/setMarketLastUpdated"
  ]

  // if (!skipLogging.includes(action.type)) {
  //   console.log(`Redux Action: ${action.type}`, {
  //     payload: action.payload,
  //     timestamp: new Date().toISOString()
  //   })
  // }

  const result = next(action)

  // Логируем состояние после действия для ключевых действий
  const keyActions = [
    "alerts/addPriceAlert",
    "alerts/deletePriceAlert",
    "alerts/triggerAlert",
    "store/addCoin",
    "store/removeCoin"
  ]

  if (keyActions.includes(action.type)) {
    const state = store.getState()

    if (action.type.includes("alerts/")) {
      const alertCount = state.alerts.alerts.length
      const activeCount = state.alerts.alerts.filter(
        (a) => a.isActive && !a.triggeredAt
      ).length
      console.log(`Состояние алертов: Всего ${alertCount}, Активных ${activeCount}`)
    }

    if (action.type.includes("store/") && action.type.includes("Coin")) {
      const favoriteCount = state.store.coin.length
      console.log(`Состояние избранного: ${favoriteCount} монет`)
    }
  }

  return result
}

// Функция для начальной загрузки данных из AsyncStorage
export const loadInitialData = async () => {
  console.log("Начальная загрузка данных из AsyncStorage...")

  try {
    // Загружаем алерты
    const alertsJson = await AsyncStorage.getItem(ALERTS_STORAGE_KEY)
    const lastSync = await AsyncStorage.getItem(LAST_SYNC_KEY)

    let alertsData = null
    if (alertsJson) {
      try {
        const parsedAlerts = JSON.parse(alertsJson)
        // Валидация данных
        if (Array.isArray(parsedAlerts)) {
          alertsData = {
            alerts: parsedAlerts,
            lastCheckTime: null,
            unreadCount: parsedAlerts.filter((a) => !a.isRead).length
          }
          console.log(`Загружено ${parsedAlerts.length} алертов из AsyncStorage`)
        } else {
          console.warn("Данные алертов в AsyncStorage не являются массивом")
        }
      } catch (parseError) {
        console.error("Ошибка парсинга алертов из AsyncStorage:", parseError)
      }
    } else {
      console.log("Алёрты не найдены в AsyncStorage")
    }

    // Загружаем другие данные при необходимости
    // Например, избранные монеты, настройки и т.д.

    return {
      alerts: alertsData,
      lastSync: lastSync || new Date().toISOString(),
      loadedAt: new Date().toISOString()
    }
  } catch (error) {
    console.error("Ошибка при начальной загрузке данных:", error)
    return {
      alerts: null,
      lastSync: null,
      error: error.message,
      loadedAt: new Date().toISOString()
    }
  }
}

// Функция для очистки данных хранилища (для отладки)
export const clearStorageData = async () => {
  console.log("Очистка данных AsyncStorage...")

  try {
    await AsyncStorage.removeItem(ALERTS_STORAGE_KEY)
    await AsyncStorage.removeItem(LAST_SYNC_KEY)
    await AsyncStorage.removeItem("last_sync_error")

    console.log("Данные AsyncStorage очищены")
    return { success: true }
  } catch (error) {
    console.error("Ошибка очистки AsyncStorage:", error)
    return { success: false, error: error.message }
  }
}

// Функция для проверки состояния хранилища
export const getStorageStatus = async () => {
  try {
    const alertsJson = await AsyncStorage.getItem(ALERTS_STORAGE_KEY)
    const lastSync = await AsyncStorage.getItem(LAST_SYNC_KEY)
    const lastError = await AsyncStorage.getItem("last_sync_error")

    let alertCount = 0
    if (alertsJson) {
      try {
        const alerts = JSON.parse(alertsJson)
        alertCount = Array.isArray(alerts) ? alerts.length : 0
      } catch (e) {
        alertCount = -1 // Ошибка парсинга
      }
    }

    return {
      alertsCount: alertCount,
      lastSync: lastSync || "Никогда",
      lastError: lastError ? JSON.parse(lastError) : null,
      storageKeys: await AsyncStorage.getAllKeys(),
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    return {
      error: error.message,
      timestamp: new Date().toISOString()
    }
  }
}

// Настройка Redux Store
const store = configureStore({
  reducer: {
    store: reducersSlice,
    alerts: alertsSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Отключаем проверку сериализации для некоторых типов данных
      serializableCheck: {
        ignoredActions: [
          "alerts/loadAlerts",
          "alerts/addPriceAlert",
          "alerts/updatePriceAlert"
        ],
        ignoredPaths: ["alerts.alerts"]
      }
    }).concat(
      alertsStorageMiddleware,
      loggingMiddleware // Можно убрать в production
    ),

  // Включение Redux DevTools в development
  devTools: process.env.NODE_ENV !== "production"
})

// Экспорт вспомогательных функций
export { ALERTS_STORAGE_KEY as alertsStorageKey }

export default store
