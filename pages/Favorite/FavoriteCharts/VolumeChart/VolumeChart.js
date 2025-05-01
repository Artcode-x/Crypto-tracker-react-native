// import { Dimensions, View } from "react-native"
// import { LineChart } from "react-native-wagmi-charts"
// import { RFValue } from "react-native-responsive-fontsize"

// export const VolumeChart = ({ volumeData }) => {
//   return (
//     <View>
//       <LineChart
//         data={volumeData}
//         // width={400}
//         // height={200}
//         width={Dimensions.get("window").width * 0.9}
//         height={Dimensions.get("window").height * 0.28}
//         chartConfig={{
//           backgroundColor: "#ffffff",
//           backgroundGradientFrom: "#ACE1AF",
//           backgroundGradientTo: "#ffffff",
//           decimalPlaces: 0, // кол-во знаков после запятой
//           color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
//           labelColor: (opacity = 1) => `black`,

//           style: {
//             borderRadius: 16
//           },
//           propsForDots: {
//             r: "2",
//             strokeWidth: "2",
//             stroke: "#ffa726"
//           },
//           propsForLabels: {
//             fontSize: RFValue(9)
//           }
//         }}
//         bezier
//         style={{
//           marginVertical: 8,
//           borderRadius: 16,
//           alignItems: "center"
//         }}
//       />
//     </View>
//   )
// }
