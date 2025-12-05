import React, { useState, useEffect, useMemo } from "react"
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native"
import { useSelector } from "react-redux"
import { styles } from "./Analytics.styles"
import { LinearGradient } from "expo-linear-gradient"
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"
import { formatNumber } from "../../helpers/helpers"

const coinSelector = (store) => store.store.coinItem
const userAssetsSelector = (store) => store.store.userAssets || {}

const Analytics = () => {
  const coinData = useSelector(coinSelector)
  const userAssets = useSelector(userAssetsSelector)
  const [loading, setLoading] = useState(true)
  const [timeframe, setTimeframe] = useState("24h")
  const [expandedSection, setExpandedSection] = useState("overview")

  const portfolioMetrics = useMemo(() => {
    if (!coinData.length) return null

    // Шаг 1: Подготовка данных (иммутабельно)
    const assetsWithValues = coinData.reduce(
      (acc, coin) => {
        // кол-во актива в избранном
        const amount = userAssets[coin.id] || 0

        if (amount <= 0) return acc

        const currentValue = amount * (coin.current_price || 0)

        const priceChange = coin.price_change_percentage_24h || 0

        return {
          ...acc,
          totalValue: acc.totalValue + currentValue,
          dailyProfit: acc.dailyProfit + currentValue * (priceChange / 100),
          assets: [
            ...acc.assets,
            {
              id: coin.id,
              name: coin.name,
              symbol: coin.symbol,
              amount,
              value: currentValue,
              priceChange,
              allocation: 0
            }
          ]
        }
      },

      { totalValue: 0, dailyProfit: 0, assets: [] }
    )

    const { totalValue, dailyProfit, assets } = assetsWithValues

    // Если нет активов - возвращаем null
    if (assets.length === 0) return null

    // Шаг 2: Расчет аллокации (иммутабельно)
    const assetsWithAllocation = assets.map((asset) => ({
      ...asset,
      allocation: totalValue > 0 ? (asset.value / totalValue) * 100 : 0
    }))

    // Шаг 3: Сортировка (создание нового отсортированного массива)
    const sortedAssets = [...assetsWithAllocation].sort((a, b) => b.value - a.value)

    // Шаг 4: Находим лучший и худший актив
    const bestPerformer = [...sortedAssets].sort(
      (a, b) => b.priceChange - a.priceChange
    )[0]
    const worstPerformer = [...sortedAssets].sort(
      (a, b) => a.priceChange - b.priceChange
    )[0]

    // Шаг 5: Анализ распределения
    const allocationAnalysis = {
      top3: sortedAssets.slice(0, 3).reduce((sum, asset) => sum + asset.allocation, 0),
      concentration: sortedAssets.length > 0 ? sortedAssets[0].allocation : 0
    }

    // Шаг 6: Рассчитываем риск-метрики
    const riskMetrics = {
      volatility: calculatePortfolioVolatility(sortedAssets),
      diversificationScore: calculateDiversificationScore(sortedAssets)
    }

    // Шаг 7: Рассчитываем изменение портфеля в %
    const dailyChange = totalValue > 0 ? (dailyProfit / totalValue) * 100 : 0

    // Шаг 8: Возвращаем ВСЕ метрики
    return {
      totalValue,
      dailyProfit,
      dailyChange,
      assets: sortedAssets, // Отсортированные активы
      totalAssets: sortedAssets.length,
      bestPerformer,
      worstPerformer,
      allocationAnalysis,
      riskMetrics
    }
  }, [coinData, userAssets])

  // Функция для расчета волатильности портфеля
  function calculatePortfolioVolatility(assets) {
    if (!assets.length) return 0
    const avgVolatility =
      assets.reduce((sum, asset) => sum + Math.abs(asset.priceChange), 0) / assets.length
    return Math.min(avgVolatility, 100)
  }

  // Для расчета оценки диверсификации
  function calculateDiversificationScore(assets) {
    if (!assets.length) return 100

    // Идеальная диверсификация: равное распределение
    const idealAllocation = 100 / assets.length
    const deviation = assets.reduce(
      (sum, asset) => sum + Math.abs(asset.allocation - idealAllocation),
      0
    )

    // Нормализация оценки (меньше отклонение = лучше)
    const maxDeviation = 200 // Максимальное возможное отклонение
    const score = Math.max(0, 100 - (deviation / maxDeviation) * 100)

    return Math.round(score)
  }

  // Получение цвета в зависимости от значения
  const getColorForValue = (value, isPositiveGood = true) => {
    if (value > 0) {
      return isPositiveGood ? "#4CAF50" : "#FF5252"
    } else if (value < 0) {
      return isPositiveGood ? "#FF5252" : "#4CAF50"
    }
    return "#FFD700"
  }

  // Получение иконки для изменения цены
  const getChangeIcon = (value) => {
    if (value > 5) return "rocket"
    if (value > 2) return "trending-up"
    if (value < -5) return "crash"
    if (value < -2) return "trending-down"
    return "pulse"
  }

  // Эмуляция загрузки данных
  useEffect(() => {
    setTimeout(() => setLoading(false), 500)
  }, [])

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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Шапка с основными метриками */}
      <LinearGradient
        colors={["rgba(26, 26, 26, 0.95)", "rgba(40, 40, 40, 0.9)"]}
        style={styles.headerCard}
      >
        <View style={styles.headerTop}>
          <MaterialCommunityIcons name='finance' size={24} color='#FFD700' />
          <Text style={styles.headerTitle}>Portfolio Analytics</Text>
          <View style={styles.timeframeSelector}>
            {["24h", "7d", "30d", "All"].map((tf) => (
              <TouchableOpacity
                key={tf}
                onPress={() => setTimeframe(tf)}
                style={[
                  styles.timeframeButton,
                  timeframe === tf && styles.timeframeButtonActive
                ]}
              >
                <Text
                  style={[
                    styles.timeframeText,
                    timeframe === tf && styles.timeframeTextActive
                  ]}
                >
                  {tf}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.mainMetrics}>
          <View style={styles.metricGroup}>
            <Text style={styles.metricLabel}>Total Value</Text>
            <Text style={styles.metricValue}>
              {formatNumber(portfolioMetrics.totalValue)}
            </Text>
          </View>

          <View style={styles.metricGroup}>
            <Text style={styles.metricLabel}>24h Change</Text>
            <View style={styles.changeContainer}>
              <MaterialCommunityIcons
                name={getChangeIcon(portfolioMetrics.dailyChange)}
                size={20}
                color={getColorForValue(portfolioMetrics.dailyChange)}
              />
              <Text
                style={[
                  styles.metricChange,
                  {
                    color: getColorForValue(portfolioMetrics.dailyChange)
                  }
                ]}
              >
                {portfolioMetrics.dailyChange >= 0 ? "+" : ""}
                {portfolioMetrics.dailyChange.toFixed(2)}%
              </Text>
            </View>
            <Text style={styles.metricSubtext}>
              {formatNumber(portfolioMetrics.dailyProfit)}
            </Text>
          </View>
        </View>
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
                      color: getColorForValue(portfolioMetrics.bestPerformer?.priceChange)
                    }
                  ]}
                >
                  {portfolioMetrics.bestPerformer?.priceChange >= 0 ? "+" : ""}
                  {portfolioMetrics.bestPerformer?.priceChange?.toFixed(2)}%
                </Text>
              </View>

              <View style={styles.overviewItem}>
                <MaterialCommunityIcons name='alert-octagon' size={16} color='#FF5252' />
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

      {/* Секция распределения активов */}
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

        {expandedSection === "allocation" && (
          <View style={styles.sectionContent}>
            {portfolioMetrics.assets.map((asset, index) => (
              <View key={asset.id} style={styles.allocationRow}>
                <View style={styles.assetInfo}>
                  <Text style={styles.assetRank}>#{index + 1}</Text>
                  <View style={styles.assetNameContainer}>
                    <Text style={styles.assetName} numberOfLines={1}>
                      {asset.name}
                    </Text>
                    <Text style={styles.assetSymbol}>{asset.symbol.toUpperCase()}</Text>
                  </View>
                </View>

                <View style={styles.allocationInfo}>
                  <View style={styles.allocationBarContainer}>
                    <View
                      style={[
                        styles.allocationBar,
                        {
                          width: `${Math.min(asset.allocation * 2, 100)}%`,
                          backgroundColor: getColorForValue(asset.priceChange)
                        }
                      ]}
                    />
                  </View>
                  <Text style={styles.allocationPercent}>
                    {asset.allocation.toFixed(1)}%
                  </Text>
                </View>

                <View style={styles.assetMetrics}>
                  <Text style={styles.assetValue}>{formatNumber(asset.value)}</Text>
                  <Text
                    style={[
                      styles.assetChange,
                      {
                        color: getColorForValue(asset.priceChange)
                      }
                    ]}
                  >
                    {asset.priceChange >= 0 ? "+" : ""}
                    {asset.priceChange.toFixed(2)}%
                  </Text>
                </View>
              </View>
            ))}
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
                  </Text>
                  <View style={styles.riskIndicator}>
                    <View
                      style={[
                        styles.riskLevel,
                        {
                          width: `${portfolioMetrics.riskMetrics.volatility}%`,
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
                      ? "⚠️ Consider diversifying"
                      : portfolioMetrics.allocationAnalysis.concentration > 25
                      ? "⚖️ Balanced"
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

          {portfolioMetrics.dailyChange < -3 && (
            <View style={styles.tipItem}>
              <MaterialCommunityIcons name='alert' size={16} color='#FFD700' />
              <Text style={styles.tipText}>
                Market is down. Could be a buying opportunity for strong assets
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
    </ScrollView>
  )
}

export default Analytics
