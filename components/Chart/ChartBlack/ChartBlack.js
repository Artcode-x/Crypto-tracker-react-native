import { View, Dimensions, Text } from "react-native"
import { LineChart } from "react-native-chart-kit"
import { styles } from "./ChartBlack.styles"

export const ChartBlack = ({ coinHistoryData, chartData, is30DSelected }) => {
  const { width } = Dimensions.get("window")

  // Оптимизированный расчет ширины
  const CHART_WIDTH_PERCENTAGE = 0.78
  const chartWidth = width * CHART_WIDTH_PERCENTAGE

  // Высота контейнера (чтобы график не обрезался)
  const CHART_HEIGHT = 200
  const CHART_INNER_HEIGHT = 190

  if (!coinHistoryData || coinHistoryData.length === 0 || !chartData?.prices) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>Loading chart...</Text>
      </View>
    )
  }

  // цвет линии графика
  const isPositive = chartData.prices[chartData.prices.length - 1] > chartData.prices[0]
  const lineColor = isPositive ? "#00C853" : "#FF3B30"

  // для форматирования чисел
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

    if (range < 0.001) return 6
    if (range < 0.1) return 5
    return 4
  }

  const getFilteredLabels = () => {
    const labels = chartData.labelDate || []
    if (labels.length === 0) return []

    const screenWidth = Dimensions.get("window").width

    // Определяем желаемое количество меток
    let desiredLabelsCount = 6 // По умолчанию
    if (screenWidth >= 400) desiredLabelsCount = 8
    if (screenWidth >= 500) desiredLabelsCount = 10

    // Для 30 дней меньше меток
    if (is30DSelected) {
      desiredLabelsCount = Math.floor(desiredLabelsCount * 0.8)
    }

    // Расчет шага
    const step = Math.max(1, Math.floor(labels.length / desiredLabelsCount))

    // Берем метки с рассчитанным шагом
    const filtered = labels.filter((_, index) => index % step === 0)

    if (filtered.length > 10) {
      return filtered.slice(0, -1)
    }

    return filtered
  }

  // Определяем размер шрифта в зависимости от ширины экрана
  const getFontSize = () => {
    if (width < 350) return 7 // Для маленьких экранов
    if (width < 400) return 8 // Для средних
    return 9 // Для больших
  }

  const filteredLabels = getFilteredLabels()

  return (
    <View style={styles.container}>
      {/* Контейнер с overflow: hidden для гарантированного обрезания */}
      <View style={[styles.chartOuterContainer, { height: CHART_HEIGHT }]}>
        <LineChart
          data={{
            labels: filteredLabels,
            datasets: [
              {
                data: chartData.prices || [],
                strokeWidth: 1.5,
                color: () => lineColor
              }
            ]
          }}
          // Увеличиваем ширину графика чтобы он был шире контейнера
          width={chartWidth + 40} // +40px для компенсации padding'ов
          height={CHART_INNER_HEIGHT}
          withVerticalLines={false}
          withHorizontalLines={true}
          withDots={false}
          withInnerLines={false}
          withOuterLines={false}
          fromZero={false}
          formatYLabel={formatYLabel}
          segments={getSegments()}
          yAxisOffset={0}
          chartConfig={{
            backgroundColor: "#1A1F2E", // Вместо "transparent"
            backgroundGradientFrom: "#1A1F2E", // Вместо "transparent"
            backgroundGradientTo: "#1A1F2E",
            decimalPlaces: getDecimalPlaces(),
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity * 0.1})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity * 0.6})`,
            style: {
              borderRadius: 12
            },
            // Увеличенные padding'ы для предотвращения выезда
            paddingLeft: 30,
            paddingRight: 40, // Больше справа
            paddingTop: 15,
            paddingBottom: 20,
            propsForBackgroundLines: {
              strokeWidth: 1,
              stroke: "rgba(255, 255, 255, 0.1)",
              strokeDasharray: "3,3"
            },
            propsForLabels: {
              fontSize: getFontSize(),
              fontWeight: "500"
            },
            propsForVerticalLabels: {
              fontSize: getFontSize(),
              dx: 0
            },
            propsForHorizontalLabels: {
              fontSize: getFontSize() - 1, // Метки оси X чуть меньше
              rotation: 0,
              dy: 8
            }
          }}
          bezier
          // Сдвигаем график влево чтобы компенсировать увеличенную ширину
          style={{
            marginLeft: -8,
            marginRight: -20,
            borderRadius: 12
          }}
          yAxisLabel={hasSmallNumbers() ? "$" : ""}
          yAxisSuffix={hasSmallNumbers() ? "" : ""}
          // Скрываем последние точки чтобы линия не выходила за границы
          getDotProps={(value, index) => {
            const total = chartData.prices?.length || 0
            if (index >= total - 1) {
              return {
                r: "0",
                strokeWidth: "0"
              }
            }
            return {}
          }}
        />
      </View>

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
