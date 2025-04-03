import { Dimensions, View } from "react-native"
import { LineChart } from "react-native-chart-kit"
import { RFValue } from "react-native-responsive-fontsize"

export const CandleChart = ({ chartData }) => {
  return (
    <View>
      <LineChart
        data={chartData}
        // width={400}
        // height={500}
        width={Dimensions.get("window").width * 0.9}
        height={Dimensions.get("window").height * 0.35}
        yAxisLabel=''
        yAxisSuffix=''
        withVerticalLines={false}
        withHorizontalLines={true}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ACE1AF",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 2,

          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity * 0})`, // Цвет линий
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Цвет меток

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
        style={{
          marginVertical: 8,
          borderRadius: 16,

          alignItems: "center"
        }}
      />
    </View>
  )
}
