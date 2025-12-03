import React, { useState, useCallback, useRef, useEffect } from "react"
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { Ionicons } from "@expo/vector-icons"
import * as Haptics from "expo-haptics"
import { PinchGestureHandler, State } from "react-native-gesture-handler"
import Svg, { Rect, Line, G } from "react-native-svg"

// Импортируем наши подкомпоненты и функции
import { styles } from "./ModalFavorite.styles"
import {
  FetchCandleData,
  Get24hrMinMaxPrices,
  GetSantiment
} from "../../../../components/Api/Api"
import { SwitchTimeframeButtons } from "../../SwitchTimeframeButtons/SwitchTimeframeButtons"
import { VolumeChart } from "../VolumeChart/VolumeChart" // Вынесенный компонент объема

const { width, height } = Dimensions.get("window")

// Вспомогательные функции (можно вынести в отдельный utils файл)
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

// Компонент свечного графика (остается в модалке)
const CandlestickChart = ({ data, width: chartWidth, height: chartHeight, limit }) => {
  // ... весь код CandlestickChart из оригинального файла
  // (переносим без изменений, только добавляем limit в пропсы)
  if (!data || data.length === 0) return null

  const margin = { top: 15, right: 15, bottom: 15, left: 45 }
  const innerWidth = chartWidth - margin.left - margin.right
  const innerHeight = chartHeight - margin.top - margin.bottom

  // Находим min/max для масштабирования
  const minPrice = Math.min(...data.map((d) => Math.min(d.low, d.open, d.close)))
  const maxPrice = Math.max(...data.map((d) => Math.max(d.high, d.open, d.close)))
  const priceRange = maxPrice - minPrice

  // Масштабирующие функции
  const xScale = (index) => margin.left + (index / (data.length - 1)) * innerWidth
  const yScale = (price) =>
    margin.top + innerHeight - ((price - minPrice) / priceRange) * innerHeight

  // Метки на оси Y
  const generateYAxisLabels = () => {
    const numberOfLabels = 5
    const labels = []

    for (let i = 0; i <= numberOfLabels; i++) {
      const price = minPrice + (priceRange * i) / numberOfLabels
      const yPosition = yScale(price)

      let formattedPrice
      if (price >= 1000) {
        formattedPrice = `$${(price / 1000).toFixed(1)}k`
      } else if (price >= 1) {
        formattedPrice = `$${price.toFixed(2)}`
      } else {
        formattedPrice = `$${price.toFixed(6)}`
      }

      labels.push({
        price: formattedPrice,
        y: yPosition
      })
    }

    return labels
  }

  const yAxisLabels = generateYAxisLabels()
  const currentCandle = data[data.length - 1] || {}
  const candleWidth = Math.max(2, (innerWidth / data.length) * 0.6)
  return (
    <View style={styles.chartContainerStyle}>
      {/* Индикатор лимита */}
      <View style={styles.limitContainer}>
        <Text style={styles.limitLabel}>Limit: {limit}</Text>
        <Text style={styles.limitHint}>Pinch to zoom</Text>
      </View>

      <View style={styles.box}>
        {/* Метки оси Y внутри графика */}
        {yAxisLabels.map((label, index) => (
          <Text
            key={index}
            style={[
              styles.yAxisLabel,
              {
                position: "absolute",
                top: label.y - 8,
                left: 8,
                zIndex: 1,
                backgroundColor: "transparent"
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
                {/* Тень (high-low line) */}
                <Line
                  x1={x + candleWidth / 2}
                  y1={highY}
                  x2={x + candleWidth / 2}
                  y2={lowY}
                  stroke={color}
                  strokeWidth='0.8'
                />
                {/* Тело свечи */}
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

      {/* Блок с ценами */}
      <View style={styles.priceBlock}>
        <View style={styles.priceContainer}>
          <Text style={styles.label}>Low:</Text>
          <Text style={[styles.priceValue, { color: "#F44336" }]}>
            ${currentCandle.low?.toFixed(2) || "0.00"}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.label}>Open:</Text>
          <Text style={styles.priceValue}>
            ${currentCandle.open?.toFixed(2) || "0.00"}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.label}>Close:</Text>
          <Text style={styles.priceValue}>
            ${currentCandle.close?.toFixed(2) || "0.00"}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.label}>High:</Text>
          <Text style={[styles.priceValue, { color: "#4CAF50" }]}>
            ${currentCandle.high?.toFixed(2) || "0.00"}
          </Text>
        </View>
      </View>
    </View>
  )
}

const ModalFavorite = ({
  visible,
  onClose,
  selectedCoin,
  chartDays // timeframe из Redux
}) => {
  const dispatch = useDispatch()
  const [prices, setPrices] = useState([])
  const [minMax, setMinMax] = useState({ minPrice: null, maxPrice: null })
  const [loadingChart, setLoadingChart] = useState(false)
  const [limit, setLimit] = useState(100)
  const [santiment, setSantiment] = useState(null)

  const scaleRef = useRef(1)

  // Подготавливаем данные для графика объема
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

  // Функции для масштабирования (переносим из Favorite)
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

  // Загружаем данные для графика
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

  // Обновление данных при изменении параметров
  useEffect(() => {
    if (selectedCoin && visible) {
      fetchChartData(selectedCoin)
    }
  }, [chartDays, limit, selectedCoin, visible, fetchChartData])

  // Открываем модалку с графиком
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

  return (
    <Modal visible={visible} animationType='slide' onRequestClose={onClose}>
      <ScrollView
        style={{ flex: 1, backgroundColor: "#0A0A0F" }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      >
        <View style={styles.chartContainer}>
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.selectedCoinName}>{selectedCoin?.name}</Text>
              <Text style={styles.selectedCoinSymbol}>
                {selectedCoin?.symbol?.toUpperCase()} Analysis
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
              <Ionicons name='close' size={24} color='#D4AF37' />
            </TouchableOpacity>
          </View>

          {/* Santiment для BTC и ETH */}
          {santiment && (
            <View style={styles.santimentContainer}>
              <Text style={styles.santimentText}>
                Market Sentiment:
                <Text
                  style={
                    santiment === "bullish" ? styles.bullishText : styles.bearishText
                  }
                >
                  {" "}
                  {santiment.toUpperCase()}
                </Text>
              </Text>
            </View>
          )}

          <View style={styles.minmaxBlock}>
            <Text style={styles.textUp}>
              Min 24h: <Text style={{ color: "lightblue" }}>{minMax.minPrice}$</Text>
            </Text>
            <Text style={styles.textUp}>
              Max 24h: <Text style={{ color: "wheat" }}>{minMax.maxPrice}$</Text>
            </Text>
          </View>

          {loadingChart ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size='large' color='#D4AF37' />
              <Text style={styles.loadingText}>Loading chart data...</Text>
            </View>
          ) : prices.length === 0 ? (
            <Text style={{ color: "white", textAlign: "center", marginTop: 20 }}>
              No data available
            </Text>
          ) : (
            <>
              <Text style={styles.textTit}>Price Chart:</Text>

              <PinchGestureHandler
                onGestureEvent={onPinchEvent}
                onHandlerStateChange={onPinchStateChange}
              >
                <View style={{ alignItems: "center", width: "100%" }}>
                  <CandlestickChart
                    data={prices}
                    width={width * 0.92}
                    height={height * 0.35}
                    limit={limit}
                  />
                </View>
              </PinchGestureHandler>

              {/* График объема */}
              <View style={styles.volumeSection}>
                <Text style={styles.volumeTitle}>Volume</Text>
                <VolumeChart volumeData={volumeData} />
              </View>
            </>
          )}

          {/* Selected Timeframe */}
          <View style={styles.selectedTimeframeContainer}>
            <Text style={styles.selectedTimeframeText}>
              Selected timeframe: <Text style={styles.textZ}>{chartDays}</Text>
            </Text>
          </View>

          <View style={styles.timeframeContainer}>
            <SwitchTimeframeButtons chartDays={chartDays} />
          </View>

          <View style={styles.chartButtonsClose}>
            <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
              <Text style={styles.closeb}>Close Analysis</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Modal>
  )
}

export default ModalFavorite
