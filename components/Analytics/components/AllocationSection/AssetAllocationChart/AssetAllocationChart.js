import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Text, View } from "react-native"
import {
  createDonutSegment,
  formatCurrency,
  generateProfessionalPalette,
  getContrastColor,
  getLabelPosition
} from "../ChartUtils/ChartUtils"
import Svg, {
  G,
  Path,
  Circle,
  Defs,
  Stop,
  LinearGradient as SvgLinearGradient,
  Text as SvgText
} from "react-native-svg"
import { styles } from "./AssetAllocationChart.styles"

const AssetAllocationChart = ({ portfolioMetrics }) => {
  if (!portfolioMetrics || portfolioMetrics.assets.length === 0) {
    return (
      <View style={styles.premiumNoDataContainer}>
        <MaterialCommunityIcons
          name='chart-pie'
          size={48}
          color='rgba(255, 215, 0, 0.3)'
        />
        <Text style={styles.premiumNoDataText}>No assets to display</Text>
      </View>
    )
  }

  const colors = generateProfessionalPalette(portfolioMetrics.assets.length)
  const sortedAssets = [...portfolioMetrics.assets].sort(
    (a, b) => b.allocation - a.allocation
  )

  const centerX = 150
  const centerY = 150
  const outerRadius = 120
  const innerRadius = 60
  const middleRadius = (outerRadius + innerRadius) / 2 - 8

  let currentAngle = 0
  const segmentData = []
  const smallSegments = []

  // Собираем данные о всех сегментах
  sortedAssets.forEach((asset, index) => {
    const angle = (asset.allocation / 100) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle
    const middleAngle = startAngle + angle / 2

    // Разделяем на большие и маленькие сегменты
    if (angle < 5) {
      smallSegments.push({
        id: asset.id,
        asset,
        index,
        angle,
        color: colors[index],
        textColor: getContrastColor(colors[index])
      })
    } else {
      segmentData.push({
        id: asset.id,
        asset,
        index,
        angle,
        startAngle,
        endAngle,
        middleAngle,
        color: colors[index],
        textColor: getContrastColor(colors[index])
      })
    }

    currentAngle = endAngle
  })

  return (
    <View style={styles.premiumChartContainer}>
      <Svg width={300} height={300} viewBox='0 0 300 300'>
        <Defs>
          <SvgLinearGradient
            id='centerCircleGradient'
            x1='0%'
            y1='0%'
            x2='100%'
            y2='100%'
          >
            <Stop offset='0%' stopColor='#1A1A1A' stopOpacity='0.95' />
            <Stop offset='100%' stopColor='#2A2A2A' stopOpacity='0.95' />
          </SvgLinearGradient>

          <SvgLinearGradient
            id='centerBorderGradient'
            x1='0%'
            y1='0%'
            x2='100%'
            y2='100%'
          >
            <Stop offset='0%' stopColor='rgba(255, 215, 0, 0.3)' />
            <Stop offset='100%' stopColor='rgba(255, 215, 0, 0.1)' />
          </SvgLinearGradient>
        </Defs>

        {/* Фоновое кольцо */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={outerRadius}
          fill='none'
          stroke='rgba(255, 255, 255, 0.03)'
          strokeWidth={(outerRadius - innerRadius) * 0.5}
        />

        {/* Большие сегменты диаграммы */}
        {segmentData.map((segment) => {
          const pathData = createDonutSegment(
            centerX,
            centerY,
            outerRadius,
            innerRadius,
            segment.startAngle,
            segment.endAngle
          )

          return (
            <Path
              key={`segment-${segment.id}`}
              d={pathData}
              fill={segment.color}
              stroke='rgba(255, 255, 255, 0.1)'
              strokeWidth='0.5'
              opacity={0.9}
            />
          )
        })}

        {/* Тексты на больших сегментах */}
        {segmentData.map((segment) => {
          if (segment.angle < 10) return null

          const labelPosition = getLabelPosition(
            centerX,
            centerY,
            middleRadius,
            segment.middleAngle
          )

          return (
            <G key={`text-${segment.id}`}>
              {/* Фоновый текст для читаемости */}
              <SvgText
                x={labelPosition.x}
                y={labelPosition.y - 6}
                textAnchor='middle'
                fontSize='9'
                fontWeight='800'
                fill='rgba(0, 0, 0, 0.5)'
              >
                {segment.asset.symbol?.toUpperCase().substring(0, 5)}
              </SvgText>

              <SvgText
                x={labelPosition.x}
                y={labelPosition.y + 6}
                textAnchor='middle'
                fontSize='8'
                fontWeight='800'
                fill='rgba(0, 0, 0, 0.5)'
              >
                {`${segment.asset.allocation.toFixed(1)}%`}
              </SvgText>

              {/* Основной текст */}
              <SvgText
                x={labelPosition.x}
                y={labelPosition.y - 6}
                textAnchor='middle'
                fontSize='9'
                fontWeight='800'
                fill={segment.textColor}
              >
                {segment.asset.symbol?.toUpperCase().substring(0, 5)}
              </SvgText>

              <SvgText
                x={labelPosition.x}
                y={labelPosition.y + 6}
                textAnchor='middle'
                fontSize='8'
                fontWeight='800'
                fill={segment.textColor}
              >
                {`${segment.asset.allocation.toFixed(1)}%`}
              </SvgText>
            </G>
          )
        })}

        {/* Центральный круг с информацией */}
        <G>
          <Circle
            cx={centerX}
            cy={centerY}
            r={innerRadius - 2}
            fill='url(#centerCircleGradient)'
            stroke='url(#centerBorderGradient)'
            strokeWidth='2'
          />

          <SvgText
            x={centerX}
            y={centerY - 10}
            textAnchor='middle'
            fontSize='12'
            fontWeight='800'
            fill='#FFFFFF'
          >
            {formatCurrency(portfolioMetrics.totalValue, 1)}
          </SvgText>

          <SvgText
            x={centerX}
            y={centerY + 4}
            textAnchor='middle'
            fontSize='9'
            fill='rgba(255, 255, 255, 0.9)'
            fontWeight='500'
          >
            Total Value
          </SvgText>

          <SvgText
            x={centerX}
            y={centerY + 18}
            textAnchor='middle'
            fontSize='10'
            fontWeight='700'
            fill='#FFD700'
          >
            {`${portfolioMetrics.totalAssets} ${
              portfolioMetrics.totalAssets !== 1 ? "assets" : "asset"
            }`}
          </SvgText>
        </G>
      </Svg>
    </View>
  )
}
// return ()

export default AssetAllocationChart
