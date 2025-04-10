import React, { useEffect, useState } from "react"
import { View, FlatList, Modal, Text } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { coinSelector, daysSelector } from "../../store/toolkitSelectors"
import CoinItem from "../../components/CoinItem/CoinItem"
import Ionicons from "react-native-vector-icons/Ionicons"
import { TouchableOpacity } from "react-native"
import { removeCoin } from "../../store/reducersSlice"
import { styles } from "./Favorite.styles"
import { formatTime, getTimeLabels } from "../../helpers/helpers"
import {
  FetchCandleData,
  Get24hrMinMaxPrices,
  GetSantiment
} from "../../components/Api/Api"
import { CandleChart } from "./FavoriteCharts/CandleChart/CandleChart"
import { VolumeChart } from "./FavoriteCharts/VolumeChart/VolumeChart"
import { SwitchTimeframeButtons } from "./SwitchTimeframeButtons/SwitchTimeframeButtons"

const Favorite = () => {
  const dispatch = useDispatch()
  const coinData = useSelector(coinSelector)
  const chartDays = useSelector(daysSelector)

  const [flag, setFlag] = useState({})
  const [prices, setPrices] = useState([])
  const [isModalVisible, setModalVisible] = useState(false)
  const [minMax, setMinMax] = useState({ minPrice: null, maxPrice: null })
  const [sant, setSant] = useState(null)
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
      const [minMaxPrice, candlePrices] = await Promise.all([
        Get24hrMinMaxPrices(symbol),
        FetchCandleData(symbol, days)
      ])

      if (symbol === "BTC" || symbol === "ETH") {
        const response = await GetSantiment(symbol)
        setSant(response.Data.inOutVar.sentiment)
      } else {
        setSant(null)
      }

      if (candlePrices && candlePrices.length > 0) {
        setPrices(candlePrices)
      }

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
    labels:
      chartDays === "1h" || chartDays === "4h"
        ? getTimeLabels(prices)
        : formatTime(prices),
    datasets: [
      {
        data: prices.map((item) => Number(item.high) || 0),
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2
      },
      {
        data: prices.map((item) => Number(item.open) || 0),
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2
      },
      {
        data: prices.map((item) => Number(item.close) || 0),
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2
      },
      {
        data: prices.map((item) => Number(item.low) || 0),
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2
      }
    ]
  }

  const volumeData = {
    labels:
      chartDays === "1h" || chartDays === "4h"
        ? getTimeLabels(prices)
        : formatTime(prices),
    datasets: [
      {
        data: prices.map((item) => Number(item.volume) || 0),
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
          {/* <Text style={styles.modalTitle}>{coinData.name}</Text> */}
          {sant && (
            <View
              style={{
                paddingBottom: 2,
                alignItems: "center"
              }}
            >
              <Text style={styles.text0}>
                Market Santiment:
                <Text style={{ color: "wheat" }}> {sant}</Text>
              </Text>
            </View>
          )}
          <View style={styles.minmaxBlock}>
            <Text style={styles.textUp}>
              Мин. 24 часа:
              <Text style={{ color: "lightblue" }}> {minMax.minPrice}$</Text>
            </Text>

            <Text style={styles.textUp}>
              Макс. 24 часа:
              <Text style={{ color: "wheat" }}> {minMax.maxPrice}$</Text>
            </Text>
          </View>

          {prices.length === 0 ? (
            <Text style={{ color: "white" }}>Загрузка данных...</Text>
          ) : (
            <>
              <Text style={styles.text1}>Min and Max trade range:</Text>
              <CandleChart chartData={chartData} />
              <Text style={styles.text1}>Volume range:</Text>
              <VolumeChart volumeData={volumeData} />
            </>
          )}
          {/* start */}
          <Text style={styles.text}>
            Выбранный диапазон дней:<Text style={styles.textZ}> {chartDays}</Text>
          </Text>
          <SwitchTimeframeButtons chartDays={chartDays} />
          {/* end */}
          <View style={styles.chartButtonsClose}>
            <TouchableOpacity
              style={styles.buttonClose}
              title='Закрыть'
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeb}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Favorite
