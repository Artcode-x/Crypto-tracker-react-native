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
  }
})
