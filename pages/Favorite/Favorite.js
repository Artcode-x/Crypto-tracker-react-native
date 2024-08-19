import React from "react"
import { View, StyleSheet, FlatList } from "react-native"
import { useSelector } from "react-redux"
import { coinSelector } from "../../store/toolkitSelectors"
import CoinItem from "../../components/CoinItem"

export default function Favorite() {
  const coinData = useSelector(coinSelector)

  return (
    <View style={styles.favlist}>
      <FlatList
        style={styles.favCoins}
        data={coinData.filter((coin) => coin.name.toLowerCase() || coin.symbol.toLowerCase())}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <CoinItem coin={item} />
          </View>
        )}
        numColumns={2}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  favlist: {
    backgroundColor: "#141414",
    flex: 1,
    alignItems: "center",
  },
  favCoins: {
    marginTop: "2%",
    width: "90%",
  },

  itemContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: "#696969",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 5,
  },
  list: {},
})
