import { Platform, StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

export const styles = StyleSheet.create({
  premiumHeader: {
    paddingTop: Platform.OS === "ios" ? 9 : 8,
    paddingHorizontal: 12,
    paddingBottom: 6
  },

  headerGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: Platform.OS === "ios" ? 10 : 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
    backgroundColor: "rgba(26, 26, 26, 0.8)"
  },

  headerTextContainer: {
    flex: 1,
    marginLeft: 10
  },

  headerTitle: {
    fontSize: Platform.OS === "ios" ? RFValue(15) : RFValue(14),
    fontWeight: "700",
    color: "#D4AF37"
  },

  headerSubtitle: {
    fontSize: Platform.OS === "ios" ? RFValue(8.5) : RFValue(8.5),
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 2
  },

  headerLeftContainer: {
    flex: 1,
    marginLeft: 10
  },

  headerRightContainer: {
    alignItems: "flex-end",
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },

  portfolioLabel: {
    fontSize: Platform.OS === "android" ? RFValue(12) : RFValue(10),
    color: "rgba(255, 255, 255, 0.6)"
    // marginBottom: 2
  },

  portfolioValue: {
    fontSize: RFValue(12),
    fontWeight: "700",
    color: "#D4AF37"
  },

  refreshButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: "rgba(212, 175, 55, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)"
  },

  refreshButtonDisabled: {
    opacity: 0.5
  }
})
