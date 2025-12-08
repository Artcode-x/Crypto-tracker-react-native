import { configureStore } from "@reduxjs/toolkit"
import reducersSlice from "./reducersSlice"
import alertsSlice from "./alertsSlice"

const store = configureStore({
  reducer: {
    store: reducersSlice,
    alerts: alertsSlice
  }
})
export default store
