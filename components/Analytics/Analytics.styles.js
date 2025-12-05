import { StyleSheet } from "react-native"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0A0A0F",
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 12
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: "#0A0A0F",
    justifyContent: "center",
    alignItems: "center"
  },

  loadingText: {
    color: "#FFD700",
    marginTop: 20,
    fontSize: RFValue(14),
    opacity: 0.8
  },

  emptyContainer: {
    flex: 1,
    backgroundColor: "#0A0A0F",
    justifyContent: "center",
    alignItems: "center",
    padding: 40
  },

  emptyTitle: {
    color: "#FFD700",
    fontSize: RFValue(20),
    fontWeight: "600",
    marginTop: 20
  },

  emptySubtitle: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: RFValue(14),
    textAlign: "center",
    marginTop: 10,
    lineHeight: 20
  },

  // Шапка
  headerCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)"
  },

  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },

  headerTitle: {
    color: "#FFD700",
    fontSize: RFValue(18),
    fontWeight: "600",
    flex: 1,
    marginLeft: 12
  },

  timeframeSelector: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    padding: 2
  },

  timeframeButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6
  },

  timeframeButtonActive: {
    backgroundColor: "rgba(212, 175, 55, 0.3)"
  },

  timeframeText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: RFValue(11),
    fontWeight: "500"
  },

  timeframeTextActive: {
    color: "#FFD700"
  },

  mainMetrics: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },

  metricGroup: {
    flex: 1
  },

  metricLabel: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: RFValue(12),
    marginBottom: 4
  },

  metricValue: {
    color: "#FFFFFF",
    fontSize: RFValue(28),
    fontWeight: "700"
  },

  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2
  },

  metricChange: {
    fontSize: RFValue(18),
    fontWeight: "600",
    marginLeft: 6
  },

  metricSubtext: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: RFValue(12)
  },

  // Секции
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

  // Обзор
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
  },

  // Распределение активов
  allocationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)"
  },

  assetInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 2
  },

  assetRank: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: RFValue(12),
    width: 24
  },

  assetNameContainer: {
    marginLeft: 8
  },

  assetName: {
    color: "#FFFFFF",
    fontSize: RFValue(12),
    fontWeight: "500",
    maxWidth: 80
  },

  assetSymbol: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: RFValue(10)
  },

  allocationInfo: {
    flex: 3,
    marginHorizontal: 8
  },

  allocationBarContainer: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 4
  },

  allocationBar: {
    height: "100%",
    borderRadius: 3
  },

  allocationPercent: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: RFValue(10),
    textAlign: "center"
  },

  assetMetrics: {
    flex: 2,
    alignItems: "flex-end"
  },

  assetValue: {
    color: "#FFFFFF",
    fontSize: RFValue(12),
    fontWeight: "600",
    marginBottom: 2
  },

  assetChange: {
    fontSize: RFValue(10),
    fontWeight: "600"
  },

  // Анализ риска
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

  riskAdvice: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: RFValue(10),
    marginTop: 8,
    textAlign: "center"
  },

  // Рекомендации
  recommendationCard: {
    backgroundColor: "rgba(212, 175, 55, 0.1)",
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
    overflow: "hidden"
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
    alignItems: "flex-start",
    marginBottom: 12,
    paddingBottom: 12,
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
