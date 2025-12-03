import { StyleSheet, Dimensions } from "react-native"

const { width } = Dimensions.get("window")

export const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    backgroundColor: "rgba(75, 73, 74, 0.9)",
    padding: 20,
    justifyContent: "flex-start",
    paddingTop: 40,
    minHeight: Dimensions.get("window").height
  },
  textUp: {
    fontWeight: "300",
    color: "white",
    fontSize: 11
  },
  textTit: {
    color: "white",
    fontSize: 14,
    marginTop: 6,
    marginBottom: 5,
    fontWeight: "600"
  },
  textZ: {
    color: "#D4AF37",
    fontWeight: "700"
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15
  },
  selectedCoinName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFF"
  },
  selectedCoinSymbol: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: 2
  },
  modalCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(212, 175, 55, 0.2)",
    alignItems: "center",
    justifyContent: "center"
  },
  minmaxBlock: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 4,
    borderRadius: 8
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loadingText: {
    marginTop: 10,
    color: "#D4AF37",
    fontSize: 14
  },
  priceBlock: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10
  },
  priceContainer: {
    alignItems: "center"
  },
  label: {
    fontWeight: "bold",
    color: "wheat",
    fontSize: 9
  },
  priceValue: {
    fontSize: 11,
    color: "white"
  },
  chartContainerStyle: {
    alignItems: "center",
    backgroundColor: "#3a3a3a",
    borderWidth: 1,
    borderColor: "wheat",
    borderRadius: 12,
    padding: 10,
    width: "100%"
  },
  box: {
    flexDirection: "row"
  },
  yAxisLabel: {
    color: "#888",
    fontSize: 10,
    textAlign: "right",
    paddingRight: 5
  },
  santimentContainer: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 4,
    borderRadius: 8,
    marginBottom: 5,
    alignItems: "center"
  },
  santimentText: {
    color: "white",
    fontSize: 12
  },
  bullishText: {
    color: "#4CAF50",
    fontWeight: "bold"
  },
  bearishText: {
    color: "#F44336",
    fontWeight: "bold"
  },
  timeframeContainer: {
    marginBottom: 16,
    width: "100%"
  },
  selectedTimeframeContainer: {
    marginBottom: 3
  },
  selectedTimeframeText: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "600",
    textAlign: "center"
  },
  limitContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 10
  },
  limitLabel: {
    fontSize: 14,
    color: "#D4AF37",
    fontWeight: "600"
  },
  limitHint: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    fontStyle: "italic"
  },
  volumeSection: {
    marginTop: 8,
    marginBottom: 10,
    width: "100%"
  },
  volumeTitle: {
    fontSize: 16,
    color: "#D4AF37",
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center"
  },

  chartButtonsClose: {
    marginTop: 20,
    alignItems: "center"
  },
  buttonClose: {
    backgroundColor: "#D4AF37",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: "center"
  },
  closeb: {
    color: "#0A0A0F",
    fontSize: 14,
    fontWeight: "600"
  }
})
