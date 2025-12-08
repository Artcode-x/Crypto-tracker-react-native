import NotificationService from "./NotificationService"
import { triggerAlert, updateAlertPrices } from "../store/alertsSlice"

// Создание объекта AlertManager с функциями
const AlertManager = {
  dispatch: null,

  // Инициализация
  initialize(dispatchFunction) {
    AlertManager.dispatch = dispatchFunction
    console.log("AlertManager initialized")
  },

  // Проверка всех алертов
  checkAlerts(alerts, coinData) {
    if (!alerts || !coinData) {
      console.warn("AlertManager: Missing alerts or coin data")
      return []
    }

    const triggeredAlerts = []
    const activeAlerts = alerts.filter((alert) => alert.isActive && !alert.triggeredAt)

    console.log(`AlertManager: Checking ${activeAlerts.length} active alerts`)

    activeAlerts.forEach((alert) => {
      const coin = coinData.find((c) => c.id === alert.coinId)
      if (!coin || !coin.current_price) {
        console.log(`AlertManager: Coin data not found for alert ${alert.coinName}`)
        return
      }

      const currentPrice = coin.current_price
      const shouldTrigger = AlertManager.checkAlertCondition(alert, currentPrice)

      if (shouldTrigger) {
        console.log(`AlertManager: Alert condition met for ${alert.coinName}`)
        triggeredAlerts.push({
          alert,
          currentPrice,
          coin
        })
      }
    })

    // Активация сработавших алертов
    if (triggeredAlerts.length > 0) {
      console.log(`AlertManager: ${triggeredAlerts.length} alerts triggered`)
      triggeredAlerts.forEach(({ alert, currentPrice, coin }) => {
        AlertManager.triggerAlert(alert, currentPrice, coin)
      })
    }

    // Обновление цены во всех алертах
    AlertManager.updateAllAlertPrices(coinData)

    return triggeredAlerts
  },

  // Проверка условия алерта
  checkAlertCondition(alert, currentPrice) {
    if (!alert || !currentPrice) {
      console.warn("AlertManager: Invalid alert or price data")
      return false
    }

    switch (alert.condition) {
      case "above":
        return currentPrice >= alert.targetPrice
      case "below":
        return currentPrice <= alert.targetPrice
      case "equals":
        return Math.abs(currentPrice - alert.targetPrice) < 0.01
      default:
        console.warn(`AlertManager: Unknown condition ${alert.condition}`)
        return false
    }
  },

  // Активация алерта
  async triggerAlert(alert, currentPrice, coin) {
    try {
      console.log(`Alert triggered: ${alert.coinName} @ $${currentPrice}`)

      if (AlertManager.dispatch) {
        AlertManager.dispatch(
          triggerAlert({
            id: alert.id,
            currentPrice: currentPrice
          })
        )
      }

      // Отправляем уведомление
      const notificationSuccess = await NotificationService.sendPriceAlertNotification({
        ...alert,
        currentPrice: currentPrice
      })

      if (notificationSuccess) {
        console.log(`AlertManager: Notification sent successfully`)
      } else {
        console.warn("AlertManager: Failed to send notification")
      }

      return true
    } catch (error) {
      console.error("AlertManager: Error triggering alert:", error)
      return false
    }
  },

  // Обновление цен во всех алертах
  updateAllAlertPrices(coinData) {
    if (!AlertManager.dispatch) {
      console.warn("AlertManager: Dispatch not initialized")
      return
    }

    if (!coinData || !Array.isArray(coinData)) {
      console.warn("AlertManager: Invalid coin data")
      return
    }

    try {
      const priceUpdates = coinData.map((coin) => ({
        coinId: coin.id,
        currentPrice: coin.current_price || 0
      }))

      console.log(`AlertManager: Updating prices for ${priceUpdates.length} coins`)

      AlertManager.dispatch(updateAlertPrices(priceUpdates))
    } catch (error) {
      console.error("AlertManager: Error updating alert prices:", error)
    }
  },

  // Форматирование сообщения алерта
  formatAlertMessage(alert, currentPrice) {
    if (!alert || !currentPrice) {
      return "Price alert triggered"
    }

    const direction = alert.condition === "above" ? "rose above" : "fell below"
    return `${alert.coinSymbol.toUpperCase()} ${direction} $${alert.targetPrice.toFixed(
      2
    )}. Current: $${currentPrice.toFixed(2)}`
  },

  // Получение активных алертов для монеты
  getActiveAlertsForCoin(alerts, coinId) {
    if (!alerts || !coinId) {
      return []
    }

    return alerts.filter(
      (alert) => alert.coinId === coinId && alert.isActive && !alert.triggeredAt
    )
  },

  // Получение всех сработавших алертов
  getTriggeredAlerts(alerts) {
    if (!alerts) {
      return []
    }

    return alerts.filter((alert) => alert.triggeredAt)
  },

  // Получение неактивных алертов
  getInactiveAlerts(alerts) {
    if (!alerts) {
      return []
    }

    return alerts.filter((alert) => !alert.isActive)
  },

  // Подсчет непрочитанных алертов
  countUnreadAlerts(alerts) {
    if (!alerts) {
      return 0
    }

    return alerts.filter((alert) => !alert.isRead).length
  },

  // Подсчет активных алертов
  countActiveAlerts(alerts) {
    if (!alerts) {
      return 0
    }

    return alerts.filter((alert) => alert.isActive && !alert.triggeredAt).length
  },

  // Проверка, есть ли активные алерты для монеты
  hasActiveAlertsForCoin(alerts, coinId) {
    return AlertManager.getActiveAlertsForCoin(alerts, coinId).length > 0
  },

  // Получение алертов по статусу
  getAlertsByStatus(alerts, status) {
    if (!alerts) {
      return []
    }

    switch (status) {
      case "active":
        return alerts.filter((alert) => alert.isActive && !alert.triggeredAt)
      case "triggered":
        return alerts.filter((alert) => alert.triggeredAt)
      case "inactive":
        return alerts.filter((alert) => !alert.isActive)
      case "unread":
        return alerts.filter((alert) => !alert.isRead)
      default:
        return alerts
    }
  },

  // Фильтрация алертов по нескольким параметрам
  filterAlerts(alerts, filters = {}) {
    if (!alerts) {
      return []
    }

    return alerts.filter((alert) => {
      // Проверка по coinId
      if (filters.coinId && alert.coinId !== filters.coinId) {
        return false
      }

      // Проверка по статусу активности
      if (filters.isActive !== undefined && alert.isActive !== filters.isActive) {
        return false
      }

      // Проверка по прочитанности
      if (filters.isRead !== undefined && alert.isRead !== filters.isRead) {
        return false
      }

      // Проверка по срабатыванию
      if (filters.triggered !== undefined) {
        const isTriggered = !!alert.triggeredAt
        if (isTriggered !== filters.triggered) {
          return false
        }
      }

      // Проверка по условию
      if (filters.condition && alert.condition !== filters.condition) {
        return false
      }

      // Проверка по диапазону цены
      if (filters.minPrice !== undefined && alert.targetPrice < filters.minPrice) {
        return false
      }

      if (filters.maxPrice !== undefined && alert.targetPrice > filters.maxPrice) {
        return false
      }

      return true
    })
  },

  // Сортировка алертов
  sortAlerts(alerts, sortBy = "createdAt", order = "desc") {
    if (!alerts) {
      return []
    }

    const sorted = [...alerts]

    sorted.sort((a, b) => {
      let valueA, valueB

      switch (sortBy) {
        case "createdAt":
          valueA = new Date(a.createdAt).getTime()
          valueB = new Date(b.createdAt).getTime()
          break
        case "targetPrice":
          valueA = a.targetPrice
          valueB = b.targetPrice
          break
        case "coinName":
          valueA = a.coinName.toLowerCase()
          valueB = b.coinName.toLowerCase()
          break
        case "triggeredAt":
          valueA = a.triggeredAt ? new Date(a.triggeredAt).getTime() : 0
          valueB = b.triggeredAt ? new Date(b.triggeredAt).getTime() : 0
          break
        default:
          valueA = 0
          valueB = 0
      }

      if (order === "asc") {
        return valueA - valueB
      } else {
        return valueB - valueA
      }
    })

    return sorted
  },

  // Группировка алертов по монете
  groupAlertsByCoin(alerts) {
    if (!alerts) {
      return {}
    }

    const grouped = {}

    alerts.forEach((alert) => {
      if (!grouped[alert.coinId]) {
        grouped[alert.coinId] = {
          coinId: alert.coinId,
          coinName: alert.coinName,
          coinSymbol: alert.coinSymbol,
          alerts: [],
          activeCount: 0,
          triggeredCount: 0
        }
      }

      grouped[alert.coinId].alerts.push(alert)

      if (alert.isActive && !alert.triggeredAt) {
        grouped[alert.coinId].activeCount++
      }

      if (alert.triggeredAt) {
        grouped[alert.coinId].triggeredCount++
      }
    })

    return grouped
  },

  // Получение статистики по алертам
  getAlertStats(alerts) {
    if (!alerts) {
      return {
        total: 0,
        active: 0,
        triggered: 0,
        unread: 0,
        byCoin: {},
        byCondition: {
          above: 0,
          below: 0,
          equals: 0
        }
      }
    }

    const stats = {
      total: alerts.length,
      active: 0,
      triggered: 0,
      unread: 0,
      byCoin: {},
      byCondition: {
        above: 0,
        below: 0,
        equals: 0
      }
    }

    alerts.forEach((alert) => {
      // Счетчики по статусу
      if (alert.isActive && !alert.triggeredAt) {
        stats.active++
      }

      if (alert.triggeredAt) {
        stats.triggered++
      }

      if (!alert.isRead) {
        stats.unread++
      }

      // Счетчики по монете
      if (!stats.byCoin[alert.coinId]) {
        stats.byCoin[alert.coinId] = {
          coinName: alert.coinName,
          total: 0,
          active: 0,
          triggered: 0
        }
      }

      stats.byCoin[alert.coinId].total++

      if (alert.isActive && !alert.triggeredAt) {
        stats.byCoin[alert.coinId].active++
      }

      if (alert.triggeredAt) {
        stats.byCoin[alert.coinId].triggered++
      }

      // Счетчики по условию
      if (alert.condition === "above") {
        stats.byCondition.above++
      } else if (alert.condition === "below") {
        stats.byCondition.below++
      } else if (alert.condition === "equals") {
        stats.byCondition.equals++
      }
    })

    return stats
  },

  // Экспорт алертов в формат CSV
  exportAlertsToCSV(alerts) {
    if (!alerts || alerts.length === 0) {
      return ""
    }

    const headers = [
      "Coin Name",
      "Coin Symbol",
      "Target Price",
      "Condition",
      "Status",
      "Created At",
      "Triggered At",
      "Is Read"
    ].join(",")

    const rows = alerts.map((alert) => {
      const status = alert.triggeredAt
        ? "Triggered"
        : alert.isActive
        ? "Active"
        : "Inactive"
      const createdAt = new Date(alert.createdAt).toLocaleString()
      const triggeredAt = alert.triggeredAt
        ? new Date(alert.triggeredAt).toLocaleString()
        : ""

      return [
        `"${alert.coinName}"`,
        `"${alert.coinSymbol}"`,
        alert.targetPrice,
        `"${alert.condition}"`,
        `"${status}"`,
        `"${createdAt}"`,
        `"${triggeredAt}"`,
        alert.isRead ? "Yes" : "No"
      ].join(",")
    })

    return [headers, ...rows].join("\n")
  },

  // Импорт алертов из JSON
  importAlertsFromJSON(jsonString) {
    try {
      const alerts = JSON.parse(jsonString)

      // Валидация структуры
      if (!Array.isArray(alerts)) {
        throw new Error("Invalid format: expected array of alerts")
      }

      // Базовая валидация каждого алерта
      const validAlerts = alerts.filter((alert) => {
        return (
          alert &&
          alert.coinId &&
          alert.coinName &&
          alert.coinSymbol &&
          alert.targetPrice &&
          alert.condition &&
          ["above", "below", "equals"].includes(alert.condition)
        )
      })

      console.log(`AlertManager: Imported ${validAlerts.length} alerts from JSON`)
      return validAlerts
    } catch (error) {
      console.error("AlertManager: Error importing alerts from JSON:", error)
      return []
    }
  },

  // Проверка, нужно ли уведомлять пользователя
  shouldNotifyUser(alert, lastNotificationTime) {
    if (!alert) {
      return false
    }

    // Если алерт уже прочитан, не уведомляем
    if (alert.isRead) {
      return false
    }

    // Если есть время последнего уведомления, проверка интервала
    if (lastNotificationTime) {
      const now = Date.now()
      const timeSinceLastNotification = now - lastNotificationTime

      // Не уведомляем чаще, чем раз в 30 секунд
      if (timeSinceLastNotification < 30000) {
        return false
      }
    }

    return true
  },

  // Сброс состояния менеджера
  reset() {
    AlertManager.dispatch = null
    console.log("AlertManager reset")
  }
}

export default AlertManager
