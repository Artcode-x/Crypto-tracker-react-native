import { StyleSheet, Dimensions } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

const { width } = Dimensions.get("window")
const isSmallScreen = width < 375
const isTablet = width > 768

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
  tabletAddButton: {
    top: 6,
    right: 6
  },
  smallAddButton: {
    top: 3,
    right: 3
  },
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
  modalT2: {
    fontSize: 18,
    color: "red"
  },
  errorMsg: {
    color: "red",
    flex: 1,
    textAlign: "center",
    padding: 20,
    fontSize: RFValue(14)
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
