import React, { useState, useCallback, useRef, useEffect } from "react"
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  StatusBar,
  Platform,
  SafeAreaView
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import * as Haptics from "expo-haptics"
import { PinchGestureHandler, State } from "react-native-gesture-handler"
import { styles } from "./ModalFavorite.styles"
import {
  FetchCandleData,
  Get24hrMinMaxPrices,
  GetSantiment
} from "../../../components/Api/Api"
import { SwitchTimeframeButtons } from "./components/SwitchTimeframeButtons/SwitchTimeframeButtons"
import { VolumeChart } from "./components/VolumeChart/VolumeChart"
import CandlestickChart from "./components/CandlestickChart/CandlestickChart"

const { width, height } = Dimensions.get("window")

const ModalFavorite = ({ visible, onClose, selectedCoin, chartDays }) => {
  const [prices, setPrices] = useState([])
  const [minMax, setMinMax] = useState({ minPrice: null, maxPrice: null })
  const [loadingChart, setLoadingChart] = useState(false)
  const [limit, setLimit] = useState(100)
  const [santiment, setSantiment] = useState(null)

  const formatTime = (prices) => {
    if (!prices || !prices.length) return []
    return prices.map((item) => {
      const date = new Date(item.time * 1000)
      return date.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit"
      })
    })
  }

  const getTimeLabels = (prices) => {
    if (!prices || !prices.length) return []
    return prices.map((item) => {
      const date = new Date(item.time * 1000)
      return date.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit"
      })
    })
  }

  const volumeData = {
    labels:
      chartDays === "1h" || chartDays === "4h"
        ? getTimeLabels(prices)
        : formatTime(prices),
    datasets: [
      {
        data: prices.map((item) => Number(item.volume) || 0),
        color: (opacity = 1) => `rgba(255, 59, 48, ${opacity})`,
        strokeWidth: 2
      }
    ]
  }

  const getCurrentCandle = () => {
    if (!prices || prices.length === 0) return null
    return prices[prices.length - 1]
  }

  const currentCandle = getCurrentCandle()

  const fetchChartData = useCallback(
    async (coin) => {
      if (!coin) return

      try {
        const symbol = coin.symbol.toUpperCase()
        const days = chartDays

        const [minMaxPrice, candlePrices] = await Promise.all([
          Get24hrMinMaxPrices(symbol),
          FetchCandleData(symbol, days, limit)
        ])

        if (symbol === "BTC" || symbol === "ETH") {
          const response = await GetSantiment(symbol)
          setSantiment(response.Data.inOutVar.sentiment)
        } else {
          setSantiment(null)
        }

        if (candlePrices?.length > 0) {
          setPrices(candlePrices)
        } else {
          setPrices([])
        }

        setMinMax({
          minPrice: minMaxPrice.minPrice,
          maxPrice: minMaxPrice.maxPrice
        })
      } catch (error) {
        console.error(error.message)
        setPrices([])
      }
    },
    [chartDays, limit]
  )

  useEffect(() => {
    if (selectedCoin && visible) {
      fetchChartData(selectedCoin)
    }
  }, [chartDays, limit, selectedCoin, visible, fetchChartData])

  const handleOpenModal = useCallback(
    async (coin) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      setLoadingChart(true)
      await fetchChartData(coin)
      setLoadingChart(false)
    },
    [fetchChartData]
  )

  useEffect(() => {
    if (selectedCoin && visible) {
      handleOpenModal(selectedCoin)
    }
  }, [selectedCoin, visible])

  const screenHeight = height + (Platform.OS === "android" ? StatusBar.currentHeight : 0)

  return (
    <Modal
      visible={visible}
      animationType='slide'
      onRequestClose={onClose}
      statusBarTranslucent={true}
      hardwareAccelerated={true}
    >
      {Platform.OS === "ios" ? (
        <SafeAreaView style={styles.modalContainer}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <Content
              selectedCoin={selectedCoin}
              chartDays={chartDays}
              santiment={santiment}
              minMax={minMax}
              loadingChart={loadingChart}
              prices={prices}
              currentCandle={currentCandle}
              limit={limit}
              volumeData={volumeData}
              onClose={onClose}
              screenHeight={screenHeight}
              setLimit={setLimit}
            />
          </ScrollView>
        </SafeAreaView>
      ) : (
        <View style={styles.modalContainer}>
          <View style={styles.androidStatusBar} />
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <Content
              selectedCoin={selectedCoin}
              chartDays={chartDays}
              santiment={santiment}
              minMax={minMax}
              loadingChart={loadingChart}
              prices={prices}
              currentCandle={currentCandle}
              limit={limit}
              volumeData={volumeData}
              onClose={onClose}
              screenHeight={screenHeight}
              setLimit={setLimit}
            />
          </ScrollView>
        </View>
      )}
    </Modal>
  )
}

const Content = ({
  selectedCoin,
  chartDays,
  santiment,
  minMax,
  loadingChart,
  prices,
  currentCandle,
  limit,
  setLimit,
  volumeData,
  onClose,
  screenHeight
}) => {
  const chartHeight = screenHeight * 0.32
  const volumeHeight = screenHeight * 0.12

  return (
    <View style={styles.contentContainer}>
      {/* Заголовок */}
      <View style={styles.modalHeader}>
        <View style={styles.coinInfo}>
          <Text style={styles.selectedCoinName}>{selectedCoin?.name}</Text>
          <Text style={styles.selectedCoinSymbol}>
            {selectedCoin?.symbol?.toUpperCase()} • {chartDays}
          </Text>
        </View>
        <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
          <Ionicons name='close' size={20} color='#D4AF37' />
        </TouchableOpacity>
      </View>

      {/* Sentiment badge */}
      {santiment && (
        <View style={styles.sentimentBadge}>
          <Text style={[styles.sentimentText, styles[santiment]]}>
            {santiment.toUpperCase()}
          </Text>
        </View>
      )}

      {/* Инфо строка */}
      {prices.length > 0 && (
        <View style={styles.infoRow}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoText}>24h Low</Text>
            <Text style={[styles.infoValue, { color: "lightblue" }]}>
              {minMax.minPrice && !isNaN(minMax.minPrice) ? `${minMax.minPrice}$` : "N/A"}
            </Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoText}>Current</Text>
            <Text style={styles.infoValue}>
              ${selectedCoin?.current_price?.toFixed(2) || "0.00"}
            </Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoText}>24h High</Text>
            <Text style={[styles.infoValue, { color: "wheat" }]}>
              {minMax.maxPrice && !isNaN(minMax.maxPrice) ? `${minMax.maxPrice}$` : "N/A"}
            </Text>
          </View>
        </View>
      )}

      {/* График цены */}
      <View style={styles.chartWrapper}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Price Chart</Text>
          {prices.length > 0 && <Text style={styles.chartLimit}>Limit: {limit}</Text>}
        </View>

        {loadingChart ? (
          <View style={[styles.loadingContainer, { height: chartHeight }]}>
            <ActivityIndicator size='large' color='#D4AF37' />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : prices.length === 0 ? (
          // Плейсхолдер - когда вместо графика когда нет данных
          <View style={[styles.noDataPlaceholder, { height: chartHeight }]}>
            <Ionicons
              name='bar-chart-outline'
              size={48}
              color='rgba(255, 255, 255, 0.3)'
            />
            <Text style={styles.noDataPlaceholderText}>Chart Not Available</Text>
            <Text style={styles.noDataPlaceholderSubText}>
              The Binance API doesn't offer the ability to open this chart. Currently,
              detailed charts are only available for coins listed on Binance."
            </Text>
          </View>
        ) : (
          <View style={[styles.chartBox, { height: chartHeight }]}>
            <CandlestickChart
              data={prices}
              width={width * 0.9}
              height={chartHeight}
              limit={limit}
              setLimit={setLimit}
            />
          </View>
        )}

        {/* Цены под графиком */}
        {!loadingChart && prices.length > 0 && currentCandle && (
          <View style={styles.priceRow}>
            <View style={styles.priceItem}>
              <Text style={styles.priceLabel}>Low</Text>
              <Text style={[styles.priceValue, styles.priceLow]}>
                ${currentCandle.low?.toFixed(2) || "0.00"}
              </Text>
            </View>
            <View style={styles.priceItem}>
              <Text style={styles.priceLabel}>Open</Text>
              <Text style={[styles.priceValue, styles.priceOpen]}>
                ${currentCandle.open?.toFixed(2) || "0.00"}
              </Text>
            </View>
            <View style={styles.priceItem}>
              <Text style={styles.priceLabel}>Close</Text>
              <Text style={[styles.priceValue, styles.priceClose]}>
                ${currentCandle.close?.toFixed(2) || "0.00"}
              </Text>
            </View>
            <View style={styles.priceItem}>
              <Text style={styles.priceLabel}>High</Text>
              <Text style={[styles.priceValue, styles.priceHigh]}>
                ${currentCandle.high?.toFixed(2) || "0.00"}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Volume - показываем только если есть данные графика */}
      {prices.length > 0 && (
        <View style={styles.volumeSection}>
          <Text style={styles.volumeTitle}>Volume</Text>
          <View style={[styles.volumeChartContainer, { height: volumeHeight }]}>
            <VolumeChart volumeData={volumeData} height={volumeHeight} />
          </View>
        </View>
      )}

      {/* Timeframe */}
      <View style={styles.timeframeSection}>
        <View style={styles.timeframeHeader}>
          <Text style={styles.timeframeTitle}>Timeframe:</Text>
          <Text style={styles.timeframeValue}>{chartDays}</Text>
        </View>
        <SwitchTimeframeButtons chartDays={chartDays} />
      </View>

      {/* Кнопка закрытия */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ModalFavorite
