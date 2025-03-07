import React, { useState } from "react"
import { View, FlatList } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { coinSelector } from "../../store/toolkitSelectors"
import CoinItem from "../../components/CoinItem/CoinItem"
import Ionicons from "react-native-vector-icons/Ionicons"
import { TouchableOpacity } from "react-native"
import { removeCoin } from "../../store/reducersSlice"
import { styles } from "./Favorite.styles"

export default function Favorite() {
  const dispatch = useDispatch()
  const coinData = useSelector(coinSelector)

  const [flag, setFlag] = useState({})

  const removeFromFav = (coin) => {
    setFlag((prev) => ({ ...prev, [coin.id]: true }))

    setTimeout(() => {
      setFlag({})
      dispatch(removeCoin(coin))
    }, 1500)
  }
  console.log(flag)
  return (
    <View style={styles.favlist}>
      <FlatList
        style={styles.favCoins}
        data={coinData.filter(
          (coin) => coin.name.toLowerCase() || coin.symbol.toLowerCase()
        )}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <CoinItem coin={item} />
            <TouchableOpacity onPress={() => removeFromFav(item)}>
              {flag[item.id] ? (
                <Ionicons name='close-circle-outline' size={24} color='red'></Ionicons>
              ) : (
                <Ionicons name='remove-circle-outline' size={24} color='gray' />
              )}

              {/*   {flag[item.id] ? (
                  <Ionicons
                    name='checkmark-circle-outline'
                    size={24}
                    color='green'
                  ></Ionicons>
                ) : (
                  <Ionicons name='add-circle-outline' size={24} color='gray' />
                )}*/}
            </TouchableOpacity>
          </View>
        )}
        numColumns={2}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}
