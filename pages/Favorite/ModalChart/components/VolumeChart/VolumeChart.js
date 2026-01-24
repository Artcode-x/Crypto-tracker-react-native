import React from "react"
import { ScrollView, Text, View, Dimensions, Platform } from "react-native"
import Svg, { Rect } from "react-native-svg"
import { styles } from "./VolumeChart.styles"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window")
const isAndroid = Platform.OS === "android"

// Функция для определения планшета
const isTablet = () => {
  const { width, height } = Dimensions.get("window")
  const aspectRatio = Math.max(width, height) / Math.min(width, height)
  return aspectRatio < 1.6 && (width >= 600 || height >= 600)
}

// Определяем размеры в зависимости от устройства
const getDeviceBasedDimensions = () => {
  const tablet = isTablet()

  if (tablet) {
    return {
      barWidth: 3.5,
      spacing: 1,
      chartHeightRatio: 0.75,
      statsHeightRatio: 0.15,
      containerPadding: 10,
      minBarHeight: 60
    }
  }

  return {
    barWidth: isAndroid ? 2.5 : 2.8,
    spacing: 0.8,
    chartHeightRatio: 0.85,
    statsHeightRatio: 0.12,
    containerPadding: isAndroid ? 6 : 8,
    minBarHeight: 40
  }
}

export const VolumeChart = ({ volumeData, height = 100 }) => {
  const deviceProps = getDeviceBasedDimensions()
  const tablet = isTablet()

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

  // Динамический расчет размеров
  const chartHeight = Math.max(
    deviceProps.minBarHeight,
    height * deviceProps.chartHeightRatio
  )
  const statsHeight = Math.max(16, height * deviceProps.statsHeightRatio)

  // Расчет ширины SVG для заполнения всей ширины
  const calculateSvgWidth = () => {
    const containerWidth =
      screenWidth - 2 * deviceProps.containerPadding - (tablet ? 24 : 16)
    const barCount = volumeValues.length
    const totalSpacing = (barCount - 1) * deviceProps.spacing
    const availableWidth = containerWidth - totalSpacing
    const calculatedBarWidth = availableWidth / barCount

    // Возвращаем ширину SVG равную ширине контейнера
    return containerWidth
  }

  const svgWidth = calculateSvgWidth()

  // Расчет ширины каждого бара с учетом полного заполнения
  const calculateBarWidth = () => {
    const barCount = volumeValues.length
    const totalSpacing = (barCount - 1) * deviceProps.spacing
    const availableWidth = svgWidth - totalSpacing
    return Math.max(deviceProps.barWidth, availableWidth / barCount)
  }

  const barWidth = calculateBarWidth()

  return (
    <View
      style={[
        styles.volumeChartContainer,
        {
          height,
          padding: deviceProps.containerPadding,
          paddingHorizontal: tablet ? 12 : deviceProps.containerPadding
        }
      ]}
    >
      {/* Статистика графика */}
      <View
        style={[
          styles.statsOverlay,
          {
            height: statsHeight,
            left: tablet ? 12 : 8,
            right: tablet ? 12 : 8,
            top: tablet ? 6 : isAndroid ? 4 : 5
          }
        ]}
      >
        <View style={styles.ultraCompactRow}>
          <View style={styles.compactStatItem}>
            <Text style={[styles.indicator, { color: getIndicatorColor() }]}>
              {getVolumeIndicator()}
            </Text>
            <Text style={styles.compactStatLabel}>Now:</Text>
            <Text style={styles.compactStatValue}>{formatVolume(currentVolume)}</Text>
          </View>

          <View style={styles.compactStatItem}>
            <Text style={styles.compactStatLabel}>Avg:</Text>
            <Text style={styles.compactStatValue}>{formatVolume(avgVolume)}</Text>
          </View>

          <View style={styles.compactStatItem}>
            <Text style={styles.compactStatLabel}>Peak:</Text>
            <Text style={styles.compactStatValue}>{formatVolume(maxVolume)}</Text>
          </View>
        </View>
      </View>

      {/* График объема - теперь без ScrollView */}
      <View
        style={[
          styles.chartContainer,
          {
            height: chartHeight,
            marginTop: tablet ? 4 : 2
          }
        ]}
      >
        <Svg width={svgWidth} height={chartHeight}>
          {volumeValues.map((volume, index) => {
            const barHeight = (volume / maxVolume) * chartHeight * 0.9
            const x = index * (barWidth + deviceProps.spacing)
            const y = chartHeight - barHeight
            const opacity = volume / maxVolume
            const color = `rgba(255, 59, 48, ${0.5 + opacity * 0.5})`

            return (
              <Rect
                key={index}
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={color}
                rx={1}
                ry={1}
              />
            )
          })}
        </Svg>
      </View>
    </View>
  )
}
