import { StyleSheet, Dimensions, Platform } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

const { width } = Dimensions.get("window")
const CARD_WIDTH = (width - 32) / 2

export const styles = StyleSheet.create({
  premiumContainer: {
    flex: 1,
    backgroundColor: "#0A0A0F"
  },

  premiumList: {
    paddingHorizontal: Platform.OS === "android" ? 9 : 8,
    paddingBottom: 100
  },

  cardContainer: {
    width: CARD_WIDTH,
    margin: Platform.OS === "android" ? 3 : 4
  },

  /* ===== КАРТОЧКА МОНЕТЫ ===== */
  premiumCoinCard: {
    borderRadius: Platform.OS === "android" ? 14 : 16,
    overflow: "hidden",
    height: Platform.OS === "android" ? 155 : 190,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6
      },
      android: {
        elevation: 4
      }
    })
  },

  cardGradient: {
    padding: Platform.OS === "android" ? 10 : 12,
    flex: 1,
    justifyContent: "space-between"
  },

  /* ===== ВЕРХНЯЯ ЧАСТЬ - Заголовок и алерты ===== */
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Platform.OS === "android" ? 8 : 10
  },

  coinInfo: {
    flex: 1,
    marginRight: Platform.OS === "android" ? 6 : 8,
    minWidth: 0
  },

  titleRow:
    Platform.OS === "android"
      ? {
          flexDirection: "row",
          alignItems: "center",
          gap: 6
        }
      : undefined,

  rankRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Platform.OS === "android" ? 0 : 4
  },

  nameContainer:
    Platform.OS === "android"
      ? {
          flex: 1,
          minWidth: 0
        }
      : undefined,

  rankText: {
    marginBottom: Platform.OS === "android" ? 2 : 0,
    fontSize: Platform.OS === "android" ? 8 : 10,
    color: "#D4AF37",
    fontWeight: "700",
    backgroundColor: "rgba(212, 175, 55, 0.15)",
    paddingHorizontal: Platform.OS === "android" ? 5 : 6,
    paddingVertical: Platform.OS === "android" ? 1 : 2,
    borderRadius: Platform.OS === "android" ? 6 : 8,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)",
    ...(Platform.OS === "android" && {
      minWidth: 24,
      textAlign: "center"
    })
  },

  crownIcon: {
    marginLeft: Platform.OS === "android" ? 2 : 4,
    marginBottom: Platform.OS === "android" ? 2 : 0
  },

  coinName: {
    fontSize: Platform.OS === "android" ? 12 : 13,
    fontWeight: "600",
    color: "#FFF",
    marginBottom: Platform.OS === "android" ? 1 : 2,
    flexShrink: 1,
    includeFontPadding: false
  },

  coinSymbol: {
    fontSize: Platform.OS === "android" ? 10 : 11,
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: "500",
    includeFontPadding: false
  },

  alertButtonContainer: {
    alignItems: "center"
  },

  alertButton: {
    width: Platform.OS === "android" ? 30 : 34,
    height: Platform.OS === "android" ? 30 : 34,
    borderRadius: Platform.OS === "android" ? 15 : 17,
    borderWidth: Platform.OS === "android" ? 1.2 : 1.5,
    borderColor: "rgba(212, 175, 55, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    position: "relative"
  },

  alertButtonActive: {
    borderColor: "#D4AF37",
    backgroundColor: "rgba(212, 175, 55, 0.1)"
  },

  alertBadge: {
    position: "absolute",
    top: Platform.OS === "android" ? -3 : -4,
    right: Platform.OS === "android" ? -3 : -4,
    backgroundColor: "#FF3B30",
    borderRadius: Platform.OS === "android" ? 7 : 8,
    minWidth: Platform.OS === "android" ? 14 : 16,
    height: Platform.OS === "android" ? 14 : 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: Platform.OS === "android" ? 1.5 : 2,
    borderColor: "#1A1A1A",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1.5
      },
      android: {
        elevation: 2
      }
    })
  },

  alertBadgeText: {
    fontSize: Platform.OS === "android" ? 8 : 9,
    color: "#FFF",
    fontWeight: "800",
    textAlign: "center",
    includeFontPadding: false
  },

  /* ===== СРЕДНЯЯ ЧАСТЬ - Цена и сумма пользователя ===== */
  middleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Platform.OS === "android" ? 10 : 14,
    minHeight: Platform.OS === "android" ? 44 : 52
  },

  priceSection: {
    flex: 1,
    marginRight: Platform.OS === "android" ? 6 : 6,
    minWidth: 0
  },

  coinPrice: {
    fontSize: Platform.OS === "android" ? RFValue(10) : RFValue(10.5),
    fontWeight: "700",
    marginBottom: 4,
    flexShrink: 1,
    includeFontPadding: false
  },

  changeContainer: {
    alignSelf: "flex-start"
  },

  changeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Platform.OS === "android" ? 5 : 6,
    paddingVertical: Platform.OS === "android" ? 2 : 3,
    borderRadius: Platform.OS === "android" ? 5 : 6,
    minWidth: Platform.OS === "android" ? 58 : 62
  },

  changeText: {
    fontSize: Platform.OS === "android" ? 9 : 9.5,
    fontWeight: "700",
    marginLeft: Platform.OS === "android" ? 2 : 3,
    flexShrink: 1,
    includeFontPadding: false
  },

  userAmountSection: {
    alignItems: "flex-end",
    flex: 1,
    minWidth: 0,
    maxWidth: "48%"
  },

  userAmount: {
    fontSize: Platform.OS === "android" ? RFValue(9.5) : RFValue(10),
    color: "#D4AF37",
    fontWeight: "700",
    textAlign: "right",
    marginBottom: Platform.OS === "android" ? 1 : 2,
    flexShrink: 1,
    includeFontPadding: false
  },

  userValue: {
    fontSize: Platform.OS === "android" ? RFValue(9) : RFValue(9.5),
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "600",
    textAlign: "right",
    flexShrink: 1,
    includeFontPadding: false
  },

  userAmountPlaceholder: {
    fontSize: Platform.OS === "android" ? 9 : 10,
    color: "rgba(255, 255, 255, 0.3)",
    fontStyle: "italic",
    textAlign: "right",
    marginBottom: Platform.OS === "android" ? 1 : 2,
    includeFontPadding: false
  },

  userValuePlaceholder: {
    fontSize: Platform.OS === "android" ? 9 : 10,
    color: "rgba(255, 255, 255, 0.3)",
    fontStyle: "italic",
    textAlign: "right",
    includeFontPadding: false
  },

  /* ===== НИЖНЯЯ ЧАСТЬ - КНОПКИ ===== */
  bottomActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Platform.OS === "android" ? 5 : 6,
    height: Platform.OS === "android" ? 28 : 30,
    marginTop: "auto"
  },

  actionButton: {
    flex: 1
  },

  actionButtonGradient: {
    flex: 1,
    borderRadius: Platform.OS === "android" ? 6 : 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: Platform.OS === "android" ? 3 : 4,
    borderWidth: 1,
    height: "100%",
    paddingHorizontal: Platform.OS === "android" ? 4 : 6
  },

  actionButtonText: {
    fontSize: Platform.OS === "android" ? RFValue(8.5) : RFValue(9),
    fontWeight: "600",
    includeFontPadding: false,
    flexShrink: 1
  },

  removeButtonText: {
    color: "#FFF"
  },

  addButtonText: {
    color: "#D4AF37"
  },

  addButtonGradient: {
    borderColor: "rgba(212, 175, 55, 0.25)",
    backgroundColor: "rgba(212, 175, 55, 0.08)"
  },

  removeButtonGradient: {
    borderColor: "rgba(255, 107, 107, 0.25)",
    backgroundColor: "rgba(255, 107, 107, 0.08)"
  },

  // ===== СТИЛИ ДЛЯ ИНДИКАТОРА СЕРВЕРА =====

  fcmIndicator: {
    marginHorizontal: 16,
    marginTop: 6,
    marginBottom: 4,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2
      },
      android: {
        elevation: 1
      }
    })
  },

  fcmIndicatorOffline: {
    borderColor: "rgba(255, 152, 0, 0.3)"
  },

  fcmIndicatorGradient: {
    paddingVertical: 4,
    paddingHorizontal: 12
  },

  fcmIndicatorContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8
  },

  fcmStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4
  },

  fcmStatusDotOnline: {
    backgroundColor: "#4CAF50",
    ...Platform.select({
      ios: {
        shadowColor: "#4CAF50",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 2
      }
    })
  },

  fcmStatusDotOffline: {
    backgroundColor: "#FF9800",
    ...Platform.select({
      ios: {
        shadowColor: "#FF9800",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 2
      }
    })
  },

  fcmIndicatorText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "500",
    flex: 1,
    textAlign: "center"
  },

  fcmIndicatorIcon: {
    marginLeft: "auto"
  },

  serverStatusContainer: {
    alignSelf: "center",
    marginVertical: 8
  },

  serverStatusBadge: {
    borderRadius: 20,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3
      },
      android: {
        elevation: 3
      }
    })
  },

  serverStatusBadgeOnline: {
    borderWidth: 1,
    borderColor: "rgba(76, 175, 80, 0.3)"
  },

  serverStatusBadgeOffline: {
    borderWidth: 1,
    borderColor: "rgba(255, 152, 0, 0.3)"
  },

  serverStatusGradient: {
    paddingHorizontal: 16,
    paddingVertical: 6
  },

  serverStatusContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6
  },

  serverStatusIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)"
  },

  serverStatusIndicatorOnline: {
    backgroundColor: "#4CAF50"
  },

  serverStatusIndicatorOffline: {
    backgroundColor: "#FF9800"
  },

  serverStatusText: {
    color: "#FFF",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5
  },

  headerServerStatus: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    gap: 6
  },

  headerServerDot: {
    width: 6,
    height: 6,
    borderRadius: 3
  },

  headerServerDotOnline: {
    backgroundColor: "#4CAF50",
    ...Platform.select({
      ios: {
        shadowColor: "#4CAF50",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 2
      }
    })
  },

  headerServerDotOffline: {
    backgroundColor: "#FF9800",
    ...Platform.select({
      ios: {
        shadowColor: "#FF9800",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 2
      }
    })
  },

  headerServerText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 10,
    fontWeight: "600"
  },

  updateStatus: {
    marginTop: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
    ...Platform.select({
      ios: {
        shadowColor: "#D4AF37",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 2
      }
    })
  },

  updateStatusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#D4AF37",
    letterSpacing: 0.3,
    marginLeft: 8
  }
})
