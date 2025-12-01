import { Dimensions, StyleSheet } from "react-native"
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
    padding: 5,
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
  }
})
