import { Platform, StyleSheet, Dimensions } from "react-native"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"

const { width: SCREEN_WIDTH } = Dimensions.get("window")
const TAB_BAR_HEIGHT = 60 // Высота таб-бара
const BOTTOM_PADDING = TAB_BAR_HEIGHT + 20 // Дополнительный отступ для безопасности

export const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#0A0A0F"
  },

  container: {
    flex: 1
  },

  scrollContent: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: BOTTOM_PADDING
  },

  bottomSpacer: {
    height: 20,
    width: "100%"
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
    padding: Platform.OS === "android" ? 12 : 16 // Исправлено с 2/4 на 12/16
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
  },

  // ФУТЕР
  footer: {
    padding: 12,
    backgroundColor: "rgba(26, 26, 26, 0.8)",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.1)"
  },

  footerText: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: RFValue(10),
    textAlign: "center",
    lineHeight: 16
  },

  // ========== СТИЛИ ДЛЯ ПРЕМИАЛЬНОЙ ДИАГРАММЫ С ТЕКСТАМИ НА СЕГМЕНТАХ ==========
  premiumChartSection: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 0,
    position: "relative"
  },

  // СТИЛИ ДЛЯ ОБЪЕДИНЕННОЙ ЛЕГЕНДЫ
  combinedLegendContainer: {
    marginTop: -10,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)"
  },

  combinedLegendTitle: {
    color: "#FFFFFF",
    fontSize: RFValue(14),
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 215, 0, 0.2)"
  },

  // Стили для элементов легенды
  legendItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)"
  },

  legendLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },

  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)"
  },

  legendText: {
    flex: 1
  },

  legendSymbol: {
    color: "#FFFFFF",
    fontSize: RFValue(13),
    fontWeight: "600"
  },

  legendName: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: RFValue(11),
    marginTop: 2
  },

  legendRight: {
    alignItems: "flex-end"
  },

  legendAllocation: {
    color: "#FFD700",
    fontSize: RFValue(14),
    fontWeight: "700",
    marginBottom: 2
  },

  legendChange: {
    fontSize: RFValue(11),
    fontWeight: "600"
  },

  // Стили для маленьких аллокаций внутри легенды
  smallAllocationsSection: {
    marginTop: 0,
    marginBottom: 16,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.15)"
  },

  smallAllocationsHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "rgba(255, 215, 0, 0.08)"
  },

  smallAllocationsTitle: {
    color: "#FFD700",
    fontSize: RFValue(12),
    fontWeight: "600",
    marginLeft: 8,
    flex: 1
  },

  smallAllocationsBadge: {
    backgroundColor: "rgba(255, 215, 0, 0.2)",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: "center"
  },

  smallAllocationsBadgeText: {
    color: "#FFD700",
    fontSize: RFValue(10),
    fontWeight: "700"
  },

  smallAllocationsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
    padding: 12,
    paddingTop: 8
  },

  smallAllocationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    width: "48%",
    marginBottom: 8
  },

  smallAllocationColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.3)"
  },

  smallAllocationSymbol: {
    color: "#FFFFFF",
    fontSize: RFValue(10),
    fontWeight: "600",
    flex: 1,
    marginRight: 4
  },

  smallAllocationPercent: {
    color: "#FFD700",
    fontSize: RFValue(9),
    fontWeight: "700"
  },

  smallAllocationsHint: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: RFValue(9),
    textAlign: "center",
    padding: 8,
    fontStyle: "italic",
    backgroundColor: "rgba(0, 0, 0, 0.1)"
  },

  emptyLegend: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    marginTop: 10
  },

  emptyLegendText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: RFValue(12),
    textAlign: "center"
  }
})
