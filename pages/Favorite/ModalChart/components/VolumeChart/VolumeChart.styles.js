import { StyleSheet, Dimensions, Platform } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

const { width } = Dimensions.get("window")
const isAndroid = Platform.OS === "android"

export const styles = StyleSheet.create({
  volumeChartContainer: {
    backgroundColor: "rgba(35, 35, 40, 0.95)",
    borderRadius: 10,
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
    top: isAndroid ? 4 : 5,
    left: 8,
    right: 8,
    zIndex: 10,
    backgroundColor: "rgba(35, 35, 40, 0.7)",
    borderRadius: 4,
    paddingVertical: isAndroid ? 1 : 2,
    paddingHorizontal: 6
  },
  ultraCompactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  compactStatItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  indicator: {
    fontSize: isAndroid ? RFValue(9) : RFValue(10),
    marginRight: 2,
    includeFontPadding: false
  },
  compactStatLabel: {
    fontSize: isAndroid ? RFValue(7) : RFValue(8),
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "400",
    marginRight: 1,
    includeFontPadding: false,
    textAlignVertical: "center"
  },
  compactStatValue: {
    fontSize: isAndroid ? RFValue(8) : RFValue(9),
    color: "#FFFFFF",
    fontWeight: "600",
    includeFontPadding: false,
    textAlignVertical: "center"
  },
  noVolumeText: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: RFValue(10),
    textAlign: "center",
    padding: 6
  }
})
