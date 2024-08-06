import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, StatusBar, FlatList, TextInput, Image } from "react-native"

import CoinItem from "./components/CoinItem"
import { getMarketData } from "./services/cryptoService"
import ListItem from "./components/ListItem"

// const ListHeader = () => (
//   <>
//     <View style={styles.titleWrapper}>
//       <Text style={styles.largeTitle}>Markets</Text>
//     </View>
//     <View style={styles.divider} />
//   </>
// )

const App = () => {
  const [coins, setCoins] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [search, setSearch] = useState("")

  const loadData = async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
    const data = await res.json()
    // console.log("data: ", data)
    setCoins(data)
  }

  useEffect(() => {
    loadData()
  }, [])

  const [data, setData] = useState([])
  const [selectedCoinData, setSelectedCoinData] = useState(null)

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData()
      setData(marketData)
    }

    fetchMarketData()
  }, [])

  const openModal = (item) => {
    setSelectedCoinData(item)
    console.log(selectedCoinData)
    // bottomSheetModalRef.current?.present()
  }

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

      {/* <FlatList
        keyExtractor={(item) => item.id}
        data={data}
        renderItem={({ item }) => (
          <ListItem
            name={item.name}
            symbol={item.symbol}
            currentPrice={item.current_price}
            priceChangePercentage7d={item.price_change_percentage_7d_in_currency}
            logoUrl={item.image}
            onPress={() => openModal(item)}
          />
        )}
        ListHeaderComponent={<ListHeader />}
      /> */}

      <FlatList
        style={styles.list}
        data={coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
            coin.symbol.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <CoinItem coin={item} onPress={() => openModal(item)} />
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
    flex: 1,
    margin: 5,
    backgroundColor: "#696969",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 5,
  },
})

export default App
