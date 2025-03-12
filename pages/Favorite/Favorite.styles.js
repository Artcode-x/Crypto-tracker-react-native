import { StyleSheet } from "react-native"

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
    justifyContent: "center"
  }
})
