import { Platform, StyleSheet } from "react-native"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"

const TAB_BAR_HEIGHT = 60 // Высота таб-бара из AppRoute
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
    marginBottom: 16
  },

  headerTitle: {
    color: "#FFD700",
    fontSize: RFValue(18),
    fontWeight: "600",
    flex: 1,
    marginLeft: 12
  },

  lastUpdated: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8
  },

  lastUpdatedText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: RFValue(10),
    marginLeft: 6
  },

  overviewCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 12
  },

  overviewRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },

  overviewLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: RFValue(11),
    marginLeft: 8,
    marginRight: 12,
    flex: 1
  },

  overviewValue: {
    color: "#FFFFFF",
    fontSize: RFValue(11),
    fontWeight: "600"
  },

  // Информационная карточка
  infoCard: {
    backgroundColor: "rgba(33, 150, 243, 0.1)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(33, 150, 243, 0.2)"
  },

  infoTitle: {
    color: "#2196F3",
    fontSize: RFValue(14),
    fontWeight: "600",
    marginBottom: 8
  },

  infoText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: RFValue(12),
    lineHeight: 18,
    marginBottom: 12
  },

  warningBox: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    borderRadius: 8,
    padding: 10,
    alignItems: "flex-start"
  },

  warningText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: RFValue(11),
    flex: 1,
    marginLeft: 10,
    lineHeight: 16
  },

  // Секции (аккордеон)
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
    padding: Platform.OS === "android" ? 12 : 16
  },

  // Категории данных
  dataCategory: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12
  },

  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },

  categoryTitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: RFValue(13),
    fontWeight: "600",
    marginLeft: 8
  },

  categoryText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: RFValue(11),
    lineHeight: 18,
    marginBottom: 8
  },

  dataNote: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(33, 150, 243, 0.1)",
    padding: 6,
    borderRadius: 6
  },

  noteText: {
    color: "#2196F3",
    fontSize: RFValue(9),
    marginLeft: 6
  },

  externalLink: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    padding: 6,
    backgroundColor: "rgba(33, 150, 243, 0.1)",
    borderRadius: 6,
    alignSelf: "flex-start"
  },

  linkText: {
    color: "#2196F3",
    fontSize: RFValue(10),
    marginLeft: 6
  },

  // Использование данных
  usageItem: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 12
  },

  usageIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12
  },

  usageContent: {
    flex: 1
  },

  usageTitle: {
    color: "#FFFFFF",
    fontSize: RFValue(13),
    fontWeight: "600",
    marginBottom: 4
  },

  usageText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: RFValue(11),
    lineHeight: 16
  },

  // Метрики безопасности
  securityMetric: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12
  },

  metricRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6
  },

  metricLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: RFValue(11),
    marginLeft: 8,
    marginRight: 12,
    flex: 1
  },

  metricValue: {
    color: "#FFFFFF",
    fontSize: RFValue(11),
    fontWeight: "600"
  },

  metricDescription: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: RFValue(10),
    lineHeight: 15,
    fontStyle: "italic"
  },

  warningContent: {
    flex: 1,
    marginLeft: 10
  },

  warningTitle: {
    color: "#FF5252",
    fontSize: RFValue(12),
    fontWeight: "600",
    marginBottom: 6
  },

  // Права пользователя
  rightsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16
  },

  rightItem: {
    width: "48%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginBottom: 12
  },

  rightTitle: {
    color: "#FFFFFF",
    fontSize: RFValue(11),
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 8
  },

  rightText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: RFValue(9),
    textAlign: "center",
    lineHeight: 14
  },

  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8
  },

  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(33, 150, 243, 0.8)",
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 4
  },

  clearButton: {
    backgroundColor: "rgba(255, 82, 82, 0.8)"
  },

  actionButtonText: {
    color: "#FFFFFF",
    fontSize: RFValue(12),
    fontWeight: "600",
    marginLeft: 8
  },

  footerCard: {
    backgroundColor: "rgba(26, 26, 26, 0.8)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)"
  },

  footerTitle: {
    color: "#FFD700",
    fontSize: RFValue(14),
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center"
  },

  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8
  },

  contactText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: RFValue(11),
    flex: 1,
    marginLeft: 10
  },

  versionInfo: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)"
  },

  versionText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: RFValue(10),
    textAlign: "center",
    marginBottom: 8
  },

  disclaimer: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: RFValue(9),
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 14
  },

  // Дополнительные стили для улучшенной версии
  highlight: {
    color: "#FFD700",
    fontWeight: "600"
  },

  bold: {
    fontWeight: "600",
    color: "#FFFFFF"
  },

  noteBox: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    borderRadius: 8,
    padding: 10,
    alignItems: "flex-start",
    marginTop: 12
  },

  sectionSubtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: RFValue(12),
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 8,
    paddingLeft: 4
  },

  childrenWarning: {
    backgroundColor: "rgba(244, 67, 54, 0.1)",
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#F44336"
  },

  updateMethods: {
    marginVertical: 12,
    padding: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12
  },

  updateMethod: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingVertical: 6
  },

  updateMethodText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: RFValue(11),
    marginLeft: 10,
    flex: 1
  },

  contactLink: {
    color: "#2196F3",
    fontSize: RFValue(12),
    marginLeft: 12,
    textDecorationLine: "underline"
  },

  contactDescription: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: RFValue(11),
    lineHeight: 16,
    marginVertical: 12,
    textAlign: "center"
  },

  responseTime: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
    padding: 10,
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    borderRadius: 8
  },

  responseTimeText: {
    color: "#4CAF50",
    fontSize: RFValue(10),
    marginLeft: 8
  },

  printButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)"
  },

  printButtonText: {
    color: "#FFFFFF",
    fontSize: RFValue(12),
    fontWeight: "600",
    marginLeft: 8
  },

  stepList: {
    marginVertical: 12,
    padding: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12
  },

  stepItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },

  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFD700",
    color: "#000000",
    textAlign: "center",
    lineHeight: 24,
    fontSize: RFValue(12),
    fontWeight: "bold",
    marginRight: 12
  },

  stepText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: RFValue(11),
    flex: 1,
    lineHeight: 16
  },

  dataWarning: {
    color: "#FFD700",
    fontSize: RFValue(9),
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 8,
    padding: 6,
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    borderRadius: 6
  },

  simulationIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8
  },

  simulationText: {
    color: "#FFD700",
    fontSize: RFValue(9),
    marginLeft: 4,
    fontWeight: "500"
  },

  calculatingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(33, 150, 243, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8
  },

  calculatingText: {
    color: "#2196F3",
    fontSize: RFValue(9),
    marginLeft: 4
  },

  timeframeSelector: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 20,
    padding: 4,
    marginTop: 12
  },

  timeframeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginHorizontal: 2
  },

  timeframeButtonActive: {
    backgroundColor: "#FFD700"
  },

  timeframeButtonDisabled: {
    opacity: 0.5
  },

  timeframeText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: RFValue(10),
    fontWeight: "500"
  },

  timeframeTextActive: {
    color: "#000000",
    fontWeight: "600"
  },

  timeframeTextDisabled: {
    color: "rgba(255, 255, 255, 0.3)"
  },

  timeframeDetails: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16
  },

  timeframeDetailsText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: RFValue(10),
    textAlign: "center",
    marginBottom: 4
  },

  timeframeSource: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: RFValue(8),
    textAlign: "center",
    fontStyle: "italic"
  },

  mainMetrics: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8
  },

  metricGroup: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4
  },

  portfolioValueText: {
    color: "#FFFFFF",
    fontSize: RFValue(18),
    fontWeight: "bold",
    marginBottom: 4
  },

  metricSubtext: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: RFValue(8)
  },

  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4
  },

  metricChange: {
    fontSize: RFValue(14),
    fontWeight: "bold",
    marginLeft: 6
  },

  overviewGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12
  },

  overviewItem: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginHorizontal: 4
  },

  overviewValue: {
    color: "#FFFFFF",
    fontSize: RFValue(12),
    fontWeight: "bold",
    marginTop: 4,
    textAlign: "center"
  },

  overviewChange: {
    fontSize: RFValue(10),
    fontWeight: "600",
    marginTop: 4
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12
  },

  statItem: {
    alignItems: "center"
  },

  statNumber: {
    color: "#FFD700",
    fontSize: RFValue(16),
    fontWeight: "bold",
    marginBottom: 4
  },

  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)"
  },

  allocationRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 10,
    padding: 10,
    marginBottom: 8
  },

  assetInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 2
  },

  assetRank: {
    color: "#FFD700",
    fontSize: RFValue(10),
    fontWeight: "bold",
    marginRight: 8
  },

  assetNameContainer: {
    flex: 1
  },

  assetName: {
    color: "#FFFFFF",
    fontSize: RFValue(11),
    fontWeight: "500"
  },

  assetSymbol: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: RFValue(9)
  },

  dataIndicator: {
    marginLeft: 4
  },

  allocationInfo: {
    flex: 3,
    marginLeft: 8
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
    fontSize: RFValue(9),
    textAlign: "center"
  },

  assetMetrics: {
    flex: 2,
    alignItems: "flex-end"
  },

  assetValue: {
    color: "#FFFFFF",
    fontSize: RFValue(11),
    fontWeight: "600",
    marginBottom: 4
  },

  assetChange: {
    fontSize: RFValue(10),
    fontWeight: "500"
  },

  riskMetrics: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 12
  },

  riskItem: {
    marginBottom: 16
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
    marginLeft: 8
  },

  riskValueContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 8,
    padding: 10
  },

  riskValue: {
    color: "#FFFFFF",
    fontSize: RFValue(14),
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center"
  },

  riskIndicator: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 3,
    marginBottom: 8,
    overflow: "hidden"
  },

  riskLevel: {
    height: "100%",
    borderRadius: 3
  },

  riskDescription: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: RFValue(9),
    textAlign: "center"
  },

  riskAdvice: {
    color: "#FFD700",
    fontSize: RFValue(10),
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 4
  },

  recommendationCard: {
    backgroundColor: "rgba(26, 26, 26, 0.8)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.2)"
  },

  recommendationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12
  },

  recommendationTitle: {
    color: "#FFD700",
    fontSize: RFValue(14),
    fontWeight: "600",
    marginLeft: 10
  },

  recommendationContent: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 12
  },

  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10
  },

  tipText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: RFValue(11),
    flex: 1,
    marginLeft: 10,
    lineHeight: 16
  },

  footer: {
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12
  },

  footerText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: RFValue(9),
    lineHeight: 14,
    textAlign: "center"
  },

  scrollContainer: {
    flexGrow: 1
  },

  emailButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(33, 150, 243, 0.2)",
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "rgba(33, 150, 243, 0.5)"
  },

  emailButtonText: {
    color: "#2196F3",
    fontSize: RFValue(12),
    fontWeight: "600",
    marginLeft: 8
  },

  loadingContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center"
  },

  loadingText: {
    color: "#FFD700",
    fontSize: RFValue(12),
    marginTop: 12
  },

  notificationWarning: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 107, 107, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 8,
    alignSelf: "flex-start"
  },

  notificationWarningText: {
    color: "#FF6B6B",
    fontSize: RFValue(9),
    marginLeft: 4,
    fontWeight: "500"
  },

  // ===== НОВЫЕ СТИЛИ ДЛЯ Data Storage & Security =====

  // Сетка метрик безопасности
  securityMetricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 12
  },

  securityMetricCard: {
    width: "48%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)"
  },

  securityMetricIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    alignSelf: "center"
  },

  securityMetricTitle: {
    color: "#FFFFFF",
    fontSize: RFValue(12),
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 4
  },

  securityMetricValue: {
    color: "#FFD700",
    fontSize: RFValue(14),
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6
  },

  // Иконки статуса
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8
  },

  statusText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: RFValue(10)
  },

  statusGood: {
    backgroundColor: "#4CAF50"
  },

  statusWarning: {
    backgroundColor: "#FFD700"
  },

  statusCritical: {
    backgroundColor: "#FF5252"
  },

  // Список особенностей безопасности
  securityFeatureList: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12
  },

  securityFeatureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)"
  },

  securityFeatureItemLast: {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottomWidth: 0
  },

  featureIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(33, 150, 243, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },

  featureContent: {
    flex: 1
  },

  featureTitle: {
    color: "#FFFFFF",
    fontSize: RFValue(11),
    fontWeight: "600",
    marginBottom: 4
  },

  featureDescription: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: RFValue(10),
    lineHeight: 16
  },

  // Диаграмма хранения данных
  storageDiagram: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)"
  },

  diagramTitle: {
    color: "#FFD700",
    fontSize: RFValue(12),
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12
  },

  diagramContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 100,
    marginBottom: 12
  },

  diagramBar: {
    flex: 1,
    marginHorizontal: 4,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },

  diagramLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: RFValue(8),
    textAlign: "center",
    marginTop: 4
  },

  diagramLegend: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 8
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 6,
    marginBottom: 6
  },

  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 2,
    marginRight: 4
  },

  legendText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: RFValue(8)
  },

  // Информационные блоки о шифровании
  encryptionInfo: {
    backgroundColor: "rgba(33, 150, 243, 0.1)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#2196F3"
  },

  encryptionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },

  encryptionTitle: {
    color: "#2196F3",
    fontSize: RFValue(12),
    fontWeight: "600",
    marginLeft: 8
  },

  encryptionText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: RFValue(10),
    lineHeight: 16
  },

  // Список предупреждений безопасности
  securityWarnings: {
    backgroundColor: "rgba(244, 67, 54, 0.1)",
    borderRadius: 12,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#F44336"
  },

  warningHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },

  warningTitle: {
    color: "#F44336",
    fontSize: RFValue(12),
    fontWeight: "600",
    marginLeft: 8
  },

  warningList: {
    marginLeft: 8
  },

  warningListItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6
  },

  warningBullet: {
    color: "#F44336",
    fontSize: RFValue(10),
    marginRight: 6,
    lineHeight: 16
  },

  warningItemText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: RFValue(10),
    flex: 1,
    lineHeight: 16
  },

  // Рекомендации по безопасности
  securityRecommendations: {
    backgroundColor: "rgba(255, 193, 7, 0.1)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#FFC107"
  },

  recommendationsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },

  recommendationsTitle: {
    color: "#FFC107",
    fontSize: RFValue(12),
    fontWeight: "600",
    marginLeft: 8
  },

  recommendationsList: {
    marginLeft: 8
  },

  recommendationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8
  },

  recommendationIcon: {
    color: "#FFC107",
    marginRight: 8,
    marginTop: 2
  },

  recommendationText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: RFValue(10),
    flex: 1,
    lineHeight: 16
  },

  // Кнопки действий безопасности
  securityActionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16
  },

  securityActionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 4
  },

  backupButton: {
    backgroundColor: "rgba(76, 175, 80, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(76, 175, 80, 0.5)"
  },

  encryptButton: {
    backgroundColor: "rgba(33, 150, 243, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(33, 150, 243, 0.5)"
  },

  securityActionButtonText: {
    color: "#FFFFFF",
    fontSize: RFValue(10),
    fontWeight: "600",
    marginLeft: 6
  },

  // Статус безопасности
  securityStatus: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12
  },

  statusHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },

  statusTitle: {
    color: "#FFD700",
    fontSize: RFValue(12),
    fontWeight: "600",
    marginLeft: 8
  },

  statusLevel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12
  },

  levelIndicator: {
    height: 6,
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 3,
    overflow: "hidden"
  },

  levelFill: {
    height: "100%",
    borderRadius: 3
  },

  levelText: {
    color: "#FFD700",
    fontSize: RFValue(10),
    fontWeight: "bold",
    marginLeft: 8
  },

  // Загрузка данных безопасности
  securityLoading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12
  },

  // Таймер обновления
  updateTimer: {
    backgroundColor: "rgba(156, 39, 176, 0.1)",
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    alignItems: "center"
  },

  timerText: {
    color: "#9C27B0",
    fontSize: RFValue(9),
    textAlign: "center"
  },

  timerValue: {
    color: "#FFFFFF",
    fontSize: RFValue(14),
    fontWeight: "bold",
    marginTop: 4
  },

  // Готово к использованию
  readyStatus: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: "center"
  },

  readyText: {
    color: "#4CAF50",
    fontSize: RFValue(11),
    textAlign: "center",
    fontWeight: "600"
  },

  // Для улучшения существующих стилей
  securityWarningBox: {
    backgroundColor: "rgba(255, 82, 82, 0.1)",
    borderLeftWidth: 3,
    borderLeftColor: "#FF5252",
    marginTop: 12
  }
})
