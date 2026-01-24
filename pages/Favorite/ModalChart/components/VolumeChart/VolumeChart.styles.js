import { StyleSheet, Dimensions, Platform } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

const { width, height } = Dimensions.get("window")
const isAndroid = Platform.OS === "android"

// Функция для определения планшета
const isTablet = () => {
  const aspectRatio = Math.max(width, height) / Math.min(width, height)
  return aspectRatio < 1.6 && (width >= 600 || height >= 600)
}

const tablet = isTablet()

export const styles = StyleSheet.create({
  volumeChartContainer: {
    backgroundColor: "rgba(35, 35, 40, 0.95)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.15)",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    flex: 1,
    overflow: "hidden"
  },
  volumeScroll: {
    width: "100%",
    flex: 1
  },
  // Статистика поверх графика
  statsOverlay: {
    position: "absolute",
    zIndex: 10,
    backgroundColor: "rgba(35, 35, 40, 0.7)",
    borderRadius: 6,
    paddingVertical: tablet ? 3 : isAndroid ? 1 : 2,
    paddingHorizontal: tablet ? 8 : 6
  },
  ultraCompactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1
  },
  compactStatItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: tablet ? 4 : 2
  },
  indicator: {
    fontSize: tablet ? RFValue(11) : isAndroid ? RFValue(9) : RFValue(10),
    marginRight: tablet ? 4 : 2,
    includeFontPadding: false
  },
  compactStatLabel: {
    fontSize: tablet ? RFValue(9) : isAndroid ? RFValue(7) : RFValue(8),
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "400",
    marginRight: tablet ? 3 : 1,
    includeFontPadding: false,
    textAlignVertical: "center"
  },
  compactStatValue: {
    fontSize: tablet ? RFValue(10) : isAndroid ? RFValue(8) : RFValue(9),
    color: "#FFFFFF",
    fontWeight: "600",
    includeFontPadding: false,
    textAlignVertical: "center",
    marginLeft: 1
  },
  noVolumeText: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: tablet ? RFValue(12) : RFValue(10),
    textAlign: "center",
    padding: tablet ? 10 : 6
  }
})
