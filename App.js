import { Provider, useDispatch, useSelector } from "react-redux"
import { AppRoute } from "./components/AppRoute/AppRoute"
import store from "./store/store"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useEffect, useState } from "react"
import * as Notifications from "expo-notifications"
import NotificationService from "./services/NotificationService"
import ServerSyncService from "./services/ServerSyncService"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { loadAlerts, markAlertAsRead, triggerAlert } from "./store/alertsSlice"
import { AppState } from "react-native"
import { priceAlertsSelector } from "./store/alertsSelectors"

function AppContent() {
  const dispatch = useDispatch()
  const [isReady, setIsReady] = useState(false)
  const [appState, setAppState] = useState(AppState.currentState)
  const priceAlerts = useSelector(priceAlertsSelector)

  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log("Инициализация приложения...")

        // 1. Загрузка алертов из AsyncStorage
        try {
          const storedAlertsJson = await AsyncStorage.getItem("priceAlerts")
          if (storedAlertsJson) {
            const storedAlerts = JSON.parse(storedAlertsJson)
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
              console.log(`Загружено ${validAlerts.length} алертов`)
            }
          }
        } catch (storageError) {
          console.error("Ошибка загрузки алертов:", storageError)
        }

        // 2. Инициализация службы уведомлений
        const notificationInitialized = await NotificationService.initialize()

        if (notificationInitialized) {
          // 3. Запрос разрешений
          const permissionGranted = await NotificationService.requestPermissions()

          if (permissionGranted) {
            // 4. Регистрируемся для push-уведомлений
            const fcmToken = await NotificationService.registerForPushNotificationsAsync()

            if (fcmToken) {
              // 5. Инициализируем синхронизацию с сервером
              ServerSyncService.initialize(fcmToken)

              // 6. Регистрируем обработчики уведомлений
              NotificationService.registerNotificationHandlers(
                // Обработчик получения уведомления
                (notification) => {
                  console.log("Уведомление получено:", {
                    source: notification.request.content.data?.source || "local",
                    data: notification.request.content.data
                  })

                  // Если уведомление от FCM сервера
                  const data = notification.request.content.data
                  if (data?.type === "price-alert" && data.alertId) {
                    // Создаем локальный алерт если его нет
                    if (!priceAlerts.find((a) => a.id === data.alertId)) {
                      const serverAlert = {
                        id: data.alertId,
                        coinId: data.coinId,
                        coinName: data.coinName,
                        coinSymbol: data.coinSymbol,
                        targetPrice: parseFloat(data.targetPrice),
                        currentPrice: parseFloat(data.currentPrice),
                        condition: data.condition,
                        isActive: false,
                        isRead: false,
                        triggeredAt: data.triggeredAt,
                        createdAt: new Date().toISOString(),
                        createdPrice: parseFloat(data.currentPrice),
                        source: "server"
                      }
                    }
                  }
                },
                // Обработчик нажатия на уведомление
                async (response) => {
                  const data = response.notification.request.content.data
                  console.log("Нажатие на уведомление:", data)

                  if (data.type === "price-alert" && data.alertId) {
                    dispatch(markAlertAsRead(data.alertId))

                    // Если уведомление от сервера, помечаем алерт как сработавший
                    if (data.source === "server") {
                      dispatch(
                        triggerAlert({
                          id: data.alertId,
                          currentPrice: parseFloat(data.currentPrice)
                        })
                      )
                    }
                  }
                }
              )
            }
          }
        }

        setIsReady(true)
        console.log("Приложение инициализировано")
      } catch (error) {
        console.error("Ошибка инициализации:", error)
        setIsReady(true)
      }
    }

    initializeApp()

    // Слушатель изменения состояния приложения
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      console.log(`Состояние приложения: ${appState} → ${nextAppState}`)
      setAppState(nextAppState)

      // При сворачивании приложения синхронизируем алерты с сервером
      if (nextAppState === "background" || nextAppState === "inactive") {
        console.log("Синхронизация алертов с сервером...")
        ServerSyncService.syncAlertsWithServer(priceAlerts)
      }

      // При возвращении в активное состояние проверяем алерты
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        console.log("Проверка алертов после возвращения")
      }
    })

    return () => {
      subscription.remove()
    }
  }, [dispatch])

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
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}
