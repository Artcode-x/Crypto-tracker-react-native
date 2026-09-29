import { Dimensions, StyleSheet } from "react-native"

const { width } = Dimensions.get("window")

export const styles = StyleSheet.create({
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
  }
})
