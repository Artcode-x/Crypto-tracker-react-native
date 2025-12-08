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
  }
})
