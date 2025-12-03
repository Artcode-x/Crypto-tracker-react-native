/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  coinItem: [],
  userAssets: {},
  flag: false,
  chartDays: "1h",
  flagForView: false,
  duplicate: false
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
  updateUserAsset
} = reducersSlice.actions
export default reducersSlice.reducer
