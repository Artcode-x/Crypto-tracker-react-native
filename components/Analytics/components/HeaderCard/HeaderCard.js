import { MaterialCommunityIcons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { ActivityIndicator, Platform, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./HeaderCard.styles"
import { formatCurrency } from "../../../../helpers/helpers"

const HeaderCard = ({
  timeframe,
  isCalculating,
  portfolioMetrics,
  hasSimulatedData,
  getColorForValue,
  handleTimeframeChange
}) => {
  // Получение иконки с учетом наличия данных
  const getChangeIcon = (value, hasData = true, tf = "24h") => {
    // Если это не 24h и данных нет
    if (tf !== "24h" && !hasData) {
      return "clock-outline" // Часики - данные загружаются
    }

    // Если данных нет (для 24h тоже)
    if (!hasData) {
      return "help-circle-outline" // Вопросительный знак
    }

    // Если данные есть но значение 0
    if (value === 0 || (value > -0.001 && value < 0.001)) {
      return "minus" // Горизонтальная линия
    }

    // Обычная логика для значений
    if (value > 5) return "rocket"
    if (value > 2) return "trending-up"
    if (value < -5) return "arrow-down-right"
    if (value < -2) return "trending-down"
    return "pulse" // Небольшие изменения
  }

  // Получение отображаемого названия периода
  const getTimeframeDisplayName = (tf) => {
    const names = {
      "24h": "24 Hours",
      "7d": "7 Days",
      "30d": "30 Days",
      All: "1 Year"
    }
    return names[tf] || tf
  }

  // Получение деталей периода
  const getTimeframeDetails = (tf) => {
    const details = {
      "24h": "Real-time data",
      "7d": "Weekly performance",
      "30d": "Monthly performance",
      All: "Yearly performance"
    }
    return details[tf] || ""
  }

  return (
    <LinearGradient
      colors={["rgba(26, 26, 26, 0.95)", "rgba(40, 40, 40, 0.9)"]}
      style={styles.headerCard}
    >
      <View style={styles.headerTop}>
        <MaterialCommunityIcons name='finance' size={24} color='#FFD700' />
        {/* {!hasSimulatedData ? (
          <Text style={styles.headerTitle}>Portfolio Analytics</Text>
        ) : null} */}
        <Text style={styles.headerTitle}>Portfolio Analytics</Text>

        {/* Индикатор данных */}
        {hasSimulatedData && (
          <View style={styles.simulationIndicator}>
            <MaterialCommunityIcons
              name='lan-disconnect'
              size={Platform.OS === "ios" ? 14 : 10}
              color='#FFD700'
            />
            {/* <Text style={styles.simulationText}>Simulated data</Text> */}
          </View>
        )}

        {isCalculating && (
          <View style={styles.calculatingIndicator}>
            <ActivityIndicator size='small' color='#FFD700' />
            {/* <Text style={styles.calculatingText}>Loading...</Text> */}
          </View>
        )}

        <View style={styles.timeframeSelector}>
          {["24h", "7d", "30d", "All"].map((tf) => (
            <TouchableOpacity
              key={tf}
              onPress={() => handleTimeframeChange(tf)}
              disabled={isCalculating}
              style={[
                styles.timeframeButton,
                timeframe === tf && styles.timeframeButtonActive,
                isCalculating && styles.timeframeButtonDisabled
              ]}
            >
              <Text
                style={[
                  styles.timeframeText,
                  timeframe === tf && styles.timeframeTextActive,
                  isCalculating && styles.timeframeTextDisabled
                ]}
              >
                {tf}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Детали периода */}
      <View style={styles.timeframeDetails}>
        <Text style={styles.timeframeDetailsText}>
          {getTimeframeDisplayName(timeframe)} • {getTimeframeDetails(timeframe)}
        </Text>
        <Text style={styles.timeframeSource}>
          Source: CoinGecko API
          {hasSimulatedData ? " (simulated data)" : ""}
          {!portfolioMetrics.allDataLoaded && timeframe !== "24h" ? " (loading...)" : ""}
        </Text>
      </View>

      <View style={styles.mainMetrics}>
        <View style={styles.metricGroup}>
          <Text style={styles.metricLabel}>Portfolio Value</Text>
          <Text style={styles.portfolioValueText}>
            {formatCurrency(portfolioMetrics.totalValue)}
          </Text>
          <Text style={styles.metricSubtext}>Current value</Text>
        </View>

        <View style={styles.metricGroup}>
          <Text style={styles.metricLabel}>
            {getTimeframeDisplayName(timeframe)} Performance
          </Text>
          <View style={styles.changeContainer}>
            <MaterialCommunityIcons
              name={getChangeIcon(
                portfolioMetrics.portfolioChange,
                portfolioMetrics.allDataLoaded || timeframe === "24h",
                timeframe
              )}
              size={20}
              color={getColorForValue(portfolioMetrics.portfolioChange)}
            />
            <Text
              style={[
                styles.metricChange,
                {
                  color: getColorForValue(portfolioMetrics.portfolioChange)
                }
              ]}
            >
              {portfolioMetrics.portfolioChange >= 0 ? "+" : ""}
              {portfolioMetrics.portfolioChange.toFixed(2)}%
              {!portfolioMetrics.allDataLoaded && timeframe !== "24h" && "*"}
            </Text>
          </View>
          <Text style={styles.metricSubtext}>
            {formatCurrency(Math.abs(portfolioMetrics.periodProfit))}
            {portfolioMetrics.periodProfit >= 0 ? " gain" : " loss"}
          </Text>
        </View>
      </View>

      {!portfolioMetrics.allDataLoaded && timeframe !== "24h" && (
        <Text style={styles.dataWarning}>
          * Some data still loading. Calculations may be incomplete.
        </Text>
      )}
    </LinearGradient>
  )
}

export default HeaderCard
