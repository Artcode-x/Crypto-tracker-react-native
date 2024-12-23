import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import {styles} from './CoinItem.styles'

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

export default CoinItem
