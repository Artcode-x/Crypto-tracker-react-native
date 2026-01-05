import { StyleSheet, Dimensions, Platform } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

const { width } = Dimensions.get("window")
const CARD_WIDTH = (width - 32) / 2
const isIOS = Platform.OS === "ios"

export const styles = StyleSheet.create({
  premiumContainer: {
    flex: 1,
    backgroundColor: "#0A0A0F"
  },

  premiumList: {
    paddingHorizontal: 8,
    paddingBottom: 100
  },

  cardContainer: {
    width: CARD_WIDTH,
    margin: 4
  },

  /* ===== КАРТОЧКА МОНЕТЫ ===== */
  premiumCoinCard: {
    borderRadius: 16,
    overflow: "hidden",
    height: 190,
    ...(isIOS
      ? {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.15,
          shadowRadius: 6
        }
      : {
          elevation: 4
        })
  },

  cardGradient: {
    padding: 12,
    flex: 1,
    justifyContent: "space-between"
  },

  /* ===== ВЕРХНЯЯ ЧАСТЬ - Заголовок и алерты ===== */
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10
  },

  coinInfo: {
    flex: 1,
    marginRight: 8,
    minWidth: 0
  },

  rankRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4
  },

  rankText: {
    fontSize: 10,
    color: "#D4AF37",
    fontWeight: "700",
    backgroundColor: "rgba(212, 175, 55, 0.15)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)"
  },

  crownIcon: {
    marginLeft: 4
  },

  coinName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFF",
    marginBottom: 2,
    flexShrink: 1
  },

  coinSymbol: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: "500"
  },

  alertButtonContainer: {
    alignItems: "center"
  },

  alertButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
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
    top: -4,
    right: -4,
    backgroundColor: "#FF3B30",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#1A1A1A",
    ...(isIOS
      ? {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 1.5
        }
      : {
          elevation: 2
        })
  },

  alertBadgeText: {
    fontSize: 9,
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
    marginBottom: 14,
    minHeight: 52
  },

  priceSection: {
    flex: 1,
    marginRight: 6,
    minWidth: 0
  },

  coinPrice: {
    fontSize: RFValue(10.5),
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
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    minWidth: 62
  },

  changeText: {
    fontSize: 9.5,
    fontWeight: "700",
    marginLeft: 3,
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
    fontSize: RFValue(10),
    color: "#D4AF37",
    fontWeight: "700",
    textAlign: "right",
    marginBottom: 2,
    flexShrink: 1,
    includeFontPadding: false
  },

  userValue: {
    fontSize: RFValue(9.5),
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "600",
    textAlign: "right",
    flexShrink: 1,
    includeFontPadding: false
  },

  userAmountPlaceholder: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.3)",
    fontStyle: "italic",
    textAlign: "right",
    marginBottom: 2,
    includeFontPadding: false
  },

  userValuePlaceholder: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.3)",
    fontStyle: "italic",
    textAlign: "right",
    includeFontPadding: false
  },

  /* ===== НИЖНЯЯ ЧАСТЬ - КНОПКИ ===== */
  bottomActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
    height: 30,
    marginTop: "auto"
  },

  actionButton: {
    flex: 1
  },

  actionButtonGradient: {
    flex: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
    borderWidth: 1,
    height: "100%",
    paddingHorizontal: 6
  },

  actionButtonText: {
    fontSize: RFValue(9),
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

  // Стили для градиентов
  addButtonGradient: {
    borderColor: "rgba(212, 175, 55, 0.25)",
    backgroundColor: "rgba(212, 175, 55, 0.08)"
  },

  removeButtonGradient: {
    borderColor: "rgba(255, 107, 107, 0.25)",
    backgroundColor: "rgba(255, 107, 107, 0.08)"
  },
  //

  // ===== СТИЛИ ДЛЯ ИНДИКАТОРА СЕРВЕРА =====

  // Вариант 1
  fcmIndicator: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    ...(isIOS
      ? {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2
        }
      : {
          elevation: 1
        })
  },

  fcmIndicatorOffline: {
    borderColor: "rgba(255, 152, 0, 0.3)"
  },

  fcmIndicatorGradient: {
    paddingVertical: 8,
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
    ...(isIOS
      ? {
          shadowColor: "#4CAF50",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 2
        }
      : {})
  },

  fcmStatusDotOffline: {
    backgroundColor: "#FF9800",
    ...(isIOS
      ? {
          shadowColor: "#FF9800",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 2
        }
      : {})
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

  // Вариант 2
  serverStatusContainer: {
    alignSelf: "center",
    marginVertical: 8
  },

  serverStatusBadge: {
    borderRadius: 20,
    overflow: "hidden",
    ...(isIOS
      ? {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3
        }
      : {
          elevation: 3
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

  // Вариант для FavoriteHeader
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
    ...(isIOS
      ? {
          shadowColor: "#4CAF50",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: 2
        }
      : {})
  },

  headerServerDotOffline: {
    backgroundColor: "#FF9800",
    ...(isIOS
      ? {
          shadowColor: "#FF9800",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: 2
        }
      : {})
  },

  headerServerText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 10,
    fontWeight: "600"
  }
})
