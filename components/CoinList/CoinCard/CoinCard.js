import React, { useState, useEffect, useRef } from "react"
import { View, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import CoinItem from "../../CoinItem/CoinItem"
import { styles } from "../CoinList.styles"

const CoinCard = ({
  item,
  isFavorite,
  openModal,
  addToFavorite,
  cardHeight,
  cardWidth,
  isSmallScreen,
  isTablet
}) => {
  const [showBar, setShowBar] = useState(false)
  const timerRef = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Если первый рендер – пропуск показа полоски
    if (isFirstRender.current) {
      isFirstRender.current = false
      setShowBar(false)
      return
    }

    if (isFavorite) {
      setShowBar(true)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setShowBar(false), 1800)
    } else {
      setShowBar(false)
      if (timerRef.current) clearTimeout(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isFavorite])

  return (
    <View
      style={[
        styles.itemContainer,
        {
          height: cardHeight,
          width: cardWidth
        }
      ]}
    >
      <LinearGradient
        colors={["rgba(70,72,74,0.99)", "rgba(32,34,38,0.8)"]}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.cardBorder} />

      {/* Зелёная полоска */}
      {showBar && (
        <View
          style={{
            position: "absolute",
            left: 0,
            top: 1,
            bottom: 0,
            width: 4,
            backgroundColor: "#4CAF50",
            borderTopLeftRadius: 18,
            borderBottomLeftRadius: 18,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            zIndex: 5
          }}
        />
      )}

      <View style={styles.contentWrapper}>
        <CoinItem
          coin={item}
          onPress={() => openModal(item)}
          cardHeight={cardHeight}
          cardWidth={cardWidth}
          isSmallScreen={isSmallScreen}
          isTablet={isTablet}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          const coinData = {
            name: item.name,
            current_price: item.current_price,
            price_change_percentage_24h: item.price_change_percentage_24h,
            image: item.image,
            otherInfo: item.otherInfo,
            market_cap_rank: item.market_cap_rank,
            symbol: item.symbol,
            id: item.id
          }
          addToFavorite(coinData)
        }}
        style={[
          styles.addButton,
          isTablet && styles.tabletAddButton,
          isSmallScreen && styles.smallAddButton,
          isFavorite && styles.addButtonActive
        ]}
      >
        {isFavorite ? (
          <Ionicons
            name='checkmark-circle'
            size={isTablet ? 24 : isSmallScreen ? 18 : 22}
            // color='rgba(184, 134, 11, 1)'
            color='#4CAF50'
            //  color='#D4AF37'
            style={{ opacity: 0.8 }}
          />
        ) : (
          <Ionicons
            name='add-circle-outline'
            size={isTablet ? 24 : isSmallScreen ? 18 : 22}
            color='rgba(198, 165, 60, 0.75)'
          />
        )}
      </TouchableOpacity>
    </View>
  )
}

export default CoinCard
