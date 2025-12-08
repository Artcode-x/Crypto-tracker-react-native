import { Provider } from "react-redux"
import { AppRoute } from "./components/AppRoute/AppRoute"
import store from "./store/store"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useEffect } from "react"
import NotificationService from "./services/NotificationService"
import * as Notifications from "expo-notifications"

export default function App() {
  useEffect(() => {
    // Запрос разрешения при запуске приложения
    NotificationService.requestPermissions().then((granted) => {
      if (granted) {
        console.log("Notification permissions granted")
      } else {
        console.log("Notification permissions denied")
      }
    })

    // Регистрация обработчика уведомлений
    const subscriptions = NotificationService.registerNotificationHandlers(
      // Обработчик получения уведомления
      (notification) => {
        console.log("Notification received while app is open:", notification)
      },
      // Обработчик нажатия на уведомление
      (response) => {
        console.log("User tapped notification:", response)
        const data = response.notification.request.content.data
        if (data.type === "price-alert") {
          // Навигация к алерту
          console.log("Price alert tapped:", data.alertId)
        }
      }
    )

    // Очистка при размонтировании
    return () => {
      if (subscriptions) {
        NotificationService.removeNotificationHandlers(subscriptions)
      }
    }
  }, [])

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppRoute />
      </GestureHandlerRootView>
    </Provider>
  )
}
