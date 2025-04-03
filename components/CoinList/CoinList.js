import { useEffect, useState } from "react"
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./CoinList.styles"
import { useDispatch, useSelector } from "react-redux"
import CoinItem from "../CoinItem/CoinItem"
import Ionicons from "react-native-vector-icons/Ionicons"
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

  useEffect(() => {
    if (data) {
      const updatedCoins = [] // Массив для хранения обновленных коинов

      data.forEach((coin) => {
        const existingCoin = favoriteCoins.find((favCoin) => favCoin.id === coin.id)

        if (existingCoin) {
          // Если монета уже в избранных, проверяю, изменились ли данные
          if (existingCoin.current_price !== coin.current_price) {
            // достаем из data только нужные ключи/значения
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
            console.log(updatedCoin)
            updatedCoins.push(updatedCoin)
          }
        }
      })
      console.log(updatedCoins)
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
      console.log("Дубликат найден: " + coinData.id)
      dispatch(setDuplicate(coinData.id))
      setMsgDouble(true)
      setTimeout(() => {
        setMsgDouble(false)
      }, 1500)
    } else {
      console.log("Нет дублей")
      dispatch(setCoin(coinData))
      setModalVisible(true)

      setFlag((prevFlag) => ({ ...prevFlag, [coinData.id]: true }))
      setTimeout(() => {
        setFlag((prevFlag) => ({ ...prevFlag, [coinData.id]: false })) // Сброс флага через время
      }, 1800)

      setTimeout(() => {
        setModalVisible(false)
      }, 500)
    }
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
          renderItem={({ item }) => (
            // <View style={[marketView && { flexWrap: "wrap" }, styles.leftBlock]}>
            <View
              style={[
                flag[item.id] && { borderLeftWidth: 2, borderLeftColor: "orange" },
                styles.itemContainer
              ]}
            >
              <CoinItem coin={item} onPress={() => openModal(item)} />
              {/* Иконка добавления в избранное+ */}
              <TouchableOpacity
                onPress={() => {
                  const {
                    name,
                    current_price,
                    price_change_percentage_24h,
                    image,
                    otherInfo,
                    market_cap_rank,
                    symbol,
                    id
                  } = item // Деструктурирую нужные поля
                  const coinData = {
                    name,
                    current_price,
                    price_change_percentage_24h,
                    image,
                    otherInfo,
                    market_cap_rank,
                    symbol,
                    id
                  }

                  //  dispatch(setCoin(coinData)); // Диспатчим только необходимые данные из огромного обьекта
                  addToFavorite(coinData)
                }}
                style={styles.addButton}
              >
                {flag[item.id] ? (
                  <Ionicons
                    name='checkmark-circle-outline'
                    size={24}
                    color='green'
                  ></Ionicons>
                ) : (
                  <Ionicons name='add-circle-outline' size={24} color='gray' />
                )}
              </TouchableOpacity>
            </View>
          )}
          numColumns={2}
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
        <View style={styles.modalBox}>
          <View style={styles.modalCont}>
            <Text style={styles.modalT}>Added to favorite!</Text>
          </View>
        </View>
      </Modal>

      <Modal transparent visible={msgDouble} onRequestClose={() => setMsgDouble(false)}>
        <View style={styles.modalBox}>
          <View style={styles.modalCont}>
            <Text style={styles.modalT2}>
              You already have {doubles} in your favorites!
            </Text>
          </View>
        </View>
      </Modal>
    </>
  )
}

export default CoinList
