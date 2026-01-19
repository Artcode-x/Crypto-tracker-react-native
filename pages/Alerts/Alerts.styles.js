import { StyleSheet, Dimensions, Platform } from "react-native"
const { width } = Dimensions.get("window")

export const styles = StyleSheet.create({
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
    paddingHorizontal: 14,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(212, 175, 55, 0.15)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },

  headerTitle: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 10,
    letterSpacing: 0.3
  },

  headerStatsMini: {
    marginLeft: 16
  },

  statMini: {
    alignItems: "center"
  },

  statNumberMini: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 1
  },

  statLabelMini: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 8,
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
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 10
  },

  clearMiniText: {
    color: "#F44336",
    fontSize: 10,
    fontWeight: "700",
    marginLeft: 4
  },

  activeStats: {
    flexDirection: "row",
    alignItems: "center"
  },

  activeStatItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8
  },

  triggeredStatItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12
  },

  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4CAF50",
    marginRight: 4
  },

  triggeredDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FFD700",
    marginRight: 4
  },

  activeStatText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700"
  },

  triggeredStatText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700"
  },

  // Фильтры
  compactFilters: {
    flexDirection: "row",
    backgroundColor: "rgba(40, 40, 40, 0.6)",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)"
  },

  compactFilter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    borderRadius: 10,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)"
  },

  compactFilterActive: {
    backgroundColor: "rgba(212, 175, 55, 0.2)",
    borderColor: "rgba(212, 175, 55, 0.4)"
  },

  compactFilterText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 11,
    fontWeight: "600",
    marginLeft: 4
  },

  compactFilterTextActive: {
    color: "#FFFFFF",
    fontWeight: "700"
  },

  compactBadge: {
    marginLeft: 6,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 8,
    minWidth: 18,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3
  },

  compactBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "700"
  },

  // Список
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    paddingBottom: 40
  },

  separator: {
    height: 6
  },

  // Empty States
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40
  },

  emptyIconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(212, 175, 55, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)"
  },

  emptyTitle: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8
  },

  emptyText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18
  },

  noResults: {
    paddingVertical: 40,
    alignItems: "center"
  },

  noResultsText: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 13,
    marginTop: 8
  },

  /////

  // серверная иконка в заголовке:
  serverToggleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(170, 170, 170, 0.1)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 10,
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
    borderRadius: 8
  },
  // Таблица с анимацией подсказки
  tooltipContainer: {
    position: "absolute",
    top: 70,
    right: 20,
    zIndex: 1000,
    width: 200,
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
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)"
  },

  tooltipHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    position: "relative"
  },

  tooltipTitle: {
    color: "#FFD700",
    fontSize: 11,
    fontWeight: "700",
    marginLeft: 6,
    flex: 1,
    letterSpacing: 0.5
  },

  tooltipCloseButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4
  },

  tooltipText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 10,
    lineHeight: 14,
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
    marginRight: 10
  },

  // Pulsing ring effect
  pulseRing: {
    position: "absolute",
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    borderRadius: 13,
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
    transform: [{ scale: 1.05 }]
  }
})
