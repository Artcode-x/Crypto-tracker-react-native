import { StyleSheet, Dimensions } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

const { width, height } = Dimensions.get("window")

export const styles = StyleSheet.create({
  // Safe Area Container
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#0A0A0F"
  },

  // Container
  container: {
    flex: 1,
    backgroundColor: "#0A0A0F"
  },

  // Scroll Content
  scrollContent: {
    padding: RFValue(12),
    paddingBottom: RFValue(30)
  },

  // Header Card
  headerCard: {
    borderRadius: RFValue(10),
    padding: RFValue(16),
    marginBottom: RFValue(12),
    borderWidth: 1,
    borderColor: "#444"
  },

  // Header Top
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: RFValue(10)
  },

  // Header Title
  headerTitle: {
    fontSize: RFValue(18),
    fontWeight: "bold",
    color: "#FFF",
    marginLeft: RFValue(10)
  },

  // Last Updated
  lastUpdated: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: RFValue(14)
  },

  // Last Updated Text
  lastUpdatedText: {
    fontSize: RFValue(10),
    color: "rgba(255, 255, 255, 0.6)",
    marginLeft: RFValue(5)
  },

  // Overview Card
  overviewCard: {
    backgroundColor: "rgba(26, 26, 26, 0.5)",
    borderRadius: RFValue(8),
    padding: RFValue(10)
  },

  // Overview Row
  overviewRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: RFValue(6)
  },

  // Overview Label
  overviewLabel: {
    fontSize: RFValue(11),
    color: "#AAA",
    marginLeft: RFValue(6),
    marginRight: RFValue(6),
    flex: 1
  },

  // Overview Value
  overviewValue: {
    fontSize: RFValue(11),
    fontWeight: "600",
    color: "#FFF"
  },

  // Section Card
  sectionCard: {
    backgroundColor: "rgba(30, 30, 30, 0.8)",
    borderRadius: RFValue(10),
    marginBottom: RFValue(10),
    borderWidth: 1,
    borderColor: "#333",
    overflow: "hidden"
  },

  // Section Header
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: RFValue(14),
    backgroundColor: "rgba(40, 40, 40, 0.9)"
  },

  // Section Title
  sectionTitle: {
    flex: 1,
    fontSize: RFValue(14),
    fontWeight: "bold",
    color: "#FFF",
    marginLeft: RFValue(10)
  },

  // Section Content
  sectionContent: {
    padding: RFValue(14)
  },

  // Section Subtitle
  sectionSubtitle: {
    fontSize: RFValue(13),
    fontWeight: "700",
    color: "#FFD700",
    marginTop: RFValue(14),
    marginBottom: RFValue(10),
    paddingBottom: RFValue(4),
    borderBottomWidth: 1,
    borderBottomColor: "#444"
  },

  // Info Text
  infoText: {
    fontSize: RFValue(11),
    color: "#CCC",
    lineHeight: RFValue(18),
    marginBottom: RFValue(10)
  },

  // Bold text
  bold: {
    fontWeight: "700",
    color: "#FFF"
  },

  // Highlight text
  highlight: {
    color: "#FFD700",
    fontWeight: "600"
  },

  // Warning Box
  warningBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: RFValue(10),
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    borderRadius: RFValue(8),
    borderLeftWidth: 3,
    borderLeftColor: "#FFD700",
    marginTop: RFValue(14)
  },

  // Warning Text
  warningText: {
    flex: 1,
    fontSize: RFValue(11),
    color: "#EEE",
    marginLeft: RFValue(10),
    lineHeight: RFValue(18)
  },

  // Для таблицы сравнения
  comparisonTable: {
    marginTop: RFValue(12),
    marginBottom: RFValue(12),
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: RFValue(8),
    overflow: "hidden",
    backgroundColor: "rgba(30, 30, 30, 0.8)"
  },

  // Table Row
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    minHeight: RFValue(35)
  },

  // Table Header
  tableHeader: {
    flex: 1,
    padding: RFValue(8),
    fontSize: RFValue(9),
    fontWeight: "700",
    color: "#FFD700",
    backgroundColor: "rgba(40, 40, 40, 0.9)",
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#333"
  },

  // Table Cell
  tableCell: {
    flex: 1,
    padding: RFValue(8),
    fontSize: RFValue(9),
    color: "#CCC",
    backgroundColor: "rgba(26, 26, 26, 0.6)",
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#333"
  },

  // Table Cell Yes (green)
  tableCellYes: {
    flex: 1,
    padding: RFValue(8),
    fontSize: RFValue(9),
    color: "#4CAF50",
    fontWeight: "600",
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#333"
  },

  // Table Cell No (red)
  tableCellNo: {
    flex: 1,
    padding: RFValue(8),
    fontSize: RFValue(9),
    color: "#F44336",
    fontWeight: "600",
    backgroundColor: "rgba(244, 67, 54, 0.1)",
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#333"
  },

  // Data Category
  dataCategory: {
    backgroundColor: "rgba(30, 30, 30, 0.5)",
    borderRadius: RFValue(8),
    padding: RFValue(10),
    marginBottom: RFValue(10),
    borderLeftWidth: 3,
    borderLeftColor: "#444"
  },

  // Category Header
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: RFValue(6)
  },

  // Category Title
  categoryTitle: {
    fontSize: RFValue(12),
    fontWeight: "600",
    color: "#FFF",
    marginLeft: RFValue(6),
    flexShrink: 1
  },

  // Category Text
  categoryText: {
    fontSize: RFValue(10),
    color: "#CCC",
    lineHeight: RFValue(16),
    marginBottom: RFValue(6)
  },

  // Data Note
  dataNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(26, 26, 26, 0.8)",
    padding: RFValue(6),
    borderRadius: RFValue(6),
    marginTop: RFValue(4)
  },

  // Note Text
  noteText: {
    flex: 1,
    fontSize: RFValue(9),
    color: "#AAA",
    marginLeft: RFValue(6),
    lineHeight: RFValue(14)
  },

  // Usage Item
  usageItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: RFValue(14),
    padding: RFValue(10),
    backgroundColor: "rgba(40, 40, 40, 0.5)",
    borderRadius: RFValue(8)
  },

  // Usage Icon Container
  usageIconContainer: {
    width: RFValue(28),
    height: RFValue(28),
    borderRadius: RFValue(14),
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: RFValue(10)
  },

  // Usage Content
  usageContent: {
    flex: 1
  },

  // Usage Title
  usageTitle: {
    fontSize: RFValue(12),
    fontWeight: "600",
    color: "#FFF",
    marginBottom: RFValue(4)
  },

  // Usage Text
  usageText: {
    fontSize: RFValue(10),
    color: "#CCC",
    lineHeight: RFValue(16)
  },

  // Note Box
  noteBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: RFValue(10),
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    borderRadius: RFValue(8),
    borderLeftWidth: 3,
    borderLeftColor: "#FFD700",
    marginTop: RFValue(8),
    flexWrap: "wrap"
  },

  // Link Text
  linkText: {
    color: "#2196F3",
    textDecorationLine: "underline",
    fontSize: RFValue(10)
  },

  // Retention Item
  retentionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: RFValue(14),
    padding: RFValue(10),
    backgroundColor: "rgba(40, 40, 40, 0.5)",
    borderRadius: RFValue(8)
  },

  // Retention Content
  retentionContent: {
    flex: 1,
    marginLeft: RFValue(10)
  },

  // Retention Title
  retentionTitle: {
    fontSize: RFValue(12),
    fontWeight: "600",
    color: "#FFF",
    marginBottom: RFValue(4)
  },

  // Retention Text
  retentionText: {
    fontSize: RFValue(10),
    color: "#CCC",
    lineHeight: RFValue(16)
  },

  // Security Box
  securityBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: RFValue(10),
    backgroundColor: "rgba(26, 26, 26, 0.8)",
    borderRadius: RFValue(8),
    borderLeftWidth: 3,
    borderLeftColor: "#FFD700",
    marginTop: RFValue(8)
  },

  // Security Text
  securityText: {
    flex: 1,
    fontSize: RFValue(10),
    color: "#EEE",
    marginLeft: RFValue(10),
    lineHeight: RFValue(16)
  },

  // Rights Grid
  rightsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: RFValue(16)
  },

  // Right Item
  rightItem: {
    width: width < 360 ? "100%" : "48%",
    alignItems: "center",
    padding: RFValue(10),
    backgroundColor: "rgba(40, 40, 40, 0.5)",
    borderRadius: RFValue(8),
    marginBottom: RFValue(10)
  },

  // Right Title
  rightTitle: {
    fontSize: RFValue(11),
    fontWeight: "600",
    color: "#FFF",
    marginTop: RFValue(6),
    marginBottom: RFValue(4),
    textAlign: "center"
  },

  // Right Text
  rightText: {
    fontSize: RFValue(9),
    color: "#AAA",
    textAlign: "center",
    lineHeight: RFValue(14)
  },

  // Step List
  stepList: {
    marginTop: RFValue(14)
  },

  // Step Item
  stepItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: RFValue(10)
  },

  // Step Number
  stepNumber: {
    width: RFValue(20),
    height: RFValue(20),
    borderRadius: RFValue(10),
    backgroundColor: "#FFD700",
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: RFValue(20),
    marginRight: RFValue(10),
    fontSize: RFValue(10)
  },

  // Step Text
  stepText: {
    flex: 1,
    fontSize: RFValue(10),
    color: "#CCC",
    lineHeight: RFValue(16)
  },

  // Compliance Item
  complianceItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: RFValue(14),
    padding: RFValue(10),
    backgroundColor: "rgba(40, 40, 40, 0.5)",
    borderRadius: RFValue(8)
  },

  // Compliance Content
  complianceContent: {
    flex: 1,
    marginLeft: RFValue(10)
  },

  // Compliance Title
  complianceTitle: {
    fontSize: RFValue(12),
    fontWeight: "600",
    color: "#FFF",
    marginBottom: RFValue(4)
  },

  // Compliance Text
  complianceText: {
    fontSize: RFValue(10),
    color: "#CCC",
    lineHeight: RFValue(16)
  },

  // Footer Card
  footerCard: {
    backgroundColor: "rgba(30, 30, 30, 0.8)",
    borderRadius: RFValue(10),
    padding: RFValue(16),
    marginTop: RFValue(8),
    borderWidth: 1,
    borderColor: "#333"
  },

  // Footer Title
  footerTitle: {
    fontSize: RFValue(16),
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: RFValue(14)
  },

  // Contact Info
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: RFValue(10),
    padding: RFValue(10),
    backgroundColor: "rgba(40, 40, 40, 0.5)",
    borderRadius: RFValue(8)
  },

  // Contact Text
  contactText: {
    fontSize: RFValue(12),
    color: "#FFF",
    marginLeft: RFValue(10)
  },

  // Contact Link
  contactLink: {
    fontSize: RFValue(12),
    color: "#2196F3",
    marginLeft: RFValue(10),
    textDecorationLine: "underline"
  },

  // Contact Description
  contactDescription: {
    fontSize: RFValue(11),
    color: "#AAA",
    lineHeight: RFValue(16),
    marginBottom: RFValue(14),
    paddingHorizontal: RFValue(10)
  },

  // Response Time
  responseTime: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: RFValue(14),
    paddingHorizontal: RFValue(10)
  },

  // Response Time Text
  responseTimeText: {
    fontSize: RFValue(11),
    color: "#4CAF50",
    marginLeft: RFValue(6)
  },

  // Version Info
  versionInfo: {
    borderTopWidth: 1,
    borderTopColor: "#444",
    paddingTop: RFValue(14)
  },

  // Version Text
  versionText: {
    fontSize: RFValue(10),
    color: "#888",
    textAlign: "center",
    marginBottom: RFValue(6)
  },

  // Disclaimer
  disclaimer: {
    fontSize: RFValue(10),
    color: "#666",
    textAlign: "center",
    fontStyle: "italic"
  },

  // Bottom Spacer
  bottomSpacer: {
    height: RFValue(30)
  }
})
