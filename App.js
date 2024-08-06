import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, StatusBar, FlatList, TextInput, Image } from "react-native"

const App = () => {
  const [coins, setCoins] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [search, setSearch] = useState("")

  const loadData = async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
    const data = await res.json()
    console.log("data: ", data)
    setCoins(data)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0e0275" />

      <View style={styles.header}>
        <Text style={styles.title}>CryptoCurrencies</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Cryptos"
          placeholderTextColor="#858585"
          onChangeText={(text) => text && setSearch(text)}
        />
      </View>

      <FlatList
        style={styles.list}
        data={coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
            coin.symbol.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          // <CoinItem coin={item} />
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text>{item.market_cap_rank}</Text>
            <Text>{item.name}</Text>
            <Text>{item.symbol}</Text>

            <Text
              style={[
                styles.pricePercentage,
                item.price_change_percentage_24h > 0 ? styles.priceUp : styles.priceDown,
              ]}
            >
              {item.price_change_percentage_24h.toFixed(2)}%
            </Text>
            <Text style={styles.textPrice}>${item.current_price}</Text>
          </View>
        )}
        numColumns={2}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true)
          await loadData()
          setRefreshing(false)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    flex: 1,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    marginTop: 10,
  },
  list: {
    width: "90%",
  },
  searchInput: {
    color: "#fff",
    borderBottomColor: "#c8cbfa",
    borderBottomWidth: 1,
    width: "40%",
    textAlign: "left",
  },
  itemContainer: {
    flex: 1, // Указываем, что каждый элемент будет занимать равное пространство
    margin: 5, // Добавляем отступ между элементами
    backgroundColor: "darkgray",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 5,
  },

  //
  pricePercentage: {
    // textAlign: "right",
  },
  priceUp: {
    color: "#00B589",
  },
  priceDown: {
    color: "#fc4422",
  },
  textPrice: {
    color: "gray",
    fontWeight: "bold",
  },
  image: {
    width: 30,
    height: 30,
  },
})

export default App
