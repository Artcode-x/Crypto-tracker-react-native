import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { styles } from "./CoinItem.styles"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

const CoinItem = ({ coin, onPress, marketView }) => (
  <TouchableOpacity style={styles.containerItem} onPress={onPress}>
    <View style={styles.leftBlock}>
      <View style={styles.title}>
        {marketView ? (
          <View>
            <Text style={styles.titleCoin}>{coin.name}</Text>
            {marketView && (
              <View style={styles.box4}>
                <Text style={styles.textPrice}>Current price: </Text>
                <Text style={styles.box2}> ${coin.current_price}</Text>
              </View>
            )}
            <View style={styles.box3}>
              {marketView && (
                <>
                  <Text style={styles.textPrice}>Difference 24H: </Text>
                  <Text
                    style={[
                      styles.pricePercentageS,
                      coin.price_change_percentage_24h > 0
                        ? styles.priceUp
                        : styles.priceDown
                    ]}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </Text>
                </>
              )}
            </View>

            <Text style={styles.textPrice2}>Price difference in 7 days:</Text>
            <Text
              style={[
                styles.pricePercentage2,
                coin.price_change_percentage_7d_in_currency > 0
                  ? styles.priceUp
                  : styles.priceDown
              ]}
            >
              {coin.price_change_percentage_7d_in_currency.toFixed(2)} %
            </Text>
            {/* <Text>{coin.total_supply}</Text> */}
          </View>
        ) : (
          <Text>{coin.name}</Text>
        )}
      </View>

      <View style={styles.image}>
        <Image source={{ uri: coin.image }} style={styles.image} />
      </View>
    </View>

    <View style={styles.otherInfo}>
      {marketView && (
        <>
          <Text style={styles.titleInfo}>Market cup rank: {coin.market_cap_rank}</Text>
          <View style={styles.box}>
            <Text style={styles.textPrice}>High 24H {coin.high_24h}</Text>
            <Text style={styles.textPrice}>Low 24H {coin.low_24h}</Text>
          </View>
          <Text style={styles.textPrice}>Total Vol: {coin.total_volume}</Text>

          <Text style={styles.textPrice}>
            ATL Date: {format(new Date(coin.atl_date), "dd MMMM yyyy", { locale: ru })}
          </Text>
          <Text>{coin.circulating_supply}</Text>

          {/* <Text>{coin.symbol}</Text> */}
        </>
      )}

      {!marketView && <Text style={styles.textPrice}>${coin.current_price}</Text>}

      {!marketView && (
        <View style={styles.box2}>
          <Text
            style={[
              styles.pricePercentage,
              coin.price_change_percentage_24h > 0 ? styles.priceUp : styles.priceDown
            ]}
          >
            {coin.price_change_percentage_24h.toFixed(2)}%
          </Text>
        </View>
      )}

      {/* <Text>In circulation: {coin.circulating_supply}</Text> */}
      {/* <Text
        style={[
          styles.pricePercentage,
          coin.price_change_percentage_24h > 0 ? styles.priceUp : styles.priceDown
        ]}
      >
        {coin.price_change_percentage_24h.toFixed(2)}%
      </Text> */}
    </View>
  </TouchableOpacity>
)

export default CoinItem
