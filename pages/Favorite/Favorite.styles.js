import { StyleSheet } from "react-native"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"

export const styles = StyleSheet.create({
  favlist: {
    backgroundColor: "#141414",
    flex: 1,
    alignItems: "center"
  },
  favCoins: {
    marginTop: "2%",
    width: "90%"
  },

  itemContainer: {
    flex: 1,
    margin: 5,
    // backgroundColor: "#696969",
    backgroundColor: "rgba(50, 48, 49, 0.8)",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 5
  },
  list: {},
  cont: {
    flex: 1,
    justifyContent: "center",
    padding: 20
  },
  chartContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // paddingTop: "15%",
    // backgroundColor: "white",
    // backgroundColor: "rgba(50, 48, 49, 0.8)",
    backgroundColor: "rgba(75, 73, 74, 0.9)",
    elevation: 5,
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  textUp: {
    fontWeight: "300",
    color: "white",
    fontSize: RFValue(11)
  },
  modalTitle: {
    // fontSize: 24,
    fontSize: RFValue(23),
    fontWeight: "bold",
    // color: "#333",
    color: "white",
    paddingBottom: "10"
  },
  text0: { color: "white", paddingBottom: 0, paddingTop: 2, fontSize: RFValue(10) },
  text: { color: "white", paddingBottom: 5, fontSize: RFValue(10) },
  text1: { color: "white", paddingTop: 5, fontSize: RFValue(9) },
  textTit: { color: "white", fontSize: RFValue(10), paddingBottom: 5 },
  textZ: {
    color: "wheat",
    fontSize: RFValue(10)
  },
  chartButtonsClose: {
    marginTop: 10,
    flexDirection: "row",
    gap: 10,
    backgroundColor: "rgba(50, 48, 49, 0.8)",
    // borderWidth: 0.5,
    // borderColor: "wheat",
    // padding: 3,
    // borderRadius: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 4
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5 // Для Android
  },
  buttonClose: {
    marginTop: 0,
    backgroundColor: "lightgray",
    borderRadius: 5,
    borderColor: "wheat",
    borderWidth: 0.5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: "center"
  },
  closeb: { color: "black", fontSize: RFValue(14) },

  minmaxBlock: {
    flexDirection: "row",
    borderRadius: 20,
    backgroundColor: "rgba(75, 73, 74, 0.9)",
    gap: 10,
    paddingLeft: 5,
    paddingRight: 5
  },
  priceRange: {
    color: "white",
    color: "wheat"
  },
  priceBlock: {
    flexDirection: "row",
    gap: 10,
    paddingBottom: 3
  },
  priceContainer: {
    alignItems: "center"
  },
  label: {
    fontWeight: "bold",
    color: "wheat",
    fontSize: RFValue(9)
  },
  priceValue: {
    fontSize: RFValue(11),
    color: "wheat"
  },
  limits: {
    textAlign: "center",
    fontSize: RFValue(9),
    color: "wheat",
    paddingTop: 10
  },
  chartContainerStyle: {
    alignItems: "center",
    backgroundColor: "#3a3a3a",
    borderWidth: 1,
    borderColor: "wheat",
    borderRadius: 20,
    alignItems: "center"
    // padding: 10
  }
})
