/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  alerts: [],
  lastCheckTime: null,
  unreadCount: 0
}

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    // Добавление нового алерта
    addPriceAlert: (state, action) => {
      const newAlert = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        isActive: true,
        isRead: false,
        triggeredAt: null,

        createdPrice: Number(action.payload.currentPrice) || 0,
        currentPrice: Number(action.payload.currentPrice) || 0,
        targetPrice: Number(action.payload.targetPrice) || 0
      }

      state.alerts.push(newAlert)
      state.unreadCount = state.alerts.filter((alert) => !alert.isRead).length
    },

    // Обновление алерта
    updatePriceAlert: (state, action) => {
      const { id, updates } = action.payload
      const index = state.alerts.findIndex((alert) => alert.id === id)

      if (index !== -1) {
        const sanitizedUpdates = { ...updates }
        if (updates.createdAt && updates.createdAt instanceof Date) {
          sanitizedUpdates.createdAt = updates.createdAt.toISOString()
        }
        if (updates.triggeredAt && updates.triggeredAt instanceof Date) {
          sanitizedUpdates.triggeredAt = updates.triggeredAt.toISOString()
        }

        state.alerts[index] = {
          ...state.alerts[index],
          ...sanitizedUpdates
        }
        state.unreadCount = state.alerts.filter((alert) => !alert.isRead).length
      }
    },

    // Удаление алерта
    deletePriceAlert: (state, action) => {
      const id = action.payload
      state.alerts = state.alerts.filter((alert) => alert.id !== id)
      state.unreadCount = state.alerts.filter((alert) => !alert.isRead).length
    },

    // Отметить алерт как прочитанный
    markAlertAsRead: (state, action) => {
      const id = action.payload
      const alert = state.alerts.find((a) => a.id === id)

      if (alert && !alert.isRead) {
        alert.isRead = true
        state.unreadCount = state.unreadCount > 0 ? state.unreadCount - 1 : 0
      }
    },

    // Отметить все алерты как прочитанные
    markAllAlertsAsRead: (state) => {
      state.alerts.forEach((alert) => {
        alert.isRead = true
      })
      state.unreadCount = 0
    },

    // Установить время последней проверки
    setLastAlertCheck: (state, action) => {
      state.lastCheckTime =
        typeof action.payload === "string" ? action.payload : new Date().toISOString()
    },

    // Обновить текущие цены в алертах
    updateAlertPrices: (state, action) => {
      const priceUpdates = action.payload

      state.alerts.forEach((alert) => {
        const update = priceUpdates.find((u) => u.coinId === alert.coinId)
        if (update && alert.isActive && !alert.triggeredAt) {
          alert.currentPrice = Number(update.currentPrice) || 0
        }
      })
    },

    // Активировать сработавший алерт
    triggerAlert: (state, action) => {
      const { id, currentPrice } = action.payload
      const alert = state.alerts.find((a) => a.id === id)

      if (alert && alert.isActive) {
        alert.triggeredAt = new Date().toISOString()
        alert.currentPrice = Number(currentPrice) || 0
        alert.isActive = false
        alert.isRead = false
        state.unreadCount = state.unreadCount + 1
      }
    },

    // Очистить все алерты
    clearAllAlerts: (state) => {
      state.alerts = []
      state.unreadCount = 0
      state.lastCheckTime = null
    },

    // Очистить только сработавшие алерты
    clearTriggeredAlerts: (state) => {
      state.alerts = state.alerts.filter((alert) => !alert.triggeredAt)
      state.unreadCount = state.alerts.filter((alert) => !alert.isRead).length
    },

    // Восстановить алерт (сделать активным)
    restoreAlert: (state, action) => {
      const id = action.payload
      const alert = state.alerts.find((a) => a.id === id)

      if (alert) {
        alert.isActive = true
        alert.triggeredAt = null
        alert.isRead = true
        state.unreadCount = state.unreadCount > 0 ? state.unreadCount - 1 : 0
      }
    },

    // Загрузить алерты (например, из AsyncStorage)
    loadAlerts: (state, action) => {
      const { alerts, lastCheckTime, unreadCount } = action.payload

      // Валидация и очистка данных
      const sanitizedAlerts = alerts.map((alert) => ({
        ...alert,

        createdPrice: Number(alert.createdPrice) || Number(alert.currentPrice) || 0,
        currentPrice: Number(alert.currentPrice) || 0,
        targetPrice: Number(alert.targetPrice) || 0,

        createdAt:
          typeof alert.createdAt === "string"
            ? alert.createdAt
            : alert.createdAt?.toISOString
            ? alert.createdAt.toISOString()
            : new Date().toISOString(),
        triggeredAt: alert.triggeredAt
          ? typeof alert.triggeredAt === "string"
            ? alert.triggeredAt
            : alert.triggeredAt?.toISOString
            ? alert.triggeredAt.toISOString()
            : new Date().toISOString()
          : null
      }))

      state.alerts = sanitizedAlerts
      state.lastCheckTime = typeof lastCheckTime === "string" ? lastCheckTime : null
      state.unreadCount = Number(unreadCount) || 0
    }
  }
})

export const {
  addPriceAlert,
  updatePriceAlert,
  deletePriceAlert,
  markAlertAsRead,
  markAllAlertsAsRead,
  setLastAlertCheck,
  updateAlertPrices,
  triggerAlert,
  clearAllAlerts,
  clearTriggeredAlerts,
  restoreAlert,
  loadAlerts
} = alertsSlice.actions

export default alertsSlice.reducer
