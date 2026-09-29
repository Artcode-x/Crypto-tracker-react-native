import { StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    paddingBottom: 25
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },

  headerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(212, 175, 55, 0.3)"
  },

  title: {
    fontSize: RFValue(9),
    fontWeight: "700",
    color: "#D4AF37",
    letterSpacing: 1.5,
    marginHorizontal: 8,
    textShadowColor: "rgba(212, 175, 55, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4
  },

  gradientBar: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2
  },

  // Маркер
  marker: {
    position: "absolute",
    top: 34,
    alignItems: "center",
    transform: [{ translateX: -10 }]
  },

  markerGlow: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#D4AF37",
    opacity: 0.1,
    top: -8,
    left: -5
  },

  markerLine: {
    width: 2.5,
    height: 16,
    backgroundColor: "#D4AF37",
    borderRadius: 1.5,
    shadowColor: "#D4AF37",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3
  },

  markerDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginTop: 3,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2
  },

  markerValueContainer: {
    marginTop: 2,
    backgroundColor: "rgba(212, 175, 55, 0.15)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "rgba(212, 175, 55, 0.4)"
  },

  markerValue: {
    fontSize: RFValue(10),
    fontWeight: "bold",
    color: "#D4AF37",
    textShadowColor: "rgba(212, 175, 55, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4
  },

  // Подписи
  scaleLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingHorizontal: 2
  },

  scaleLabel: {
    fontSize: RFValue(7),
    fontWeight: "600",
    color: "rgba(212, 175, 55, 0.7)",
    letterSpacing: 0.5
  },
  markerCrystal: {
    alignItems: "center",
    marginBottom: 4
  },

  crystalPoint: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#D4AF37"
  },
  crystalCenter: {
    width: 4,
    height: 4,
    backgroundColor: "#D4AF37",
    borderRadius: 2,
    marginTop: 2
  }
})
