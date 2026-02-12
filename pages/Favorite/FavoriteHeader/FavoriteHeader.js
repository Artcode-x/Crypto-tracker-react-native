import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { Text, TouchableOpacity, View } from "react-native"
import { styles } from "./FavoriteHeader.styles"

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
    <View style={styles.atelier}>
      {/* Корпус из матового стекла */}
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

      {/* Тиснение золотом */}
      <View style={styles.engraving} />

      <View style={styles.movement}>
        {/* Левая часть — эмблема мануфактуры */}
        <View style={styles.manufacture}>
          <View style={styles.emblem}>
            <LinearGradient
              colors={["rgba(212,175,55,0.2)", "rgba(212,175,55,0.05)"]}
              style={styles.emblemBase}
            />
            <MaterialCommunityIcons name='crown' size={20} color='#FFD700' />
            <View style={styles.emblemPatin} />
          </View>

          <View style={styles.caliber}>
            <Text style={styles.caliberName}>WATCHLIST</Text>
            <View style={styles.caliberMarkers}>
              <View style={styles.markerGroup}>
                <Text style={styles.markerValue}>{stats.total}</Text>
                <Text style={styles.markerLabel}> ASSETS</Text>
              </View>

              {lastUpdateTime && (
                <>
                  <View style={styles.markerDivider} />
                  <View style={styles.markerGroup}>
                    <Ionicons
                      style={{ paddingTop: 1 }}
                      name='time-outline'
                      size={12}
                      color='rgba(212,175,55,0.8)'
                    />
                    <Text style={styles.markerValueSmall}>{lastUpdateTime}</Text>
                  </View>
                </>
              )}

              {priceAlerts.length > 0 && (
                <>
                  <View style={styles.markerDivider} />
                  <View style={styles.markerGroup}>
                    <Ionicons
                      name='notifications-outline'
                      size={10}
                      color='rgba(212,175,55,0.8)'
                    />
                    <Text style={styles.markerValueSmall}>{priceAlerts.length}</Text>
                  </View>
                </>
              )}

              {!notificationPermission && (
                <>
                  <View style={styles.markerDivider} />
                  <Ionicons
                    name='notifications-off-outline'
                    size={10}
                    color='rgba(255,107,107,0.7)'
                  />
                </>
              )}
            </View>
          </View>
        </View>

        {/* Правая часть  */}
        <View style={styles.complication}>
          <View style={styles.perpetual}>
            <Text style={styles.perpetualLabel}>PORTFOLIO</Text>
            <Text style={styles.perpetualValue}>
              $
              {totalPortfolioValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleManualUpdate}
            disabled={isUpdating}
            activeOpacity={0.7}
            style={styles.crown}
          >
            <LinearGradient
              colors={
                isUpdating
                  ? ["rgba(212,175,55,0.18)", "rgba(212,175,55,0.04)"]
                  : ["rgba(212,175,55,0.1)", "rgba(212,175,55,0.02)"]
              }
              style={styles.crownBase}
            />
            <Ionicons
              name={isUpdating ? "time-outline" : "refresh"}
              size={16}
              color={isUpdating ? "#FFD700" : "rgba(212,175,55,0.9)"}
            />
            {isUpdating && <View style={styles.crownPulse} />}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default FavoriteHeader
