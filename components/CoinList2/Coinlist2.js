import React, { useEffect, useState, useCallback, useRef } from "react"
import {
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Animated,
  ActivityIndicator
} from "react-native"
import { styles } from "./CoinList2.styles"
import { useDispatch, useSelector } from "react-redux"
import CoinItem from "../CoinItem/CoinItem"
import { Ionicons } from "@expo/vector-icons"
import { rewriteFavorite, setCoin, setDuplicate } from "../../store/reducersSlice"
import {
  bottomInset,
  coinSelector,
  duplicateSelector,
  viewMarketFlagSelector
} from "../../store/toolkitSelectors"
import { LinearGradient } from "expo-linear-gradient"

const CoinList2 = ({
  data,
  openModal,
  search,
  refreshing,
  setRefreshing,
  fetchMarketData,
  errorMessage,
  isSearching,
  searchResultsCount,
  searchError,
  loadMoreData,
  isLoadingMore,
  hasMore
}) => {
  const favoriteCoins = useSelector(coinSelector)
  const doubles = useSelector(duplicateSelector)
  const marketView = useSelector(viewMarketFlagSelector)
  const bottomInsets = useSelector(bottomInset)
  const dispatch = useDispatch()

  // Локальные состояния
  const [modalVisible, setModalVisible] = useState(false)
  const [msgDouble, setMsgDouble] = useState(false)
  const [animatedIcons, setAnimatedIcons] = useState({})

  // Refs для контроля подгрузки
  const onEndReachedCalledDuringMomentum = useRef(true)

  // Определение размеров экрана
  const { width } = Dimensions.get("window")
  const isSmallScreen = width < 375
  const isTablet = width > 768

  // проверяем есть ли данные
  const hasData = data && data.length > 0
  const showSearchStatus = search && search.length >= 2

  // Инициализация анимаций для всех иконок
  useEffect(() => {
    if (data && Array.isArray(data)) {
      const initialAnimations = {}
      data.forEach((coin) => {
        if (coin && coin.id) {
          initialAnimations[coin.id] = new Animated.Value(0)
        }
      })
      setAnimatedIcons(initialAnimations)
    }
  }, [data])

  // Обновление данных в избранном
  useEffect(() => {
    if (
      !data ||
      !Array.isArray(data) ||
      !favoriteCoins ||
      !Array.isArray(favoriteCoins)
    ) {
      return
    }

    const updatedCoins = []

    data.forEach((coin) => {
      if (!coin || !coin.id) return

      const existingCoin = favoriteCoins.find(
        (favCoin) => favCoin && favCoin.id === coin.id
      )

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
  }, [data, favoriteCoins, dispatch])

  // Функция анимации иконки при нажатии
  const animateIcon = (coinId) => {
    if (animatedIcons[coinId]) {
      animatedIcons[coinId].setValue(0)

      Animated.sequence([
        Animated.timing(animatedIcons[coinId], {
          toValue: 1,
          duration: 150,
          useNativeDriver: true
        }),
        Animated.timing(animatedIcons[coinId], {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true
        }),
        Animated.timing(animatedIcons[coinId], {
          toValue: 1,
          duration: 50,
          useNativeDriver: true
        })
      ]).start()
    }
  }

  // Добавление монеты в избранное
  const addToFavorite = (coinData) => {
    if (!coinData || !coinData.id) return

    const isDuplicate = favoriteCoins.some(
      (favoriteCoin) => favoriteCoin && favoriteCoin.id === coinData.id
    )

    animateIcon(coinData.id)

    if (isDuplicate) {
      dispatch(setDuplicate(coinData.id))
      setMsgDouble(true)
      setTimeout(() => {
        setMsgDouble(false)
      }, 1500)
    } else {
      dispatch(setCoin(coinData))
      setModalVisible(true)
      setTimeout(() => {
        setModalVisible(false)
      }, 1000)
    }
  }

  // Проверка, добавлена ли монета в избранное
  const isFavorite = (coinId) => {
    if (!coinId || !favoriteCoins) return false
    return favoriteCoins.some((coin) => coin && coin.id === coinId)
  }

  // Адаптивный размер иконки
  const getIconSize = () => {
    if (isTablet) return 20
    if (isSmallScreen) return 14
    return 18
  }

  // Подгрузка новой стр при скролле
  const handleEndReached = useCallback(() => {
    // Не подгружаем при поиске или если уже грузится
    if (search || isLoadingMore || !hasMore || !loadMoreData || isSearching) {
      return
    }

    if (onEndReachedCalledDuringMomentum.current) {
      return
    }

    console.log("CoinList2: Подгрузка дополнительных данных...")
    onEndReachedCalledDuringMomentum.current = true
    loadMoreData()

    setTimeout(() => {
      onEndReachedCalledDuringMomentum.current = false
    }, 2000)
  }, [search, isLoadingMore, hasMore, loadMoreData, isSearching])

  //  Сброс флага подгрузки
  const handleMomentumScrollBegin = useCallback(() => {
    onEndReachedCalledDuringMomentum.current = false
  }, [])

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

  // Компонент для отображения статуса поиска
  const renderSearchStatus = useCallback(() => {
    if (!search || search.length < 2) {
      return null
    }

    if (searchError) {
      return (
        <View style={styles.searchErrorContainer}>
          <Ionicons name='alert-circle-outline' size={20} color='#FF6B6B' />
          <Text style={styles.searchErrorText}>{searchError}</Text>
          <Text style={styles.searchErrorSubtext}>
            Please wait a moment and try again
          </Text>
        </View>
      )
    }

    if (isSearching) {
      return (
        <View style={styles.searchingContainer}>
          <ActivityIndicator size='small' color='#FFD700' />
          <Text style={styles.searchingText}>Searching coins...</Text>
        </View>
      )
    }

    if (searchResultsCount === 0 && !isSearching) {
      return (
        <View style={styles.noResultsContainer}>
          <Ionicons name='search-outline' size={30} color='#666' />
          <Text style={styles.noResultsText}>No coins found for "{search}"</Text>
          <Text style={styles.noResultsSubtext}>Try another search term</Text>
        </View>
      )
    }

    if (searchResultsCount > 0) {
      return (
        <View style={styles.resultsCountContainer}>
          <Text style={styles.resultsCountText}>
            Found {searchResultsCount} result{searchResultsCount !== 1 ? "s" : ""} for "
            {search}"
          </Text>
        </View>
      )
    }

    return null
  }, [search, isSearching, searchResultsCount, searchError])

  // Рендер отдельного элемента списка
  const renderItem = ({ item }) => {
    if (!item || !item.id) {
      return null
    }

    const isCoinFavorite = isFavorite(item.id)
    const scaleAnim = animatedIcons[item.id] || new Animated.Value(1)

    const animatedStyle = {
      transform: [
        {
          scale: scaleAnim.interpolate({
            inputRange: [0, 0.8, 1],
            outputRange: [1, 1.3, 1.1]
          })
        }
      ]
    }

    return (
      <View style={styles.itemContainer}>
        <CoinItem coin={item} marketView={marketView} onPress={() => openModal(item)} />

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
            isTablet && styles.tabletAddButton,
            isSmallScreen && styles.smallAddButton,
            isCoinFavorite && styles.favoriteActive
          ]}
          activeOpacity={0.7}
        >
          <Animated.View style={[styles.iconContainer, animatedStyle]}>
            <Ionicons
              name={isCoinFavorite ? "bookmark" : "bookmark-outline"}
              size={getIconSize()}
              color={isCoinFavorite ? "#00D8A3" : marketView ? "#FFD700" : "#8B93A5"}
            />

            {isCoinFavorite && (
              <Animated.View
                style={[
                  styles.pulseEffect,
                  {
                    opacity: scaleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.3, 0]
                    })
                  }
                ]}
              />
            )}
          </Animated.View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <>
      {/* Отображение ошибки API (только когда нет активного поиска) */}
      {/* {errorMessage && !search && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMsg}>{errorMessage}</Text>
        </View>
      )} */}

      {/* Основной список */}
      <FlatList
        style={styles.list}
        data={data || []}
        keyExtractor={(item) => {
          if (!item || !item.id) {
            return `coin-${Math.random()}`
          }
          return item.id
        }}
        renderItem={renderItem}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingBottom: bottomInsets.bottom > 0 ? bottomInsets.bottom + 60 : 55
          }
        ]}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
        onMomentumScrollBegin={handleMomentumScrollBegin}
        ListFooterComponent={renderFooter}
        ListHeaderComponent={showSearchStatus ? renderSearchStatus : null}
        ListEmptyComponent={
          !showSearchStatus && !refreshing && !hasData ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No data to display</Text>
            </View>
          ) : null
        }
        // Pull-to-refresh
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true)
          try {
            await fetchMarketData()
          } catch (error) {
            console.error("Error refreshing:", error)
          } finally {
            setRefreshing(false)
            onEndReachedCalledDuringMomentum.current = false // Сброс флага
          }
        }}
        // Доп проверка скролла для подгрузки
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent
          const isCloseToBottom =
            layoutMeasurement.height + contentOffset.y >= contentSize.height - 100

          if (
            isCloseToBottom &&
            !onEndReachedCalledDuringMomentum.current &&
            !isLoadingMore &&
            hasMore &&
            !search &&
            !isSearching
          ) {
            console.log("CoinList2: Скролл близко к низу, запускаем загрузку")
            handleEndReached()
          }
        }}
        scrollEventThrottle={16}
        // Оптимизация производительности
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
      />

      {/* Модальные окна (ВАШ КОД БЕЗ ИЗМЕНЕНИЙ) */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType='fade'
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successModal}>
            <Ionicons name='checkmark-circle' size={50} color='#4CAF50' />
            <Text style={styles.modalTitle}>Success!</Text>
            <Text style={styles.modalText}>Coin added to favorites</Text>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={msgDouble}
        onRequestClose={() => setMsgDouble(false)}
        animationType='fade'
      >
        <View style={styles.modalOverlay}>
          <View style={styles.warningModal}>
            <Ionicons name='warning' size={50} color='#FFD700' />
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

export default CoinList2
