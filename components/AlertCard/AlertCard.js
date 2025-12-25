import React from "react"
import { View, Text, TouchableOpacity, Platform } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { smartFormatNumber } from "../../helpers/helpers"
import { styles } from "./AlertCard.styles"

const AlertCard = ({ alert, onDelete }) => {
  const isTriggered = !!alert.triggeredAt
  const isAbove = alert.condition === "above"
  const currentPrice = alert.currentPrice || 0
  const targetPrice = alert.targetPrice || 1
  const createdPrice = alert.createdPrice || currentPrice // Берем начальную цену

  // Определяем стили
  const getColors = () => {
    if (isTriggered) return ["rgba(255, 215, 0, 0.12)", "rgba(255, 193, 7, 0.06)"]
    return isAbove
      ? ["rgba(76, 175, 80, 0.12)", "rgba(56, 142, 60, 0.06)"]
      : ["rgba(244, 67, 54, 0.12)", "rgba(198, 40, 40, 0.06)"]
  }

  const getIconColor = () => {
    if (isTriggered) return "#FFD700"
    return isAbove ? "#4CAF50" : "#F44336"
  }

  const getDirectionIcon = () => {
    if (isTriggered) return "checkmark"
    return isAbove ? "arrow-up" : "arrow-down"
  }

  // КОРРЕКТНЫЙ РАСЧЕТ ПРОГРЕССА С createdPrice
  const calculateProgress = () => {
    if (isTriggered) return 1.0

    if (isAbove) {
      // Для алерта на повышение: насколько цена выросла от начальной к целевой
      if (currentPrice >= targetPrice) return 1.0 // Уже достигнута
      if (createdPrice >= targetPrice) return 0.0 // Некорректные данные

      const totalGrowthNeeded = targetPrice - createdPrice // Сколько нужно вырасти
      const currentGrowth = currentPrice - createdPrice // Сколько уже выросло

      return Math.min(Math.max(currentGrowth / totalGrowthNeeded, 0), 1.0)
    } else {
      // Для алерта на понижение: насколько цена упала от начальной к целевой
      if (currentPrice <= targetPrice) return 1.0 // Уже достигнута
      if (createdPrice <= targetPrice) return 0.0 // Некорректные данные

      const totalDropNeeded = createdPrice - targetPrice // Сколько нужно упасть
      const currentDrop = createdPrice - currentPrice // Сколько уже упало

      return Math.min(Math.max(currentDrop / totalDropNeeded, 0), 1.0)
    }
  }

  //   const calculateProgress = () => {
  //     if (isTriggered) return 1.0

  //     if (!createdPrice || createdPrice === 0) return 0

  //     if (isAbove) {
  //       // Для алерта "above": цена должна вырасти от createdPrice до targetPrice
  //       if (currentPrice >= targetPrice) return 1.0
  //       const totalRange = targetPrice - createdPrice
  //       const progress = currentPrice - createdPrice
  //       return Math.max(0, Math.min(progress / totalRange, 1))
  //     } else {
  //       // Для алерта "below": цена должна упасть от createdPrice до targetPrice
  //       if (currentPrice <= targetPrice) return 1.0
  //       const totalRange = createdPrice - targetPrice
  //       const progress = createdPrice - currentPrice
  //       return Math.max(0, Math.min(progress / totalRange, 1))
  //     }
  //   }

  const progress = calculateProgress()
  const difference = Math.abs(currentPrice - targetPrice)
  const percentDiff = (difference / targetPrice) * 100

  // Форматируем цены
  const formatFullPrice = (price) => {
    return smartFormatNumber(price, true)
  }

  // Определяем порядок отображения цен
  const getPriceDisplay = () => {
    if (isAbove) {
      // Для алерта на повышение: текущая → целевая
      return {
        leftPrice: formatFullPrice(currentPrice),
        rightPrice: formatFullPrice(targetPrice),
        arrowDirection: "arrow-forward",
        leftPriceStyle: styles.currentPrice,
        rightPriceStyle: [styles.targetPrice, { color: getIconColor() }]
      }
    } else {
      // Для алерта на понижение: целевая ← текущая
      return {
        leftPrice: formatFullPrice(targetPrice),
        rightPrice: formatFullPrice(currentPrice),
        arrowDirection: "arrow-back",
        leftPriceStyle: [styles.targetPrice, { color: getIconColor() }],
        rightPriceStyle: styles.currentPrice
      }
    }
  }

  const priceDisplay = getPriceDisplay()

  // Рассчитываем разницу от начальной цены для информации
  const getProgressFromStart = () => {
    if (isAbove) {
      const growth = currentPrice - createdPrice
      const needed = targetPrice - createdPrice
      return growth > 0 ? (growth / needed) * 100 : 0
    } else {
      const drop = createdPrice - currentPrice
      const needed = createdPrice - targetPrice
      return drop > 0 ? (drop / needed) * 100 : 0
    }
  }

  const progressFromStart = getProgressFromStart()

  return (
    <TouchableOpacity onPress={onDelete} activeOpacity={0.9} style={styles.cardContainer}>
      <LinearGradient
        colors={getColors()}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        {/* Левая часть: Монета и направление */}
        <View style={styles.leftSection}>
          <Ionicons
            name={getDirectionIcon()}
            size={14}
            color={getIconColor()}
            style={styles.directionIcon}
          />
          <View style={styles.coinInfo}>
            <Text style={styles.coinSymbol} numberOfLines={1} ellipsizeMode='tail'>
              {alert.coinSymbol?.toUpperCase() || "???"}
            </Text>
            <Text style={styles.coinName} numberOfLines={1} ellipsizeMode='tail'>
              {getShortCoinName(alert.coinName)}
            </Text>
          </View>
        </View>

        {/* Центральная часть: Цены */}
        <View style={styles.centerSection}>
          <View style={styles.priceRow}>
            <Text
              style={priceDisplay.leftPriceStyle}
              numberOfLines={1}
              ellipsizeMode='tail'
              minimumFontScale={0.85}
              adjustsFontSizeToFit={Platform.OS === "android"}
            >
              {priceDisplay.leftPrice}
            </Text>

            <Ionicons
              name={priceDisplay.arrowDirection}
              size={10}
              color='rgba(255,255,255,0.4)'
              style={styles.arrowIcon}
            />

            <Text
              style={priceDisplay.rightPriceStyle}
              numberOfLines={1}
              ellipsizeMode='tail'
              minimumFontScale={0.85}
              adjustsFontSizeToFit={Platform.OS === "android"}
            >
              {priceDisplay.rightPrice}
            </Text>
          </View>

          {/* Мини прогресс-бар - ТЕПЕРЬ КОРРЕКТНЫЙ */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${progress * 100}%`,
                    backgroundColor: getIconColor()
                  }
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: getIconColor() }]}>
              {isTriggered ? "✓" : `${Math.round(progress * 100)}%`}
              {!isTriggered && alert.createdPrice && (
                <Text style={{ fontSize: 8, opacity: 0.6 }}>
                  {` (${progressFromStart.toFixed(0)}%)`}
                </Text>
              )}
            </Text>
          </View>
        </View>

        {/* Правая часть: Детали и удаление */}
        <View style={styles.rightSection}>
          <View style={styles.detailsColumn}>
            <Text
              style={styles.differenceText}
              numberOfLines={1}
              ellipsizeMode='tail'
              minimumFontScale={0.8}
              adjustsFontSizeToFit={Platform.OS === "android"}
            >
              {getDifferenceText(currentPrice, targetPrice, isAbove)}
            </Text>
            <Text style={styles.percentText} numberOfLines={1}>
              ({percentDiff.toFixed(1)}%)
            </Text>

            {/* Дополнительная информация о прогрессе */}
            {!isTriggered && alert.createdPrice && (
              <Text style={[styles.percentText, { fontSize: 8 }]}>
                from ${smartFormatNumber(createdPrice, true)}
              </Text>
            )}
          </View>

          <TouchableOpacity
            onPress={onDelete}
            style={styles.deleteButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name='close-circle' size={16} color='#F44336' />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

// Вспомогательная функция для текста разницы
const getDifferenceText = (currentPrice, targetPrice, isAbove) => {
  const difference = Math.abs(currentPrice - targetPrice)
  const formattedDiff = smartFormatNumber(difference, true)

  if (isAbove) {
    // Для above: +разница (цена должна вырасти)
    return `+${formattedDiff}`
  } else {
    // Для below: -разница (цена должна упасть)
    return `-${formattedDiff}`
  }
}

// Вспомогательная функция для короткого названия монеты
const getShortCoinName = (coinName) => {
  if (!coinName) return "Coin"

  const words = coinName.split(" ")
  const firstWord = words[0]

  return firstWord
}

export default React.memo(AlertCard)
