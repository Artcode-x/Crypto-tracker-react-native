import { StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
export const styles = StyleSheet.create({
  // Контейнер
  combinedLegendContainer: {
    marginTop: -10,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)"
  },

  combinedLegendTitle: {
    color: "#FFFFFF",
    fontSize: RFValue(14),
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 215, 0, 0.2)"
  },

  // Основные элементы
  legendItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)"
  },

  legendLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },

  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)"
  },

  legendText: {
    flex: 1
  },

  legendSymbol: {
    color: "#FFFFFF",
    fontSize: RFValue(13),
    fontWeight: "600"
  },

  legendName: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: RFValue(11),
    marginTop: 2
  },

  legendRight: {
    alignItems: "flex-end"
  },

  legendAllocation: {
    color: "#FFD700",
    fontSize: RFValue(14),
    fontWeight: "700",
    marginBottom: 2
  },

  legendChange: {
    fontSize: RFValue(11),
    fontWeight: "600"
  },

  // Секция маленьких аллокаций
  smallAllocationsSection: {
    marginTop: 0,
    marginBottom: 16,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.15)"
  },

  smallAllocationsHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "rgba(255, 215, 0, 0.08)"
  },

  smallAllocationsTitle: {
    color: "#FFD700",
    fontSize: RFValue(12),
    fontWeight: "600",
    marginLeft: 8,
    flex: 1
  },

  smallAllocationsBadge: {
    backgroundColor: "rgba(255, 215, 0, 0.2)",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: "center"
  },

  smallAllocationsBadgeText: {
    color: "#FFD700",
    fontSize: RFValue(10),
    fontWeight: "700"
  },

  smallAllocationsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
    padding: 12,
    paddingTop: 8
  },

  smallAllocationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    width: "48%",
    marginBottom: 8
  },

  smallAllocationColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.3)"
  },

  smallAllocationSymbol: {
    color: "#FFFFFF",
    fontSize: RFValue(10),
    fontWeight: "600",
    flex: 1,
    marginRight: 4
  },

  smallAllocationPercent: {
    color: "#FFD700",
    fontSize: RFValue(9),
    fontWeight: "700"
  },

  smallAllocationsHint: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: RFValue(9),
    textAlign: "center",
    padding: 8,
    fontStyle: "italic",
    backgroundColor: "rgba(0, 0, 0, 0.1)"
  }
})
