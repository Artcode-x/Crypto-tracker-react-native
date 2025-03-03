import { StyleSheet } from "react-native"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    flex: 1,
    alignItems: "center"
  },

  box: {
    marginTop: "2%",
    width: "90%"
  },
  //   newsItem: {
  //     padding: 10,
  //     borderBottomWidth: 1,
  //     borderBottomColor: "#ccc"
  //   },
  //   title: {
  //     fontWeight: "bold"
  //   }
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  },
  title: {
    color: "white",
    fontWeight: "bold",
    flex: 1,
    flexWrap: "wrap",
    fontSize: RFValue(11)
  },
  createdAt: {
    color: "white",
    fontSize: RFValue(11)
  }
})
