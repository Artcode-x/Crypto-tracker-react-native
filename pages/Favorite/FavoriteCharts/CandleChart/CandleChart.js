// import { Dimensions, View } from "react-native"
// import { CandlestickChart } from "react-native-wagmi-charts"
// import { RFValue } from "react-native-responsive-fontsize"

// export const CandleChart = ({ chartData }) => {
//   console.log(chartData.datasets[0].data) // Данные для high
//   console.log(chartData.datasets[1].data) // Данные для open
//   console.log(chartData.datasets[2].data) // Данные для close
//   console.log(chartData.datasets[3].data) // Данные для low
//   // временные метки
//   console.log(chartData.labels)

//   return (
//     <View>
//       <CandlestickChart
//         data={chartData}
//         // width={400}
//         // height={500}
//         width={Dimensions.get("window").width * 0.9}
//         height={Dimensions.get("window").height * 0.35}
//         yAxisLabel=''
//         yAxisSuffix=''
//         withVerticalLines={false}
//         withHorizontalLines={true}
//         chartConfig={{
//           backgroundColor: "#ffffff",
//           backgroundGradientFrom: "#ACE1AF",
//           backgroundGradientTo: "#ffffff",
//           decimalPlaces: 2,

//           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity * 0})`, // Цвет линий
//           labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Цвет меток

//           style: {
//             borderRadius: 16
//           },
//           propsForDots: {
//             r: "1",
//             strokeWidth: "2",
//             stroke: "#ffa726"
//           },
//           propsForLabels: {
//             fontSize: RFValue(9)
//           }
//         }}
//         style={{
//           marginVertical: 8,
//           borderRadius: 16,

//           alignItems: "center"
//         }}
//       />
//     </View>
//   )
// }
