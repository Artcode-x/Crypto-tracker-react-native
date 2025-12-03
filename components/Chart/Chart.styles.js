import { Dimensions, Platform, StyleSheet } from "react-native"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"

const { width, height } = Dimensions.get("window")

export const styles = StyleSheet.create({
  modalBlurContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.85)", // Более темный фон для лучшего контраста
    justifyContent: "center",
    alignItems: "center"
  },
  modalContainer: {
    width: width * 0.92,
    maxWidth: 420,
    height: height * 0.85,
    borderRadius: 25,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20
  },
  modalContent: {
    flex: 1,
    paddingTop: 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 20
  },
  coinHeader: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  coinImageContainer: {
    position: "relative",
    marginRight: 12
  },
  coinImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "rgba(212, 175, 55, 0.3)",
    zIndex: 2
  },
  coinImageGlow: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(212, 175, 55, 0.15)",
    top: -3,
    left: -3,
    zIndex: 1
  },
  coinTitleContainer: {
    flex: 1
  },
  coinName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.3
  },
  coinSymbol: {
    fontSize: 13,
    fontWeight: "500",
    color: "#D4AF37",
    marginTop: 2
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(212, 175, 55, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)"
  },
  mainScroll: {
    flex: 1
  },
  mainScrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30
  },
  priceSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },
  currentPrice: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF"
  },
  priceChangeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12
  },
  priceChangeText: {
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 4
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15
  },
  statCard: {
    width: "50%",
    marginBottom: 12
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#A0AEC0",
    marginLeft: 5,
    textTransform: "uppercase",
    letterSpacing: 0.5
  },
  statValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF"
  },
  trendIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)"
  },
  trendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8
  },
  trendText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
    marginRight: 8,
    flex: 1
  },
  trendPercentage: {
    fontSize: 12,
    fontWeight: "700"
  },
  timePeriodsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    gap: 8
  },
  timePeriodButton: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
    alignItems: "center"
  },
  timePeriodButtonActive: {
    backgroundColor: "rgba(212, 175, 55, 0.15)",
    borderColor: "rgba(212, 175, 55, 0.5)"
  },
  timePeriodText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#A0AEC0"
  },
  timePeriodTextActive: {
    color: "#D4AF37",
    fontWeight: "700"
  },
  chartSection: {
    marginBottom: 20
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF"
  },
  themeToggle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)"
  },
  themeToggleGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  chartLoader: {
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.1)"
  },
  loadingText: {
    fontSize: 13,
    color: "#D4AF37",
    fontWeight: "500",
    marginTop: 8
  },
  chartWrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 16,
    padding: Platform.OS === "android" ? 2 : 5,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.1)",
    minHeight: 220,
    justifyContent: "center",
    alignItems: "center"
  },
  additionalSection: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 12
  },
  additionalGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4
  },
  additionalCard: {
    width: "50%",
    paddingHorizontal: 4,
    marginBottom: 12
  },
  additionalCardGradient: {
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)"
  },
  additionalIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },
  additionalLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#A0AEC0",
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5
  },
  additionalValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF"
  },
  marketDataSection: {
    marginBottom: 10
  },
  marketDataGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4
  },
  marketDataCard: {
    width: "50%",
    paddingHorizontal: 4,
    marginBottom: 12
  },
  marketDataLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#A0AEC0",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5
  },
  marketDataValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF"
  }
})
