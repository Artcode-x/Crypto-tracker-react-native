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
  }
})
