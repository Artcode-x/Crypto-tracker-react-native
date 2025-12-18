import { Provider, useDispatch } from "react-redux"
import { AppRoute } from "./components/AppRoute/AppRoute"
import store from "./store/store"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useEffect, useState } from "react"
import * as Notifications from "expo-notifications"
import NotificationService from "./services/NotificationService"
import {
  registerBackgroundTask,
  unregisterBackgroundTask
} from "./services/BackgroundService"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { loadAlerts, markAlertAsRead } from "./store/alertsSlice"

// Обертка для доступа к dispatch внутри App
function AppContent() {
  const dispatch = useDispatch()
  const [isReady, setIsReady] = useState(false)
  const [notificationSubscriptions, setNotificationSubscriptions] = useState(null)

  useEffect(() => {
    const initializeApp = async () => {
      try {
        try {
          const storedAlertsJson = await AsyncStorage.getItem("priceAlerts")

          if (storedAlertsJson) {
            const storedAlerts = JSON.parse(storedAlertsJson)

            // Валидация и очистка данных
            const validAlerts = storedAlerts.filter(
              (alert) =>
                alert &&
                alert.id &&
                alert.coinId &&
                alert.coinName &&
                typeof alert.targetPrice === "number"
            )

            if (validAlerts.length > 0) {
              dispatch(
                loadAlerts({
                  alerts: validAlerts,
                  lastCheckTime: null,
                  unreadCount: validAlerts.filter((alert) => !alert.isRead).length
                })
              )

              console.log("Алерты успешно загружены в Redux")
            } else {
              console.log("В AsyncStorage нет валидных алертов")
            }
          } else {
            console.log("AsyncStorage не содержит алертов")
          }
        } catch (storageError) {
          console.error("Ошибка при загрузке алертов из AsyncStorage:", storageError)
        }

        const { granted } = await Notifications.getPermissionsAsync()

        // 3. Регистрируем фоновую задачу

        try {
          await registerBackgroundTask()
          console.log("Фоновая задача зарегистрирована")
        } catch (bgError) {
          console.error("Ошибка регистрации фоновой задачи:", bgError)
        }

        // 4. Настраиваем обработчики уведомлений (если разрешено)
        if (granted) {
          // Устанавливаем настройки для уведомлений
          await Notifications.setNotificationHandler({
            handleNotification: async () => ({
              shouldShowAlert: true,
              shouldPlaySound: true,
              shouldSetBadge: true
            })
          })

          // Регистрируем обработчики
          const subscriptions = NotificationService.registerNotificationHandlers(
            (notification) => {
              console.log("Уведомление получено в приложении:", {
                id: notification.request.identifier,
                title: notification.request.content.title,
                data: notification.request.content.data
              })
            },
            async (response) => {
              const data = response.notification.request.content.data

              if (data.type === "price-alert" && data.alertId) {
                dispatch(markAlertAsRead(data.alertId))
              }
            }
          )

          setNotificationSubscriptions(subscriptions)
          // console.log("Обработчики уведомлений настроены")
        }

        // 5. Приложение готово к отображению

        setIsReady(true)
      } catch (error) {
        console.error("Критическая ошибка инициализации приложения:", error)

        setIsReady(true)
      }
    }

    // Запускаем инициализацию
    initializeApp()

    // Функция очистки при размонтировании
    return () => {
      // Удаляем подписки на уведомления
      if (notificationSubscriptions) {
        try {
          NotificationService.removeNotificationHandlers(notificationSubscriptions)
        } catch (error) {
          console.error("Ошибка при удалении подписок:", error)
        }
      }

      // Отменяем фоновую задачу
      unregisterBackgroundTask().catch((error) => {
        console.error("Ошибка при отмене фоновой задачи:", error)
      })
    }
  }, [dispatch])

  // Не показываем приложение до завершения инициализации
  if (!isReady) {
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppRoute />
    </GestureHandlerRootView>
  )
}

export default function App() {
  // console.log("Приложение запускается...")

  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}
