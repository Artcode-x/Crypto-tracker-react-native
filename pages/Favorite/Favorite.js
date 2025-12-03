import React, { useState, useCallback } from "react"
import { View, FlatList, Text, Dimensions, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import * as Haptics from "expo-haptics"
import { useDispatch, useSelector } from "react-redux"
import { coinSelector, daysSelector } from "../../store/toolkitSelectors"
import { removeCoin } from "../../store/reducersSlice"
import ModalFavorite from "./FavoriteCharts/ModalFavorite/ModalFavorite"
import { styles } from "./Favorite.styles"

const { width } = Dimensions.get("window")
// const CARD_WIDTH = (width - 32) / 2

const CARD_WIDTH = (width - 24) / 2 // Уменьшил отступы (было 32)
const CARD_MARGIN = 4 // Уменьшил маржин (было 8)

const Favorite = () => {
  const dispatch = useDispatch()
  const coinData = useSelector(coinSelector)
  const chartDays = useSelector(daysSelector) // Получаем timeframe из Redux

  const [removingCoinId, setRemovingCoinId] = useState(null)
  const [isModalVisible, setModalVisible] = useState(false)
  const [selectedCoin, setSelectedCoin] = useState(null)

  // Статистика
  const stats = {
    total: coinData.length,
    bullish: coinData.filter((c) => c.price_change_percentage_24h >= 0).length,
    bearish: coinData.filter((c) => c.price_change_percentage_24h < 0).length,
    top10: coinData.filter((c) => c.market_cap_rank <= 10).length
  }

  // Удаляем из избранного
  const removeFromFav = useCallback(
    (coin) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      setRemovingCoinId(coin.id)

      setTimeout(() => {
        setRemovingCoinId(null)
        dispatch(removeCoin(coin))
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      }, 1500)
    },
    [dispatch]
  )

  // Открываем модалку с графиком
  const openChartModal = useCallback((coin) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    setSelectedCoin(coin)
    setModalVisible(true)
  }, [])

  // Закрываем модалку
  const closeChartModal = useCallback(() => {
    setModalVisible(false)
    setSelectedCoin(null)
  }, [])

  // Премиум карточка монеты (остается в Favorite)
  const PremiumCoinCard = ({ item, index }) => {
    const isRemoving = removingCoinId === item.id
    const priceChangeColor = item.price_change_percentage_24h >= 0 ? "#00C853" : "#FF3B30"
    const priceChangeIcon =
      item.price_change_percentage_24h >= 0 ? "trending-up" : "trending-down"

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => openChartModal(item)}
        // style={{ width: CARD_WIDTH, margin: 8 }}
        style={{ width: CARD_WIDTH, margin: CARD_MARGIN }}
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
            </View>

            {/* Основной контент */}
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

            {/* Кнопка удаления */}
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
          </LinearGradient>
        </View>
      </TouchableOpacity>
    )
  }

  // Статистическая панель (остается в Favorite)
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

  // Пустое состояние (остается в Favorite)
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
        <Text style={styles.emptyTitle}>Your Vault is Empty</Text>
        <Text style={styles.emptySubtitle}>
          Add coins to start building your portfolio
        </Text>
      </LinearGradient>
    </View>
  )

  return (
    <LinearGradient
      colors={["#0A0A0F", "#121218", "#0A0A0F"]}
      style={styles.premiumContainer}
    >
      <View style={styles.premiumHeader}>
        <LinearGradient
          colors={["rgba(212, 175, 55, 0.2)", "rgba(183, 121, 31, 0.1)"]}
          style={styles.headerGradient}
        >
          <MaterialCommunityIcons name='crown' size={22} color='#D4AF37' />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Golden Vault</Text>
            <Text style={styles.headerSubtitle}>
              {stats.total} asset{stats.total !== 1 ? "s" : ""}
            </Text>
          </View>
        </LinearGradient>
      </View>

      {coinData.length > 0 && <StatsPanel />}

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

      {/* Используем вынесенную модалку */}
      <ModalFavorite
        visible={isModalVisible}
        onClose={closeChartModal}
        selectedCoin={selectedCoin}
        chartDays={chartDays} // Передаем timeframe из Redux
      />
    </LinearGradient>
  )
}

export default Favorite
