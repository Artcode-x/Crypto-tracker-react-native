import { StyleSheet, Platform, Dimensions } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

const { width, height } = Dimensions.get("window")
const isAndroid = Platform.OS === "android"

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    justifyContent: "center",
    alignItems: "center"
  },
  keyboardAvoidingView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  modalContainer: {
    width: Math.min(width * 0.92, 500),
    maxHeight: height * 0.8,
    borderRadius: RFValue(16),
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: RFValue(4) },
    shadowOpacity: 0.3,
    shadowRadius: RFValue(8),
    elevation: 8
  },
  modalContainerAndroid: {
    maxHeight: height * 0.7
  },
  // НЕ ИСПОЛЬЗУЕТСЯ: modalContainerWithKeyboard - в компоненте заменен на вычисляемый стиль
  modalGradient: {
    paddingHorizontal: RFValue(16),
    paddingTop: RFValue(16),
    paddingBottom: RFValue(16)
  },
  modalGradientAndroid: {
    paddingHorizontal: RFValue(14),
    paddingTop: RFValue(12),
    paddingBottom: RFValue(12)
  },
  compactHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: RFValue(16),
    paddingBottom: RFValue(12),
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)"
  },
  closeButton: {
    paddingTop: RFValue(4),
    marginRight: RFValue(12)
  },
  compactCoinInfo: {
    flex: 1
  },
  coinHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: RFValue(6),
    flexWrap: "wrap"
  },
  coinName: {
    fontSize: RFValue(18),
    fontWeight: "700",
    color: "#FFF",
    marginRight: RFValue(8)
  },
  coinNameAndroid: {
    fontSize: RFValue(17)
  },
  coinSymbol: {
    fontSize: RFValue(13),
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: "500"
  },
  coinSymbolAndroid: {
    fontSize: RFValue(12)
  },
  compactPriceInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  currentPriceContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  currentPriceLabel: {
    fontSize: RFValue(13),
    color: "rgba(255, 255, 255, 0.7)",
    marginRight: RFValue(6)
  },
  currentPriceLabelAndroid: {
    fontSize: RFValue(12)
  },
  currentPrice: {
    fontSize: RFValue(16),
    color: "#D4AF37",
    fontWeight: "700"
  },
  currentPriceAndroid: {
    fontSize: RFValue(15)
  },
  compactNotificationStatus: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: RFValue(8),
    paddingVertical: RFValue(4),
    borderRadius: RFValue(10),
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(76, 175, 80, 0.3)"
  },
  compactNotificationText: {
    fontSize: RFValue(11),
    fontWeight: "600",
    marginLeft: RFValue(4)
  },
  compactNotificationTextAndroid: {
    fontSize: RFValue(10)
  },
  conditionSection: {
    marginBottom: RFValue(14)
  },
  conditionSectionAndroid: {
    marginBottom: RFValue(12)
  },
  sectionTitle: {
    fontSize: RFValue(12),
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: RFValue(8),
    fontWeight: "500"
  },
  sectionTitleAndroid: {
    fontSize: RFValue(11),
    marginBottom: RFValue(6)
  },
  conditionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: RFValue(8)
  },
  conditionButtonsAndroid: {
    gap: RFValue(6)
  },
  conditionButton: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: RFValue(10),
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)"
  },
  conditionButtonAndroid: {
    borderRadius: RFValue(8)
  },
  conditionButtonActive: {
    borderColor: "#D4AF37",
    backgroundColor: "rgba(212, 175, 55, 0.1)"
  },
  conditionButtonContent: {
    paddingVertical: RFValue(10),
    alignItems: "center",
    justifyContent: "center"
  },
  conditionButtonContentAndroid: {
    paddingVertical: RFValue(8)
  },
  conditionButtonText: {
    fontSize: RFValue(13),
    fontWeight: "600",
    marginTop: RFValue(4),
    color: "rgba(255, 255, 255, 0.7)"
  },
  conditionButtonTextAndroid: {
    fontSize: RFValue(12),
    marginTop: RFValue(3)
  },
  conditionButtonTextActive: {
    color: "#FFF"
  },
  priceInputSection: {
    marginBottom: RFValue(12)
  },
  priceInputSectionAndroid: {
    marginBottom: RFValue(10)
  },
  priceInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: RFValue(12),
    borderWidth: RFValue(2),
    borderColor: "rgba(212, 175, 55, 0.4)",
    paddingHorizontal: RFValue(12),
    height: RFValue(52)
  },
  priceInputContainerAndroid: {
    height: RFValue(48),
    paddingHorizontal: RFValue(10),
    borderRadius: RFValue(10)
  },
  currencyContainer: {
    paddingRight: RFValue(8),
    borderRightWidth: 1,
    borderRightColor: "rgba(255,255,255,0.1)",
    height: "100%",
    justifyContent: "center"
  },
  currencyContainerAndroid: {
    paddingRight: RFValue(6)
  },
  currencySymbol: {
    fontSize: RFValue(20),
    color: "#D4AF37",
    fontWeight: "700"
  },
  currencySymbolAndroid: {
    fontSize: RFValue(18)
  },
  priceInput: {
    flex: 1,
    fontSize: RFValue(20),
    color: "#FFF",
    fontWeight: "600",
    paddingHorizontal: RFValue(12),
    paddingVertical: 0,
    height: "100%",
    textAlign: "center"
  },
  priceInputAndroid: {
    fontSize: RFValue(18)
  },
  clearButton: {
    paddingLeft: RFValue(8),
    height: "100%",
    justifyContent: "center"
  },
  clearButtonAndroid: {
    paddingLeft: RFValue(6)
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: RFValue(4),
    marginTop: RFValue(6),
    paddingHorizontal: RFValue(4)
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: RFValue(11),
    fontWeight: "500"
  },
  errorTextAndroid: {
    fontSize: RFValue(10)
  },
  quickSuggestions: {
    marginTop: RFValue(10)
  },
  quickSuggestionsAndroid: {
    marginTop: RFValue(8)
  },
  suggestionsScroll: {
    flexDirection: "row"
  },
  suggestionsContent: {
    paddingRight: RFValue(8)
  },
  suggestionButton: {
    paddingHorizontal: RFValue(10),
    paddingVertical: RFValue(6),
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: RFValue(8),
    alignItems: "center",
    marginRight: RFValue(6),
    minWidth: RFValue(65),
    borderWidth: 1,
    borderColor: "transparent"
  },
  suggestionButtonAndroid: {
    paddingHorizontal: RFValue(8),
    paddingVertical: RFValue(5),
    minWidth: RFValue(60),
    marginRight: RFValue(5),
    borderRadius: RFValue(6)
  },
  suggestionButtonActive: {
    borderColor: "#D4AF37",
    backgroundColor: "rgba(212, 175, 55, 0.1)"
  },
  suggestionPrice: {
    fontSize: RFValue(12),
    color: "#FFF",
    fontWeight: "600",
    marginBottom: RFValue(1)
  },
  suggestionPriceAndroid: {
    fontSize: RFValue(11)
  },
  suggestionLabel: {
    fontSize: RFValue(10),
    color: "#D4AF37",
    fontWeight: "500"
  },
  suggestionLabelAndroid: {
    fontSize: RFValue(9)
  },
  priceDifferenceSection: {
    marginBottom: RFValue(10)
  },
  priceDifferenceSectionAndroid: {
    marginBottom: RFValue(8)
  },
  priceDifferenceContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: RFValue(12),
    paddingVertical: RFValue(8),
    borderRadius: RFValue(8),
    gap: RFValue(6),
    backgroundColor: "rgba(255,255,255,0.05)"
  },
  priceDifferenceContainerAndroid: {
    paddingHorizontal: RFValue(10),
    paddingVertical: RFValue(6),
    borderRadius: RFValue(6)
  },
  priceDifferenceText: {
    fontSize: RFValue(13),
    fontWeight: "600"
  },
  priceDifferenceTextAndroid: {
    fontSize: RFValue(12)
  },
  percentageText: {
    fontSize: RFValue(11),
    opacity: 0.8,
    fontWeight: "500"
  },
  percentageTextAndroid: {
    fontSize: RFValue(10)
  },
  actionButtons: {
    flexDirection: "row",
    gap: RFValue(8),
    marginTop: RFValue(8)
  },
  actionButtonsAndroid: {
    gap: RFValue(6),
    marginTop: RFValue(6)
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: RFValue(12),
    overflow: "hidden",
    height: RFValue(44)
  },
  cancelButtonAndroid: {
    height: RFValue(42),
    borderRadius: RFValue(10)
  },
  cancelButtonContent: {
    paddingVertical: RFValue(12),
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  cancelButtonContentAndroid: {
    paddingVertical: RFValue(10)
  },
  cancelButtonText: {
    fontSize: RFValue(15),
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.9)"
  },
  cancelButtonTextAndroid: {
    fontSize: RFValue(14)
  },
  saveButton: {
    flex: 1,
    borderRadius: RFValue(12),
    overflow: "hidden",
    height: RFValue(44)
  },
  saveButtonAndroid: {
    height: RFValue(42),
    borderRadius: RFValue(10)
  },
  saveButtonGradient: {
    paddingVertical: RFValue(12),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: RFValue(6),
    height: "100%"
  },
  saveButtonGradientAndroid: {
    paddingVertical: RFValue(10),
    gap: RFValue(5)
  },
  saveButtonText: {
    fontSize: RFValue(15),
    fontWeight: "700",
    color: "#FFF"
  },
  saveButtonTextAndroid: {
    fontSize: RFValue(14)
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: RFValue(8)
  },
  scrollContainerAndroid: {
    paddingBottom: RFValue(6)
  }
})
