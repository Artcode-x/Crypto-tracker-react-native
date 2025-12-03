import { StyleSheet, Dimensions, Platform } from "react-native"

const { width } = Dimensions.get("window")
const CARD_WIDTH = (width - 32) / 2

export const styles = StyleSheet.create({
  premiumContainer: {
    flex: 1,
    backgroundColor: "#0A0A0F"
  },
  premiumHeader: {
    // paddingTop: Platform.OS === "ios" ? 50 : 30,
    paddingTop: Platform.OS === "ios" ? 50 : 25,
    paddingHorizontal: 16,
    paddingBottom: 12
  },
  headerGradient: {
    flexDirection: "row",
    alignItems: "center",
    // padding: 12,
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
    //  fontSize: 20,
    fontSize: 15,
    fontWeight: "700",
    color: "#D4AF37"
  },
  headerSubtitle: {
    // fontSize: 11,
    fontSize: 9.5,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 2
  },
  statsPanel: {
    paddingHorizontal: 16,
    marginBottom: 12
  },
  statsGradient: {
    borderRadius: 12,
    // padding: 12,
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
    // fontSize: 16,
    fontSize: 13,
    fontWeight: "700",
    color: "#FFF",
    marginTop: 4
  },
  statLabelCompact: {
    // fontSize: 10,
    fontSize: 9,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 2
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(212, 175, 55, 0.2)"
  },
  premiumList: {
    paddingHorizontal: 8,
    paddingBottom: 80
  },
  premiumCoinCard: {
    borderRadius: 14,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 5
      },
      android: {
        elevation: 2
      }
    })
  },
  cardGradient: {
    // padding: 14,
    padding: 10,
    position: "relative",
    minHeight: 140
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 12
    marginBottom: 8
  },
  rankContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  rankText: {
    fontSize: 11,
    color: "#D4AF37",
    fontWeight: "700",
    backgroundColor: "rgba(212, 175, 55, 0.15)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)"
  },
  crownIcon: {
    marginLeft: 4
  },
  coinContent: {
    // marginBottom: 12
    marginBottom: 7
  },
  coinHeader: {
    // marginBottom: 8
    marginBottom: 2
  },
  coinName: {
    // fontSize: 15,
    fontSize: 13,
    fontWeight: "600",
    color: "#FFF",
    marginBottom: 2
  },
  coinSymbol: {
    // fontSize: 11,
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "500"
  },
  coinPrice: {
    // fontSize: 18,
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8
  },
  changeRow: {
    alignItems: "flex-start"
  },
  changeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  changeText: {
    fontSize: 9,
    fontWeight: "700",
    marginLeft: 4
  },
  deleteButton: {
    marginTop: "auto"
  },
  deleteButtonGradient: {
    paddingHorizontal: 12,
    // paddingVertical: 6,
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  deleteButtonText: {
    // fontSize: 11,
    fontSize: 9,
    color: "#FFF",
    marginLeft: 6,
    fontWeight: "600"
  },
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
  }
})
