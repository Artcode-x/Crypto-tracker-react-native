import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { StatusBar } from "expo-status-bar"
import { Text, View, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useNavigation } from "@react-navigation/native"
import { styles } from "./AnalyticsPlaceholder.styles"

const AnalyticsPlaceholder = () => {
  const navigation = useNavigation()

  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='#030305' />

      {/* Тончайшая атмосфера — золотая пыль */}
      <LinearGradient
        colors={["rgba(212,175,55,0.04)", "transparent"]}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 0.7, y: 0.6 }}
        style={styles.ambience}
      />

      <View style={styles.container}>
        {/* Хедер — минимальный, почти невидимый */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name='chart-box-outline'
                  size={18}
                  color='#FFD700'
                />
                <View style={styles.iconPulse} />
              </View>
              <Text style={styles.headerTitle}>ANALYTICS</Text>
            </View>

            <View style={styles.headerRight}>
              {/* <View style={styles.divider} /> */}
              {/* <View style={styles.status}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>IDLE</Text>
              </View> */}
            </View>
          </View>
        </View>

        {/* Пустое состояние — галерея одного экспоната */}
        <View style={styles.gallery}>
          <View style={styles.pedestal}>
            {/* Артефакт в защитном стекле */}
            <View style={styles.vitrine}>
              <LinearGradient
                colors={["rgba(212,175,55,0.18)", "rgba(212,175,55,0.01)"]}
                style={styles.sphere}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.sphereInner}>
                  <MaterialCommunityIcons name='chart-box' size={40} color='#FFD700' />
                </View>
              </LinearGradient>

              <LinearGradient
                colors={["rgba(212,175,55,0.08)", "transparent"]}
                style={styles.sphereShadow}
              />
            </View>

            {/* Музейная этикетка */}
            <Text style={styles.label}>PORTFOLIO ANALYSIS</Text>
            <Text style={styles.caption}>No data to display</Text>

            {/* Декоративная линия — отсылка к измерительным приборам */}
            <View style={styles.division}>
              <View style={styles.divisionLine} />
              <Ionicons name='sparkles' size={10} color='rgba(212,175,55,0.4)' />
              <View style={styles.divisionLine} />
            </View>

            <Text style={styles.description}>
              Add assets to your collection{"\n"}
              and reveal portfolio insights
            </Text>

            {/* Контрол — тактильный, как регулятор на премиум-усилителе */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Favorite")}
              activeOpacity={0.6}
              style={styles.control}
            >
              <LinearGradient
                colors={["rgba(212,175,55,0.1)", "rgba(212,175,55,0.02)"]}
                style={styles.controlGradient}
              >
                <Text style={styles.controlText}>+</Text>
              </LinearGradient>
              <Text style={styles.controlLabel}>ADD ASSETS</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Год на корпусе */}
        <Text style={styles.year}>MMXXVI</Text>
      </View>
    </>
  )
}

export default AnalyticsPlaceholder
