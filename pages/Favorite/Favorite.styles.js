// Favorite.styles.js
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

// Определяем количество колонок
const COLUMNS = isTablet() ? 3 : 2

// Базовые константы для масштабирования
const BASE_WIDTH = 375
const BASE_HEIGHT = 812
const scale = windowWidth / BASE_WIDTH

// Универсальная функция для адаптации размеров
const normalize = (size, factor = 0.5) => {
  const newSize = size * Math.min(scale, 1.2)
  return Platform.OS === "ios"
    ? Math.round(PixelRatio.roundToNearestPixel(newSize))
    : Math.round(PixelRatio.roundToNearestPixel(newSize)) - factor
}

// Динамический расчет ширины карточки (нужно для listInnerContainer)
const getCardWidth = () => {
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

// Функция для расчета ширины внутреннего контейнера
const getListInnerContainerWidth = () => {
  const cardMargin = normalize(4)
  if (isTablet()) {
    return CARD_WIDTH * 3 + cardMargin * 6
  } else {
    return CARD_WIDTH * 2 + cardMargin * 4
  }
}

const LIST_INNER_CONTAINER_WIDTH = getListInnerContainerWidth()

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

export const styles = StyleSheet.create({
  premiumContainer: {
    flex: 1,
    backgroundColor: "#0A0A0F"
  },

  // Внешний контейнер списка - занимает всю ширину с отступами
  premiumList: {
    paddingHorizontal: isTablet() ? spacing.xxl : spacing.lg,
    paddingBottom: spacing.xxl * 5,
    width: "100%",
    alignItems: "center"
  },

  // Внутренний контейнер - фиксированной ширины, центрируется внутри premiumList
  listInnerContainer: {
    width: LIST_INNER_CONTAINER_WIDTH,
    alignSelf: "center"
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
  },

  // ===== СТИЛИ ДЛЯ ИНДИКАТОРА СЕРВЕРА =====
  fcmIndicator: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
    borderRadius: spacing.md,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: normalize(1) },
        shadowOpacity: 0.1,
        shadowRadius: normalize(2)
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
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.lg
  },

  fcmIndicatorContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md
  },

  fcmStatusDot: {
    width: normalize(8),
    height: normalize(8),
    borderRadius: normalize(4)
  },

  fcmStatusDotOnline: {
    backgroundColor: "#4CAF50",
    ...Platform.select({
      ios: {
        shadowColor: "#4CAF50",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: normalize(2)
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
        shadowRadius: normalize(2)
      }
    })
  },

  fcmIndicatorText: {
    color: "#FFF",
    fontSize: fontSize.large,
    fontWeight: "500",
    flex: 1,
    textAlign: "center"
  },

  fcmIndicatorIcon: {
    marginLeft: "auto"
  },

  // Адаптация для очень маленьких экранов
  ...(windowWidth < 350 && {
    premiumList: {
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.xxl * 4,
      width: "100%",
      alignItems: "center"
    },

    listInnerContainer: {
      width: CARD_WIDTH * 2 + spacing.xs * 4,
      alignSelf: "center"
    }
  })
})
