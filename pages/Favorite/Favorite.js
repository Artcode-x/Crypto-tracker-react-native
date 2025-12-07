import React, { useState, useCallback, useRef, useEffect } from "react"
import {
  View,
  FlatList,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import * as Haptics from "expo-haptics"
import { useDispatch, useSelector } from "react-redux"
import {
  coinSelector,
  daysSelector,
  userAssetsSelector
} from "../../store/toolkitSelectors"
import { removeCoin, updateUserAsset } from "../../store/reducersSlice"
import { styles } from "./Favorite.styles"
import ModalFavorite from "./FavoriteCharts/ModalFavorite/ModalFavorite"
import { formatCryptoAmount } from "../../helpers/helpers"
import { useFavoriteUpdate } from "../../hooks/useFavoriteUpdate"
import { useAppState } from "../../hooks/useAppState"

const { width } = Dimensions.get("window")
const CARD_PADDING = 8
const CARD_MARGIN = 4
const CARD_WIDTH = (width - CARD_PADDING * 2 - CARD_MARGIN * 4) / 2

const Favorite = () => {
  const dispatch = useDispatch()
  const coinData = useSelector(coinSelector)
  const chartDays = useSelector(daysSelector)
  const userAssets = useSelector(userAssetsSelector) || {}
  const [removingCoinId, setRemovingCoinId] = useState(null)
  const [isModalVisible, setModalVisible] = useState(false)
  const [selectedCoin, setSelectedCoin] = useState(null)
  const [inputModalVisible, setInputModalVisible] = useState(false)
  const [selectedCoinForInput, setSelectedCoinForInput] = useState(null)
  const [lastUpdateTime, setLastUpdateTime] = useState(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const amountInputRef = useRef("")

  // Используем хук обновления
  const { updateFavoritePrices } = useFavoriteUpdate(1)

  // Логирование при изменении избранного
  useEffect(() => {
    console.log(`\n ==== FAVORITE: ОБНОВЛЕНИЕ ДАННЫХ ====`)
    console.log(`Количество монет: ${coinData.length}`)
    if (coinData.length > 0) {
      console.log(`Монеты в избранном:`)
      coinData.forEach((coin, index) => {
        console.log(
          `   ${index + 1}. ${coin.name} (${coin.symbol.toUpperCase()}): $${
            coin.current_price || 0
          }`
        )
      })
    }
    console.log(`Пользовательские активы:`, userAssets)
    console.log(`==== КОНЕЦ ОБНОВЛЕНИЯ ДАННЫХ ====\n`)
  }, [coinData, userAssets])

  // Обновляем при возвращении в приложение
  useAppState(() => {
    if (coinData.length > 0) {
      console.log("FAVORITE: Приложение стало активным, запускаем обновление цен")
      handleManualUpdate()
    }
  })

  // Обработчик ручного обновления
  const handleManualUpdate = useCallback(async () => {
    if (isUpdating) {
      console.log("FAVORITE: Уже идет обновление, пропускаем")
      return
    }

    console.log("FAVORITE: Ручное обновление избранного")
    setIsUpdating(true)
    setLastUpdateTime(new Date().toLocaleTimeString())

    try {
      await updateFavoritePrices()
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      console.log("FAVORITE: Ручное обновление завершено успешно")
    } catch (error) {
      console.error("FAVORITE: Ошибка ручного обновления:", error)
    } finally {
      setIsUpdating(false)
    }
  }, [updateFavoritePrices, isUpdating])

  const totalPortfolioValue = coinData.reduce((total, coin) => {
    const amount = (userAssets && userAssets[coin.id]) || 0
    return total + amount * (coin.current_price || 0)
  }, 0)

  const stats = {
    total: coinData.length,
    bullish: coinData.filter((c) => c.price_change_percentage_24h >= 0).length,
    bearish: coinData.filter((c) => c.price_change_percentage_24h < 0).length,
    top10: coinData.filter((c) => c.market_cap_rank <= 10).length
  }

  const removeFromFav = useCallback(
    (coin) => {
      console.log(`\n ==== УДАЛЕНИЕ МОНЕТЫ ====`)
      console.log(`Монета: ${coin.name} (${coin.symbol.toUpperCase()})`)
      console.log(`Цена: $${coin.current_price || 0}`)
      console.log(`Ранг: #${coin.market_cap_rank || "?"}`)
      console.log(` ==== НАЧАЛО УДАЛЕНИЯ ====\n`)

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      setRemovingCoinId(coin.id)

      setTimeout(() => {
        setRemovingCoinId(null)
        dispatch(removeCoin(coin))
        console.log(`Монета успешно удалена из избранного: ${coin.name}`)
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      }, 1500)
    },
    [dispatch]
  )

  const openChartModal = useCallback((coin) => {
    console.log(`Открытие графика для: ${coin.name} (${coin.symbol.toUpperCase()})`)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    setSelectedCoin(coin)
    setModalVisible(true)
  }, [])

  const closeChartModal = useCallback(() => {
    console.log(`Закрытие графика`)
    setModalVisible(false)
    setSelectedCoin(null)
  }, [])

  const openAmountInput = (coin) => {
    console.log(`Открытие формы ввода количества: ${coin.name}`)
    console.log(`Текущее количество: ${userAssets[coin.id] || 0}`)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setSelectedCoinForInput(coin)
    setInputModalVisible(true)
  }

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

      console.log(`Количество сохранено в Redux`)
      console.log(` ==== КОНЕЦ СОХРАНЕНИЯ ====\n`)

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }
    setInputModalVisible(false)
    setSelectedCoinForInput(null)
    amountInputRef.current = ""
  }

  const PremiumCoinCard = ({ item, index }) => {
    const isRemoving = removingCoinId === item.id
    const priceChangeColor = item.price_change_percentage_24h >= 0 ? "#00C853" : "#FF3B30"
    const priceChangeIcon =
      item.price_change_percentage_24h >= 0 ? "trending-up" : "trending-down"

    const userAmount = (userAssets && userAssets[item.id]) || 0
    const userValue = userAmount * (item.current_price || 0)

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => openChartModal(item)}
        style={{
          width: CARD_WIDTH,
          margin: CARD_MARGIN
        }}
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
            {/* Верхняя строка */}
            <View style={styles.topRow}>
              <View style={styles.rankContainer}>
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

              {/* отображение кол-ва и стоимости справа */}
              {userAmount > 0 ? (
                <>
                  <Text style={styles.userAmountText}>
                    {formatCryptoAmount(userAmount)}
                  </Text>
                  <Text style={styles.userAmountValue}>
                    $
                    {userValue.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </Text>
                </>
              ) : (
                // Пустое состояние - отображаем плейсхолдер
                <>
                  <Text style={styles.userAmountPlaceholder}>Add amount</Text>
                  <Text style={styles.userAmountPlaceholder}>$0.00</Text>
                </>
              )}
            </View>

            {/* Основной контент -  */}
            <View style={styles.coinContent}>
              <View style={styles.coinHeader}>
                <Text style={styles.coinName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.coinSymbol}>{item.symbol?.toUpperCase()}</Text>
              </View>

              <Text style={[styles.coinPrice, { color: priceChangeColor }]}>
                $
                {item.current_price?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }) || "0.00"}
              </Text>

              <View style={styles.changeRow}>
                <View
                  style={[
                    styles.changeBadge,
                    { backgroundColor: `${priceChangeColor}26` }
                  ]}
                >
                  <Ionicons name={priceChangeIcon} size={12} color={priceChangeColor} />
                  <Text style={[styles.changeText, { color: priceChangeColor }]}>
                    {Math.abs(item.price_change_percentage_24h?.toFixed(2) || 0)}%
                  </Text>
                </View>
              </View>
            </View>

            {/* ... нижние кнопки ... */}
            <View style={styles.bottomButtonsRow}>
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation()
                  openAmountInput(item)
                }}
                style={styles.amountButton}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={["rgba(212, 175, 55, 0.3)", "rgba(183, 121, 31, 0.2)"]}
                  style={styles.amountButtonGradient}
                >
                  <Ionicons name='add-circle-outline' size={14} color='#FFD700' />
                  <Text style={styles.amountButtonText}>
                    {userAmount > 0 ? "Edit" : "Add"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation()
                  removeFromFav(item)
                }}
                style={styles.deleteButton}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={
                    isRemoving
                      ? ["#F44336", "#C62828"]
                      : ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]
                  }
                  style={styles.deleteButtonGradient}
                >
                  <Ionicons
                    name={isRemoving ? "checkmark" : "close"}
                    size={14}
                    color={isRemoving ? "#FFF" : "#FF6B6B"}
                  />
                  <Text style={styles.deleteButtonText}>
                    {isRemoving ? "Removing" : "Remove"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    )
  }

  // Статистическая панель
  const StatsPanel = () => (
    <View style={styles.statsPanel}>
      <LinearGradient
        colors={["rgba(212, 175, 55, 0.15)", "rgba(183, 121, 31, 0.08)"]}
        style={styles.statsGradient}
      >
        <View style={styles.compactStats}>
          <View style={styles.statItemCompact}>
            <Ionicons name='trending-up' size={14} color='#00C853' />
            <Text style={styles.statNumberCompact}>{stats.bullish}</Text>
            <Text style={styles.statLabelCompact}>Growing</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItemCompact}>
            <Ionicons name='trending-down' size={14} color='#FF3B30' />
            <Text style={styles.statNumberCompact}>{stats.bearish}</Text>
            <Text style={styles.statLabelCompact}>Declining</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItemCompact}>
            <MaterialCommunityIcons name='diamond-stone' size={14} color='#FFD700' />
            <Text style={styles.statNumberCompact}>{stats.top10}</Text>
            <Text style={styles.statLabelCompact}>Top-10</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  )

  // Пустое состояние
  const EmptyState = () => (
    <View style={styles.emptyState}>
      <LinearGradient
        colors={["rgba(212, 175, 55, 0.1)", "rgba(183, 121, 31, 0.05)"]}
        style={styles.emptyStateGradient}
      >
        <MaterialCommunityIcons
          name='treasure-chest'
          size={60}
          color='rgba(212, 175, 55, 0.3)'
        />
        <Text style={styles.emptyTitle}>Your Watchlist is Empty</Text>
        <Text style={styles.emptySubtitle}>
          Add coins to start building your portfolio
        </Text>
      </LinearGradient>
    </View>
  )

  // Модалка для ввода количества
  const AmountInputModal = () => (
    <Modal
      visible={inputModalVisible}
      transparent={true}
      animationType='fade'
      onRequestClose={() => setInputModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={["rgba(26, 26, 26, 0.95)", "rgba(40, 40, 40, 0.9)"]}
            style={styles.modalGradient}
          >
            {selectedCoinForInput && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    Enter amount of {selectedCoinForInput.name}
                  </Text>
                  <Text style={styles.modalSubtitle}>
                    ({selectedCoinForInput.symbol?.toUpperCase()})
                  </Text>
                  {/* <Text style={styles.modalPrice}>
                    Current price: $
                    {selectedCoinForInput.current_price?.toLocaleString() || "0.00"}
                  </Text> */}
                </View>

                <TextInput
                  style={styles.amountInput}
                  key={selectedCoinForInput.id}
                  defaultValue={(userAssets[selectedCoinForInput?.id] || "").toString()}
                  onChangeText={(text) => {
                    amountInputRef.current = text
                  }}
                  placeholder='0.00'
                  placeholderTextColor='rgba(255, 255, 255, 0.3)'
                  keyboardType='decimal-pad'
                  autoFocus={true}
                />

                <View style={styles.modalButtonsRow}>
                  <TouchableOpacity
                    onPress={() => {
                      console.log("❌ Отмена ввода количества")
                      setInputModalVisible(false)
                    }}
                    style={styles.modalButtonCancel}
                  >
                    <Text style={styles.modalButtonTextCancel}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={saveAmount} style={styles.modalButtonSave}>
                    <LinearGradient
                      colors={["#D4AF37", "#B3791F"]}
                      style={styles.saveButtonGradient}
                    >
                      <Text style={styles.modalButtonTextSave}>Save</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </LinearGradient>
        </View>
      </View>
    </Modal>
  )

  return (
    <LinearGradient
      colors={["#0A0A0F", "#121218", "#0A0A0F"]}
      style={styles.premiumContainer}
    >
      {/* Заголовок с Portfolio справа */}
      <View style={styles.premiumHeader}>
        <LinearGradient
          colors={["rgba(212, 175, 55, 0.2)", "rgba(183, 121, 31, 0.1)"]}
          style={styles.headerGradient}
        >
          <MaterialCommunityIcons name='crown' size={22} color='#D4AF37' />
          <View style={styles.headerLeftContainer}>
            <Text style={styles.headerTitle}>Watchlist</Text>
            <Text style={styles.headerSubtitle}>
              Total: {stats.total} asset{stats.total !== 1 ? "s" : ""}
              {lastUpdateTime && ` | Last: ${lastUpdateTime}`}
            </Text>
          </View>

          {/* Portfolio справа */}
          <View style={styles.headerRightContainer}>
            <Text style={styles.portfolioLabel}>Portfolio</Text>
            <Text style={styles.portfolioValue}>
              $
              {totalPortfolioValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </Text>

            {/* Кнопка ручного обновления */}
            <TouchableOpacity
              onPress={handleManualUpdate}
              disabled={isUpdating}
              style={[styles.refreshButton, isUpdating && styles.refreshButtonDisabled]}
            >
              {isUpdating ? (
                <Ionicons name='time-outline' size={16} color='#D4AF37' />
              ) : (
                <Ionicons name='refresh' size={16} color='#D4AF37' />
              )}
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      {coinData.length > 0 && <StatsPanel />}

      {/* Информация о статусе обновления */}
      {isUpdating && (
        <View style={styles.updateStatus}>
          <Text style={styles.updateStatusText}>Обновление цен...</Text>
        </View>
      )}

      {coinData.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={coinData}
          renderItem={({ item, index }) => <PremiumCoinCard item={item} index={index} />}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.premiumList}
          showsVerticalScrollIndicator={false}
        />
      )}

      <AmountInputModal />

      {/* Используем вынесенную модалку */}
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
