import { Dimensions, Platform, StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

const { width } = Dimensions.get("window")
const isSmallScreen = width < 375
const isTablet = width > 768

export const styles = StyleSheet.create({
  list: {
    width: "90%"
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: "rgba(50, 48, 49, 0.8)",
    alignItems: "center",
    justifyContent: "center",
    padding: Platform.OS === "ios" ? 5 : 2,
    borderRadius: 5,
    position: "relative"
  },

  // Стили для кнопки добавления
  addButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)"
  },
  tabletAddButton: {
    top: 12,
    right: 12,
    padding: 10,
    borderRadius: 22
  },
  smallAddButton: {
    top: 6,
    right: 6,
    padding: 6,
    borderRadius: 18
  },
  favoriteActive: {
    backgroundColor: "rgba(0, 216, 163, 0.15)",
    borderColor: "rgba(0, 216, 163, 0.3)"
  },

  // Контейнер для иконки
  iconContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center"
  },

  // Эффект пульсации
  pulseEffect: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#00D8A3"
  },

  // Остальные стили
  modalBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalCont: {
    backgroundColor: "wheat",
    padding: 20,
    borderRadius: 10
  },
  modalT: {
    fontSize: 18,
    color: "#000"
  },
  errorMsg: {
    color: "red",
    flex: 1,
    textAlign: "center",
    padding: 20
  },
  dropdown: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "40%",
    right: "20%",
    left: "20%",
    flexDirection: "column",
    borderWidth: 2,
    borderColor: "wheat",
    borderRadius: 15,
    padding: 10,
    elevation: 5,
    backgroundColor: "rgba(50, 48, 49, 0.8)"
  },
  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    textAlign: "center",
    justifyContent: "space-between",
    gap: 20,
    alignItems: "center"
  },
  dropdownText: {
    color: "white",
    fontSize: RFValue(15),
    textAlign: "center"
  },
  changePoint: {
    color: "white"
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
    width: "70%",
    maxWidth: 350,
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(76, 175, 80, 0.3)",
    // backgroundColor: "#1A1A1A"
    backgroundColor: "rgba(26, 26, 26, 0.7)"
  },

  // Модалка предупреждения (дубликат)
  warningModal: {
    width: "75%",
    maxWidth: 350,
    alignItems: "center",
    padding: 14,
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
