// import { Dimensions, View } from "react-native"
// import { LineChart } from "react-native-chart-kit"
// import { RFValue } from "react-native-responsive-fontsize"
// export const VolumeChart = ({ volumeData }) => {
//   return (
//     <View>
//       <LineChart
//         data={volumeData}
//         width={Dimensions.get("window").width * 0.99}
//         height={Dimensions.get("window").height * 0.2}
//         chartConfig={{
//           backgroundColor: "#1e1e1e",
//           backgroundGradientFrom: "#3a3a3a",
//           backgroundGradientTo: "#1e1e1e",
//           decimalPlaces: 0,
//           color: (opacity = 1) => `rgba(211, 211, 211, ${opacity * 0})`,
//           labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

//           style: {
//             borderRadius: 16
//           },
//           propsForDots: {
//             r: "0",
//             strokeWidth: "2",
//             stroke: "#ffa726"
//           },
//           propsForLabels: {
//             fontSize: RFValue(7)
//           }
//         }}
//         bezier
//         style={{
//           marginVertical: 8,
//           borderRadius: 16,
//           borderColor: "wheat",
//           borderWidth: 1,
//           overflow: "hidden"
//         }}
//       />
//     </View>
//   )
// }

import { ScrollView, Text, View } from "react-native"
import Svg, { Rect } from "react-native-svg"
import { styles } from "./VolumeChart.styles"

export const VolumeChart = ({ volumeData }) => {
  if (
    !volumeData ||
    !volumeData.datasets ||
    !volumeData.datasets[0] ||
    !volumeData.datasets[0].data
  ) {
    return (
      <View style={styles.volumeChartContainer}>
        <Text style={styles.noVolumeText}>No volume data</Text>
      </View>
    )
  }

  const volumeValues = volumeData.datasets[0].data
  const maxVolume = Math.max(...volumeValues)
  const chartHeight = 40 // УМЕНЬШИЛ В 2 РАЗА (было 80)
  const barWidth = 3 // Уже бары
  const spacing = 1 // Меньше отступов

  return (
    <View style={styles.volumeChartContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.volumeScroll}
      >
        <Svg width={volumeValues.length * (barWidth + spacing)} height={chartHeight}>
          {volumeValues.map((volume, index) => {
            const barHeight = (volume / maxVolume) * chartHeight
            const x = index * (barWidth + spacing)
            const y = chartHeight - barHeight

            // Цвет бара в зависимости от объема
            const opacity = volume / maxVolume
            const color = `rgba(255, 59, 48, ${0.4 + opacity * 0.6})`

            return (
              <Rect
                key={index}
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={color}
                rx={0.5}
                ry={0.5}
              />
            )
          })}
        </Svg>
      </ScrollView>
      <View style={styles.volumeStats}>
        <Text style={styles.volumeStat}>Max: {(maxVolume / 1000000).toFixed(1)}M</Text>
        <Text style={styles.volumeStat}>
          Now: {((volumeValues[volumeValues.length - 1] || 0) / 1000000).toFixed(1)}M
        </Text>
      </View>
    </View>
  )
}
