import { StyleSheet } from "react-native"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    flex: 1,
    alignItems: "center"
  },

  header: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center"
  },

  title: {
    fontSize: RFValue(17),
    color: "#fff",
    marginTop: 10
  },

  searchInput: {
    color: "#fff",
    borderBottomColor: "#c8cbfa",
    borderBottomWidth: 1,
    width: "40%",
    textAlign: "left",
    marginTop: 7,
    padding: 3
  },

  changeView: {
    color: "white",
    alignItems: "center",
    paddingTop: "3%"
  },

  openMenu: {
    //
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141414",
    width: "100%",
    paddingVertical: 50
  },

  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
    textShadowColor: "rgba(14, 2, 117, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2
  },

  // ErrorContainer для других ошибок (не 429)
  errorContainer: {
    backgroundColor: "#ffebee",
    padding: 15,
    margin: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#f44336",
    alignItems: "center"
  },

  errorText: {
    color: "#c62828",
    fontSize: RFValue(14),
    textAlign: "center",
    marginBottom: 10
  },

  retryButton: {
    backgroundColor: "gray",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5
  },

  retryButtonText: {
    color: "wheat",
    fontSize: 14,
    fontWeight: "600"
  },

  // Информационный контейнер
  infoContainer: {
    padding: 8,
    backgroundColor: "#1a1a1a",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    width: "100%"
  },

  infoText: {
    fontSize: RFValue(10),
    color: "#aaa",
    textAlign: "center"
  },

  // Баннер ошибки 429
  errorBanner: {
    backgroundColor: "#ff6b35",
    padding: 8,
    marginHorizontal: 14,
    marginVertical: 3,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    position: "relative",
    zIndex: 1000,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    width: "95%",
    alignSelf: "center"
  },

  errorBannerContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },

  errorBannerText: {
    color: "#fff",
    fontSize: RFValue(14),
    marginLeft: 8,
    flex: 1,
    fontWeight: "500"
  },
  errorBannerTitle: { fontSize: RFValue(12) },
  countdownText: { fontSize: RFValue(12) },
  countdownNumber: { fontSize: RFValue(12) },
  retryButtonSmall: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 4
    // marginLeft: 10
  },

  retryButtonTextSmall: {
    color: "#fff",
    fontSize: RFValue(11),
    fontWeight: "600"
  },

  countdownBar: {
    height: 3,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 1.5,
    marginTop: 8,
    overflow: "hidden",
    width: "100%",
    position: "absolute",
    bottom: 0.5,
    left: 0, // Изменено с 8 на 0
    right: 0, // Добавлено для центрирования
    alignSelf: "center", // Добавлено для центрирования
    width: "calc(100% - 16px)"
  },

  countdownProgress: {
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 1.5
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: 150 // ???
  },

  emptyText: {
    fontSize: 18,
    color: "#888",
    marginBottom: 20,
    textAlign: "center"
  },

  // ========== COMPACT DEBUG PANEL ==========
  infoContainer: {
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6
    // marginVertical: 3,
    // borderWidth: 0.5,
    // borderColor: "wheat"
  },

  infoText: {
    fontSize: RFValue(10),
    color: "#444",
    lineHeight: RFValue(11),
    letterSpacing: 0.05,
    fontWeight: "400"
  },

  infoLabel: {
    fontSize: RFValue(10),
    // color: "#777",
    color: "#999",
    fontWeight: "500",
    marginRight: RFValue(1)
  },

  infoValue: {
    fontSize: RFValue(9),
    color: "#999",
    fontWeight: "400",
    marginRight: 6
  },

  active: {
    color: "#34C759",
    fontSize: RFValue(8),
    fontWeight: "600"
  },

  inactive: {
    color: "#FF3B30",
    fontSize: RFValue(8),
    fontWeight: "500"
  },

  available: {
    color: "#34C759",
    fontSize: RFValue(8),
    fontWeight: "600"
  },

  unavailable: {
    color: "#8E8E93",
    fontSize: RFValue(8),
    fontWeight: "500"
  },
  ////
  // Компактный премиум баннер
  compactPremiumBanner: {
    backgroundColor: "#0C0C0C",
    paddingVertical: 7,
    paddingHorizontal: 15,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(212, 175, 55, 0.15)",
    borderTopWidth: 1,
    borderTopColor: "rgba(212, 175, 55, 0.08)",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 8,
    minHeight: 35
  },

  // Левая часть
  compactLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },

  compactIconWrapper: {
    position: "relative",
    marginRight: 12
  },

  compactIconGlow: {
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 12,
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    zIndex: -1
  },

  compactTextWrapper: {
    flex: 1
  },

  compactTitle: {
    color: "#FFF",
    fontSize: RFValue(12),
    fontWeight: "700",
    letterSpacing: 0.5,
    marginBottom: 2,
    textTransform: "uppercase",
    textShadowColor: "rgba(255, 255, 255, 0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1
  },

  compactSubtitle: {
    color: "#AAA",
    fontSize: RFValue(11),
    fontWeight: "400",
    letterSpacing: 0.3
  },

  compactTimer: {
    color: "#FFD700",
    fontWeight: "700",
    fontSize: RFValue(10.5),
    textShadowColor: "rgba(255, 215, 0, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
    marginLeft: 2
  },

  // Кнопка ретрая
  compactRetryButton: {
    backgroundColor: "rgba(212, 175, 55, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.4)",
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    minWidth: 40,
    alignItems: "center",
    marginLeft: 15
  },

  compactButtonText: {
    color: "#FFD700",
    fontSize: RFValue(11),
    fontWeight: "600",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    textShadowColor: "rgba(255, 215, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1
  },

  // Прогресс-бар
  compactProgressTrack: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    overflow: "hidden"
  },

  compactProgressBar: {
    height: "100%",
    backgroundColor: "rgba(212, 155, 55, 0.7)",
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 2
  },
  ///
  // Вариант 1 стили
  // Основной контейнер баннера
  premiumBanner: {
    borderRadius: 6,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.25)",
    backgroundColor: "rgba(255, 215, 0, 0.12)", // Легкий золотой фон
    // shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    height: 35, // Уменьшаем высоту
    justifyContent: "center" // Центрируем по вертикали
  },

  // Градиентный фон
  bannerGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 8, // Меньше отступов
    paddingHorizontal: 10,
    paddingVertical: 4,
    height: "100%"
  },

  // Блестящая иконка
  bannerIcon: {
    marginRight: 4, // Меньше отступ
    textShadowColor: "rgba(255, 215, 0, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
    transform: [{ rotate: "-5deg" }],
    fontSize: 10 // Меньше размер
  },

  // Основной текст
  // bannerText: {
  //   color: "#FFD700",
  //   fontSize: RFValue(8.5),
  //   fontWeight: "800",
  //   letterSpacing: 1.2,
  //   textTransform: "uppercase",
  //   fontStyle: "italic",
  //   textShadowColor: "rgba(0, 0, 0, 0.7)",
  //   textShadowOffset: { width: 0, height: 2 },
  //   textShadowRadius: 4,
  //   marginRight: 16,
  //   paddingVertical: 2,
  //   paddingHorizontal: 4,
  //   backgroundColor: "rgba(255, 215, 0, 0.1)",
  //   borderRadius: 4,
  //   overflow: "hidden"
  // },
  bannerText: {
    color: "#FFD700",

    fontSize: RFValue(9), // Уменьшаем шрифт
    fontWeight: "700",
    letterSpacing: 0.3, // Уменьшаем межбуквенное расстояние
    textTransform: "uppercase",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    flexShrink: 1, // Позволяет сжиматься если не хватает места
    includeFontPadding: false, // Убираем лишние отступы у шрифта
    padding: 0, // Убираем padding
    margin: 0, // Убираем margin
    lineHeight: 10 // Фиксируем высоту строки
  },
  // // Бейдж Premium
  // bannerBadge: {
  //   backgroundColor: "rgba(212, 175, 55, 0.25)",
  //   borderWidth: 1.2,
  //   borderColor: "rgba(255, 215, 0, 0.5)",
  //   paddingVertical: 4,
  //   paddingHorizontal: 10,
  //   borderRadius: 20,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.3,
  //   shadowRadius: 3,
  //   elevation: 4,
  //   minWidth: 70,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   position: "relative",
  //   overflow: "hidden"
  // },

  // Текст на бейдже
  bannerBadgeText: {
    color: "#FFD700",
    fontSize: RFValue(9.5),
    fontWeight: "900",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    textShadowColor: "rgba(255, 215, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2
  },

  // Дополнительные эффекты (опционально)
  // Добавьте эти View внутри premiumBanner для большего эффекта:

  // 1. Внутреннее свечение
  bannerInnerGlow: {
    // position: "absolute",
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    // backgroundColor: "rgba(255, 215, 0, 0.03)",
    // zIndex: -1
  },

  // 2. Угловые акценты
  bannerCornerAccent: {
    position: "absolute",
    width: 20,
    height: 20,
    borderColor: "rgba(255, 215, 0, 0.3)",
    zIndex: 1
  },

  cornerTopLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderTopLeftRadius: 10
  },

  cornerTopRight: {
    top: 0,
    right: 0,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderTopRightRadius: 10
  },

  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderBottomLeftRadius: 10
  },

  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderBottomRightRadius: 10
  },
  // Контейнер для рекламного баннера
  adBannerContainer: {
    marginLeft: 0, // Меньше отступ
    flex: 1,
    maxWidth: 140, // Уменьшаем ширину
    marginRight: 10
  }
})
