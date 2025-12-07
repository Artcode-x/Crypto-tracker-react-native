import { StyleSheet, Dimensions, Platform } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

const { width } = Dimensions.get("window")
const CARD_WIDTH = (width - 32) / 2

export const styles = StyleSheet.create({
  premiumContainer: {
    flex: 1,
    backgroundColor: "#0A0A0F"
  },
  premiumHeader: {
    paddingTop: Platform.OS === "ios" ? 20 : 15,
    paddingHorizontal: 16,
    paddingBottom: 12
  },
  headerGradient: {
    flexDirection: "row",
    alignItems: "center",
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
    fontSize: Platform.OS === "ios" ? 15 : 14,
    fontWeight: "700",
    color: "#D4AF37"
  },
  headerSubtitle: {
    fontSize: Platform.OS === "ios" ? 9.5 : 9,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 2
  },
  statsPanel: {
    paddingHorizontal: 16,
    marginBottom: 12
  },
  statsGradient: {
    borderRadius: 12,
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
    fontSize: 13,
    fontWeight: "700",
    color: "#FFF",
    marginTop: 4
  },
  statLabelCompact: {
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
    height: Platform.OS === "ios" ? 165 : 170,
    width: CARD_WIDTH,
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
    padding: 10,
    position: "relative",
    flex: 1
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    marginBottom: 7
  },
  coinHeader: {
    marginBottom: 2
  },
  coinName: {
    // fontSize: 13,
    fontSize: RFValue(12),
    fontWeight: "600",
    color: "#FFF",
    marginBottom: 2
  },
  coinSymbol: {
    // fontSize: 10,
    fontSize: RFValue(9),
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "500"
  },
  coinPrice: {
    // fontSize: 14,
    fontSize: RFValue(11),
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
    flex: 1,
    marginLeft: 4,
    height: 25
  },

  deleteButtonGradient: {
    paddingHorizontal: Platform.OS === "ios" ? 10 : 8,
    paddingVertical: 0,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    height: "100%"
    // flex: 1
  },

  deleteButtonText: {
    fontSize: Platform.OS === "ios" ? 9 : 8,
    color: "#FFF",
    marginLeft: 0,
    fontWeight: "600",
    includeFontPadding: false,
    textAlignVertical: "center",
    paddingVertical: 0,
    lineHeight: Platform.OS === "ios" ? 12 : 14
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
  },

  userAmountContainer: {
    alignItems: "flex-end",
    minHeight: 32
  },

  userAmountText: {
    fontSize: 10,
    color: "#D4AF37",
    fontWeight: "600",
    textAlign: "right"
  },

  userAmountValue: {
    fontSize: 8,
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: 2,
    textAlign: "right"
  },

  // Строка с кнопками внизу
  bottomButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    minHeight: 28,
    alignItems: "stretch"
  },

  // Кнопка для ввода количества
  amountButton: {
    flex: 1,
    marginRight: 4,
    height: 25
  },

  amountButtonGradient: {
    paddingHorizontal: Platform.OS === "ios" ? 10 : 8,
    paddingVertical: 0,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)",
    height: "100%"
    // flex: 1
  },

  amountButtonText: {
    fontSize: Platform.OS === "ios" ? 9 : 10,
    color: "#FFD700",
    marginLeft: 4,
    fontWeight: "600",
    includeFontPadding: false,
    textAlignVertical: "center",
    paddingVertical: 0,
    lineHeight: Platform.OS === "ios" ? 12 : 14
  },

  // Модалка для ввода количества
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center"
  },

  modalContainer: {
    width: width * 0.8,
    borderRadius: 16,
    overflow: "hidden"
  },

  modalGradient: {
    padding: 20
  },

  modalHeader: {
    marginBottom: 16
  },

  modalTitle: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "600",
    textAlign: "center"
  },

  modalSubtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
    textAlign: "center",
    marginTop: 4
  },

  amountInput: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#FFF",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)"
  },

  modalButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  modalButtonCancel: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center"
  },

  modalButtonSave: {
    flex: 1,
    marginLeft: 8,
    borderRadius: 10,
    overflow: "hidden"
  },

  saveButtonGradient: {
    paddingVertical: 12,
    alignItems: "center"
  },

  modalButtonTextCancel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "600"
  },

  modalButtonTextSave: {
    color: "#000",
    fontWeight: "600"
  },

  // Левая часть шапки
  headerLeftContainer: {
    flex: 1,
    marginLeft: 10
  },

  // Правая часть с Portfolio
  headerRightContainer: {
    alignItems: "flex-end",
    marginLeft: 10
  },

  portfolioLabel: {
    fontSize: 8,
    color: "rgba(255, 255, 255, 0.5)",
    marginBottom: 2
  },

  portfolioValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#D4AF37"
  },

  userAmountPlaceholder: {
    fontSize: 9,
    color: "rgba(255, 255, 255, 0.2)",
    fontStyle: "italic",
    textAlign: "right"
  }

  // buttonIcon: {
  //   textAlign: "center",
  //   textAlignVertical: "center"
  // }
})
