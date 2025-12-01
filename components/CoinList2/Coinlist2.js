import { useEffect, useState } from "react"
import {
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Animated
} from "react-native"
import { styles } from "./CoinList2.styles"
import { useDispatch, useSelector } from "react-redux"
import CoinItem from "../CoinItem/CoinItem"
import { Ionicons } from "@expo/vector-icons"
import { rewriteFavorite, setCoin, setDuplicate } from "../../store/reducersSlice"
import { coinSelector, viewMarketFlagSelector } from "../../store/toolkitSelectors"

const CoinList2 = ({
  data,
  openModal,
  search,
  refreshing,
  setRefreshing,
  fetchMarketData,
  errorMessage
}) => {
  const favoriteCoins = useSelector(coinSelector)
  const [modalVisible, setModalVisible] = useState(false)
  const [msgDouble, setMsgDouble] = useState(false)
  const [animatedIcons, setAnimatedIcons] = useState({})
  const dispatch = useDispatch()

  const { width } = Dimensions.get("window")
  const isSmallScreen = width < 375
  const isTablet = width > 768
  const marketView = useSelector(viewMarketFlagSelector)

  // Инициализация анимаций для всех иконок
  useEffect(() => {
    if (data) {
      const initialAnimations = {}
      data.forEach((coin) => {
        initialAnimations[coin.id] = new Animated.Value(0)
      })
      setAnimatedIcons(initialAnimations)
    }
  }, [data])

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

  // Функция анимации при нажатии
  const animateIcon = (coinId) => {
    if (animatedIcons[coinId]) {
      // Сброс анимации
      animatedIcons[coinId].setValue(0)

      // Последовательная анимация
      Animated.sequence([
        // Увеличение
        Animated.timing(animatedIcons[coinId], {
          toValue: 1,
          duration: 150,
          useNativeDriver: true
        }),
        // Уменьшение
        Animated.timing(animatedIcons[coinId], {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true
        }),
        // Возврат к нормальному размеру
        Animated.timing(animatedIcons[coinId], {
          toValue: 1,
          duration: 50,
          useNativeDriver: true
        })
      ]).start()
    }
  }

  const addToFavorite = (coinData) => {
    const isDuplicate = favoriteCoins.some(
      (favoriteCoin) => favoriteCoin.id === coinData.id
    )

    // Запуск анимации
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
    return favoriteCoins.some((coin) => coin.id === coinId)
  }

  // Адаптивный размер иконки
  const getIconSize = () => {
    if (isTablet) return 26
    if (isSmallScreen) return 18
    return 22
  }

  return (
    <>
      {errorMessage !== null ? (
        <Text style={styles.errorMsg}>{errorMessage}</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={data?.filter(
            (coin) =>
              coin.name.toLowerCase().includes(search.toLowerCase()) ||
              coin.symbol.toLowerCase().includes(search.toLowerCase())
          )}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
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
                <CoinItem
                  coin={item}
                  marketView={marketView}
                  onPress={() => openModal(item)}
                />

                {/* Адаптивная + аним-ая иконка добавления */}
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
                      color={
                        isCoinFavorite ? "#00D8A3" : marketView ? "#FFD700" : "#8B93A5"
                      }
                    />

                    {/* Эффект пульсации для активного состояния */}
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
          }}
          numColumns={1}
          keyExtractor={(item) => item.id}
          refreshing={refreshing}
          onRefresh={async () => {
            setRefreshing(true)
            await fetchMarketData()
            setRefreshing(false)
          }}
        />
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
              You already have this coin in your favorites!
            </Text>
            <Ionicons style={styles.changePoint} name='warning' size={30} />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  )
}

export default CoinList2
