import React, { useEffect, useState } from "react"
import { styles } from "./Main.styles"
import {
  View,
  Text,
  StatusBar,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Modal
} from "react-native"
import CoinList from "../../components/CoinList/CoinList"
import prepareChartData from "../../components/PrepareChartData/PrepareChartData"
import { Chart } from "../../components/Chart/Chart"
import { useSelector } from "react-redux"
import { daysSelector } from "../../store/toolkitSelectors"
import { pick } from "lodash"
import { CandleChart } from "react-native-wagmi-charts"
import { FetchCoinHistoricalData, GetMarketData } from "../../components/Api/Api"

import Ionicons from "react-native-vector-icons/Ionicons"
import { ModalView } from "../../components/ModalView/ModalView"
const Main = () => {
  const [search, setSearch] = useState("")
  const [refreshing, setRefreshing] = useState(false)
  const [data, setData] = useState([])
  const [selectedCoinData, setSelectedCoinData] = useState(null)
  const [coinHistoryData, setCoinHistoryData] = useState([]) // Добавлено для хранения исторических данных
  const [modalVisible, setModalVisible] = useState(false)
  const [isloading, setIsLoading] = useState(false)
  const [flagForLoader, setFlagForLoader] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const switchChartDays = useSelector(daysSelector)

  const [modal, setModal] = useState(false)
  const toggleModal = () => {
    setModal(!modal)
  }

  const fetchMarketData = async () => {
    try {
      setFlagForLoader(true)
      const marketData = await GetMarketData()
      setData(marketData)
    } catch (error) {
      console.log(error.message)
      if (error.message === "Request failed with status code 429") {
        setErrorMessage(
          "Ошибка, слишком много запросов к серверу, соединение будет восстановлено автоматически"
        )
      } else {
        setErrorMessage(
          "Произошла ошибка при загрузке данных. Пожалуйста, попробуйте снова."
        )
      }
    } finally {
      setFlagForLoader(false)
    }
  }

  //  Авто-обновления котировок на главной
  useEffect(() => {
    fetchMarketData() // Получаем данные при первом монтировании компонента
    const interval = setInterval(() => {
      fetchMarketData()
      console.log("data update")
      setErrorMessage(null)
    }, 60000)
    // Очистка интервала при размонтировании компонента
    return () => clearInterval(interval)
  }, [])

  const openModal = async (item) => {
    setSelectedCoinData(item)
    setModalVisible(true)
    setIsLoading(true)
    try {
      const historicalData = await FetchCoinHistoricalData(item.id)
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

  const chartData = prepareChartData(coinHistoryData)

  // Для получения новых исторических данных при изменении chartDays(таймфрейм недельки/дни), чтобы данные на графике менялись не закрывая его.
  // При переключении Таймфрейма график будет перерисован

  useEffect(() => {
    if (selectedCoinData) {
      // Проверяем, выбрана ли монета
      const fetchHistoricalData = async () => {
        setIsLoading(true)
        try {
          const historicalData = await FetchCoinHistoricalData(
            selectedCoinData.id,
            switchChartDays
          )
          setCoinHistoryData(historicalData)
        } catch (error) {
          console.error(error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchHistoricalData()
    }
  }, [switchChartDays, selectedCoinData])

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#0e0275' />
      <View style={styles.header}>
        <Text style={styles.title}>CryptoCurrencies</Text>
        <TextInput
          style={styles.searchInput}
          placeholder='Search Cryptos'
          placeholderTextColor='#858585'
          onChangeText={(text) => text && setSearch(text)}
        />
        <View style={styles.openMenu}>
          <TouchableOpacity onPress={toggleModal}>
            <Ionicons style={styles.changeView} name='apps' size={20} />
          </TouchableOpacity>
        </View>

        {/* logo-codepen, logo-buffer, tv, pulse, menu, list, analytics , grid, */}
      </View>

      <ModalView modal={modal} setModal={setModal} />

      {flagForLoader ? (
        <ActivityIndicator size='large' color='red' />
      ) : (
        // ...flatlist...
        <CoinList
          data={data}
          openModal={openModal}
          refreshing={refreshing}
          setRefreshing={setRefreshing}
          search={search}
          fetchMarketData={fetchMarketData}
          errorMessage={errorMessage}
        />
      )}

      {/* Модальное окно с графиком */}
      <Chart
        selectedCoinData={selectedCoinData}
        chartData={chartData}
        modalVisible={modalVisible}
        closeModal={closeModal}
        isloading={isloading}
        coinHistoryData={coinHistoryData}
      />
    </View>
  )
}

export default Main
