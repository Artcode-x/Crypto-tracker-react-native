import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Main from "../../pages/Main"
import Favorite from "../../pages/AnotherScreen/AnotherScreen"

const Tab = createBottomTabNavigator()

export const AppRoute = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Main} options={{ title: "CryptoTracker" }} />
        <Tab.Screen name="Favorite" component={Favorite} options={{ title: "Избранное" }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
