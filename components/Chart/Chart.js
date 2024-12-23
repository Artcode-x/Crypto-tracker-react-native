import { ActivityIndicator, Dimensions, Modal, Text, TouchableOpacity, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import {styles} from './Chart.styles'
import { useDispatch } from "react-redux";
import { setChartDays } from "../../store/reducersSlice";


export const Chart = ({selectedCoinData, chartData,  modalVisible, closeModal, isloading, coinHistoryData, chartDays}) => {
    
const dispatch = useDispatch()

    const openChart = (days) => {
        // setChartDays(days)
        dispatch(setChartDays(days))
      }
    
    return ( 
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedCoinData && (
              <>
                <Text style={styles.modalTitle}>{selectedCoinData.name}</Text>
                {isloading ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : null}
                {/* График */}
                <View>
                  {coinHistoryData.length > 0 && (
                    <LineChart
                      data={{
                        labels: chartData.labelDate,
                        datasets: [
                          {
                            data: chartData.prices,
                            strokeWidth: 4, // толщина линии
                            // Цвет линии: Логика определения цвета была изменена таким образом, чтобы проверять только последние две цены: lastPrice и previousPrice. Если последняя цена выше предыдущей, линия становится зеленой, если ниже — красной.
                            color: (opacity = 1) => {
                              const lastPrice =
                                chartData.prices[chartData.prices.length - 1];
                              const previousPrice =
                                chartData.prices[chartData.prices.length - 2];
                              return lastPrice > previousPrice
                                ? `rgba(0, 255, 0, ${opacity})` // зеленый цвет при росте
                                : `rgba(255, 0, 0, ${opacity})`; // красный цвет при падении
                            },
                          },
                        ],
                      }}
                      width={Dimensions.get("window").width * 0.9} // Ширина графика
                      height={400}
                      chartConfig={{
                        backgroundColor: "#ffffff",
                        backgroundGradientFrom: "#ffffff",
                        backgroundGradientTo: "#ffffff",
                        decimalPlaces: 2,
                        color: (opacity = 1) => `none`,
                        labelColor: (opacity = 1) => `black`, // Цвет меток
                        style: {
                          borderRadius: 16,
                          borderWidth: 1, // Установите ширину границы
                          // borderColor: "#e0e0e0", // Цвет границы
                        },
                        propsForDots: {
                          r: "0", // радиус 0, чтобы скрыть точки
                        },
                        
                        // propsForHorizontalLines: {
                        //   strokeDasharray: "", // Сплошная линия
                        // },
                        // Новый стиль для меток
                        propsForLabels: {
                          fontSize: 10, // Уменьшение шрифта меток
                        },
                      }}
                      // bezier //  Bezier для сплошных линий
                      style={{
                        marginVertical: 10,
                        borderRadius: 16,
                        elevation: 10,
                      // borderColor: "#e0e0e0", // Цвет границы графика
                      }}
                    />
                  )}
                 
                </View>
{isloading ? (null) : ( 
<>
    <Text>Выбранный диапазон дней: {chartDays}</Text>
    <View style={styles.chartButtons}>
      <TouchableOpacity onPress={() => openChart(1)}>
        <Text style={[styles.chartButton, chartDays === 1 && styles.activeButton]}>
          <Text style={[styles.buttonText, chartDays === 1 && styles.activeButtonText]}>24H</Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openChart(7)}>
        <Text style={[styles.chartButton, chartDays === 7 && styles.activeButton]}>
          <Text style={[styles.buttonText, chartDays === 7 && styles.activeButtonText]}>7D</Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openChart(14)}>
        <Text style={[styles.chartButton, chartDays === 14 && styles.activeButton]}>
          <Text style={[styles.buttonText, chartDays === 14 && styles.activeButtonText]}>14D</Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openChart(30)}>
        <Text style={[styles.chartButton, chartDays === 30 && styles.activeButton]}>
          <Text style={[styles.buttonText, chartDays === 30 && styles.activeButtonText]}>30D</Text>
        </Text>
      </TouchableOpacity>
    </View>
  </>

 )}
                <TouchableOpacity
                  onPress={closeModal}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    )
}