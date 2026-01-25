import React, { useState, useCallback, useRef, useEffect } from "react"
import {
  View,
  FlatList,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
  Platform,
  Linking,
  AppState
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import * as Haptics from "expo-haptics"
import * as Notifications from "expo-notifications"
import { useDispatch, useSelector } from "react-redux"

import Constants from "expo-constants"
import { Clipboard } from "react-native"
import {
  coinSelector,
  daysSelector,
  userAssetsSelector
} from "../../store/toolkitSelectors"
import {
  priceAlertsSelector,
  unreadAlertsCountSelector
} from "../../store/alertsSelectors"
import { removeCoin, updateUserAsset } from "../../store/reducersSlice"
import {
  addPriceAlert,
  deletePriceAlert,
  markAlertAsRead,
  triggerAlertFromServer
} from "../../store/alertsSlice"
import { styles } from "./Favorite.styles"
import ModalFavorite from "./ModalChart/ModalFavorite"
import AlertModal from "../../components/Alerts/AlertModal/AlertModal"
import { smartFormatNumber } from "../../helpers/helpers"
import { useFavoriteUpdate } from "../../hooks/useFavoriteUpdate"
import NotificationService from "../../services/NotificationService"
import ServerSyncService from "../../services/ServerSyncService"
import AlertManager from "../../services/AlertManager"
import { useAlertChecker } from "../../hooks/useAlertChecker"
import EmptyState from "./FavoriteComponents/EmptyState/EmptyState"
import FavoriteHeader from "./FavoriteHeader/FavoriteHeader"
import AmountInputModal from "./FavoriteComponents/AmountInputModal/AmountInputModal"
import FavoriteStatsPanel from "./FavoriteStatsPanel/FavoriteStatsPanel"

const Favorite = () => {
  const dispatch = useDispatch()
  const coinData = useSelector(coinSelector)
  const chartDays = useSelector(daysSelector)
  const userAssets = useSelector(userAssetsSelector) || {}
  const priceAlerts = useSelector(priceAlertsSelector)
  const unreadAlertsCount = useSelector(unreadAlertsCountSelector)

  const [removingCoinId, setRemovingCoinId] = useState(null)
  const [isModalVisible, setModalVisible] = useState(false)
  const [selectedCoin, setSelectedCoin] = useState(null)
  const [inputModalVisible, setInputModalVisible] = useState(false)
  const [selectedCoinForInput, setSelectedCoinForInput] = useState(null)
  const [lastUpdateTime, setLastUpdateTime] = useState(null)
  const [isUpdating, setIsUpdating] = useState(false)

  // Состояния для алертов и серверной синхронизации
  const [alertModalVisible, setAlertModalVisible] = useState(false)
  const [selectedCoinForAlert, setSelectedCoinForAlert] = useState(null)
  const [notificationPermission, setNotificationPermission] = useState(false)
  const [fcmToken, setFcmToken] = useState(null)
  const [appState, setAppState] = useState(AppState.currentState)
  const [serverStatus, setServerStatus] = useState(null)

  // Динамическое определение ширины экрана
  const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width)

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setWindowWidth(window.width)
    })

    return () => subscription?.remove()
  }, [])

  // Функция определения планшета
  const isTablet = useCallback(() => {
    const width = windowWidth
    const height = Dimensions.get("window").height

    // Основная логика для Expo Go
    if (width >= 768) return true

    // Для Nexus 9 и подобных устройств
    const screenRatio = Math.max(width, height) / Math.min(width, height)
    const pixelRatio = windowWidth / 360 // базовая ширина телефона

    // Если ширина в dp больше 600 и соотношение сторон меньше 1.6
    if (width / pixelRatio >= 600 && screenRatio < 1.6) {
      return true
    }

    return false
  }, [windowWidth])

  // Определяем количество колонок
  const numColumns = isTablet() ? 3 : 2

  const amountInputRef = useRef("")

  // Хук обновления
  const { updateFavoritePrices } = useFavoriteUpdate(1)

  // Хук для периодической проверки алертов
  useAlertChecker(coinData, 60000)

  // Мониторинг состояния приложения
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      console.log(`Состояние приложения: ${appState} → ${nextAppState}`)
      setAppState(nextAppState)

      // Обновляем состояние на сервере
      if (fcmToken) {
        ServerSyncService.updateAppStateOnServer(nextAppState)
      }

      if (nextAppState === "active") {
        // Приложение вернулось на передний план
        console.log("Приложение активно, проверяем алерты")

        // Проверяем серверную доступность
        checkServerAvailability()

        // Проверяем алерты
        if (coinData.length > 0 && priceAlerts.length > 0) {
          AlertManager.checkAlerts(
            priceAlerts.filter((a) => a.isActive && !a.triggeredAt),
            coinData
          )
        }

        // Обновляем цены
        handleManualUpdate()
      } else if (nextAppState === "background" || nextAppState === "inactive") {
        // Приложение сворачивается - синхронизируем с сервером
        if (fcmToken && priceAlerts.length > 0) {
          console.log("Синхронизация алертов с сервером...")
          ServerSyncService.syncAlertsWithServer(priceAlerts)
        }
      }
    })

    return () => {
      subscription.remove()
    }
  }, [appState, fcmToken, coinData, priceAlerts])

  const checkServerAvailability = useCallback(async () => {
    try {
      const status = await ServerSyncService.getStatus()
      setServerStatus(status)

      if (!status.serverAvailable) {
        await ServerSyncService.checkServerAvailability()
        const updatedStatus = await ServerSyncService.getStatus()
        setServerStatus(updatedStatus)
      }
    } catch (error) {
      console.warn("Ошибка проверки сервера:", error)
    }
  }, [])

  // Инициализация уведомлений и FCM
  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        // 1. Проверяем текущие разрешения
        const { granted, status } = await Notifications.getPermissionsAsync()
        console.log(`Текущий статус уведомлений: ${status}, granted: ${granted}`)

        setNotificationPermission(granted)

        if (granted) {
          // 2. Инициализируем AlertManager
          AlertManager.initialize(dispatch)

          // 3. Регистрируем обработчики уведомлений
          const subscriptions = NotificationService.registerNotificationHandlers(
            async (notification) => {
              try {
                if (!notification?.request?.content?.data) return
                const data = notification.request.content.data
                if (data?.type === "price-alert" && data?.alertId) {
                  dispatch(markAlertAsRead(data.alertId))
                }
              } catch (error) {
                console.warn("Ошибка обработки уведомления:", error)
              }
            },
            (response) => {
              try {
                if (!response?.notification?.request?.content?.data) return
                const data = response.notification.request.content.data
                if (data?.type === "price-alert" && data?.alertId) {
                  dispatch(markAlertAsRead(data.alertId))
                  console.log("Алёрт помечен как прочитанный:", data.alertId)
                }
              } catch (error) {
                console.warn("Ошибка обработки ответа:", error)
              }
            }
          )

          // 4. Регистрируемся для FCM с новым методом
          if (Platform.OS !== "web") {
            try {
              // Используем новый метод getFCMToken
              const token = await NotificationService.getFCMToken()
              if (token) {
                setFcmToken(token)

                // Определяем тип токена
                const isExpoToken = token.startsWith("ExponentPushToken[")
                console.log(`Токен получен: ${isExpoToken ? "Expo Token" : "FCM Token"}`)
                console.log(`Token: ${token.substring(0, 20)}...`)

                // Логируем предупреждение если это Expo токен
                if (isExpoToken) {
                  console.log("ВНИМАНИЕ: Получен Expo токен. Для FCM токена:")
                  console.log(
                    "   - Создайте development build: eas build --profile development --platform android"
                  )
                  console.log("   - Или обновите сервер для работы с Expo токенами")
                }

                // Инициализируем синхронизацию с сервером
                ServerSyncService.initialize(token)

                // Проверяем доступность сервера
                checkServerAvailability()
              }
            } catch (fcmError) {
              console.warn("Ошибка получения токена:", fcmError)
            }
          }

          return () => {
            if (subscriptions) {
              NotificationService.removeNotificationHandlers(subscriptions)
            }
          }
        }
      } catch (error) {
        console.error("Ошибка инициализации уведомлений:", error)
        setNotificationPermission(false)
      }
    }

    initializeNotifications()
  }, [dispatch])

  // Обновление бейджей при изменении алертов
  useEffect(() => {
    const updateBadges = async () => {
      if (notificationPermission) {
        try {
          await NotificationService.setBadgeCount(unreadAlertsCount)
        } catch (error) {
          console.warn("Не удалось обновить бейджи:", error)
        }
      }
    }

    updateBadges()
  }, [unreadAlertsCount, notificationPermission])

  // Логирование при изменении избранного
  useEffect(() => {
    if (__DEV__) {
      console.log("\n ==== ОБНОВЛЕНИЕ ИЗБРАННОГО ====")
      console.log(`Монеты: ${coinData.length}`)
      console.log(`Алёрты: ${priceAlerts.length} (${unreadAlertsCount} непрочитанных)`)
      console.log(`Уведомления: ${notificationPermission ? "Разрешены" : "Не разрешены"}`)
      console.log(`FCM Token: ${fcmToken ? "Есть" : "Нет"}`)
      console.log(`Состояние приложения: ${appState}`)

      if (serverStatus) {
        console.log(`Сервер: ${serverStatus.serverAvailable ? "Доступен" : "Недоступен"}`)
        console.log(`Ожидающие операции: ${serverStatus.pendingOperations}`)
      }

      const activeAlerts = priceAlerts.filter(
        (alert) => alert.isActive && !alert.triggeredAt
      )
      const triggeredAlerts = priceAlerts.filter((alert) => alert.triggeredAt)

      if (activeAlerts.length > 0) {
        console.log(`Активные алерты: ${activeAlerts.length}`)
      }

      if (triggeredAlerts.length > 0) {
        console.log(`Сработавшие алерты: ${triggeredAlerts.length}`)
      }

      console.log("=============================\n")
    }
  }, [
    coinData,
    priceAlerts,
    unreadAlertsCount,
    notificationPermission,
    fcmToken,
    appState,
    serverStatus
  ])

  // Обработчик ручного обновления
  const handleManualUpdate = useCallback(async () => {
    if (isUpdating) {
      console.log("Обновление уже выполняется")
      return
    }

    console.log("Ручное обновление избранного")
    setIsUpdating(true)
    setLastUpdateTime(new Date().toLocaleTimeString())

    try {
      await updateFavoritePrices()
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      console.log("Обновление завершено успешно")
    } catch (error) {
      console.error("Ошибка обновления:", error)
    } finally {
      setIsUpdating(false)
    }
  }, [updateFavoritePrices, isUpdating])

  // Подсчет стоимости портфеля
  const totalPortfolioValue = coinData.reduce((total, coin) => {
    const amount = (userAssets && userAssets[coin.id]) || 0
    return total + amount * (coin.current_price || 0)
  }, 0)

  // Статистика
  const stats = {
    total: coinData.length,
    bullish: coinData.filter((c) => c.price_change_percentage_24h >= 0).length,
    bearish: coinData.filter((c) => c.price_change_percentage_24h < 0).length,
    top10: coinData.filter((c) => c.market_cap_rank <= 10).length,
    activeAlerts: priceAlerts.filter((a) => a.isActive && !a.triggeredAt).length,
    triggeredAlerts: priceAlerts.filter((a) => a.triggeredAt).length,
    serverSynced: priceAlerts.filter((a) => a.serverId || a.syncStatus === "synced")
      .length
  }

  // Функция открытия модалки алерта
  const openAlertModal = useCallback(
    async (coin) => {
      console.log(`Открытие алерта для: ${coin.name}`)
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

      const openModal = () => {
        setSelectedCoinForAlert(coin)
        setAlertModalVisible(true)
      }

      try {
        const { granted, status, canAskAgain } = await Notifications.getPermissionsAsync()

        if (granted) {
          if (!notificationPermission) {
            setNotificationPermission(true)
          }

          if (!fcmToken && Platform.OS !== "web") {
            try {
              const token = await NotificationService.getFCMToken()
              if (token) {
                setFcmToken(token)
                console.log("FCM Token получен при создании алерта")

                // Инициализация серверной синхронизации
                ServerSyncService.initialize(token)
              }
            } catch (tokenError) {
              console.warn("Не удалось получить FCM токен:", tokenError)
            }
          }

          openModal()
          return
        }

        Alert.alert(
          "🔔 Price Alerts",
          "Enable notifications to receive alerts when prices reach your targets. This works even when the app is closed.",
          [
            {
              text: "Not Now",
              style: "cancel",
              onPress: () => {
                console.log("User declined notifications")
                Alert.alert(
                  "Notifications Disabled",
                  "Alert will be saved locally, but you won't receive push notifications when it triggers.",
                  [{ text: "OK", onPress: openModal }]
                )
              }
            },
            {
              text: "Enable",
              onPress: async () => {
                try {
                  const requestNotificationPermission = async () => {
                    if (Platform.OS === "ios") {
                      return await Notifications.requestPermissionsAsync({
                        ios: {
                          allowAlert: true,
                          allowBadge: true,
                          allowSound: true,
                          allowAnnouncements: true
                        }
                      })
                    } else {
                      return await Notifications.requestPermissionsAsync()
                    }
                  }

                  const result = await requestNotificationPermission()
                  const { granted: newGranted } = result

                  setNotificationPermission(newGranted)

                  if (newGranted) {
                    AlertManager.initialize(dispatch)

                    if (Platform.OS !== "web") {
                      try {
                        const token = await NotificationService.getFCMToken()
                        if (token) {
                          setFcmToken(token)
                          console.log("FCM Token получен после разрешения")
                          ServerSyncService.initialize(token)
                        }
                      } catch (tokenError) {
                        console.warn("Не удалось получить FCM токен:", tokenError)
                      }
                    }

                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)

                    Alert.alert(
                      "✓ Notifications Enabled",
                      "You'll receive push notifications when your price alerts trigger, even when the app is closed.",
                      [{ text: "Great!" }]
                    )
                  }

                  openModal()
                } catch (error) {
                  console.error("Ошибка запроса разрешений:", error)
                  openModal()
                }
              }
            }
          ]
        )
      } catch (error) {
        console.error("Ошибка при открытии алерта:", error)
        openModal()
      }
    },
    [dispatch, notificationPermission, fcmToken]
  )

  // Обработчик сохранения алерта
  const handleSaveAlert = useCallback(
    async (alertData) => {
      console.log(`Сохранение алерта: ${alertData.coinName} @ $${alertData.targetPrice}`)

      const currentCoinPrice = alertData.currentPrice || 0

      const payload = {
        ...alertData,
        currentPrice: currentCoinPrice,
        fcmToken: fcmToken,
        syncStatus: fcmToken ? "pending_sync" : "local_only",
        source: "local"
      }

      console.log(`Начальная цена для прогресса: $${currentCoinPrice}`)
      console.log(`FCM синхронизация: ${fcmToken ? "Включена" : "Не доступна"}`)

      // Сохраняем алерт в Redux
      dispatch(addPriceAlert(payload))
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)

      // Если есть FCM токен и сервер доступен, синхронизируем
      if (fcmToken && notificationPermission) {
        const serverAvailable = serverStatus?.serverAvailable || false

        if (serverAvailable) {
          try {
            // Синхронизируем все алерты с сервером
            const syncedAlerts = [...priceAlerts, payload].filter(
              (a) => a.isActive && !a.triggeredAt
            )
            await ServerSyncService.syncAlertsWithServer(syncedAlerts)

            Alert.alert(
              "✅ Done!",
              `Your ${alertData.coinSymbol} price alert was set to $${alertData.targetPrice}`,
              [{ text: "Great!" }]
            )
          } catch (syncError) {
            console.warn("Не удалось синхронизировать с сервером:", syncError)
            Alert.alert(
              "⚠️ Alert Saved",
              `Alert saved locally. Push notifications require app to be open.`,
              [{ text: "OK" }]
            )
          }
        } else {
          Alert.alert(
            "✅ Done",
            `Alert saved locally. You'll receive notifications when ${alertData.coinSymbol} reaches $${alertData.targetPrice}, while the app is open.`,
            [{ text: "OK" }]
          )
        }
      } else if (notificationPermission) {
        Alert.alert(
          "✅ Done",
          `Alert saved locally. You'll receive notifications when ${alertData.coinSymbol} reaches $${alertData.targetPrice} while the app is open.`,
          [{ text: "OK" }]
        )
      } else {
        Alert.alert(
          "✅ Alert saved locally",
          "Notifications are disabled. The alert will only work while the app is open.",
          [{ text: "OK" }]
        )
      }
    },
    [dispatch, notificationPermission, fcmToken, priceAlerts, serverStatus]
  )

  // Удаление монеты из избранного
  const removeFromFav = useCallback(
    (coin) => {
      console.log(`\n ==== УДАЛЕНИЕ МОНЕТЫ ====`)
      console.log(`Монета: ${coin.name} (${coin.symbol.toUpperCase()})`)

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      setRemovingCoinId(coin.id)

      // Удаляем все алерты для этой монеты
      const coinAlerts = priceAlerts.filter((alert) => alert.coinId === coin.id)
      coinAlerts.forEach((alert) => {
        dispatch(deletePriceAlert(alert.id))

        // Удаляем алерт с сервера если есть serverId
        if (alert.serverId && fcmToken) {
          ServerSyncService.deleteAlertFromServer(alert.serverId)
        }
      })

      if (coinAlerts.length > 0) {
        console.log(`Удалено ${coinAlerts.length} алертов для монеты`)
      }

      setTimeout(() => {
        setRemovingCoinId(null)
        dispatch(removeCoin(coin))
        console.log(`Монета успешно удалена из избранного`)
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      }, 1500)
    },
    [dispatch, priceAlerts, fcmToken]
  )

  // Открытие графика
  const openChartModal = useCallback((coin) => {
    console.log(`Открытие графика для: ${coin.name}`)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    setSelectedCoin(coin)
    setModalVisible(true)
  }, [])

  const closeChartModal = useCallback(() => {
    console.log(`Закрытие графика`)
    setModalVisible(false)
    setSelectedCoin(null)
  }, [])

  // Открытие формы ввода количества
  const openAmountInput = (coin) => {
    console.log(`Открытие формы ввода количества: ${coin.name}`)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setSelectedCoinForInput(coin)
    setInputModalVisible(true)
  }

  // Сохранение количества
  const saveAmount = () => {
    if (selectedCoinForInput && amountInputRef.current) {
      let text = amountInputRef.current.replace(/,/g, ".")
      const amount = parseFloat(text) || 0

      dispatch(
        updateUserAsset({
          coinId: selectedCoinForInput.id,
          amount: amount
        })
      )

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }
    setInputModalVisible(false)
    setSelectedCoinForInput(null)
    amountInputRef.current = ""
  }

  // Функция для тестирования сервера
  const testServerConnection = async () => {
    try {
      const result = await ServerSyncService.testConnection()

      if (result.success) {
        Alert.alert(
          "✅ Сервер доступен",
          `Ping: ${result.ping}ms\nStatus: ${result.status}\nTimestamp: ${result.timestamp}`,
          [{ text: "OK" }]
        )
      } else {
        Alert.alert("Сервер недоступен", `Error: ${result.error}`, [{ text: "OK" }])
      }
    } catch (error) {
      Alert.alert("Ошибка тестирования", error.message, [{ text: "OK" }])
    }
  }

  // Компонент карточки монеты
  const PremiumCoinCard = React.memo(({ item }) => {
    const isRemoving = removingCoinId === item.id
    const priceChangeColor = item.price_change_percentage_24h >= 0 ? "#00C853" : "#FF3B30"
    const priceChangeIcon =
      item.price_change_percentage_24h >= 0 ? "trending-up" : "trending-down"

    const userAmount = (userAssets && userAssets[item.id]) || 0
    const userValue = userAmount * (item.current_price || 0)

    const coinAlerts = priceAlerts.filter(
      (alert) => alert.coinId === item.id && alert.isActive && !alert.triggeredAt
    )
    const hasActiveAlerts = coinAlerts.length > 0
    const alertsCount = coinAlerts.length

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => openChartModal(item)}
        style={styles.cardContainer}
      >
        <View style={styles.premiumCoinCard}>
          <LinearGradient
            colors={
              isRemoving
                ? ["rgba(244, 67, 54, 0.3)", "rgba(183, 28, 28, 0.2)"]
                : ["rgba(26, 26, 26, 0.95)", "rgba(40, 40, 40, 0.9)"]
            }
            style={styles.cardGradient}
          >
            {/* Верхняя строка - заголовок и алерты */}
            <View style={styles.headerRow}>
              {/* Левая часть - название и ранг */}
              <View style={styles.coinInfo}>
                <View style={styles.rankRow}>
                  <Text style={styles.rankText}>#{item.market_cap_rank || "?"}</Text>
                  {item.market_cap_rank <= 10 && (
                    <MaterialCommunityIcons
                      name='crown'
                      size={10}
                      color='#FFD700'
                      style={styles.crownIcon}
                    />
                  )}
                </View>
                <Text style={styles.coinName} numberOfLines={1} ellipsizeMode='tail'>
                  {item.name}
                </Text>
                <Text style={styles.coinSymbol}>{item.symbol?.toUpperCase()}</Text>
              </View>

              {/* Правая часть - алерты */}
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation()
                  openAlertModal(item)
                }}
                style={styles.alertButtonContainer}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.alertButton,
                    hasActiveAlerts && styles.alertButtonActive,
                    !notificationPermission && styles.alertButtonDisabled
                  ]}
                >
                  <Ionicons
                    name={hasActiveAlerts ? "notifications" : "notifications-outline"}
                    size={16}
                    color={
                      hasActiveAlerts
                        ? "#D4AF37"
                        : !notificationPermission
                        ? "#666"
                        : "rgba(255,255,255,0.6)"
                    }
                  />

                  {/* Бейдж с количеством алертов */}
                  {hasActiveAlerts && (
                    <View style={styles.alertBadge}>
                      <Text style={styles.alertBadgeText}>{alertsCount}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
            {/* Средняя строка - цена и сумма пользователя */}
            <View style={styles.middleRow}>
              {/* Левая часть - цена */}
              <View style={styles.priceSection}>
                <Text
                  style={[styles.coinPrice, { color: priceChangeColor }]}
                  numberOfLines={1}
                  ellipsizeMode='tail'
                  adjustsFontSizeToFit
                  minimumFontScale={0.7}
                >
                  {smartFormatNumber(item.current_price, true)}
                </Text>

                <View style={styles.changeContainer}>
                  <View
                    style={[
                      styles.changeBadge,
                      { backgroundColor: `${priceChangeColor}15` }
                    ]}
                  >
                    <Ionicons name={priceChangeIcon} size={10} color={priceChangeColor} />
                    <Text style={[styles.changeText, { color: priceChangeColor }]}>
                      {Math.abs(item.price_change_percentage_24h?.toFixed(2) || 0)}%
                    </Text>
                  </View>
                </View>
              </View>

              {/* Правая часть - сумма пользователя */}
              <View style={styles.userAmountSection}>
                {userAmount > 0 ? (
                  <>
                    <Text
                      style={styles.userAmount}
                      numberOfLines={1}
                      ellipsizeMode='tail'
                      adjustsFontSizeToFit
                      minimumFontScale={0.7}
                    >
                      {smartFormatNumber(userAmount, false, true)}
                    </Text>
                    <Text
                      style={styles.userValue}
                      numberOfLines={1}
                      ellipsizeMode='tail'
                      adjustsFontSizeToFit
                      minimumFontScale={0.7}
                    >
                      {smartFormatNumber(userValue)}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.userAmountPlaceholder}>No amount</Text>
                    <Text style={styles.userValuePlaceholder}>$0.00</Text>
                  </>
                )}
              </View>
            </View>
            {/* Нижняя часть - кнопки действий */}
            <View style={styles.bottomActions}>
              {/* Кнопка Add/Edit */}
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation()
                  openAmountInput(item)
                }}
                style={styles.actionButton}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={["rgba(212, 175, 55, 0.15)", "rgba(183, 121, 31, 0.08)"]}
                  style={[styles.actionButtonGradient, styles.addButtonGradient]}
                >
                  <Ionicons
                    name={userAmount > 0 ? "pencil-outline" : "add-circle-outline"}
                    size={13}
                    color='#D4AF37'
                  />
                  <Text
                    style={[styles.actionButtonText, styles.addButtonText]}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                  >
                    {userAmount > 0 ? "Edit" : "Add"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Кнопка Remove */}
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation()
                  removeFromFav(item)
                }}
                style={styles.actionButton}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={
                    isRemoving
                      ? ["rgba(244, 67, 54, 0.5)", "rgba(183, 28, 28, 0.3)"]
                      : ["rgba(255, 107, 107, 0.15)", "rgba(255, 87, 87, 0.08)"]
                  }
                  style={[styles.actionButtonGradient, styles.removeButtonGradient]}
                >
                  <Ionicons
                    name={isRemoving ? "checkmark" : "trash-outline"}
                    size={13}
                    color={isRemoving ? "#FFF" : "#FF6B6B"}
                  />
                  <Text
                    style={[
                      styles.actionButtonText,
                      isRemoving && styles.removeButtonText
                    ]}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                  >
                    {isRemoving ? "Removing" : "Remove"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    )
  })

  return (
    <LinearGradient
      colors={["#0A0A0F", "#121218", "#0A0A0F"]}
      style={styles.premiumContainer}
    >
      {/* Заголовок с Portfolio */}
      <FavoriteHeader
        stats={stats}
        lastUpdateTime={lastUpdateTime}
        priceAlerts={priceAlerts}
        notificationPermission={notificationPermission}
        totalPortfolioValue={totalPortfolioValue}
        isUpdating={isUpdating}
        handleManualUpdate={handleManualUpdate}
        fcmToken={fcmToken}
        testFCMNotification={testServerConnection}
        serverStatus={serverStatus}
      />

      {/* Панель статистики */}
      {coinData.length > 0 && (
        <FavoriteStatsPanel
          priceAlerts={priceAlerts}
          stats={stats}
          unreadAlertsCount={unreadAlertsCount}
          notificationPermission={notificationPermission}
          fcmToken={fcmToken}
          serverStatus={serverStatus}
        />
      )}

      {/* Информация о статусе обновления */}
      {isUpdating && (
        <View style={styles.updateStatus}>
          <Text style={styles.updateStatusText}>Updating prices...</Text>
        </View>
      )}

      {/* Пустое состояние или список */}
      {coinData.length === 0 ? (
        <EmptyState
          notificationPermission={notificationPermission}
          fcmToken={fcmToken}
          serverAvailable={serverStatus?.serverAvailable}
        />
      ) : (
        <FlatList
          data={coinData}
          renderItem={({ item }) => <PremiumCoinCard item={item} />}
          numColumns={numColumns}
          contentContainerStyle={[
            styles.premiumList,
            {
              alignItems: "flex-start", // карточки слева
              width: "100%",
              alignSelf: "center" // контейнер по центру
            }
          ]}
          columnWrapperStyle={
            numColumns > 1
              ? {
                  justifyContent: "flex-start", // карточки в строке слева
                  width: "100%"
                }
              : null
          }
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      )}

      {/* Модалка ввода количества */}
      <AmountInputModal
        inputModalVisible={inputModalVisible}
        setInputModalVisible={setInputModalVisible}
        selectedCoinForInput={selectedCoinForInput}
        userAssets={userAssets}
        saveAmount={saveAmount}
        amountInputRef={amountInputRef}
      />

      {/* Модалка алерта */}
      {selectedCoinForAlert && (
        <AlertModal
          visible={alertModalVisible}
          onClose={() => {
            setAlertModalVisible(false)
            setSelectedCoinForAlert(null)
          }}
          onSave={handleSaveAlert}
          coin={selectedCoinForAlert}
          currentPrice={selectedCoinForAlert.current_price || 0}
          notificationPermission={notificationPermission}
          fcmToken={fcmToken}
          serverAvailable={serverStatus?.serverAvailable}
        />
      )}

      {/* Модалка с графиком */}
      <ModalFavorite
        visible={isModalVisible}
        onClose={closeChartModal}
        selectedCoin={selectedCoin}
        chartDays={chartDays}
      />
    </LinearGradient>
  )
}

export default Favorite
