import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { TouchableOpacity, View, Text } from "react-native"
import { styles } from "./FavoriteStatsPanel.styles"

const FavoriteStatsPanel = ({ priceAlerts, stats, unreadAlertsCount }) => {
  return (
    <View style={styles.statsPanel}>
      <LinearGradient
        colors={["rgba(212, 175, 55, 0.15)", "rgba(183, 121, 31, 0.08)"]}
        style={styles.statsGradient}
      >
        <View style={styles.compactStats}>
          <View style={styles.statItemCompact}>
            <Ionicons name='trending-up' size={12} color='#00C853' />
            <Text style={styles.statNumberCompact}>{stats.bullish}</Text>
            <Text style={styles.statLabelCompact}>Growth</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItemCompact}>
            <Ionicons name='trending-down' size={12} color='#FF3B30' />
            <Text style={styles.statNumberCompact}>{stats.bearish}</Text>
            <Text style={styles.statLabelCompact}>Decline</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItemCompact}>
            <MaterialCommunityIcons name='diamond-stone' size={12} color='#FFD700' />
            <Text style={styles.statNumberCompact}>{stats.top10}</Text>
            <Text style={styles.statLabelCompact}>Top-10</Text>
          </View>
          <View style={styles.statDivider} />
          <TouchableOpacity
            style={styles.statItemCompact}
            onPress={() => {
              console.log("Статистика алертов:")
              console.log(`   Всего: ${priceAlerts.length}`)
              console.log(`   Активных: ${stats.activeAlerts || 0}`)
              console.log(`   Сработавших: ${stats.triggeredAlerts || 0}`)
              console.log(`   Непрочитанных: ${unreadAlertsCount}`)
            }}
          >
            <Ionicons name='notifications' size={12} color='#FF6B6B' />
            <View style={styles.alertBadgeContainer}>
              <Text style={styles.statNumberCompact}>{stats.activeAlerts || 0}</Text>
              {unreadAlertsCount > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadBadgeText}>{unreadAlertsCount}</Text>
                </View>
              )}
            </View>
            <Text style={styles.statLabelCompact}>Alerts</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  )
}

export default FavoriteStatsPanel
