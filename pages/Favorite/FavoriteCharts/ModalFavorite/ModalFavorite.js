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
import Svg, { Rect, Line, G } from "react-native-svg"
import { RFValue } from "react-native-responsive-fontsize"
import { styles } from "./ModalFavorite.styles"
import {
  FetchCandleData,
  Get24hrMinMaxPrices,
  GetSantiment
} from "../../../../components/Api/Api"
import { SwitchTimeframeButtons } from "../../SwitchTimeframeButtons/SwitchTimeframeButtons"
import { VolumeChart } from "../VolumeChart/VolumeChart"

const { width, height } = Dimensions.get("window")

// Компонент свечного графика
const CandlestickChart = ({ data, width: chartWidth, height: chartHeight, limit }) => {
  if (!data || data.length === 0) return null

  const margin = { top: 15, right: 15, bottom: 15, left: 45 }
  const innerWidth = chartWidth - margin.left - margin.right
  const innerHeight = chartHeight - margin.top - margin.bottom

  const minPrice = Math.min(...data.map((d) => Math.min(d.low, d.open, d.close)))
  const maxPrice = Math.max(...data.map((d) => Math.max(d.high, d.open, d.close)))
  const priceRange = maxPrice - minPrice

  const xScale = (index) => margin.left + (index / (data.length - 1)) * innerWidth
  const yScale = (price) =>
    margin.top + innerHeight - ((price - minPrice) / priceRange) * innerHeight

  const generateYAxisLabels = () => {
    const numberOfLabels = 5
    const labels = []

    for (let i = 0; i <= numberOfLabels; i++) {
      const price = minPrice + (priceRange * i) / numberOfLabels
      const yPosition = yScale(price)

      let formattedPrice
      if (price >= 1000000) {
        formattedPrice = `$${(price / 1000000).toFixed(2)}M`
      } else if (price >= 1000) {
        formattedPrice = `$${(price / 1000).toFixed(2)}K`
      } else if (price >= 1) {
        formattedPrice = `$${price.toFixed(2)}`
      } else if (price >= 0.1) {
        formattedPrice = `$${price.toFixed(3)}`
      } else if (price >= 0.01) {
        formattedPrice = `$${price.toFixed(4)}`
      } else if (price >= 0.001) {
        formattedPrice = `$${price.toFixed(5)}`
      } else if (price >= 0.0001) {
        formattedPrice = `$${price.toFixed(6)}`
      } else {
        formattedPrice = `$${price.toFixed(8)}`
      }

      if (formattedPrice.length > 12) {
        formattedPrice = `$${price.toExponential(3)}`
      }

      labels.push({
        price: formattedPrice,
        y: yPosition,
        rawPrice: price
      })
    }

    return labels
  }

  const yAxisLabels = generateYAxisLabels()
  const candleWidth = Math.max(2, (innerWidth / data.length) * 0.6)

  return (
    <View style={styles.chartContainerStyle}>
      <View style={styles.limitContainer}>
        <Text style={styles.limitHint}>Pinch to zoom</Text>
      </View>

      <View style={styles.chartBox}>
        {/* Метки оси Y */}
        {yAxisLabels.map((label, index) => (
          <Text
            key={index}
            style={[
              styles.yAxisLabel,
              {
                position: "absolute",
                top: label.y - 8,
                left: 3,
                zIndex: 1,
                backgroundColor: "transparent",
                fontSize: RFValue(7)
              }
            ]}
          >
            {label.price}
          </Text>
        ))}

        {/* SVG график */}
        <Svg width={chartWidth} height={chartHeight}>
          {/* Горизонтальные линии сетки */}
          {yAxisLabels.map((label, index) => (
            <Line
              key={`grid-${index}`}
              x1={margin.left}
              y1={label.y}
              x2={chartWidth - margin.right}
              y2={label.y}
              stroke='rgba(255,255,255,0.15)'
              strokeWidth='0.5'
              strokeDasharray='2,2'
            />
          ))}

          {/* Ось X */}
          <Line
            x1={margin.left}
            y1={chartHeight - margin.bottom}
            x2={chartWidth - margin.right}
            y2={chartHeight - margin.bottom}
            stroke='rgba(255,255,255,0.4)'
            strokeWidth='1'
          />

          {/* Ось Y */}
          <Line
            x1={margin.left}
            y1={margin.top}
            x2={margin.left}
            y2={chartHeight - margin.bottom}
            stroke='rgba(255,255,255,0.4)'
            strokeWidth='1'
          />

          {/* Свечи */}
          {data.map((candle, index) => {
            const x = xScale(index) - candleWidth / 2
            const openY = yScale(candle.open)
            const closeY = yScale(candle.close)
            const highY = yScale(candle.high)
            const lowY = yScale(candle.low)

            const isBullish = candle.close >= candle.open
            const color = isBullish ? "#4CAF50" : "#F44336"
            const candleTopY = isBullish ? closeY : openY
            const candleBottomY = isBullish ? openY : closeY
            const candleHeight = Math.max(1, Math.abs(candleBottomY - candleTopY))

            return (
              <G key={index}>
                <Line
                  x1={x + candleWidth / 2}
                  y1={highY}
                  x2={x + candleWidth / 2}
                  y2={lowY}
                  stroke={color}
                  strokeWidth='0.8'
                />
                <Rect
                  x={x}
                  y={candleTopY}
                  width={candleWidth}
                  height={candleHeight}
                  fill={color}
                  stroke={color}
                  strokeWidth='0.5'
                />
              </G>
            )
          })}
        </Svg>
      </View>
    </View>
  )
}

const ModalFavorite = ({ visible, onClose, selectedCoin, chartDays }) => {
  const [prices, setPrices] = useState([])
  const [minMax, setMinMax] = useState({ minPrice: null, maxPrice: null })
  const [loadingChart, setLoadingChart] = useState(false)
  const [limit, setLimit] = useState(100)
  const [santiment, setSantiment] = useState(null)

  const scaleRef = useRef(1)

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

  const onPinchEvent = useCallback((event) => {
    const scaleChange = event.nativeEvent.scale / scaleRef.current
    if (scaleChange > 1.1) {
      setLimit((prev) => Math.max(prev - 10, 10))
      scaleRef.current = event.nativeEvent.scale
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    } else if (scaleChange < 0.9) {
      setLimit((prev) => Math.min(prev + 10, 200))
      scaleRef.current = event.nativeEvent.scale
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
  }, [])

  const onPinchStateChange = useCallback((event) => {
    if (event.nativeEvent.state === State.END) {
      scaleRef.current = 1
    }
  }, [])

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
        }

        setMinMax({
          minPrice: minMaxPrice.minPrice,
          maxPrice: minMaxPrice.maxPrice
        })
      } catch (error) {
        console.error(error.message)
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

  // Высота экрана с учетом статус бара
  const screenHeight = height + (Platform.OS === "android" ? StatusBar.currentHeight : 0)

  return (
    <Modal
      visible={visible}
      animationType='slide'
      onRequestClose={onClose}
      statusBarTranslucent={true}
      hardwareAccelerated={true}
    >
      {/* Безопасная зона для iOS */}
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
              onPinchEvent={onPinchEvent}
              onPinchStateChange={onPinchStateChange}
              volumeData={volumeData}
              onClose={onClose}
              screenHeight={screenHeight}
            />
          </ScrollView>
        </SafeAreaView>
      ) : (
        // Для Android: ручная обработка статус бара
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
              onPinchEvent={onPinchEvent}
              onPinchStateChange={onPinchStateChange}
              volumeData={volumeData}
              onClose={onClose}
              screenHeight={screenHeight}
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
  onPinchEvent,
  onPinchStateChange,
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
      <View style={styles.infoRow}>
        <View style={styles.infoBlock}>
          <Text style={styles.infoText}>24h Low</Text>
          <Text style={[styles.infoValue, { color: "lightblue" }]}>
            {minMax.minPrice}$
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
          <Text style={[styles.infoValue, { color: "wheat" }]}>{minMax.maxPrice}$</Text>
        </View>
      </View>

      {/* График цены */}
      <View style={styles.chartWrapper}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Price Chart</Text>
          <Text style={styles.chartLimit}>Limit: {limit}</Text>
        </View>

        {loadingChart ? (
          <View style={[styles.loadingContainer, { height: chartHeight }]}>
            <ActivityIndicator size='large' color='#D4AF37' />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : prices.length === 0 ? (
          <View style={[styles.loadingContainer, { height: chartHeight }]}>
            <Text style={{ color: "rgba(255,255,255,0.6)" }}>No data</Text>
          </View>
        ) : (
          <PinchGestureHandler
            onGestureEvent={onPinchEvent}
            onHandlerStateChange={onPinchStateChange}
          >
            <View style={[styles.chartBox, { height: chartHeight }]}>
              <CandlestickChart
                data={prices}
                width={width * 0.9}
                height={chartHeight}
                limit={limit}
              />
            </View>
          </PinchGestureHandler>
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

      {/* Volume */}
      <View style={styles.volumeSection}>
        <Text style={styles.volumeTitle}>Volume</Text>
        <View style={[styles.volumeChartContainer, { height: volumeHeight }]}>
          <VolumeChart volumeData={volumeData} height={volumeHeight} />
        </View>
      </View>

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
