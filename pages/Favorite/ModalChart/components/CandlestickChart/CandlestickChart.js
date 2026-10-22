import React, { useState, useRef } from "react"
import { View, Text, Dimensions } from "react-native"
import Svg, { Rect, Line, G, ClipPath, Defs, Text as SvgText } from "react-native-svg"
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
const DEFAULT_LIMIT = 100
const ZOOM_IN_THRESHOLD = 1.05
const ZOOM_OUT_THRESHOLD = 0.95

const formatPrice = (price) => {
  if (price >= 1000000) return `$${(price / 1000000).toFixed(2)}M`
  if (price >= 1000) return `$${(price / 1000).toFixed(2)}k`

  let text
  if (price >= 1) text = `$${price.toFixed(2)}`
  else if (price >= 0.1) text = `$${price.toFixed(3)}`
  else if (price >= 0.01) text = `$${price.toFixed(4)}`
  else if (price >= 0.001) text = `$${price.toFixed(5)}`
  else if (price >= 0.0001) text = `$${price.toFixed(6)}`
  else text = `$${price.toFixed(8)}`

  if (text.length > 12) text = `$${price.toExponential(3)}`
  return text
}

const CandlestickChart = ({
  data,
  width: chartWidth,
  height: chartHeight,
  limit,
  setLimit
}) => {
  const [rawOffset, setRawOffset] = useState(0)

  const startOffset = useRef(0)

  const pinchRef = useRef()
  const panRef = useRef()
  const doubleTapRef = useRef()

  const dispatch = useDispatch()

  if (!data || data.length === 0) return null

  const currentLimit = Math.max(1, Math.min(limit, data.length))

  const maxOffset = data.length - currentLimit

  const offset = Math.min(rawOffset, maxOffset)

  const exactStart = data.length - currentLimit - offset

  const start = Math.floor(exactStart)

  const fraction = exactStart - start

  const displayData = data.slice(start, Math.min(data.length, start + currentLimit + 2))

  let minPrice = Infinity
  let maxPrice = -Infinity
  for (const c of displayData) {
    minPrice = Math.min(minPrice, c.low)
    maxPrice = Math.max(maxPrice, c.high)
  }
  const priceRange = maxPrice - minPrice || 1

  const margin = { top: 15, right: 15, bottom: 15, left: 45 }
  const innerWidth = chartWidth - margin.left - margin.right
  const innerHeight = chartHeight - margin.top - margin.bottom

  const candleStep = innerWidth / currentLimit
  const candleWidth = Math.max(2, candleStep * 0.6)
  const pixelOffset = fraction * candleStep

  const xScale = (index) => margin.left + index * candleStep - pixelOffset

  const yScale = (price) =>
    margin.top + innerHeight - ((price - minPrice) / priceRange) * innerHeight

  const yAxisLabels = []
  for (let i = 0; i <= 5; i++) {
    const price = minPrice + (priceRange * i) / 5
    yAxisLabels.push({ text: formatPrice(price), y: yScale(price) })
  }

  // Вычисление данных последней свечи
  const lastCandle = displayData[displayData.length - 1]
  const lastColor = lastCandle.close >= lastCandle.open ? "#4CAF50" : "#F44336"
  const lastPriceY = Math.max(
    margin.top,
    Math.min(chartHeight - margin.bottom, yScale(lastCandle.close))
  )
  const tagHeight = 12
  const tagWidth = margin.left + 4
  const tagX = 2
  const tagY = lastPriceY - tagHeight / 2

  const screenWidth = Dimensions.get("window").width
  const yAxisLeftOffset = screenWidth > 600 ? 4 : 9
  const axisLeftLine = screenWidth > 400 && screenWidth < 600 ? 3 : 0

  const onPinchStateChange = (event) => {
    if (event.nativeEvent.oldState !== State.ACTIVE) return

    const scale = event.nativeEvent.scale

    if (scale > ZOOM_IN_THRESHOLD) {
      setLimit(Math.max(MIN_LIMIT, Math.floor(currentLimit * 0.8)))
    } else if (scale < ZOOM_OUT_THRESHOLD) {
      setLimit(Math.min(MAX_LIMIT, data.length, Math.ceil(currentLimit * 1.2)))
    }
  }

  const onPanStateChange = (event) => {
    if (event.nativeEvent.state === State.BEGAN) {
      startOffset.current = offset
    }
  }

  const onPanGestureEvent = (event) => {
    const movedCandles = event.nativeEvent.translationX / candleStep
    const next = startOffset.current + movedCandles

    setRawOffset(Math.max(0, Math.min(maxOffset, next)))
  }

  const onDoubleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setLimit(DEFAULT_LIMIT)
      setRawOffset(0)
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {})
      dispatch(setDoubleTap())
    }
  }

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
              onHandlerStateChange={onPinchStateChange}
            >
              <PanGestureHandler
                ref={panRef}
                simultaneousHandlers={pinchRef}
                onHandlerStateChange={onPanStateChange}
                onGestureEvent={onPanGestureEvent}
                minPointers={1}
                maxPointers={1}
              >
                <View style={{ width: chartWidth, height: chartHeight }}>
                  {/* Подписи цен слева */}
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
                      {label.text}
                    </Text>
                  ))}

                  <View style={{ paddingLeft: axisLeftLine }}>
                    <Svg width={chartWidth} height={chartHeight}>
                      <Defs>
                        <ClipPath id='plotClip'>
                          <Rect
                            x={margin.left}
                            y={0}
                            width={innerWidth}
                            height={chartHeight}
                          />
                        </ClipPath>
                      </Defs>
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

                      <G clipPath='url(#plotClip)'>
                        {/* Свечи */}
                        {displayData.map((candle, index) => {
                          const centerX = xScale(index)
                          const isGreen = candle.close >= candle.open
                          const color = isGreen ? "#4CAF50" : "#F44336"

                          const bodyTop = yScale(Math.max(candle.open, candle.close))
                          const bodyBottom = yScale(Math.min(candle.open, candle.close))
                          const bodyHeight = Math.max(1, bodyBottom - bodyTop)

                          return (
                            <G key={start + index}>
                              <Line
                                x1={centerX}
                                y1={yScale(candle.high)}
                                x2={centerX}
                                y2={yScale(candle.low)}
                                stroke={color}
                                strokeWidth='0.8'
                              />
                              <Rect
                                x={centerX - candleWidth / 2}
                                y={bodyTop}
                                width={candleWidth}
                                height={bodyHeight}
                                fill={color}
                                stroke={color}
                                strokeWidth='0.5'
                              />
                            </G>
                          )
                        })}

                        {/* Линия последней цены */}
                        <Line
                          x1={margin.left}
                          y1={lastPriceY}
                          x2={chartWidth - margin.right}
                          y2={lastPriceY}
                          stroke={lastColor}
                          strokeWidth='1'
                          strokeDasharray='3,3'
                        />
                      </G>

                      {/* Плашка с ценой */}
                      <Rect
                        x={tagX}
                        y={tagY}
                        width={tagWidth}
                        height={tagHeight}
                        fill={lastColor}
                        rx={3}
                        ry={3}
                        opacity={0.5}
                      />
                      <SvgText
                        x={tagX + tagWidth / 2}
                        y={tagY + tagHeight / 2 + 3}
                        // fill='#ffffff'
                        fill='rgba(255, 255, 255, 0.7)'
                        fontSize={RFValue(7.5)}
                        fontWeight='bold'
                        textAnchor='middle'
                      >
                        {formatPrice(lastCandle.close)}
                      </SvgText>
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
