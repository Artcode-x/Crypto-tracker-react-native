import { useEffect, useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./CoinItem.styles"
import { useDispatch, useSelector } from "react-redux";
import CoinItem from "../CoinItem/CoinItem";
import Ionicons from "react-native-vector-icons/Ionicons";
import { rewriteFavorite, setCoin } from "../../store/reducersSlice";
import { coinSelector } from "../../store/toolkitSelectors";

const CoinList = ({data, openModal, search, refreshing, setRefreshing, fetchMarketData, errorMessage}) => {
  const favoriteCoins = useSelector(coinSelector)
  const [modalVisible, setModalVisible] = useState(false)
    const dispatch = useDispatch();



  useEffect(() => {
    if (data) {
      const updatedCoins = []; // Массив для хранения обновленных коинов

      data.forEach(coin => {
        const existingCoin = favoriteCoins.find(favCoin => favCoin.id === coin.id);

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
              };
            console.log(updatedCoin);
            updatedCoins.push(updatedCoin); 
          }
        }
      });
console.log(updatedCoins);
      if (updatedCoins.length > 0) {
        dispatch(rewriteFavorite(updatedCoins)); 
      }
    }
  }, [data]); 

    // useEffect(() => {
    //     if (data) {
    //         data.forEach(coin => {
    //             const existingCoin = favoriteCoins.find(favCoin => favCoin.id === coin.id);

    //             if (existingCoin) {
    //                
    //                 if (existingCoin.current_price !== coin.current_price) {
    //                     console.log(coin);
    //                     dispatch(rewriteFavorite(coin)); // сохр полные данные о монете
    //                 }
    //             }
    //         });
    //     }
    // }, [data]); 

    const addToFavorite = (coinData) => {
          dispatch(setCoin(coinData))
         setModalVisible(true)

        setTimeout(() => {
            setModalVisible(false);
        }, 500);
    }

  

    return (
      
      <>
      {errorMessage !== null ? (   <Text style={styles.errorMsg}>{errorMessage}</Text>) : (  <FlatList
        style={styles.list}
        data={data?.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.toLowerCase())
        )}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
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
                } = item; // Деструктурирую нужные поля
                const coinData = {
                  name,
                  current_price,
                  price_change_percentage_24h,
                  image,
                  otherInfo,
                  market_cap_rank,
                  symbol,
                  id
                };

              //  dispatch(setCoin(coinData)); // Диспатчим только необходимые данные из огромного обьекта
              addToFavorite(coinData)
              }}
              style={styles.addButton}
            >
              <Ionicons name="add-circle" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        )}
        numColumns={2}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true);
          await fetchMarketData();
          setRefreshing(false);
        }}
        
      />)}
      
      
      <Modal transparent visible={modalVisible}  
    onRequestClose={() => setModalVisible(false)}>
      <View style={styles.modalBox}>
        <View style={styles.modalCont}>
          <Text style={styles.modalT}>Added to favorite!</Text>
        </View>
     </View>
    </Modal>
    </>
         
    )
    
}


export default CoinList