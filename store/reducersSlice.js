/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  coinItem: [],
  userAssets: {},
  flag: false,
  chartDays: "1h",
  flagForView: false,
  duplicate: false,

  // для рыночных данных
  marketData: [], // Все загруженные монеты
  marketCurrentPage: 1, // Текущая страница
  marketIsLoadingMore: false, // Флаг загрузки дополнительных данных
  marketHasMore: true, // Есть ли еще данные для загрузки
  marketLastUpdated: null, // Когда последний раз обновляли
  marketError: null // Ошибка загрузки
}

const reducersSlice = createSlice({
  name: "reducers",
  initialState,
  reducers: {
    setCoin: (state, action) => {
      state.coinItem = [...state.coinItem, action.payload]
    },
    setFlag: (state, action) => {
      state.flag = action.payload
    },
    removeCoin: (state, action) => {
      const nameCoinForRemove = action.payload
      state.coinItem = state.coinItem.filter(
        (coin) => coin.name !== nameCoinForRemove.name
      )
    },
    setChartDays: (state, action) => {
      state.chartDays = action.payload
    },
    rewriteFavorite: (state, action) => {
      state.coinItem = action.payload
    },
    setFlagForView: (state, action) => {
      state.flagForView = action.payload
    },
    setDuplicate: (state, action) => {
      state.duplicate = action.payload
    },
    updateUserAsset: (state, action) => {
      const { coinId, amount } = action.payload
      state.userAssets = {
        ...state.userAssets,
        [coinId]: amount
      }
    },

    // нов
    setMarketData: (state, action) => {
      state.marketData = action.payload
    },

    addMoreMarketData: (state, action) => {
      // Доб нов данные к существующим
      state.marketData = [...state.marketData, ...action.payload]
    },

    setMarketCurrentPage: (state, action) => {
      state.marketCurrentPage = action.payload
    },

    setMarketIsLoadingMore: (state, action) => {
      state.marketIsLoadingMore = action.payload
    },

    setMarketHasMore: (state, action) => {
      state.marketHasMore = action.payload
    },

    setMarketLastUpdated: (state, action) => {
      state.marketLastUpdated = action.payload
    },

    setMarketError: (state, action) => {
      state.marketError = action.payload
    },

    resetMarketData: (state) => {
      // Полный сброс рыночных данных
      state.marketData = []
      state.marketCurrentPage = 1
      state.marketHasMore = true
      state.marketIsLoadingMore = false
      state.marketError = null
    },

    updateMarketDataItem: (state, action) => {
      // Обновление конкретной монеты при изменении цены
      const { id, data } = action.payload
      const index = state.marketData.findIndex((item) => item.id === id)
      if (index !== -1) {
        state.marketData[index] = { ...state.marketData[index], ...data }
      }
    }
  }
})

export const {
  setCoin,
  setFlag,
  removeCoin,
  setChartDays,
  rewriteFavorite,
  setFlagForView,
  setDuplicate,
  updateUserAsset,
  // Новые экшены
  setMarketData,
  addMoreMarketData,
  setMarketCurrentPage,
  setMarketIsLoadingMore,
  setMarketHasMore,
  setMarketLastUpdated,
  setMarketError,
  resetMarketData,
  updateMarketDataItem
} = reducersSlice.actions

export default reducersSlice.reducer
