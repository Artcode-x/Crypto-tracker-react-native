import React, { useEffect, useState, useCallback, useRef } from "react"
import { styles } from "./Main.styles"
import {
  View,
  Text,
  StatusBar,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Animated
} from "react-native"
import CoinList from "../../components/CoinList/CoinList"
import prepareChartData from "../../components/PrepareChartData/PrepareChartData"
import { Chart } from "../../components/Chart/Chart"
import { useSelector, useDispatch } from "react-redux"
import {
  daysSelector,
  marketCurrentPageSelector,
  marketDataSelector,
  marketErrorSelector,
  marketHasMoreSelector,
  marketIsLoadingMoreSelector,
  viewMarketFlagSelector
} from "../../store/toolkitSelectors"
import {
  setMarketData,
  addMoreMarketData,
  setMarketCurrentPage,
  setMarketIsLoadingMore,
  setMarketHasMore,
  setMarketLastUpdated,
  setMarketError,
  resetMarketData
} from "../../store/reducersSlice"
import { FetchCoinHistoricalData, GetMarketData } from "../../components/Api/Api"
import { Ionicons } from "@expo/vector-icons"
import { ModalView } from "../../components/ModalView/ModalView"
import CoinList2 from "../../components/CoinList2/Coinlist2"
import { LinearGradient } from "react-native-svg"

const Main = () => {
  const dispatch = useDispatch()

  // Стейты компонента
  const [search, setSearch] = useState("")
  const [refreshing, setRefreshing] = useState(false)
  const [selectedCoinData, setSelectedCoinData] = useState(null)
  const [coinHistoryData, setCoinHistoryData] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [isloading, setIsLoading] = useState(false)
  const [flagForLoader, setFlagForLoader] = useState(false)
  const [modal, setModal] = useState(false)

  // Стейты для обработки ошибки 429
  const [is429Error, setIs429Error] = useState(false)
  const [retryCountdown, setRetryCountdown] = useState(0)
  const [initialLoadAttempted, setInitialLoadAttempted] = useState(false)

  // Refs для управления загрузкой
  const isLoadingMoreRef = useRef(false)
  const retryTimeoutRef = useRef(null)
  const consecutiveErrorsRef = useRef(0)
  const initialLoadDoneRef = useRef(false)
  const countdownIntervalRef = useRef(null)
  const isMountedRef = useRef(true)

  // Данные из Redux
  const marketData = useSelector(marketDataSelector)
  const marketCurrentPage = useSelector(marketCurrentPageSelector)
  const marketIsLoadingMore = useSelector(marketIsLoadingMoreSelector)
  const marketHasMore = useSelector(marketHasMoreSelector)
  const marketError = useSelector(marketErrorSelector)
  const switchChartDays = useSelector(daysSelector)
  const marketViewFlag = useSelector(viewMarketFlagSelector)

  // Функция очистки таймеров
  const clearAllTimers = useCallback(() => {
    console.log("Очистка всех таймеров")
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current)
      retryTimeoutRef.current = null
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current)
      countdownIntervalRef.current = null
    }
  }, [])

  //  Для скрытия баннера при окончании отсчета
  useEffect(() => {
    if (retryCountdown === 0 && is429Error) {
      console.log("Отсчет закончился, скрываем баннер через 2 секунды")

      const timeout = setTimeout(() => {
        if (isMountedRef.current) {
          setIs429Error(false)
        }
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [retryCountdown, is429Error])

  // Функция запуска обратного отсчета
  const startCountdown = useCallback(
    (seconds, retryCallback) => {
      console.log(`Запуск отсчета: ${seconds} секунд`)
      clearAllTimers()
      setIs429Error(true)
      setRetryCountdown(seconds)

      // Отсчет каждую секунду для UI
      let currentCount = seconds

      countdownIntervalRef.current = setInterval(() => {
        if (!isMountedRef.current) return

        currentCount -= 1
        setRetryCountdown(currentCount)

        if (currentCount <= 0) {
          clearInterval(countdownIntervalRef.current)
          countdownIntervalRef.current = null
          console.log("Отсчет закончился")

          // Запуск повтора через 1 секунду после окончания
          if (retryCallback) {
            setTimeout(() => {
              if (isMountedRef.current) {
                retryCallback()
              }
            }, 1000)
          }
        }
      }, 1000)

      // Дублирующий таймаут на случай проблем с интервалом
      retryTimeoutRef.current = setTimeout(() => {
        if (!isMountedRef.current) return

        clearInterval(countdownIntervalRef.current)
        countdownIntervalRef.current = null
        setRetryCountdown(0)

        if (retryCallback) {
          retryCallback()
        }
      }, seconds * 1000)
    },
    [clearAllTimers]
  )

  // Функция загрузки первой страницы
  const fetchInitialMarketData = useCallback(async () => {
    if (flagForLoader || !isMountedRef.current) {
      console.log("Загрузка уже идет или компонент размонтирован")
      return
    }

    if (initialLoadDoneRef.current && marketData.length > 0) {
      console.log("Данные уже загружены")
      return
    }

    console.log("Начало загрузки первой страницы")
    setFlagForLoader(true)
    setInitialLoadAttempted(true)
    dispatch(setMarketError(null))

    try {
      const firstPageData = await GetMarketData(1)

      if (!firstPageData || !Array.isArray(firstPageData)) {
        throw new Error("Некорректные данные от сервера")
      }

      dispatch(setMarketData(firstPageData))
      dispatch(setMarketCurrentPage(2))
      dispatch(setMarketLastUpdated(Date.now()))
      dispatch(setMarketHasMore(firstPageData.length > 0))

      initialLoadDoneRef.current = true

      // При успешной загрузке - сбрасываем баннер 429
      console.log("Загрузка успешна, скрываем баннер 429")
      setIs429Error(false)
      setRetryCountdown(0)
      clearAllTimers()

      consecutiveErrorsRef.current = 0
      console.log(`Успешно загружено ${firstPageData.length} монет`)
    } catch (error) {
      console.error("Ошибка загрузки:", error.message)

      if (error.message === "Request failed with status code 429") {
        consecutiveErrorsRef.current += 1

        // Минимальная задержка 1 минута (60000 мс)
        const delay = Math.max(
          60000, // 1 минута минимум
          2000 * Math.pow(2, Math.min(consecutiveErrorsRef.current - 1, 5))
        )

        const delayInSeconds = Math.ceil(delay / 1000)

        console.log(`Ошибка 429. Устанавливаем отсчет ${delayInSeconds} секунд`)

        // Запуск обратного отсчета с функцией повтора
        startCountdown(delayInSeconds, () => {
          console.log("Автоматический повтор после отсчета")
          fetchInitialMarketData()
        })

        // Сообщение для пользователя
        dispatch(
          setMarketError(
            `Too many requests. Automatically repeat after ${delayInSeconds} sec...`
          )
        )
      } else {
        // Другие ошибки
        dispatch(setMarketError(error.message || "Ошибка загрузки данных"))
      }
    } finally {
      if (isMountedRef.current) {
        setFlagForLoader(false)
      }
    }
  }, [dispatch, flagForLoader, marketData.length, clearAllTimers, startCountdown])

  // Функция подгрузки следующей страницы
  const loadMoreData = useCallback(async () => {
    if (
      !marketHasMore ||
      marketIsLoadingMore ||
      isLoadingMoreRef.current ||
      !isMountedRef.current
    ) {
      console.log("Не загружаем: нет данных или уже идет загрузка")
      return
    }

    const pageToLoad = marketCurrentPage
    console.log(`Начало загрузки страницы ${pageToLoad}`)

    isLoadingMoreRef.current = true

    try {
      dispatch(setMarketIsLoadingMore(true))
      const nextPageData = await GetMarketData(pageToLoad)

      if (nextPageData.length === 0) {
        console.log("Больше данных для загрузки нет")
        dispatch(setMarketHasMore(false))
      } else {
        const existingIds = new Set(marketData.map((item) => item.id))
        const newItems = nextPageData.filter((item) => !existingIds.has(item.id))

        if (newItems.length > 0) {
          dispatch(addMoreMarketData(newItems))
          const nextPage = pageToLoad + 1
          dispatch(setMarketCurrentPage(nextPage))
          dispatch(setMarketLastUpdated(Date.now()))
          console.log(`Добавлено ${newItems.length} новых монет`)
        } else {
          console.log("Все монеты уже есть, увеличиваем счетчик")
          dispatch(setMarketCurrentPage(pageToLoad + 1))
        }
      }

      // Успешная загрузка - сбрасываем баннер 429
      if (is429Error) {
        console.log("Подгрузка успешна, скрываем баннер 429")
        setIs429Error(false)
        setRetryCountdown(0)
        clearAllTimers()
        dispatch(setMarketError(null))
      }

      consecutiveErrorsRef.current = 0
    } catch (error) {
      console.error(`Ошибка загрузки страницы ${marketCurrentPage}:`, error.message)

      if (error.message === "Request failed with status code 429") {
        consecutiveErrorsRef.current += 1

        // Минимальная задержка 1 минута
        const delay = Math.max(
          60000,
          2000 * Math.pow(2, Math.min(consecutiveErrorsRef.current - 1, 5))
        )

        const delayInSeconds = Math.ceil(delay / 1000)

        console.log(
          `Ошибка 429 при подгрузке. Устанавливаем отсчет ${delayInSeconds} секунд`
        )

        // Запуск обратного отсчета с функцией повтора
        startCountdown(delayInSeconds, () => {
          console.log("Автоматический повтор подгрузки после отсчета")
          loadMoreData()
        })

        dispatch(
          setMarketError(
            `Слишком много запросов. Автоматический повтор через ${delayInSeconds}сек...`
          )
        )

        return
      } else {
        // Другие ошибки
        dispatch(setMarketError(error.message))
      }
    } finally {
      if (isLoadingMoreRef.current && isMountedRef.current) {
        dispatch(setMarketIsLoadingMore(false))
        isLoadingMoreRef.current = false
      }
    }
  }, [
    marketHasMore,
    marketIsLoadingMore,
    marketCurrentPage,
    marketData,
    dispatch,
    is429Error,
    clearAllTimers,
    startCountdown
  ])

  // Функция обновления (pull-to-refresh)
  const handleRefresh = useCallback(async () => {
    if (!isMountedRef.current) return

    console.log("🌀 Pull-to-refresh")
    setRefreshing(true)
    try {
      clearAllTimers()

      // Сброс баннера при ручном обновлении
      if (is429Error) {
        setIs429Error(false)
        setRetryCountdown(0)
      }

      dispatch(resetMarketData())
      dispatch(setMarketError(null))
      initialLoadDoneRef.current = false
      consecutiveErrorsRef.current = 0

      await fetchInitialMarketData()
    } catch (error) {
      console.error("Ошибка:", error)
    } finally {
      if (isMountedRef.current) {
        setRefreshing(false)
      }
    }
  }, [dispatch, fetchInitialMarketData, clearAllTimers, is429Error])

  // Первая загрузка при монтировании - Только один раз!
  useEffect(() => {
    console.log("🏁 Компонент монтируется")
    isMountedRef.current = true

    // Загружаем только если еще не пытались
    if (!initialLoadAttempted && marketData.length === 0) {
      fetchInitialMarketData()
    }

    return () => {
      console.log("🧹 Компонент размонтируется")
      isMountedRef.current = false
      clearAllTimers()
    }
  }, []) // Запуск только при монтировании

  // Ручной повтор
  const handleManualRetry = useCallback(async () => {
    if (!isMountedRef.current) return

    console.log("Ручной повтор...")
    clearAllTimers()
    setIs429Error(false)
    setRetryCountdown(0)
    consecutiveErrorsRef.current = 0
    dispatch(setMarketError(null))

    try {
      if (marketData.length === 0) {
        await fetchInitialMarketData()
      }
    } catch (error) {
      console.error("Ошибка при ручном повторе:", error)
    }
  }, [clearAllTimers, dispatch, marketData.length, fetchInitialMarketData])

  const openModal = async (item) => {
    if (!isMountedRef.current) return

    setSelectedCoinData(item)
    setModalVisible(true)
    setIsLoading(true)

    try {
      const historicalData = await FetchCoinHistoricalData(item.id, switchChartDays)
      setCoinHistoryData(historicalData || [])
    } catch (error) {
      console.error("Ошибка:", error)
      setCoinHistoryData([])
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false)
      }
    }
  }

  const closeModal = () => {
    if (!isMountedRef.current) return

    setModalVisible(false)
    setSelectedCoinData(null)
    setCoinHistoryData([])
  }

  useEffect(() => {
    if (!isMountedRef.current || !selectedCoinData) return

    const fetchHistoricalData = async () => {
      setIsLoading(true)
      try {
        const historicalData = await FetchCoinHistoricalData(
          selectedCoinData.id,
          switchChartDays
        )
        setCoinHistoryData(historicalData || [])
      } catch (error) {
        console.error("Ошибка:", error)
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false)
        }
      }
    }

    fetchHistoricalData()
  }, [switchChartDays, selectedCoinData])

  const chartData = prepareChartData(coinHistoryData)
  const toggleModal = () => {
    if (!isMountedRef.current) return
    setModal(!modal)
  }

  const handleSearch = (text) => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current)
    }
    setTimeout(() => {
      if (isMountedRef.current) {
        setSearch(text)
      }
    }, 300)
  }

  return (
    <View style={styles.container}>
      {/* Баннер с ошибкой 429 */}
      {is429Error && (
        <View style={styles.compactPremiumBanner}>
          {/* Левая часть - индикатор ошибки */}
          <View style={styles.compactLeft}>
            <View style={styles.compactIconWrapper}>
              <Ionicons name='alert-circle' size={18} color='#FFD700' />
              <View style={styles.compactIconGlow} />
            </View>

            <View style={styles.compactTextWrapper}>
              <Text style={styles.compactTitle}>Rate Limit</Text>
              <Text style={styles.compactSubtitle}>
                Retry in <Text style={styles.compactTimer}>{retryCountdown}s</Text>
              </Text>
            </View>

            {/* Баннер с рекламой - правее текста ошибки */}
            <View style={styles.adBannerContainer}>
              <View style={styles.premiumBanner}>
                <View style={styles.bannerGradient}>
                  <Ionicons
                    name='sparkles'
                    size={12}
                    color='#FFD700'
                    style={styles.bannerIcon}
                  />
                  <Text style={styles.bannerText}>Premium Ad Space</Text>
                  {/* <View style={styles.bannerBadge}>
                    <Text style={styles.bannerBadgeText}>Premium</Text>
                  </View> */}
                </View>
              </View>
            </View>
          </View>

          {/* Кнопка ретрая */}
          <TouchableOpacity
            style={styles.compactRetryButton}
            onPress={handleManualRetry}
            activeOpacity={0.8}
          >
            <Text style={styles.compactButtonText}>Retry</Text>
          </TouchableOpacity>

          {/* Прогресс-бар */}
          <View style={styles.compactProgressTrack}>
            <View
              style={[
                styles.compactProgressBar,
                {
                  width: `${((60 - retryCountdown) / 60) * 100}%`
                }
              ]}
            />
          </View>
        </View>
      )}
      {/* Информация о состоянии */}
      {/*  <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Coins: {marketData.length} | Page:{" "}
          {marketCurrentPage === 1
            ? "1 (loaded)"
            : `${marketCurrentPage - 1} (loaded), next: ${marketCurrentPage}`}{" "}
          | Loading: {marketIsLoadingMore ? "Yes" : "No"} | More pages:{" "}
          {marketHasMore ? "Yes" : "No"}
          {is429Error && ` | Retry in: ${retryCountdown} sec`}
        </Text>
      </View> */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          <Text style={styles.infoLabel}>Coins:</Text>
          <Text style={styles.infoValue}> {marketData.length}</Text>

          <Text style={styles.infoLabel}> • Page:</Text>
          <Text style={styles.infoValue}>
            {marketCurrentPage === 1
              ? " 1 (loaded)"
              : ` ${marketCurrentPage - 1} → ${marketCurrentPage}`}
          </Text>

          <Text style={styles.infoLabel}> • Loading:</Text>
          <Text
            style={[
              styles.infoValue,
              marketIsLoadingMore ? styles.active : styles.inactive
            ]}
          >
            {marketIsLoadingMore ? " ✓" : " ✗"}
          </Text>

          <Text style={styles.infoLabel}> • More:</Text>
          <Text
            style={[
              styles.infoValue,
              marketHasMore ? styles.available : styles.unavailable
            ]}
          >
            {marketHasMore ? " ✓" : " ✗"}
          </Text>
        </Text>
      </View>

      <StatusBar backgroundColor='#0e0275' />
      <View style={styles.header}>
        <Text style={styles.title}>CryptoCurrencies</Text>

        <TextInput
          style={styles.searchInput}
          placeholder='Search Crypto'
          placeholderTextColor='#858585'
          onChangeText={handleSearch}
        />

        <View style={styles.openMenu}>
          <TouchableOpacity onPress={toggleModal}>
            <Ionicons style={styles.changeView} name='list' size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <ModalView modal={modal} setModal={setModal} />
      {/* Основной контент */}
      {flagForLoader && marketData.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#FFD700' />
          <Text style={styles.loadingText}>Loading data...</Text>
        </View>
      ) : (
        <>
          {marketData.length === 0 &&
            !flagForLoader &&
            !marketError &&
            !is429Error &&
            initialLoadAttempted && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No data</Text>
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={fetchInitialMarketData}
                >
                  <Text style={styles.retryButtonText}>Load data</Text>
                </TouchableOpacity>
              </View>
            )}

          {/* Всегда показываем CoinList если есть данные, даже при ошибке 429 */}
          {(marketData.length > 0 || is429Error) && (
            <>
              {!marketViewFlag ? (
                <CoinList
                  data={marketData}
                  search={search}
                  openModal={openModal}
                  refreshing={refreshing}
                  setRefreshing={setRefreshing}
                  fetchMarketData={handleRefresh}
                  errorMessage={is429Error ? null : marketError}
                  loadMoreData={loadMoreData}
                  isLoadingMore={marketIsLoadingMore}
                  hasMore={marketHasMore}
                />
              ) : (
                <CoinList2
                  data={marketData}
                  search={search}
                  openModal={openModal}
                  refreshing={refreshing}
                  setRefreshing={setRefreshing}
                  fetchMarketData={handleRefresh}
                  errorMessage={is429Error ? null : marketError}
                  loadMoreData={loadMoreData}
                  isLoadingMore={marketIsLoadingMore}
                  hasMore={marketHasMore}
                />
              )}
            </>
          )}
        </>
      )}
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
