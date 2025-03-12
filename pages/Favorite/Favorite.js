import React, { useState } from "react"
import { View, FlatList, Modal, Button, Dimensions } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { coinSelector } from "../../store/toolkitSelectors"
import CoinItem from "../../components/CoinItem/CoinItem"
import Ionicons from "react-native-vector-icons/Ionicons"
import { TouchableOpacity } from "react-native"
import { removeCoin } from "../../store/reducersSlice"
import { styles } from "./Favorite.styles"
import { FetchCandleData } from "../../components/FetchCandleData/FetchCandleData"
import { LineChart } from "react-native-chart-kit"
import { getTimeLabels } from "../../helpers/helpers"

export default function Favorite() {
  const dispatch = useDispatch()
  const coinData = useSelector(coinSelector)

  const [flag, setFlag] = useState({})
  const [prices, setPrices] = useState([])
  const [isModalVisible, setModalVisible] = useState(false)

  const removeFromFav = (coin) => {
    setFlag((prev) => ({ ...prev, [coin.id]: true }))

    setTimeout(() => {
      setFlag({})
      dispatch(removeCoin(coin))
    }, 1500)
  }

  const openModal = async (coin) => {
    console.log(coin.symbol)
    const symbol = coin.symbol.toUpperCase()
    try {
      const candlePrices = await FetchCandleData(symbol)
      if (candlePrices && candlePrices.length > 0) {
        setPrices(candlePrices)
        setModalVisible(true)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const chartData = {
    labels: getTimeLabels(prices),
    datasets: [
      // {
      //   data: prices.map((item) => item.close),
      //   color: (opacity = 1) => `wheat`,
      //   strokeWidth: 2
      // },
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
          <LineChart
            data={chartData}
            // width={400}
            // height={500}
            width={Dimensions.get("window").width * 0.9}
            height={Dimensions.get("window").height * 0.4}
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
          <Button title='Закрыть' onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  )
}
