import React from "react"
import { ScrollView, Text, View, Dimensions, Platform } from "react-native"
import Svg, { Rect } from "react-native-svg"
import { styles } from "./VolumeChart.styles"

const { width } = Dimensions.get("window")
const isAndroid = Platform.OS === "android"

export const VolumeChart = ({ volumeData, height = 100 }) => {
  if (
    !volumeData ||
    !volumeData.datasets ||
    !volumeData.datasets[0] ||
    !volumeData.datasets[0].data
  ) {
    return (
      <View style={[styles.volumeChartContainer, { height }]}>
        <Text style={styles.noVolumeText}>No volume data</Text>
      </View>
    )
  }

  const volumeValues = volumeData.datasets[0].data
  const maxVolume = Math.max(...volumeValues)
  const currentVolume = volumeValues[volumeValues.length - 1] || 0
  const avgVolume = volumeValues.reduce((a, b) => a + b, 0) / volumeValues.length

  const formatVolume = (volume) => {
    if (volume >= 1000000) return `${(volume / 1000000).toFixed(1)}M`
    if (volume >= 1000) return `${(volume / 1000).toFixed(0)}K`
    return volume.toFixed(0)
  }

  const getVolumeIndicator = () => {
    if (currentVolume > avgVolume * 1.5) return "🔥"
    if (currentVolume > avgVolume * 1.2) return "↑"
    if (currentVolume < avgVolume * 0.8) return "↓"
    return "•"
  }

  const getIndicatorColor = () => {
    if (currentVolume > avgVolume * 1.5) return "#FF453A"
    if (currentVolume > avgVolume * 1.2) return "#FF9F0A"
    if (currentVolume < avgVolume * 0.8) return "#30D158"
    return "#64D2FF"
  }

  const chartHeight = Math.max(40, height * 0.85) // 85% для графика
  const statsHeight = Math.max(16, height * 0.12) // 12% для статистики
  const barWidth = isAndroid ? 2.5 : 2.8
  const spacing = 0.8
  const svgWidth = volumeValues.length * (barWidth + spacing)

  return (
    <View style={[styles.volumeChartContainer, { height, padding: isAndroid ? 6 : 8 }]}>
      {/*  Статистика графика - сверху */}
      <View style={[styles.statsOverlay, { height: statsHeight }]}>
        <View style={styles.ultraCompactRow}>
          {/* Now с индикатором */}
          <View style={styles.compactStatItem}>
            <Text style={[styles.indicator, { color: getIndicatorColor() }]}>
              {getVolumeIndicator()}
            </Text>
            <Text style={styles.compactStatLabel}>Now:</Text>
            <Text style={styles.compactStatValue}>{formatVolume(currentVolume)}</Text>
          </View>

          {/* Avg */}
          <View style={styles.compactStatItem}>
            <Text style={styles.compactStatLabel}>Avg:</Text>
            <Text style={styles.compactStatValue}>{formatVolume(avgVolume)}</Text>
          </View>

          {/* Peak */}
          <View style={styles.compactStatItem}>
            <Text style={styles.compactStatLabel}>Peak:</Text>
            <Text style={styles.compactStatValue}>{formatVolume(maxVolume)}</Text>
          </View>
        </View>
      </View>

      {/* График объема */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[
          styles.volumeScroll,
          {
            height: chartHeight,
            marginTop: 2
          }
        ]}
        contentContainerStyle={{
          minWidth: Math.max(svgWidth, width - 20),
          alignItems: "flex-end"
        }}
      >
        <Svg width={svgWidth} height={chartHeight}>
          {volumeValues.map((volume, index) => {
            const barHeight = (volume / maxVolume) * chartHeight * 0.85
            const x = index * (barWidth + spacing)
            const y = chartHeight - barHeight
            const opacity = volume / maxVolume
            //
            const color = `rgba(255, 59, 48, ${0.5 + opacity * 0.5})`

            return (
              <Rect
                key={index}
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={color}
                rx={0.5}
                ry={0.5}
              />
            )
          })}
        </Svg>
      </ScrollView>
    </View>
  )
}
