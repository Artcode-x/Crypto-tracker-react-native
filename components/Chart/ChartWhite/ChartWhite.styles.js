import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 0
  },
  // Ключевой стиль: overflow: hidden гарантирует обрезание
  chartOuterContainer: {
    width: "100%",
    overflow: "hidden", // Это гарантирует, что ничего не выедет
    backgroundColor: "#FFFFFF", // Белый фон
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)", // Светло-серая рамка
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.1, // Более легкая тень для белой темы
    shadowRadius: 8,
    elevation: 5,
    position: "relative"
  },
  noDataContainer: {
    height: 200,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.05)", // Светло-серый фон
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)" // Светло-серая рамка
  },
  noDataText: {
    fontSize: 14,
    color: "#4A5568", // Темно-серый текст
    fontWeight: "500"
  },
  smallNumberIndicator: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(245, 158, 11, 0.1)", // Оранжевый фон для белой темы
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.2)", // Оранжевая рамка
    alignSelf: "center"
  },
  smallNumberText: {
    fontSize: 10,
    color: "#D97706", // Оранжевый текст
    fontWeight: "600"
  }
})
