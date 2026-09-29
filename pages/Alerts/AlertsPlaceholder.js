import { Ionicons } from "@expo/vector-icons"
import { StatusBar } from "expo-status-bar"
import { Text, TouchableOpacity, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { styles } from "./AlertsPlaceholder.styles"
import { useNavigation } from "@react-navigation/native"

const AlertsPlaceholder = () => {
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
        {/* Хедер */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name='notifications-outline' size={18} color='#FFD700' />
                <View style={styles.iconPulse} />
              </View>
              <Text style={styles.headerTitle}>ALERTS</Text>
            </View>

            <View style={styles.headerRight}>
              <View style={styles.divider} />
              <View style={styles.status}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>24/7</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Витрина */}
        <View style={styles.gallery}>
          <View style={styles.pedestal}>
            <View style={styles.vitrine}>
              <LinearGradient
                colors={["rgba(212,175,55,0.2)", "rgba(212,175,55,0.02)"]}
                style={styles.sphere}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.sphereInner}>
                  <Ionicons name='notifications-off-outline' size={40} color='#FFD700' />
                </View>
              </LinearGradient>

              <LinearGradient
                colors={["rgba(212,175,55,0.1)", "transparent"]}
                style={styles.sphereShadow}
              />
            </View>

            <Text style={styles.label}>CURRENT STATE</Text>
            <Text style={styles.caption}>No active alerts</Text>

            <View style={styles.division}>
              <View style={styles.divisionLine} />
              <Ionicons name='sparkles' size={10} color='rgba(212,175,55,0.4)' />
              <View style={styles.divisionLine} />
            </View>

            <Text style={styles.description}>
              From tracking to tactics{"\n"}
              Command your market move
            </Text>

            {/* Контролы */}
            <View style={styles.controls}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Favorite")}
                activeOpacity={0.6}
                style={styles.control}
              >
                <LinearGradient
                  colors={["rgba(212,175,55,0.12)", "rgba(212,175,55,0.02)"]}
                  style={styles.controlGradient}
                >
                  <Text style={styles.controlText}>+</Text>
                </LinearGradient>
                <Text style={styles.controlLabel}>CREATE ALERT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.year}>MMXXVI</Text>
      </View>
    </>
  )
}

export default AlertsPlaceholder
