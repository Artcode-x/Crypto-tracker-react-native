import { Provider, useDispatch, useSelector } from "react-redux"
import { AppRoute } from "./components/AppRoute/AppRoute"
import store from "./store/store"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useEffect, useState } from "react"
import * as Notifications from "expo-notifications"
import NotificationService from "./services/NotificationService"
import ServerSyncService from "./services/ServerSyncService"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { loadAlerts, markAlertAsRead, triggerAlertFromServer } from "./store/alertsSlice"
import { AppState, View, Text } from "react-native"
import { priceAlertsSelector } from "./store/alertsSelectors"
import AlertConsentModal from "./components/AlertConsentModal/AlertConsentModal"
import { MaterialCommunityIcons } from "@expo/vector-icons"

// Компонент для отображения ошибок
const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const errorHandler = (error) => {
      console.error("Необработанная ошибка:", error)
      setHasError(true)
      setError(error.message || error.toString())
    }

    const originalErrorHandler = ErrorUtils.getGlobalHandler()
    ErrorUtils.setGlobalHandler((error, isFatal) => {
      errorHandler(error)
      if (originalErrorHandler) {
        originalErrorHandler(error, isFatal)
      }
    })

    return () => {
      ErrorUtils.setGlobalHandler(originalErrorHandler)
    }
  }, [])

  if (hasError) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0A0A0F",
          padding: 20
        }}
      >
        <Text
          style={{ fontSize: 24, color: "#FF6B6B", fontWeight: "bold", marginBottom: 20 }}
        >
          App Error
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#FFFFFF",
            marginBottom: 10,
            textAlign: "center"
          }}
        >
          {error || "Произошла ошибка"}
        </Text>
        <Text
          style={{ fontSize: 14, color: "#D4AF37", marginTop: 30, textAlign: "center" }}
        >
          Reload App
        </Text>
      </View>
    )
  }

  return children
}

function AppContent() {
  const dispatch = useDispatch()
  const [isReady, setIsReady] = useState(false)
  const [appState, setAppState] = useState(AppState.currentState)
  const priceAlerts = useSelector(priceAlertsSelector)

  // состояния для модалки
  const [showConsentModal, setShowConsentModal] = useState(false)

  useEffect(() => {
    let notificationSubscriptions = []

    const initializeApp = async () => {
      try {
        console.log("Инициализация приложения...")

        // 1. Проверка, давал ли пользователь уже согласие
        try {
          const hasConsent = await AsyncStorage.getItem("@background_alerts_consent")
          console.log("Статус согласия:", hasConsent)

          //   Если согласия нет - показываем модалку
          if (hasConsent === null) {
            console.log("Первый запуск, показываем модалку согласия")
            // Показываем с задержкой для лучшего UX
            setTimeout(() => {
              setShowConsentModal(true)
            }, 2000)
          }
        } catch (consentError) {
          console.error("Ошибка проверки согласия:", consentError)
        }

        // 2. Загрузка алертов из AsyncStorage
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

        // 3. Инициализация службы уведомлений
        try {
          const notificationInitialized = await NotificationService.initialize()
          console.log("NotificationService инициализирован")

          if (notificationInitialized) {
            // 4. Запрос разрешений
            const permissionGranted = await NotificationService.requestPermissions()
            console.log(`Разрешения: ${permissionGranted ? "granted" : "denied"}`)

            if (permissionGranted) {
              // 5. Регистрация для push-уведомлений
              const fcmToken =
                await NotificationService.registerForPushNotificationsAsync()

              if (fcmToken) {
                console.log("FCM Token получен")

                // 6. Проверка согласия перед инициализацией серверной синхронизации
                const hasConsent = await AsyncStorage.getItem(
                  "@background_alerts_consent"
                )

                // Инициализируем ServerSyncService, но он будет работать в пассивном режиме
                await ServerSyncService.initialize(fcmToken, dispatch)

                // Только если есть согласие - активация серверной синхронизации
                if (hasConsent === "agreed") {
                  console.log("Согласие есть, активируем серверную синхронизацию")
                  // ServerSyncService уже инициализирован, может начать работу
                } else {
                  console.log("Нет согласия, серверная синхронизация в пассивном режиме")
                }

                // 7. Синхронизация статуса алертов с сервером (если есть согласие)
                if (hasConsent === "agreed") {
                  try {
                    await ServerSyncService.syncAlertStatusFromServer(fcmToken)
                  } catch (syncError) {
                    console.warn(
                      "Не удалось синхронизировать статус алертов:",
                      syncError.message
                    )
                  }
                }

                // 8. Регистрация обработчиков уведомлений
                notificationSubscriptions =
                  NotificationService.registerNotificationHandlers(
                    // Обработчик получения уведомления
                    (notification) => {
                      try {
                        const data = notification.request.content.data
                        console.log("Уведомление получено:", {
                          source: data?.source || "local",
                          isServerTriggered: data?.isServerTriggered,
                          alertId: data?.alertId
                        })

                        if (data?.type === "price-alert") {
                          if (
                            data.source === "server" ||
                            data.isServerTriggered === "true"
                          ) {
                            console.log("Уведомление от сервера - пропускаем локальное")
                            console.log("Данные серверного уведомления:", {
                              alertId: data.alertId,
                              serverId: data.serverId,
                              source: data.source,
                              isServerTriggered: data.isServerTriggered
                            })

                            dispatch(
                              triggerAlertFromServer({
                                alertId: data.alertId || data.serverId,
                                currentPrice: parseFloat(data.currentPrice) || 0,
                                triggeredAt: data.triggeredAt || new Date().toISOString(),
                                coinId: data.coinId,
                                coinName: data.coinName,
                                coinSymbol: data.coinSymbol,
                                targetPrice: parseFloat(data.targetPrice) || 0,
                                condition: data.condition
                              })
                            )

                            return
                          }

                          if (data?.alertId) {
                            dispatch(markAlertAsRead(data.alertId))
                          }
                        }
                      } catch (error) {
                        console.error("Ошибка обработки уведомления:", error)
                      }
                    },
                    // Обработчик нажатия на уведомление
                    async (response) => {
                      try {
                        const data = response.notification.request.content.data
                        console.log("Нажатие на уведомление:", {
                          type: data?.type,
                          source: data?.source,
                          isServerTriggered: data?.isServerTriggered
                        })

                        if (
                          data?.type === "price-alert" &&
                          (data?.alertId || data?.serverId)
                        ) {
                          const alertId = data.alertId || data.serverId
                          dispatch(markAlertAsRead(alertId))

                          if (
                            data.source === "server" ||
                            data.isServerTriggered === "true"
                          ) {
                            console.log(
                              "Помечаем серверный алерт как сработавший при нажатии"
                            )
                            dispatch(
                              triggerAlertFromServer({
                                alertId: alertId,
                                currentPrice: parseFloat(data.currentPrice) || 0,
                                triggeredAt: data.triggeredAt || new Date().toISOString(),
                                coinId: data.coinId,
                                coinName: data.coinName,
                                coinSymbol: data.coinSymbol,
                                targetPrice: parseFloat(data.targetPrice) || 0,
                                condition: data.condition
                              })
                            )
                          }
                        }
                      } catch (error) {
                        console.error("Ошибка обработки нажатия на уведомление:", error)
                      }
                    }
                  )
              }
            }
          }
        } catch (notificationError) {
          console.error("Ошибка инициализации уведомлений:", notificationError)
        }

        setIsReady(true)
        console.log("Приложение инициализировано")
      } catch (error) {
        console.error("Критическая ошибка инициализации:", error)
        setIsReady(true)
      }
    }

    initializeApp()

    // Слушатель изменения состояния приложения
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      console.log(`Состояние приложения: ${appState} → ${nextAppState}`)
      setAppState(nextAppState)

      // При сворачивании приложения проверяем согласие перед синхронизацией
      if (nextAppState === "background" || nextAppState === "inactive") {
        AsyncStorage.getItem("@background_alerts_consent").then((consent) => {
          if (consent === "agreed") {
            console.log("Синхронизация алертов с сервером...")
            ServerSyncService.syncAlertsWithServer(priceAlerts)
          } else {
            console.log("Пропускаем синхронизацию: нет согласия на фоновые уведомления")
          }
        })
      }

      // Обновление состояния на сервере
      ServerSyncService.updateAppStateOnServer(nextAppState)
    })

    return () => {
      subscription.remove()
      if (notificationSubscriptions && notificationSubscriptions.length > 0) {
        NotificationService.removeNotificationHandlers(notificationSubscriptions)
      }
    }
  }, [dispatch])

  //  обработчики для модалки
  const handleAgree = async () => {
    try {
      console.log("Пользователь согласился на фоновые уведомления")
      await AsyncStorage.setItem("@background_alerts_consent", "agreed")
      setShowConsentModal(false)

      // Активация серверной синхронизации
      const fcmToken = await NotificationService.getFCMToken()
      if (fcmToken) {
        console.log("Активация серверной синхронизации...")
        // ServerSyncService уже инициализирован, но можно его "разбудить"
        await ServerSyncService.initialize(fcmToken, dispatch)
      }

      console.log("Background alerts enabled")
    } catch (error) {
      console.error("Error saving consent:", error)
    }
  }

  const handleCancel = async () => {
    try {
      console.log("Пользователь отказался от фоновых уведомлений")
      await AsyncStorage.setItem("@background_alerts_consent", "denied")
      setShowConsentModal(false)

      // Можно очистить алерты с сервера, если они там есть
      // ServerSyncService.clearAllServerAlerts()

      console.log("Background alerts disabled")
    } catch (error) {
      console.error("Error saving consent:", error)
    }
  }

  if (!isReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0A0A0F"
        }}
      >
        <Text style={{ color: "#D4AF37", fontSize: 16 }}>App is loading...</Text>
      </View>
    )
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppRoute />
      {/* рендер модалки */}
      <AlertConsentModal
        visible={showConsentModal}
        onAgree={handleAgree}
        onCancel={handleCancel}
      />
    </GestureHandlerRootView>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </ErrorBoundary>
  )
}
