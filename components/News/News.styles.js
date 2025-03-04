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
    fontSize: RFValue(15)
  },
  createdAt: {
    color: "white",
    fontSize: RFValue(11)
  },
  //

  chartButtons: {
    justifyContent: "center",
    flexDirection: "row",
    gap: "10",
    backgroundColor: "rgba(75, 73, 74, 0.9)",
    borderWidth: 0.5,
    borderColor: "wheat",
    padding: "5",
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5 // Для Android
  },
  chartButton: {
    marginTop: 0,
    backgroundColor: "#cccccc",
    borderRadius: 5,
    paddingVertical: 7,
    paddingHorizontal: 15,
    alignItems: "center",
    fontSize: RFValue(12)
  },
  activeButton: {
    backgroundColor: "#000"
  },
  buttonText: {
    color: "#000"
  },
  activeButtonText: {
    color: "#fff"
  }
})
