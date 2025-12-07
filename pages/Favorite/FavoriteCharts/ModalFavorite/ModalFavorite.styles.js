import { StyleSheet, Dimensions, Platform } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

const { width, height } = Dimensions.get("window")
const isSmallScreen = width < 375
const isTablet = width > 768

export const styles = StyleSheet.create({
  // Компактный контейнер
  chartContainer: {
    flex: 1,
    backgroundColor: "rgba(10, 10, 15, 0.95)",
    paddingHorizontal: isSmallScreen ? 12 : 16,
    paddingTop: Platform.OS === "ios" ? 40 : 30,
    paddingBottom: 20
  },

  // Компактный заголовок
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },

  selectedCoinName: {
    fontSize: RFValue(isSmallScreen ? 18 : 20),
    fontWeight: "700",
    color: "#FFF"
  },

  selectedCoinSymbol: {
    fontSize: RFValue(12),
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: 2
  },

  modalCloseButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(212, 175, 55, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)"
  },

  // Инфо-строка
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8 // было 12
  },

  infoBlock: {
    backgroundColor: "rgba(50, 48, 49, 0.8)",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)"
  },

  infoText: {
    fontSize: RFValue(10),
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center"
  },

  infoValue: {
    fontSize: RFValue(11),
    fontWeight: "600",
    color: "#FFF",
    textAlign: "center",
    marginTop: 2
  },

  // График цены (УВЕЛИЧЕН)
  chartWrapper: {
    backgroundColor: "rgba(50, 48, 49, 0.8)",
    borderRadius: 10,
    padding: 10,
    marginBottom: 8, // было 12
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)"
  },

  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4
  },

  // Увеличенная высота графика
  chartBox: {
    height: height * 0.32, // УВЕЛИЧЕН с 0.25
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },

  // Для CandlestickChart компонента
  chartContainerStyle: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },

  box: {
    flexDirection: "row",
    width: "100%",
    height: "100%"
  },

  yAxisLabel: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: RFValue(9),
    position: "absolute",
    left: 4
  },

  // Для мини-дисплея графика
  limitContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 8,
    paddingHorizontal: 4
  },

  limitLabel: {
    fontSize: RFValue(12),
    color: "#D4AF37",
    fontWeight: "600"
  },

  limitHint: {
    fontSize: RFValue(10),
    color: "rgba(255, 255, 255, 0.5)",
    fontStyle: "italic",
    flex: 1,
    textAlign: "right",
    paddingTop: 10
  },

  // Блок цен (компактная версия - УМЕНЬШЕНА ВЫСОТА)
  priceRow: {
    flexDirection: "row",
    backgroundColor: "rgba(40, 38, 39, 0.9)",
    borderRadius: 8,
    paddingVertical: 6, // УМЕНЬШЕН
    paddingHorizontal: 4, // УМЕНЬШЕН
    marginTop: 12, // отступ low/open/close/high
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)"
  },

  priceItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 2 // УМЕНЬШЕН
  },

  priceLabel: {
    fontSize: RFValue(9),
    color: "#D4AF37",
    marginBottom: 2,
    fontWeight: "600"
  },

  priceValue: {
    fontSize: RFValue(11),
    color: "#FFF",
    fontWeight: "500"
  },

  // Volume секция (УМЕНЬШЕНА)
  volumeSection: {
    backgroundColor: "rgba(50, 48, 49, 0.8)",
    borderRadius: 10,
    padding: 2, // УМЕНЬШЕН
    marginBottom: 8, // было 12
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)"
    // height: height * 0.18 // УМЕНЬШЕН
  },

  volumeTitle: {
    color: "#D4AF37",
    fontSize: RFValue(14),
    fontWeight: "600",
    marginBottom: 2, // УМЕНЬШЕН
    textAlign: "center"
  },

  // Timeframe
  timeframeSection: {
    backgroundColor: "rgba(50, 48, 49, 0.8)",
    borderRadius: 10,
    padding: 2,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)"
  },

  selectedTimeframeContainer: {
    marginBottom: 12,
    alignItems: "center"
  },

  selectedTimeframeText: {
    fontSize: RFValue(13),
    color: "#FFF",
    fontWeight: "600"
  },

  timeframeHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2
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
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8
  },

  chartButtonsClose: {
    marginTop: 20,
    alignItems: "center"
  },

  buttonClose: {
    backgroundColor: "#D4AF37",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    minWidth: 180,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  closeButton: {
    backgroundColor: "#D4AF37",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    minWidth: 180,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)"
  },

  closeButtonText: {
    color: "#0A0A0F",
    fontSize: RFValue(14),
    fontWeight: "600",
    textAlign: "center"
  },

  closeb: {
    color: "#0A0A0F",
    fontSize: RFValue(14),
    fontWeight: "600"
  },

  // Компактные состояния (обновленная высота)
  loadingContainer: {
    height: height * 0.32, // ОБНОВЛЕНА под новую высоту графика
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 8
  },

  loadingText: {
    marginTop: 8,
    color: "#D4AF37",
    fontSize: RFValue(12)
  },

  // Santiment / Sentiment
  santimentContainer: {
    backgroundColor: "rgba(50, 48, 49, 0.8)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)"
  },

  santimentText: {
    fontSize: RFValue(12),
    color: "#FFF",
    fontWeight: "500"
  },

  // Sentiment (компактный)
  sentimentBadge: {
    backgroundColor: "rgba(50, 48, 49, 0.8)",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)"
  },

  sentimentText: {
    fontSize: RFValue(11),
    fontWeight: "500"
  },

  bullishText: {
    color: "#00D8A3",
    fontWeight: "bold"
  },

  bearishText: {
    color: "#FF4757",
    fontWeight: "bold"
  },

  bullish: {
    color: "#00D8A3"
  },

  bearish: {
    color: "#FF4757"
  },

  // Minmax блок
  minmaxBlock: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 8,
    borderRadius: 8
  },

  textUp: {
    fontWeight: "300",
    color: "white",
    fontSize: RFValue(11)
  },

  textTit: {
    color: "#D4AF37",
    fontSize: RFValue(14),
    marginTop: 6,
    marginBottom: 8,
    fontWeight: "600",
    textAlign: "center"
  },

  textZ: {
    color: "#D4AF37",
    fontWeight: "700"
  },

  // Для сетки графика
  gridLine: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.1)"
  },

  // Адаптивные размеры (обновленные)
  chartHeightSmall: {
    height: height * 0.28
  },

  chartHeightMedium: {
    height: height * 0.32
  },

  chartHeightLarge: {
    height: height * 0.38
  },

  // Адаптивные padding
  paddingSmall: {
    padding: 8
  },

  paddingMedium: {
    padding: 12
  },

  paddingLarge: {
    padding: 16
  },

  // Для темной темы
  darkBackground: {
    backgroundColor: "rgba(20, 20, 25, 0.95)"
  },

  // Эффекты
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  subtleShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },

  // Разделители
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginVertical: 10
  },

  thinDivider: {
    height: 0.5,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginVertical: 8
  },

  // Иконки
  iconWrapper: {
    padding: 4,
    borderRadius: 4
  },

  // Дополнительные стили для VolumeChart
  volumeChartContainer: {
    flex: 1,
    marginTop: 1
  },

  // Стили для лучшей читаемости цен
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
  }
})
