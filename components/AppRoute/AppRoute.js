import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Main from "../../pages/Main/Main"
import Favorite from "../../pages/Favorite/Favorite"
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
          tabBarInactiveTintColor: "#aaa" // Цвет неактивного элемента
        }}
      >
        <Tab.Screen
          name='Home'
          component={Main}
          options={{
            title: "Watchlists",
            // CryptoTracker
            tabBarIcon: ({ color }) => (
              <Ionicons name='pulse' size={24} color={color} />
              // home-outline
            )
          }}
        />
        <Tab.Screen
          name='Favorite'
          component={Favorite}
          options={{
            title: "Favorites",
            tabBarIcon: ({ color }) => (
              <Ionicons name='logo-bitcoin' size={24} color={color} />
              //   star-outline
            )
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
    height: 60
  }
})
