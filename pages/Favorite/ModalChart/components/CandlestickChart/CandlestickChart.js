import React, { useState, useRef, useEffect, useMemo } from "react"
import { View, Text, Dimensions } from "react-native"
import Svg, { Rect, Line, G } from "react-native-svg"
import { RFValue } from "react-native-responsive-fontsize"
import { styles } from "./CandlestickChart.styles"
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
  TapGestureHandler,
  State
} from "react-native-gesture-handler"
import * as Haptics from "expo-haptics"
import { useDispatch } from "react-redux"
import { setDoubleTap } from "../../../../../store/reducersSlice"

const MIN_LIMIT = 10
const MAX_LIMIT = 200
const ZOOM_IN_THRESHOLD = 1.05
const ZOOM_OUT_THRESHOLD = 0.95
const DEFAULT_LIMIT = 100

const CandlestickChart = ({
  data,
  width: chartWidth,
  height: chartHeight,
  limit,
  setLimit
}) => {
  // offset - Сколько свечей окно сдвинуто влево (в прошлое) от правого края. 0 = показываем самые новые свечи.
  const [offset, setOffset] = useState(0)

  const pinchRef = useRef() // реф для пинч-жеста
  const panRef = useRef() // реф для пана
  const doubleTapRef = useRef() // реф для двойного тапа

  const dispatch = useDispatch()

  if (!data || data.length === 0) return null

  const triggerHaptic = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    } catch (error) {
      console.log("Haptic not available:", error)
    }
  }

  const currentLimit = limit

  const margin = { top: 15, right: 15, bottom: 15, left: 45 }
  const innerWidth = chartWidth - margin.left - margin.right
  const innerHeight = chartHeight - margin.top - margin.bottom

  // Максимальный сдвиг окна
  // Максимально возможный offset.
  // Показывает, на сколько свечей можно уехать в прошлое, чтобы окно ещё не вылезло за левый край данных.
  // Math.max(0, ...) — защита от отрицательного значения, если данных меньше лимита.
  const maxOffset = Math.max(0, data.length - currentLimit)

  // Следит за maxOffset и, если тот уменьшился, «подрезает» offset, чтобы он не остался больше новой границы.
  // (Сбрасываем offset, если он вылез за пределы после зума)
  useEffect(() => {
    setOffset((prev) => Math.min(prev, maxOffset))
  }, [maxOffset])

  // Окно отображаемых данных
  // data отсортирован от старых к новым: offset = 0 → последние currentLimit свечей
  const { displayData, startIndex } = useMemo(() => {
    // Math.max(0, X) возвращает большее из двух: либо 0, либо X. Не даёт результату стать отрицательным.
    // Если X ушёл в минус — он превращается в 0.
    const start = Math.max(0, data.length - currentLimit - offset)

    // Без защиты (если start ушёл в минус → часть окна «за кадром/пропадает»)
    // const start = data.length - currentLimit - offset

    const end = Math.min(data.length, start + currentLimit)
    return {
      displayData: data.slice(start, end),
      startIndex: start
    }
  }, [data, currentLimit, offset])

  // min/max без спреда по массиву
  const { minPrice, maxPrice } = useMemo(() => {
    let mn = Infinity
    let mx = -Infinity
    for (let i = 0; i < displayData.length; i++) {
      const d = displayData[i]
      if (d.low < mn) mn = d.low
      if (d.open < mn) mn = d.open
      if (d.close < mn) mn = d.close
      if (d.high > mx) mx = d.high
      if (d.open > mx) mx = d.open
      if (d.close > mx) mx = d.close
    }
    return { minPrice: mn, maxPrice: mx }
  }, [displayData])

  const priceRange = maxPrice - minPrice || 1

  const xScale = (index) =>
    margin.left + (index / Math.max(1, displayData.length - 1)) * innerWidth + 1

  const yScale = (price) =>
    margin.top + innerHeight - ((price - minPrice) / priceRange) * innerHeight

  // === Жесты ===

  const onPinchHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState !== State.ACTIVE) return
    const scale = event.nativeEvent.scale

    if (scale > ZOOM_IN_THRESHOLD) {
      setLimit(Math.max(MIN_LIMIT, Math.floor(currentLimit * 0.8)))
    } else if (scale < ZOOM_OUT_THRESHOLD) {
      setLimit(Math.min(MAX_LIMIT, data.length, Math.ceil(currentLimit * 1.2)))
    }
  }

  // Это коэффициент замедления скролла.
  const PAN_SENSITIVITY = 12.5

  // Функция вызывается непрерывно, пока палец движется по экрану (десятки раз в секунду).
  // Задача — превратить движение пальца в пикселях в сдвиг окна в свечах (offset).
  const onPanGestureEvent = (event) => {
    if (displayData.length < 2) return
    // Сколько пикселей пальца = одна свеча
    // Пример: innerWidth = 350, limit = 100 → 3.5px на свечу.  3.5 * 2.5 = 8.75px или 3.5 * 12.5 = 43.5
    // Чем больше limit (свечей на экране), тем меньше candleWidthPx → тем «чувствительнее» скролл. Логично: свечи мелкие, окно двигается быстрее.
    const candleWidthPx = (innerWidth / currentLimit) * PAN_SENSITIVITY
    // Перевод пикселей в свечи
    // event.nativeEvent.translationX — накопленное смещение пальца от точки касания, в пикселях.
    // Это не дельта между кадрами, а всё расстояние с начала жеста.
    // Делим на «цену свечи» → получаем смещение в свечах. Округляем до целого (Math.round) — свечи целые, дробных сдвигов нет.

    // Пример: Палец ушёл вправо на 20px.
    // candleWidthPx = 8.75. shifted = Math.round(20 / 8.75) = Math.round(2.28) = 2. Значит окно надо сдвинуть на 2 свечи.
    const shifted = Math.round(event.nativeEvent.translationX / candleWidthPx)

    if (shifted !== 0) {
      // prev — текущий offset.
      setOffset((prev) => {
        // next = prev + shifted — новый offset.
        const next = prev + shifted
        // ath.max(0, Math.min(maxOffset, next)) — кламп в диапазон [0, maxOffset].
        // Не даёт уехать в прошлое дальше maxOffset.
        // Не даёт уехать «в будущее» дальше 0 (к новым свечам, которых ещё нет).
        return Math.max(0, Math.min(maxOffset, next))
      })
    }
  }

  const onDoubleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setLimit(DEFAULT_LIMIT)
      setOffset(0)
      triggerHaptic()
      dispatch(setDoubleTap())
    }
  }

  // === Ось Y ===

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
        formattedPrice = `$${(price / 1000).toFixed(2)}k`
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

      labels.push({ price: formattedPrice, y: yPosition, rawPrice: price })
    }

    return labels
  }

  const yAxisLabels = generateYAxisLabels()
  const candleWidth = Math.max(2, (innerWidth / displayData.length) * 0.6)

  const screenWidth = Dimensions.get("window").width
  const yAxisLeftOffset = screenWidth > 600 ? 4 : 9
  const axisLeftLine = screenWidth > 400 && screenWidth < 600 ? 3 : 0

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.chartContainerStyle}>
        <View style={styles.limitContainer}>
          <Text style={styles.limitHint}>
            {currentLimit < data.length
              ? `${currentLimit} of ${data.length} candles • Pinch to zoom • Double tap to reset`
              : `Pinch to zoom • Double tap to reset`}
          </Text>
        </View>

        <TapGestureHandler
          ref={doubleTapRef}
          onHandlerStateChange={onDoubleTap}
          numberOfTaps={2}
        >
          <View style={styles.chartBox}>
            <PinchGestureHandler
              ref={pinchRef}
              simultaneousHandlers={panRef}
              onHandlerStateChange={onPinchHandlerStateChange}
            >
              <PanGestureHandler
                ref={panRef}
                simultaneousHandlers={pinchRef}
                onGestureEvent={onPanGestureEvent}
                minPointers={1}
                maxPointers={1}
              >
                <View style={{ width: chartWidth, height: chartHeight }}>
                  {/* Метки оси Y */}
                  {yAxisLabels.map((label, index) => (
                    <Text
                      key={index}
                      style={[
                        styles.yAxisLabel,
                        {
                          position: "absolute",
                          top: label.y - 8,
                          left: yAxisLeftOffset,
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
                  <View style={{ paddingLeft: axisLeftLine }}>
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
                      {displayData.map((candle, index) => {
                        const x = xScale(index) - candleWidth / 2
                        const openY = yScale(candle.open)
                        const closeY = yScale(candle.close)
                        const highY = yScale(candle.high)
                        const lowY = yScale(candle.low)

                        const isBullish = candle.close >= candle.open
                        const color = isBullish ? "#4CAF50" : "#F44336"
                        const candleTopY = isBullish ? closeY : openY
                        const candleBottomY = isBullish ? openY : closeY
                        const candleHeight = Math.max(
                          1,
                          Math.abs(candleBottomY - candleTopY)
                        )

                        return (
                          <G key={`${startIndex}-${index}`}>
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
              </PanGestureHandler>
            </PinchGestureHandler>
          </View>
        </TapGestureHandler>
      </View>
    </GestureHandlerRootView>
  )
}

export default CandlestickChart
