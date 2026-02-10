import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Main from "../../pages/Main/Main"
import Favorite from "../../pages/Favorite/Favorite"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { Dimensions, Platform, StyleSheet } from "react-native"
import Analytics from "../Analytics/Analytics"
import PrivacyPolicy from "../../pages/PrivacyPolicy/PrivacyPolicy"
import Alerts from "../../pages/Alerts/Alerts"
import SupportUs from "../../pages/SupportUs/SupportUs"
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets
} from "react-native-safe-area-context"
import { RFValue } from "react-native-responsive-fontsize"

const Tab = createBottomTabNavigator()
const { width, height } = Dimensions.get("window")
const isTablet = width >= 768
const isLargeScreen = height >= 800

const TabNavigatorWithSafeArea = () => {
  const insets = useSafeAreaInsets()

  const getTabBarHeight = () => {
    const heightPercentage = isTablet ? 6.5 : isLargeScreen ? 9 : 8.3
    const minHeightPercentage = isTablet ? 6 : 7

    const calculatedHeight = (height * heightPercentage) / 100
    const minHeight = (height * minHeightPercentage) / 100

    let finalHeight = Math.max(calculatedHeight, minHeight)

    if (Platform.OS === "android") {
      if (insets.bottom > 0) {
        finalHeight = finalHeight + insets.bottom
      }

      finalHeight = Math.max(finalHeight, 50)
    }

    console.log(
      `TabBar Height: ${finalHeight}px (${heightPercentage}%), bottom inset: ${insets.bottom}px`
    )
    return finalHeight
  }

  const getTabBarPaddingBottom = () => {
    if (Platform.OS === "android" && insets.bottom > 0) {
      return insets.bottom
    }
    return 0
  }

  const tabBarHeight = getTabBarHeight()
  const paddingBottom = getTabBarPaddingBottom()

  const styles = StyleSheet.create({
    tabBarStyle: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      elevation: 10,
      backgroundColor: "rgba(50, 48, 49, 0.95)",
      borderTopColor: "wheat",
      borderTopWidth: 1,
      height: tabBarHeight,
      paddingBottom: paddingBottom,
      minHeight: Platform.OS === "android" ? 50 : 45,
      zIndex: 1000,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84
    },
    tabBarLabelStyle: {
      fontSize: Platform.OS === "ios" ? RFValue(10) : RFValue(9),
      marginBottom: paddingBottom > 0 ? 0 : 3,
      fontWeight: "500"
    },
    tabBarIconStyle: {
      marginTop: 5
    }
  })

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#FF6347",
        tabBarInactiveTintColor: "#aaa",
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarIconStyle: styles.tabBarIconStyle,
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "rgba(50, 48, 49, 0.8)",
          borderBottomColor: "wheat",
          borderBottomWidth: 1
        }
      }}
    >
      <Tab.Screen
        name='Home'
        component={Main}
        options={{
          title: "Watchlists",

          tabBarIcon: ({ color }) => (
            <Ionicons name='pulse' size={isTablet ? 23 : 22} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='Favorite'
        component={Favorite}
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => (
            <Ionicons name='logo-bitcoin' size={isTablet ? 23 : 22} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='Alerts'
        component={Alerts}
        options={{
          title: "Price Alerts",
          tabBarIcon: ({ color }) => (
            <Ionicons name='notifications' size={isTablet ? 23 : 22} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='Analytics'
        component={Analytics}
        options={{
          title: "Analytics",
          tabBarIcon: ({ color }) => (
            <Ionicons name='bar-chart' size={isTablet ? 23 : 22} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='PrivacyPolicy'
        component={PrivacyPolicy}
        options={{
          title: "Privacy Policy",
          tabBarIcon: ({ color }) => (
            <Ionicons name='mail-unread' size={isTablet ? 23 : 22} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='SupportUs'
        component={SupportUs}
        options={{
          title: "Support Us",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='code-braces'
              size={isTablet ? 23 : 22}
              color={color}
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export const AppRoute = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNavigatorWithSafeArea />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
