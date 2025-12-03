import { View, Text, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { styles } from "./SwitchtimeframeButtons.styles"
import { useDispatch } from "react-redux"
import { setChartDays } from "../../../store/reducersSlice"

export const SwitchTimeframeButtons = ({ chartDays, compactMode = false }) => {
  const dispatch = useDispatch()

  const switch1 = (days) => {
    dispatch(setChartDays(days))
  }

  const timeframes = [
    { key: "1h", label: "1H" },
    { key: "4h", label: "4H" },
    { key: "1d", label: "1D" },
    { key: "1w", label: "1W" },
    { key: "1M", label: "1M" }
  ]

  return (
    <View style={[styles.chartButtons, compactMode && styles.chartButtonsCompact]}>
      {timeframes.map((timeframe) => {
        const isActive = chartDays === timeframe.key
        return (
          <TouchableOpacity
            key={timeframe.key}
            onPress={() => switch1(timeframe.key)}
            activeOpacity={0.7}
            style={[
              styles.buttonContainer,
              compactMode && styles.buttonContainerCompact,
              isActive && styles.activeButtonContainer
            ]}
          >
            <LinearGradient
              colors={
                isActive
                  ? ["#D4AF37", "#B3791F"]
                  : ["rgba(40, 40, 45, 0.9)", "rgba(30, 30, 35, 0.95)"]
              }
              style={[styles.buttonGradient, isActive && styles.activeButtonGradient]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text
                style={[
                  styles.buttonText,
                  isActive && styles.activeButtonText,
                  compactMode && styles.buttonTextCompact
                ]}
              >
                {timeframe.label}
              </Text>

              {isActive && (
                <LinearGradient
                  colors={[
                    "rgba(212, 175, 55, 0.4)",
                    "rgba(183, 121, 31, 0.2)",
                    "transparent"
                  ]}
                  style={styles.buttonGlow}
                />
              )}
            </LinearGradient>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
