import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TextInput,
  Modal,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native"
import { LineChart } from "react-native-chart-kit" // Добавлено для графиков
import CoinItem from "../components/CoinItem"
import { getMarketData } from "../services/cryptoService"
import { removeYearFromDate, uniqueDates } from "../helpers/helpers"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useDispatch } from "react-redux"
import { setCoin } from "../store/reducersSlice"

import { pick } from "lodash"

const Main = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [search, setSearch] = useState("")
  const [data, setData] = useState([])
  const [selectedCoinData, setSelectedCoinData] = useState(null)
  const [coinHistoryData, setCoinHistoryData] = useState([]) // Добавлено для хранения исторических данных
  const [modalVisible, setModalVisible] = useState(false)

  const [isloading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  const fetchMarketData = async () => {
    const marketData = await getMarketData()
    setData(marketData)
  }

  const fetchCoinHistoricalData = async (coinId) => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=14`
    ) // Получаем данные за кол-во дней, до 30
    if (!response.ok) {
      throw new Error("Ошибка при получении данных")
    }
    const result = await response.json()
    return result.prices
  }

  useEffect(() => {
    fetchMarketData()
  }, [])

  const openModal = async (item) => {
    setSelectedCoinData(item)
    setModalVisible(true)

    setIsLoading(true)

    try {
      const historicalData = await fetchCoinHistoricalData(item.id)
      setCoinHistoryData(historicalData)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const closeModal = () => {
    setModalVisible(false)
    setSelectedCoinData(null)
    setCoinHistoryData([]) // Сбрасываем исторические данные при закрытии
  }

  const prepareChartData = (data) => {
    const labels = data.map(([timestamp]) => new Date(timestamp).toLocaleDateString()) // Получаем метки для графика

    const uniquedates = uniqueDates(labels)
    const labelDate = removeYearFromDate(uniquedates)

    const prices = data.map(([, price]) => price)
    return { labelDate, prices }
  }

  const chartData = prepareChartData(coinHistoryData)

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0e0275" />
      <View style={styles.header}>
        <Text style={styles.title}>CryptoCurrencies</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Cryptos"
          placeholderTextColor="#858585"
          onChangeText={(text) => text && setSearch(text)}
        />
      </View>

      <FlatList
        style={styles.list}
        data={data.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.toLowerCase())
        )}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <CoinItem coin={item} onPress={() => openModal(item)} />
            {/* Иконка добавления в избранное+ */}
            <TouchableOpacity
              onPress={() => {
                const {
                  name,
                  current_price,
                  price_change_percentage_24h,
                  image,
                  otherInfo,
                  market_cap_rank,
                  symbol,
                } = item // Деструктурирую нужные поля
                const coinData = {
                  name,
                  current_price,
                  price_change_percentage_24h,
                  image,
                  otherInfo,
                  market_cap_rank,
                  symbol,
                }
                console.log(coinData)

                dispatch(setCoin(coinData)) // Диспатчим только необходимые данные из огромного обьекта
              }}
              style={styles.addButton}
            >
              <Ionicons name="add-circle" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        )}
        numColumns={2}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true)
          await fetchMarketData()
          setRefreshing(false)
        }}
      />

      {/* Модальное окно с графиком */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedCoinData && (
              <>
                <Text style={styles.modalTitle}>{selectedCoinData.name}</Text>
                {isloading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
                {/* График */}
                <View>
                  {coinHistoryData.length > 0 && (
                    <LineChart
                      data={{
                        labels: chartData.labelDate,
                        datasets: [
                          {
                            data: chartData.prices,
                            strokeWidth: 3, // толщина линии
                          },
                        ],
                      }}
                      width={Dimensions.get("window").width * 0.9} // Ширина графика
                      height={300}
                      chartConfig={{
                        backgroundColor: "#ffffff",
                        backgroundGradientFrom: "#ffffff",
                        backgroundGradientTo: "#ffffff",
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 121, 191, ${opacity})`, // Цвет линии
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Цвет меток
                        style: {
                          borderRadius: 16,
                          borderWidth: 1, // Установите ширину границы
                          borderColor: "#e0e0e0", // Цвет границы
                        },
                        propsForDots: {
                          r: "0", // Установите радиус до 0, чтобы скрыть точки
                        },
                        propsForHorizontalLines: {
                          strokeDasharray: "", // Сплошная линия
                        },
                        // Новый стиль для меток
                        propsForLabels: {
                          fontSize: 10, // Уменьшение шрифта меток
                        },
                      }}
                      bezier //  Bezier для сплошных линий
                      style={{
                        marginVertical: 10,
                        borderRadius: 16,
                        elevation: 10,
                        borderColor: "#e0e0e0", // Цвет границы графика
                      }}
                    />
                  )}
                </View>

                <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    flex: 1,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    marginTop: 10,
  },
  list: {
    width: "90%",
  },
  searchInput: {
    color: "#fff",
    borderBottomColor: "#c8cbfa",
    borderBottomWidth: 1,
    width: "40%",
    textAlign: "left",
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: "#696969",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 5,
  },
  //
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Темный полупрозрачный фон
  },
  modalContent: {
    width: "90%",
    maxWidth: 500,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24, // Увеличенный размер заголовка
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#ff4757",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
})

export default Main
