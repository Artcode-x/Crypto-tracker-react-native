import React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import { styles } from "./CoinItem.styles"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

const CoinItem = ({
  coin,
  onPress,
  marketView,
  cardHeight,
  cardWidth,
  isSmallScreen,
  isTablet
}) => {
  // Функция для форматирования объема
  const formatVolume = (volume) => {
    if (volume >= 1000000000) return `${(volume / 1000000000).toFixed(1)}B`
    if (volume >= 1000000) return `${(volume / 1000000).toFixed(1)}M`
    if (volume >= 1000) return `${(volume / 1000).toFixed(1)}K`
    return volume?.toFixed(0) || "0"
  }

  // Функция для форматирования supply
  const formatSupply = (supply) => {
    if (!supply) return "N/A"
    if (supply >= 1000000000) return `${(supply / 1000000000).toFixed(1)}B`
    if (supply >= 1000000) return `${(supply / 1000000).toFixed(1)}M`
    if (supply >= 1000) return `${(supply / 1000).toFixed(1)}K`
    return supply.toFixed(0)
  }

  const formatCoinName = (name) => {
    const maxLength = isSmallScreen ? 12 : isTablet ? 18 : 15
    return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name
  }

  const getChangeStyle = (value) => {
    const isPositive = value > 0
    return [
      styles.changeValue,
      isPositive ? styles.priceUp : styles.priceDown,
      isPositive ? styles.positiveGlow : styles.negativeGlow,
      isTablet && styles.tabletChangeValue,
      isSmallScreen && styles.smallChangeValue
    ]
  }

  return (
    <TouchableOpacity
      style={[
        styles.containerItem,
        {
          height: cardHeight - (isSmallScreen ? 8 : 12),
          width: cardWidth - (isSmallScreen ? 8 : 12)
        }
      ]}
      onPress={onPress}
    >
      {marketView ? (
        // Премиум - детальный вид
        <View style={styles.detailedView}>
          {/* Левая панель - основная информация */}
          <View style={styles.leftBlock}>
            <View style={styles.title}>
              <Text
                style={[
                  styles.titleCoin,
                  isTablet && styles.tabletTitleCoin,
                  isSmallScreen && styles.smallTitleCoin
                ]}
              >
                {formatCoinName(coin.name)}
              </Text>

              {/* Текущая цена */}
              <View style={styles.priceBlock}>
                <View style={styles.priceRow}>
                  <Text
                    style={[
                      styles.priceLabel,
                      isTablet && styles.tabletPriceLabel,
                      isSmallScreen && styles.smallPriceLabel
                    ]}
                  >
                    PRICE
                  </Text>
                  <Text
                    style={[
                      styles.priceValue,
                      isTablet && styles.tabletPriceValue,
                      isSmallScreen && styles.smallPriceValue
                    ]}
                  >
                    ${coin.current_price}
                  </Text>
                </View>
              </View>

              {/* Изменения цены */}
              <View style={styles.changeBlock}>
                <Text
                  style={[
                    styles.changeLabel,
                    isTablet && styles.tabletChangeLabel,
                    isSmallScreen && styles.smallChangeLabel
                  ]}
                >
                  24H
                </Text>
                <Text style={getChangeStyle(coin.price_change_percentage_24h)}>
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </Text>
              </View>

              <View style={styles.changeBlock}>
                <Text
                  style={[
                    styles.changeLabel,
                    isTablet && styles.tabletChangeLabel,
                    isSmallScreen && styles.smallChangeLabel
                  ]}
                >
                  7D
                </Text>
                <Text style={getChangeStyle(coin.price_change_percentage_7d_in_currency)}>
                  {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
                </Text>
              </View>
            </View>

            <Image
              source={{ uri: coin.image }}
              style={[
                styles.detailCoinImage,
                isTablet && styles.tabletDetailCoinImage,
                isSmallScreen && styles.smallDetailCoinImage
              ]}
            />
          </View>

          {/* Правая панель - статистика */}
          <View style={styles.otherInfo}>
            {/* Ранг */}
            <View style={styles.infoCard}>
              <Text
                style={[
                  styles.infoTitle,
                  isTablet && styles.tabletInfoTitle,
                  isSmallScreen && styles.smallInfoTitle
                ]}
              >
                RANK
              </Text>
              <Text
                style={[
                  styles.infoValue,
                  isTablet && styles.tabletInfoValue,
                  isSmallScreen && styles.smallInfoValue
                ]}
              >
                #{coin.market_cap_rank}
              </Text>
            </View>

            {/* High/Low */}
            <View style={styles.infoCard}>
              <Text
                style={[
                  styles.infoTitle,
                  isTablet && styles.tabletInfoTitle,
                  isSmallScreen && styles.smallInfoTitle
                ]}
              >
                24H RANGE
              </Text>
              <Text
                style={[
                  styles.infoValue,
                  isTablet && styles.tabletInfoValue,
                  isSmallScreen && styles.smallInfoValue
                ]}
              >
                ${coin.low_24h}
              </Text>
              <Text
                style={[
                  styles.infoValue,
                  isTablet && styles.tabletInfoValue,
                  isSmallScreen && styles.smallInfoValue
                ]}
              >
                - ${coin.high_24h}
              </Text>
            </View>

            {/* Volume & Supply */}
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text
                  style={[
                    styles.statLabel,
                    isTablet && styles.tabletStatLabel,
                    isSmallScreen && styles.smallStatLabel
                  ]}
                >
                  VOL
                </Text>
                <Text
                  style={[
                    styles.statNumber,
                    isTablet && styles.tabletStatNumber,
                    isSmallScreen && styles.smallStatNumber
                  ]}
                >
                  {formatVolume(coin.total_volume)}
                </Text>
              </View>

              <View style={styles.statItem}>
                <Text
                  style={[
                    styles.statLabel,
                    isTablet && styles.tabletStatLabel,
                    isSmallScreen && styles.smallStatLabel
                  ]}
                >
                  SUPPLY
                </Text>
                <Text
                  style={[
                    styles.statNumber,
                    isTablet && styles.tabletStatNumber,
                    isSmallScreen && styles.smallStatNumber
                  ]}
                >
                  {formatSupply(coin.total_supply)}
                </Text>
              </View>

              <View style={styles.statItem}>
                <Text
                  style={[
                    styles.statLabel,
                    isTablet && styles.tabletStatLabel,
                    isSmallScreen && styles.smallStatLabel
                  ]}
                >
                  CIRC
                </Text>
                <Text
                  style={[
                    styles.statNumber,
                    isTablet && styles.tabletStatNumber,
                    isSmallScreen && styles.smallStatNumber
                  ]}
                >
                  {formatSupply(coin.circulating_supply)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        // Простой вид
        <View style={styles.simpleView}>
          <View style={styles.leftSection}>
            <Image
              source={{ uri: coin.image }}
              style={[
                styles.coinImage,
                isTablet && styles.tabletCoinImage,
                isSmallScreen && styles.smallCoinImage
              ]}
            />
            <View style={styles.nameSection}>
              <Text
                style={[
                  styles.coinName,
                  isTablet && styles.tabletCoinName,
                  isSmallScreen && styles.smallCoinName
                ]}
                numberOfLines={1}
                ellipsizeMode='tail'
              >
                {formatCoinName(coin.name)}
              </Text>
              <Text
                style={[
                  styles.coinSymbol,
                  isTablet && styles.tabletCoinSymbol,
                  isSmallScreen && styles.smallCoinSymbol
                ]}
                numberOfLines={1}
              >
                {coin.symbol?.toUpperCase()}
              </Text>
            </View>
          </View>

          <View style={styles.rightSection}>
            <Text
              style={[
                styles.coinPrice,
                isTablet && styles.tabletCoinPrice,
                isSmallScreen && styles.smallCoinPrice
              ]}
              numberOfLines={1}
            >
              ${coin.current_price}
            </Text>
            <Text
              style={[
                styles.priceChange,
                coin.price_change_percentage_24h > 0 ? styles.priceUp : styles.priceDown,
                coin.price_change_percentage_24h > 0
                  ? styles.positiveGlow
                  : styles.negativeGlow,
                isTablet && styles.tabletPriceChange,
                isSmallScreen && styles.smallPriceChange
              ]}
            >
              {coin.price_change_percentage_24h?.toFixed(2)}%
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  )
}

export default CoinItem
