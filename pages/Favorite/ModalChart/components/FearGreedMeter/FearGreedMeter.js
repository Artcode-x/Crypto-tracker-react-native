import React, { memo } from "react"
import { View, Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { styles } from "./FearGreedMeter.styles"

const FearGreedMeter = memo(({ value }) => {
  // Получение статуса для цвета
  const getStatusColor = (val) => {
    if (val <= 25) return "#ff3b30"
    if (val <= 45) return "#ff9500"
    if (val <= 55) return "#ffcc00"
    if (val <= 75) return "#34c759"
    return "#00ff87"
  }

  const statusColor = getStatusColor(value)

  return (
    <View style={styles.container}>
      {/* Заголовок */}
      <View style={styles.header}>
        <View style={styles.headerLine} />
        <Text style={styles.title}>FEAR & GREED INDEX</Text>
        <View style={styles.headerLine} />
      </View>

      {/* Градиентная шкала */}
      <LinearGradient
        colors={["#ff3b30", "#ff9500", "#ffcc00", "#34c759", "#00ff87"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBar}
      />

      {/* Маркер текущего значения */}
      <View style={[styles.marker, { left: `${value}%` }]}>
        <View style={styles.markerCrystal}>
          <View style={[styles.crystalPoint, { opacity: 0.9 }]} />
          <View style={[styles.crystalCenter, { opacity: 0.8 }]} />
        </View>
        <View style={styles.markerValueContainer}>
          <Text style={styles.markerValue}>{value}</Text>
        </View>
      </View>

      {/* Подписи под шкалой */}
      <View style={styles.scaleLabels}>
        <Text style={styles.scaleLabel}>EXTREME FEAR</Text>
        <Text style={styles.scaleLabel}>FEAR</Text>
        <Text style={styles.scaleLabel}>NEUTRAL</Text>
        <Text style={styles.scaleLabel}>GREED</Text>
        <Text style={styles.scaleLabel}>EXTREME GREED</Text>
      </View>
    </View>
  )
})

export default FearGreedMeter
