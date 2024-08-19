import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { coinSelector } from "../../store/toolkitSelectors"
import { useSelector } from "react-redux"

const Test = ({ onPress }) => {
  const coinData = useSelector(coinSelector)
  console.log(coinData)
  return (
    <TouchableOpacity style={styles.containerItem} onPress={onPress}>
      <View style={styles.leftBlock}>
        <View style={styles.title}>
          <Text>{coinData.name}</Text>
        </View>

        <View style={styles.image}>
          <Image source={{ uri: coinData.image }} style={styles.image} />
        </View>
      </View>
      <View style={styles.otherInfo}>
        {/* <Text>{coinData.market_cap_rank}</Text> */}
        {/* <Text>{coinData.symbol}</Text> */}

        <Text style={styles.textPrice}>${coinData.current_price}</Text>
        <Text
          style={[
            styles.pricePercentage,
            coinData.price_change_percentage_24h > 0 ? styles.priceUp : styles.priceDown,
          ]}
        >
          {coinData.price_change_percentage_24h}%
        </Text>
      </View>
    </TouchableOpacity>
  )
}

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
  coinDataName: {
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

export default Test
