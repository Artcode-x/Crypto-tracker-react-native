import { useEffect, useState } from "react"
import { FlatList, Modal, Text, TouchableOpacity, View, Dimensions } from "react-native"
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
  errorMessage
}) => {
  const favoriteCoins = useSelector(coinSelector)
  const doubles = useSelector(duplicateSelector)
  const [msgDouble, setMsgDouble] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [flag, setFlag] = useState({})
  const dispatch = useDispatch()

  const { width } = Dimensions.get("window")
  const isSmallScreen = width < 375
  const isTablet = width > 768

  // ФИКСИРОВАННАЯ ВЫСОТА КАРТОЧКИ
  const getCardHeight = () => {
    if (isTablet) return 120
    if (isSmallScreen) return 90
    return 100
  }

  // РАСЧЕТ ШИРИНЫ КАРТОЧКИ
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
    console.log(isDuplicate)
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

  const renderItem = ({ item }) => (
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

  return (
    <>
      {errorMessage !== null ? (
        <Text style={styles.errorMsg}>{errorMessage}</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={data?.filter(
            (coin) =>
              coin.name.toLowerCase().includes(search?.toLowerCase() || "") ||
              coin.symbol.toLowerCase().includes(search?.toLowerCase() || "")
          )}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(item) => item.id}
          refreshing={refreshing}
          onRefresh={async () => {
            setRefreshing(true)
            await fetchMarketData()
            setRefreshing(false)
          }}
          contentContainerStyle={styles.contentContainer}
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
