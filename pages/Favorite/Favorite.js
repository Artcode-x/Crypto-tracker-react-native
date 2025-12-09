import React, { useState, useCallback, useRef, useEffect } from "react"
import { View, FlatList, Text, Dimensions, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import * as Haptics from "expo-haptics"
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

import { formatCryptoAmount, smartFormatNumber } from "../../helpers/helpers"
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
  const [notificationPermission, setNotificationPermission] = useState(null)

  const amountInputRef = useRef("")

  // Хук обновления
  const { updateFavoritePrices } = useFavoriteUpdate(1)

  // Хук для периодической проверки алертов
  useAlertChecker(coinData, 60000)

  // Инициализация уведомлений
  useEffect(() => {
    const initializeNotifications = async () => {
      const granted = await NotificationService.requestPermissions()
      setNotificationPermission(granted)

      if (granted) {
        console.log("Уведомления разрешены")

        AlertManager.initialize(dispatch)

        // Регистрация обработчиков уведомлений
        const subscriptions = NotificationService.registerNotificationHandlers(
          (notification) => {
            console.log("Уведомление получено:", notification.request.content.data)
          },
          (response) => {
            const data = response.notification.request.content.data
            if (data.type === "price-alert" && data.alertId) {
              // Пометка алерта как прочитанного при нажатии
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
      } else {
        console.log("Уведомления не разрешены")
      }
    }

    initializeNotifications()
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
    console.log(`Монеты: ${coinData.length}`)
    console.log(`Алёрты: ${priceAlerts.length} (${unreadAlertsCount} непрочитанных)`)

    // Статистика по активным алертам
    const activeAlerts = priceAlerts.filter(
      (alert) => alert.isActive && !alert.triggeredAt
    )
    const triggeredAlerts = priceAlerts.filter((alert) => alert.triggeredAt)

    if (activeAlerts.length > 0) {
      console.log(`🔔 Активные алерты: ${activeAlerts.length}`)
      activeAlerts.forEach((alert, index) => {
        console.log(
          `   ${index + 1}. ${alert.coinSymbol}: $${alert.targetPrice} (${
            alert.condition
          })`
        )
      })
    }

    if (triggeredAlerts.length > 0) {
      console.log(` Сработавшие алерты: ${triggeredAlerts.length}`)
    }

    console.log("=============================\n")
  }, [coinData, priceAlerts, unreadAlertsCount])

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

  // Функция для открытия модалки создания алерта
  const openAlertModal = useCallback((coin) => {
    console.log(`Открытие алерта для: ${coin.name}`)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setSelectedCoinForAlert(coin)
    setAlertModalVisible(true)
  }, [])

  // Функция для сохранения алерта
  const handleSaveAlert = useCallback(
    (alertData) => {
      console.log(`Сохранение алерта: ${alertData.coinName} @ $${alertData.targetPrice}`)

      // Проверяем разрешения на уведомления
      if (!notificationPermission) {
        console.log("⚠️ Уведомления не разрешены, алерт будет сохранен без уведомлений")
      }

      dispatch(addPriceAlert(alertData))
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    },
    [dispatch, notificationPermission]
  )

  // Функция для удаления алерта (чуть позже в ui)
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
      console.log(`Монета: ${coin.name} (${coin.symbol.toUpperCase()})`)
      console.log(`Цена: $${coin.current_price || 0}`)
      console.log(`Ранг: #${coin.market_cap_rank || "?"}`)

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

      console.log(` Количество сохранено`)
      console.log(`==========================\n`)

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }
    setInputModalVisible(false)
    setSelectedCoinForInput(null)
    amountInputRef.current = ""
  }

  // Компонент карточки монеты
  // Реализовано отображение очень больших и очень маленьких чисел
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
