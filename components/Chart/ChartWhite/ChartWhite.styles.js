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
    padding: 12,
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
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "wheat"
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
  rangeIndicator: {
    marginTop: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    width: "90%"
  },
  rangeBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 2
  },
  rangeBadgeSubtext: {
    fontSize: 9,
    color: "#4A5568",
    fontWeight: "500",
    textAlign: "center"
  }
})
