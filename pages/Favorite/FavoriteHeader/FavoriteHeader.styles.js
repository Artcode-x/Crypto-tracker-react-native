import { Platform, StyleSheet, Dimensions } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

const { width, height } = Dimensions.get("window")

// === ОПРЕДЕЛЕНИЕ ТИПА ЭКРАНА ===
const isTablet = () => width >= 768 || (width >= 600 && height >= 900)
const isSmallPhone = () => width < 375 // iPhone SE, 5s и т.д.

const TABLET = isTablet()
const SMALL_PHONE = isSmallPhone()

export const styles = StyleSheet.create({
  atelier: {
    marginHorizontal: SMALL_PHONE ? width * 0.035 : width * 0.035,
    marginTop: Platform.OS === "ios" ? (SMALL_PHONE ? 8 : 12) : SMALL_PHONE ? 6 : 8,
    marginBottom: TABLET ? 12 : SMALL_PHONE ? 6 : 8,
    borderRadius: TABLET ? 32 : SMALL_PHONE ? 20 : 24,
    position: "relative",
    overflow: "hidden",
    height: TABLET ? 84 : SMALL_PHONE ? 60 : 64,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: TABLET ? 8 : SMALL_PHONE ? 4 : 6 },
        shadowOpacity: 0.25,
        shadowRadius: TABLET ? 20 : SMALL_PHONE ? 12 : 16
      },
      android: {
        elevation: TABLET ? 12 : SMALL_PHONE ? 8 : 10
      }
    })
  },

  case: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: TABLET ? 32 : SMALL_PHONE ? 20 : 24
  },

  relief: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "60%",
    borderRadius: TABLET ? 32 : SMALL_PHONE ? 20 : 24
  },

  engraving: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: TABLET ? 32 : SMALL_PHONE ? 20 : 24,
    borderWidth: TABLET ? 1 : SMALL_PHONE ? 0.6 : 0.8,
    borderColor: "rgba(212,175,55,0.2)"
  },

  movement: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: TABLET ? 20 : SMALL_PHONE ? 8 : 12,
    height: TABLET ? 84 : SMALL_PHONE ? 60 : 64,
    width: "100%"
  },

  // === ЛЕВАЯ ЧАСТЬ - ОПТИМИЗИРОВАНО ДЛЯ МАЛЕНЬКИХ ЭКРАНОВ ===
  manufacture: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: TABLET ? 16 : SMALL_PHONE ? 4 : 8,
    maxWidth: TABLET ? width * 0.58 : SMALL_PHONE ? width * 0.48 : width * 0.55 // Меньше ширина для маленьких
  },

  emblem: {
    width: TABLET ? 44 : SMALL_PHONE ? 28 : 32,
    height: TABLET ? 44 : SMALL_PHONE ? 28 : 32,
    borderRadius: TABLET ? 22 : SMALL_PHONE ? 14 : 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: TABLET ? 14 : SMALL_PHONE ? 6 : 8,
    position: "relative",
    borderWidth: TABLET ? 1 : SMALL_PHONE ? 0.6 : 0.8,
    borderColor: "rgba(212,175,55,0.3)"
  },

  emblemBase: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: TABLET ? 22 : SMALL_PHONE ? 14 : 16
  },

  emblemPatin: {
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: TABLET ? 24 : SMALL_PHONE ? 16 : 18,
    borderWidth: 0.5,
    borderColor: "rgba(212,175,55,0.1)"
  },

  caliber: {
    flex: 1
  },

  // === УМЕНЬШАЕМ ШРИФТ НА МАЛЕНЬКИХ ЭКРАНАХ ===
  caliberName: {
    color: "#FFD700",
    fontSize: RFValue(TABLET ? 18 : SMALL_PHONE ? 13 : 15, 812),
    fontWeight: "600",
    letterSpacing: TABLET ? 3 : SMALL_PHONE ? 1.5 : 2,
    marginBottom: TABLET ? 6 : SMALL_PHONE ? 2 : 3,
    textShadowColor: "rgba(212,175,55,0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: TABLET ? 10 : SMALL_PHONE ? 6 : 8,
    includeFontPadding: false,
    lineHeight: TABLET ? 24 : SMALL_PHONE ? 16 : 18
  },

  caliberMarkers: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap"
  },

  markerGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(212,175,55,0.06)",
    paddingHorizontal: TABLET ? 8 : SMALL_PHONE ? 3 : 4,
    borderRadius: TABLET ? 16 : SMALL_PHONE ? 8 : 10,
    borderWidth: 0.3,
    borderColor: "rgba(212,175,55,0.15)",
    height: TABLET ? 28 : SMALL_PHONE ? 18 : 20
  },

  markerValue: {
    color: "#FFFFFF",
    fontSize: RFValue(TABLET ? 14 : SMALL_PHONE ? 9 : 10, 812),
    fontWeight: "600",
    marginRight: TABLET ? 3 : SMALL_PHONE ? 1 : 1,
    includeFontPadding: false,
    lineHeight: TABLET ? 28 : SMALL_PHONE ? 18 : 20,
    textAlignVertical: "center"
  },

  markerValueSmall: {
    color: "rgba(255,255,255,0.8)",
    fontSize: RFValue(TABLET ? 11 : SMALL_PHONE ? 7.5 : 8, 812),
    fontWeight: "500",
    marginLeft: TABLET ? 3 : SMALL_PHONE ? 1 : 1,
    includeFontPadding: false,
    lineHeight: TABLET ? 28 : SMALL_PHONE ? 18 : 20,
    textAlignVertical: "center"
  },

  markerLabel: {
    color: "rgba(212,175,55,0.7)",
    fontSize: RFValue(TABLET ? 11 : SMALL_PHONE ? 7 : 7.5, 812),
    fontWeight: "500",
    letterSpacing: TABLET ? 0.8 : SMALL_PHONE ? 0.4 : 0.5,
    includeFontPadding: false,
    lineHeight: TABLET ? 28 : SMALL_PHONE ? 18 : 20,
    textAlignVertical: "center"
  },

  markerDivider: {
    width: 1,
    height: TABLET ? 24 : SMALL_PHONE ? 10 : 12,
    backgroundColor: "rgba(212,175,55,0.2)",
    marginHorizontal: TABLET ? 6 : SMALL_PHONE ? 2 : 3
  },

  // === ПРАВАЯ ЧАСТЬ ===
  complication: {
    flexDirection: "row",
    alignItems: "center",
    gap: TABLET ? 16 : SMALL_PHONE ? 6 : 8,
    flexShrink: 0,
    marginLeft: TABLET ? 16 : SMALL_PHONE ? 4 : 8,
    minWidth: TABLET ? 260 : SMALL_PHONE ? 130 : 150
  },

  perpetual: {
    alignItems: "flex-end",
    flexShrink: 0,
    minWidth: TABLET ? 200 : SMALL_PHONE ? 95 : 110
  },

  perpetualLabel: {
    color: "rgba(212,175,55,0.6)",
    fontSize: RFValue(TABLET ? 13 : SMALL_PHONE ? 9 : 10, 812),
    fontWeight: "600",
    letterSpacing: TABLET ? 1.2 : SMALL_PHONE ? 0.6 : 0.8,
    marginBottom: TABLET ? 2 : SMALL_PHONE ? 1 : 1,
    textTransform: "uppercase",
    includeFontPadding: false,
    lineHeight: TABLET ? 18 : SMALL_PHONE ? 11 : 12,
    textAlign: "right",
    width: "100%"
  },

  perpetualValue: {
    color: "#FFD700",
    fontSize: RFValue(TABLET ? 19 : SMALL_PHONE ? 13 : 15, 812),
    fontWeight: "700",
    textShadowColor: "rgba(212,175,55,0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: TABLET ? 10 : SMALL_PHONE ? 6 : 8,
    includeFontPadding: false,
    lineHeight: TABLET ? 28 : SMALL_PHONE ? 16 : 18,
    textAlign: "right",
    width: "100%"
  },

  crown: {
    width: TABLET ? 48 : SMALL_PHONE ? 28 : 32,
    height: TABLET ? 48 : SMALL_PHONE ? 28 : 32,
    borderRadius: TABLET ? 24 : SMALL_PHONE ? 14 : 16,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    flexShrink: 0
  },

  crownBase: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: TABLET ? 24 : SMALL_PHONE ? 14 : 16,
    borderWidth: 0.8,
    borderColor: "rgba(212,175,55,0.25)"
  },

  crownPulse: {
    position: "absolute",
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: TABLET ? 28 : SMALL_PHONE ? 18 : 20,
    borderWidth: 1,
    borderColor: "#FFD700",
    opacity: 0.3
  },

  gravure: {
    position: "absolute",
    bottom: TABLET ? 8 : SMALL_PHONE ? 4 : 6,
    right: TABLET ? 24 : SMALL_PHONE ? 12 : 16,
    color: "rgba(212,175,55,0.12)",
    fontSize: RFValue(TABLET ? 10 : SMALL_PHONE ? 6 : 7, 812),
    fontWeight: "300",
    letterSpacing: TABLET ? 3 : SMALL_PHONE ? 1.5 : 2
  }
})
