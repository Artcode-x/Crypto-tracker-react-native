import { StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

export const styles = StyleSheet.create({
  // Основной контейнер диаграммы
  premiumChartContainer: {
    width: 300,
    height: 320,
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "center"
  },

  // Контейнер когда нет данных
  premiumNoDataContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 12,
    marginVertical: 20,
    width: 300,
    height: 300
  },

  // Текст когда нет данных
  premiumNoDataText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: RFValue(14),
    marginTop: 12,
    textAlign: "center",
    fontWeight: "500"
  },
  premiumChartContainer: {
    width: 300,
    height: 320,
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "center"
  }
})
