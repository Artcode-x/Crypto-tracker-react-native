import { View, Text, TouchableOpacity } from "react-native"
import { styles } from "./SwitchtimeframeButtons.styles"
import { useDispatch } from "react-redux"
import { setChartDays } from "../../../store/reducersSlice"

export const SwitchTimeframeButtons = ({ chartDays }) => {
  const dispatch = useDispatch()

  const switch1 = (days) => {
    dispatch(setChartDays(days))
  }
  return (
    <>
      <View style={styles.chartButtons}>
        <TouchableOpacity onPress={() => switch1("1h")}>
          <Text style={[styles.chartButton, chartDays === "1h" && styles.activeButton]}>
            <Text
              style={[styles.buttonText, chartDays === "1h" && styles.activeButtonText]}
            >
              1H
            </Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => switch1("4h")}>
          <Text style={[styles.chartButton, chartDays === "4h" && styles.activeButton]}>
            <Text
              style={[styles.buttonText, chartDays === "4h" && styles.activeButtonText]}
            >
              4H
            </Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => switch1("1d")}>
          <Text style={[styles.chartButton, chartDays === "1d" && styles.activeButton]}>
            <Text
              style={[styles.buttonText, chartDays === "1d" && styles.activeButtonText]}
            >
              1D
            </Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => switch1("1w")}>
          <Text style={[styles.chartButton, chartDays === "1w" && styles.activeButton]}>
            <Text
              style={[styles.buttonText, chartDays === "1w" && styles.activeButtonText]}
            >
              1W
            </Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => switch1("1M")}>
          <Text style={[styles.chartButton, chartDays === "1M" && styles.activeButton]}>
            <Text
              style={[styles.buttonText, chartDays === "1M" && styles.activeButtonText]}
            >
              1M
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </>
  )
}
