import { StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
export const styles = StyleSheet.create({
  recommendationCard: {
    backgroundColor: "rgba(212, 175, 55, 0.1)",
    borderRadius: 16,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
    overflow: "hidden",
    minHeight: 160
  },

  recommendationHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "rgba(212, 175, 55, 0.1)"
  },

  recommendationTitle: {
    color: "#FFD700",
    fontSize: RFValue(16),
    fontWeight: "600",
    marginLeft: 12
  },

  recommendationContent: {
    padding: 16
  },

  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(212, 175, 55, 0.1)"
  },

  tipText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: RFValue(12),
    flex: 1,
    marginLeft: 12,
    lineHeight: 18
  }
})
