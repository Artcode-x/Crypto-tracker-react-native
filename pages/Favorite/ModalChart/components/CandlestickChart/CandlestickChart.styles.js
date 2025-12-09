import { StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

export const styles = StyleSheet.create({
  // Для CandlestickChart
  chartContainerStyle: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },

  limitContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 8
  },

  limitHint: {
    fontSize: RFValue(9),
    color: "rgba(255, 255, 255, 0.5)",
    fontStyle: "italic"
  },

  yAxisLabel: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: RFValue(8)
  }
})
