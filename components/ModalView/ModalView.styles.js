import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    top: "16%",
    right: "5%",
    //  backgroundColor: "gray",
    borderWidth: 2,
    borderColor: "wheat",
    // borderRadius: 5,
    borderRadius: 15,
    padding: 10,
    elevation: 5,
    backgroundColor: "rgba(50, 48, 49, 0.8)"
  },
  dropbox: {
    borderBottomColor: "#c8cbfa",
    borderBottomWidth: 1
  },
  dropdownItem: {
    justifyContent: "center"
  },
  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10
  },
  dropdownText: {
    color: "white"
  },
  changePoint: {
    color: "white"
  }
})
