import { StyleSheet, Platform } from "react-native"
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
  overviewGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  overviewItem: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    marginHorizontal: 4
  },
  overviewLabel: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: RFValue(10),
    marginTop: 6,
    marginBottom: 4
  },
  overviewValue: {
    color: "#FFFFFF",
    fontSize: RFValue(14),
    fontWeight: "600",
    marginBottom: 2
  },
  overviewChange: {
    fontSize: RFValue(12),
    fontWeight: "600"
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 16
  },
  statItem: {
    flex: 1,
    alignItems: "center"
  },
  statNumber: {
    color: "#FFD700",
    fontSize: RFValue(20),
    fontWeight: "700",
    marginBottom: 4
  },
  statLabel: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: RFValue(10)
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(255, 255, 255, 0.1)"
  }
})
