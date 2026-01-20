import React, { useState, useRef, useEffect, useCallback } from "react"
import { View, Text } from "react-native"
import Svg, { Rect, Line, G } from "react-native-svg"
import { RFValue } from "react-native-responsive-fontsize"
import { styles } from "./CandlestickChart.styles"
import {
  GestureHandlerRootView,
  PinchGestureHandler,
  TapGestureHandler,
  State
} from "react-native-gesture-handler"

const CandlestickChart = ({
  data,
  width: chartWidth,
  height: chartHeight,
  limit,
  setLimit
}) => {
  if (!data || data.length === 0) return null

  const [zoomScale, setZoomScale] = useState(1)
  const [lastScale, setLastScale] = useState(1)
  const [internalLimit, setInternalLimit] = useState(limit || data.length)

  const pinchRef = useRef()
  const doubleTapRef = useRef()

  // Синхронизация internalLimit с limit при изменении извне
  useEffect(() => {
    if (limit && limit !== internalLimit) {
      setInternalLimit(limit)
    }
  }, [limit])

  // Используем либо limit, либо internalLimit
  const currentLimit = limit !== undefined ? limit : internalLimit

  // Ограничение количества отображаемых свечей
  const displayData = data.slice(0, Math.min(currentLimit, data.length))

  const margin = { top: 15, right: 15, bottom: 15, left: 45 }
  const innerWidth = chartWidth - margin.left - margin.right
  const innerHeight = chartHeight - margin.top - margin.bottom

  const minPrice = Math.min(...displayData.map((d) => Math.min(d.low, d.open, d.close)))
  const maxPrice = Math.max(...displayData.map((d) => Math.max(d.high, d.open, d.close)))
  const priceRange = maxPrice - minPrice

  const xScale = (index) => margin.left + (index / (displayData.length - 1)) * innerWidth
  const yScale = (price) =>
    margin.top + innerHeight - ((price - minPrice) / priceRange) * innerHeight

  // Обработка жеста pinch для зума
  const onPinchGestureEvent = (event) => {
    setZoomScale(event.nativeEvent.scale)
  }

  const onPinchHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const newScale = lastScale * event.nativeEvent.scale
      setLastScale(newScale)

      // Изменение количества отображаемых свечей на основе зума
      if (event.nativeEvent.scale > 1.05) {
        // Увеличиваем (уменьшаем количество свеч)
        const newCount = Math.max(10, Math.floor(currentLimit * 0.8))
        setLimit(newCount)
      } else if (event.nativeEvent.scale < 1.05) {
        // Уменьшаем (увеличиваем количество свеч)
        const newCount = Math.min(200, Math.ceil(currentLimit * 1.2))
        setLimit(newCount)
      }

      setZoomScale(1)
    }
  }

  const onDoubleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log("Double tap detected, resetting to full data")
      setLimit(100)
    }
  }

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
  const candleWidth = Math.max(2, (innerWidth / displayData.length) * 0.6)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.chartContainerStyle}>
        <View style={styles.limitContainer}>
          <Text style={styles.limitHint}>
            {currentLimit < data.length
              ? `Showing ${currentLimit} of ${data.length} candles • Pinch to zoom • Double tap to reset`
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
              onGestureEvent={onPinchGestureEvent}
              onHandlerStateChange={onPinchHandlerStateChange}
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
            </PinchGestureHandler>
          </View>
        </TapGestureHandler>
      </View>
    </GestureHandlerRootView>
  )
}

export default CandlestickChart
