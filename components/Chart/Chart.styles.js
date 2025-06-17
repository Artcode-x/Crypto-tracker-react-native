import { StyleSheet } from "react-native"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)" // Темный полупрозрачный фон
  },
  modalContent: {
    width: "90%",
    maxWidth: 500,
    height: "auto",
    // backgroundColor: "white",
    backgroundColor: "rgba(50, 48, 49, 0.9)",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    // fontSize: 24,
    fontSize: RFValue(23),
    fontWeight: "bold",
    // color: "#333",
    color: "white",
    paddingBottom: "10"
  },
  closeButton: {
    marginTop: 10,

    backgroundColor: "#ff4757",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center"
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold"
  },
  chartButtons: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "rgba(75, 73, 74, 0.9)",
    borderWidth: 0.5,
    borderColor: "wheat",
    padding: 7,
    borderRadius: 15,
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
    paddingVertical: 3,
    paddingHorizontal: 15,
    alignItems: "center"
  },
  activeButton: {
    backgroundColor: "#000"
  },
  buttonText: {
    color: "#000"
  },
  activeButtonText: {
    color: "#fff"
  },
  container: {
    alignItems: "center",
    padding: "5"
  },
  image: {
    width: 30,
    height: 30,
    marginTop: 5
  },
  priceText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333"
  },
  coinInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: "2%",
    paddingLeft: "10",
    paddingRight: "10",
    alignItems: "center",
    backgroundColor: "rgba(75, 73, 74, 0.9)",
    // backgroundColor: "whitesmoke",
    // backgroundColor: "lightgreen",
    // add
    padding: "3",
    shadowColor: "#000",
    borderWidth: 1,
    borderColor: "wheat",
    borderRadius: 3,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5 // Для Android
  },
  coinInfoBox: {
    flex: 1,
    alignItems: "flex-start",
    paddingRight: 10
  },
  text: {
    color: "white",
    fontSize: RFValue(11),
    padding: 5
  },
  textMiddle: {
    color: "white",
    fontSize: RFValue(12),
    fontWeight: "bold"
  },
  textUp: {
    fontWeight: "300",
    color: "white",
    fontSize: RFValue(11)
  },
  themes: {
    marginTop: 0,
    backgroundColor: "#cccccc",
    borderRadius: 5,
    paddingVertical: 1,
    paddingHorizontal: 8,
    alignItems: "center",
    borderColor: "wheat",
    borderWidth: 1
  }
})
