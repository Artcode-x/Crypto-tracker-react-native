import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  chartContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 8,
    paddingLeft: 2,
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3
  },
  chartStyle: {
    borderRadius: 12
  },
  noDataContainer: {
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 16,
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  noDataText: {
    fontSize: 14,
    color: "#4A5568",
    fontWeight: "500"
  },

  smallNumberIndicator: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(212, 175, 55, 0.1)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)"
  },
  smallNumberText: {
    fontSize: 10,
    color: "#B7791F",
    fontWeight: "600"
  }
})
