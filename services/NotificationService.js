import * as Notifications from "expo-notifications"
import { Platform } from "react-native"
import * as Device from "expo-device"

// Настройка обработчика уведомлений
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    priority: Notifications.AndroidNotificationPriority.HIGH
  })
})

const NotificationService = {
  // Запрос разрешений с учетом платформы
  async requestPermissions() {
    try {
      console.log("Запрос разрешений на уведомления...")

      let status

      if (Platform.OS === "android") {
        // Создание канала для Android 8+
        await Notifications.setNotificationChannelAsync("price-alerts", {
          name: "Price Alerts",
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
          lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
          bypassDnd: true,
          enableVibrate: true,
          showBadge: true
        })
      }

      // Запрашиваем разрешения
      if (Platform.OS === "ios") {
        const { status: iosStatus } = await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
            allowAnnouncements: true
          }
        })
        status = iosStatus
      } else {
        const { status: androidStatus } = await Notifications.requestPermissionsAsync()
        status = androidStatus
      }

      console.log(`Статус разрешений: ${status}`)
      return status === "granted"
    } catch (error) {
      console.error("Ошибка запроса разрешений:", error)
      return false
    }
  },

  // Отправка уведомления о срабатывании алерта
  async sendPriceAlertNotification(alert) {
    try {
      const conditionText = alert.condition === "above" ? "rose above" : "fell below"
      const title = `🚨 ${alert.coinSymbol?.toUpperCase()} Price Alert`
      const body = `${alert.coinSymbol?.toUpperCase()} ${conditionText} $${alert.targetPrice.toFixed(
        2
      )}. Current: $${alert.currentPrice.toFixed(2)}`

      // Подготовка контента уведомления
      const content = {
        title,
        body,
        data: {
          alertId: alert.id,
          coinId: alert.coinId,
          coinName: alert.coinName,
          type: "price-alert",
          timestamp: new Date().toISOString()
        },
        sound: true,
        badge: 1,
        priority: "high",
        autoDismiss: false
      }

      // Платформозависимые настройки
      if (Platform.OS === "android") {
        content.android = {
          channelId: "price-alerts",
          priority: Notifications.AndroidNotificationPriority.HIGH,
          vibrate: [0, 250, 250, 250],
          color: "#D4AF37",
          sticky: false,
          autoCancel: true
        }
      }

      if (Platform.OS === "ios") {
        content.ios = {
          sound: true,
          badge: 1,
          interruptionLevel: "time-sensitive",
          relevanceScore: 1.0
        }
      }

      // Отправка уведомления
      const notificationId = await Notifications.scheduleNotificationAsync({
        content,
        trigger: null // Немедленное уведомление
      })

      console.log(`Уведомление отправлено: ${notificationId}`)
      return notificationId
    } catch (error) {
      console.error("Ошибка отправки уведомления:", error)
      return null
    }
  },

  // Тестовое уведомление для отладки
  async sendTestNotification() {
    try {
      const testAlert = {
        id: "test-" + Date.now(),
        coinId: "bitcoin",
        coinName: "Bitcoin",
        coinSymbol: "BTC",
        targetPrice: 50000,
        currentPrice: 51000,
        condition: "above"
      }

      console.log("Отправка тестового уведомления...")
      return await this.sendPriceAlertNotification(testAlert)
    } catch (error) {
      console.error("Ошибка тестового уведомления:", error)
      return null
    }
  },

  // Регистрация обработчиков
  registerNotificationHandlers(onNotificationReceived, onNotificationTapped) {
    try {
      const subscriptions = {
        receivedSubscription: null,
        responseSubscription: null
      }

      // Уведомление получено (приложение открыто)
      subscriptions.receivedSubscription = Notifications.addNotificationReceivedListener(
        (notification) => {
          console.log("📲 Уведомление получено:", notification.request.identifier)
          if (onNotificationReceived) {
            onNotificationReceived(notification)
          }
        }
      )

      // Пользователь нажал на уведомление
      subscriptions.responseSubscription =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log("👆 Нажатие на уведомление")
          if (onNotificationTapped) {
            onNotificationTapped(response)
          }
        })

      console.log("Обработчики уведомлений зарегистрированы")
      return subscriptions
    } catch (error) {
      console.error("Ошибка регистрации обработчиков:", error)
      return null
    }
  },

  // Удаление обработчиков
  removeNotificationHandlers(subscriptions) {
    try {
      if (subscriptions?.receivedSubscription) {
        subscriptions.receivedSubscription.remove()
      }
      if (subscriptions?.responseSubscription) {
        subscriptions.responseSubscription.remove()
      }
      console.log("Обработчики уведомлений удалены")
    } catch (error) {
      console.error("Ошибка удаления обработчиков:", error)
    }
  },

  // Очистка всех уведомлений
  async dismissAllNotifications() {
    try {
      await Notifications.dismissAllNotificationsAsync()
      console.log("Все уведомления удалены")
    } catch (error) {
      console.error("Ошибка удаления уведомлений:", error)
    }
  },

  // Получение текущего количества бейджей
  async getBadgeCount() {
    try {
      return await Notifications.getBadgeCountAsync()
    } catch (error) {
      console.error("Ошибка получения бейджей:", error)
      return 0
    }
  },

  // Установка количества бейджей
  async setBadgeCount(count) {
    try {
      await Notifications.setBadgeCountAsync(count)
    } catch (error) {
      console.error("Ошибка установки бейджей:", error)
    }
  }
}

export default NotificationService
