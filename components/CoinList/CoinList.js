import React, { useEffect, useState, useCallback, useRef } from "react"
import {
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
  RefreshControl
} from "react-native"
import { styles } from "./CoinList.styles"
import { useDispatch, useSelector } from "react-redux"
import CoinItem from "../CoinItem/CoinItem"
import { Ionicons } from "@expo/vector-icons"
import { rewriteFavorite, setCoin, setDuplicate } from "../../store/reducersSlice"
import { coinSelector, duplicateSelector } from "../../store/toolkitSelectors"

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

  const onEndReachedCalledDuringMomentum = useRef(true)

  const { width } = Dimensions.get("window")
  const isSmallScreen = width < 375
  const isTablet = width > 768

  const getCardHeight = () => {
    if (isTablet) return 120
    if (isSmallScreen) return 80
    return 100
  }

  const getCardWidth = () => {
    const numColumns = 2
    const containerPadding = isSmallScreen ? 16 : 24
    const totalMargin = (numColumns + 1) * 8
    return (width - containerPadding - totalMargin) / numColumns
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
    const isDuplicate = favoriteCoins.some(
      (favoriteCoin) => favoriteCoin.id === coinData.id
    )

    if (isDuplicate) {
      dispatch(setDuplicate(coinData.id))
      setMsgDouble(true)
      setTimeout(() => {
        setMsgDouble(false)
      }, 1500)
    } else {
      dispatch(setCoin(coinData))
      setModalVisible(true)

      setFlag((prevFlag) => ({ ...prevFlag, [coinData.id]: true }))
      setTimeout(() => {
        setFlag((prevFlag) => ({ ...prevFlag, [coinData.id]: false }))
      }, 1800)

      setTimeout(() => {
        setModalVisible(false)
      }, 500)
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
      if (!item || !item.id) {
        return null
      }

      return (
        <View
          style={[
            flag[item.id] && { borderLeftWidth: 2, borderLeftColor: "orange" },
            styles.itemContainer,
            {
              height: getCardHeight(),
              width: getCardWidth()
            }
          ]}
        >
          <CoinItem
            coin={item}
            onPress={() => openModal(item)}
            cardHeight={getCardHeight()}
            cardWidth={getCardWidth()}
            isSmallScreen={isSmallScreen}
            isTablet={isTablet}
          />
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
              isSmallScreen && styles.smallAddButton
            ]}
          >
            {flag[item.id] ? (
              <Ionicons
                name='checkmark-circle-outline'
                size={isTablet ? 22 : isSmallScreen ? 16 : 20}
                color='green'
              />
            ) : (
              <Ionicons
                name='add-circle-outline'
                size={isTablet ? 22 : isSmallScreen ? 16 : 20}
                color='gray'
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

  const renderFooter = useCallback(() => {
    if (!isLoadingMore) return null

    return (
      <View style={styles.footerContainer}>
        <ActivityIndicator size='small' color='#0e0275' />
        <Text style={styles.footerText}>Загрузка...</Text>
      </View>
    )
  }, [isLoadingMore])

  const renderEmptyList = useCallback(() => {
    if (isLoadingMore || refreshing) return null

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {search ? "Ничего не найдено" : "Нет данных для отображения"}
        </Text>
        {errorMessage && !search && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}
      </View>
    )
  }, [search, isLoadingMore, refreshing, errorMessage])

  const keyExtractor = useCallback((item, index) => {
    if (!item || !item.id) {
      return `invalid_${index}_${Date.now()}`
    }
    return `${item.id}_${index}`
  }, [])

  return (
    <>
      <FlatList
        style={styles.list}
        data={filteredData}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainer}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
        onMomentumScrollBegin={handleMomentumScrollBegin}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true)
              await fetchMarketData()
              setRefreshing(false)
              onEndReachedCalledDuringMomentum.current = false
            }}
            colors={["#0e0275"]}
            tintColor='#0e0275'
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

      {hasMore && !isLoadingMore && filteredData.length > 0 && !search && (
        <View style={styles.moreDataIndicator}>
          <Text style={styles.moreDataText}>
            Есть еще данные. Прокрутите вниз для загрузки
          </Text>
        </View>
      )}

      <Modal
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.dropdown}>
          <TouchableOpacity style={styles.dropdownItem}>
            <Text style={styles.dropdownText}>Added in your favorites!</Text>
            <Ionicons style={styles.changePoint} name='paper-plane' size={30} />
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal transparent visible={msgDouble} onRequestClose={() => setMsgDouble(false)}>
        <View style={styles.dropdown}>
          <TouchableOpacity style={styles.dropdownItem}>
            <Text style={styles.dropdownText}>
              You already have {doubles} in your favorites!
            </Text>
            <Ionicons style={styles.changePoint} name='warning' size={30} />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  )
}

export default CoinList
