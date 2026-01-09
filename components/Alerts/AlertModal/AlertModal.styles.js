import { StyleSheet, Platform, Dimensions, StatusBar } from "react-native"

const { width, height } = Dimensions.get("window")
const isSmallDevice = width < 375
const isAndroid = Platform.OS === "android"
const isIOS = Platform.OS === "ios"

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: isIOS ? 20 : StatusBar.currentHeight || 0
  },
  keyboardAvoidingView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },

  // Модалка
  modalContainer: {
    width: isSmallDevice ? width * 0.95 : Math.min(width * 0.92, 500),
    maxHeight: height * (isAndroid ? 0.7 : 0.8),
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  modalContainerAndroid: {
    maxHeight: height * 0.65
  },

  modalGradient: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16
  },
  modalGradientAndroid: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 12
  },

  // Заголовок
  compactHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)"
  },

  closeButton: {
    paddingTop: 4,
    marginRight: 12
  },

  compactCoinInfo: {
    flex: 1
  },

  coinHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    flexWrap: "wrap"
  },

  coinName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFF",
    marginRight: 8
  },
  coinNameAndroid: {
    fontSize: 17
  },

  coinSymbol: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: "500"
  },
  coinSymbolAndroid: {
    fontSize: 12
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
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.7)",
    marginRight: 6
  },
  currentPriceLabelAndroid: {
    fontSize: 12
  },

  currentPrice: {
    fontSize: 16,
    color: "#D4AF37",
    fontWeight: "700"
  },
  currentPriceAndroid: {
    fontSize: 15
  },

  compactNotificationStatus: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(76, 175, 80, 0.3)"
  },

  compactNotificationText: {
    fontSize: 11,
    fontWeight: "600",
    marginLeft: 4
  },
  compactNotificationTextAndroid: {
    fontSize: 10
  },

  // Above/Below
  conditionSection: {
    marginBottom: 14
  },
  conditionSectionAndroid: {
    marginBottom: 12
  },

  sectionTitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 8,
    fontWeight: "500"
  },
  sectionTitleAndroid: {
    fontSize: 11,
    marginBottom: 6
  },

  conditionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8
  },
  conditionButtonsAndroid: {
    gap: 6
  },

  conditionButton: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)"
  },
  conditionButtonAndroid: {
    borderRadius: 8
  },

  conditionButtonActive: {
    borderColor: "#D4AF37",
    backgroundColor: "rgba(212, 175, 55, 0.1)"
  },

  conditionButtonContent: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  conditionButtonContentAndroid: {
    paddingVertical: 8
  },

  conditionButtonText: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 4,
    color: "rgba(255, 255, 255, 0.7)"
  },
  conditionButtonTextAndroid: {
    fontSize: 12,
    marginTop: 3
  },

  conditionButtonTextActive: {
    color: "#FFF"
  },

  // Ввод цены
  priceInputSection: {
    marginBottom: 12
  },
  priceInputSectionAndroid: {
    marginBottom: 10
  },

  priceInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(212, 175, 55, 0.4)",
    paddingHorizontal: 12,
    height: 52
  },
  priceInputContainerAndroid: {
    height: 48,
    paddingHorizontal: 10,
    borderRadius: 10
  },

  currencyContainer: {
    paddingRight: 8,
    borderRightWidth: 1,
    borderRightColor: "rgba(255,255,255,0.1)",
    height: "100%",
    justifyContent: "center"
  },
  currencyContainerAndroid: {
    paddingRight: 6
  },

  currencySymbol: {
    fontSize: 20,
    color: "#D4AF37",
    fontWeight: "700"
  },
  currencySymbolAndroid: {
    fontSize: 18
  },

  priceInput: {
    flex: 1,
    fontSize: 20,
    color: "#FFF",
    fontWeight: "600",
    paddingHorizontal: 12,
    paddingVertical: 0,
    height: "100%",
    textAlign: "center"
  },
  priceInputAndroid: {
    fontSize: 18
  },

  clearButton: {
    paddingLeft: 8,
    height: "100%",
    justifyContent: "center"
  },
  clearButtonAndroid: {
    paddingLeft: 6
  },

  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
    paddingHorizontal: 4
  },

  errorText: {
    color: "#FF6B6B",
    fontSize: 11,
    fontWeight: "500"
  },
  errorTextAndroid: {
    fontSize: 10
  },

  // Быстрые предложения
  quickSuggestions: {
    marginTop: 10
  },
  quickSuggestionsAndroid: {
    marginTop: 8
  },

  suggestionsScroll: {
    flexDirection: "row"
  },

  suggestionsContent: {
    paddingRight: 8
  },

  suggestionButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 8,
    alignItems: "center",
    marginRight: 6,
    minWidth: 65,
    borderWidth: 1,
    borderColor: "transparent"
  },
  suggestionButtonAndroid: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    minWidth: 60,
    marginRight: 5,
    borderRadius: 6
  },

  suggestionButtonActive: {
    borderColor: "#D4AF37",
    backgroundColor: "rgba(212, 175, 55, 0.1)"
  },

  suggestionPrice: {
    fontSize: 12,
    color: "#FFF",
    fontWeight: "600",
    marginBottom: 1
  },
  suggestionPriceAndroid: {
    fontSize: 11
  },

  suggestionLabel: {
    fontSize: 10,
    color: "#D4AF37",
    fontWeight: "500"
  },
  suggestionLabelAndroid: {
    fontSize: 9
  },

  // Разница цены
  priceDifferenceSection: {
    marginBottom: 10
  },
  priceDifferenceSectionAndroid: {
    marginBottom: 8
  },

  priceDifferenceContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.05)"
  },
  priceDifferenceContainerAndroid: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6
  },

  priceDifferenceText: {
    fontSize: 13,
    fontWeight: "600"
  },
  priceDifferenceTextAndroid: {
    fontSize: 12
  },

  percentageText: {
    fontSize: 11,
    opacity: 0.8,
    fontWeight: "500"
  },
  percentageTextAndroid: {
    fontSize: 10
  },

  // Предварительный просмотр
  previewSection: {
    marginBottom: 14
  },
  previewSectionAndroid: {
    marginBottom: 12
  },

  previewGradient: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)"
  },
  previewGradientAndroid: {
    padding: 10,
    borderRadius: 10
  },

  previewText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 18,
    textAlign: "center"
  },
  previewTextAndroid: {
    fontSize: 13,
    lineHeight: 16
  },

  previewCoin: {
    color: "#D4AF37",
    fontWeight: "700"
  },
  previewCoinAndroid: {
    fontSize: 13
  },

  previewCondition: {
    fontWeight: "700"
  },
  previewConditionAndroid: {
    fontSize: 13
  },

  previewPrice: {
    color: "#FFF",
    fontWeight: "800"
  },
  previewPriceAndroid: {
    fontSize: 13
  },

  // Кнопки действий
  actionButtons: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8
  },
  actionButtonsAndroid: {
    gap: 6,
    marginTop: 6
  },

  cancelButton: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    overflow: "hidden",
    height: 44
  },
  cancelButtonAndroid: {
    height: 42,
    borderRadius: 10
  },

  cancelButtonContent: {
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  cancelButtonContentAndroid: {
    paddingVertical: 10
  },

  cancelButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.9)"
  },
  cancelButtonTextAndroid: {
    fontSize: 14
  },

  saveButton: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
    height: 44
  },
  saveButtonAndroid: {
    height: 42,
    borderRadius: 10
  },

  saveButtonGradient: {
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
    height: "100%"
  },
  saveButtonGradientAndroid: {
    paddingVertical: 10,
    gap: 5
  },

  saveButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFF"
  },
  saveButtonTextAndroid: {
    fontSize: 14
  },

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 8
  },
  scrollContainerAndroid: {
    paddingBottom: 6
  }
})
