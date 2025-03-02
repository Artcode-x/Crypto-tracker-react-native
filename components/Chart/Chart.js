import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  // useWindowDimensions,
  View
} from "react-native"
import { LineChart } from "react-native-chart-kit"
import { styles } from "./Chart.styles"
import { useDispatch, useSelector } from "react-redux"
import { setChartDays } from "../../store/reducersSlice"
import { daysSelector } from "../../store/toolkitSelectors"
import { useEffect, useState } from "react"

import { RFPercentage, RFValue } from "react-native-responsive-fontsize"

export const Chart = ({
  selectedCoinData,
  chartData,
  modalVisible,
  closeModal,
  isloading,
  coinHistoryData
}) => {
  const Spacer = ({ width }) => {
    return <View style={{ width }} />
  }

  // selectedCoinData - тут лежат данные для свечных графиков
  const [is30DSelected, setIs30DSelected] = useState(false)
  const chartDays = useSelector(daysSelector)
  const dispatch = useDispatch()

  const openChart = (days) => {
    if (days === 30) {
      setIs30DSelected(true)
    } else {
      setIs30DSelected(false)
    }
    dispatch(setChartDays(days))
  }

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {selectedCoinData && (
            <>
              <Text style={styles.modalTitle}>{selectedCoinData.name}</Text>

              {!isloading ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenely",
                    borderRadius: "2%",
                    // backgroundColor: "whitesmoke"
                    backgroundColor: "rgba(75, 73, 74, 0.9)"
                  }}
                >
                  <Text style={styles.textUp}>
                    Мин. 24 часа:
                    <Text style={{ color: "wheat" }}> {selectedCoinData?.low_24h}$</Text>
                  </Text>
                  <Spacer width={10} />
                  <Text style={styles.textUp}>
                    Макс. 24 часа:
                    <Text style={{ color: "wheat" }}> {selectedCoinData?.high_24h}$</Text>
                  </Text>
                </View>
              ) : null}

              {isloading ? <ActivityIndicator size='large' color='#0000ff' /> : null}

              {/* График */}
              <View>
                {coinHistoryData.length > 0 && (
                  <>
                    <View
                      style={{
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "auto",
                        backgroundColor:
                          chartData.prices[chartData.prices.length - 1] >
                          chartData.prices[0]
                            ? "green"
                            : "red"
                      }}
                    />

                    <LineChart
                      data={{
                        labels: is30DSelected
                          ? chartData.labelDate.filter((_, index) => index % 2 === 0) // Показываем каждую вторую метку даты только если выбран 30D таймфрейм
                          : chartData.labelDate, // Показываем все метки, если не 30D
                        datasets: [
                          {
                            data: chartData.prices,
                            strokeWidth: 4,
                            color: (opacity = 1) => {
                              const firstPrice = chartData.prices[0]
                              const lastPrice =
                                chartData.prices[chartData.prices.length - 1]
                              return lastPrice > firstPrice
                                ? `rgba(0, 255, 0, ${opacity})` // зеленый цвет при росте
                                : `rgba(255, 0, 0, ${opacity})` // красный цвет при падении
                            }
                          }
                        ]
                      }}
                      width={Dimensions.get("window").width * 0.9} // Ширина графика
                      height={Dimensions.get("window").height * 0.35}
                      chartConfig={{
                        // backgroundColor: "#ffffff",
                        backgroundColor: "black",
                        backgroundGradientFrom: "#ACE1AF",
                        backgroundGradientTo: "#ffffff",
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity * 0})`, // Цвет линий
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Цвет меток
                        style: {
                          // borderRadius: 16,
                          // borderWidth: 1,
                        },
                        propsForDots: {
                          r: "0" // радиус 0, чтобы скрыть точки
                        },
                        propsForLabels: {
                          fontSize: 10 // Уменьшение шрифта меток
                        }
                      }}
                      style={{
                        marginVertical: 10,
                        //  borderRadius: 16,
                        elevation: 10
                      }}
                    />
                  </>
                )}
              </View>

              {isloading ? null : (
                <>
                  <View style={styles.coinInfo}>
                    <View style={styles.coinInfoBox}>
                      <Text style={styles.textMiddle}>
                        Место в CoinMarcetCup:
                        <Text style={{ color: "#007bff" }}>
                          {" "}
                          {selectedCoinData?.market_cap_rank}
                        </Text>
                      </Text>
                      <Text style={styles.textMiddle}>
                        Изменение цены за сегодня:
                        <Text
                          style={{
                            color:
                              selectedCoinData?.price_change_percentage_24h >= 0
                                ? "green"
                                : "red"
                          }}
                        >
                          {" "}
                          {selectedCoinData?.price_change_percentage_24h.toFixed(2)}%
                        </Text>
                      </Text>
                    </View>
                    <View style={styles.coinInfoBox}>
                      <Text style={styles.textMiddle}>
                        Изменение цены за 24 часа:
                        <Text
                          style={{
                            color:
                              selectedCoinData?.price_change_percentage_24h >= 0
                                ? "green"
                                : "red"
                          }}
                        >
                          {" "}
                          {selectedCoinData?.price_change_24h.toFixed(2)}$
                        </Text>
                      </Text>
                      <Text style={styles.textMiddle}>
                        Разница в процентах за 7 дней :
                        <Text
                          style={{
                            color:
                              selectedCoinData?.price_change_percentage_7d_in_currency >=
                              0
                                ? "green"
                                : "red"
                          }}
                        >
                          {" "}
                          {selectedCoinData?.price_change_percentage_7d_in_currency?.toFixed(
                            2
                          )}
                          %
                        </Text>
                      </Text>
                    </View>
                  </View>

                  <View style={styles.container}>
                    <Image
                      source={{ uri: selectedCoinData?.image }}
                      style={styles.image}
                      resizeMode='contain' // Для сохранения пропорций изображения
                    />
                    <Text style={styles.text}>
                      Current Price: {selectedCoinData?.current_price} $
                    </Text>
                  </View>

                  <Text style={styles.text}>Выбранный диапазон дней: {chartDays}</Text>
                  <View style={styles.chartButtons}>
                    <TouchableOpacity onPress={() => openChart(1)}>
                      <Text
                        style={[
                          styles.chartButton,
                          chartDays === 1 && styles.activeButton
                        ]}
                      >
                        <Text
                          style={[
                            styles.buttonText,
                            chartDays === 1 && styles.activeButtonText
                          ]}
                        >
                          24H
                        </Text>
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openChart(7)}>
                      <Text
                        style={[
                          styles.chartButton,
                          chartDays === 7 && styles.activeButton
                        ]}
                      >
                        <Text
                          style={[
                            styles.buttonText,
                            chartDays === 7 && styles.activeButtonText
                          ]}
                        >
                          7D
                        </Text>
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openChart(14)}>
                      <Text
                        style={[
                          styles.chartButton,
                          chartDays === 14 && styles.activeButton
                        ]}
                      >
                        <Text
                          style={[
                            styles.buttonText,
                            chartDays === 14 && styles.activeButtonText
                          ]}
                        >
                          14D
                        </Text>
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openChart(30)}>
                      <Text
                        style={[
                          styles.chartButton,
                          chartDays === 30 && styles.activeButton
                        ]}
                      >
                        <Text
                          style={[
                            styles.buttonText,
                            chartDays === 30 && styles.activeButtonText
                          ]}
                        >
                          30D
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  )
}
