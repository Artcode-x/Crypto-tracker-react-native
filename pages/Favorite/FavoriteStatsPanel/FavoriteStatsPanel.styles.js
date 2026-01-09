import { Platform, StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  statsPanel: {
    paddingHorizontal: 16,
    // marginBottom: 12
    marginBottom: 1
  },

  statsGradient: {
    borderRadius: 12,
    padding: 9,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.15)",
    backgroundColor: "rgba(26, 26, 26, 0.8)",
    ...Platform.select({
      ios: {
        shadowColor: "#D4AF37",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4
      },
      android: {
        elevation: 3
      }
    })
  },

  compactStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  statItemCompact: {
    alignItems: "center",
    flex: 1
  },

  statNumberCompact: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFF",
    marginTop: 4
  },

  statLabelCompact: {
    fontSize: 9,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 2
  },

  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(212, 175, 55, 0.2)"
  },
  alertBadgeContainer: {
    position: "relative",
    alignItems: "center"
  },

  unreadBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#FF3B30",
    borderRadius: 6,
    minWidth: 12,
    height: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFF"
  },

  unreadBadgeText: {
    fontSize: 6,
    color: "#FFF",
    fontWeight: "700",
    textAlign: "center"
  }
})
