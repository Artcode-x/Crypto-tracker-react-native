import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Main from "../../pages/Main/Main"
import Favorite from "../../pages/Favorite/Favorite"
import { Ionicons } from "@expo/vector-icons"
import { StyleSheet } from "react-native"
import Analytics from "../Analytics/Analytics"
import PrivacyPolicy from "../../pages/PrivacyPolicy/PrivacyPolicy"
import Alerts from "../../pages/Alerts/Alerts"

const Tab = createBottomTabNavigator()

export const AppRoute = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        // style={styles.tabBarStyle}
        screenOptions={{
          tabBarActiveTintColor: "#FF6347", // Цвет активного элемента
          tabBarInactiveTintColor: "#aaa", // Цвет неактивного элемента
          tabBarStyle: styles.tabBarStyle,
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "rgba(50, 48, 49, 0.8)",
            // borderBottomColor: "#e4e4e4",
            borderBottomColor: "wheat",
            borderBottomWidth: 1
            // height: "auto"
          }
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
        <Tab.Screen
          name='Alerts'
          component={Alerts}
          options={{
            title: "Price Alerts",
            tabBarIcon: ({ color }) => (
              <Ionicons name='notifications' size={24} color={color} />
            )
          }}
        />

        <Tab.Screen
          name='Analytics'
          component={Analytics}
          options={{
            title: "Analytics",
            tabBarIcon: ({ color }) => (
              <Ionicons name='bar-chart' size={24} color={color} />
              //   star-outline
            )
          }}
        />
        <Tab.Screen
          name='PrivacyPolicy'
          component={PrivacyPolicy}
          options={{
            title: "Privacy Policy",
            tabBarIcon: ({ color }) => (
              <Ionicons name='mail-unread' size={24} color={color} />
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
    //  backgroundColor: "#fff",
    backgroundColor: "rgba(50, 48, 49, 0.8)",
    // borderTopColor: "#e4e4e4",
    borderTopColor: "wheat",
    borderTopWidth: 1,
    height: "8%"
    // paddingBottom: "2%"
  }
})
