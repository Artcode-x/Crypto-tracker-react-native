import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { TouchableOpacity, View, Text, Dimensions } from "react-native"
import { styles } from "./FavoriteStatsPanel.styles"

const FavoriteStatsPanel = ({ priceAlerts, stats, unreadAlertsCount }) => {
  const { width, height } = Dimensions.get("window")
  const isTablet = () => width >= 768 || (width >= 600 && height >= 900)
  const TABLET = isTablet()
  const ICON_SIZE = TABLET ? 16 : 12

  return (
    <View style={styles.atelier}>
      {/* Корпус из матового стекла  */}
      <LinearGradient
        // colors={["rgba(25,25,30,0.95)", "rgba(15,15,20,0.98)"]}
        colors={["rgba(38,35,32,0.45)", "rgba(28,25,22,0.98)"]}
        style={styles.case}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Световой рельеф */}
      <LinearGradient
        colors={["rgba(212,175,55,0.06)", "transparent"]}
        style={styles.relief}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.6 }}
      />

      {/* Тиснение золотом  */}
      <View style={styles.engraving} />

      <View style={styles.movement}>
        {/* Индикаторы  */}
        <View style={styles.indicator}>
          <View style={styles.markerGroup}>
            <LinearGradient
              colors={["rgba(212,175,55,0.15)", "rgba(212,175,55,0.03)"]}
              style={styles.markerIcon}
            >
              <Ionicons name='trending-up' size={ICON_SIZE} color='#FFD700' />
            </LinearGradient>
            <View style={styles.markerData}>
              <Text style={styles.markerValue}>{stats.bullish}</Text>
              <Text style={styles.markerLabel}>BULLISH</Text>
            </View>
          </View>
        </View>

        <View style={styles.markerDivider} />

        <View style={styles.indicator}>
          <View style={styles.markerGroup}>
            <LinearGradient
              colors={["rgba(212,175,55,0.15)", "rgba(212,175,55,0.03)"]}
              style={styles.markerIcon}
            >
              <Ionicons name='trending-down' size={ICON_SIZE} color='#FFD700' />
            </LinearGradient>
            <View style={styles.markerData}>
              <Text style={styles.markerValue}>{stats.bearish}</Text>
              <Text style={styles.markerLabel}>BEARISH</Text>
            </View>
          </View>
        </View>

        <View style={styles.markerDivider} />

        <View style={styles.indicator}>
          <View style={styles.markerGroup}>
            <LinearGradient
              colors={["rgba(212,175,55,0.15)", "rgba(212,175,55,0.03)"]}
              style={styles.markerIcon}
            >
              <MaterialCommunityIcons
                name='diamond-stone'
                size={ICON_SIZE}
                color='#FFD700'
              />
            </LinearGradient>
            <View style={styles.markerData}>
              <Text style={styles.markerValue}>{stats.top10}</Text>
              <Text style={styles.markerLabel}>TOP 10</Text>
            </View>
          </View>
        </View>

        <View style={styles.markerDivider} />

        <TouchableOpacity style={styles.indicator} activeOpacity={0.7}>
          <View style={styles.markerGroup}>
            <LinearGradient
              colors={["rgba(212,175,55,0.15)", "rgba(212,175,55,0.03)"]}
              style={styles.markerIcon}
            >
              <Ionicons name='notifications' size={ICON_SIZE} color='#FFD700' />
              {unreadAlertsCount > 0 && (
                <View style={styles.crownPulse}>
                  <Text style={styles.pulseText}>{unreadAlertsCount}</Text>
                </View>
              )}
            </LinearGradient>
            <View style={styles.markerData}>
              <Text style={styles.markerValue}>{stats.activeAlerts || 0}</Text>
              <Text style={styles.markerLabel}>ALERTS</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default FavoriteStatsPanel
