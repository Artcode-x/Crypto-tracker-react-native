import { StyleSheet } from "react-native"

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
    fontWeight: "400"
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
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 13
  },
  pricePercentage2: {
    textAlign: "center"
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
    flexWrap: "wrap"
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
    fontSize: 14,
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
  }
})
