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
