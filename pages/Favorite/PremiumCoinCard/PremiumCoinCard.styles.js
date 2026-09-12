import { StyleSheet, Dimensions, Platform, PixelRatio } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

// Динамическое получение размеров
const { width: windowWidth, height: screenHeight } = Dimensions.get("window")

// Функция для определения планшета
const isTablet = () => {
  const width = windowWidth
  const height = screenHeight

  if (width >= 768) return true

  const screenRatio = Math.max(width, height) / Math.min(width, height)
  const pixelRatio = windowWidth / 360

  if (width / pixelRatio >= 600 && screenRatio < 1.6) {
    return true
  }

  return false
}

// Базовые константы для масштабирования
const BASE_WIDTH = 375
const scale = windowWidth / BASE_WIDTH

// Универсальная функция для адаптации размеров
const normalize = (size, factor = 0.5) => {
  const newSize = size * Math.min(scale, 1.2)
  return Platform.OS === "ios"
    ? Math.round(PixelRatio.roundToNearestPixel(newSize))
    : Math.round(PixelRatio.roundToNearestPixel(newSize)) - factor
}

// Адаптивная высота карточки
const getCardHeight = () => {
  const isLandscape = windowWidth > screenHeight
  const baseHeight = isLandscape
    ? screenHeight * (Platform.OS === "android" ? 0.45 : 0.4)
    : screenHeight * (Platform.OS === "android" ? 0.26 : 0.21)

  return Math.max(normalize(140), Math.min(baseHeight, normalize(190)))
}

// Динамический расчет ширины карточки
const getCardWidth = () => {
  const COLUMNS = isTablet() ? 3 : 2

  if (isTablet()) {
    const listPadding = normalize(20) * 2
    const cardMargin = normalize(4)
    const totalMargins = cardMargin * (COLUMNS * 2)
    return (windowWidth - listPadding - totalMargins) / COLUMNS
  } else {
    const listPadding = normalize(12) * 2
    const cardMargin = normalize(4)
    const totalMargins = cardMargin * 4
    return (windowWidth - listPadding - totalMargins) / 2
  }
}

const CARD_WIDTH = getCardWidth()
const CARD_HEIGHT = getCardHeight()

// Адаптивные отступы
const spacing = {
  xs: normalize(4),
  sm: normalize(6),
  md: normalize(8),
  lg: normalize(12),
  xl: normalize(16),
  xxl: normalize(20)
}

// Адаптивные размеры шрифтов
const fontSize = {
  tiny: RFValue(7.5),
  small: RFValue(8.5),
  medium: RFValue(9.5),
  large: RFValue(10.5),
  xlarge: RFValue(12),
  xxlarge: RFValue(13)
}

// Функция для адаптивных шрифтов на планшетах
const getTabletFontSize = (baseSize) => {
  return RFValue(baseSize * 0.9)
}

export const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1.1,
    borderColor: "rgba(212,175,55,0.2)",
    borderRadius: 12.5,
    width: CARD_WIDTH,
    margin: spacing.xs
  },

  premiumCoinCard: {
    borderRadius: spacing.lg,
    overflow: "hidden",
    height: isTablet() ? CARD_HEIGHT * 0.95 : CARD_HEIGHT * 0.99,
    minHeight: normalize(140),
    maxHeight: normalize(220),
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: normalize(3) },
        shadowOpacity: 0.15,
        shadowRadius: normalize(6)
      },
      android: {
        elevation: normalize(4)
      }
    })
  },

  cardGradient: {
    padding: spacing.md,
    flex: 1,
    justifyContent: "space-between"
  },

  /* ===== ВЕРХНЯЯ ЧАСТЬ - Заголовок и алерты ===== */
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.md
  },

  coinInfo: {
    flex: 1,
    marginRight: spacing.sm,
    minWidth: 0
  },

  rankRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs
  },

  rankText: {
    fontSize: isTablet() ? getTabletFontSize(8.5) : fontSize.tiny,
    color: "#D4AF37",
    fontWeight: "800",
    backgroundColor: "rgba(212, 175, 55, 0.15)",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: spacing.xs,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)",
    minWidth: normalize(28),
    textAlign: "center",
    includeFontPadding: false
  },

  crownIcon: {
    marginLeft: spacing.xs,
    includeFontPadding: false
  },

  coinName: {
    fontSize: isTablet() ? getTabletFontSize(11) : fontSize.large,
    fontWeight: "600",
    color: "#FFF",
    marginBottom: spacing.xs / 2,
    flexShrink: 1,
    includeFontPadding: false
  },

  coinSymbol: {
    fontSize: isTablet() ? getTabletFontSize(9) : fontSize.medium,
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: "500",
    includeFontPadding: false
  },

  alertButtonContainer: {
    alignItems: "center",
    justifyContent: "flex-start"
  },

  alertButton: {
    width: normalize(30),
    height: normalize(30),
    borderRadius: normalize(17),
    borderWidth: normalize(1.8),
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

  alertButtonDisabled: {
    opacity: 0.5
  },

  alertBadge: {
    position: "absolute",
    top: normalize(-4),
    right: normalize(-4),
    backgroundColor: "#FF3B30",
    borderRadius: spacing.sm,
    minWidth: normalize(16),
    height: normalize(16),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: normalize(2),
    borderColor: "#1A1A1A",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: normalize(1) },
        shadowOpacity: 0.3,
        shadowRadius: normalize(1.5)
      },
      android: {
        elevation: normalize(2)
      }
    })
  },

  alertBadgeText: {
    fontSize: isTablet() ? getTabletFontSize(6.5) : fontSize.tiny,
    color: "#FFF",
    fontWeight: "900",
    textAlign: "center",
    includeFontPadding: false
  },

  /* ===== СРЕДНЯЯ ЧАСТЬ - Цена и сумма пользователя ===== */
  middleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
    minHeight: normalize(44)
  },

  priceSection: {
    flex: 1,
    marginRight: spacing.sm,
    minWidth: 0
  },

  coinPrice: {
    fontSize: isTablet() ? getTabletFontSize(11.5) : fontSize.large,
    fontWeight: "700",
    marginBottom: spacing.xs,
    flexShrink: 1,
    includeFontPadding: false
  },

  changeContainer: {
    alignSelf: "flex-start"
  },

  changeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.xs,
    minWidth: normalize(62)
  },

  changeText: {
    fontSize: isTablet() ? getTabletFontSize(9) : fontSize.small,
    fontWeight: "700",
    marginLeft: spacing.xs,
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
    fontSize: isTablet() ? getTabletFontSize(9.5) : fontSize.large,
    color: "#D4AF37",
    fontWeight: "700",
    textAlign: "right",
    marginBottom: spacing.xs / 2,
    flexShrink: 1,
    includeFontPadding: false
  },

  userValue: {
    fontSize: isTablet() ? getTabletFontSize(8.5) : fontSize.medium,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "600",
    textAlign: "right",
    flexShrink: 1,
    includeFontPadding: false
  },

  userAmountPlaceholder: {
    fontSize: isTablet() ? getTabletFontSize(8.5) : fontSize.medium,
    color: "rgba(255, 255, 255, 0.3)",
    fontStyle: "italic",
    textAlign: "right",
    marginBottom: spacing.xs / 2,
    includeFontPadding: false
  },

  userValuePlaceholder: {
    fontSize: isTablet() ? getTabletFontSize(8.5) : fontSize.medium,
    color: "rgba(255, 255, 255, 0.3)",
    fontStyle: "italic",
    textAlign: "right",
    includeFontPadding: false
  },

  /* ===== НИЖНЯЯ ЧАСТЬ - КНОПКИ ===== */
  bottomActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm,
    height: normalize(30),
    marginTop: "auto"
  },

  actionButton: {
    flex: 1
  },

  actionButtonGradient: {
    flex: 1,
    borderRadius: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: spacing.xs,
    borderWidth: 1,
    height: "100%",
    paddingHorizontal: spacing.sm
  },

  actionButtonText: {
    fontSize: isTablet() ? getTabletFontSize(8.5) : fontSize.medium,
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

  // Адаптация для очень маленьких экранов
  ...(windowWidth < 350 && {
    premiumCoinCard: {
      height: CARD_HEIGHT / 1.1,
      borderRadius: 11,
      borderWidth: 0,
      overflow: "hidden"
    },

    coinName: {
      fontSize: fontSize.xlarge,
      color: "#FFF"
    },

    coinSymbol: {
      fontSize: fontSize.medium,
      color: "rgba(255, 255, 255, 0.6)"
    },

    coinPrice: {
      fontSize: fontSize.large
    },

    alertButton: {
      width: normalize(30),
      height: normalize(30),
      borderRadius: normalize(15),
      borderWidth: normalize(2),
      borderColor: "rgba(212, 175, 55, 0.3)",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      position: "relative"
    }
  })
})
