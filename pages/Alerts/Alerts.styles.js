import { StyleSheet, Platform } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

export const createStyles = (
  width,
  height,
  fontScale,
  isSmallScreen,
  isTablet,
  isLandscape
) =>
  StyleSheet.create({
    safeAreaContainer: {
      flex: 1,
      backgroundColor: "#0A0A0F"
    },

    container: {
      flex: 1,
      backgroundColor: "#0A0A0F"
    },

    // Заголовок
    miniHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: isTablet ? 32 : 14, // Увеличил отступы для планшетов
      height: isTablet ? 90 : isLandscape ? 50 : 60, // Выше для планшетов
      borderBottomWidth: 1,
      borderBottomColor: "rgba(212, 175, 55, 0.15)",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 4
    },

    miniHeaderLandscape: {
      height: 50,
      paddingHorizontal: 20
    },

    headerLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1
    },

    headerTitle: {
      color: "#FFD700",
      fontSize: isTablet
        ? RFValue(28, height) // Увеличил для планшетов
        : isSmallScreen
        ? RFValue(16, height)
        : RFValue(18, height),
      fontWeight: "600",
      letterSpacing: 2,
      marginRight: isTablet ? 24 : 12,
      textShadowColor: "rgba(212,175,55,0.2)",
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 6,
      paddingLeft: isTablet ? 8 : 3
    },

    headerStatsMini: {
      marginLeft: isTablet ? 32 : 16
    },

    statMini: {
      alignItems: "center"
    },

    statNumberMini: {
      color: "#FFFFFF",
      fontSize: isTablet ? RFValue(18, height) : RFValue(11.5, height), // Увеличил для планшетов
      fontWeight: "800",
      marginBottom: 2
    },

    statLabelMini: {
      color: "rgba(255, 255, 255, 0.5)",
      fontSize: isTablet ? RFValue(12, height) : RFValue(8, height),
      fontWeight: "600",
      letterSpacing: 0.5
    },

    headerRight: {
      flexDirection: "row",
      alignItems: "center"
    },

    clearMiniButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(244, 67, 54, 0.1)",
      borderRadius: 10,
      paddingHorizontal: isTablet ? 16 : 8,
      paddingVertical: isTablet ? 8 : 4,
      marginRight: isTablet ? 20 : 10
    },

    clearMiniText: {
      color: "#F44336",
      fontSize: isTablet ? 14 : 10,
      fontWeight: "700",
      marginLeft: 6
    },

    activeStats: {
      flexDirection: "row",
      alignItems: "center"
    },

    activeStatItem: {
      flexDirection: "row",
      alignItems: "center",
      marginLeft: isTablet ? 16 : 8
    },

    triggeredStatItem: {
      flexDirection: "row",
      alignItems: "center",
      marginLeft: isTablet ? 20 : 12
    },

    activeDot: {
      width: isTablet ? 10 : 6,
      height: isTablet ? 10 : 6,
      borderRadius: isTablet ? 5 : 3,
      backgroundColor: "#4CAF50",
      marginRight: isTablet ? 8 : 4
    },

    triggeredDot: {
      width: isTablet ? 10 : 6,
      height: isTablet ? 10 : 6,
      borderRadius: isTablet ? 5 : 3,
      backgroundColor: "#FFD700",
      marginRight: isTablet ? 8 : 4
    },

    smallDot: {
      width: 4,
      height: 4,
      borderRadius: 2
    },

    activeStatText: {
      color: "#FFFFFF",
      fontSize: isTablet ? 16 : 12,
      fontWeight: "700"
    },

    triggeredStatText: {
      color: "#FFFFFF",
      fontSize: isTablet ? 16 : 12,
      fontWeight: "700"
    },

    // Фильтры
    compactFilters: {
      flexDirection: "row",
      backgroundColor: "rgba(40, 40, 40, 0.6)",
      paddingHorizontal: isTablet ? 32 : 10, // Увеличил для планшетов
      paddingVertical: isTablet ? 16 : 8,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(255, 255, 255, 0.1)"
    },

    compactFiltersLandscape: {
      paddingVertical: 8
    },

    compactFilter: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255, 255, 255, 0.07)",
      borderRadius: isTablet ? 16 : 10,
      marginHorizontal: isTablet ? 8 : 4,
      paddingVertical: isTablet ? 12 : 6,
      paddingHorizontal: isTablet ? 20 : 12,
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.1)"
    },

    compactFilterActive: {
      backgroundColor: "rgba(212, 175, 55, 0.2)",
      borderColor: "rgba(212, 175, 55, 0.4)"
    },

    compactFilterText: {
      color: "rgba(255, 255, 255, 0.8)",
      fontSize: isTablet ? 16 : isSmallScreen ? 10 : 11, // Увеличил для планшетов
      fontWeight: "600",
      marginLeft: isTablet ? 8 : 4
    },

    compactFilterTextActive: {
      color: "#FFFFFF",
      fontWeight: "700"
    },

    compactBadge: {
      marginLeft: isTablet ? 10 : 6,
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      borderRadius: 10,
      minWidth: isTablet ? 28 : 18,
      height: isTablet ? 24 : 16,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: isTablet ? 6 : 3
    },

    compactBadgeText: {
      color: "#FFFFFF",
      fontSize: isTablet ? 13 : 9,
      fontWeight: "700"
    },

    // Список - УБРАЛ columnWrapper, так как теперь одна колонка
    listContainer: {
      paddingHorizontal: isTablet ? 32 : 10, // Увеличил отступы для планшетов
      paddingVertical: isTablet ? 20 : 8,
      paddingBottom: isTablet ? 80 : 40
    },

    separator: {
      height: isTablet ? 16 : 6 // Увеличил расстояние между карточками для планшетов
    },

    // Empty States
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: isTablet ? 80 : 40
    },

    emptyIconWrapper: {
      width: isTablet ? 120 : 70,
      height: isTablet ? 120 : 70,
      borderRadius: isTablet ? 60 : 35,
      backgroundColor: "rgba(212, 175, 55, 0.1)",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: isTablet ? 32 : 16,
      borderWidth: 1,
      borderColor: "rgba(212, 175, 55, 0.2)"
    },

    emptyTitle: {
      color: "#FFD700",
      fontSize: isTablet ? 24 : 16,
      fontWeight: "600",
      marginBottom: isTablet ? 16 : 8
    },

    emptyText: {
      color: "rgba(255, 255, 255, 0.6)",
      fontSize: isTablet ? 18 : 13,
      textAlign: "center",
      lineHeight: isTablet ? 28 : 18
    },

    noResults: {
      paddingVertical: isTablet ? 100 : 40,
      alignItems: "center"
    },

    noResultsText: {
      color: "rgba(255, 255, 255, 0.5)",
      fontSize: isTablet ? 18 : 13,
      marginTop: isTablet ? 16 : 8
    },

    // серверная иконка в заголовке:
    serverToggleButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(170, 170, 170, 0.1)",
      borderRadius: 10,
      paddingHorizontal: isTablet ? 18 : 10,
      paddingVertical: isTablet ? 10 : 6,
      marginRight: isTablet ? 20 : 10,
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.1)",
      position: "relative",
      overflow: "hidden"
    },

    serverToggleButtonActive: {
      backgroundColor: "rgba(76, 175, 80, 0.15)",
      borderColor: "rgba(76, 175, 80, 0.3)"
    },

    serverToggleGradient: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: 10
    },

    // Таблица с анимацией подсказки
    tooltipContainer: {
      position: "absolute",
      zIndex: 1000,
      shadowColor: "#FFD700",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 10
    },

    tooltipGradient: {
      borderRadius: 12,
      padding: 1
    },

    tooltipContent: {
      backgroundColor: "rgba(20, 20, 25, 0.95)",
      borderRadius: 12,
      padding: isTablet ? 20 : 12,
      borderWidth: 1,
      borderColor: "rgba(212, 175, 55, 0.3)"
    },

    tooltipHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
      position: "relative"
    },

    tooltipTitle: {
      color: "#FFD700",
      fontSize: isTablet ? 15 : 11,
      fontWeight: "700",
      marginLeft: 8,
      flex: 1,
      letterSpacing: 0.5
    },

    tooltipCloseButton: {
      width: isTablet ? 28 : 20,
      height: isTablet ? 28 : 20,
      borderRadius: isTablet ? 14 : 10,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 4
    },

    tooltipText: {
      color: "rgba(255, 255, 255, 0.9)",
      fontSize: isTablet ? 14 : 10,
      lineHeight: isTablet ? 20 : 14,
      fontWeight: "500",
      letterSpacing: 0.2
    },

    tooltipArrow: {
      position: "absolute",
      bottom: -6,
      right: 10,
      width: 0,
      height: 0,
      backgroundColor: "transparent",
      borderStyle: "solid",
      borderLeftWidth: 6,
      borderRightWidth: 6,
      borderTopWidth: 6,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderTopColor: "rgba(212, 175, 55, 0.3)"
    },

    // Server toggle wrapper
    serverToggleWrapper: {
      position: "relative",
      marginRight: isTablet ? 20 : 10
    },

    // Pulsing ring effect
    pulseRing: {
      position: "absolute",
      top: -5,
      left: -5,
      right: -5,
      bottom: -5,
      borderRadius: 15,
      borderWidth: 2,
      borderColor: "#FFD700",
      backgroundColor: "rgba(212, 175, 55, 0.1)"
    },

    // Highlighted state for server toggle button
    serverToggleButtonHighlighted: {
      shadowColor: "#FFD700",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 6,
      elevation: 8,
      borderColor: "rgba(212, 175, 55, 0.5)",
      transform: [{ scale: isSmallScreen ? 1.03 : 1.05 }]
    }
  })
