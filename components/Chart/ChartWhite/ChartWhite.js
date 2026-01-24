import { View, Dimensions, Text } from "react-native"
import { LineChart } from "react-native-chart-kit"
import { styles } from "./ChartWhite.styles"

export const ChartWhite = ({ coinHistoryData, chartData, is30DSelected }) => {
  const { width } = Dimensions.get("window")

  // Используем те же настройки ширины как в ChartBlack
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

  // цвет линии графика (белая тема)
  const isPositive = chartData.prices[chartData.prices.length - 1] > chartData.prices[0]
  const lineColor = isPositive ? "#10B981" : "#EF4444" // Зеленый и красный для белой темы

  // для форматирования чисел (такая же как в ChartBlack)
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

  // Ключевая функция: фильтрация меток чтобы не выезжали (такая же как в ChartBlack)
  const getFilteredLabels = () => {
    const labels = chartData.labelDate || []
    if (labels.length === 0) return []

    // Для 30 дней оставляем меньше меток
    if (is30DSelected) {
      // Берем каждую 4-ю метку, но не более 6 меток всего
      const step = Math.max(4, Math.floor(labels.length / 6))
      const filtered = labels.filter((_, index) => index % step === 0)

      // Удаляем последние 2 метки которые могут выезжать
      return filtered.length > 3 ? filtered.slice(0, -2) : filtered
    }

    // Для других периодов
    const step = Math.max(3, Math.floor(labels.length / 5))
    const filtered = labels.filter((_, index) => index % step === 0)

    // Удаляем последнюю метку которая может выезжать
    return filtered.length > 2 ? filtered.slice(0, -1) : filtered
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
            backgroundColor: "#FFFFFF", // Белый фон
            backgroundGradientFrom: "#FFFFFF", // Белый фон
            backgroundGradientTo: "#FFFFFF", // Белый фон
            decimalPlaces: getDecimalPlaces(),
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity * 0.1})`, // Черный для сетки
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity * 0.6})`, // Темно-серый для текста
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
              stroke: "rgba(0, 0, 0, 0.1)", // Светло-серая сетка
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
