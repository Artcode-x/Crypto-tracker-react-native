import { StyleSheet, Platform } from "react-native"

export const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    overflow: "hidden",
    height: 68
  },

  card: {
    flexDirection: "row",
    alignItems: "stretch",
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: "100%",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)"
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    width: 80,
    marginRight: 8
  },

  directionIcon: {
    marginRight: 8
  },

  coinInfo: {
    flex: 1,
    minWidth: 0
  },

  coinSymbol: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 2,
    includeFontPadding: Platform.OS === "android" ? false : true,
    textAlignVertical: "center"
  },

  coinName: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 10,
    fontWeight: "500",
    includeFontPadding: Platform.OS === "android" ? false : true,
    textAlignVertical: "center"
  },

  // Центральная секция
  centerSection: {
    flex: 1,
    marginRight: 8,
    minWidth: 0,
    justifyContent: "center"
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    flexWrap: "nowrap",
    overflow: "hidden"
  },

  currentPrice: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
    marginRight: 4,
    includeFontPadding: Platform.OS === "android" ? false : true,
    textAlignVertical: "center",
    flexShrink: 1
  },

  targetPrice: {
    fontSize: 11,
    fontWeight: "700",
    marginLeft: 4,
    includeFontPadding: Platform.OS === "android" ? false : true,
    textAlignVertical: "center",
    flexShrink: 1
  },

  arrowIcon: {
    marginHorizontal: 4,
    flexShrink: 0
  },

  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 16
  },

  progressBackground: {
    flex: 1,
    height: 3,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 1.5,
    marginRight: 6,
    overflow: "hidden"
  },

  progressFill: {
    height: "100%",
    borderRadius: 1.5
  },

  progressText: {
    fontSize: 10,
    fontWeight: "700",
    width: 24,
    textAlign: "center",
    includeFontPadding: Platform.OS === "android" ? false : true,
    textAlignVertical: "center"
  },

  // Правая секция: Детали и удаление
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    width: 90,
    justifyContent: "flex-end"
  },

  detailsColumn: {
    alignItems: "flex-end",
    marginRight: 8,
    flex: 1,
    minWidth: 0
  },

  differenceText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 1,
    includeFontPadding: Platform.OS === "android" ? false : true,
    textAlignVertical: "center",
    textAlign: "right",
    flexShrink: 1
  },

  percentText: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 9,
    fontWeight: "500",
    includeFontPadding: Platform.OS === "android" ? false : true,
    textAlignVertical: "center",
    textAlign: "right"
  },

  deleteButton: {
    padding: 2,
    marginLeft: 2
  }
})
