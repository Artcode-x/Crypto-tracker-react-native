import { View, Dimensions, Text } from "react-native"
import { LineChart } from "react-native-chart-kit"
import { styles } from "./ChartWhite.styles"

export const ChartWhite = ({ coinHistoryData, chartData, is30DSelected }) => {
  const { width } = Dimensions.get("window")
  const chartWidth = width * 0.92 - 15

  if (!coinHistoryData || coinHistoryData.length === 0 || !chartData?.prices) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>Loading chart...</Text>
      </View>
    )
  }

  const isPositive = chartData.prices[chartData.prices.length - 1] > chartData.prices[0]
  const lineColor = isPositive ? "#D4AF37" : "#FF6B6B"

  const formatYLabel = (value) => {
    const num = parseFloat(value)
    if (isNaN(num)) return "0"

    // Если число меньше 0.000001
    if (Math.abs(num) < 0.000001 && num !== 0) {
      return num.toExponential(3)
    }

    // Если число между 0.000001 и 0.001
    if (Math.abs(num) < 0.001 && num !== 0) {
      return num.toFixed(6)
    }

    // Если число меньше 1
    if (Math.abs(num) < 1) {
      return num.toFixed(4)
    }

    // Для обычных чисел
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  // Ф-ия для проверки, есть ли в данных маленькие числа
  const hasSmallNumbers = () => {
    if (!chartData?.prices) return false
    const minValue = Math.min(...chartData.prices)
    return minValue < 0.001
  }

  // Настройка количества знаков после запятой в зависимости от данных
  const getDecimalPlaces = () => {
    if (hasSmallNumbers()) return 6
    return 2
  }

  // Получение количества сегментов для оси Y
  const getSegments = () => {
    const prices = chartData.prices || []
    if (prices.length === 0) return 4

    const min = Math.min(...prices)
    const max = Math.max(...prices)
    const range = max - min

    // Для очень маленьких диапазонов - увеличение сегментов
    if (range < 0.001) return 6
    if (range < 0.1) return 5
    return 4
  }

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels:
              is30DSelected && chartData.labelDate
                ? chartData.labelDate.filter((_, index) => index % 3 === 0)
                : chartData.labelDate?.filter((_, index) => index % 2 === 0) || [],
            datasets: [
              {
                data: chartData.prices || [],
                strokeWidth: 1.5,
                color: () => lineColor
              }
            ]
          }}
          width={chartWidth - 24}
          height={180}
          withVerticalLines={false}
          withHorizontalLines={true}
          withDots={false}
          withInnerLines={false}
          withOuterLines={false}
          fromZero={false}
          formatYLabel={formatYLabel}
          segments={getSegments()}
          yAxisOffset={-10}
          chartConfig={{
            backgroundColor: "#FFFFFF",
            backgroundGradientFrom: "#FFFFFF",
            backgroundGradientTo: "#FFFFFF",
            decimalPlaces: getDecimalPlaces(),
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity * 0.1})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity * 0.6})`,
            style: {
              borderRadius: 12
            },

            paddingLeft: 0,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
            propsForBackgroundLines: {
              strokeWidth: 1,
              stroke: "rgba(0, 0, 0, 0.1)",
              strokeDasharray: "3,3"
            },
            propsForLabels: {
              fontSize: hasSmallNumbers() ? 8 : 9,
              fontWeight: "500"
            },
            propsForVerticalLabels: {
              fontSize: 9,
              dx: -3
            },
            propsForHorizontalLabels: {
              fontSize: 9,
              rotation: 0
            }
          }}
          bezier
          style={styles.chartStyle}
          yAxisLabel={hasSmallNumbers() ? "$" : ""}
          yAxisSuffix={hasSmallNumbers() ? "" : ""}
        />
      </View>

      {/*  индикатор для маленьких чисел */}
      {hasSmallNumbers() && (
        <View style={styles.smallNumberIndicator}>
          <Text style={styles.smallNumberText}>
            ⚡ Displaying values with high precision
          </Text>
        </View>
      )}
    </View>
  )
}
