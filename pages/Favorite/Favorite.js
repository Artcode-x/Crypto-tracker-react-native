import React, { useEffect, useState } from "react"
import { View, FlatList, Modal, Button, Dimensions, Text } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { coinSelector, daysSelector } from "../../store/toolkitSelectors"
import CoinItem from "../../components/CoinItem/CoinItem"
import Ionicons from "react-native-vector-icons/Ionicons"
import { TouchableOpacity } from "react-native"
import { removeCoin, setChartDays } from "../../store/reducersSlice"
import { styles } from "./Favorite.styles"
import { FetchCandleData } from "../../components/FetchCandleData/FetchCandleData"
import { LineChart } from "react-native-chart-kit"
import { getTimeLabels } from "../../helpers/helpers"
import { Get24hrMinMaxPrices } from "../../components/Api/Api"

export default function Favorite() {
  const dispatch = useDispatch()
  const coinData = useSelector(coinSelector)
  const chartDays = useSelector(daysSelector)

  const [flag, setFlag] = useState({})
  const [prices, setPrices] = useState([])
  const [isModalVisible, setModalVisible] = useState(false)
  const [minMax, setMinMax] = useState({ minPrice: null, maxPrice: null })
  const [days, setDays] = useState("1h")
  const [selectedCoin, setSelectedCoin] = useState(null)

  const removeFromFav = (coin) => {
    setFlag((prev) => ({ ...prev, [coin.id]: true }))

    setTimeout(() => {
      setFlag({})
      dispatch(removeCoin(coin))
    }, 1500)
  }

  const openModal = (coin) => {
    setSelectedCoin(coin)
    setModalVisible(true)
  }

  const fetchData = async () => {
    if (!selectedCoin) return

    const symbol = selectedCoin.symbol.toUpperCase()
    const days = chartDays

    try {
      // const [minMaxPrice, candlePrices] = await Promise.all([
      //   Get24hrMinMaxPrices(symbol),
      //   FetchCandleData(symbol, days)
      // ])

      const candlePrices = await FetchCandleData(symbol, days)
      if (candlePrices && candlePrices.length > 0) {
        setPrices(candlePrices)
      }

      const minMaxPrice = await Get24hrMinMaxPrices(symbol)
      setMinMax({
        minPrice: minMaxPrice.minPrice,
        maxPrice: minMaxPrice.maxPrice
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (isModalVisible) {
      fetchData()
    }
  }, [isModalVisible, selectedCoin, chartDays])

  const chartData = {
    labels: getTimeLabels(prices),
    datasets: [
      {
        data: prices.map((item) => item.high),
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2
      },
      {
        data: prices.map((item) => item.low),
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2
      }
    ]
  }

  const volumeData = {
    // labels: prices.map((item) => item.time),
    labels: getTimeLabels(prices),
    datasets: [
      {
        data: prices.map((item) => item.volume),
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2
      }
    ]
  }

  const switch1 = (days) => {
    setDays(days)
    dispatch(setChartDays(days))
  }

  return (
    <View style={styles.favlist}>
      <FlatList
        style={styles.favCoins}
        data={coinData.filter(
          (coin) => coin.name.toLowerCase() || coin.symbol.toLowerCase()
        )}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <CoinItem coin={item} onPress={() => openModal(item)} />

            <TouchableOpacity onPress={() => removeFromFav(item)}>
              {flag[item.id] ? (
                <Ionicons name='close-circle-outline' size={24} color='red'></Ionicons>
              ) : (
                <Ionicons name='remove-circle-outline' size={24} color='gray' />
              )}
            </TouchableOpacity>
          </View>
        )}
        numColumns={2}
        keyExtractor={(item) => item.id}
      />

      <Modal visible={isModalVisible} animationType='slide'>
        <View style={styles.chartContainer}>
          <Text style={styles.modalTitle}>{coinData.name}</Text>
          <View
            style={{
              flexDirection: "row",
              // justifyContent: "space-evenely",
              borderRadius: "2%",
              // backgroundColor: "whitesmoke"
              backgroundColor: "rgba(75, 73, 74, 0.9)",
              gap: 10
            }}
          >
            <Text style={styles.textUp}>
              Мин. 24 часа:
              <Text style={{ color: "lightblue" }}> {minMax.minPrice}$</Text>
            </Text>

            <Text style={styles.textUp}>
              Макс. 24 часа:
              <Text style={{ color: "wheat" }}> {minMax.maxPrice}$</Text>
            </Text>
          </View>
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
              }
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,

              alignItems: "center"
            }}
          />
          <LineChart
            data={volumeData}
            // width={400}
            // height={200}
            width={Dimensions.get("window").width * 0.9}
            height={Dimensions.get("window").height * 0.28}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ACE1AF",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0, // кол-во знаков после запятой
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `black`,

              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "2",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
              alignItems: "center"
            }}
          />
          {/* start */}
          <Text style={styles.text}>
            Выбранный диапазон дней:<Text style={styles.textZ}> {chartDays}</Text>
          </Text>
          <View style={styles.chartButtons}>
            <TouchableOpacity onPress={() => switch1("1h")}>
              <Text
                style={[styles.chartButton, chartDays === "1h" && styles.activeButton]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    chartDays === "1h" && styles.activeButtonText
                  ]}
                >
                  1H
                </Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => switch1("4h")}>
              <Text
                style={[styles.chartButton, chartDays === "4h" && styles.activeButton]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    chartDays === "4h" && styles.activeButtonText
                  ]}
                >
                  4H
                </Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => switch1("1d")}>
              <Text
                style={[styles.chartButton, chartDays === "1d" && styles.activeButton]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    chartDays === "1d" && styles.activeButtonText
                  ]}
                >
                  1D
                </Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => switch1("1w")}>
              <Text
                style={[styles.chartButton, chartDays === "1w" && styles.activeButton]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    chartDays === "1w" && styles.activeButtonText
                  ]}
                >
                  1 week
                </Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => switch1("1M")}>
              <Text
                style={[styles.chartButton, chartDays === "1M" && styles.activeButton]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    chartDays === "1M" && styles.activeButtonText
                  ]}
                >
                  1 Month
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
          {/* end */}
          <Button title='Закрыть' onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  )
}
