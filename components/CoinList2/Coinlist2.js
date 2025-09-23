import { useEffect, useState } from "react"
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./CoinList2.styles"
import { useDispatch, useSelector } from "react-redux"
import CoinItem from "../CoinItem/CoinItem"
import { Ionicons } from '@expo/vector-icons'
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
  const dispatch = useDispatch()

  const marketView = useSelector(viewMarketFlagSelector)

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
      dispatch(setCoin(coinData)) // Диспатчим только необходимые данные из огромного обьекта
      setModalVisible(true)

      setTimeout(() => {
        setModalVisible(false)
      }, 1000)
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
            <View style={styles.itemContainer}>
              <CoinItem
                coin={item}
                marketView={marketView}
                onPress={() => openModal(item)}
              />
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
                    id,
                    low_24h,
                    atl_date,
                    circulating_supply,
                    high_24h,
                    price_change_percentage_7d_in_currency,
                    total_volume,
                    total_supply
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
                    // low_24,
                    // atl_date,
                    // circulating_supply,
                    // high_24h,
                    // price_change_percentage_7d_in_currency,
                    // total_volume,
                    // total_supply
                  }

                  addToFavorite(coinData)
                }}
                style={styles.addButton}
              >
                <Ionicons name='add-circle' size={24} color='#000' />
              </TouchableOpacity>
            </View>
          )}
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
