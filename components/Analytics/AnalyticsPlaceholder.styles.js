import { Dimensions, Platform, StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

const { width, height } = Dimensions.get("window")
const sphereSize = Math.min(width * 0.2, 88)

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030305"
  },

  // Атмосфера — рассеянный свет
  ambience: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.45,
    zIndex: 0
  },

  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: "rgba(3,3,5,0.78)",
    backdropFilter: "blur(10px)",
    borderBottomWidth: 0.4,
    borderBottomColor: "rgba(212,175,55,0.18)"
  },

  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.05,
    height: Platform.OS === "ios" ? 70 : 60,
    paddingTop: Platform.OS === "ios" ? 0 : 0
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center"
  },

  iconContainer: {
    position: "relative",
    marginRight: 12
  },

  iconPulse: {
    position: "absolute",
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 14,
    backgroundColor: "rgba(212,175,55,0.08)"
  },

  headerTitle: {
    color: "#FFD700",
    fontSize: RFValue(20, 812),
    fontWeight: "600",
    letterSpacing: 2.2,
    marginRight: 12,
    textShadowColor: "rgba(212,175,55,0.2)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center"
  },

  divider: {
    width: 1,
    height: 18,
    backgroundColor: "rgba(212,175,55,0.2)",
    marginRight: 16
  },

  status: {
    flexDirection: "row",
    alignItems: "center"
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(212,175,55,0.7)",
    marginRight: 6,
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2
  },

  statusText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: RFValue(11, 812),
    fontWeight: "400",
    letterSpacing: 0.9
  },

  // Галерея
  gallery: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: width * 0.08
  },

  pedestal: {
    alignItems: "center",
    width: "100%"
  },

  // Витрина
  vitrine: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
    position: "relative"
  },

  sphere: {
    width: sphereSize,
    height: sphereSize,
    borderRadius: sphereSize / 3,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.7,
    borderColor: "rgba(212,175,55,0.25)"
  },

  sphereInner: {
    width: sphereSize * 0.85,
    height: sphereSize * 0.85,
    borderRadius: (sphereSize * 0.85) / 2,
    backgroundColor: "rgba(3,3,5,0.92)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.4,
    borderColor: "rgba(212,175,55,0.15)"
  },

  sphereShadow: {
    position: "absolute",
    bottom: -10,
    width: sphereSize * 0.8,
    height: 10,
    borderRadius: sphereSize / 2,
    opacity: 0.15
  },

  // Этикетка
  label: {
    color: "rgba(212,175,55,0.75)",
    fontSize: RFValue(11, 812),
    fontWeight: "500",
    letterSpacing: 3.8,
    marginBottom: 6,
    textTransform: "uppercase"
  },

  caption: {
    color: "#FFFFFF",
    fontSize: RFValue(18, 812),
    fontWeight: "400",
    letterSpacing: 1.2,
    marginBottom: 20
  },

  // Декоративная линия
  division: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: width * 0.45
  },

  divisionLine: {
    flex: 1,
    height: 0.4,
    backgroundColor: "rgba(212,175,55,0.2)",
    marginHorizontal: 8
  },

  description: {
    color: "rgba(255,255,255,0.55)",
    fontSize: RFValue(13, 812),
    fontWeight: "400",
    textAlign: "center",
    lineHeight: RFValue(20, 812),
    letterSpacing: 0.6,
    marginBottom: 36
  },

  control: {
    alignItems: "center"
  },

  controlGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "rgba(212,175,55,0.22)",
    marginBottom: 8
  },

  controlText: {
    color: "#FFD700",
    fontSize: RFValue(26, 812),
    fontWeight: "200",
    lineHeight: 30,
    marginTop: -4
  },

  controlLabel: {
    color: "rgba(212,175,55,0.65)",
    fontSize: RFValue(10, 812),
    fontWeight: "400",
    letterSpacing: 1.9,
    textTransform: "uppercase"
  },

  year: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 40 : 24,
    right: width * 0.08,
    color: "rgba(212,175,55,0.12)",
    fontSize: RFValue(10, 812),
    fontWeight: "300",
    letterSpacing: 2.2
  }
})
