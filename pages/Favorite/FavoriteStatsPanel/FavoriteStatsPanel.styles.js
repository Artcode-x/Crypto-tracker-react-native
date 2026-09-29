import { Platform, StyleSheet, Dimensions } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

const { width, height } = Dimensions.get("window")

// === ОПРЕДЕЛЕНИЕ ПЛАНШЕТА ===
const isTablet = () => {
  return width >= 768 || (width >= 600 && height >= 900)
}

const TABLET = isTablet()

export const styles = StyleSheet.create({
  atelier: {
    marginHorizontal: TABLET ? width * 0.04 : width * 0.035,
    marginBottom: TABLET ? 8 : 4.5,
    // borderRadius: TABLET ? 28 : 24,
    position: "relative",
    overflow: "visible",

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: TABLET ? 7 : 6 },
        shadowOpacity: 0.25,
        shadowRadius: TABLET ? 18 : 16
      },
      android: {
        elevation: TABLET ? 12 : 10
      }
    })
  },

  case: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: TABLET ? 28 : 14 // было 28 : 24
  },

  relief: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "60%",
    borderRadius: TABLET ? 28 : 14
  },

  engraving: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: TABLET ? 28 : 14,
    borderWidth: TABLET ? 1 : 0.8,
    borderColor: "rgba(212,175,55,0.2)"
  },

  movement: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: TABLET ? 6 : 4,
    paddingHorizontal: TABLET ? 14 : 12
  },

  indicator: {
    flex: 1,
    alignItems: "center"
  },

  // === НЕБОЛЬШОЕ УВЕЛИЧЕНИЕ НА ПЛАНШЕТЕ ===
  markerGroup: {
    alignItems: "center",
    gap: TABLET ? 4 : 3
  },

  markerIcon: {
    width: TABLET ? 34 : 16,
    height: TABLET ? 34 : 16,
    borderRadius: TABLET ? 17 : 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: TABLET ? 0.9 : 0.8,
    borderColor: "rgba(212,175,55,0.25)",
    // backgroundColor: "rgba(15,15,20,0.6)",
    position: "relative",
    zIndex: 1,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: TABLET ? 2.5 : 2 },
        shadowOpacity: 0.2,
        shadowRadius: TABLET ? 4.5 : 4
      },
      android: {
        elevation: TABLET ? 3.5 : 3
      }
    })
  },

  markerData: {
    alignItems: "center"
  },

  markerValue: {
    color: "#FFFFFF",
    fontSize: RFValue(TABLET ? 16 : 14, 812),
    fontWeight: "600",
    marginBottom: TABLET ? 2 : 2,
    letterSpacing: TABLET ? 0.6 : 0.5,
    textShadowColor: "rgba(212,175,55,0.2)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: TABLET ? 7 : 6
  },

  markerLabel: {
    color: "rgba(212,175,55,0.8)",
    fontSize: RFValue(TABLET ? 10 : 8, 812),
    letterSpacing: TABLET ? 1.3 : 1.2,
    textTransform: "uppercase"
  },

  markerDivider: {
    width: 1,
    height: TABLET ? 40 : 36,
    backgroundColor: "rgba(212,175,55,0.15)",
    marginHorizontal: TABLET ? 5 : 4
  },

  // crownPulse: {
  //   position: "absolute",
  //   top: TABLET ? -5 : -4,
  //   right: TABLET ? -5 : -4,
  //   minWidth: TABLET ? 20 : 18,
  //   height: TABLET ? 20 : 18,
  //   borderRadius: TABLET ? 10 : 9,
  //   backgroundColor: "#030305",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderWidth: TABLET ? 0.9 : 0.8,
  //   borderColor: "#FFD700",
  //   ...Platform.select({
  //     ios: {
  //       shadowColor: "#FFD700",
  //       shadowOffset: { width: 0, height: 0 },
  //       shadowOpacity: TABLET ? 0.3 : 0.3,
  //       shadowRadius: TABLET ? 4.5 : 4
  //     }
  //   })
  // },
  crownPulse: {
    position: "absolute",
    top: TABLET ? -5 : -3,
    right: TABLET ? -5 : -3,
    // minWidth: TABLET ? 20 : 18,
    minWidth: TABLET ? 16 : 10,
    height: TABLET ? 16 : 10,
    borderRadius: TABLET ? 8 : 6,
    backgroundColor: "#030305",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: TABLET ? 0.9 : 0.8,
    borderColor: "#FFD700",
    zIndex: 1000,
    ...Platform.select({
      ios: {
        shadowColor: "#FFD700",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: TABLET ? 0.3 : 0.3,
        shadowRadius: TABLET ? 4.5 : 4
      }
    })
  },

  pulseText: {
    color: "#FFD700",
    fontSize: RFValue(TABLET ? 8 : 6, 812),
    fontWeight: "700",
    paddingHorizontal: TABLET ? 2 : 2
  },

  gravure: {
    position: "absolute",
    bottom: TABLET ? 8 : 6,
    right: TABLET ? 20 : 16,
    color: "rgba(212,175,55,0.12)",
    fontSize: RFValue(TABLET ? 8 : 7, 812),
    fontWeight: "300",
    letterSpacing: TABLET ? 2.2 : 2
  }
})
