import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40
  },

  emptyStateGradient: {
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
    width: "100%",
    backgroundColor: "rgba(26, 26, 26, 0.8)"
  },

  emptyTitle: {
    fontSize: 18,
    color: "#D4AF37",
    fontWeight: "600",
    marginTop: 16,
    textAlign: "center"
  },

  emptySubtitle: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.5)",
    textAlign: "center",
    marginTop: 6,
    lineHeight: 18
  },
  notificationPermissionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000"
  }
})
