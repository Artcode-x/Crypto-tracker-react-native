import React from "react"
import { TouchableOpacity, Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import * as Haptics from "expo-haptics"
import { styles } from "./FavoriteHeader.styles"
import NotificationService from "../../../services/NotificationService"

// Кнопка тестового уведомления (для отладки)
const TestNotificationButton = ({ notificationPermission }) => (
  <TouchableOpacity
    onPress={async () => {
      if (!notificationPermission) {
        console.log("⚠️ Сначала разрешите уведомления")
        return
      }

      console.log("Отправка тестового уведомления...")
      const success = await NotificationService.sendTestNotification()
      if (success) {
        console.log("Тестовое уведомление отправлено")
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      } else {
        console.log("Не удалось отправить тестовое уведомление")
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      }
    }}
    style={styles.testNotificationButton}
  >
    {/* Важный раздел для теста */}
    {/* <LinearGradient
      colors={["rgba(33, 150, 243, 0.2)", "rgba(33, 150, 243, 0.1)"]}
      style={styles.testNotificationGradient}
    >
      <Ionicons name='notifications-outline' size={12} color='#2196F3' />
      <Text style={styles.testNotificationText}>Test Alert</Text>
    </LinearGradient> */}
  </TouchableOpacity>
)

export default TestNotificationButton
