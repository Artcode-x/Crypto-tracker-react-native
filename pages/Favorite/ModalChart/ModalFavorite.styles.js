import { StyleSheet, Dimensions, Platform } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

const { width, height } = Dimensions.get("window")
const isSmallScreen = width < 375
const isTablet = width > 768

const ANDROID_STATUS_BAR_HEIGHT = Platform.OS === "android" ? 24 : 0

export const styles = StyleSheet.create({
  // Основной контейнер модалки
  modalContainer: {
    flex: 1,
    backgroundColor: "#0A0A0F"
  },

  // Фиктивный статус бар для Android
  androidStatusBar: {
    height: ANDROID_STATUS_BAR_HEIGHT,
    backgroundColor: "#0A0A0F",
    width: "100%"
  },

  scrollView: {
    flex: 1
  },

  scrollContent: {
    flexGrow: 1
  },

  // Контейнер контента
  contentContainer: {
    flex: 1,
    backgroundColor: "rgba(10, 10, 15, 0.95)",
    paddingHorizontal: isSmallScreen ? 12 : 16,
    paddingTop: Platform.OS === "ios" ? 10 : 10,
    paddingBottom: 20,
    minHeight: height - ANDROID_STATUS_BAR_HEIGHT
  },

  // Заголовок модалки
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12
  },

  coinInfo: {
    flex: 1
  },

  selectedCoinName: {
    fontSize: RFValue(isSmallScreen ? 18 : 20),
    fontWeight: "700",
    color: "#FFF",
    lineHeight: 24
  },

  selectedCoinSymbol: {
    fontSize: RFValue(12),
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: 2,
    lineHeight: 16
  },

  modalCloseButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(212, 175, 55, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)",
    marginLeft: 10
  },

  // Sentiment badge
  sentimentBadge: {
    backgroundColor: "rgba(50, 48, 49, 0.8)",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignSelf: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)"
  },

  sentimentText: {
    fontSize: RFValue(11),
    fontWeight: "600"
  },

  bullish: {
    color: "#00D8A3"
  },

  bearish: {
    color: "#FF4757"
  },

  // Инфо строка
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 8
  },

  infoBlock: {
    flex: 1,
    backgroundColor: "rgba(50, 48, 49, 0.8)",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center"
  },

  infoText: {
    fontSize: RFValue(10),
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: 2
  },

  infoValue: {
    fontSize: RFValue(11),
    fontWeight: "600",
    color: "#FFF",
    textAlign: "center"
  },

  // График цены
  chartWrapper: {
    backgroundColor: "rgba(50, 48, 49, 0.8)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)"
  },

  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12
  },

  chartTitle: {
    color: "#D4AF37",
    fontSize: RFValue(14),
    fontWeight: "600"
  },

  chartLimit: {
    fontSize: RFValue(12),
    color: "rgba(255, 255, 255, 0.6)",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6
  },

  chartBox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },

  // Блок цен
  priceRow: {
    flexDirection: "row",
    backgroundColor: "rgba(40, 38, 39, 0.9)",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)"
  },

  priceItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 2
  },

  priceLabel: {
    fontSize: RFValue(9),
    color: "#D4AF37",
    marginBottom: 2,
    fontWeight: "600"
  },

  priceValue: {
    fontSize: RFValue(11),
    fontWeight: "500"
  },

  priceLow: {
    color: "#F44336"
  },

  priceOpen: {
    color: "#FFF9"
  },

  priceClose: {
    color: "#FFF9"
  },

  priceHigh: {
    color: "#4CAF50"
  },

  // Volume секция
  volumeSection: {
    backgroundColor: "rgba(50, 48, 49, 0.8)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)"
  },

  volumeTitle: {
    color: "#D4AF37",
    fontSize: RFValue(14),
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center"
  },

  volumeChartContainer: {
    width: "100%"
  },

  // Timeframe
  timeframeSection: {
    backgroundColor: "rgba(50, 48, 49, 0.8)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)"
  },

  timeframeHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8
  },

  timeframeTitle: {
    color: "#FFF",
    fontSize: RFValue(13),
    fontWeight: "600",
    marginRight: 8
  },

  timeframeValue: {
    color: "#D4AF37",
    fontSize: RFValue(13),
    fontWeight: "700"
  },

  // Кнопки
  buttonsContainer: {
    marginTop: 8
  },

  closeButton: {
    backgroundColor: "#D4AF37",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 30,
    minWidth: 180,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  closeButtonText: {
    color: "#0A0A0F",
    fontSize: RFValue(14),
    fontWeight: "600",
    textAlign: "center"
  },

  // Загрузка
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 8,
    width: "100%"
  },

  loadingText: {
    marginTop: 8,
    color: "#D4AF37",
    fontSize: RFValue(12)
  }
})
