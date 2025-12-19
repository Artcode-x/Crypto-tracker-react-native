import { StyleSheet, Dimensions } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

export const { width } = Dimensions.get("window")

export const isSmallScreen = width < 375
export const isTablet = width > 768

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

  // ========== МОДАЛЬНЫЕ ОКНА ==========

  // Оверлей для всех модалок
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },

  // Модалка успешного добавления
  successModal: {
    width: "90%",
    maxWidth: 350,
    alignItems: "center",
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(76, 175, 80, 0.3)",
    // backgroundColor: "#1A1A1A"
    backgroundColor: "rgba(26, 26, 26, 0.7)"
  },

  // Модалка предупреждения (дубликат)
  warningModal: {
    width: "90%",
    maxWidth: 350,
    alignItems: "center",
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.3)",
    // backgroundColor: "#1A1A1A"
    backgroundColor: "rgba(26, 26, 26, 0.7)"
  },

  // Заголовок модалки
  modalTitle: {
    color: "#FFFFFF",
    fontSize: RFValue(20),
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8
  },

  // Текст модалки
  modalText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: RFValue(14),
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20
  },

  // Кнопка для обеих модалок
  modalButton: {
    backgroundColor: "rgba(212, 175, 55, 0.2)",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)",
    minWidth: 100
  },

  // Текст кнопки (используется для обеих кнопок)
  modalButtonText: {
    color: "#FFD700",
    fontSize: RFValue(14),
    fontWeight: "600",
    textAlign: "center"
  }
})
