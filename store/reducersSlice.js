/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  coinItem: [],
  //   previousState: null,
  flag: false,
  chartDays: '1',
}

const reducersSlice = createSlice({
  name: "reducers",
  initialState,
  reducers: {
    setCoin: (state, action) => {
      //   state.coinItem = action.payload
      //   state.previousState = { ...state }
      //   state.coinItem.push(action.payload)
      state.coinItem = [...state.coinItem, action.payload]
    },
    setFlag: (state, action) => {
      state.flag = action.payload
    },
    removeCoin: (state, action) => {
    //  const idToRemove = action.payload; // Получаем ID объекта для удаления
      // console.log(idToRemove.id);
      // state.coinItem = state.coinItem.filter(coin => coin.id !== idToRemove);
      const nameCoinForRemove = action.payload;
      state.coinItem = state.coinItem.filter(coin => coin.name !== nameCoinForRemove.name);
      // Метод filter() создает новый массив, который включает все элементы, кроме того, у которого coin.name совпадает с nameCoinForRemove.
    
    },
    setChartDays: (state, action) => {
    state.chartDays = action.payload
    }
  },
})

export const { setCoin, setFlag,removeCoin, setChartDays } = reducersSlice.actions
export default reducersSlice.reducer
