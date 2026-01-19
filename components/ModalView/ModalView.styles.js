// ModalView.styles.js
import { Platform, StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "transparent"
  },
  dropdownContainer: {
    position: "absolute",
    top: Platform.OS === "android" ? "16%" : "16.7%",
    right: "5%",
    backgroundColor: "transparent",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#D4AF37",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 12
    // minWidth: 140
  },
  dropdownContent: {
    backgroundColor: "rgba(30, 28, 29, 0.8)",
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.5)",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 0,
    backdropFilter: "blur(8px)"
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 4,
    borderRadius: 10
  },
  dropdownItemActive: {
    backgroundColor: "rgba(212, 175, 55, 0.12)"
  },
  separator: {
    height: 0.8,
    backgroundColor: "rgba(212, 175, 55, 0.15)",
    marginHorizontal: 12,
    marginVertical: 3
  },
  dropdownText: {
    color: "white",
    fontSize: RFValue(13),
    fontWeight: "500",
    letterSpacing: 0.3,
    paddingLeft: 15
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: "rgba(212, 175, 55, 0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8
  },
  indicator: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#D4AF37",
    position: "absolute",
    left: 18
  }
})
