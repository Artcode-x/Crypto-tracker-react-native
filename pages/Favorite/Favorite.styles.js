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

  statsPanel: {
    paddingHorizontal: 16,
    marginBottom: 12
  },

  statsGradient: {
    borderRadius: 12,
    padding: 9,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.15)",
    backgroundColor: "rgba(26, 26, 26, 0.8)",
    ...Platform.select({
      ios: {
        shadowColor: "#D4AF37",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4
      },
      android: {
        elevation: 3
      }
    })
  },

  compactStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  statItemCompact: {
    alignItems: "center",
    flex: 1
  },

  statNumberCompact: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFF",
    marginTop: 4
  },

  statLabelCompact: {
    fontSize: 9,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 2
  },

  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(212, 175, 55, 0.2)"
  },

  alertBadgeContainer: {
    position: "relative",
    alignItems: "center"
  },

  unreadBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#FF3B30",
    borderRadius: 6,
    minWidth: 12,
    height: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFF"
  },

  unreadBadgeText: {
    fontSize: 6,
    color: "#FFF",
    fontWeight: "700",
    textAlign: "center"
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
    padding: 14,
    flex: 1,
    justifyContent: "space-between"
  },

  /* ===== ВЕРХНЯЯ ЧАСТЬ - Заголовок и алерты ===== */
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14
  },

  coinInfo: {
    flex: 1,
    marginRight: 8
  },

  rankRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6
  },

  rankText: {
    fontSize: 11,
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
    marginBottom: 2
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
    width: 36,
    height: 36,
    borderRadius: 18,
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
    top: -5,
    right: -5,
    backgroundColor: "#FF3B30",
    borderRadius: 9,
    minWidth: 18,
    height: 18,
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
    fontSize: 10,
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
    marginBottom: Platform.OS === "ios" ? 18 : 10
  },

  priceSection: {
    flex: 1,
    marginRight: 8
  },

  coinPrice: {
    fontSize: Platform.OS === "ios" ? RFValue(12) : RFValue(11.5),
    fontWeight: "700",
    marginBottom: 6
  },

  changeContainer: {
    alignSelf: "flex-start"
  },

  changeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    // paddingVertical: 4,
    paddingVertical: Platform.OS === "ios" ? 4 : 2,
    // Platform.OS === 'ios' ?
    borderRadius: 8,
    minWidth: 70
  },

  changeText: {
    fontSize: 11,
    fontWeight: "700",
    marginLeft: 4
  },

  userAmountSection: {
    alignItems: "flex-end",
    minWidth: 70
  },

  userAmount: {
    fontSize: Platform.OS === "ios" ? RFValue(12) : RFValue(12),
    color: "#D4AF37",
    fontWeight: "700",
    textAlign: "right",
    marginBottom: 2
  },

  userValue: {
    fontSize: Platform.OS === "ios" ? RFValue(11) : RFValue(11),
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "600",
    textAlign: "right"
  },

  userAmountPlaceholder: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.3)",
    fontStyle: "italic",
    textAlign: "right",
    marginBottom: 2
  },

  userValuePlaceholder: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.3)",
    fontStyle: "italic",
    textAlign: "right"
  },

  /* ===== НИЖНЯЯ ЧАСТЬ - КНОПКИ ===== */
  bottomActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
    // height: 36
    height: 32
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
    gap: Platform.OS === "ios" ? 4 : 2,
    borderWidth: 1,
    height: "100%"
  },

  actionButtonText: {
    // fontSize: Platform.OS === "ios" ? RFValue(10) : RFValue(10),
    fontSize: RFValue(10),
    fontWeight: "600",
    includeFontPadding: false
  },

  removeButtonText: {
    color: "#FFF"
  },

  addButtonText: {
    color: "#D4AF37"
  },

  // Специфичные стили для градиентов
  addButtonGradient: {
    borderColor: "rgba(212, 175, 55, 0.25)",
    backgroundColor: "rgba(212, 175, 55, 0.08)"
  },

  removeButtonGradient: {
    borderColor: "rgba(255, 107, 107, 0.25)",
    backgroundColor: "rgba(255, 107, 107, 0.08)"
  },

  /* ===== ОСТАЛЬНЫЕ СТИЛИ ===== */

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center"
  },

  modalContainer: {
    width: width * 0.8,
    borderRadius: 16,
    overflow: "hidden"
  },

  modalGradient: {
    padding: 20
  },

  modalHeader: {
    marginBottom: 16
  },

  modalTitle: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "600",
    textAlign: "center"
  },

  modalSubtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
    textAlign: "center",
    marginTop: 4
  },

  amountInput: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#FFF",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)"
  },

  modalButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  modalButtonCancel: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center"
  },

  modalButtonSave: {
    flex: 1,
    marginLeft: 8,
    borderRadius: 10,
    overflow: "hidden"
  },

  saveButtonGradient: {
    paddingVertical: 12,
    alignItems: "center"
  },

  modalButtonTextCancel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "600"
  },

  modalButtonTextSave: {
    color: "#000",
    fontWeight: "600"
  },

  updateStatus: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center"
  },

  updateStatusText: {
    color: "#D4AF37",
    fontSize: 13,
    fontStyle: "italic",
    fontWeight: "600"
  },

  notificationPermissionButton: {
    marginTop: 16,
    borderRadius: 10,
    overflow: "hidden"
  },

  notificationPermissionGradient: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8
  },

  notificationPermissionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000"
  },

  testNotificationButton: {
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 8
  },

  testNotificationGradient: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: "rgba(33, 150, 243, 0.3)"
  },

  testNotificationText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#2196F3"
  }
})
