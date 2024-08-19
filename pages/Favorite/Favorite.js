import React from "react"
import { View, Text, TextInput, StatusBar, StyleSheet, FlatList } from "react-native"
import { useSelector } from "react-redux"
import { coinSelector } from "../../store/toolkitSelectors"

import Test from "../test/test"
import CoinItem from "../../components/CoinItem"

export default function Favorite() {
  const coinData = useSelector(coinSelector)

  return (
    // <View style={styles.container}>
    //   <StatusBar backgroundColor="#0e0275" />
    //   <View style={styles.header}>
    //     <Text style={styles.title}>CryptoCurrencies</Text>
    //     <TextInput style={styles.searchInput} placeholder="Search Cryptos" placeholderTextColor="#858585" />
    //   </View>
    //   <View style={styles.list}>
    //     <View style={styles.itemContainer}>
    //       <Test onPress={() => console.log(item)} />
    //     </View>
    //   </View>
    <View>
      <FlatList
        // style={styles.list}
        data={coinData.filter((coin) => coin.name.toLowerCase() || coin.symbol.toLowerCase())}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <CoinItem coin={item} />
            {/* <Test coin={item} /> */}
            {/* Иконка добавления в избранное+ */}
          </View>
        )}
        numColumns={2}
        keyExtractor={(item) => item.id}
        // refreshing={refreshing}
      />
    </View>
    // </View>
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
    height: "20%",
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
