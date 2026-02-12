import React, { useMemo, useState, useEffect } from "react"
import {
  View,
  Text,
  SafeAreaView,
  Alert as RNAlert,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Animated
} from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import * as Haptics from "expo-haptics"
import AsyncStorage from "@react-native-async-storage/async-storage"

import {
  priceAlertsSelector,
  triggeredAlertsSelector,
  activeAlertsSelector
} from "../../store/alertsSelectors"
import { deletePriceAlert, clearTriggeredAlerts } from "../../store/alertsSlice"

import { styles } from "./Alerts.styles"
import AlertCard from "../../components/AlertCard/AlertCard"
import ServerSyncService from "../../services/ServerSyncService"
import AlertsPlaceholder from "./AlertsPlaceholder"

const Alerts = () => {
  const dispatch = useDispatch()
  const priceAlerts = useSelector(priceAlertsSelector)

  const [serverAlertsEnabled, setServerAlertsEnabled] = useState(false)
  const [showFirstTimeTooltip, setShowFirstTimeTooltip] = useState(false)
  const tooltipAnim = useState(new Animated.Value(0))[0]
  const tooltipSlideAnim = useState(new Animated.Value(-50))[0]

  useEffect(() => {
    loadConsentStatus()
    checkFirstTimeVisit()
  }, [])

  const checkFirstTimeVisit = async () => {
    const tooltipShownCount = await AsyncStorage.getItem(
      "@server_alerts_tooltip_shown_count"
    )
    const count = tooltipShownCount ? parseInt(tooltipShownCount) : 0

    // Доп проверка: показать только если счетчик не обновлялся сегодня
    const lastShownDate = await AsyncStorage.getItem("@server_alerts_last_shown_date")
    const today = new Date().toDateString()

    if (count < 3 && lastShownDate !== today) {
      setTimeout(() => {
        setShowFirstTimeTooltip(true)
        Animated.parallel([
          Animated.spring(tooltipAnim, {
            toValue: 1,
            tension: 20,
            friction: 6,
            useNativeDriver: true
          }),
          Animated.spring(tooltipSlideAnim, {
            toValue: 0,
            tension: 20,
            friction: 7,
            useNativeDriver: true
          })
        ]).start()
      }, 800)
    }
  }

  const loadConsentStatus = async () => {
    const consent = await AsyncStorage.getItem("@background_alerts_consent")
    setServerAlertsEnabled(consent === "agreed")
  }

  const toggleServerAlerts = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    const newStatus = !serverAlertsEnabled
    const consentValue = newStatus ? "agreed" : "denied"

    await AsyncStorage.setItem("@background_alerts_consent", consentValue)
    setServerAlertsEnabled(newStatus)

    if (showFirstTimeTooltip) {
      await hideTooltipAndSave() // теперь общая ф-ия ( вместо дублирования кода)
    }

    await ServerSyncService.updateConsent(newStatus)

    if (newStatus) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
    }
  }

  const hideTooltip = () => {
    Animated.parallel([
      Animated.timing(tooltipAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(tooltipSlideAnim, {
        toValue: -50,
        duration: 300,
        useNativeDriver: true
      })
    ]).start(() => {
      setShowFirstTimeTooltip(false)
    })
  }

  const hideTooltipAndSave = async () => {
    // 1. Увеличение счетчика (как при клике на облачко)
    const currentCount = await AsyncStorage.getItem("@server_alerts_tooltip_shown_count")
    const newCount = currentCount ? parseInt(currentCount) + 1 : 1

    // 2. Сохр обновленные данные
    await AsyncStorage.setItem("@server_alerts_tooltip_shown_count", newCount.toString())
    await AsyncStorage.setItem(
      "@server_alerts_last_shown_date",
      new Date().toDateString()
    )

    // 3. Вызов анимации скрытия
    hideTooltip()
  }

  const tooltipOpacity = tooltipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  })

  const tooltipTranslateY = tooltipSlideAnim.interpolate({
    inputRange: [-50, 0],
    outputRange: [-50, 0]
  })

  const triggeredAlerts = useMemo(() => {
    return priceAlerts.filter((alert) => alert.triggeredAt)
  }, [priceAlerts])

  const activeAlerts = useMemo(() => {
    return priceAlerts.filter((alert) => alert.isActive && !alert.triggeredAt)
  }, [priceAlerts])

  const [activeFilter, setActiveFilter] = useState("active")

  const handleDeleteAlert = (alertId) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    RNAlert.alert("Delete Alert", "Delete this price alert?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => dispatch(deletePriceAlert(alertId))
      }
    ])
  }

  const handleClearTriggered = () => {
    if (triggeredAlerts.length === 0) return

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

    RNAlert.alert(
      "Clear Triggered",
      `Clear ${triggeredAlerts.length} triggered alerts?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => {
            dispatch(clearTriggeredAlerts())
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
          }
        }
      ]
    )
  }

  const stats = {
    total: priceAlerts.length,
    active: activeAlerts.length,
    triggered: triggeredAlerts.length
  }

  if (priceAlerts.length === 0) {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <AlertsPlaceholder />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar barStyle='light-content' backgroundColor='#0A0A0F' />

      <View style={styles.container}>
        {/* Подсказка для первого захода */}
        {showFirstTimeTooltip && (
          <Animated.View
            style={[
              styles.tooltipContainer,
              {
                opacity: tooltipOpacity,
                transform: [{ translateY: tooltipTranslateY }]
              }
            ]}
          >
            <LinearGradient
              colors={[
                "rgba(212, 175, 55, 0.15)",
                "rgba(212, 175, 55, 0.08)",
                "rgba(212, 175, 55, 0.05)"
              ]}
              style={styles.tooltipGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.tooltipContent}>
                <View style={styles.tooltipHeader}>
                  <Ionicons name='notifications-sharp' size={14} color='#FFD700' />
                  <Text style={styles.tooltipTitle}>Important!</Text>
                  <TouchableOpacity
                    onPress={hideTooltipAndSave}
                    style={styles.tooltipCloseButton}
                  >
                    <Ionicons name='close' size={12} color='rgba(255, 255, 255, 0.6)' />
                  </TouchableOpacity>
                </View>
                {/* ИСПРАВЛЕН ТЕКСТ */}
                <Text style={styles.tooltipText}>
                  For enable or disable server background notifications 24/7, click this
                  cloud icon
                </Text>
                <View style={styles.tooltipArrow} />
              </View>
            </LinearGradient>
          </Animated.View>
        )}

        {/* Заголовок */}
        <LinearGradient
          colors={["rgba(26, 26, 26, 0.95)", "rgba(40, 40, 40, 0.9)"]}
          style={styles.miniHeader}
        >
          <View style={styles.headerLeft}>
            <Ionicons name='notifications' size={18} color='#FFD700' />
            <Text style={styles.headerTitle}>ALERTS</Text>
            <View style={styles.headerStatsMini}>
              <View style={styles.statMini}>
                <Text style={styles.statNumberMini}>{stats.total}</Text>
                <Text style={styles.statLabelMini}>TOTAL</Text>
              </View>
            </View>
          </View>

          <View style={styles.headerRight}>
            {triggeredAlerts.length > 0 && (
              <TouchableOpacity
                onPress={handleClearTriggered}
                style={styles.clearMiniButton}
              >
                <Ionicons name='trash-outline' size={16} color='#F44336' />
                <Text style={styles.clearMiniText}>{stats.triggered}</Text>
              </TouchableOpacity>
            )}

            {/* Кнопка серверных алертов */}
            <View style={styles.serverToggleWrapper}>
              <TouchableOpacity
                onPress={toggleServerAlerts}
                style={[
                  styles.serverToggleButton,
                  serverAlertsEnabled && styles.serverToggleButtonActive,
                  showFirstTimeTooltip && styles.serverToggleButtonHighlighted
                ]}
              >
                <Ionicons
                  name={serverAlertsEnabled ? "cloud-done" : "cloud-offline"}
                  size={14}
                  color={
                    serverAlertsEnabled
                      ? "#4CAF50"
                      : showFirstTimeTooltip
                      ? "#FFD700"
                      : "#AAAAAA"
                  }
                />
                <LinearGradient
                  colors={
                    serverAlertsEnabled
                      ? ["rgba(76, 175, 80, 0.15)", "rgba(76, 175, 80, 0.05)"]
                      : showFirstTimeTooltip
                      ? ["rgba(212, 175, 55, 0.2)", "rgba(212, 175, 55, 0.05)"]
                      : ["rgba(170, 170, 170, 0.1)", "rgba(170, 170, 170, 0.05)"]
                  }
                  style={styles.serverToggleGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
                {showFirstTimeTooltip && (
                  <Animated.View
                    style={[
                      styles.pulseRing,
                      {
                        opacity: tooltipAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.3, 0.6]
                        })
                      }
                    ]}
                  />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.activeStats}>
              <View style={styles.activeStatItem}>
                <View style={styles.activeDot} />
                <Text style={styles.activeStatText}>{stats.active}</Text>
              </View>
              <View style={styles.triggeredStatItem}>
                <View style={styles.triggeredDot} />
                <Text style={styles.triggeredStatText}>{stats.triggered}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Остальной код компонента без изменений */}
        {/* Фильтры */}
        <View style={styles.compactFilters}>
          <TouchableOpacity
            style={[
              styles.compactFilter,
              activeFilter === "active" && styles.compactFilterActive
            ]}
            onPress={() => setActiveFilter("active")}
          >
            <Ionicons
              name='flash'
              size={12}
              color={activeFilter === "active" ? "#FFF" : "#4CAF50"}
            />
            <Text
              style={[
                styles.compactFilterText,
                activeFilter === "active" && styles.compactFilterTextActive
              ]}
            >
              Active
            </Text>
            {stats.active > 0 && (
              <View style={styles.compactBadge}>
                <Text style={styles.compactBadgeText}>{stats.active}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.compactFilter,
              activeFilter === "triggered" && styles.compactFilterActive
            ]}
            onPress={() => setActiveFilter("triggered")}
          >
            <Ionicons
              name='checkmark-circle'
              size={12}
              color={activeFilter === "triggered" ? "#FFF" : "#FFD700"}
            />
            <Text
              style={[
                styles.compactFilterText,
                activeFilter === "triggered" && styles.compactFilterTextActive
              ]}
            >
              Triggered
            </Text>
            {stats.triggered > 0 && (
              <View style={styles.compactBadge}>
                <Text style={styles.compactBadgeText}>{stats.triggered}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.compactFilter,
              activeFilter === "all" && styles.compactFilterActive
            ]}
            onPress={() => setActiveFilter("all")}
          >
            <Ionicons
              name='list'
              size={12}
              color={activeFilter === "all" ? "#FFF" : "#9C27B0"}
            />
            <Text
              style={[
                styles.compactFilterText,
                activeFilter === "all" && styles.compactFilterTextActive
              ]}
            >
              All
            </Text>
            <View style={styles.compactBadge}>
              <Text style={styles.compactBadgeText}>{stats.total}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <FlatList
          data={
            activeFilter === "active"
              ? activeAlerts
              : activeFilter === "triggered"
              ? triggeredAlerts
              : priceAlerts
          }
          renderItem={({ item }) => (
            <AlertCard alert={item} onDelete={() => handleDeleteAlert(item.id)} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <View style={styles.noResults}>
              <Ionicons name='search-outline' size={24} color='#FFD700' />
              <Text style={styles.noResultsText}>No alerts here</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  )
}

export default Alerts
