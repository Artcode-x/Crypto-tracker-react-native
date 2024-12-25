import React from "react"
import { View, FlatList } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { coinSelector } from "../../store/toolkitSelectors"
import CoinItem from "../../components/CoinItem/CoinItem"
import Ionicons from "react-native-vector-icons/Ionicons"
import { TouchableOpacity } from "react-native"
import { removeCoin } from "../../store/reducersSlice"
import { styles } from './Favorite.styles'

export default function Favorite() {
  const dispatch = useDispatch()
  const coinData = useSelector(coinSelector)

  const removeFromFav = (coin) => {
    dispatch(removeCoin(coin));
  }

  return (
 
    <View style={styles.favlist}>
    
      <FlatList
        style={styles.favCoins}
        data={coinData.filter((coin) => coin.name.toLowerCase() || coin.symbol.toLowerCase())}
        renderItem={({ item }) => (
         
          <View style={styles.itemContainer}>
            <CoinItem coin={item} />
            <TouchableOpacity onPress={() => removeFromFav(item)}>
            <Ionicons name="remove-circle-sharp" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        
        )}
        numColumns={2}
        keyExtractor={(item) => item.id}
      />
   
    </View>
  
  
  )
}
