import { View, Dimensions } from "react-native"
import { LineChart } from "react-native-chart-kit"

export const ChartWhite = ({ coinHistoryData, chartData, is30DSelected }) => {
  return (
    <View>
      {coinHistoryData.length > 0 && (
        <>
          <View
            style={{
              backgroundColor:
                chartData.prices[chartData.prices.length - 1] > chartData.prices[0]
                  ? "green"
                  : "red"
            }}
          />

          <LineChart
            data={{
              labels: is30DSelected
                ? chartData.labelDate.filter((_, index) => index % 2 === 0)
                : chartData.labelDate,
              datasets: [
                {
                  data: chartData.prices,
                  strokeWidth: 4,
                  color: (opacity = 1) => {
                    const firstPrice = chartData.prices[0]
                    const lastPrice = chartData.prices[chartData.prices.length - 1]
                    return lastPrice > firstPrice
                      ? `rgba(0, 255, 0, ${opacity})`
                      : `rgba(255, 0, 0, ${opacity})`
                  }
                }
              ]
            }}
            width={Dimensions.get("window").width * 0.9} // Ширина графика
            height={Dimensions.get("window").height * 0.38}
            chartConfig={{
              backgroundGradientFrom: "#ACE1AF",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity * 0})`, // Цвет линий
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Цвет меток
              style: {},
              propsForDots: {
                r: "0" // радиус 0, чтобы скрыть точки
              },
              propsForLabels: {
                fontSize: 10 // Уменьшение шрифта меток
              }
            }}
            style={{
              borderWidth: 1,
              borderBottomColor: "wheat",
              borderTopColor: "wheat",
              marginVertical: 10,

              elevation: 10
            }}
          />
        </>
      )}
    </View>
  )
}
