import { StyleSheet, Platform } from "react-native"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"

export const styles = StyleSheet.create({
  chartButtons: {
    flexDirection: "row",
    gap: Platform.OS === "ios" ? 10 : 7,
    backgroundColor: "rgba(50, 48, 49, 0.8)",
    borderWidth: 0.5,
    borderColor: "wheat",
    padding: Platform.OS === "ios" ? 7 : 6,

    borderRadius: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 4
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5 // Для Android
  },
  chartButton: {
    marginTop: 0,
    backgroundColor: "darkgray",
    borderRadius: 5,
    paddingVertical: Platform.OS === "ios" ? 7 : 5,
    paddingHorizontal: Platform.OS === "ios" ? 20 : 18,
    alignItems: "center"
  },
  activeButton: {
    backgroundColor: "#000"
  },
  activeButtonText: {
    color: "#fff"
  },
  buttonText: {
    color: "#000",
    fontSize: RFValue(10),
    fontWeight: "bold"
  }
})
