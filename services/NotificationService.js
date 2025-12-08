import * as Notifications from "expo-notifications"
import { Platform } from "react-native"

// Настройка обработчика уведомлений
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    // Для iOS добавление доп свойств
    ...(Platform.OS === "ios" && {
      shouldShowBanner: true,
      shouldShowList: true
    })
  })
})

const NotificationService = {
  // Запрос разрешений на уведомления
  async requestPermissions() {
    try {
      console.log("Requesting notification permissions...")

      // Для Android создаем канал уведомлений
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("price-alerts", {
          name: "Price Alerts",
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C"
        })
      }

      // Запрашиваем разрешения
      const { status } = await Notifications.requestPermissionsAsync()

      console.log(`Notification permissions status: ${status}`)
      return status === "granted"
    } catch (error) {
      console.error("Error requesting notification permissions:", error)
      return false
    }
  },

  // Отправка уведомления о срабатывании алерта
  async sendPriceAlertNotification(alert) {
    try {
      const conditionText = alert.condition === "above" ? "rose above" : "fell below"
      const title = `🚨 ${alert.coinSymbol.toUpperCase()} Price Alert`
      const body = `${alert.coinSymbol.toUpperCase()} ${conditionText} $${alert.targetPrice.toFixed(
        2
      )}. Current: $${alert.currentPrice.toFixed(2)}`

      // Подготовка контента
      const content = {
        title,
        body,
        data: {
          alertId: alert.id,
          coinId: alert.coinId,
          type: "price-alert"
        },
        sound: true,
        badge: 1
      }

      // Добавляем платформозависимые настройки
      if (Platform.OS === "android") {
        content.android = {
          channelId: "price-alerts",
          priority: "high"
        }
      }

      // Отправляем уведомление
      await Notifications.scheduleNotificationAsync({
        content,
        trigger: null
      })

      console.log(`Notification sent for alert: ${alert.id}`)
      return true
    } catch (error) {
      console.error("Error sending notification:", error)
      return false
    }
  },

  // Установка количества бейджей
  async setBadgeCount(count) {
    try {
      await Notifications.setBadgeCountAsync(count)
    } catch (error) {
      console.error("Error setting badge count:", error)
    }
  },

  // Получение текущего количества бейджей
  async getCurrentBadgeCount() {
    try {
      const count = await Notifications.getBadgeCountAsync()
      return count
    } catch (error) {
      console.error("Error getting badge count:", error)
      return 0
    }
  },

  // Проверка разрешений
  async getPermissionsStatus() {
    try {
      return await Notifications.getPermissionsAsync()
    } catch (error) {
      console.error("Error getting permissions:", error)
      return null
    }
  },

  // Регистрация обработчиков уведомлений
  registerNotificationHandlers(onNotificationReceived, onNotificationTapped) {
    try {
      const subscriptions = {
        receivedSubscription: null,
        responseSubscription: null
      }

      // Обработчик получения уведомления (когда приложение открыто)
      subscriptions.receivedSubscription = Notifications.addNotificationReceivedListener(
        (notification) => {
          console.log("Notification received:", notification.request.identifier)
          console.log("Notification data:", notification.request.content.data)

          // Вызов кастомного обработчика, если передан
          if (onNotificationReceived) {
            onNotificationReceived(notification)
          }
        }
      )

      // Обработчик нажатия на уведомление
      subscriptions.responseSubscription =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log("Notification tapped:", response.notification.request.identifier)
          console.log("Action:", response.actionIdentifier)
          console.log("Data:", response.notification.request.content.data)

          // Вызов кастомного обработчика, если передан
          if (onNotificationTapped) {
            onNotificationTapped(response)
          }
        })

      return subscriptions
    } catch (error) {
      console.error("Error registering notification handlers:", error)
      return null
    }
  },

  // Удаление обработчиков уведомлений
  removeNotificationHandlers(subscriptions) {
    try {
      if (subscriptions?.receivedSubscription) {
        subscriptions.receivedSubscription.remove()
      }
      if (subscriptions?.responseSubscription) {
        subscriptions.responseSubscription.remove()
      }
      console.log("Notification handlers removed")
    } catch (error) {
      console.error("Error removing notification handlers:", error)
    }
  },

  //  Функция для отправки тестового уведомления
  async sendTestNotification() {
    try {
      const testAlert = {
        id: "test-alert",
        coinId: "bitcoin",
        coinName: "Bitcoin",
        coinSymbol: "BTC",
        targetPrice: 50000,
        currentPrice: 51000,
        condition: "above"
      }

      return await this.sendPriceAlertNotification(testAlert)
    } catch (error) {
      console.error("Error sending test notification:", error)
      return null
    }
  }
}

export default NotificationService
