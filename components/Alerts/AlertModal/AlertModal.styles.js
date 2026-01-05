import { StyleSheet, Platform, Dimensions } from "react-native"

const { width } = Dimensions.get("window")

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContainer: {
    width: width * 0.9,
    maxWidth: 400,
    borderRadius: 20,
    overflow: "hidden"
  },
  modalGradient: {
    padding: 24
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 24
  },
  coinHeader: {
    alignItems: "center",
    marginBottom: 8
  },
  coinName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFF",
    marginBottom: 4
  },
  coinSymbol: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)"
  },
  currentPrice: {
    fontSize: 16,
    color: "#D4AF37",
    fontWeight: "600"
  },
  conditionSection: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 12
  },
  conditionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12
  },
  conditionButton: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden"
  },
  conditionButtonActive: {
    borderWidth: 2,
    borderColor: "#D4AF37"
  },
  conditionButtonGradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12
  },
  conditionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    color: "rgba(255, 255, 255, 0.7)"
  },
  conditionButtonTextActive: {
    color: "#FFF"
  },
  priceInputSection: {
    marginBottom: 24
  },
  priceInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)",
    paddingHorizontal: 16
  },
  currencySymbol: {
    fontSize: 20,
    color: "#D4AF37",
    fontWeight: "600",
    marginRight: 8
  },
  priceInput: {
    flex: 1,
    fontSize: 20,
    color: "#FFF",
    paddingVertical: 16
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 8
  },
  previewSection: {
    marginBottom: 24,
    backgroundColor: "rgba(212, 175, 55, 0.1)",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)"
  },
  previewTitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: 8
  },
  previewText: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "500"
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12
  },
  cancelButton: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden"
  },
  cancelButtonGradient: {
    paddingVertical: 16,
    alignItems: "center"
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.7)"
  },
  saveButton: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden"
  },
  saveButtonGradient: {
    paddingVertical: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000"
  },

  notificationStatus: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 8,
    gap: 8
  },

  notificationStatus_disabled: {
    backgroundColor: "rgba(244, 67, 54, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(244, 67, 54, 0.3)"
  },

  notificationStatus_fcm_enabled: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(76, 175, 80, 0.3)"
  },

  notificationStatus_local_only: {
    backgroundColor: "rgba(255, 152, 0, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 152, 0, 0.3)"
  },

  notificationStatusText: {
    fontSize: 12,
    fontWeight: "500",
    flex: 1
  },

  priceDifferenceSection: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 4
  },

  priceDifferenceGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8
  },

  priceDifferenceText: {
    fontSize: 13,
    fontWeight: "600"
  },

  percentageText: {
    fontSize: 11,
    opacity: 0.8
  },

  coinHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },

  currentPriceLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)"
  },

  rankBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 2
  },

  rankText: {
    fontSize: 10,
    color: "#FFD700",
    fontWeight: "600"
  },

  currencyContainer: {
    paddingHorizontal: 12,
    justifyContent: "center"
  },

  clearButton: {
    paddingHorizontal: 12,
    justifyContent: "center"
  },

  quickSuggestions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    gap: 8
  },

  suggestionButton: {
    flex: 1,
    paddingVertical: 6,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 6,
    alignItems: "center"
  },

  suggestionText: {
    fontSize: 10,
    color: "#D4AF37",
    fontWeight: "500"
  },

  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8
  },

  activeIndicator: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#D4AF37",
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center"
  },

  previewGradient: {
    padding: 12,
    borderRadius: 8,
    marginTop: 6
  },

  previewCoin: {
    color: "#D4AF37",
    fontWeight: "600"
  },

  previewCondition: {
    fontWeight: "600"
  },

  previewPrice: {
    color: "#FFF",
    fontWeight: "700"
  },

  previewInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)"
  },

  previewInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },

  previewInfoText: {
    fontSize: 10,
    color: "rgba(255,255,255,0.6)"
  },

  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10
  },

  saveButtonTextLocal: {
    color: "#000"
  }
})
