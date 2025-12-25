import React, { useMemo, useState } from "react"
import {
  View,
  Text,
  SafeAreaView,
  Alert as RNAlert,
  StatusBar,
  FlatList,
  TouchableOpacity
} from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import * as Haptics from "expo-haptics"

import {
  priceAlertsSelector,
  triggeredAlertsSelector,
  activeAlertsSelector
} from "../../store/alertsSelectors"
import { deletePriceAlert, clearTriggeredAlerts } from "../../store/alertsSlice"

import { styles } from "./Alerts.styles"
import AlertCard from "../../components/AlertCard/AlertCard"

const Alerts = () => {
  const dispatch = useDispatch()
  const priceAlerts = useSelector(priceAlertsSelector) // Все алерты
  //   const triggeredAlerts = useSelector(triggeredAlertsSelector) // Сработавшие
  //   const activeAlerts = useSelector(activeAlertsSelector) // Активные

  const triggeredAlerts = useMemo(() => {
    return priceAlerts.filter((alert) => alert.triggeredAt)
  }, [priceAlerts])

  const activeAlerts = useMemo(() => {
    return priceAlerts.filter((alert) => alert.isActive && !alert.triggeredAt)
  }, [priceAlerts]) // ← пересчет только если priceAlerts изменился

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
        <StatusBar barStyle='light-content' backgroundColor='#0A0A0F' />
        <View style={styles.container}>
          {/* Заголовок для пустого состояния */}
          <View style={styles.miniHeader}>
            <View style={styles.headerLeft}>
              <Ionicons name='notifications-outline' size={18} color='#FFD700' />
              <Text style={styles.headerTitle}>Alerts</Text>
            </View>
          </View>

          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconWrapper}>
              <Ionicons name='notifications-off-outline' size={36} color='#FFD700' />
            </View>
            <Text style={styles.emptyTitle}>No Alerts</Text>
            <Text style={styles.emptyText}>Create price alerts in Favorites</Text>
          </View>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar barStyle='light-content' backgroundColor='#0A0A0F' />

      <View style={styles.container}>
        {/* Заголовок */}
        <LinearGradient
          colors={["rgba(26, 26, 26, 0.95)", "rgba(40, 40, 40, 0.9)"]}
          style={styles.miniHeader}
        >
          <View style={styles.headerLeft}>
            <Ionicons name='notifications' size={18} color='#FFD700' />
            <Text style={styles.headerTitle}>Alerts</Text>
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
