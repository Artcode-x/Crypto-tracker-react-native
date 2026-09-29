import React, { useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Main from "../../pages/Main/Main"
import Favorite from "../../pages/Favorite/Favorite"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import {
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from "react-native"
import Analytics from "../Analytics/Analytics"
import PrivacyPolicy from "../../pages/PrivacyPolicy/PrivacyPolicy"
import Alerts from "../../pages/Alerts/Alerts"
import SupportUs from "../../pages/SupportUs/SupportUs"
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context"
import { RFValue } from "react-native-responsive-fontsize"
import { useDispatch } from "react-redux"
import { setInsets } from "../../store/reducersSlice"

const Tab = createBottomTabNavigator()
const { width, height } = Dimensions.get("window")
const isTablet = width >= 768
const isLargeScreen = height >= 800

const DEFAULT_HORIZONTAL_PADDING = width * 0.02

const TabNavigatorWithSafeArea = () => {
  const dispatch = useDispatch()
  const insets = useSafeAreaInsets()

  useEffect(() => {
    dispatch(setInsets(insets))
  }, [insets, dispatch])

  const hasRoundedCorners = insets.bottom > 4
  const hasNavigationBar = Platform.OS === "android" && insets.bottom > 20

  const getTabBarHeight = () => {
    const heightPercentage = isTablet ? 6.5 : isLargeScreen ? 8 : 8
    const minHeightPercentage = isTablet ? 6 : 7

    const calculatedHeight = (height * heightPercentage) / 100
    const minHeight = (height * minHeightPercentage) / 100

    let finalHeight = Math.max(calculatedHeight, minHeight)

    if (hasNavigationBar) {
      finalHeight = finalHeight + insets.bottom
      finalHeight = Math.max(finalHeight, 50)
    }

    if (hasRoundedCorners && !hasNavigationBar) {
      finalHeight = finalHeight / 1.15 + insets.bottom
    }

    return finalHeight
  }

  const getTabBarPaddingBottom = () => {
    if (insets.bottom > 0) {
      return insets.bottom
    }
    return 0
  }

  const getHorizontalPadding = () => {
    if (hasRoundedCorners) {
      return {
        left: Math.max(insets.left, DEFAULT_HORIZONTAL_PADDING, 16),
        right: Math.max(insets.right, DEFAULT_HORIZONTAL_PADDING, 16)
      }
    } else {
      return {
        left: DEFAULT_HORIZONTAL_PADDING,
        right: DEFAULT_HORIZONTAL_PADDING
      }
    }
  }

  const tabBarHeight = getTabBarHeight()
  const paddingBottom = getTabBarPaddingBottom()
  const horizontalPadding = getHorizontalPadding()

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
      paddingBottom: paddingBottom + 1.5,
      paddingLeft: horizontalPadding.left,
      paddingRight: horizontalPadding.right,
      minHeight: Platform.OS === "android" ? 50 : 45,
      zIndex: 1000,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      flexDirection: "row",
      alignItems: "center"
    },
    tabBarItem: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: "100%"
    },
    tabBarLabelStyle: {
      fontSize: Platform.OS === "ios" ? RFValue(7.1) : RFValue(8),
      marginBottom: paddingBottom > 0 ? 0 : 3,
      fontWeight: "500",
      textAlign: "center",
      // Добавляем эти свойства для длинных текстов
      flexShrink: 1,
      width: "100%"
    },
    // Добавляем специальный стиль для длинных надписей
    longLabelStyle: {
      fontSize: Platform.OS === "ios" ? RFValue(6.5) : RFValue(8)
    },
    tabBarIconStyle: {
      marginTop: 5
    },
    labelContainer: {
      width: "100%",
      alignItems: "center",
      paddingHorizontal: 2
    }
  })

  const renderTabBar = (props) => {
    return (
      <View style={styles.tabBarStyle}>
        {props.state.routes.map((route, index) => {
          const { options } = props.descriptors[route.key]
          const isFocused = props.state.index === index

          const onPress = () => {
            const event = props.navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true
            })

            if (!isFocused && !event.defaultPrevented) {
              props.navigation.navigate(route.name)
            }
          }

          const onLongPress = () => {
            props.navigation.emit({
              type: "tabLongPress",
              target: route.key
            })
          }

          const color = isFocused ? "#FF6347" : "#aaa"
          const iconSize = isTablet ? 23 : 22

          const title = options.title || route.name
          const isLongLabel = title.length > 10

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole='button'
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabBarItem}
              activeOpacity={0.7}
            >
              <View style={styles.tabBarIconStyle}>
                {options.tabBarIcon ? (
                  options.tabBarIcon({ color, size: iconSize })
                ) : (
                  <Ionicons name='help' size={iconSize} color={color} />
                )}
              </View>
              <View style={styles.labelContainer}>
                <Text
                  style={[
                    styles.tabBarLabelStyle,
                    { color },
                    isLongLabel && styles.longLabelStyle
                  ]}
                  numberOfLines={1}
                  ellipsizeMode='tail'
                >
                  {title}
                </Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#FF6347",
        tabBarInactiveTintColor: "#aaa",
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "rgba(50, 48, 49, 0.8)",
          borderBottomColor: "wheat",
          borderBottomWidth: 1
        }
      }}
      tabBar={renderTabBar}
    >
      {/* ВСЕ ЭКРАНЫ ТЕПЕРЬ ПРАВИЛЬНО ОБЕРНУТЫ В Screen */}
      <Tab.Screen
        name='Home'
        component={Main}
        options={{
          title: "Watchlists",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='pulse' size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='Favorite'
        component={Favorite}
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='logo-bitcoin' size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='Alerts'
        component={Alerts}
        options={{
          title: "Price Alerts",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='notifications' size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='Analytics'
        component={Analytics}
        options={{
          title: "Analytics",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='bar-chart' size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='PrivacyPolicy'
        component={PrivacyPolicy}
        options={{
          title: "Privacy Policy",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='mail-unread' size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='SupportUs'
        component={SupportUs}
        options={{
          title: "Support Us",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='code-braces' size={size} color={color} />
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
