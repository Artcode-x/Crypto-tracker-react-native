import React, { useState, useEffect } from "react"
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
  ScrollView
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import * as Haptics from "expo-haptics"
import { styles } from "./AlertModal.styles"

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

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    )
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  const handleSave = () => {
    const price = parseFloat(targetPrice)

    if (!price || price <= 0) {
      setError("Please enter a valid price")
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      return
    }

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)

    onSave({
      coinId: coin.id,
      coinName: coin.name,
      coinSymbol: coin.symbol,
      targetPrice: price,
      currentPrice: currentPrice,
      condition: condition,
      // Добавление информации о FCM для синхронизации с сервером
      fcmToken: fcmToken,
      syncStatus: fcmToken && notificationPermission ? "pending" : "local_only"
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

  // Определяем тип уведомлений для отображения
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
      color: "#FF9800",
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
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.modalContainer}>
                <LinearGradient
                  colors={["rgba(26, 26, 26, 0.95)", "rgba(40, 40, 40, 0.9)"]}
                  style={styles.modalGradient}
                >
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps='handled'
                  >
                    {/* Заголовок */}
                    <View style={styles.modalHeader}>
                      <View style={styles.coinHeader}>
                        <Text style={styles.coinName}>{coin.name}</Text>
                        {/* <Text style={styles.coinSymbol}>
                          {coin.symbol?.toUpperCase()}
                        </Text> */}
                      </View>
                      <Text style={styles.currentPrice}>
                        Current: $
                        {currentPrice?.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        }) || "0.00"}
                      </Text>

                      {/* Индикатор статуса уведомлений */}
                      <View
                        style={[
                          styles.notificationStatus,
                          notificationType.type === "disabled" &&
                            styles.notificationStatusDisabled,
                          notificationType.type === "fcm" && styles.notificationStatusFCM,
                          notificationType.type === "local" &&
                            styles.notificationStatusLocal
                        ]}
                      >
                        <Ionicons
                          name={notificationType.icon}
                          size={14}
                          color={notificationType.color}
                        />
                        <Text
                          style={[
                            styles.notificationStatusText,
                            { color: notificationType.color }
                          ]}
                        >
                          {notificationType.text}
                        </Text>
                      </View>
                    </View>

                    {/* Условие алерта */}
                    <View style={styles.conditionSection}>
                      <Text style={styles.sectionTitle}>Alert when price is:</Text>
                      <View style={styles.conditionButtons}>
                        <TouchableOpacity
                          onPress={() => setCondition("above")}
                          style={[
                            styles.conditionButton,
                            condition === "above" && styles.conditionButtonActive
                          ]}
                        >
                          <LinearGradient
                            colors={
                              condition === "above"
                                ? ["#00C853", "#00E676"]
                                : ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]
                            }
                            style={styles.conditionButtonGradient}
                          >
                            <Ionicons
                              name='trending-up'
                              size={20}
                              color={condition === "above" ? "#FFF" : "#00C853"}
                            />
                            <Text
                              style={[
                                styles.conditionButtonText,
                                condition === "above" && styles.conditionButtonTextActive
                              ]}
                            >
                              Above
                            </Text>
                          </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => setCondition("below")}
                          style={[
                            styles.conditionButton,
                            condition === "below" && styles.conditionButtonActive
                          ]}
                        >
                          <LinearGradient
                            colors={
                              condition === "below"
                                ? ["#FF3B30", "#FF5252"]
                                : ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]
                            }
                            style={styles.conditionButtonGradient}
                          >
                            <Ionicons
                              name='trending-down'
                              size={20}
                              color={condition === "below" ? "#FFF" : "#FF3B30"}
                            />
                            <Text
                              style={[
                                styles.conditionButtonText,
                                condition === "below" && styles.conditionButtonTextActive
                              ]}
                            >
                              Below
                            </Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* Ввод целевой цены */}
                    <View style={styles.priceInputSection}>
                      <Text style={styles.sectionTitle}>Target Price (USD):</Text>
                      <View style={styles.priceInputContainer}>
                        <Text style={styles.currencySymbol}>$</Text>
                        <TextInput
                          style={styles.priceInput}
                          value={targetPrice}
                          onChangeText={(text) => {
                            const formattedText = text.replace(",", ".")

                            const filteredText = formattedText.replace(/[^0-9.]/g, "")
                            // Проверяем, что точка только одна
                            const dotCount = (filteredText.match(/\./g) || []).length
                            if (dotCount <= 1) {
                              setTargetPrice(filteredText)
                              setError("")
                            }
                          }}
                          placeholder='0.00'
                          placeholderTextColor='rgba(255, 255, 255, 0.3)'
                          keyboardType='decimal-pad'
                          autoFocus={true}
                          returnKeyType='done'
                          onSubmitEditing={handleSave}
                          blurOnSubmit={true}
                        />
                      </View>
                      {error ? <Text style={styles.errorText}>{error}</Text> : null}
                    </View>

                    {/* Предварительный просмотр */}
                    <View style={styles.previewSection}>
                      <Text style={styles.previewTitle}>Alert Preview:</Text>
                      <View style={styles.previewContainer}>
                        <Text style={styles.previewText}>
                          {`Notify me when ${coin.symbol?.toUpperCase()} price ${
                            condition === "above" ? "rises above" : "falls below"
                          } $${targetPrice || "0.00"}`}
                        </Text>
                        {/* {notificationType.type === "fcm" && (
                          <Text style={styles.previewFCMInfo}>
                            (Push notification - works even when app is closed)
                          </Text>
                        )} */}
                        {/* {notificationType.type === "local" && (
                          <Text style={styles.previewLocalInfo}>
                            (Local notification - app must be open)
                          </Text>
                        )}
                        {notificationType.type === "disabled" && (
                          <Text style={styles.previewDisabledInfo}>
                            (Alert saved locally only - no notifications)
                          </Text>
                        )} */}
                      </View>
                    </View>

                    {/* Кнопки действий */}
                    <View
                      style={[
                        styles.actionButtons,
                        keyboardVisible &&
                          Platform.OS === "android" &&
                          styles.actionButtonsKeyboardVisible
                      ]}
                    >
                      <TouchableOpacity onPress={handleClose} style={styles.cancelButton}>
                        <LinearGradient
                          colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]}
                          style={styles.cancelButtonGradient}
                        >
                          <Text style={styles.cancelButtonText}>Cancel</Text>
                        </LinearGradient>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={handleSave}
                        style={styles.saveButton}
                        disabled={!targetPrice}
                      >
                        <LinearGradient
                          colors={
                            fcmToken && notificationPermission
                              ? ["#4CAF50", "#2E7D32"] // Зеленый для FCM
                              : notificationPermission
                              ? ["#D4AF37", "#B3791F"] // Золотой для локальных
                              : ["#666", "#444"] // Серый для отключенных
                          }
                          style={styles.saveButtonGradient}
                        >
                          <Ionicons
                            name={
                              fcmToken && notificationPermission
                                ? "cloud" // Облако для FCM
                                : notificationPermission
                                ? "notifications-outline"
                                : "notifications-off"
                            }
                            size={20}
                            color={
                              fcmToken && notificationPermission
                                ? "#FFF" // Белый для FCM
                                : "#000"
                            }
                          />
                          <Text
                            style={[
                              styles.saveButtonText,
                              fcmToken &&
                                notificationPermission &&
                                styles.saveButtonTextFCM
                            ]}
                          >
                            {fcmToken && notificationPermission
                              ? "Set Push Alert"
                              : notificationPermission
                              ? "Set Alert"
                              : "Save Locally"}
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </LinearGradient>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default AlertModal
