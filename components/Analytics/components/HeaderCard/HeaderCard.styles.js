import { StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

export const styles = StyleSheet.create({
  // Шапка
  headerCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)"
  },

  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },

  headerTitle: {
    color: "#FFD700",
    fontSize: RFValue(18),
    fontWeight: "600",
    flex: 1,
    marginLeft: 12
  },

  timeframeSelector: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    padding: 2
  },

  timeframeButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6
  },

  timeframeButtonActive: {
    backgroundColor: "rgba(212, 175, 55, 0.3)"
  },

  timeframeButtonDisabled: {
    opacity: 0.5
  },

  timeframeText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: RFValue(11),
    fontWeight: "500"
  },

  timeframeTextActive: {
    color: "#FFD700"
  },

  timeframeTextDisabled: {
    color: "rgba(255, 255, 255, 0.3)"
  },

  mainMetrics: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },

  metricGroup: {
    flex: 1
  },

  metricLabel: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: RFValue(12),
    marginBottom: 4
  },

  portfolioValueText: {
    color: "#FFFFFF",
    fontSize: RFValue(20),
    fontWeight: "700",
    letterSpacing: 0.5
  },

  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2
  },

  metricChange: {
    fontSize: RFValue(18),
    fontWeight: "600",
    marginLeft: 6
  },

  metricSubtext: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: RFValue(12)
  },

  // Доп элементы
  timeframeDetails: {
    alignItems: "center",
    marginBottom: 12,
    padding: 5,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 10
  },

  timeframeDetailsText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: RFValue(11),
    textAlign: "center",
    marginBottom: 2
  },

  timeframeSource: {
    color: "rgba(255, 215, 0, 0.6)",
    fontSize: RFValue(8),
    fontStyle: "italic",
    textAlign: "center"
  },

  simulationIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8
  },

  simulationText: {
    color: "#FFD700",
    fontSize: RFValue(10),
    marginLeft: 4
  },

  calculatingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(212, 175, 55, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8
  },

  calculatingText: {
    color: "#FFD700",
    fontSize: RFValue(10),
    marginLeft: 6
  },

  dataWarning: {
    color: "rgba(255, 215, 0, 0.6)",
    fontSize: RFValue(10),
    textAlign: "center",
    marginTop: 12,
    fontStyle: "italic"
  }
})
