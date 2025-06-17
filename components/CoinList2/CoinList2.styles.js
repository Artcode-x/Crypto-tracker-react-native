import { StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

export const styles = StyleSheet.create({
  list: {
    width: "90%"
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    // backgroundColor: "#696969",
    backgroundColor: "rgba(50, 48, 49, 0.8)",
    //
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 5
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
  errorMsg: {
    color: "red",
    flex: "1",
    textAlign: "center",
    padding: "20"
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
    justifyContent: "center"
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
