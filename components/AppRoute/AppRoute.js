import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Main from "../../pages/Main"
import Favorite from "../../pages/AnotherScreen/AnotherScreen"
import { Ionicons } from "react-native-vector-icons"
import { StyleSheet } from "react-native"

const Tab = createBottomTabNavigator()

export const AppRoute = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        style={styles.tabBarStyle}
        screenOptions={{
          tabBarActiveTintColor: "#FF6347", // Цвет активного элемента
          tabBarInactiveTintColor: "#aaa", // Цвет неактивного элемента
        }}
      >
        <Tab.Screen
          name="Home"
          component={Main}
          options={{
            title: "CryptoTracker",
            tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Favorite"
          component={Favorite}
          options={{
            title: "Избранное",
            tabBarIcon: ({ color }) => <Ionicons name="star-outline" size={24} color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    backgroundColor: "#fff",
    borderTopColor: "#e4e4e4",
    borderTopWidth: 1,
    height: 60,
  },
})
