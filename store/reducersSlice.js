/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  coinItem: [],
  flag: false,
}

const reducersSlice = createSlice({
  name: "reducers",
  initialState,
  reducers: {
    setCoin: (state, action) => {
      //   state.coinItem = action.payload
      //   state.coinItem.push(action.payload)
      state.coinItem = [...state.coinItem, action.payload]
    },
    setFlag: (state, action) => {
      state.flag = action.payload
    },
  },
})

export const { setCoin, setFlag } = reducersSlice.actions
export default reducersSlice.reducer
