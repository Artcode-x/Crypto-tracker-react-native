import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { View, FlatList, Modal, Text, Dimensions } from "react-native"
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
import { VolumeChart } from "./FavoriteCharts/VolumeChart/VolumeChart"
import { SwitchTimeframeButtons } from "./SwitchTimeframeButtons/SwitchTimeframeButtons"
import { CandlestickChart } from "react-native-wagmi-charts"
import { PinchGestureHandler, TapGestureHandler } from "react-native-gesture-handler"

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
  const [limit, setLimit] = useState(100)
  const scaleRef = useRef(1) // Для накопления масштаба

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
        FetchCandleData(symbol, days, limit)
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

  // Приведет к частым изменениям лимита при небольших колебаниях масштаба.
  // const onPinchEvent = (event) => {
  //   const scale = event.nativeEvent.scale
  //   if (scale > 1) {
  //     setLimit((prevLimit) => Math.min(prevLimit + 10, 200)) // Увеличиваем лимит
  //   } else if (scale < 1) {
  //     setLimit((prevLimit) => Math.max(prevLimit - 10, 10)) // Уменьшаем лимит
  //   }
  // }

  // Масштабирование (Pinch gesture)
  //  - Вычисляем изменение масштаба.
  // - Если уменьшился больше 10%, уменьшаем цену.
  // - Если масштаб вырос больше 10%, увеличиваем цену.
  // - Ограничиваем значения от 10 до 200.

  // Функция onPinchEvent:  обрабатывает изменение масштаба.
  // ScaleChange: ожидает, насколько изменился масштаб относительно предыдущего.
  // Если больше 1.1, значит произошло увеличение. Если меньше 0.9, значит уменьшение.
  // В зависимости от изменения масштаба, изменяем limit на 10, ограничивая его значение от 10 до 200.
  const onPinchEvent = (event) => {
    // scaleRef для хранения предыдущего значения масштаба, что позволяет более точно отслеживать изменения.
    const scaleChange = event.nativeEvent.scale / scaleRef.current
    if (scaleChange > 1.1) {
      // Изменяем limit при уменьшении масштаба на 10%
      setLimit((prev) => Math.max(prev - 10, 10))

      scaleRef.current = event.nativeEvent.scale
    } else if (scaleChange < 0.9) {
      // Изменяем limit при увеличении масштаба на 10%
      setLimit((prev) => Math.min(prev + 10, 200))
      scaleRef.current = event.nativeEvent.scale
    }
  }
  // Сброс масштаба
  // - При завершении жеста масштаб сбрасывается для корректной работы в следующем цикле.
  // Этот обработчик реагирует на завершение жеста. Когда жест завершен, сбрасывается scaleRef.current обратно к 1, чтобы начать новый процесс масштабирования.
  const onPinchStateChange = (event) => {
    if (event.nativeEvent.state === 5) {
      // STATE_END
      scaleRef.current = 1
    }
  }

  useEffect(() => {
    if (isModalVisible) {
      fetchData()
    }
  }, [isModalVisible, selectedCoin, chartDays, limit])

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
              <Text style={styles.textTit}>Min and Max trade range:</Text>

              {Array.isArray(prices) && prices.length > 0 ? (
                <>
                  <TapGestureHandler>
                    <PinchGestureHandler
                      onGestureEvent={onPinchEvent}
                      onHandlerStateChange={onPinchStateChange}
                    >
                      <View style={{ alignItems: "center" }}>
                        <CandlestickChart.Provider data={prices}>
                          <CandlestickChart
                            width={Dimensions.get("window").width * 0.99}
                            height={Dimensions.get("window").height * 0.45}
                            style={{
                              backgroundColor: "#1E1E1E",
                              border: 1,
                              borderWidth: 1,
                              borderColor: "wheat",
                              borderRadius: 20,
                              alignItems: "center"
                            }}
                          >
                            <Text style={styles.limits}>Limit: {limit}</Text>
                            <View style={styles.priceBlock}>
                              <View style={styles.priceContainer}>
                                <Text style={styles.label}>Low:</Text>
                                <CandlestickChart.PriceText
                                  type='low'
                                  style={styles.priceValue}
                                />
                              </View>
                              <View style={styles.priceContainer}>
                                <Text style={styles.label}>Open:</Text>
                                <CandlestickChart.PriceText
                                  type='open'
                                  style={styles.priceValue}
                                />
                              </View>
                              <View style={styles.priceContainer}>
                                <Text style={styles.label}>Close:</Text>
                                <CandlestickChart.PriceText
                                  type='close'
                                  style={styles.priceValue}
                                />
                              </View>
                              <View style={styles.priceContainer}>
                                <Text style={styles.label}>High:</Text>
                                <CandlestickChart.PriceText
                                  type='high'
                                  style={styles.priceValue}
                                />
                              </View>
                            </View>
                            <CandlestickChart.Candles />
                            <CandlestickChart.Crosshair />
                          </CandlestickChart>
                        </CandlestickChart.Provider>
                      </View>
                    </PinchGestureHandler>
                  </TapGestureHandler>
                </>
              ) : (
                <Text style={{ color: "white" }}>Нет данных для отображения</Text>
              )}
              <>
                <Text style={styles.text1}>Volume range:</Text>
                <VolumeChart volumeData={volumeData} />
              </>
            </>
          )}

          <Text style={styles.text}>
            Selected range<Text style={styles.textZ}> {chartDays}</Text>
          </Text>
          <SwitchTimeframeButtons chartDays={chartDays} />

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
