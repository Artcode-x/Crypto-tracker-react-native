import React from "react"
import { View, Text, TextInput, StatusBar, StyleSheet } from "react-native"
import Test from "../../pages/test/test"

export default function Favorite() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0e0275" />
      <View style={styles.header}>
        <Text style={styles.title}>CryptoCurrencies</Text>
        <TextInput style={styles.searchInput} placeholder="Search Cryptos" placeholderTextColor="#858585" />
      </View>
      <View style={styles.list}>
        <View style={styles.itemContainer}>
          <Test />
        </View>
      </View>
      <View></View>
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
