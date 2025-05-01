import { Dimensions, View } from "react-native"
import { LineChart } from "react-native-chart-kit"
import { RFValue } from "react-native-responsive-fontsize"

export const VolumeChart = ({ volumeData }) => {
  return (
    <View>
      <LineChart
        data={volumeData}
        width={Dimensions.get("window").width * 0.99}
        height={Dimensions.get("window").height * 0.2}
        chartConfig={{
          backgroundColor: "#1e1e1e",
          backgroundGradientFrom: "#3a3a3a",
          backgroundGradientTo: "#1e1e1e",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "1",
            strokeWidth: "2",
            stroke: "#ffa726"
          },
          propsForLabels: {
            fontSize: RFValue(9)
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
          borderColor: "wheat",
          borderWidth: 1,
          overflow: "hidden"
        }}
      />
    </View>
  )
}
