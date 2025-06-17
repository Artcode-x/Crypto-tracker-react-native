import { StyleSheet } from "react-native"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"
export const styles = StyleSheet.create({
  containerItem: {
    paddingTop: 0,
    alignItems: "center",
    flexDirection: "row",
    height: "auto",
    flexWrap: "wrap",
    gap: 2,
    justifyContent: "space-between"
  },
  containerNames: {
    marginLeft: 10
  },
  coinName: {
    flexDirection: "row"
  },
  text: {
    color: "#fff"
  },
  textPrice: {
    color: "#fff",
    fontWeight: "400",
    //fontSize: 14
    fontSize: RFValue(11)
  },
  viewPrice: {
    // color: "#C99E10",
    fontSize: RFValue(13)
  },
  textPrice2: {
    color: "#fff",
    fontWeight: "400",
    paddingTop: 3
  },
  pricePercentage: {
    textAlign: "right"
  },
  pricePercentageS: {
    textAlign: "center",
    fontWeight: "bold",
    // fontSize: 13
    fontSize: RFValue(12)
  },
  pricePercentage2: {
    textAlign: "center",
    fontSize: RFValue(12)
  },
  priceUp: {
    color: "#00B589"
  },
  priceDown: {
    color: "#fc4422"
  },
  leftBlock: {
    flex: 1,
    alignItems: "center",
    // flexWrap: "wrap",
    paddingLeft: 5
    // paddingRight: "auto"
  },
  image: {
    alignItems: "center",
    width: 30,
    height: 30
  },
  textSymbol: {
    color: "#c8cbfa",
    textTransform: "uppercase"
  },
  otherInfo: {
    flex: 1,
    // justifyContent: "right",
    alignItems: "center"
    // paddingLeft: 5
  },
  title: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 2,
    flexWrap: "nowrap"
  },
  titleInfo: {
    color: "wheat",
    paddingBottom: 3
  },
  titleCoin: { fontSize: 19, fontWeight: "bold", color: "wheat" },
  box: {
    borderBottomColor: "#c8cbfa",
    borderBottomWidth: 1,
    borderTopColor: "#c8cbfa",
    borderTopWidth: 1,
    padding: 3
  },
  // сделать наследование
  box2: {
    // borderBottomColor: "#c8cbfa",
    // borderBottomWidth: 1,
    // borderTopColor: "#c8cbfa",
    // borderTopWidth: 1,
    // padding: 3,
    flexDirection: "row",
    // fontSize: 14,
    fontSize: RFValue(12),
    fontWeight: "bold",
    color: "#C99E10"
  },
  box3: {
    borderBottomColor: "#c8cbfa",
    borderBottomWidth: 1,
    // padding: 3,
    flexDirection: "row",
    fontSize: 16,
    fontWeight: "bold",
    color: "#C99E10",
    paddingBottom: 2
  },
  box4: {
    borderTopColor: "#c8cbfa",
    borderTopWidth: 1,
    // padding: 3,
    flexDirection: "row",
    fontSize: 16,
    fontWeight: "bold",
    color: "#C99E10",
    paddingTop: 2
  },
  smallText: {
    color: "wheat",
    fontWeight: "300",
    //fontSize: 14
    fontSize: RFValue(11.5),
    textAlign: "center"
  },
  textBox: {
    flexDirection: "row"
  },
  textBox1: {
    flexDirection: "row"
    // borderTopColor: "#c8cbfa"
    // borderTopWidth: 1
  },
  textBox2: {
    flex: 1,
    flexWrap: "wrap",
    borderBottomColor: "#c8cbfa",
    borderBottomWidth: 1
  },
  price24: {
    textAlign: "center",
    color: "#C99E10",
    fontSize: RFValue(11.5)
  }
})
