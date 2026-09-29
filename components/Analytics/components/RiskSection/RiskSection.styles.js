import { StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

export const styles = StyleSheet.create({
  sectionCard: {
    backgroundColor: "rgba(26, 26, 26, 0.8)",
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    overflow: "hidden"
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "rgba(40, 40, 40, 0.5)"
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: RFValue(16),
    fontWeight: "600",
    flex: 1,
    marginLeft: 12
  },
  sectionContent: {
    padding: 16
  },
  riskMetrics: {
    gap: 16
  },
  riskItem: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 12
  },
  riskHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },
  riskLabel: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: RFValue(12),
    fontWeight: "500",
    marginLeft: 8,
    flex: 1
  },
  riskValueContainer: {
    alignItems: "center"
  },
  riskValue: {
    color: "#FFFFFF",
    fontSize: RFValue(16),
    fontWeight: "600",
    marginBottom: 8
  },
  riskIndicator: {
    width: "100%",
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 2,
    overflow: "hidden"
  },
  riskLevel: {
    height: "100%",
    borderRadius: 2
  },
  riskDescription: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: RFValue(10),
    marginTop: 8,
    textAlign: "center",
    fontStyle: "italic"
  },
  riskAdvice: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: RFValue(10),
    marginTop: 8,
    textAlign: "center"
  }
})
