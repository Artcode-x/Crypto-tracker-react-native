import {
  ActivityIndicator,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  // useWindowDimensions,
  View
} from "react-native"
import { styles } from "./Chart.styles"
import { useDispatch, useSelector } from "react-redux"
import { setChartDays } from "../../store/reducersSlice"
import { daysSelector } from "../../store/toolkitSelectors"
import { useState } from "react"
import { ChartBlack } from "./ChartBlack/ChartBlack"
import { ChartWhite } from "./ChartWhite/ChartWhite"

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
  const [isDarkTheme, setIsDarkTheme] = useState(false)

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

  const theme = (color) => {
    setIsDarkTheme(!isDarkTheme)
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

              <>
                {isDarkTheme ? (
                  <ChartBlack
                    coinHistoryData={coinHistoryData}
                    chartData={chartData}
                    is30DSelected={is30DSelected}
                  />
                ) : (
                  <ChartWhite
                    coinHistoryData={coinHistoryData}
                    chartData={chartData}
                    is30DSelected={is30DSelected}
                  />
                )}
              </>

              {isloading ? null : (
                <>
                  <View
                    style={{
                      marginBottom: 5,
                      alignItems: "start"
                    }}
                  >
                    <TouchableOpacity onPress={() => theme()}>
                      <Text style={[styles.themes, isDarkTheme && styles.activeButton]}>
                        <Text
                          style={[
                            styles.buttonText,
                            isDarkTheme && styles.activeButtonText
                          ]}
                        >
                          {isDarkTheme ? "White chart" : "Dark chart"}
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  </View>

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
                          chartDays === "1h" && styles.activeButton
                        ]}
                      >
                        <Text
                          style={[
                            styles.buttonText,
                            chartDays === "1h" && styles.activeButtonText
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
