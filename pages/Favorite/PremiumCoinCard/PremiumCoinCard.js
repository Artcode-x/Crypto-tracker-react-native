import React, { memo } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { smartFormatNumber } from "../../../helpers/helpers"
import ShimmerCard from "../FavoriteComponents/ShimmerCard/ShimmerCard"
import { styles } from "./PremiumCoinCard.styles"

const PremiumCoinCard = React.memo(
  ({
    item,
    isUpdating,
    removingCoinId,
    userAssets,
    priceAlerts,
    notificationPermission,
    openChartModal,
    openAlertModal,
    openAmountInput,
    removeFromFav
  }) => {
    const isRemoving = removingCoinId === item.id
    const priceChangeColor = item.price_change_percentage_24h >= 0 ? "#00C853" : "#FF3B30"
    const priceChangeIcon =
      item.price_change_percentage_24h >= 0 ? "trending-up" : "trending-down"

    const userAmount = (userAssets && userAssets[item.id]) || 0
    const userValue = userAmount * (item.current_price || 0)

    const coinAlerts = priceAlerts.filter(
      (alert) => alert.coinId === item.id && alert.isActive && !alert.triggeredAt
    )
    const hasActiveAlerts = coinAlerts.length > 0
    const alertsCount = coinAlerts.length

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => openChartModal(item)}
        style={styles.cardContainer}
      >
        <ShimmerCard isLoading={isUpdating}>
          <View style={styles.premiumCoinCard}>
            <LinearGradient
              colors={
                isRemoving
                  ? ["rgba(244, 67, 54, 0.3)", "rgba(183, 28, 28, 0.2)"]
                  : ["rgba(70,72,74,0.99)", "rgba(32,34,38,0.8)"]
              }
              style={styles.cardGradient}
            >
              {/* Верхняя строка - заголовок и алерты */}
              <View style={styles.headerRow}>
                {/* Левая часть - название и ранг */}
                <View style={styles.coinInfo}>
                  <View style={styles.rankRow}>
                    <Text style={styles.rankText}>#{item.market_cap_rank || "?"}</Text>
                    {item.market_cap_rank <= 10 && (
                      <MaterialCommunityIcons
                        name='crown'
                        size={10}
                        color='#FFD700'
                        style={styles.crownIcon}
                      />
                    )}
                  </View>
                  <Text style={styles.coinName} numberOfLines={1} ellipsizeMode='tail'>
                    {item.name}
                  </Text>
                  <Text style={styles.coinSymbol}>{item.symbol?.toUpperCase()}</Text>
                </View>

                {/* Правая часть - алерты */}
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation()
                    openAlertModal(item)
                  }}
                  style={styles.alertButtonContainer}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.alertButton,
                      hasActiveAlerts && styles.alertButtonActive,
                      !notificationPermission && styles.alertButtonDisabled
                    ]}
                  >
                    <Ionicons
                      name={hasActiveAlerts ? "notifications" : "notifications-outline"}
                      size={16}
                      color={
                        hasActiveAlerts
                          ? "#D4AF37"
                          : !notificationPermission
                          ? "#666"
                          : "rgba(255,255,255,0.6)"
                      }
                    />

                    {/* Бейдж с количеством алертов */}
                    {hasActiveAlerts && (
                      <View style={styles.alertBadge}>
                        <Text style={styles.alertBadgeText}>{alertsCount}</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
              {/* Средняя строка - цена и сумма пользователя */}
              <View style={styles.middleRow}>
                {/* Левая часть - цена */}
                <View style={styles.priceSection}>
                  <Text
                    style={[styles.coinPrice, { color: priceChangeColor }]}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    adjustsFontSizeToFit
                    minimumFontScale={0.7}
                  >
                    {smartFormatNumber(item.current_price, true)}
                  </Text>

                  <View style={styles.changeContainer}>
                    <View
                      style={[
                        styles.changeBadge,
                        { backgroundColor: `${priceChangeColor}15` }
                      ]}
                    >
                      <Ionicons
                        name={priceChangeIcon}
                        size={10}
                        color={priceChangeColor}
                      />
                      <Text style={[styles.changeText, { color: priceChangeColor }]}>
                        {Math.abs(item.price_change_percentage_24h?.toFixed(2) || 0)}%
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Правая часть - сумма пользователя */}
                <View style={styles.userAmountSection}>
                  {userAmount > 0 ? (
                    <>
                      <Text
                        style={styles.userAmount}
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        adjustsFontSizeToFit
                        minimumFontScale={0.7}
                      >
                        {smartFormatNumber(userAmount, false, true)}
                      </Text>
                      <Text
                        style={styles.userValue}
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        adjustsFontSizeToFit
                        minimumFontScale={0.7}
                      >
                        {smartFormatNumber(userValue)}
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text style={styles.userAmountPlaceholder}>No amount</Text>
                      <Text style={styles.userValuePlaceholder}>$0.00</Text>
                    </>
                  )}
                </View>
              </View>
              {/* Нижняя часть - кнопки действий */}
              <View style={styles.bottomActions}>
                {/* Кнопка Add/Edit */}
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation()
                    openAmountInput(item)
                  }}
                  style={styles.actionButton}
                  activeOpacity={0.7}
                >
                  <LinearGradient
                    colors={["rgba(212, 175, 55, 0.15)", "rgba(183, 121, 31, 0.08)"]}
                    style={[styles.actionButtonGradient, styles.addButtonGradient]}
                  >
                    <Ionicons
                      name={userAmount > 0 ? "pencil-outline" : "add-circle-outline"}
                      size={13}
                      color='#D4AF37'
                    />
                    <Text
                      style={[styles.actionButtonText, styles.addButtonText]}
                      numberOfLines={1}
                      ellipsizeMode='tail'
                    >
                      {userAmount > 0 ? "Edit" : "Add"}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                {/* Кнопка Remove */}
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation()
                    removeFromFav(item)
                  }}
                  style={styles.actionButton}
                  activeOpacity={0.7}
                >
                  <LinearGradient
                    colors={
                      isRemoving
                        ? ["rgba(244, 67, 54, 0.5)", "rgba(183, 28, 28, 0.3)"]
                        : ["rgba(255, 107, 107, 0.15)", "rgba(255, 87, 87, 0.08)"]
                    }
                    style={[styles.actionButtonGradient, styles.removeButtonGradient]}
                  >
                    <Ionicons
                      name={isRemoving ? "checkmark" : "trash-outline"}
                      size={13}
                      color={isRemoving ? "#FFF" : "#FF6B6B"}
                    />
                    <Text
                      style={[
                        styles.actionButtonText,
                        isRemoving && styles.removeButtonText
                      ]}
                      numberOfLines={1}
                      ellipsizeMode='tail'
                    >
                      {isRemoving ? "Removing" : "Remove"}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </ShimmerCard>
      </TouchableOpacity>
    )
  }
)

export default PremiumCoinCard
