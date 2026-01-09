import { Platform, StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

export const styles = StyleSheet.create({
  statsPanel: {
    paddingHorizontal: 12,
    marginBottom: 3
  },

  statsGradient: {
    borderRadius: 8,
    padding: Platform.OS === "android" ? 3 : 5,
    borderWidth: 0.8,
    borderColor: "rgba(212, 175, 55, 0.15)",
    backgroundColor: "rgba(26, 26, 26, 0.9)",
    ...Platform.select({
      ios: {
        shadowColor: "#D4AF37",
        shadowOffset: { width: 0, height: 0.5 },
        shadowOpacity: 0.08,
        shadowRadius: 2
      },
      android: {
        elevation: 1
      }
    })
  },

  compactStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 28
  },

  statItemCompact: {
    alignItems: "center",
    flex: 1,
    gap: 2,
    paddingVertical: 2
  },

  statNumberCompact: {
    paddingTop: 4,
    fontSize: Platform.OS === "android" ? RFValue(13) : RFValue(11),
    fontWeight: "500",
    color: "#FFF",
    marginTop: 0,
    lineHeight: 12
  },

  statLabelCompact: {
    fontSize: Platform.OS === "android" ? RFValue(8) : RFValue(8),
    color: "rgba(255, 255, 255, 0.7)",
    paddingTop: 2,
    marginTop: 0,
    lineHeight: 8,
    letterSpacing: -0.3
  },

  statDivider: {
    width: 1.2,
    height: 24,
    backgroundColor: "rgba(212, 175, 55, 0.15)"
  },

  alertBadgeContainer: {
    position: "relative",
    alignItems: "center"
  },

  unreadBadge: {
    position: "absolute",
    top: -7,
    right: -3,
    backgroundColor: "#FF3B30",
    borderRadius: 4,
    minWidth: 8,
    height: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#FFF"
  },

  unreadBadgeText: {
    fontSize: 4,
    color: "#FFF",
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 6
  }
})
