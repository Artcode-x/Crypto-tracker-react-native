import { Provider } from "react-redux"
import { AppRoute } from "./components/AppRoute/AppRoute"
import store from "./store/store"

export default function App() {
  return (
    <Provider store={store}>
      <AppRoute />
    </Provider>
  )
}
