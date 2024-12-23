import react, { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { styles } from "./CoinItem.styles"
import { useDispatch } from "react-redux";
import CoinItem from "../CoinItem/CoinItem";
import Ionicons from "react-native-vector-icons/Ionicons";
import { setCoin } from "../../store/reducersSlice";

const CoinList = ({data, openModal, search, refreshing, setRefreshing, fetchMarketData}) => {
  
    const dispatch = useDispatch();
    return (
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
                } = item; // Деструктурирую нужные поля
                const coinData = {
                  name,
                  current_price,
                  price_change_percentage_24h,
                  image,
                  otherInfo,
                  market_cap_rank,
                  symbol,
                };

                dispatch(setCoin(coinData)); // Диспатчим только необходимые данные из огромного обьекта
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
      />
    )
    
}


export default CoinList