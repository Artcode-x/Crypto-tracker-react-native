import {
  ActivityIndicator,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Animated,
  Platform
} from "react-native"
import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setChartDays } from "../../store/reducersSlice"
import { daysSelector } from "../../store/toolkitSelectors"
import { ChartBlack } from "./ChartBlack/ChartBlack"
import { ChartWhite } from "./ChartWhite/ChartWhite"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import * as Haptics from "expo-haptics"
import { styles } from "./Chart.styles"

export const Chart = ({
  selectedCoinData,
  chartData,
  modalVisible,
  closeModal,
  isloading,
  coinHistoryData
}) => {
  const [is30DSelected, setIs30DSelected] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.9)).current
  const scrollViewRef = useRef(null)

  const chartDays = useSelector(daysSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    if (modalVisible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        })
      ]).start()
      // Прокрутка в начало при открытии
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: false })
      }, 100)
    } else {
      fadeAnim.setValue(0)
      scaleAnim.setValue(0.9)
    }
  }, [modalVisible])

  const openChart = (days) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    if (days === 30) {
      setIs30DSelected(true)
    } else {
      setIs30DSelected(false)
    }
    dispatch(setChartDays(days))
  }

  const toggleTheme = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setIsDarkTheme(!isDarkTheme)
  }

  const getPriceChangeColor = (value) => {
    return value >= 0 ? "#00C853" : "#FF3B30"
  }

  const formatPrice = (price) => {
    if (!price) return "$0.00"
    return price >= 1
      ? `$${price.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}`
      : `$${price.toFixed(6)}`
  }

  const formatLargeNumber = (num) => {
    if (!num) return "0"
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2) + "B"
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(2) + "K"
    }
    return num.toFixed(2)
  }

  const timePeriods = [
    { label: "24H", value: 1 },
    { label: "7D", value: 7 },
    { label: "14D", value: 14 },
    { label: "30D", value: 30 }
  ]

  // Определение тренда для отображения индикатора
  const getTrendIndicator = () => {
    if (!chartData?.prices || chartData.prices.length < 2) return null

    const firstPrice = chartData.prices[0]
    const lastPrice = chartData.prices[chartData.prices.length - 1]
    const isPositive = lastPrice > firstPrice

    return {
      isPositive,
      percentage: Math.abs(((lastPrice - firstPrice) / firstPrice) * 100).toFixed(2),
      currentPrice: lastPrice
    }
  }

  const trendData = getTrendIndicator()

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
      statusBarTranslucent={true}
    >
      <View style={styles.modalBlurContainer}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <LinearGradient
            colors={["#0A0A0F", "#121218", "#0A0A0F"]}
            style={styles.modalContent}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Заголовок с кнопкой закрытия */}
            <View style={styles.header}>
              <View style={styles.coinHeader}>
                <View style={styles.coinImageContainer}>
                  <Image
                    source={{ uri: selectedCoinData?.image }}
                    style={styles.coinImage}
                  />
                  <View style={styles.coinImageGlow} />
                </View>
                <View style={styles.coinTitleContainer}>
                  <Text style={styles.coinName} numberOfLines={1}>
                    {selectedCoinData?.name}
                  </Text>
                  <Text style={styles.coinSymbol}>
                    {selectedCoinData?.symbol?.toUpperCase()}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={closeModal}
                style={styles.closeButton}
                activeOpacity={0.7}
              >
                <Ionicons name='close' size={22} color='#D4AF37' />
              </TouchableOpacity>
            </View>

            {/* Основной скролл для контента */}
            <ScrollView
              ref={scrollViewRef}
              showsVerticalScrollIndicator={false}
              style={styles.mainScroll}
              contentContainerStyle={styles.mainScrollContent}
            >
              {/* Цена и изменение */}
              <View style={styles.priceSection}>
                <Text style={styles.currentPrice}>
                  {formatPrice(selectedCoinData?.current_price)}
                </Text>
                <View
                  style={[
                    styles.priceChangeBadge,
                    {
                      backgroundColor:
                        selectedCoinData?.price_change_percentage_24h >= 0
                          ? "rgba(0, 200, 83, 0.15)"
                          : "rgba(255, 59, 48, 0.15)"
                    }
                  ]}
                >
                  <Ionicons
                    name={
                      selectedCoinData?.price_change_percentage_24h >= 0
                        ? "trending-up"
                        : "trending-down"
                    }
                    size={14}
                    color={getPriceChangeColor(
                      selectedCoinData?.price_change_percentage_24h
                    )}
                  />
                  <Text
                    style={[
                      styles.priceChangeText,
                      {
                        color: getPriceChangeColor(
                          selectedCoinData?.price_change_percentage_24h
                        )
                      }
                    ]}
                  >
                    {Math.abs(selectedCoinData?.price_change_percentage_24h?.toFixed(2))}%
                  </Text>
                </View>
              </View>

              {/* Стата */}
              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <View style={styles.statHeader}>
                    <MaterialIcons name='arrow-upward' size={14} color='#00C853' />
                    <Text style={styles.statLabel}>High</Text>
                  </View>
                  <Text style={styles.statValue}>
                    {formatPrice(selectedCoinData?.high_24h)}
                  </Text>
                </View>

                <View style={styles.statCard}>
                  <View style={styles.statHeader}>
                    <MaterialIcons name='arrow-downward' size={14} color='#FF3B30' />
                    <Text style={styles.statLabel}>Low</Text>
                  </View>
                  <Text style={styles.statValue}>
                    {formatPrice(selectedCoinData?.low_24h)}
                  </Text>
                </View>

                <View style={styles.statCard}>
                  <View style={styles.statHeader}>
                    <MaterialIcons name='emoji-events' size={14} color='#D4AF37' />
                    <Text style={styles.statLabel}>Rank</Text>
                  </View>
                  <Text style={styles.statValue}>
                    #{selectedCoinData?.market_cap_rank}
                  </Text>
                </View>

                <View style={styles.statCard}>
                  <View style={styles.statHeader}>
                    <MaterialIcons name='bar-chart' size={14} color='#667EEA' />
                    <Text style={styles.statLabel}>Market Cap</Text>
                  </View>
                  <Text style={styles.statValue}>
                    ${formatLargeNumber(selectedCoinData?.market_cap)}
                  </Text>
                </View>
              </View>

              {/* Индикатор тренда */}
              {trendData && !isloading && (
                <View style={styles.trendIndicator}>
                  <View
                    style={[
                      styles.trendDot,
                      { backgroundColor: trendData.isPositive ? "#00C853" : "#FF3B30" }
                    ]}
                  />
                  <Text style={styles.trendText}>
                    {trendData.isPositive ? "↗ BULLISH" : "↘ BEARISH"} TREND
                  </Text>
                  <Text
                    style={[
                      styles.trendPercentage,
                      { color: trendData.isPositive ? "#00C853" : "#FF3B30" }
                    ]}
                  >
                    {trendData.percentage}%
                  </Text>
                </View>
              )}

              {/* Кнопки переключения таймфреймов графика */}
              <View style={styles.timePeriodsContainer}>
                {timePeriods.map((period) => (
                  <TouchableOpacity
                    key={period.value}
                    onPress={() => openChart(period.value)}
                    style={[
                      styles.timePeriodButton,
                      chartDays === period.value && styles.timePeriodButtonActive
                    ]}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.timePeriodText,
                        chartDays === period.value && styles.timePeriodTextActive
                      ]}
                    >
                      {period.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* График с переключателем темы */}
              <View style={styles.chartSection}>
                <View style={styles.chartHeader}>
                  <Text style={styles.chartTitle}>Price Chart</Text>
                  <TouchableOpacity
                    onPress={toggleTheme}
                    style={styles.themeToggle}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      colors={
                        isDarkTheme ? ["#D4AF37", "#F7EF8A"] : ["#2D3748", "#4A5568"]
                      }
                      style={styles.themeToggleGradient}
                    >
                      <Ionicons
                        name={isDarkTheme ? "moon" : "sunny"}
                        size={16}
                        color={isDarkTheme ? "#0A0A0F" : "#CBD5E0"}
                      />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>

                {isloading ? (
                  <View style={styles.chartLoader}>
                    <ActivityIndicator size='large' color='#D4AF37' />
                    <Text style={styles.loadingText}>Loading chart...</Text>
                  </View>
                ) : (
                  <View style={styles.chartWrapper}>
                    {isDarkTheme ? (
                      <ChartBlack
                        coinHistoryData={coinHistoryData}
                        chartData={chartData}
                        is30DSelected={is30DSelected}
                        trendData={trendData}
                      />
                    ) : (
                      <ChartWhite
                        coinHistoryData={coinHistoryData}
                        chartData={chartData}
                        is30DSelected={is30DSelected}
                        trendData={trendData}
                      />
                    )}
                  </View>
                )}
              </View>

              {/* Дополнительная инфо */}
              <View style={styles.additionalSection}>
                <Text style={styles.sectionTitle}>Additional Info</Text>

                <View style={styles.additionalGrid}>
                  <View style={styles.additionalCard}>
                    <LinearGradient
                      colors={["rgba(0, 200, 83, 0.1)", "rgba(0, 200, 83, 0.05)"]}
                      style={styles.additionalCardGradient}
                    >
                      <View style={styles.additionalIconContainer}>
                        <MaterialIcons name='show-chart' size={18} color='#00C853' />
                      </View>
                      <View>
                        <Text style={styles.additionalLabel}>7D Change</Text>
                        <Text
                          style={[
                            styles.additionalValue,
                            {
                              color: getPriceChangeColor(
                                selectedCoinData?.price_change_percentage_7d_in_currency
                              )
                            }
                          ]}
                        >
                          {selectedCoinData?.price_change_percentage_7d_in_currency?.toFixed(
                            2
                          )}
                          %
                        </Text>
                      </View>
                    </LinearGradient>
                  </View>

                  <View style={styles.additionalCard}>
                    <LinearGradient
                      colors={["rgba(212, 175, 55, 0.1)", "rgba(212, 175, 55, 0.05)"]}
                      style={styles.additionalCardGradient}
                    >
                      <View style={styles.additionalIconContainer}>
                        <MaterialIcons name='attach-money' size={18} color='#D4AF37' />
                      </View>
                      <View>
                        <Text style={styles.additionalLabel}>24H Volume</Text>
                        <Text style={styles.additionalValue}>
                          ${formatLargeNumber(selectedCoinData?.total_volume)}
                        </Text>
                      </View>
                    </LinearGradient>
                  </View>

                  <View style={styles.additionalCard}>
                    <LinearGradient
                      colors={["rgba(102, 126, 234, 0.1)", "rgba(102, 126, 234, 0.05)"]}
                      style={styles.additionalCardGradient}
                    >
                      <View style={styles.additionalIconContainer}>
                        <MaterialIcons name='trending-up' size={18} color='#667EEA' />
                      </View>
                      <View>
                        <Text style={styles.additionalLabel}>24H Change</Text>
                        <Text
                          style={[
                            styles.additionalValue,
                            {
                              color: getPriceChangeColor(
                                selectedCoinData?.price_change_24h
                              )
                            }
                          ]}
                        >
                          {formatPrice(selectedCoinData?.price_change_24h)}
                        </Text>
                      </View>
                    </LinearGradient>
                  </View>

                  <View style={styles.additionalCard}>
                    <LinearGradient
                      colors={["rgba(156, 39, 176, 0.1)", "rgba(156, 39, 176, 0.05)"]}
                      style={styles.additionalCardGradient}
                    >
                      <View style={styles.additionalIconContainer}>
                        <MaterialIcons name='stars' size={18} color='#9C27B0' />
                      </View>
                      <View>
                        <Text style={styles.additionalLabel}>ATH</Text>
                        <Text style={styles.additionalValue}>
                          {formatPrice(selectedCoinData?.ath)}
                        </Text>
                      </View>
                    </LinearGradient>
                  </View>
                </View>
              </View>

              {/* Рыночные данные */}
              {selectedCoinData?.market_data && (
                <View style={styles.marketDataSection}>
                  <Text style={styles.sectionTitle}>Market Data</Text>
                  <View style={styles.marketDataGrid}>
                    <View style={styles.marketDataCard}>
                      <Text style={styles.marketDataLabel}>Circulating Supply</Text>
                      <Text style={styles.marketDataValue}>
                        {formatLargeNumber(
                          selectedCoinData?.market_data?.circulating_supply
                        )}
                      </Text>
                    </View>
                    <View style={styles.marketDataCard}>
                      <Text style={styles.marketDataLabel}>Total Supply</Text>
                      <Text style={styles.marketDataValue}>
                        {formatLargeNumber(selectedCoinData?.market_data?.total_supply) ||
                          "∞"}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </ScrollView>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  )
}
