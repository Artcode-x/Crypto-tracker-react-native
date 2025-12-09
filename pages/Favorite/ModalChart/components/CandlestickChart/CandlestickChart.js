import React from "react"
import { View, Text } from "react-native"
import Svg, { Rect, Line, G } from "react-native-svg"
import { RFValue } from "react-native-responsive-fontsize"
import { styles } from "./CandlestickChart.styles"

// const CandlestickChart = ({
//   data,
//   width: chartWidth,
//   height: chartHeight,
//   limit,
//   showYAxisLabels = true,
//   showGridLines = true,
//   bullishColor = "#4CAF50",
//   bearishColor = "#F44336",
//   gridColor = "rgba(255,255,255,0.15)",
//   axisColor = "rgba(255,255,255,0.4)"
//   //   styles // передаем стили извне
// }) => {
//   if (!data || data.length === 0) return null

//   const margin = { top: 15, right: 15, bottom: 15, left: 45 }
//   const innerWidth = chartWidth - margin.left - margin.right
//   const innerHeight = chartHeight - margin.top - margin.bottom

//   const minPrice = Math.min(...data.map((d) => Math.min(d.low, d.open, d.close)))
//   const maxPrice = Math.max(...data.map((d) => Math.max(d.high, d.open, d.close)))
//   const priceRange = maxPrice - minPrice

//   const xScale = (index) => margin.left + (index / (data.length - 1)) * innerWidth
//   const yScale = (price) =>
//     margin.top + innerHeight - ((price - minPrice) / priceRange) * innerHeight

//   const formatPrice = (price) => {
//     if (price >= 1000000) {
//       return `$${(price / 1000000).toFixed(2)}M`
//     } else if (price >= 1000) {
//       return `$${(price / 1000).toFixed(2)}K`
//     } else if (price >= 1) {
//       return `$${price.toFixed(2)}`
//     } else if (price >= 0.1) {
//       return `$${price.toFixed(3)}`
//     } else if (price >= 0.01) {
//       return `$${price.toFixed(4)}`
//     } else if (price >= 0.001) {
//       return `$${price.toFixed(5)}`
//     } else if (price >= 0.0001) {
//       return `$${price.toFixed(6)}`
//     } else {
//       return `$${price.toFixed(8)}`
//     }
//   }

//   const generateYAxisLabels = () => {
//     const numberOfLabels = 5
//     const labels = []

//     for (let i = 0; i <= numberOfLabels; i++) {
//       const price = minPrice + (priceRange * i) / numberOfLabels
//       const yPosition = yScale(price)

//       let formattedPrice = formatPrice(price)

//       if (formattedPrice.length > 12) {
//         formattedPrice = `$${price.toExponential(3)}`
//       }

//       labels.push({
//         price: formattedPrice,
//         y: yPosition,
//         rawPrice: price
//       })
//     }

//     return labels
//   }

//   const yAxisLabels = generateYAxisLabels()
//   const candleWidth = Math.max(2, (innerWidth / data.length) * 0.6)

//   return (
//     <View style={styles?.chartContainerStyle}>
//       {limit && (
//         <View style={styles?.limitContainer}>
//           <Text style={styles?.limitHint}>Pinch to zoom</Text>
//         </View>
//       )}

//       <View style={styles?.chartBox}>
//         {/* Метки оси Y */}
//         {showYAxisLabels &&
//           yAxisLabels.map((label, index) => (
//             <Text
//               key={index}
//               style={[
//                 styles?.yAxisLabel,
//                 {
//                   position: "absolute",
//                   top: label.y - 8,
//                   left: 0,
//                   zIndex: 1,
//                   backgroundColor: "transparent",
//                   fontSize: RFValue(7)
//                 }
//               ]}
//             >
//               {label.price}
//             </Text>
//           ))}

//         {/* SVG график */}
//         <Svg width={chartWidth} height={chartHeight}>
//           {/* Горизонтальные линии сетки */}
//           {showGridLines &&
//             yAxisLabels.map((label, index) => (
//               <Line
//                 key={`grid-${index}`}
//                 x1={margin.left}
//                 y1={label.y}
//                 x2={chartWidth - margin.right}
//                 y2={label.y}
//                 stroke={gridColor}
//                 strokeWidth='0.5'
//                 strokeDasharray='2,2'
//               />
//             ))}

//           {/* Ось X */}
//           <Line
//             x1={margin.left}
//             y1={chartHeight - margin.bottom}
//             x2={chartWidth - margin.right}
//             y2={chartHeight - margin.bottom}
//             stroke={axisColor}
//             strokeWidth='1'
//           />

//           {/* Ось Y */}
//           <Line
//             x1={margin.left}
//             y1={margin.top}
//             x2={margin.left}
//             y2={chartHeight - margin.bottom}
//             stroke={axisColor}
//             strokeWidth='1'
//           />

//           {/* Свечи */}
//           {data.map((candle, index) => {
//             const x = xScale(index) - candleWidth / 2
//             const openY = yScale(candle.open)
//             const closeY = yScale(candle.close)
//             const highY = yScale(candle.high)
//             const lowY = yScale(candle.low)

//             const isBullish = candle.close >= candle.open
//             const color = isBullish ? bullishColor : bearishColor
//             const candleTopY = isBullish ? closeY : openY
//             const candleBottomY = isBullish ? openY : closeY
//             const candleHeight = Math.max(1, Math.abs(candleBottomY - candleTopY))

//             return (
//               <G key={index}>
//                 <Line
//                   x1={x + candleWidth / 2}
//                   y1={highY}
//                   x2={x + candleWidth / 2}
//                   y2={lowY}
//                   stroke={color}
//                   strokeWidth='0.8'
//                 />
//                 <Rect
//                   x={x}
//                   y={candleTopY}
//                   width={candleWidth}
//                   height={candleHeight}
//                   fill={color}
//                   stroke={color}
//                   strokeWidth='0.5'
//                 />
//               </G>
//             )
//           })}
//         </Svg>
//       </View>
//     </View>
//   )
// }

const CandlestickChart = ({ data, width: chartWidth, height: chartHeight }) => {
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

export default CandlestickChart
