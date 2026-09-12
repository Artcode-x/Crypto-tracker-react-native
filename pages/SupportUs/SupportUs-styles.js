import { StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

export const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#0F1117"
  },
  container: {
    flex: 1
  },
  scrollContent: {
    paddingBottom: 30
  },

  // Header Styles
  headerCard: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },
  headerTitle: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: 12
  },
  headerSubtitle: {
    fontSize: RFValue(11),
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: 4
  },

  // Legal Disclaimer Card
  disclaimerCard: {
    backgroundColor: "rgba(255, 152, 0, 0.1)",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    borderLeftWidth: 4,
    borderLeftColor: "#FF9800"
  },
  disclaimerText: {
    fontSize: RFValue(11),
    lineHeight: RFValue(16),
    color: "rgba(255, 255, 255, 0.9)",
    flex: 1,
    marginLeft: 12
  },

  // Section Card
  sectionCard: {
    backgroundColor: "rgba(26, 26, 26, 0.95)",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)"
  },
  sectionTitle: {
    fontSize: RFValue(14),
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: 12,
    flex: 1
  },
  sectionContent: {
    marginTop: 0
  },

  // Text Styles
  infoText: {
    fontSize: RFValue(11),
    lineHeight: RFValue(18),
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 16
  },
  highlight: {
    color: "#FFD700",
    fontWeight: "600"
  },
  bold: {
    fontWeight: "bold"
  },

  // Feature List
  featureList: {
    marginVertical: 12
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 8,
    padding: 12
  },
  featureText: {
    fontSize: RFValue(11),
    color: "rgba(255, 255, 255, 0.9)",
    flex: 1,
    marginLeft: 12
  },

  // Note Box
  noteBox: {
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    borderLeftWidth: 4,
    borderLeftColor: "#FFD700"
  },
  noteText: {
    fontSize: RFValue(11),
    lineHeight: RFValue(17),
    color: "rgba(255, 255, 255, 0.9)",
    flex: 1,
    marginLeft: 12
  },

  // Wallet Card
  walletCard: {
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  walletGradient: {
    padding: 20
  },
  walletHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12
  },
  walletTitle: {
    fontSize: RFValue(13),
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: 12
  },
  walletInfo: {
    marginBottom: 12
  },
  walletNetwork: {
    fontSize: RFValue(11),
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 4
  },
  walletNote: {
    fontSize: RFValue(10),
    color: "#4CAF50",
    fontStyle: "italic",
    marginBottom: 16,
    textAlign: "center"
  },
  walletAddressContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)"
  },
  walletAddressContainerCopied: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    borderColor: "#4CAF50"
  },
  walletAddressText: {
    fontSize: RFValue(9),
    fontFamily: "monospace",
    color: "#FFFFFF",
    flex: 1,
    marginRight: 12
  },
  copyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8
  },
  copyButtonText: {
    fontSize: RFValue(10),
    fontWeight: "600",
    color: "#FFD700",
    marginLeft: 6
  },
  walletHint: {
    fontSize: RFValue(9),
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
    fontStyle: "italic"
  },

  // Security Note
  securityNote: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    borderRadius: 12,
    padding: 10,
    marginTop: 7,
    flexDirection: "row",
    alignItems: "flex-start",
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50"
  },
  securityText: {
    fontSize: RFValue(11),
    lineHeight: RFValue(15),
    color: "rgba(255, 255, 255, 0.9)",
    flex: 1,
    marginLeft: 12
  },

  // Footer
  footerCard: {
    backgroundColor: "rgba(26, 26, 26, 0.95)",
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    borderTopWidth: 2,
    borderTopColor: "#FFD700"
  },
  footerTitle: {
    fontSize: RFValue(13),
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 16,
    textAlign: "center"
  },
  footerText: {
    fontSize: RFValue(11),
    lineHeight: RFValue(15),
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: 20
  },

  // Contact Info
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.3)"
  },
  contactLink: {
    fontSize: RFValue(12),
    fontWeight: "600",
    color: "#FFD700",
    marginLeft: 12,
    textDecorationLine: "none"
  },
  contactDescription: {
    fontSize: RFValue(11),
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
    marginBottom: 20,
    fontStyle: "italic"
  },

  // Legal Section
  legalSection: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    width: "100%"
  },
  legalTitle: {
    fontSize: RFValue(12),
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
    textAlign: "center"
  },
  legalText: {
    fontSize: RFValue(11),
    lineHeight: RFValue(16),
    color: "rgba(255, 255, 255, 0.8)"
  },

  // Version Info
  versionInfo: {
    alignItems: "center",
    marginTop: 12
  },
  versionText: {
    fontSize: RFValue(8),
    color: "rgba(255, 255, 255, 0.5)",
    marginBottom: 4
  },
  disclaimer: {
    fontSize: RFValue(8),
    color: "rgba(255, 255, 255, 0.4)",
    textAlign: "center",
    fontStyle: "italic"
  },

  // Bottom Spacer
  bottomSpacer: {
    height: 30
  }
})
