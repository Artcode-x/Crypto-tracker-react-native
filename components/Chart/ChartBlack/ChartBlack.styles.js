import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 0
  },
  // Ключевой стиль: overflow: hidden гарантирует обрезание
  chartOuterContainer: {
    width: "100%",
    overflow: "hidden", // Это гарантирует, что ничего не выедет
    backgroundColor: "#1A1F2E",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    position: "relative"
  },
  noDataContainer: {
    height: 200,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)"
  },
  noDataText: {
    fontSize: 14,
    color: "#CBD5E0",
    fontWeight: "500"
  },
  smallNumberIndicator: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(212, 175, 55, 0.1)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
    alignSelf: "center"
  },
  smallNumberText: {
    fontSize: 10,
    color: "#D4AF37",
    fontWeight: "600"
  }
})
