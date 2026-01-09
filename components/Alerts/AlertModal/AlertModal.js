import React, { useState, useEffect, useRef } from "react"
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Animated,
  Dimensions,
  Alert
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import * as Haptics from "expo-haptics"
import { styles } from "./AlertModal.styles"

const { width, height } = Dimensions.get("window")
const isSmallDevice = width < 375
const isAndroid = Platform.OS === "android"
const isIOS = Platform.OS === "ios"

const AlertModal = ({
  visible,
  onClose,
  onSave,
  coin,
  currentPrice,
  notificationPermission,
  fcmToken = null
}) => {
  const [targetPrice, setTargetPrice] = useState("")
  const [condition, setCondition] = useState("above")
  const [error, setError] = useState("")
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const [suggestedPrices, setSuggestedPrices] = useState([])
  const inputRef = useRef(null)
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start()

      // Автофокус с задержкой для лучшего UX
      setTimeout(() => {
        inputRef.current?.focus()
      }, 350)

      generatePriceSuggestions()
    } else {
      fadeAnim.setValue(0)
    }
  }, [visible, currentPrice])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardVisible(true)
    })

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false)
    })

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  const generatePriceSuggestions = () => {
    if (!currentPrice) return

    const suggestions = []
    const percentages = isAndroid ? [2, 5, 10] : [1, 5, 10, 25]

    percentages.forEach((percent) => {
      const abovePrice = currentPrice * (1 + percent / 100)
      suggestions.push({
        price: parseFloat(abovePrice.toFixed(coin.price < 1 ? 6 : 2)),
        label: `+${percent}%`,
        condition: "above"
      })

      if (percent > 1) {
        const belowPrice = currentPrice * (1 - percent / 100)
        suggestions.push({
          price: parseFloat(belowPrice.toFixed(coin.price < 1 ? 6 : 2)),
          label: `-${percent}%`,
          condition: "below"
        })
      }
    })

    setSuggestedPrices(suggestions.slice(0, isAndroid ? 4 : 6))
  }

  const handleSave = () => {
    const price = parseFloat(targetPrice)

    if (!targetPrice.trim()) {
      setError("Please enter a price")
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      return
    }

    if (!price || price <= 0) {
      setError("Please enter a valid price (greater than 0)")
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      return
    }

    const priceDiff = Math.abs(price - currentPrice)
    const diffPercentage = (priceDiff / currentPrice) * 100

    if (diffPercentage < 0.01) {
      Alert.alert(
        "Price Too Close",
        `The target price is very close to current price (${diffPercentage.toFixed(
          2
        )}% difference).\nAre you sure you want to set this alert?`,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Confirm", onPress: () => saveAlert(price) }
        ]
      )
      return
    }

    saveAlert(price)
  }

  const saveAlert = (price) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)

    onSave({
      coinId: coin.id,
      coinName: coin.name,
      coinSymbol: coin.symbol,
      targetPrice: price,
      currentPrice: currentPrice,
      condition: condition,
      fcmToken: fcmToken,
      syncStatus: fcmToken && notificationPermission ? "pending" : "local_only",
      priceDifference: (((price - currentPrice) / currentPrice) * 100).toFixed(2)
    })

    setTargetPrice("")
    setCondition("above")
    setError("")
    Keyboard.dismiss()
    onClose()
  }

  const handleClose = () => {
    Keyboard.dismiss()
    onClose()
  }

  const formatPrice = (price) => {
    if (!price) return "0.00"
    if (price >= 1000)
      return price.toLocaleString(undefined, { maximumFractionDigits: 2 })
    if (price >= 1)
      return price.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4
      })
    if (price >= 0.001)
      return price.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
      })
    return price.toFixed(8)
  }

  const getNotificationType = () => {
    if (!notificationPermission) {
      return {
        icon: "notifications-off",
        color: "#FF6B6B",
        text: "Notifications disabled",
        type: "disabled"
      }
    }

    if (fcmToken) {
      return {
        icon: "cloud",
        color: "#4CAF50",
        text: "Push notifications enabled",
        type: "fcm"
      }
    }

    return {
      icon: "notifications",
      color: "#FFA000",
      text: "Local notifications",
      type: "local"
    }
  }

  const notificationType = getNotificationType()

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType='slide'
      onRequestClose={handleClose}
      statusBarTranslucent={true}
    >
      <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={isIOS ? 0 : 20}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              style={[styles.modalContainer, isAndroid && styles.modalContainerAndroid]}
            >
              <LinearGradient
                colors={["rgba(26, 26, 26, 0.98)", "rgba(40, 40, 40, 0.95)"]}
                style={[styles.modalGradient, isAndroid && styles.modalGradientAndroid]}
              >
                {/* Компактный заголовок с кнопкой закрытия */}
                <View style={styles.compactHeader}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={handleClose}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons name='close' size={20} color='rgba(255,255,255,0.7)' />
                  </TouchableOpacity>

                  <View style={styles.compactCoinInfo}>
                    <View style={styles.coinHeader}>
                      <Text
                        style={[styles.coinName, isAndroid && styles.coinNameAndroid]}
                        numberOfLines={1}
                      >
                        {coin.name}
                      </Text>
                      <Text
                        style={[styles.coinSymbol, isAndroid && styles.coinSymbolAndroid]}
                      >
                        {coin.symbol?.toUpperCase()}
                      </Text>
                    </View>

                    <View style={styles.compactPriceInfo}>
                      <View style={styles.currentPriceContainer}>
                        <Text
                          style={[
                            styles.currentPriceLabel,
                            isAndroid && styles.currentPriceLabelAndroid
                          ]}
                        >
                          Current:
                        </Text>
                        <Text
                          style={[
                            styles.currentPrice,
                            isAndroid && styles.currentPriceAndroid
                          ]}
                        >
                          ${formatPrice(currentPrice)}
                        </Text>
                      </View>

                      {/* Компактный индикатор уведомлений */}
                      <View style={styles.compactNotificationStatus}>
                        <Ionicons
                          name={notificationType.icon}
                          size={isAndroid ? 10 : 11}
                          color={notificationType.color}
                        />
                        <Text
                          style={[
                            styles.compactNotificationText,
                            { color: notificationType.color },
                            isAndroid && styles.compactNotificationTextAndroid
                          ]}
                        >
                          {notificationType.type === "fcm"
                            ? "Push"
                            : notificationType.type === "local"
                            ? "Local"
                            : "Off"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={[
                    styles.scrollContainer,
                    isAndroid && styles.scrollContainerAndroid
                  ]}
                  keyboardShouldPersistTaps='handled'
                  bounces={false}
                >
                  {/* Условие алерта - ОЧЕНЬ компактное */}
                  <View
                    style={[
                      styles.conditionSection,
                      isAndroid && styles.conditionSectionAndroid
                    ]}
                  >
                    <Text
                      style={[
                        styles.sectionTitle,
                        isAndroid && styles.sectionTitleAndroid
                      ]}
                    >
                      Alert when price is:
                    </Text>
                    <View
                      style={[
                        styles.conditionButtons,
                        isAndroid && styles.conditionButtonsAndroid
                      ]}
                    >
                      {[
                        {
                          value: "above",
                          label: "Above",
                          icon: "trending-up",
                          color: "#00C853"
                        },
                        {
                          value: "below",
                          label: "Below",
                          icon: "trending-down",
                          color: "#FF3B30"
                        }
                      ].map((item) => (
                        <TouchableOpacity
                          key={item.value}
                          onPress={() => {
                            setCondition(item.value)
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                          }}
                          style={[
                            styles.conditionButton,
                            condition === item.value && styles.conditionButtonActive,
                            isAndroid && styles.conditionButtonAndroid
                          ]}
                        >
                          <View
                            style={[
                              styles.conditionButtonContent,
                              isAndroid && styles.conditionButtonContentAndroid
                            ]}
                          >
                            <Ionicons
                              name={item.icon}
                              size={isAndroid ? 16 : 18}
                              color={
                                condition === item.value ? "#FFF" : `${item.color}AA`
                              }
                            />
                            <Text
                              style={[
                                styles.conditionButtonText,
                                condition === item.value &&
                                  styles.conditionButtonTextActive,
                                isAndroid && styles.conditionButtonTextAndroid
                              ]}
                            >
                              {item.label}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                  {/* Ввод целевой цены */}
                  <View
                    style={[
                      styles.priceInputSection,
                      isAndroid && styles.priceInputSectionAndroid
                    ]}
                  >
                    <Text
                      style={[
                        styles.sectionTitle,
                        isAndroid && styles.sectionTitleAndroid
                      ]}
                    >
                      Target Price (USD):
                    </Text>

                    <View
                      style={[
                        styles.priceInputContainer,
                        isAndroid && styles.priceInputContainerAndroid
                      ]}
                    >
                      <View
                        style={[
                          styles.currencyContainer,
                          isAndroid && styles.currencyContainerAndroid
                        ]}
                      >
                        <Text
                          style={[
                            styles.currencySymbol,
                            isAndroid && styles.currencySymbolAndroid
                          ]}
                        >
                          $
                        </Text>
                      </View>

                      <TextInput
                        ref={inputRef}
                        style={[styles.priceInput, isAndroid && styles.priceInputAndroid]}
                        value={targetPrice}
                        onChangeText={(text) => {
                          let filteredText = text
                            .replace(/[^0-9.]/g, "")
                            .replace(/(\..*)\./g, "$1")

                          if (filteredText.length > 15) {
                            filteredText = filteredText.slice(0, 15)
                          }

                          setTargetPrice(filteredText)
                          setError("")
                        }}
                        placeholder='0.00'
                        placeholderTextColor='rgba(255, 255, 255, 0.3)'
                        keyboardType='decimal-pad'
                        returnKeyType='done'
                        onSubmitEditing={handleSave}
                        blurOnSubmit={true}
                        contextMenuHidden={true}
                        selectTextOnFocus={true}
                        textAlign='center'
                      />

                      {targetPrice.length > 0 && (
                        <TouchableOpacity
                          style={[
                            styles.clearButton,
                            isAndroid && styles.clearButtonAndroid
                          ]}
                          onPress={() => setTargetPrice("")}
                          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                          <Ionicons
                            name='close-circle'
                            size={isAndroid ? 16 : 18}
                            color='rgba(255,255,255,0.5)'
                          />
                        </TouchableOpacity>
                      )}
                    </View>

                    {error ? (
                      <View style={styles.errorContainer}>
                        <Ionicons name='warning' size={12} color='#FF6B6B' />
                        <Text
                          style={[styles.errorText, isAndroid && styles.errorTextAndroid]}
                        >
                          {error}
                        </Text>
                      </View>
                    ) : null}

                    {/* Быстрые предложения - компактные */}
                    {suggestedPrices.length > 0 && !keyboardVisible && (
                      <View
                        style={[
                          styles.quickSuggestions,
                          isAndroid && styles.quickSuggestionsAndroid
                        ]}
                      >
                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          style={styles.suggestionsScroll}
                          contentContainerStyle={styles.suggestionsContent}
                        >
                          {suggestedPrices.map((suggestion, index) => (
                            <TouchableOpacity
                              key={index}
                              style={[
                                styles.suggestionButton,
                                condition === suggestion.condition &&
                                  styles.suggestionButtonActive,
                                isAndroid && styles.suggestionButtonAndroid
                              ]}
                              onPress={() => {
                                setTargetPrice(suggestion.price.toString())
                                setCondition(suggestion.condition)
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                              }}
                            >
                              <Text
                                style={[
                                  styles.suggestionPrice,
                                  isAndroid && styles.suggestionPriceAndroid
                                ]}
                              >
                                ${formatPrice(suggestion.price)}
                              </Text>
                              <Text
                                style={[
                                  styles.suggestionLabel,
                                  isAndroid && styles.suggestionLabelAndroid
                                ]}
                              >
                                {suggestion.label}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      </View>
                    )}
                  </View>
                  {/* Информация о разнице цены - компактная */}
                  {targetPrice && parseFloat(targetPrice) > 0 && (
                    <View
                      style={[
                        styles.priceDifferenceSection,
                        isAndroid && styles.priceDifferenceSectionAndroid
                      ]}
                    >
                      <View
                        style={[
                          styles.priceDifferenceContainer,
                          isAndroid && styles.priceDifferenceContainerAndroid
                        ]}
                      >
                        <Ionicons
                          name={condition === "above" ? "arrow-up" : "arrow-down"}
                          size={isAndroid ? 12 : 14}
                          color={condition === "above" ? "#00C853" : "#FF3B30"}
                        />
                        <Text
                          style={[
                            styles.priceDifferenceText,
                            { color: condition === "above" ? "#00C853" : "#FF3B30" },
                            isAndroid && styles.priceDifferenceTextAndroid
                          ]}
                        >
                          {condition === "above" ? "+" : "-"}$
                          {Math.abs(parseFloat(targetPrice) - currentPrice).toFixed(2)}{" "}
                          <Text
                            style={[
                              styles.percentageText,
                              isAndroid && styles.percentageTextAndroid
                            ]}
                          >
                            (
                            {Math.abs(
                              ((parseFloat(targetPrice) - currentPrice) / currentPrice) *
                                100
                            ).toFixed(2)}
                            %)
                          </Text>
                        </Text>
                      </View>
                    </View>
                  )}

                  {/* Предварительный просмотр - компактный
                  <View
                    style={[
                      styles.previewSection,
                      isAndroid && styles.previewSectionAndroid
                    ]}
                  >
                    <LinearGradient
                      colors={["rgba(212, 175, 55, 0.15)", "rgba(212, 175, 55, 0.05)"]}
                      style={[
                        styles.previewGradient,
                        isAndroid && styles.previewGradientAndroid
                      ]}
                    >
                      <Text
                        style={[
                          styles.previewText,
                          isAndroid && styles.previewTextAndroid
                        ]}
                      >
                        <Text
                          style={[
                            styles.previewCoin,
                            isAndroid && styles.previewCoinAndroid
                          ]}
                        >
                          {coin.symbol?.toUpperCase()}
                        </Text>{" "}
                        price{" "}
                        <Text
                          style={[
                            styles.previewCondition,
                            { color: condition === "above" ? "#00C853" : "#FF3B30" },
                            isAndroid && styles.previewConditionAndroid
                          ]}
                        >
                          {condition === "above" ? "rises above" : "falls below"}
                        </Text>{" "}
                        $
                        <Text
                          style={[
                            styles.previewPrice,
                            isAndroid && styles.previewPriceAndroid
                          ]}
                        >
                          {targetPrice || "0.00"}
                        </Text>
                      </Text>
                    </LinearGradient>
                  </View> */}

                  {/* Кнопки действий - компактные */}
                  <View
                    style={[
                      styles.actionButtons,
                      isAndroid && styles.actionButtonsAndroid
                    ]}
                  >
                    <TouchableOpacity
                      onPress={handleClose}
                      style={[
                        styles.cancelButton,
                        isAndroid && styles.cancelButtonAndroid
                      ]}
                      activeOpacity={0.8}
                    >
                      <View
                        style={[
                          styles.cancelButtonContent,
                          isAndroid && styles.cancelButtonContentAndroid
                        ]}
                      >
                        <Text
                          style={[
                            styles.cancelButtonText,
                            isAndroid && styles.cancelButtonTextAndroid
                          ]}
                        >
                          Cancel
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={handleSave}
                      style={[styles.saveButton, isAndroid && styles.saveButtonAndroid]}
                      disabled={!targetPrice}
                      activeOpacity={0.8}
                    >
                      <LinearGradient
                        colors={
                          !targetPrice
                            ? ["#666", "#444"]
                            : fcmToken && notificationPermission
                            ? ["#4CAF50", "#388E3C"]
                            : notificationPermission
                            ? ["#D4AF37", "#B8860B"]
                            : ["#757575", "#616161"]
                        }
                        style={[
                          styles.saveButtonGradient,
                          isAndroid && styles.saveButtonGradientAndroid
                        ]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      >
                        <Ionicons
                          name={
                            !targetPrice
                              ? "notifications-off"
                              : fcmToken && notificationPermission
                              ? "cloud"
                              : "notifications"
                          }
                          size={isAndroid ? 16 : 18}
                          color='#FFF'
                        />
                        <Text
                          style={[
                            styles.saveButtonText,
                            isAndroid && styles.saveButtonTextAndroid
                          ]}
                        >
                          {!targetPrice
                            ? "Enter Price"
                            : fcmToken && notificationPermission
                            ? "Set Alert"
                            : "Set Alert"}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </LinearGradient>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  )
}

export default AlertModal
