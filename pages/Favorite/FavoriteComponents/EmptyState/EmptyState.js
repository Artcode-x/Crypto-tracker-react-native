import { Text, TouchableOpacity, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { styles } from "./EmptyState.styles"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { memo } from "react"
import { useNavigation } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"

const EmptyState = ({ notificationPermission, onAddCoins, onEnableNotifications }) => {
  const navigation = useNavigation()

  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='#030305' />

      <LinearGradient
        colors={["rgba(212,175,55,0.06)", "transparent"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.8 }}
        style={styles.ambience}
      />

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name='gold' size={18} color='#FFD700' />
                <View style={styles.iconPulse} />
              </View>
              <Text style={styles.headerTitle}>WATCHLIST</Text>
            </View>

            <View style={styles.headerRight}>
              {/* <View style={styles.divider} /> */}
              {/* <View style={styles.status}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>24/7</Text>
              </View> */}
            </View>
          </View>
        </View>

        <View style={styles.gallery}>
          <View style={styles.pedestal}>
            {/* Экспонат в защитном стекле */}
            <View style={styles.vitrine}>
              <LinearGradient
                colors={["rgba(212,175,55,0.2)", "rgba(212,175,55,0.02)"]}
                style={styles.sphere}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.sphereInner}>
                  <MaterialCommunityIcons
                    name='treasure-chest'
                    size={40}
                    color='#FFD700'
                  />
                </View>
              </LinearGradient>

              {/* Тень от экспоната — очень тонкая */}
              <LinearGradient
                colors={["rgba(212,175,55,0.1)", "transparent"]}
                style={styles.sphereShadow}
              />
            </View>

            <Text style={styles.label}>PORTFOLIO INSIGHTS</Text>
            <Text style={styles.caption}>Your Journey Begins</Text>

            <View style={styles.division}>
              <View style={styles.divisionLine} />
              <Ionicons name='sparkles' size={10} color='rgba(212,175,55,0.4)' />
              <View style={styles.divisionLine} />
            </View>

            <Text style={styles.description}>
              Add coins to start building your portfolio{"\n"}
              Track your favorite cryptocurrency
            </Text>

            <View style={styles.controls}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Home")}
                activeOpacity={0.6}
                style={styles.control}
              >
                <LinearGradient
                  colors={["rgba(212,175,55,0.12)", "rgba(212,175,55,0.02)"]}
                  style={styles.controlGradient}
                >
                  <Text style={styles.controlText}>+</Text>
                </LinearGradient>
                <Text style={styles.controlLabel}>Add coin to start</Text>
              </TouchableOpacity>

              {!notificationPermission && (
                <TouchableOpacity
                  onPress={onEnableNotifications}
                  activeOpacity={0.6}
                  style={styles.controlSecondary}
                >
                  <LinearGradient
                    colors={["rgba(212,175,55,0.08)", "rgba(212,175,55,0.01)"]}
                    style={styles.controlSecondaryGradient}
                  >
                    <Ionicons name='notifications-outline' size={18} color='#FFD700' />
                  </LinearGradient>
                  <Text style={styles.controlSecondaryLabel}>PRICE ALERTS</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

export default memo(EmptyState)
