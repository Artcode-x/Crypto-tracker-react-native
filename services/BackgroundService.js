import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"
import AsyncStorage from "@react-native-async-storage/async-storage"
import NotificationService from "./NotificationService"
import { fetchCurrentPrices } from "../components/Api/Api"

// Название фоновой задачи
const BACKGROUND_TASK = "CHECK_PRICE_ALERTS"

// Регистрация задачи
TaskManager.defineTask(BACKGROUND_TASK, async () => {
  console.log("🚀 Фоновая задача запущена:", new Date().toLocaleTimeString())

  try {
    // 1. Получение сохраненных алертов из AsyncStorage
    const alertsJson = await AsyncStorage.getItem("priceAlerts")
    if (!alertsJson) {
      console.log("Нет сохраненных алертов")
      return BackgroundFetch.BackgroundFetchResult.NoData
    }

    const alerts = JSON.parse(alertsJson)
    const activeAlerts = alerts.filter((alert) => alert.isActive && !alert.triggeredAt)

    console.log(`Активных алертов: ${activeAlerts.length}`)

    if (activeAlerts.length === 0) {
      return BackgroundFetch.BackgroundFetchResult.NoData
    }

    // 2. Получение ID всех монет для проверки
    const coinIds = [...new Set(activeAlerts.map((alert) => alert.coinId))]
    console.log(`Монет для проверки: ${coinIds.length}`)

    // 3. Получение текущих цен
    const currentPrices = await fetchCurrentPrices(coinIds)

    // 4. Проверка каждого алерта
    const triggeredAlerts = []

    for (const alert of activeAlerts) {
      const currentPrice = currentPrices[alert.coinId]
      if (!currentPrice) continue

      const shouldTrigger = checkAlertCondition(
        alert.condition,
        alert.targetPrice,
        currentPrice
      )

      if (shouldTrigger) {
        console.log(`🚨 Сработал алерт: ${alert.coinName} @ $${currentPrice}`)
        triggeredAlerts.push({
          ...alert,
          currentPrice
        })
      }
    }

    // 5. Отправка уведомления и обновление алертов
    if (triggeredAlerts.length > 0) {
      console.log(`Отправляем ${triggeredAlerts.length} уведомлений`)

      for (const alert of triggeredAlerts) {
        // Отправка уведомления
        await NotificationService.sendPriceAlertNotification(alert)

        // Помечаем как сработавший
        const updatedAlerts = alerts.map((a) =>
          a.id === alert.id
            ? { ...a, triggeredAt: new Date().toISOString(), isActive: false }
            : a
        )

        // Сохраняем обратно
        await AsyncStorage.setItem("priceAlerts", JSON.stringify(updatedAlerts))
      }
    }

    return BackgroundFetch.BackgroundFetchResult.NewData
  } catch (error) {
    console.error("Ошибка в фоновой задаче:", error)
    return BackgroundFetch.BackgroundFetchResult.Failed
  }
})

// Функция проверки условий алерта
function checkAlertCondition(condition, targetPrice, currentPrice) {
  switch (condition) {
    case "above":
      return currentPrice >= targetPrice
    case "below":
      return currentPrice <= targetPrice
    case "equals":
      return Math.abs(currentPrice - targetPrice) < 0.01
    default:
      return false
  }
}

// Функция регистрации фоновой задачи
export async function registerBackgroundTask() {
  try {
    // Проверка, зарегистрирована ли уже задача
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_TASK)

    if (!isRegistered) {
      await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK, {
        minimumInterval: 15 * 60, // 15 минут (минимальное разрешенное время)
        stopOnTerminate: false, // Продолжать при закрытии приложения
        startOnBoot: true // Запускать при загрузке устройства
      })
      console.log("Фоновая задача зарегистрирована")
    } else {
      console.log("ℹФоновая задача уже зарегистрирована")
    }
  } catch (error) {
    console.log("Ошибка регистрации фоновой задачи:", error)
  }
}

// Функция отмены фоновой задачи
export async function unregisterBackgroundTask() {
  try {
    await BackgroundFetch.unregisterTaskAsync(BACKGROUND_TASK)
    console.log("Фоновая задача отменена")
  } catch (error) {
    console.log("Ошибка отмены фоновой задачи:", error)
  }
}

// Экспорт имени задачи для использования в других местах
export { BACKGROUND_TASK }
