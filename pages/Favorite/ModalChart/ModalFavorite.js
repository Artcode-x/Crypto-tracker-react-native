import React, { useState, useCallback, useEffect } from "react"
import {
  View,
  Modal,
  ScrollView,
  Dimensions,
  StatusBar,
  Platform,
  SafeAreaView
} from "react-native"
import * as Haptics from "expo-haptics"
import { styles } from "./ModalFavorite.styles"
import {
  FetchCandleData,
  Get24hrMinMaxPrices,
  GetSantiment
} from "../../../components/Api/Api"
import { useSelector } from "react-redux"
import { bottomInset } from "../../../store/toolkitSelectors"
import Content from "./Content"

const { width, height } = Dimensions.get("window")

const ModalFavorite = ({ visible, onClose, selectedCoin, chartDays }) => {
  const [prices, setPrices] = useState([])
  const [minMax, setMinMax] = useState({ minPrice: null, maxPrice: null })
  const [loadingChart, setLoadingChart] = useState(false)
  const [limit, setLimit] = useState(100)
  const [santiment, setSantiment] = useState(null)
  const [fearGreedValue, setFearGreedValue] = useState(null)
  const [coinName, setCoinName] = useState(null)

  const bottomInsets = useSelector(bottomInset)

  const formatTime = (prices) => {
    if (!prices || !prices.length) return []
    return prices.map((item) => {
      const date = new Date(item.time * 1000)
      return date.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit"
      })
    })
  }

  const getTimeLabels = (prices) => {
    if (!prices || !prices.length) return []
    return prices.map((item) => {
      const date = new Date(item.time * 1000)
      return date.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit"
      })
    })
  }

  const volumeData = {
    labels:
      chartDays === "1h" || chartDays === "4h"
        ? getTimeLabels(prices)
        : formatTime(prices),
    datasets: [
      {
        data: prices.map((item) => Number(item.volume) || 0),
        color: (opacity = 1) => `rgba(255, 59, 48, ${opacity})`,
        strokeWidth: 2
      }
    ]
  }

  const getCurrentCandle = () => {
    if (!prices || prices.length === 0) return null
    return prices[prices.length - 1]
  }

  const currentCandle = getCurrentCandle()

  const fetchChartData = useCallback(
    async (coin) => {
      if (!coin) return
      try {
        const symbol = coin.symbol.toUpperCase()
        setCoinName(symbol)
        const days = chartDays

        const [minMaxPrice, candlePrices] = await Promise.all([
          Get24hrMinMaxPrices(symbol),
          FetchCandleData(symbol, days, limit)
        ])

        const response = await GetSantiment()
        const { value, classification } = response || {}
        //  проверка на undefined
        if (value && classification) {
          setSantiment(classification)
          setFearGreedValue(parseInt(value))
        } else {
          setSantiment(null)
        }

        if (candlePrices?.length > 0) {
          setPrices(candlePrices)
        } else {
          setPrices([])
        }

        setMinMax({
          minPrice: minMaxPrice.minPrice,
          maxPrice: minMaxPrice.maxPrice
        })
      } catch (error) {
        console.error(error.message)
        setPrices([])
        setSantiment(null)
        setFearGreedValue(null)
      }
    },
    [chartDays, limit]
  )

  useEffect(() => {
    if (selectedCoin) {
      // Сброс всего, что связано с предыдущей монетой
      setMinMax({ minPrice: null, maxPrice: null })
    }
  }, [selectedCoin])

  useEffect(() => {
    if (selectedCoin && visible) {
      fetchChartData(selectedCoin)
    }
  }, [chartDays, limit, selectedCoin, visible, fetchChartData])

  const handleOpenModal = useCallback(
    async (coin) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      setLoadingChart(true)
      await fetchChartData(coin)
      setLoadingChart(false)
    },
    [fetchChartData]
  )

  useEffect(() => {
    if (selectedCoin && visible) {
      handleOpenModal(selectedCoin)
    }
  }, [selectedCoin, visible])

  const screenHeight = height + (Platform.OS === "android" ? StatusBar.currentHeight : 0)

  return (
    <Modal
      visible={visible}
      animationType='slide'
      onRequestClose={onClose}
      statusBarTranslucent={true}
      hardwareAccelerated={true}
    >
      {Platform.OS === "ios" ? (
        <SafeAreaView style={styles.modalContainer}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[
              styles.scrollContent,
              {
                paddingBottom: bottomInsets.bottom > 0 ? bottomInsets.bottom + 5 : 0
              }
            ]}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <Content
              selectedCoin={selectedCoin}
              chartDays={chartDays}
              santiment={santiment}
              fearGreedValue={fearGreedValue}
              coinName={coinName}
              minMax={minMax}
              loadingChart={loadingChart}
              prices={prices}
              currentCandle={currentCandle}
              limit={limit}
              volumeData={volumeData}
              onClose={onClose}
              screenHeight={screenHeight}
              setLimit={setLimit}
            />
          </ScrollView>
        </SafeAreaView>
      ) : (
        <View style={styles.modalContainer}>
          <View style={styles.androidStatusBar} />
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[
              styles.scrollContent,
              {
                paddingBottom: bottomInsets.bottom > 0 ? bottomInsets.bottom + 5 : 0
              }
            ]}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <Content
              selectedCoin={selectedCoin}
              chartDays={chartDays}
              santiment={santiment}
              fearGreedValue={fearGreedValue}
              coinName={coinName}
              minMax={minMax}
              loadingChart={loadingChart}
              prices={prices}
              currentCandle={currentCandle}
              limit={limit}
              volumeData={volumeData}
              onClose={onClose}
              screenHeight={screenHeight}
              setLimit={setLimit}
            />
          </ScrollView>
        </View>
      )}
    </Modal>
  )
}

export default ModalFavorite
