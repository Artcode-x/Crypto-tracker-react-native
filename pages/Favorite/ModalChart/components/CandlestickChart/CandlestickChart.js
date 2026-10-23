import React, { useState, useRef } from "react"
import { View, Text, Dimensions } from "react-native"
import Svg, { Rect, Line, G, ClipPath, Defs, Text as SvgText } from "react-native-svg"
import { RFValue } from "react-native-responsive-fontsize"
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
  TapGestureHandler,
  State
} from "react-native-gesture-handler"
import * as Haptics from "expo-haptics"
import { useDispatch } from "react-redux"
import { styles } from "./CandlestickChart.styles"
import { setDoubleTap } from "../../../../../store/reducersSlice"

const MIN_LIMIT = 10
const MAX_LIMIT = 200
const DEFAULT_LIMIT = 100
const ZOOM_IN_THRESHOLD = 1.05
const ZOOM_OUT_THRESHOLD = 0.95
const GREEN = "#4CAF50"
const RED = "#F44336"
const AXIS_COLOR = "rgba(255,255,255,0.4)"

const MARGIN = { top: 15, right: 15, bottom: 28, left: 45 }

const X_LABELS_COUNT = 4
const DAY_MS = 24 * 3600 * 1000

const DECIMALS_BY_PRICE = [
  [1, 2],
  [0.1, 3],
  [0.01, 4],
  [0.001, 5],
  [0.0001, 6]
]

const formatPrice = (price) => {
  if (price >= 1e6) return `$${(price / 1e6).toFixed(2)}M`
  if (price >= 1e3) return `$${(price / 1e3).toFixed(2)}k`

  const decimals = DECIMALS_BY_PRICE.find(([min]) => price >= min)?.[1] ?? 8
  const text = `$${price.toFixed(decimals)}`

  return text.length > 12 ? `$${price.toExponential(3)}` : text
}

const pad2 = (n) => String(n).padStart(2, "0")

const isGreen = (candle) => candle.close >= candle.open

const getTime = (candle) => {
  const t = candle.time ?? candle.timestamp ?? candle.openTime ?? candle.t
  if (t == null) return null

  const ms = typeof t === "number" ? t : new Date(t).getTime()
  if (isNaN(ms)) return null

  return ms < 1e12 ? ms * 1000 : ms
}

const buildXLabels = (data, start, limit, candleStep) => {
  if (limit < 2) return []

  const tFirst = getTime(data[start])
  const tLast = getTime(data[start + limit - 1])
  if (tFirst == null || tLast == null) return []

  const intraday = tLast - tFirst < DAY_MS
  const labels = []

  for (let i = 0; i <= X_LABELS_COUNT; i++) {
    const shift = (i * (limit - 1)) / X_LABELS_COUNT

    const ts = getTime(data[Math.round(start + shift)])
    if (ts == null) continue

    const d = new Date(ts)
    labels.push({
      text: intraday
        ? `${pad2(d.getHours())}:${pad2(d.getMinutes())}`
        : `${pad2(d.getDate())}.${pad2(d.getMonth() + 1)}`,
      x: MARGIN.left + shift * candleStep,

      anchor: i === 0 ? "start" : i === X_LABELS_COUNT ? "end" : "middle"
    })
  }
  return labels
}

const CandlestickChart = ({ data, width, height, limit, setLimit }) => {
  const [rawOffset, setRawOffset] = useState(0)

  const startOffset = useRef(0)

  const pinchRef = useRef()
  const panRef = useRef()
  const dispatch = useDispatch()

  if (!data || data.length === 0) return null

  const currentLimit = Math.max(1, Math.min(limit, data.length))

  const maxOffset = data.length - currentLimit
  const offset = Math.min(rawOffset, maxOffset)

  const start = Math.floor(data.length - currentLimit - offset)

  const displayData = data.slice(start, start + currentLimit + 2)

  const minPrice = Math.min(...displayData.map((c) => c.low))
  const maxPrice = Math.max(...displayData.map((c) => c.high))

  const priceRange = maxPrice - minPrice || 1

  const innerWidth = width - MARGIN.left - MARGIN.right
  const innerHeight = height - MARGIN.top - MARGIN.bottom
  const axisY = height - MARGIN.bottom

  const candleStep = innerWidth / currentLimit
  const candleWidth = Math.max(2, candleStep * 0.6)

  const xScale = (index) => MARGIN.left + index * candleStep

  const yScale = (price) =>
    MARGIN.top + innerHeight - ((price - minPrice) / priceRange) * innerHeight

  const yAxisLabels = Array.from({ length: 6 }, (_, i) => {
    const price = minPrice + (priceRange * i) / 5
    return { text: formatPrice(price), y: yScale(price) }
  })

  const xAxisLabels = buildXLabels(data, start, currentLimit, candleStep)

  const lastCandle = displayData[displayData.length - 1]
  const lastColor = isGreen(lastCandle) ? GREEN : RED

  const lastPriceY = Math.max(MARGIN.top, Math.min(axisY, yScale(lastCandle.close)))

  const tag = { x: 2, width: MARGIN.left + 4, height: 12 }
  tag.y = lastPriceY - tag.height / 2

  const screenWidth = Dimensions.get("window").width
  const yAxisLeftOffset = screenWidth > 600 ? 4 : 9
  const axisLeftLine = screenWidth > 400 && screenWidth < 600 ? 3 : 0

  const onPinchEnd = ({ nativeEvent }) => {
    if (nativeEvent.oldState !== State.ACTIVE) return

    if (nativeEvent.scale > ZOOM_IN_THRESHOLD) {
      setLimit(Math.max(MIN_LIMIT, Math.floor(currentLimit * 0.8)))
    } else if (nativeEvent.scale < ZOOM_OUT_THRESHOLD) {
      setLimit(Math.min(MAX_LIMIT, data.length, Math.ceil(currentLimit * 1.2)))
    }
  }

  const onPanStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.BEGAN) startOffset.current = offset
  }

  const onPan = ({ nativeEvent }) => {
    const next = startOffset.current + nativeEvent.translationX / candleStep

    setRawOffset(Math.max(0, Math.min(maxOffset, next)))
  }

  const onDoubleTap = ({ nativeEvent }) => {
    if (nativeEvent.state !== State.ACTIVE) return
    setLimit(DEFAULT_LIMIT)
    setRawOffset(0)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {})
    dispatch(setDoubleTap())
  }

  const hint =
    currentLimit < data.length
      ? `${currentLimit} of ${data.length} candles • Pinch to zoom • Double tap to reset`
      : "Pinch to zoom • Double tap to reset"

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.chartContainerStyle}>
        <View style={styles.limitContainer}>
          <Text style={styles.limitHint}>{hint}</Text>
        </View>

        <TapGestureHandler onHandlerStateChange={onDoubleTap} numberOfTaps={2}>
          <View style={styles.chartBox}>
            <PinchGestureHandler
              ref={pinchRef}
              simultaneousHandlers={panRef}
              onHandlerStateChange={onPinchEnd}
            >
              <PanGestureHandler
                ref={panRef}
                simultaneousHandlers={pinchRef}
                onHandlerStateChange={onPanStateChange}
                onGestureEvent={onPan}
                minPointers={1}
                maxPointers={1}
              >
                <View style={{ width, height }}>
                  {yAxisLabels.map((label, i) => (
                    <Text
                      key={i}
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
                    <Svg width={width} height={height}>
                      <Defs>
                        <ClipPath id='plotClip'>
                          <Rect
                            x={MARGIN.left}
                            y={0}
                            width={innerWidth}
                            height={height}
                          />
                        </ClipPath>
                      </Defs>

                      {yAxisLabels.map((label, i) => (
                        <Line
                          key={`grid-${i}`}
                          x1={MARGIN.left}
                          x2={width - MARGIN.right}
                          y1={label.y}
                          y2={label.y}
                          stroke='rgba(255,255,255,0.15)'
                          strokeWidth='0.5'
                          strokeDasharray='2,2'
                        />
                      ))}

                      <Line
                        x1={MARGIN.left}
                        x2={width - MARGIN.right}
                        y1={axisY}
                        y2={axisY}
                        stroke={AXIS_COLOR}
                        strokeWidth='1'
                      />

                      <Line
                        x1={MARGIN.left}
                        x2={MARGIN.left}
                        y1={MARGIN.top}
                        y2={axisY}
                        stroke={AXIS_COLOR}
                        strokeWidth='1'
                      />

                      <G clipPath='url(#plotClip)'>
                        {displayData.map((candle, index) => {
                          const x = xScale(index)
                          const color = isGreen(candle) ? GREEN : RED

                          const bodyTop = yScale(Math.max(candle.open, candle.close))
                          const bodyBottom = yScale(Math.min(candle.open, candle.close))

                          return (
                            <G key={start + index}>
                              <Line
                                x1={x}
                                x2={x}
                                y1={yScale(candle.high)}
                                y2={yScale(candle.low)}
                                stroke={color}
                                strokeWidth='0.8'
                              />

                              <Rect
                                x={x - candleWidth / 2}
                                y={bodyTop}
                                width={candleWidth}
                                height={Math.max(1, bodyBottom - bodyTop)}
                                fill={color}
                                stroke={color}
                                strokeWidth='0.5'
                              />
                            </G>
                          )
                        })}

                        {xAxisLabels.map((label, i) => (
                          <G key={`xl-${i}`}>
                            <Line
                              x1={label.x}
                              x2={label.x}
                              y1={axisY + 3}
                              y2={axisY + 4}
                              stroke={AXIS_COLOR}
                              strokeWidth='1'
                            />

                            <SvgText
                              x={label.x}
                              y={axisY + 16}
                              fill='rgba(255,255,255,0.6)'
                              fontSize='9'
                              textAnchor={label.anchor}
                            >
                              {label.text}
                            </SvgText>
                          </G>
                        ))}

                        <Line
                          x1={MARGIN.left}
                          x2={width - MARGIN.right}
                          y1={lastPriceY}
                          y2={lastPriceY}
                          stroke={lastColor}
                          strokeWidth='1'
                          strokeDasharray='3,3'
                        />
                      </G>

                      <Rect
                        x={tag.x}
                        y={tag.y}
                        width={tag.width}
                        height={tag.height}
                        fill={lastColor}
                        rx={3}
                        ry={3}
                        opacity={0.5}
                      />
                      <SvgText
                        x={tag.x + tag.width / 2}
                        y={tag.y + tag.height / 2 + 3}
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
