import * as Notifications from "expo-notifications"
import * as Device from "expo-device"
import { Platform } from "react-native"

class NotificationService {
  // Инициализация уведомлений
  static async initialize() {
    try {
      console.log("Инициализация NotificationService...")

      // Настройка обработчика уведомлений
      await Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
          priority: Notifications.AndroidNotificationPriority.HIGH
        })
      })

      // Настройка канала для Android
      if (Platform.OS === "android") {
        await this.setupAndroidChannel()
      }

      console.log("NotificationService инициализирован")
      return true
    } catch (error) {
      console.error("Ошибка инициализации NotificationService:", error)
      return false
    }
  }

  // Настройка канала для Android
  static async setupAndroidChannel() {
    try {
      await Notifications.setNotificationChannelAsync("price-alerts", {
        name: "Price Alerts",
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#D4AF37",
        lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
        bypassDnd: true,
        sound: "default",
        enableVibrate: true,
        showBadge: true
      })
      console.log("Android канал 'price-alerts' настроен")
    } catch (error) {
      console.error("Ошибка настройки Android канала:", error)
    }
  }

  // Запрос разрешений на уведомления
  static async requestPermissions() {
    try {
      console.log("Запрос разрешений на уведомления...")

      // Проверка, является ли устройство физическим
      if (!Device.isDevice) {
        console.log("⚠️ Эмулятор/симулятор, уведомления могут работать ограниченно")
      }

      let permissions = {
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
          allowAnnouncements: true,
          allowCriticalAlerts: true
        }
      }

      const { status: existingStatus } = await Notifications.getPermissionsAsync()

      let finalStatus = existingStatus

      // Запрашиваем разрешения если их еще нет
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync(permissions)
        finalStatus = status
      }

      // Для iOS: запрос на критические уведомления
      if (Platform.OS === "ios" && finalStatus === "granted") {
        try {
          await Notifications.requestPermissionsAsync({
            ios: {
              allowCriticalAlerts: true
            }
          })
        } catch (iosError) {
          console.log("Критические уведомления не доступны на этой версии iOS")
        }
      }

      return finalStatus === "granted"
    } catch (error) {
      console.error("Ошибка запроса разрешений:", error)
      return false
    }
  }

  // Проверка текущих разрешений
  static async checkPermissions() {
    try {
      const { granted, status, expires } = await Notifications.getPermissionsAsync()

      return { granted, status, expires }
    } catch (error) {
      console.error("Ошибка проверки разрешений:", error)
      return { granted: false, error: error.message }
    }
  }

  // Отправка уведомления о сработавшем алерте
  static async sendPriceAlertNotification(alert) {
    try {
      if (!alert || !alert.coinName || !alert.coinSymbol) {
        console.warn("⚠️ Некорректные данные алерта для уведомления")
        return false
      }

      const conditionText = alert.condition === "above" ? "rose above" : "fell below"
      const directionText = alert.condition === "above" ? "выше" : "ниже"

      // Текст уведомления
      const title = `💰 ${alert.coinSymbol.toUpperCase()} Alert!`
      const body = `${alert.coinName} ${conditionText} $${alert.targetPrice}. Current: $${alert.currentPrice}`

      // Данные для уведомления
      const notificationData = {
        type: "price-alert",
        alertId: alert.id,
        coinId: alert.coinId,
        coinName: alert.coinName,
        coinSymbol: alert.coinSymbol,
        targetPrice: alert.targetPrice,
        currentPrice: alert.currentPrice,
        condition: alert.condition,
        triggeredAt: new Date().toISOString()
      }

      // Планируем уведомление
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: title,
          body: body,
          data: notificationData,
          sound: true,
          badge: 1,
          color: "#D4AF37",
          // iOS specific
          subtitle: "Price Alert Triggered",
          launchImageName: "adaptive-icon",
          // Android specific
          priority: Notifications.AndroidNotificationPriority.HIGH,
          vibrate: [0, 250, 250, 250],
          autoDismiss: false,
          sticky: true
        },
        trigger: null // Немедленное уведомление
      })

      // Увеличиваем счетчик бейджей
      await this.incrementBadgeCount()

      return true
    } catch (error) {
      console.error(`Ошибка отправки уведомления для алерта ${alert?.id}:`, error)
      return false
    }
  }

  // Отправка тестового уведомления
  static async sendTestNotification() {
    try {
      console.log("🧪 Отправка тестового уведомления...")

      const testAlert = {
        id: "test-" + Date.now(),
        coinId: "bitcoin",
        coinName: "Bitcoin",
        coinSymbol: "BTC",
        targetPrice: 50000,
        currentPrice: 51000,
        condition: "above"
      }

      return await this.sendPriceAlertNotification(testAlert)
    } catch (error) {
      console.error("Ошибка отправки тестового уведомления:", error)
      return false
    }
  }

  // Установка количества бейджей
  static async setBadgeCount(count) {
    try {
      if (Platform.OS === "ios" || Platform.OS === "android") {
        await Notifications.setBadgeCountAsync(count)

        return true
      }
      return false
    } catch (error) {
      console.error("Ошибка установки количества бейджей:", error)
      return false
    }
  }

  // Увеличение счетчика бейджей
  static async incrementBadgeCount() {
    try {
      if (Platform.OS === "ios" || Platform.OS === "android") {
        const currentBadgeCount = await Notifications.getBadgeCountAsync()
        const newBadgeCount = (currentBadgeCount || 0) + 1
        await Notifications.setBadgeCountAsync(newBadgeCount)

        return newBadgeCount
      }
      return 0
    } catch (error) {
      console.error("Ошибка увеличения счетчика бейджей:", error)
      return 0
    }
  }

  // Сброс счетчика бейджей
  static async resetBadgeCount() {
    try {
      await Notifications.setBadgeCountAsync(0)

      return true
    } catch (error) {
      console.error("Ошибка сброса счетчика бейджей:", error)
      return false
    }
  }

  // Получение текущего количества бейджей
  static async getBadgeCount() {
    try {
      const count = await Notifications.getBadgeCountAsync()

      return count || 0
    } catch (error) {
      console.error("Ошибка получения количества бейджей:", error)
      return 0
    }
  }

  // Регистрация обработчиков уведомлений
  static registerNotificationHandlers(onReceived, onResponse) {
    console.log("Регистрация обработчиков уведомлений...")

    const subscriptions = []

    // Обработчик получения уведомления
    if (onReceived) {
      const receivedSubscription =
        Notifications.addNotificationReceivedListener(onReceived)
      subscriptions.push(receivedSubscription)
      console.log("Обработчик получения уведомления зарегистрирован")
    }

    // Обработчик нажатия на уведомление
    if (onResponse) {
      const responseSubscription =
        Notifications.addNotificationResponseReceivedListener(onResponse)
      subscriptions.push(responseSubscription)
      console.log("Обработчик нажатия на уведомление зарегистрирован")
    }

    // Обработчик для отладки (всегда добавляем)
    const debugSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Уведомление получено (отладка):", {
          id: notification.request.identifier,
          title: notification.request.content.title,
          data: notification.request.content.data,
          date: new Date().toISOString()
        })
      }
    )
    subscriptions.push(debugSubscription)

    return subscriptions
  }

  // Удаление обработчиков уведомлений
  static removeNotificationHandlers(subscriptions) {
    try {
      if (!subscriptions || !Array.isArray(subscriptions)) {
        console.warn("⚠️ Нет подписок для удаления")
        return false
      }

      subscriptions.forEach((subscription) => {
        if (subscription && subscription.remove) {
          subscription.remove()
        }
      })

      console.log("Обработчики уведомлений удалены")
      return true
    } catch (error) {
      console.error("Ошибка удаления обработчиков:", error)
      return false
    }
  }

  // Получение всех запланированных уведомлений
  static async getAllScheduledNotifications() {
    try {
      const notifications = await Notifications.getAllScheduledNotificationsAsync()

      return notifications
    } catch (error) {
      console.error("Ошибка получения запланированных уведомлений:", error)
      return []
    }
  }

  // Отмена всех уведомлений
  static async cancelAllNotifications() {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync()

      return true
    } catch (error) {
      console.error("Ошибка отмены уведомлений:", error)
      return false
    }
  }

  // Отмена конкретного уведомления
  static async cancelNotification(notificationId) {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId)

      return true
    } catch (error) {
      console.error(`Ошибка отмены уведомления ${notificationId}:`, error)
      return false
    }
  }

  // Получение последнего ответа на уведомление
  static async getLastNotificationResponse() {
    try {
      const response = await Notifications.getLastNotificationResponseAsync()
      if (response) {
        console.log("Последний ответ на уведомление:", {
          id: response.notification.request.identifier,
          action: response.actionIdentifier,
          data: response.notification.request.content.data,
          date: response.notification.date
        })
      } else {
        console.log("Нет последнего ответа на уведомление")
      }
      return response
    } catch (error) {
      console.error("Ошибка получения последнего ответа:", error)
      return null
    }
  }

  // Получение токена устройства для push-уведомлений
  static async getDevicePushToken() {
    try {
      // Для Expo Go
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: "8a1401d1-7ebd-4be4-b520-7b18ad4517ba"
      })

      return token
    } catch (error) {
      console.error("Ошибка получения токена устройства:", error)
      return null
    }
  }

  // Получение информации о статусе уведомлений
  static async getNotificationStatus() {
    try {
      const permissions = await this.checkPermissions()
      const badgeCount = await this.getBadgeCount()
      const scheduledNotifications = await this.getAllScheduledNotifications()
      const lastResponse = await this.getLastNotificationResponse()

      return {
        permissions,
        badgeCount,
        scheduledNotificationsCount: scheduledNotifications.length,
        lastResponse: lastResponse ? true : false,
        platform: Platform.OS,
        device: Device.isDevice ? "Физическое устройство" : "Эмулятор",
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      console.error("Ошибка получения статуса уведомлений:", error)
      return {
        error: error.message,
        timestamp: new Date().toISOString()
      }
    }
  }

  // Тестирование всей системы уведомлений
  static async testFullNotificationSystem() {
    console.log(" ===== ПОЛНОЕ ТЕСТИРОВАНИЕ СИСТЕМЫ УВЕДОМЛЕНИЙ =====")

    try {
      // 1. Проверка разрешений
      console.log("1. Проверка разрешений...")
      const permissions = await this.checkPermissions()

      // 2. Запрос разрешений если нужно
      if (!permissions.granted) {
        console.log("2. Запрос разрешений...")
        await this.requestPermissions()
      }

      // 3. Отправка тестового уведомления
      console.log("3. Отправка тестового уведомления...")
      const testResult = await this.sendTestNotification()

      // 4. Проверка бейджей
      console.log("4. Проверка системы бейджей...")
      await this.incrementBadgeCount()
      const badgeCount = await this.getBadgeCount()

      // 5. Получение статуса
      console.log("5. Получение общего статуса...")
      const status = await this.getNotificationStatus()

      return {
        success: true,
        permissions: permissions.granted,
        testNotificationSent: testResult,
        badgeCount,
        status
      }
    } catch (error) {
      console.error("Ошибка тестирования системы уведомлений:", error)
      return {
        success: false,
        error: error.message
      }
    }
  }
}

export default NotificationService
