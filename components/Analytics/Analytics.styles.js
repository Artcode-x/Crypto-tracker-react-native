import { Platform, StyleSheet } from "react-native"
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

  timeframeButtonDisabled: {
    opacity: 0.5
  },

  timeframeText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: RFValue(11),
    fontWeight: "500"
  },

  timeframeTextActive: {
    color: "#FFD700"
  },

  timeframeTextDisabled: {
    color: "rgba(255, 255, 255, 0.3)"
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

  portfolioValueText: {
    color: "#FFFFFF",
    fontSize: RFValue(20),
    fontWeight: "700",
    letterSpacing: 0.5
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

  // Доп элементы
  timeframeDetails: {
    alignItems: "center",
    marginBottom: 12,
    padding: 5,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 10
  },

  timeframeDetailsText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: RFValue(11),
    textAlign: "center",
    marginBottom: 2
  },

  timeframeSource: {
    color: "rgba(255, 215, 0, 0.6)",
    fontSize: RFValue(8),
    fontStyle: "italic",
    textAlign: "center"
  },

  simulationIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8
  },

  simulationText: {
    color: "#FFD700",
    fontSize: RFValue(10),
    marginLeft: 4
  },

  calculatingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(212, 175, 55, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8
  },

  calculatingText: {
    color: "#FFD700",
    fontSize: RFValue(10),
    marginLeft: 6
  },

  dataWarning: {
    color: "rgba(255, 215, 0, 0.6)",
    fontSize: RFValue(10),
    textAlign: "center",
    marginTop: 12,
    fontStyle: "italic"
  },

  // Секции аккордиона
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
    padding: Platform.OS === "android" ? 12 : 16 // Меньше паддинг на Android
  },

  // Быстрый обзор
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

  // ========== ОПТИМИЗИРОВАННЫЙ БЛОК РАСПРЕДЕЛЕНИЯ АКТИВОВ ==========
  allocationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Platform.OS === "android" ? 12 : 14,
    paddingBottom: Platform.OS === "android" ? 12 : 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
    minHeight: Platform.OS === "android" ? 44 : 48 // Фиксированная минимальная высота
  },

  // ЛЕВАЯ ЧАСТЬ: Название крипты и номер
  assetInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: Platform.OS === "android" ? 0.4 : 0.45, // Меньше места на Android
    minWidth: 0,
    flexShrink: 1
  },

  assetRank: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: Platform.OS === "android" ? RFValue(10) : RFValue(11),
    width: Platform.OS === "android" ? 18 : 22,
    textAlign: "center",
    marginRight: Platform.OS === "android" ? 2 : 4
  },

  assetNameContainer: {
    flex: 1,
    minWidth: 0,
    flexShrink: 1
  },

  assetName: {
    color: "#FFFFFF",
    fontSize: Platform.OS === "android" ? RFValue(10) : RFValue(11),
    fontWeight: "500",
    flexShrink: 1,
    includeFontPadding: false, // Убирает лишние отступы на Android
    textAlignVertical: "center"
  },

  assetSymbol: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: Platform.OS === "android" ? RFValue(8) : RFValue(9),
    marginTop: Platform.OS === "android" ? 0 : 1,
    includeFontPadding: false,
    textAlignVertical: "center"
  },

  // Центр: Шкала с процентом
  allocationInfo: {
    flex: Platform.OS === "android" ? 0.35 : 0.4, // Больше места для шкалы
    marginHorizontal: Platform.OS === "android" ? 4 : 6,
    minWidth: 0,
    alignItems: "center"
  },

  allocationBarContainer: {
    width: "100%",
    height: Platform.OS === "android" ? 4 : 5,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: Platform.OS === "android" ? 2 : 2.5,
    overflow: "hidden",
    marginBottom: Platform.OS === "android" ? 2 : 3
  },

  allocationBar: {
    height: "100%",
    borderRadius: Platform.OS === "android" ? 2 : 2.5
  },

  allocationPercent: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: Platform.OS === "android" ? RFValue(8) : RFValue(9),
    textAlign: "center",
    includeFontPadding: false
  },

  // ПРАВАЯ ЧАСТЬ: Цена и изменение
  assetMetrics: {
    flex: Platform.OS === "android" ? 0.25 : 0.3,
    alignItems: "flex-end",
    minWidth: 0,
    flexShrink: 1
  },

  assetValue: {
    color: "#FFFFFF",
    fontSize: Platform.OS === "android" ? RFValue(10) : RFValue(11),
    fontWeight: "600",
    marginBottom: Platform.OS === "android" ? 1 : 2,
    textAlign: "right",
    flexShrink: 1,
    includeFontPadding: false,
    textAlignVertical: "center"
  },

  assetChange: {
    fontSize: Platform.OS === "android" ? RFValue(8) : RFValue(9),
    fontWeight: "600",
    textAlign: "right",
    includeFontPadding: false,
    textAlignVertical: "center"
  },

  dataIndicator: {
    marginLeft: Platform.OS === "android" ? 2 : 4
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

  riskDescription: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: RFValue(10),
    marginTop: 8,
    textAlign: "center",
    fontStyle: "italic"
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
    // marginBottom: 35,
    marginBottom: 66,
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
    // marginBottom: 12,
    // paddingBottom: 12,
    marginBottom: 6,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(212, 175, 55, 0.1)",

    alignItems: "center"
  },

  tipText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: RFValue(12),
    flex: 1,
    marginLeft: 12,
    lineHeight: 18
  },

  // ФУТЕР
  footer: {
    padding: 12,
    backgroundColor: "rgba(26, 26, 26, 0.8)",
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.1)"
  },

  footerText: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: RFValue(10),
    textAlign: "center",
    lineHeight: 16
  }
})
