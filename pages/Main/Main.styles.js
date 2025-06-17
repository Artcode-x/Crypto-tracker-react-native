import { StyleSheet } from "react-native"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"
export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    flex: 1,
    alignItems: "center"
  },
  header: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginBottom: 10,
    //
    alignItems: "center"
  },
  title: {
    // fontSize: 20,
    fontSize: RFValue(17),
    color: "#fff",
    marginTop: 10
  },
  searchInput: {
    color: "#fff",
    borderBottomColor: "#c8cbfa",
    borderBottomWidth: 1,
    width: "40%",
    textAlign: "left",
    marginTop: 7,
    padding: 3
  },
  changeView: {
    color: "white",
    alignItems: "center",
    paddingTop: "3%"
  }
})
