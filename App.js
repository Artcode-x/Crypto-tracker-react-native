import { Provider } from "react-redux"
import { AppRoute } from "./components/AppRoute/AppRoute"
import store from "./store/store"
import { GestureHandlerRootView } from "react-native-gesture-handler"

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <AppRoute />
      </GestureHandlerRootView>
    </Provider>
  )
}
