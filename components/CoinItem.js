import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"

const CoinItem = ({ coin, onPress }) => (
  <TouchableOpacity style={styles.containerItem} onPress={onPress}>
    <View style={styles.leftBlock}>
      <View style={styles.title}>
        <Text>{coin.name}</Text>
      </View>

      <View style={styles.image}>
        <Image source={{ uri: coin.image }} style={styles.image} />
      </View>
    </View>
    <View style={styles.otherInfo}>
      {/* <Text>{coin.market_cap_rank}</Text> */}
      {/* <Text>{coin.symbol}</Text> */}

      <Text style={styles.textPrice}>${coin.current_price}</Text>
      <Text
        style={[
          styles.pricePercentage,
          coin.price_change_percentage_24h > 0 ? styles.priceUp : styles.priceDown,
        ]}
      >
        {coin.price_change_percentage_24h.toFixed(2)}%
      </Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  containerItem: {
    paddingTop: 0,
    alignItems: "center",
    flexDirection: "row",
    height: "auto",
    flexWrap: "wrap",
    gap: 25,
    justifyContent: "space-between",
  },
  containerNames: {
    marginLeft: 10,
  },
  coinName: {
    flexDirection: "row",
  },
  text: {
    color: "#fff",
  },
  textPrice: {
    color: "#fff",
    fontWeight: "bold",
  },
  pricePercentage: {
    textAlign: "right",
  },
  priceUp: {
    color: "#00B589",
  },
  priceDown: {
    color: "#fc4422",
  },
  leftBlock: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    alignItems: "center",
    width: 30,
    height: 30,
  },
  textSymbol: {
    color: "#c8cbfa",
    textTransform: "uppercase",
  },
  otherInfo: {
    flex: 1,
    justifyContent: "right",
  },
  title: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 2,
    flexWrap: "nowrap",
  },
})

export default CoinItem
