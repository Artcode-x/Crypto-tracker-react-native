import React, { useState, useEffect, useMemo, useCallback } from "react"
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView
} from "react-native"
import { useSelector } from "react-redux"
import { styles } from "./Analytics.styles"
import { LinearGradient } from "expo-linear-gradient"
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"
import { coinSelector, userAssetsSelector } from "../../store/toolkitSelectors"
import { FetchCoinHistoricalData } from "../../components/Api/Api"
import AssetAllocationChart from "./AssetAllocationChart/AssetAllocationChart"
import {
  formatCurrency,
  generateProfessionalPalette
} from "./AssetAllocationChart/ChartUtils/ChartUtils"

const Analytics = () => {
  const coinData = useSelector(coinSelector)
  const userAssets = useSelector(userAssetsSelector)

  const [loading, setLoading] = useState(true)
  const [timeframe, setTimeframe] = useState("24h")
  const [expandedSection, setExpandedSection] = useState("overview")
  const [historicalChanges, setHistoricalChanges] = useState({})
  const [isCalculating, setIsCalculating] = useState(false)
  const [lastCalculationTime, setLastCalculationTime] = useState({})
  const [showSmallAllocations, setShowSmallAllocations] = useState(false)

  // Маппинг timeframe на дни для CoinGecko API
  const getDaysForTimeframe = (tf) => {
    const daysMap = {
      "24h": 1, // 1 день (последние 24 часа)
      "7d": 7, // 7 дней
      "30d": 30, // 30 дней
      All: 365 // 1 год
    }
    return daysMap[tf] || 1
  }

  // Проверка нужно ли пересчитывать (кэширование на 10 минут)
  const shouldRecalculate = (coinId, tf) => {
    const cacheKey = `${coinId}_${tf}`
    const lastTime = lastCalculationTime[cacheKey]

    if (!lastTime) return true

    const TEN_MINUTES = 10 * 60 * 1000
    return Date.now() - lastTime > TEN_MINUTES
  }

  // Функция для получения изменения цены за период
  const getPriceChangeForPeriod = async (coinId, days) => {
    try {
      const prices = await FetchCoinHistoricalData(coinId, days)

      if (!prices || prices.length < 2) {
        return 0
      }

      const startPrice = prices[0][1] // [timestamp, price] - первая цена
      const endPrice = prices[prices.length - 1][1] // последняя цена

      const changePercent = ((endPrice - startPrice) / startPrice) * 100
      return changePercent
    } catch (error) {
      console.error(`Error getting ${days}d change for ${coinId}:`, error.message)
      return null // null означает ошибку
    }
  }

  // Загрузка исторических данных
  const fetchHistoricalData = useCallback(
    async (tf) => {
      if (tf === "24h") return // Для 24h используем готовые данные

      setIsCalculating(true)

      try {
        const newHistoricalData = { ...historicalChanges }
        const newCalculationTimes = { ...lastCalculationTime }
        let hasNewData = false

        const days = getDaysForTimeframe(tf)

        // Для каждого актива с amount > 0
        for (const coin of coinData) {
          const amount = userAssets[coin.id] || 0
          if (amount <= 0) continue

          const cacheKey = `${coin.id}_${tf}`

          // Проверяем кэш
          if (newHistoricalData[cacheKey] && !shouldRecalculate(coin.id, tf)) {
            continue // Данные свежие
          }

          try {
            const priceChange = await getPriceChangeForPeriod(coin.id, days)

            if (priceChange !== null) {
              newHistoricalData[cacheKey] = {
                priceChange,
                timestamp: Date.now(),
                days,
                isRealData: true
              }
            } else {
              // Если ошибка API - используем симуляцию
              const baseChange = coin.price_change_percentage_24h || 0
              const simulated = simulatePriceChange(baseChange, tf)

              newHistoricalData[cacheKey] = {
                priceChange: simulated,
                timestamp: Date.now(),
                days,
                isRealData: false,
                isSimulated: true
              }
            }

            newCalculationTimes[cacheKey] = Date.now()
            hasNewData = true
          } catch (error) {
            console.error(`Error processing ${coin.name}:`, error)
            // Fallback на симуляцию
            const baseChange = coin.price_change_percentage_24h || 0
            const simulated = simulatePriceChange(baseChange, tf)

            newHistoricalData[cacheKey] = {
              priceChange: simulated,
              timestamp: Date.now(),
              days,
              isRealData: false,
              isSimulated: true
            }
            newCalculationTimes[cacheKey] = Date.now()
            hasNewData = true
          }
        }

        if (hasNewData) {
          setHistoricalChanges(newHistoricalData)
          setLastCalculationTime(newCalculationTimes)
        }
      } catch (error) {
        console.error("Error in fetchHistoricalData:", error)
      } finally {
        setIsCalculating(false)
      }
    },
    [coinData, userAssets, historicalChanges, lastCalculationTime]
  )

  // Симуляция изменения цены (если API недоступен)
  const simulatePriceChange = (base24hChange, tf) => {
    const multipliers = {
      "7d": 2.5,
      "30d": 6.0,
      All: 15.0
    }
    const multiplier = multipliers[tf] || 1
    const randomFactor = 0.9 + Math.random() * 0.2 // ±10%
    return base24hChange * multiplier * randomFactor
  }

  // Получение изменения цены для актива
  const getPriceChangeForTimeframe = (coin, tf) => {
    if (tf === "24h") {
      return coin.price_change_percentage_24h || 0
    }

    const cacheKey = `${coin.id}_${tf}`
    const cachedData = historicalChanges[cacheKey]

    if (cachedData) {
      return cachedData.priceChange
    }

    return 0 // Данные еще не загружены
  }

  // Проверка наличия реальных данных
  const hasRealData = (coinId, tf) => {
    if (tf === "24h") return true
    const cachedData = historicalChanges[`${coinId}_${tf}`]
    return cachedData?.isRealData === true
  }

  // Проверка загружены ли данные
  const hasData = (coinId, tf) => {
    if (tf === "24h") return true
    return historicalChanges[`${coinId}_${tf}`] !== undefined
  }

  // Обработчик смены таймфрейма
  const handleTimeframeChange = async (tf) => {
    setTimeframe(tf)

    if (tf !== "24h") {
      await fetchHistoricalData(tf)
    }
  }

  // Инициализация
  useEffect(() => {
    const initialize = async () => {
      // Предзагружаем данные для 7d
      await fetchHistoricalData("7d")
      setLoading(false)
    }

    initialize()
  }, [])

  // Рассчет метрик портфеля
  const portfolioMetrics = useMemo(() => {
    if (!coinData.length) return null

    let allDataLoaded = true
    let hasSimulatedData = false

    // Шаг 1: Подготовка данных
    const assetsWithValues = coinData.reduce(
      (acc, coin) => {
        const amount = userAssets[coin.id] || 0
        if (amount <= 0) return acc

        const currentValue = amount * (coin.current_price || 0)
        const priceChange = getPriceChangeForTimeframe(coin, timeframe)
        const hasDataForCoin = hasData(coin.id, timeframe)
        const hasRealDataForCoin = hasRealData(coin.id, timeframe)

        const cachedData = historicalChanges[`${coin.id}_${timeframe}`]
        if (cachedData?.isSimulated) {
          hasSimulatedData = true
        }

        if (!hasDataForCoin && timeframe !== "24h") {
          allDataLoaded = false
        }

        return {
          ...acc,
          totalValue: acc.totalValue + currentValue,
          periodProfit: acc.periodProfit + currentValue * (priceChange / 100),
          assets: [
            ...acc.assets,
            {
              id: coin.id,
              name: coin.name,
              symbol: coin.symbol,
              amount,
              value: currentValue,
              priceChange,
              hasData: hasDataForCoin,
              hasRealData: hasRealDataForCoin,
              allocation: 0
            }
          ]
        }
      },
      { totalValue: 0, periodProfit: 0, assets: [] }
    )

    const { totalValue, periodProfit, assets } = assetsWithValues

    if (assets.length === 0) return null

    // Шаг 2: Расчет аллокации
    const assetsWithAllocation = assets.map((asset) => ({
      ...asset,
      allocation: totalValue > 0 ? (asset.value / totalValue) * 100 : 0
    }))

    // Шаг 3: Сортировка по стоимости
    const sortedAssets = [...assetsWithAllocation].sort((a, b) => b.value - a.value)

    // Шаг 4: Находим лучший и худший актив (только с данными)
    const assetsWithData = sortedAssets.filter(
      (asset) => asset.hasData || timeframe === "24h"
    )

    const bestPerformer =
      assetsWithData.length > 0
        ? [...assetsWithData].sort((a, b) => b.priceChange - a.priceChange)[0]
        : sortedAssets[0]

    const worstPerformer =
      assetsWithData.length > 0
        ? [...assetsWithData].sort((a, b) => a.priceChange - b.priceChange)[0]
        : sortedAssets[0]

    // Шаг 5: Анализ распределения
    const allocationAnalysis = {
      top3: sortedAssets.slice(0, 3).reduce((sum, asset) => sum + asset.allocation, 0),
      concentration: sortedAssets.length > 0 ? sortedAssets[0].allocation : 0
    }

    // Шаг 6: Риск-метрики
    const calculatePortfolioVolatility = (assets) => {
      const assetsWithValidData = assets.filter((asset) => asset.hasData)
      if (assetsWithValidData.length === 0) return 0

      const avgVolatility =
        assetsWithValidData.reduce((sum, asset) => sum + Math.abs(asset.priceChange), 0) /
        assetsWithValidData.length

      return Math.min(avgVolatility, 100)
    }

    const calculateDiversificationScore = (assets) => {
      if (!assets.length) return 100

      const idealAllocation = 100 / assets.length
      const deviation = assets.reduce(
        (sum, asset) => sum + Math.abs(asset.allocation - idealAllocation),
        0
      )

      const maxDeviation = 200
      const score = Math.max(0, 100 - (deviation / maxDeviation) * 100)

      return Math.round(score)
    }

    const riskMetrics = {
      volatility: calculatePortfolioVolatility(sortedAssets),
      diversificationScore: calculateDiversificationScore(sortedAssets)
    }

    // Шаг 7: Изменение портфеля в %
    const portfolioChange = totalValue > 0 ? (periodProfit / totalValue) * 100 : 0

    // Шаг 8: Возвращение результата
    return {
      totalValue,
      periodProfit,
      portfolioChange,
      assets: sortedAssets,
      totalAssets: sortedAssets.length,
      bestPerformer,
      worstPerformer,
      allocationAnalysis,
      riskMetrics,
      timeframe,
      allDataLoaded,
      hasSimulatedData,
      dataStatus: allDataLoaded ? "complete" : "loading"
    }
  }, [coinData, userAssets, timeframe, historicalChanges])

  // Получение цвета в зависимости от значения
  const getColorForValue = (value, isPositiveGood = true) => {
    if (value > 0) {
      return isPositiveGood ? "#4CAF50" : "#FF5252"
    } else if (value < 0) {
      return isPositiveGood ? "#FF5252" : "#4CAF50"
    }
    return "#FFD700"
  }

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#FFD700' />
        <Text style={styles.loadingText}>Analyzing your portfolio...</Text>
      </View>
    )
  }

  if (!portfolioMetrics || portfolioMetrics.totalAssets === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons
          name='chart-box'
          size={80}
          color='rgba(255, 215, 0, 0.3)'
        />
        <Text style={styles.emptyTitle}>No Portfolio Data</Text>
        <Text style={styles.emptySubtitle}>
          Add amounts to your favorite coins to see portfolio analysis
        </Text>
      </View>
    )
  }

  // Фильтруем большие и маленькие сегменты для легенды
  const largeAssets = portfolioMetrics.assets.filter(
    (asset) => (asset.allocation / 100) * 360 >= 5
  )
  const smallAssets = portfolioMetrics.assets.filter(
    (asset) => (asset.allocation / 100) * 360 < 5
  )
  const colors = generateProfessionalPalette(portfolioMetrics.assets.length)

  return (
    <SafeAreaView style={styles.safeAreaContainer} edges={["left", "right"]}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Шапка с основными метриками */}
        <LinearGradient
          colors={["rgba(26, 26, 26, 0.95)", "rgba(40, 40, 40, 0.9)"]}
          style={styles.headerCard}
        >
          <View style={styles.headerTop}>
            <MaterialCommunityIcons name='finance' size={24} color='#FFD700' />
            <Text style={styles.headerTitle}>Portfolio Analytics</Text>

            {/* Индикатор данных */}
            {portfolioMetrics.hasSimulatedData && (
              <View style={styles.simulationIndicator}>
                <MaterialCommunityIcons name='robot' size={14} color='#FFD700' />
                <Text style={styles.simulationText}>Simulated</Text>
              </View>
            )}

            {isCalculating && (
              <View style={styles.calculatingIndicator}>
                <ActivityIndicator size='small' color='#FFD700' />
                <Text style={styles.calculatingText}>Loading...</Text>
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
              {portfolioMetrics.hasSimulatedData ? " (simulated data)" : ""}
              {!portfolioMetrics.allDataLoaded && timeframe !== "24h"
                ? " (loading...)"
                : ""}
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

        {/* Секция обзора */}
        <TouchableOpacity
          onPress={() =>
            setExpandedSection(expandedSection === "overview" ? null : "overview")
          }
          style={styles.sectionCard}
        >
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name='chart-bar' size={20} color='#FFD700' />
            <Text style={styles.sectionTitle}>Quick Overview</Text>
            <Ionicons
              name={expandedSection === "overview" ? "chevron-up" : "chevron-down"}
              size={20}
              color='#FFD700'
            />
          </View>

          {expandedSection === "overview" && (
            <View style={styles.sectionContent}>
              <View style={styles.overviewGrid}>
                <View style={styles.overviewItem}>
                  <MaterialCommunityIcons name='crown' size={16} color='#FFD700' />
                  <Text style={styles.overviewLabel}>Best Performer</Text>
                  <Text style={styles.overviewValue} numberOfLines={1}>
                    {portfolioMetrics.bestPerformer?.symbol || "N/A"}
                  </Text>
                  <Text
                    style={[
                      styles.overviewChange,
                      {
                        color: getColorForValue(
                          portfolioMetrics.bestPerformer?.priceChange
                        )
                      }
                    ]}
                  >
                    {portfolioMetrics.bestPerformer?.priceChange >= 0 ? "+" : ""}
                    {portfolioMetrics.bestPerformer?.priceChange?.toFixed(2)}%
                    {!portfolioMetrics.bestPerformer?.hasData &&
                      timeframe !== "24h" &&
                      "*"}
                  </Text>
                </View>

                <View style={styles.overviewItem}>
                  <MaterialCommunityIcons
                    name='alert-octagon'
                    size={16}
                    color='#FF5252'
                  />
                  <Text style={styles.overviewLabel}>Worst Performer</Text>
                  <Text style={styles.overviewValue} numberOfLines={1}>
                    {portfolioMetrics.worstPerformer?.symbol || "N/A"}
                  </Text>
                  <Text
                    style={[
                      styles.overviewChange,
                      {
                        color: getColorForValue(
                          portfolioMetrics.worstPerformer?.priceChange
                        )
                      }
                    ]}
                  >
                    {portfolioMetrics.worstPerformer?.priceChange >= 0 ? "+" : ""}
                    {portfolioMetrics.worstPerformer?.priceChange?.toFixed(2)}%
                    {!portfolioMetrics.worstPerformer?.hasData &&
                      timeframe !== "24h" &&
                      "*"}
                  </Text>
                </View>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{portfolioMetrics.totalAssets}</Text>
                  <Text style={styles.statLabel}>Assets</Text>
                </View>

                <View style={styles.statDivider} />

                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>
                    {Math.round(portfolioMetrics.allocationAnalysis.top3)}%
                  </Text>
                  <Text style={styles.statLabel}>Top 3</Text>
                </View>

                <View style={styles.statDivider} />

                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>
                    {portfolioMetrics.riskMetrics.diversificationScore}
                  </Text>
                  <Text style={styles.statLabel}>Diversification</Text>
                </View>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* Секция распределения активов  */}
        <TouchableOpacity
          onPress={() =>
            setExpandedSection(expandedSection === "allocation" ? null : "allocation")
          }
          style={styles.sectionCard}
        >
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name='chart-pie' size={20} color='#FFD700' />
            <Text style={styles.sectionTitle}>Asset Allocation</Text>
            <Ionicons
              name={expandedSection === "allocation" ? "chevron-up" : "chevron-down"}
              size={20}
              color='#FFD700'
            />
          </View>

          {expandedSection === "allocation" && portfolioMetrics && (
            <View style={styles.sectionContent}>
              {/* Премиальная диаграмма */}
              <View style={styles.premiumChartSection}>
                <AssetAllocationChart portfolioMetrics={portfolioMetrics} />
              </View>

              {/* Объединенная легенда с маленькими аллокациями внутри */}
              {portfolioMetrics.assets && portfolioMetrics.assets.length > 0 ? (
                <View style={styles.combinedLegendContainer}>
                  <Text style={styles.combinedLegendTitle}>Allocation Details</Text>

                  {/* Маленькие аллокации (если есть) */}
                  {smallAssets.length > 0 && (
                    <View style={styles.smallAllocationsSection}>
                      <TouchableOpacity
                        style={styles.smallAllocationsHeader}
                        onPress={() => setShowSmallAllocations(!showSmallAllocations)}
                      >
                        <MaterialCommunityIcons
                          name={showSmallAllocations ? "chevron-up" : "chevron-down"}
                          size={16}
                          color='#FFD700'
                        />
                        <Text style={styles.smallAllocationsTitle}>
                          Small Allocations ({smallAssets.length})
                        </Text>
                        <View style={styles.smallAllocationsBadge}>
                          <Text style={styles.smallAllocationsBadgeText}>
                            {smallAssets.length}
                          </Text>
                        </View>
                      </TouchableOpacity>

                      {showSmallAllocations && (
                        <View style={styles.smallAllocationsGrid}>
                          {smallAssets.map((asset, index) => {
                            const colorIndex = portfolioMetrics.assets.findIndex(
                              (a) => a.id === asset.id
                            )
                            const color = colors[colorIndex]

                            return (
                              <View key={asset.id} style={styles.smallAllocationItem}>
                                <View
                                  style={[
                                    styles.smallAllocationColor,
                                    { backgroundColor: color }
                                  ]}
                                />
                                <Text
                                  style={styles.smallAllocationSymbol}
                                  numberOfLines={1}
                                >
                                  {asset.symbol?.toUpperCase()}
                                </Text>
                                <Text style={styles.smallAllocationPercent}>
                                  {asset.allocation.toFixed(1)}%
                                </Text>
                              </View>
                            )
                          })}
                        </View>
                      )}

                      {!showSmallAllocations && smallAssets.length > 4 && (
                        <Text style={styles.smallAllocationsHint}>
                          Tap to expand {smallAssets.length} small allocations
                        </Text>
                      )}
                    </View>
                  )}
                  {/* Большие аллокации */}
                  {largeAssets.map((asset, index) => {
                    const colorIndex = portfolioMetrics.assets.findIndex(
                      (a) => a.id === asset.id
                    )
                    const color = colors[colorIndex]

                    return (
                      <View key={asset.id} style={styles.legendItem}>
                        <View style={styles.legendLeft}>
                          <View
                            style={[styles.legendColor, { backgroundColor: color }]}
                          />
                          <View style={styles.legendText}>
                            <Text style={styles.legendSymbol}>
                              {asset.symbol?.toUpperCase()}
                            </Text>
                            <Text style={styles.legendName} numberOfLines={1}>
                              {asset.name}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.legendRight}>
                          <Text style={styles.legendAllocation}>
                            {asset.allocation.toFixed(1)}%
                          </Text>
                          <Text
                            style={[
                              styles.legendChange,
                              { color: getColorForValue(asset.priceChange) }
                            ]}
                          >
                            {asset.priceChange >= 0 ? "+" : ""}
                            {asset.priceChange.toFixed(2)}%
                          </Text>
                        </View>
                      </View>
                    )
                  })}
                </View>
              ) : (
                <View style={styles.emptyLegend}>
                  <Text style={styles.emptyLegendText}>
                    Add assets to see allocation chart
                  </Text>
                </View>
              )}
            </View>
          )}
        </TouchableOpacity>

        {/* Секция риска */}
        <TouchableOpacity
          onPress={() => setExpandedSection(expandedSection === "risk" ? null : "risk")}
          style={styles.sectionCard}
        >
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name='shield' size={20} color='#FFD700' />
            <Text style={styles.sectionTitle}>Risk Analysis</Text>
            <Ionicons
              name={expandedSection === "risk" ? "chevron-up" : "chevron-down"}
              size={20}
              color='#FFD700'
            />
          </View>

          {expandedSection === "risk" && (
            <View style={styles.sectionContent}>
              <View style={styles.riskMetrics}>
                <View style={styles.riskItem}>
                  <View style={styles.riskHeader}>
                    <MaterialCommunityIcons
                      name='chart-bell-curve'
                      size={16}
                      color='#FF5252'
                    />
                    <Text style={styles.riskLabel}>Portfolio Volatility</Text>
                  </View>
                  <View style={styles.riskValueContainer}>
                    <Text style={styles.riskValue}>
                      {portfolioMetrics.riskMetrics.volatility.toFixed(1)}%
                      {!portfolioMetrics.allDataLoaded && timeframe !== "24h" && "*"}
                    </Text>
                    <View style={styles.riskIndicator}>
                      <View
                        style={[
                          styles.riskLevel,
                          {
                            width: `${Math.min(
                              portfolioMetrics.riskMetrics.volatility,
                              100
                            )}%`,
                            backgroundColor:
                              portfolioMetrics.riskMetrics.volatility > 30
                                ? "#FF5252"
                                : portfolioMetrics.riskMetrics.volatility > 15
                                ? "#FFD700"
                                : "#4CAF50"
                          }
                        ]}
                      />
                    </View>
                    <Text style={styles.riskDescription}>
                      Average price swing of your assets
                    </Text>
                  </View>
                </View>

                <View style={styles.riskItem}>
                  <View style={styles.riskHeader}>
                    <MaterialCommunityIcons name='diversify' size={16} color='#4CAF50' />
                    <Text style={styles.riskLabel}>Diversification Score</Text>
                  </View>
                  <View style={styles.riskValueContainer}>
                    <Text style={styles.riskValue}>
                      {portfolioMetrics.riskMetrics.diversificationScore}/100
                    </Text>
                    <View style={styles.riskIndicator}>
                      <View
                        style={[
                          styles.riskLevel,
                          {
                            width: `${portfolioMetrics.riskMetrics.diversificationScore}%`,
                            backgroundColor:
                              portfolioMetrics.riskMetrics.diversificationScore > 70
                                ? "#4CAF50"
                                : portfolioMetrics.riskMetrics.diversificationScore > 40
                                ? "#FFD700"
                                : "#FF5252"
                          }
                        ]}
                      />
                    </View>
                    <Text style={styles.riskDescription}>
                      How well your portfolio is spread
                    </Text>
                  </View>
                </View>

                <View style={styles.riskItem}>
                  <View style={styles.riskHeader}>
                    <MaterialCommunityIcons
                      name='target'
                      size={16}
                      color={getColorForValue(
                        portfolioMetrics.allocationAnalysis.concentration,
                        false
                      )}
                    />
                    <Text style={styles.riskLabel}>Top Asset Concentration</Text>
                  </View>
                  <View style={styles.riskValueContainer}>
                    <Text style={styles.riskValue}>
                      {portfolioMetrics.allocationAnalysis.concentration.toFixed(1)}%
                    </Text>
                    <Text style={styles.riskAdvice}>
                      {portfolioMetrics.allocationAnalysis.concentration > 40
                        ? "⚠️ High concentration - consider diversifying"
                        : portfolioMetrics.allocationAnalysis.concentration > 25
                        ? "⚖️ Moderately concentrated"
                        : "✅ Well diversified"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* Секция рекомендаций */}
        <View style={styles.recommendationCard}>
          <View style={styles.recommendationHeader}>
            <MaterialCommunityIcons name='lightbulb' size={20} color='#FFD700' />
            <Text style={styles.recommendationTitle}>Insights & Tips</Text>
          </View>

          <View style={styles.recommendationContent}>
            {portfolioMetrics.totalAssets <= 2 && (
              <View style={styles.tipItem}>
                <MaterialCommunityIcons name='plus-circle' size={16} color='#4CAF50' />
                <Text style={styles.tipText}>
                  Consider adding more assets to improve diversification
                </Text>
              </View>
            )}

            {portfolioMetrics.allocationAnalysis.concentration > 40 && (
              <View style={styles.tipItem}>
                <MaterialCommunityIcons name='scale-balance' size={16} color='#FF5252' />
                <Text style={styles.tipText}>
                  High concentration in top asset. Consider rebalancing
                </Text>
              </View>
            )}

            {portfolioMetrics.portfolioChange < -3 && (
              <View style={styles.tipItem}>
                <MaterialCommunityIcons name='alert' size={16} color='#FFD700' />
                <Text style={styles.tipText}>
                  Market is down. Could be a buying opportunity for strong assets
                </Text>
              </View>
            )}

            {timeframe !== "24h" && !portfolioMetrics.allDataLoaded && (
              <View style={styles.tipItem}>
                <MaterialCommunityIcons name='clock-outline' size={16} color='#2196F3' />
                <Text style={styles.tipText}>
                  Historical data is still loading. Check back in a moment.
                </Text>
              </View>
            )}

            {portfolioMetrics.hasSimulatedData && (
              <View style={styles.tipItem}>
                <MaterialCommunityIcons name='robot' size={16} color='#9C27B0' />
                <Text style={styles.tipText}>
                  Using simulated data for some assets. Real data may vary.
                </Text>
              </View>
            )}

            <View style={styles.tipItem}>
              <MaterialCommunityIcons name='chart-line' size={16} color='#4CAF50' />
              <Text style={styles.tipText}>
                Track your portfolio regularly and rebalance quarterly
              </Text>
            </View>
          </View>
        </View>

        {/* Футер с информацией */}
        {(!portfolioMetrics.allDataLoaded || portfolioMetrics.hasSimulatedData) && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {!portfolioMetrics.allDataLoaded &&
                timeframe !== "24h" &&
                "• Some data still loading\n"}
              {portfolioMetrics.hasSimulatedData &&
                "• Simulated data used where API failed\n"}
              • Data updates every 10 minutes
            </Text>
          </View>
        )}

        {/* Пустой блок для отступа снизу */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Analytics
