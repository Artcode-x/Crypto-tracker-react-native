import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { View, FlatList, Modal, Text, Dimensions } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { coinSelector, daysSelector } from "../../store/toolkitSelectors"
import CoinItem from "../../components/CoinItem/CoinItem"
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native"
import { removeCoin } from "../../store/reducersSlice"
import { styles } from "./Favorite.styles"
import { formatTime, getTimeLabels } from "../../helpers/helpers"
import {
  FetchCandleData,
  Get24hrMinMaxPrices,
  GetSantiment
} from "../../components/Api/Api"
import { VolumeChart } from "./FavoriteCharts/VolumeChart/VolumeChart"
import { SwitchTimeframeButtons } from "./SwitchTimeframeButtons/SwitchTimeframeButtons"
import { PinchGestureHandler, TapGestureHandler } from "react-native-gesture-handler"
import Svg, { Rect, Line, G } from "react-native-svg"
import * as shape from "d3-shape"

const Favorite = () => {
  const dispatch = useDispatch()
  const coinData = useSelector(coinSelector)
  const chartDays = useSelector(daysSelector)

  const [flag, setFlag] = useState({})
  const [prices, setPrices] = useState([])
  const [isModalVisible, setModalVisible] = useState(false)
  const [minMax, setMinMax] = useState({ minPrice: null, maxPrice: null })
  const [sant, setSant] = useState(null)
  const [selectedCoin, setSelectedCoin] = useState(null)
  const [limit, setLimit] = useState(100)
  const scaleRef = useRef(1)

  // Удаляем из избранного
  const removeFromFav = (coin) => {
    setFlag((prev) => ({ ...prev, [coin.id]: true }))
    setTimeout(() => {
      setFlag({})
      dispatch(removeCoin(coin))
    }, 1500)
  }

  const openModal = (coin) => {
    setSelectedCoin(coin)
    setModalVisible(true)
  }

  const fetchData = async () => {
    if (!selectedCoin) return
    const symbol = selectedCoin.symbol.toUpperCase()
    const days = chartDays

    try {
      const [minMaxPrice, candlePrices] = await Promise.all([
        Get24hrMinMaxPrices(symbol),
        FetchCandleData(symbol, days, limit)
      ])

      if (symbol === "BTC" || symbol === "ETH") {
        const response = await GetSantiment(symbol)
        setSant(response.Data.inOutVar.sentiment)
      } else {
        setSant(null)
      }

      if (candlePrices && candlePrices.length > 0) {
        setPrices(candlePrices)
      }

      setMinMax({
        minPrice: minMaxPrice.minPrice,
        maxPrice: minMaxPrice.maxPrice
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  // Компонент свечного графика
  const CandlestickChart = ({ data, width, height }) => {
    if (!data || data.length === 0) return null

    const chartWidth = width * 0.95
    const chartHeight = height * 0.8
    const margin = { top: 20, right: 20, bottom: 30, left: 40 }
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

    // Текущие цены для отображения
    const currentCandle = data[data.length - 1] || {}
    const candleWidth = Math.max(3, (innerWidth / data.length) * 0.6)

    return (
      <View style={{ alignItems: "center" }}>
        <Text style={styles.limits}>Limit: {limit}</Text>

        <Svg width={chartWidth} height={chartHeight}>
          {/* Свечи */}
          {data.map((candle, index) => {
            const x = xScale(index) - candleWidth / 2
            const openY = yScale(candle.open)
            const closeY = yScale(candle.close)
            const highY = yScale(candle.high)
            const lowY = yScale(candle.low)

            const isBullish = candle.close >= candle.open
            const color = isBullish ? "#4CAF50" : "#F44336"
            const candleHeight = Math.abs(closeY - openY) || 1

            return (
              <G key={index}>
                {/* Тень (high-low line) */}
                <Line
                  x1={x + candleWidth / 2}
                  y1={highY}
                  x2={x + candleWidth / 2}
                  y2={lowY}
                  stroke={color}
                  strokeWidth='1'
                />
                {/* Тело свечи */}
                <Rect
                  x={x}
                  y={isBullish ? openY : closeY}
                  width={candleWidth}
                  height={candleHeight}
                  fill={color}
                  stroke={color}
                  strokeWidth='1'
                />
              </G>
            )
          })}
        </Svg>

        {/* Блок с ценами */}
        <View style={styles.priceBlock}>
          <View style={styles.priceContainer}>
            <Text style={styles.label}>Low:</Text>
            <Text style={styles.priceValue}>
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
            <Text style={styles.priceValue}>
              ${currentCandle.high?.toFixed(2) || "0.00"}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  const volumeData = {
    labels:
      chartDays === "1h" || chartDays === "4h"
        ? getTimeLabels(prices)
        : formatTime(prices),
    datasets: [
      {
        data: prices.map((item) => Number(item.volume) || 0),
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2
      }
    ]
  }

  // Жесты масштабирования (оставляем без изменений)
  const onPinchEvent = (event) => {
    const scaleChange = event.nativeEvent.scale / scaleRef.current
    if (scaleChange > 1.1) {
      setLimit((prev) => Math.max(prev - 10, 10))
      scaleRef.current = event.nativeEvent.scale
    } else if (scaleChange < 0.9) {
      setLimit((prev) => Math.min(prev + 10, 200))
      scaleRef.current = event.nativeEvent.scale
    }
  }

  const onPinchStateChange = (event) => {
    if (event.nativeEvent.state === 5) {
      scaleRef.current = 1
    }
  }

  useEffect(() => {
    if (isModalVisible) {
      fetchData()
    }
  }, [isModalVisible, selectedCoin, chartDays, limit])

  return (
    <View style={styles.favlist}>
      <FlatList
        style={styles.favCoins}
        data={coinData.filter(
          (coin) => coin.name.toLowerCase() || coin.symbol.toLowerCase()
        )}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <CoinItem coin={item} onPress={() => openModal(item)} />

            <TouchableOpacity onPress={() => removeFromFav(item)}>
              {flag[item.id] ? (
                <Ionicons name='close-circle-outline' size={24} color='red'></Ionicons>
              ) : (
                <Ionicons name='remove-circle-outline' size={24} color='gray' />
              )}
            </TouchableOpacity>
          </View>
        )}
        numColumns={2}
        keyExtractor={(item) => item.id}
      />

      <Modal visible={isModalVisible} animationType='slide'>
        <View style={styles.chartContainer}>
          {sant && (
            <View style={{ paddingBottom: 2, alignItems: "center" }}>
              <Text style={styles.text0}>
                Market Santiment:
                <Text style={{ color: "wheat" }}> {sant}</Text>
              </Text>
            </View>
          )}

          <View style={styles.minmaxBlock}>
            <Text style={styles.textUp}>
              Мин. 24 часа:
              <Text style={{ color: "lightblue" }}> {minMax.minPrice}$</Text>
            </Text>
            <Text style={styles.textUp}>
              Макс. 24 часа:
              <Text style={{ color: "wheat" }}> {minMax.maxPrice}$</Text>
            </Text>
          </View>

          {prices.length === 0 ? (
            <Text style={{ color: "white" }}>Загрузка данных...</Text>
          ) : (
            <>
              <Text style={styles.textTit}>Min and Max trade range:</Text>

              {Array.isArray(prices) && prices.length > 0 ? (
                <TapGestureHandler>
                  <PinchGestureHandler
                    onGestureEvent={onPinchEvent}
                    onHandlerStateChange={onPinchStateChange}
                  >
                    <View style={{ alignItems: "center" }}>
                      <CandlestickChart
                        data={prices}
                        width={Dimensions.get("window").width * 0.99}
                        height={Dimensions.get("window").height * 0.45}
                      />
                    </View>
                  </PinchGestureHandler>
                </TapGestureHandler>
              ) : (
                <Text style={{ color: "white" }}>Нет данных для отображения</Text>
              )}

              <>
                <Text style={styles.text1}>Volume range:</Text>
                <VolumeChart volumeData={volumeData} />
              </>
            </>
          )}

          <Text style={styles.text}>
            Selected range<Text style={styles.textZ}> {chartDays}</Text>
          </Text>
          <SwitchTimeframeButtons chartDays={chartDays} />

          <View style={styles.chartButtonsClose}>
            <TouchableOpacity
              style={styles.buttonClose}
              title='Закрыть'
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeb}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Favorite
