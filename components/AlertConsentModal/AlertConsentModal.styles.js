import { StyleSheet, Dimensions, Platform } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

const { width, height } = Dimensions.get("window")
const isAndroid = Platform.OS === "android"

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(10, 10, 15, 0.92)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: RFValue(16),
    paddingVertical: RFValue(24)
  },
  modalContainer: {
    width: "100%",
    borderRadius: RFValue(16),
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: RFValue(8) },
    shadowOpacity: 0.3,
    shadowRadius: RFValue(16),
    elevation: 12,
    backgroundColor: "rgba(30, 30, 30, 0.95)"
  },
  gradient: {
    paddingHorizontal: RFValue(20),
    paddingVertical: RFValue(18),
    alignItems: "center"
  },
  topBorder: {
    height: RFValue(2.2),
    width: "28%",
    borderRadius: RFValue(1.1),
    marginBottom: RFValue(10)
  },

  //  ЗАГОЛОВОК
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: RFValue(14),
    width: "100%"
  },
  iconContainer: {
    position: "relative",
    marginRight: RFValue(10),
    width: RFValue(28),
    height: RFValue(28),
    justifyContent: "center",
    alignItems: "center"
  },
  bellIcon: {
    position: "absolute",
    right: -RFValue(1.5),
    bottom: -RFValue(1.5)
  },
  titleContainer: {
    flex: 1
  },
  title: {
    color: "#FFD700",
    fontSize: RFValue(15),
    fontWeight: "700",
    textAlign: "left",
    includeFontPadding: false,
    lineHeight: RFValue(17),
    letterSpacing: -0.1
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: RFValue(11),
    textAlign: "left",
    includeFontPadding: false,
    lineHeight: RFValue(13),
    marginTop: RFValue(1)
  },

  scrollContent: {
    width: "100%",
    maxHeight: height * 0.58,
    marginBottom: RFValue(14)
  },
  scrollContentContainer: {
    paddingRight: RFValue(2)
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: RFValue(9),
    padding: RFValue(9),
    marginBottom: RFValue(7)
  },
  featureText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: RFValue(10.5),
    marginLeft: RFValue(9),
    flex: 1,
    includeFontPadding: false,
    lineHeight: RFValue(15)
  },
  infoBox: {
    backgroundColor: "rgba(33, 150, 243, 0.1)",
    borderRadius: RFValue(9),
    padding: RFValue(11),
    marginVertical: RFValue(10),
    borderWidth: 1,
    borderColor: "rgba(33, 150, 243, 0.2)"
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: RFValue(7)
  },
  infoTitle: {
    color: "#2196F3",
    fontSize: RFValue(12.5),
    fontWeight: "600",
    marginLeft: RFValue(6),
    includeFontPadding: false,
    lineHeight: RFValue(15)
  },
  dataList: {
    marginBottom: RFValue(8)
  },
  dataItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: RFValue(5)
  },
  dataText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: RFValue(11.5),
    marginLeft: RFValue(7),
    includeFontPadding: false,
    lineHeight: RFValue(14)
  },
  privacyNote: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: RFValue(10.5),
    fontStyle: "italic",
    textAlign: "center",
    marginTop: RFValue(5),
    includeFontPadding: false,
    lineHeight: RFValue(13)
  },
  highlight: {
    color: "#FFD700",
    fontWeight: "600"
  },
  warningCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    borderRadius: RFValue(9),
    padding: RFValue(9),
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.2)",
    marginTop: RFValue(2)
  },
  warningText: {
    color: "#FFD700",
    fontSize: Platform.OS === "android" ? RFValue(10) : RFValue(9),
    marginLeft: RFValue(9),
    flex: 1,
    includeFontPadding: false,
    lineHeight: RFValue(14)
  },

  // КНОПКИ
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: RFValue(12),
    gap: RFValue(9)
  },
  cancelButton: {
    flex: 1,
    borderRadius: RFValue(11),
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 107, 107, 0.4)",
    position: "relative",
    height: RFValue(65)
  },
  agreeButton: {
    flex: 1,
    borderRadius: RFValue(11),
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(76, 175, 80, 0.4)",
    position: "relative",
    height: RFValue(65)
  },
  buttonBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: RFValue(10)
  },
  buttonInner: {
    padding: RFValue(11),
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    position: "relative",
    zIndex: 1
  },
  cancelButtonText: {
    color: "#FF6B6B",
    fontSize: RFValue(11),
    fontWeight: "700",
    marginTop: RFValue(5),
    textAlign: "center",
    includeFontPadding: false,
    lineHeight: RFValue(15)
  },
  agreeButtonText: {
    color: "#4CAF50",
    fontSize: RFValue(11),
    fontWeight: "700",
    marginTop: RFValue(5),
    textAlign: "center",
    includeFontPadding: false,
    lineHeight: RFValue(15)
  },
  buttonSubtext: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: RFValue(8.5),
    marginTop: RFValue(2),
    textAlign: "center",
    includeFontPadding: false,
    lineHeight: RFValue(11)
  },

  // Футер
  footer: {
    alignItems: "center",
    width: "100%"
  },
  privacyLink: {
    marginBottom: RFValue(5),
    paddingVertical: RFValue(2)
  },
  privacyLinkText: {
    color: "#2196F3",
    fontSize: RFValue(10.5),
    includeFontPadding: false,
    lineHeight: RFValue(13),
    textDecorationLine: "underline"
  },
  disclaimer: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: RFValue(9.5),
    fontStyle: "italic",
    includeFontPadding: false,
    lineHeight: RFValue(12)
  }
})
