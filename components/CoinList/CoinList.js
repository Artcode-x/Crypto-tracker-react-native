import React, { useEffect, useState, useCallback, useRef } from "react"
import {
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl,
  Dimensions
} from "react-native"
import { isSmallScreen, styles } from "./CoinList.styles"
import { useDispatch, useSelector } from "react-redux"
import CoinItem from "../CoinItem/CoinItem"
import { Ionicons } from "@expo/vector-icons"
import { rewriteFavorite, setCoin, setDuplicate } from "../../store/reducersSlice"
import {
  bottomInset,
  coinSelector,
  duplicateSelector
} from "../../store/toolkitSelectors"
import { LinearGradient } from "expo-linear-gradient"

const CoinList = ({
  data,
  openModal,
  search,
  refreshing,
  setRefreshing,
  fetchMarketData,
  errorMessage,
  loadMoreData,
  isLoadingMore,
  hasMore
}) => {
  const favoriteCoins = useSelector(coinSelector)
  const doubles = useSelector(duplicateSelector)
  const [msgDouble, setMsgDouble] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [flag, setFlag] = useState({})
  const dispatch = useDispatch()
  const bottomInsets = useSelector(bottomInset)
  const isButtonPressed = useRef(false)

  // Динамическое определение размеров
  const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width)

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setWindowWidth(window.width)
    })

    return () => subscription?.remove()
  }, [])

  // Функция определения планшета
  const isTablet = useCallback(() => {
    const width = windowWidth
    const height = Dimensions.get("window").height

    // Простая логика для Expo Go
    if (width >= 768) return true

    // Для Nexus 9 и подобных устройств
    const screenRatio = Math.max(width, height) / Math.min(width, height)
    const pixelRatio = windowWidth / 360 // базовая ширина телефона

    // Если ширина в dp больше 600 и соотношение сторон меньше 1.6
    if (width / pixelRatio >= 600 && screenRatio < 1.6) {
      return true
    }

    return false
  }, [windowWidth])

  const onEndReachedCalledDuringMomentum = useRef(true)

  const getCardHeight = () => {
    const tablet = isTablet()
    if (tablet) return 120
    if (isSmallScreen) return 80
    return 100
  }

  const getCardWidth = () => {
    const tablet = isTablet()
    const numColumns = tablet ? 3 : 2
    const containerPadding = isSmallScreen ? 16 : 24
    const totalMargin = (numColumns + 1) * 8
    return (windowWidth - containerPadding - totalMargin) / numColumns
  }

  useEffect(() => {
    if (data) {
      const updatedCoins = []

      data.forEach((coin) => {
        const existingCoin = favoriteCoins.find((favCoin) => favCoin.id === coin.id)

        if (existingCoin) {
          if (existingCoin.current_price !== coin.current_price) {
            const updatedCoin = {
              name: coin.name,
              current_price: coin.current_price,
              price_change_percentage_24h: coin.price_change_percentage_24h,
              image: coin.image,
              otherInfo: coin.otherInfo,
              market_cap_rank: coin.market_cap_rank,
              symbol: coin.symbol,
              id: coin.id
            }
            updatedCoins.push(updatedCoin)
          }
        }
      })

      if (updatedCoins.length > 0) {
        dispatch(rewriteFavorite(updatedCoins))
      }
    }
  }, [data])

  const addToFavorite = (coinData) => {
    if (isButtonPressed.current) {
      console.log("Блокировка: слишком быстрое нажатие")
      return
    }

    // Блокируем кнопку
    isButtonPressed.current = true

    const isDuplicate = favoriteCoins.some(
      (favoriteCoin) => favoriteCoin.id === coinData.id
    )

    if (isDuplicate) {
      dispatch(setDuplicate(coinData.id))
      setMsgDouble(true)
      setTimeout(() => {
        setMsgDouble(false)
        // Разблокируем ПОСЛЕ того, как скроется предупреждение
        isButtonPressed.current = false
      }, 1000)
    } else {
      dispatch(setCoin(coinData))
      setModalVisible(true)

      setFlag((prevFlag) => ({ ...prevFlag, [coinData.id]: true }))

      // Единый таймер на разблокировку ПОСЛЕ всех анимаций
      setTimeout(() => {
        setFlag((prevFlag) => ({ ...prevFlag, [coinData.id]: false }))
        setModalVisible(false)
        // Разблокируем только когда всё закончится (после 1800ms)
        isButtonPressed.current = false
      }, 1800) // Ждем окончания самой долгой анимации
    }
  }

  const filteredData = React.useMemo(() => {
    if (!Array.isArray(data)) {
      return []
    }

    const cleanData = data.filter(
      (item) => item && typeof item === "object" && item.id && item.name
    )

    if (!search || search.trim() === "") {
      return cleanData
    }

    const searchLower = search.toLowerCase()
    return cleanData.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchLower) ||
        coin.symbol.toLowerCase().includes(searchLower)
    )
  }, [data, search])

  const renderItem = useCallback(
    ({ item }) => {
      if (!item || !item.id) return null

      const tablet = isTablet()
      const cardWidth = getCardWidth()
      const cardHeight = getCardHeight()

      return (
        <View
          style={[
            styles.itemContainer,
            {
              height: cardHeight,
              width: cardWidth
            }
          ]}
        >
          <LinearGradient
            colors={["rgba(70,72,74,0.99)", "rgba(32,34,38,0.8)"]}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />

          <View style={styles.cardBorder} />

          {flag[item.id] && (
            <View
              style={{
                position: "absolute",
                left: 0,
                top: 1,
                bottom: 0,
                width: 4,
                backgroundColor: "#4CAF50",
                borderTopLeftRadius: 18,
                borderBottomLeftRadius: 18,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                zIndex: 5
                // overflow: "hidden"
              }}
            />
          )}

          <View style={styles.contentWrapper}>
            <CoinItem
              coin={item}
              onPress={() => openModal(item)}
              cardHeight={cardHeight}
              cardWidth={cardWidth}
              isSmallScreen={isSmallScreen}
              isTablet={tablet}
            />
          </View>

          {/* КНОПКА ДОБАВЛЕНИЯ */}
          <TouchableOpacity
            onPress={() => {
              const coinData = {
                name: item.name,
                current_price: item.current_price,
                price_change_percentage_24h: item.price_change_percentage_24h,
                image: item.image,
                otherInfo: item.otherInfo,
                market_cap_rank: item.market_cap_rank,
                symbol: item.symbol,
                id: item.id
              }
              addToFavorite(coinData)
            }}
            style={[
              styles.addButton,
              tablet && styles.tabletAddButton,
              isSmallScreen && styles.smallAddButton,
              flag[item.id] && styles.addButtonActive
            ]}
          >
            {flag[item.id] ? (
              <Ionicons
                name='checkmark-circle'
                size={tablet ? 24 : isSmallScreen ? 18 : 22}
                color='#4CAF50'
              />
            ) : (
              <Ionicons
                name='add-circle-outline'
                size={tablet ? 24 : isSmallScreen ? 18 : 22}
                color='rgba(198, 165, 60, 0.75)'
              />
            )}
          </TouchableOpacity>
        </View>
      )
    },
    [flag, isSmallScreen, isTablet, openModal]
  )

  const handleEndReached = useCallback(() => {
    if (search || isLoadingMore || !hasMore || !loadMoreData) {
      return
    }

    if (onEndReachedCalledDuringMomentum.current) {
      return
    }

    console.log("CoinList: Подгрузка дополнительных данных...")
    onEndReachedCalledDuringMomentum.current = true
    loadMoreData()

    setTimeout(() => {
      onEndReachedCalledDuringMomentum.current = false
    }, 2000)
  }, [search, isLoadingMore, hasMore, loadMoreData])

  const handleMomentumScrollBegin = useCallback(() => {
    onEndReachedCalledDuringMomentum.current = false
  }, [])

  const renderEmptyList = useCallback(() => {
    if (isLoadingMore || refreshing) return null

    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyGradient}>
          <Text style={styles.emptyText}>
            {search ? "No results found" : "No data to display"}
          </Text>
          {errorMessage && !search && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}
        </View>
      </View>
    )
  }, [search, isLoadingMore, refreshing, errorMessage])

  const renderFooter = useCallback(() => {
    if (!isLoadingMore || search) return null

    return (
      <View style={styles.footerContainer}>
        <LinearGradient
          colors={["rgba(212, 175, 55, 0.2)", "transparent"]}
          style={styles.footerGradient}
        >
          <ActivityIndicator size='small' color='#D4AF37' />
          <Text style={styles.footerText}>Loading more assets...</Text>
        </LinearGradient>
      </View>
    )
  }, [isLoadingMore, search])

  const keyExtractor = useCallback((item, index) => {
    if (!item || !item.id) {
      return `invalid_${index}_${Date.now()}`
    }
    return `${item.id}_${index}`
  }, [])

  // Определяем количество колонок
  const numColumns = isTablet() ? 3 : 2

  return (
    <>
      <FlatList
        style={styles.list}
        data={filteredData}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        numColumns={numColumns}
        keyExtractor={keyExtractor}
        // contentContainerStyle={[styles.contentContainer, { paddingBottom: 55 }]}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingBottom:
              bottomInsets.bottom > 0
                ? bottomInsets.bottom + 60 // Если есть навигационная панель, добавляем отступ
                : 55 // Если нет, используем стандартный отступ
          }
        ]}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
        onMomentumScrollBegin={handleMomentumScrollBegin}
        ListEmptyComponent={renderEmptyList}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true)
              await fetchMarketData()
              setRefreshing(false)
              onEndReachedCalledDuringMomentum.current = false
            }}
            colors={["#FFD700"]}
            tintColor='#FFD700'
            progressBackgroundColor='#0A0A0F'
          />
        }
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={11}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={50}
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent
          const isCloseToBottom =
            layoutMeasurement.height + contentOffset.y >= contentSize.height - 100

          if (
            isCloseToBottom &&
            !onEndReachedCalledDuringMomentum.current &&
            !isLoadingMore &&
            hasMore &&
            !search
          ) {
            console.log("CoinList: Скролл близко к низу, запускаем загрузку")
            handleEndReached()
          }
        }}
        scrollEventThrottle={16}
      />

      <Modal
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successModal}>
            <Ionicons name='checkmark-circle' size={40} color='#4CAF50' />
            <Text style={styles.modalTitle}>Success!</Text>
            <Text style={styles.modalText}>Coin added to favorites</Text>
          </View>
        </View>
      </Modal>

      <Modal transparent visible={msgDouble} onRequestClose={() => setMsgDouble(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.warningModal}>
            <Ionicons name='warning' size={40} color='#FFD700' />
            <Text style={styles.modalTitle}>Already Added</Text>
            <Text style={styles.modalText}>
              You already have {doubles} in your favorites!
            </Text>
          </View>
        </View>
      </Modal>
    </>
  )
}

export default CoinList
