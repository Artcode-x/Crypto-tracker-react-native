import React, { useState, useCallback, useRef, useEffect } from "react"
import {
  View,
  FlatList,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
  Platform
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import * as Haptics from "expo-haptics"
import * as Notifications from "expo-notifications"
import { useDispatch, useSelector } from "react-redux"
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
import { addPriceAlert, deletePriceAlert, markAlertAsRead } from "../../store/alertsSlice"
import { styles } from "./Favorite.styles"
import ModalFavorite from "./ModalChart/ModalFavorite"
import AlertModal from "../../components/Alerts/AlertModal/AlertModal"

import { smartFormatNumber } from "../../helpers/helpers"
import { useFavoriteUpdate } from "../../hooks/useFavoriteUpdate"
import { useAppState } from "../../hooks/useAppState"
import NotificationService from "../../services/NotificationService"
import AlertManager from "../../services/AlertManager"
import { useAlertChecker } from "../../hooks/useAlertChecker"
import EmptyState from "./FavoriteComponents/EmptyState/EmptyState"
import FavoriteHeader from "./FavoriteHeader/FavoriteHeader"
import AmountInputModal from "./FavoriteComponents/AmountInputModal/AmountInputModal"
import FavoriteStatsPanel from "./FavoriteStatsPanel/FavoriteStatsPanel"

const { width } = Dimensions.get("window")
const CARD_PADDING = 8
const CARD_MARGIN = 4
const CARD_WIDTH = (width - CARD_PADDING * 2 - CARD_MARGIN * 4) / 2

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

  // Состояния для алертов
  const [alertModalVisible, setAlertModalVisible] = useState(false)
  const [selectedCoinForAlert, setSelectedCoinForAlert] = useState(null)
  const [notificationPermission, setNotificationPermission] = useState(false)

  const amountInputRef = useRef("")

  // Хук обновления
  const { updateFavoritePrices } = useFavoriteUpdate(1)

  // Хук для периодической проверки алертов
  useAlertChecker(coinData, 60000)

  // Инициализация уведомлений - только проверка статуса
  useEffect(() => {
    const checkNotificationPermission = async () => {
      try {
        const { granted } = await Notifications.getPermissionsAsync()
        setNotificationPermission(granted)
        console.log(
          `Текущий статус уведомлений: ${granted ? "Разрешено" : "Не разрешено"}`
        )

        if (granted) {
          AlertManager.initialize(dispatch)

          const subscriptions = NotificationService.registerNotificationHandlers(
            (notification) => {
              console.log("Уведомление получено:", notification.request.content.data)
            },
            (response) => {
              const data = response.notification.request.content.data
              if (data.type === "price-alert" && data.alertId) {
                dispatch(markAlertAsRead(data.alertId))
                console.log("Алёрт помечен как прочитанный:", data.alertId)
              }
            }
          )

          return () => {
            if (subscriptions) {
              NotificationService.removeNotificationHandlers(subscriptions)
            }
          }
        }
      } catch (error) {
        console.error("Ошибка проверки разрешений:", error)
        setNotificationPermission(false)
      }
    }

    checkNotificationPermission()
  }, [dispatch])

  // Обновление бейджей при изменении алертов
  useEffect(() => {
    if (notificationPermission) {
      NotificationService.setBadgeCount(unreadAlertsCount)
    }
  }, [unreadAlertsCount, notificationPermission])

  // Логирование при изменении избранного
  useEffect(() => {
    console.log("\n ==== ОБНОВЛЕНИЕ ИЗБРАННОГО ====")

    console.log(`Алёрты: ${priceAlerts.length} (${unreadAlertsCount} непрочитанных)`)
    console.log(`Уведомления: ${notificationPermission ? "Разрешены" : "Не разрешены"}`)

    // Статистика по активным алертам
    const activeAlerts = priceAlerts.filter(
      (alert) => alert.isActive && !alert.triggeredAt
    )
    const triggeredAlerts = priceAlerts.filter((alert) => alert.triggeredAt)

    if (activeAlerts.length > 0) {
      console.log(`Активные алерты: ${activeAlerts.length}`)
      activeAlerts.forEach((alert, index) => {
        console.log(
          `   ${index + 1}. ${alert.coinSymbol}: $${alert.targetPrice} (${
            alert.condition
          })`
        )
      })
    }

    if (triggeredAlerts.length > 0) {
      console.log(`Сработавшие алерты: ${triggeredAlerts.length}`)
    }

    console.log("=============================\n")
  }, [coinData, priceAlerts, unreadAlertsCount, notificationPermission])

  // Обновление при возвращении в приложение
  useAppState(() => {
    if (coinData.length > 0) {
      console.log("Приложение активно, обновляем цены")
      handleManualUpdate()
    }
  })

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
    triggeredAlerts: priceAlerts.filter((a) => a.triggeredAt).length
  }

  // const openAlertModal = useCallback(
  //   async (coin) => {
  //     console.log(`Открытие алерта для: ${coin.name}`)
  //     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

  //     try {
  //       // 1. Проверяем текущий статус
  //       const { granted } = await Notifications.getPermissionsAsync()

  //       if (!granted) {
  //         // 2. Показываем кастомный диалог
  //         Alert.alert(
  //           "🔔 Price Alerts",
  //           "Would you like to receive notifications when your price targets are reached?",
  //           [
  //             {
  //               text: "Not Now",
  //               style: "cancel",
  //               onPress: () => {
  //                 console.log("User declined notifications")
  //                 // Все равно открываем модалку, но предупреждаем
  //                 setSelectedCoinForAlert(coin)
  //                 setAlertModalVisible(true)
  //               }
  //             },
  //             {
  //               text: "Enable",
  //               onPress: async () => {
  //                 // 3. Запрашиваем системные разрешения
  //                 const { granted: newGranted } =
  //                   await Notifications.requestPermissionsAsync()
  //                 setNotificationPermission(newGranted)

  //                 if (newGranted) {
  //                   AlertManager.initialize(dispatch)
  //                   Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
  //                 }

  //                 // 4. Открываем модалку
  //                 setSelectedCoinForAlert(coin)
  //                 setAlertModalVisible(true)
  //               }
  //             }
  //           ]
  //         )
  //       } else {
  //         // Уже разрешено
  //         if (!notificationPermission) setNotificationPermission(true)
  //         setSelectedCoinForAlert(coin)
  //         setAlertModalVisible(true)
  //       }
  //     } catch (error) {
  //       console.error("Error requesting permissions:", error)
  //       // В случае ошибки все равно открываем модалку
  //       setSelectedCoinForAlert(coin)
  //       setAlertModalVisible(true)
  //     }
  //   },
  //   [dispatch, notificationPermission]
  // )

  // const openAlertModal = useCallback(
  //   async (coin) => {
  //     console.log(`Открытие алерта для: ${coin.name}`)
  //     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

  //     try {
  //       // 1. Проверяем текущий статус
  //       const { granted, status } = await Notifications.getPermissionsAsync()
  //       console.log(`Текущий статус разрешений: ${status}, granted: ${granted}`)

  //       // Если разрешения нет, запрашиваем напрямую
  //       if (!granted) {
  //         console.log("Запрашиваем разрешения на уведомления...")

  //         // 2. ПРЯМОЙ запрос системных разрешений
  //         const requestNotificationPermission = async () => {
  //           if (Platform.OS === "ios") {
  //             // Для iOS можно добавить специфичные параметры
  //             return await Notifications.requestPermissionsAsync({
  //               ios: {
  //                 allowAlert: true,
  //                 allowBadge: true,
  //                 allowSound: true
  //               }
  //             })
  //           } else {
  //             // Для Android - простой запрос
  //             return await Notifications.requestPermissionsAsync()
  //           }
  //         }

  //         // Использование:
  //         const result = await requestNotificationPermission()

  //         console.log(`Новый статус разрешений: ${newStatus}, granted: ${newGranted}`)

  //         setNotificationPermission(newGranted)

  //         if (newGranted) {
  //           console.log("Разрешения получены, инициализируем AlertManager")
  //           AlertManager.initialize(dispatch)
  //           Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
  //         } else {
  //           console.log("Пользователь отказал в разрешениях")
  //           // Показываем информационное сообщение о важности уведомлений
  //           Alert.alert(
  //             "🔔 Notifications are disabled",
  //             "You can enable notifications in your device settings to receive alerts when alerts are triggered.",
  //             [
  //               { text: "Later", style: "cancel" },
  //               {
  //                 text: "Settings",
  //                 onPress: () => {
  //                   if (Platform.OS === "ios") {
  //                     // Для iOS можно открыть настройки
  //                     Linking.openURL("app-settings:")
  //                   } else {
  //                     // Для Android можно попробовать открыть настройки уведомлений
  //                     Linking.openSettings()
  //                   }
  //                 }
  //               }
  //             ]
  //           )
  //         }
  //       } else {
  //         // Уже разрешено
  //         if (!notificationPermission) setNotificationPermission(true)
  //         console.log("Уведомления уже разрешены")
  //       }

  //       // 3. Все равно открываем модалку алерта
  //       setSelectedCoinForAlert(coin)
  //       setAlertModalVisible(true)
  //     } catch (error) {
  //       console.error("Ошибка при запросе разрешений:", error)
  //       // В случае ошибки все равно открываем модалку
  //       setSelectedCoinForAlert(coin)
  //       setAlertModalVisible(true)
  //     }
  //   },
  //   [dispatch, notificationPermission]
  // )

  const openAlertModal = useCallback(
    async (coin) => {
      console.log(`Открытие алерта для: ${coin.name}`)
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

      try {
        // 1. Проверяем текущий статус
        const { granted, status, canAskAgain } = await Notifications.getPermissionsAsync()
        console.log(
          `Текущий статус: ${status}, granted: ${granted}, canAskAgain: ${canAskAgain}`
        )

        // Функция для открытия модалки алерта
        const openAlertModalWindow = () => {
          setSelectedCoinForAlert(coin)
          setAlertModalVisible(true)
        }

        // Если разрешения уже есть
        if (granted) {
          if (!notificationPermission) {
            setNotificationPermission(true)
          }
          console.log("Уведомления уже разрешены")
          openAlertModalWindow()
          return
        }

        // 2. КРИТИЧЕСКИ ВАЖНЫЙ БЛОК ДЛЯ ANDROID 8+
        let androidChannelCreated = false
        if (Platform.OS === "android") {
          try {
            // Проверяем, существует ли уже канал
            const channels = await Notifications.getNotificationChannelsAsync?.()
            const hasChannel = channels?.some((ch) => ch.id === "price_alerts")

            if (!hasChannel) {
              console.log("Создаем канал уведомлений для Android...")
              await Notifications.setNotificationChannelAsync("price_alerts", {
                name: "Price Alerts",
                importance: Notifications.AndroidImportance.HIGH,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C",
                enableLights: true,
                enableVibrate: true,
                showBadge: true,
                bypassDnd: false // Более безопасный вариант
              })
              androidChannelCreated = true
              console.log("Канал 'price_alerts' успешно создан")
            } else {
              console.log("Канал 'price_alerts' уже существует")
              androidChannelCreated = true
            }
          } catch (channelError) {
            console.warn("Не удалось настроить канал уведомлений:", channelError)
            // Продолжаем без канала (для Android 7 и ниже это нормально)
          }
        }

        // 3. Запрашиваем разрешения с правильной конфигурацией
        let result
        if (Platform.OS === "android") {
          // Для Android - простой запрос, без дополнительных параметров
          result = await Notifications.requestPermissionsAsync()
        } else {
          // Для iOS - с настройками
          result = await Notifications.requestPermissionsAsync({
            ios: {
              allowAlert: true,
              allowBadge: true,
              allowSound: true,
              allowAnnouncements: true
            }
          })
        }

        const {
          granted: newGranted,
          status: newStatus,
          canAskAgain: newCanAskAgain
        } = result
        console.log(
          `Результат запроса: ${newStatus}, granted: ${newGranted}, canAskAgain: ${newCanAskAgain}`
        )

        // 4. Обновляем состояние и обрабатываем результат
        setNotificationPermission(newGranted)

        if (newGranted) {
          console.log("Разрешения получены, инициализируем AlertManager")
          AlertManager.initialize(dispatch)
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        } else {
          console.log("Пользователь отказал в разрешениях")

          // ОСОБАЯ ЛОГИКА ДЛЯ ANDROID 13+ (API 33+)
          if (Platform.OS === "android" && Platform.Version >= 33) {
            if (newCanAskAgain === false) {
              // Пользователь выбрал "Don't ask again"
              Alert.alert(
                "🔔 Уведомления отключены",
                "Разрешите уведомления в настройках приложения, чтобы получать алерты о ценах.",
                [
                  {
                    text: "Продолжить без уведомлений",
                    style: "cancel",
                    onPress: openAlertModalWindow
                  },
                  {
                    text: "Открыть настройки",
                    onPress: () => {
                      Linking.openSettings()
                      // Откладываем открытие модалки, чтобы пользователь увидел переход
                      setTimeout(openAlertModalWindow, 1500)
                    }
                  }
                ]
              )
              return // Не открываем модалку сразу
            }
          }

          // Для других случаев (Android <13, iOS, или можно спрашивать снова)
          Alert.alert(
            "🔔 Уведомления не разрешены",
            "Вы сможете получать уведомления о ценах, если разрешите их в настройках.",
            [
              {
                text: "Продолжить",
                style: "default",
                onPress: openAlertModalWindow
              },
              {
                text: "Настройки",
                onPress: () => {
                  Linking.openSettings()
                  setTimeout(openAlertModalWindow, 1500)
                }
              }
            ]
          )
          return // Не открываем модалку сразу, ждем выбора в Alert
        }

        // 5. Если разрешения получены, открываем модалку
        openAlertModalWindow()
      } catch (error) {
        console.error("Ошибка при запросе разрешений:", error)
        // В случае ошибки открываем модалку без разрешений
        setSelectedCoinForAlert(coin)
        setAlertModalVisible(true)
      }
    },
    [dispatch, notificationPermission]
  )

  // Функция для сохранения алерта
  const handleSaveAlert = useCallback(
    (alertData) => {
      console.log(`Сохранение алерта: ${alertData.coinName} @ $${alertData.targetPrice}`)

      // Сохраняем алерт
      dispatch(addPriceAlert(alertData))
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)

      // Показываем соответствующее сообщение
      if (notificationPermission) {
        Alert.alert(
          "✅ Alert was set!",
          `You will receive a notification when ${alertData.coinSymbol} reaches $${alertData.targetPrice}`,
          [{ text: "Great" }]
        )
      } else {
        Alert.alert(
          "Notifications are disabled",
          "The alert is saved, but you will not receive a notification when it is triggered.",
          [{ text: "Ok" }]
        )
      }
    },
    [dispatch, notificationPermission]
  )

  // Функция для удаления алерта
  const handleDeleteAlert = useCallback(
    (alertId) => {
      console.log(`🗑️ Удаление алерта: ${alertId}`)
      dispatch(deletePriceAlert(alertId))
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    },
    [dispatch]
  )

  // Функция для отметки алерта как прочитанного
  const handleMarkAlertAsRead = useCallback(
    (alertId) => {
      console.log(`Отметка алерта как прочитанного: ${alertId}`)
      dispatch(markAlertAsRead(alertId))
    },
    [dispatch]
  )

  // Удаление монеты из избранного
  const removeFromFav = useCallback(
    (coin) => {
      console.log(`\n ==== УДАЛЕНИЕ МОНЕТЫ ====`)
      // console.log(`Монета: ${coin.name} (${coin.symbol.toUpperCase()})`)
      // console.log(`Цена: $${coin.current_price || 0}`)
      // console.log(`Ранг: #${coin.market_cap_rank || "?"}`)

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      setRemovingCoinId(coin.id)

      // Удаляем все алерты для этой монеты
      const coinAlerts = priceAlerts.filter((alert) => alert.coinId === coin.id)
      coinAlerts.forEach((alert) => {
        dispatch(deletePriceAlert(alert.id))
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
    [dispatch, priceAlerts]
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
    console.log(`Текущее количество: ${userAssets[coin.id] || 0}`)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setSelectedCoinForInput(coin)
    setInputModalVisible(true)
  }

  // Сохранение количества
  const saveAmount = () => {
    if (selectedCoinForInput && amountInputRef.current) {
      let text = amountInputRef.current.replace(/,/g, ".")

      console.log(`\n ==== СОХРАНЕНИЕ КОЛИЧЕСТВА ====`)
      console.log(`Монета: ${selectedCoinForInput.name}`)
      console.log(`Введенное значение: ${amountInputRef.current}`)
      console.log(`Обработанное значение: ${text}`)

      const amount = parseFloat(text) || 0
      console.log(`Сохраняемое количество: ${amount}`)

      dispatch(
        updateUserAsset({
          coinId: selectedCoinForInput.id,
          amount: amount
        })
      )

      console.log(`Количество сохранено`)
      console.log(`==========================\n`)

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }
    setInputModalVisible(false)
    setSelectedCoinForInput(null)
    amountInputRef.current = ""
  }

  // Компонент карточки монеты
  const PremiumCoinCard = React.memo(({ item }) => {
    const isRemoving = removingCoinId === item.id
    const priceChangeColor = item.price_change_percentage_24h >= 0 ? "#00C853" : "#FF3B30"
    const priceChangeIcon =
      item.price_change_percentage_24h >= 0 ? "trending-up" : "trending-down"

    const userAmount = (userAssets && userAssets[item.id]) || 0
    const userValue = userAmount * (item.current_price || 0)

    // Получаем алерты для этой монеты
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

              {/* Правая часть - алерты сверху */}
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
                    hasActiveAlerts && styles.alertButtonActive
                  ]}
                >
                  <Ionicons
                    name={hasActiveAlerts ? "notifications" : "notifications-outline"}
                    size={16}
                    color={hasActiveAlerts ? "#D4AF37" : "rgba(255,255,255,0.6)"}
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
      {/* Заголовок с Portfolio справа */}
      <FavoriteHeader
        stats={stats}
        lastUpdateTime={lastUpdateTime}
        priceAlerts={priceAlerts}
        notificationPermission={notificationPermission}
        totalPortfolioValue={totalPortfolioValue}
        isUpdating={isUpdating}
        handleManualUpdate={handleManualUpdate}
      />
      {/*  Панель header-a с индикаторами */}
      {coinData.length > 0 && (
        <FavoriteStatsPanel
          priceAlerts={priceAlerts}
          stats={stats}
          unreadAlertsCount={unreadAlertsCount}
        />
      )}
      {/* Информация о статусе обновления */}
      {isUpdating && (
        <View style={styles.updateStatus}>
          <Text style={styles.updateStatusText}>Обновление цен...</Text>
        </View>
      )}
      {coinData.length === 0 ? (
        <EmptyState notificationPermission={notificationPermission} />
      ) : (
        <FlatList
          data={coinData}
          renderItem={({ item }) => <PremiumCoinCard item={item} />}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.premiumList}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      )}
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
