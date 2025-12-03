import { StyleSheet, Dimensions, Platform } from "react-native"

const { width, height } = Dimensions.get("window")

export const styles = StyleSheet.create({
  volumeChartContainer: {
    backgroundColor: "rgba(35, 35, 40, 0.95)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.25)",
    padding: 15,
    alignItems: "center",
    width: "100%"
  },
  volumeStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)"
  },
  volumeStat: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500"
  },
  noVolumeText: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 14,
    textAlign: "center",
    padding: 20
  }
})
