// Исправление CoinList

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
  hasMore,
  isSearching,
  searchResultsCount,
  searchError
}) => {
  const favoriteCoins = useSelector(coinSelector)
  const doubles = useSelector(duplicateSelector)
  const [msgDouble, setMsgDouble] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

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

    if (width >= 768) return true

    const screenRatio = Math.max(width, height) / Math.min(width, height)
    const pixelRatio = windowWidth / 360

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
      return
    }

    isButtonPressed.current = true

    const isDuplicate = favoriteCoins.some(
      (favoriteCoin) => favoriteCoin.id === coinData.id
    )

    if (isDuplicate) {
      dispatch(setDuplicate(coinData.id))
      setMsgDouble(true)
      setTimeout(() => {
        setMsgDouble(false)
        isButtonPressed.current = false
      }, 1000)
    } else {
      dispatch(setCoin(coinData))
      setModalVisible(true)

      setTimeout(() => {
        setModalVisible(false)
        isButtonPressed.current = false
      }, 1800)
    }
  }

  // Очистка данных от невалидных элементов
  const validData = React.useMemo(() => {
    if (!Array.isArray(data)) return []
    return data.filter((item) => item && typeof item === "object" && item.id && item.name)
  }, [data])

  const renderItem = useCallback(
    ({ item }) => {
      if (!item || !item.id) return null

      const tablet = isTablet()
      const cardWidth = getCardWidth()
      const cardHeight = getCardHeight()
      const isFavorite = favoriteCoins.some((fav) => fav.id === item.id)

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

          {isFavorite && (
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
              isFavorite && styles.addButtonActive
            ]}
          >
            {isFavorite ? (
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
    [favoriteCoins, isSmallScreen, isTablet, openModal]
  )

  const handleEndReached = useCallback(() => {
    if (search || isLoadingMore || !hasMore || !loadMoreData || isSearching) {
      return
    }

    if (onEndReachedCalledDuringMomentum.current) {
      return
    }

    onEndReachedCalledDuringMomentum.current = true
    loadMoreData()

    setTimeout(() => {
      onEndReachedCalledDuringMomentum.current = false
    }, 2000)
  }, [search, isLoadingMore, hasMore, loadMoreData, isSearching])

  const handleMomentumScrollBegin = useCallback(() => {
    onEndReachedCalledDuringMomentum.current = false
  }, [])

  const renderEmptyList = useCallback(() => {
    if (search) return null

    if (isLoadingMore || refreshing || isSearching) return null

    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyGradient}>
          <Text style={styles.emptyText}>No data to display</Text>
          {errorMessage && !search && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}
        </View>
      </View>
    )
  }, [search, isLoadingMore, refreshing, errorMessage, isSearching])

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

  const numColumns = isTablet() ? 3 : 2

  const renderSearchStatus = useCallback(() => {
    if (!search || search.length < 2) return null

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

    return null
  }, [search, isSearching, searchResultsCount, searchError])

  return (
    <>
      <FlatList
        style={styles.list}
        data={validData}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        numColumns={numColumns}
        keyExtractor={keyExtractor}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingBottom: bottomInsets.bottom > 0 ? bottomInsets.bottom + 60 : 55
          }
        ]}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
        onMomentumScrollBegin={handleMomentumScrollBegin}
        ListEmptyComponent={renderEmptyList}
        ListFooterComponent={renderFooter}
        ListHeaderComponent={renderSearchStatus}
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
            !search &&
            !isSearching
          ) {
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
