import { Platform, StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  premiumHeader: {
    paddingTop: Platform.OS === "ios" ? 20 : 15,
    paddingHorizontal: 16,
    paddingBottom: 12
  },

  headerGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
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
    fontSize: Platform.OS === "ios" ? 15 : 14,
    fontWeight: "700",
    color: "#D4AF37"
  },

  headerSubtitle: {
    fontSize: Platform.OS === "ios" ? 9.5 : 9,
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
    gap: 8
  },

  portfolioLabel: {
    fontSize: 8,
    color: "rgba(255, 255, 255, 0.5)",
    marginBottom: 2
  },

  portfolioValue: {
    fontSize: 12,
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
