import { StyleSheet, Dimensions } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

const { width } = Dimensions.get("window")
const isSmallScreen = width < 375
const isTablet = width > 768

// Коэффициент уменьшения шрифтов для планшетов (0.9 = на 10% меньше)
const tabletFontScale = 0.9

export const styles = StyleSheet.create({
  containerItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4
  },

  // Стили для простого вида (marketView = false)
  simpleView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
    paddingRight: 6, // new
    width: "100%"
  },
  leftSection: {
    flex: 1,
    flexDirection: "column",

    justifyContent: "center",
    alignItems: "center",
    flexShrink: 1,
    marginRight: 6,
    maxWidth: "60%",
    minWidth: "50%"
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4
  },
  coinImage: {
    width: 25,
    height: 25,
    borderRadius: 14
  },
  tabletCoinImage: {
    width: 28,
    height: 28,
    borderRadius: 14
  },
  smallCoinImage: {
    width: 24,
    height: 24,
    borderRadius: 12
  },
  nameSection: {
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 1,
    width: "100%"
  },
  coinName: {
    fontSize: RFValue(11),
    fontWeight: "600",
    color: "white",
    flexShrink: 1,
    flexWrap: "nowrap",
    maxWidth: "100%",

    includeFontPadding: false,

    overflow: "hidden",
    textAlign: "center"
  },
  tabletCoinName: {
    fontSize: RFValue(11 * tabletFontScale)
  },
  smallCoinName: {
    fontSize: RFValue(10)
  },
  coinSymbol: {
    fontSize: RFValue(8),
    color: "#8B93A5",
    marginTop: 2,
    fontWeight: "500",

    includeFontPadding: false,
    textAlign: "center"
  },
  tabletCoinSymbol: {
    fontSize: RFValue(8 * tabletFontScale)
  },
  smallCoinSymbol: {
    fontSize: RFValue(7)
  },
  rightSection: {
    paddingRight: 10,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 65,
    flexShrink: 0
  },
  coinPrice: {
    fontSize: RFValue(10),
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false
  },
  tabletCoinPrice: {
    fontSize: RFValue(11 * tabletFontScale)
  },
  smallCoinPrice: {
    fontSize: RFValue(10)
  },
  priceChange: {
    fontSize: RFValue(9),
    fontWeight: "600",
    marginTop: 2,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false
  },
  tabletPriceChange: {
    fontSize: RFValue(10 * tabletFontScale)
  },
  smallPriceChange: {
    fontSize: RFValue(8)
  },

  // СТИЛИ ДЛЯ ДЕТАЛЬНОГО ВИДА (marketView = true) - Премиум дизайн
  detailedView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    borderRadius: 12,
    padding: 10,
    shadowColor: "wheat",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  leftBlock: {
    flex: 1,
    alignItems: "flex-start"
  },
  title: {
    flex: 1,
    alignItems: "flex-start",
    marginBottom: 6
  },
  titleCoin: {
    fontSize: RFValue(14),
    fontWeight: "800",
    color: "#FFD700",
    marginBottom: 6,
    textShadowColor: "rgba(255, 215, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2
  },
  tabletTitleCoin: {
    fontSize: RFValue(14 * tabletFontScale)
  },
  smallTitleCoin: {
    fontSize: RFValue(12)
  },

  // Ценовые блоки с градиентным эффектом
  priceBlock: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginBottom: 4,
    borderLeftWidth: 2,
    borderLeftColor: "#FFD700"
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: 110
  },
  priceLabel: {
    fontSize: RFValue(10),
    color: "#B8B8B8",
    fontWeight: "500"
  },
  tabletPriceLabel: {
    fontSize: RFValue(10 * tabletFontScale)
  },
  smallPriceLabel: {
    fontSize: RFValue(9)
  },
  priceValue: {
    fontSize: RFValue(11),
    fontWeight: "700",
    color: "white"
  },
  tabletPriceValue: {
    fontSize: RFValue(11 * tabletFontScale)
  },
  smallPriceValue: {
    fontSize: RFValue(10)
  },

  // Блоки изменений с иконками
  changeBlock: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginBottom: 3
  },
  changeLabel: {
    fontSize: RFValue(9),
    color: "#A0A0A0",
    fontWeight: "500",
    marginRight: 4,
    minWidth: 22
  },
  tabletChangeLabel: {
    fontSize: RFValue(9 * tabletFontScale)
  },
  smallChangeLabel: {
    fontSize: RFValue(8)
  },
  changeValue: {
    fontSize: RFValue(10),
    fontWeight: "700"
  },
  tabletChangeValue: {
    fontSize: RFValue(10 * tabletFontScale)
  },
  smallChangeValue: {
    fontSize: RFValue(9)
  },

  // Правая панель с дополнительной информацией
  otherInfo: {
    flex: 1,
    alignItems: "flex-end",
    marginLeft: 8
  },
  infoCard: {
    backgroundColor: "rgba(40, 40, 50, 0.8)",
    borderRadius: 8,
    padding: 6,
    marginBottom: 4,
    minWidth: 90,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)"
  },
  infoTitle: {
    fontSize: RFValue(9),
    color: "#FFD700",
    fontWeight: "600",
    marginBottom: 3,
    textAlign: "center"
  },
  tabletInfoTitle: {
    fontSize: RFValue(9 * tabletFontScale)
  },
  smallInfoTitle: {
    fontSize: RFValue(8)
  },
  infoValue: {
    fontSize: RFValue(10),
    color: "white",
    fontWeight: "600",
    textAlign: "center"
  },
  tabletInfoValue: {
    fontSize: RFValue(10 * tabletFontScale)
  },
  smallInfoValue: {
    fontSize: RFValue(9)
  },

  // Статистические карточки
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 3
  },
  statItem: {
    backgroundColor: "rgba(50, 50, 65, 0.7)",
    borderRadius: 6,
    padding: 5,
    marginBottom: 3,
    minWidth: 40,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.2)"
  },
  statLabel: {
    fontSize: RFValue(7),
    color: "#C0C0C0",
    fontWeight: "500",
    marginBottom: 1
  },
  tabletStatLabel: {
    fontSize: RFValue(7 * tabletFontScale)
  },
  smallStatLabel: {
    fontSize: RFValue(6)
  },
  statNumber: {
    fontSize: RFValue(8),
    color: "white",
    fontWeight: "700"
  },
  tabletStatNumber: {
    fontSize: RFValue(8 * tabletFontScale)
  },
  smallStatNumber: {
    fontSize: RFValue(7)
  },

  // Иконка монеты в детальном виде
  detailCoinImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    alignSelf: "center",
    marginTop: 6,
    borderWidth: 2,
    borderColor: "rgba(255, 215, 0, 0.3)",
    shadowColor: "#FFD700",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  tabletDetailCoinImage: {
    width: 52,
    height: 52,
    borderRadius: 26
  },
  smallDetailCoinImage: {
    width: 40,
    height: 40,
    borderRadius: 20
  },

  // Общие стили
  priceUp: {
    color: "#00D8A3"
  },
  priceDown: {
    color: "#FF6B6B"
  },
  positiveGlow: {
    textShadowColor: "rgba(0, 216, 163, 0.4)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3
  },
  negativeGlow: {
    textShadowColor: "rgba(255, 107, 107, 0.4)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3
  }
})
