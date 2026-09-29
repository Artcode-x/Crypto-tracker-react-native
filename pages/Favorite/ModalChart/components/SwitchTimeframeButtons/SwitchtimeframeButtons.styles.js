import { StyleSheet, Platform, Dimensions } from "react-native"

const { width } = Dimensions.get("window")

export const styles = StyleSheet.create({
  chartButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(26, 26, 32, 0.95)",
    borderRadius: 10,
    padding: 6,
    borderWidth: 1.5,
    borderColor: "rgba(212, 175, 55, 0.15)",
    height: 44, // Компактная высота
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6
      },
      android: {
        elevation: 4
      }
    })
  },
  chartButtonsCompact: {
    padding: 4,
    borderRadius: 8,
    height: 40
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 3,
    borderRadius: 8,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2
      },
      android: {
        elevation: 2
      }
    })
  },
  buttonContainerCompact: {
    marginHorizontal: 2,
    borderRadius: 6
  },
  activeButtonContainer: {
    ...Platform.select({
      ios: {
        shadowColor: "#D4AF37",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4
      },
      android: {
        elevation: 6
      }
    })
  },
  buttonGradient: {
    height: 32, // Уменьшенная высота (было 48+)
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)"
  },
  activeButtonGradient: {
    borderColor: "rgba(212, 175, 55, 0.35)"
  },
  buttonText: {
    fontSize: 11,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.8)",
    letterSpacing: 0.3
  },
  buttonTextCompact: {
    fontSize: 10
  },
  activeButtonText: {
    color: "#0A0A0F",
    fontWeight: "800"
  },
  buttonGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  }
})
