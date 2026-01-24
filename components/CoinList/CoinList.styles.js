import { StyleSheet, Dimensions, Platform } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

export const { width, height } = Dimensions.get("window")

// Более точное определение планшета
export const isTablet = () => {
  // Проверка по ширине (основной критерий)
  if (width >= 768) return true

  // Дополнительные проверки для Android-планшетов
  if (Platform.OS === "android") {
    const screenRatio = Math.max(width, height) / Math.min(width, height)

    // Для Nexus 9: 2048/1536 ≈ 1.33 (портретный) или 1536/2048 ≈ 0.75 (альбомный)
    const scaledWidth = width * (Platform.isPad ? 1 : 1)

    // Если ширина больше 600dp и соотношение сторон меньше 1.6 (типично для планшетов)
    if (scaledWidth >= 600 && screenRatio < 1.6) {
      return true
    }
  }

  return false
}

export const isSmallScreen = width < 375

export const styles = StyleSheet.create({
  list: {
    width: "100%",
    paddingHorizontal: isSmallScreen ? 8 : 12
  },

  contentContainer: {
    alignItems: "center",
    paddingBottom: 20
  },

  itemContainer: {
    margin: 4,
    alignItems: "center",
    justifyContent: "center",
    padding: isSmallScreen ? 6 : 8,
    borderRadius: 8,
    backgroundColor: "rgba(50, 48, 49, 0.8)",
    position: "relative"
  },

  addButton: {
    position: "absolute",
    top: 4,
    right: 4,
    padding: 2,
    zIndex: 10
  },

  addButtonActive: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    borderRadius: 12
  },

  tabletAddButton: {
    top: 6,
    right: 6
  },

  smallAddButton: {
    top: 3,
    right: 3
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },

  successModal: {
    width: "75%",
    maxWidth: 350,
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(76, 175, 55, 0.3)",
    backgroundColor: "rgba(26, 26, 26, 0.7)"
  },

  warningModal: {
    width: "75%",
    maxWidth: 350,
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.3)",
    backgroundColor: "rgba(26, 26, 26, 0.7)"
  },

  modalTitle: {
    color: "#FFFFFF",
    fontSize: RFValue(20),
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8
  },

  modalText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: RFValue(14),
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20
  },

  modalButton: {
    backgroundColor: "rgba(212, 175, 55, 0.2)",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)",
    minWidth: 100
  },

  modalButtonText: {
    color: "#FFD700",
    fontSize: RFValue(14),
    fontWeight: "600",
    textAlign: "center"
  },

  footerContainer: {
    paddingVertical: 14,
    alignItems: "center"
  },

  footerGradient: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.1)"
  },

  footerText: {
    color: "#D4AF37",
    fontSize: RFValue(12),
    marginTop: 8,
    fontWeight: "600",
    letterSpacing: 0.5
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(20, 812)
  },

  emptyGradient: {
    width: "100%",
    alignItems: "center"
  },

  emptyText: {
    color: "#FFFFFF",
    fontSize: RFValue(18, 812),
    fontWeight: "600",
    textAlign: "center"
  },

  errorContainer: {
    marginTop: RFValue(15, 812)
  },

  errorText: {
    color: "#FF5252",
    fontSize: RFValue(14, 812),
    textAlign: "center"
  }
})
