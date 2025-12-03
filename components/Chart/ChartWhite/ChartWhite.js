import { View, Dimensions, Text } from "react-native"
import { LineChart } from "react-native-chart-kit"
import { styles } from "./ChartWhite.styles"

export const ChartWhite = ({ coinHistoryData, chartData, is30DSelected }) => {
  const { width } = Dimensions.get("window")
  const chartWidth = width * 0.92 - 64

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

    if (Math.abs(num) < 0.000001 && num !== 0) {
      return num.toExponential(3)
    }

    if (Math.abs(num) < 0.001 && num !== 0) {
      return num.toFixed(6)
    }

    if (Math.abs(num) < 1) {
      return num.toFixed(4)
    }

    if (Math.abs(num) >= 1000000000000) {
      return (num / 1000000000000).toFixed(2) + "T"
    }

    if (Math.abs(num) >= 1000000000) {
      return (num / 1000000000).toFixed(2) + "B"
    }

    if (Math.abs(num) >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }

    if (Math.abs(num) >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }

    return num.toFixed(2)
  }

  const hasSmallNumbers = () => {
    if (!chartData?.prices) return false
    const minValue = Math.min(...chartData.prices)
    return minValue < 0.001
  }

  const getValueRangeType = () => {
    if (!chartData?.prices || chartData.prices.length === 0) return "normal"

    const maxValue = Math.max(...chartData.prices)

    if (maxValue >= 1000000000000) return "trillion"
    if (maxValue >= 1000000000) return "billion"
    if (maxValue >= 1000000) return "million"
    if (maxValue >= 1000) return "thousand"
    if (maxValue < 0.001) return "micro"
    if (maxValue < 1) return "small"

    return "normal"
  }

  const getDecimalPlaces = () => {
    if (hasSmallNumbers()) return 6
    return 2
  }

  const getSegments = () => {
    const prices = chartData.prices || []
    if (prices.length === 0) return 4

    const min = Math.min(...prices)
    const max = Math.max(...prices)
    const range = max - min

    if (range < 0.001) return 6
    if (range < 0.1) return 5
    return 4
  }

  const getYAxisSuffix = () => {
    const valueRangeType = getValueRangeType()

    switch (valueRangeType) {
      case "trillion":
        return "T"
      case "billion":
        return "B"
      case "million":
        return "M"
      case "thousand":
        return ""
      default:
        return ""
    }
  }

  const valueRangeType = getValueRangeType()
  const isLargeNumber = ["thousand", "million", "billion", "trillion"].includes(
    valueRangeType
  )

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
                strokeWidth: 2.5,
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
              fontSize: 9
            },
            propsForHorizontalLabels: {
              fontSize: 9,
              rotation: 0
            }
          }}
          bezier
          style={styles.chartStyle}
          yAxisLabel={hasSmallNumbers() ? "$" : ""}
          yAxisSuffix={getYAxisSuffix()}
        />
      </View>

      {(hasSmallNumbers() || isLargeNumber) && (
        <View
          style={[
            styles.rangeIndicator,
            {
              backgroundColor: isLargeNumber
                ? "rgba(212, 175, 55, 0.1)"
                : valueRangeType === "micro"
                ? "rgba(59, 130, 246, 0.1)"
                : "rgba(72, 187, 120, 0.1)"
            }
          ]}
        >
          <Text
            style={[
              styles.rangeBadgeText,
              {
                color: isLargeNumber
                  ? "#B7791F"
                  : valueRangeType === "micro"
                  ? "#2B6CB0"
                  : "#2F855A"
              }
            ]}
          >
            {valueRangeType === "trillion" && "💎 Trillion+ Scale"}
            {valueRangeType === "billion" && "📈 Billion Scale"}
            {valueRangeType === "million" && "📊 Million Scale"}
            {valueRangeType === "thousand" && "📉 Thousand Scale"}
            {valueRangeType === "micro" && "⚡ Micro Values"}
            {valueRangeType === "small" && "🔍 Small Values"}
            {valueRangeType === "normal" && "📱 Normal Scale"}
          </Text>
          <Text style={styles.rangeBadgeSubtext}>
            {valueRangeType === "trillion" && "Values in Trillions ($T)"}
            {valueRangeType === "billion" && "Values in Billions ($B)"}
            {valueRangeType === "million" && "Values in Millions ($M)"}
            {valueRangeType === "thousand" && "Values in Thousands ($K)"}
            {valueRangeType === "micro" && "High precision display"}
            {valueRangeType === "small" && "Displaying 4+ decimals"}
            {valueRangeType === "normal" && "Standard precision"}
          </Text>
        </View>
      )}
    </View>
  )
}
