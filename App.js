import { Provider } from "react-redux"
import { AppRoute } from "./components/AppRoute/AppRoute"
import store from "./store/store"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useEffect, useState } from "react"
import NotificationService from "./services/NotificationService"
import {
  registerBackgroundTask,
  unregisterBackgroundTask
} from "./services/BackgroundService"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Alert } from "react-native"

export default function App() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log("Инициализация приложения...")

        // 1. Запрос разрешения на уведомления
        const granted = await NotificationService.requestPermissions()

        if (granted) {
          console.log("Разрешения на уведомления получены")

          // 2. Регистрация фоновой задачи
          await registerBackgroundTask()

          // 3. Настройка слушателей уведомлений
          setupNotificationListeners()

          // 4. Сохранение начальных данных для фоновой задачи
          await saveAlertsToStorage()

          // 5. Настройка подписки на изменения Redux
          setupReduxSubscription()
        } else {
          console.log("Разрешения на уведомления не получены")
          Alert.alert(
            "Уведомления отключены",
            "Для работы алертов включите уведомления в настройках приложения",
            [{ text: "OK" }]
          )
        }

        setIsReady(true)
      } catch (error) {
        console.error("Ошибка инициализации:", error)
        setIsReady(true) // Все равно показываем приложение
      }
    }

    initializeApp()

    // Очистка при размонтировании
    return () => {
      cleanup()
    }
  }, [])

  // Сохранение алертов в AsyncStorage для доступа в фоновом режиме
  const saveAlertsToStorage = async () => {
    try {
      const state = store.getState()
      const alerts = state.alerts.alerts || []
      await AsyncStorage.setItem("priceAlerts", JSON.stringify(alerts))
      console.log(`Сохранено ${alerts.length} алертов`)
    } catch (error) {
      console.error("Ошибка сохранения алертов:", error)
    }
  }

  // Настройка подписки на изменения Redux
  const setupReduxSubscription = () => {
    let lastSavedTime = 0
    const SAVE_INTERVAL = 5000 // Сохранение не чаще чем раз в 5 секунд

    const unsubscribe = store.subscribe(() => {
      const now = Date.now()
      if (now - lastSavedTime > SAVE_INTERVAL) {
        saveAlertsToStorage()
        lastSavedTime = now
      }
    })

    return unsubscribe
  }

  // Настройка слушателей уведомлений
  const setupNotificationListeners = () => {
    const subscriptions = NotificationService.registerNotificationHandlers(
      // Когда уведомление получено при открытом приложении
      (notification) => {
        console.log("Уведомление получено:", notification.request.identifier)
      },
      // Когда пользователь нажимает на уведомление
      async (response) => {
        console.log("👆 Пользователь нажал на уведомление")
        const data = response.notification.request.content.data

        if (data.type === "price-alert") {
          // Добав навигацию к конкретному алерту
          console.log("Алёрт:", data.alertId)
        }
      }
    )

    return subscriptions
  }

  // Очистка при размонтировании
  const cleanup = async () => {
    try {
      await unregisterBackgroundTask()
      console.log("Приложение очищено")
    } catch (error) {
      console.error("Ошибка очистки:", error)
    }
  }

  if (!isReady) {
    return null
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppRoute />
      </GestureHandlerRootView>
    </Provider>
  )
}
