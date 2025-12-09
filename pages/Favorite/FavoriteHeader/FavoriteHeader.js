import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { Text, TouchableOpacity, View } from "react-native"
import { styles } from "./FavoriteHeader.styles"
import TestNotificationButton from "./TestNotificationButton"

const FavoriteHeader = ({
  stats,
  lastUpdateTime,
  priceAlerts,
  notificationPermission,
  totalPortfolioValue,
  isUpdating,
  handleManualUpdate
}) => {
  return (
    <View style={styles.premiumHeader}>
      <LinearGradient
        colors={["rgba(212, 175, 55, 0.2)", "rgba(183, 121, 31, 0.1)"]}
        style={styles.headerGradient}
      >
        <MaterialCommunityIcons name='crown' size={22} color='#D4AF37' />
        <View style={styles.headerLeftContainer}>
          <Text style={styles.headerTitle}>Watchlist</Text>
          <Text style={styles.headerSubtitle}>
            Total: {stats.total} asset{stats.total !== 1 ? "s" : ""}
            {lastUpdateTime && ` | Last: ${lastUpdateTime}`}
            {priceAlerts.length > 0 && ` | Alerts: ${priceAlerts.length}`}
            {!notificationPermission && " | 🔕"}
          </Text>
        </View>

        {/* Portfolio справа */}
        <View style={styles.headerRightContainer}>
          <Text style={styles.portfolioLabel}>Portfolio</Text>
          <Text style={styles.portfolioValue}>
            $
            {totalPortfolioValue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </Text>

          {/* Кнопка ручного обновления */}
          <TouchableOpacity
            onPress={handleManualUpdate}
            disabled={isUpdating}
            style={[styles.refreshButton, isUpdating && styles.refreshButtonDisabled]}
          >
            {isUpdating ? (
              <Ionicons name='time-outline' size={16} color='#D4AF37' />
            ) : (
              <Ionicons name='refresh' size={16} color='#D4AF37' />
            )}
          </TouchableOpacity>

          {/* Кнопка тестового уведомления (видна только в development) */}
          {__DEV__ && notificationPermission && (
            <TestNotificationButton notificationPermission={notificationPermission} />
          )}
        </View>
      </LinearGradient>
    </View>
  )
}

export default FavoriteHeader
