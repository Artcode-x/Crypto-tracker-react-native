import React, { useEffect, useState } from "react"
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  Platform
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"
import * as Haptics from "expo-haptics"
import { styles } from "./AlertConsentModal.styles"

const AlertConsentModal = ({ visible, onAgree, onCancel }) => {
  const [fadeAnim] = useState(new Animated.Value(0))
  const [slideAnim] = useState(new Animated.Value(Dimensions.get("window").height))
  const { width, height } = Dimensions.get("window")

  const isAndroid = Platform.OS === "android"
  const maxHeight = isAndroid ? height * 0.8 : height * 0.85 // Чуть выше модалка

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 75,
          friction: 10,
          useNativeDriver: true
        })
      ]).start()

      if (isAndroid) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      }
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true
      }).start()
    }
  }, [visible])

  const handleAgree = () => {
    if (isAndroid) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    onAgree()
  }

  const handleCancel = () => {
    if (isAndroid) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
    onCancel()
  }

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType='none'
      onRequestClose={handleCancel}
    >
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY: slideAnim }],
              maxHeight: maxHeight,
              maxWidth: Math.min(width * 0.92, 400)
            }
          ]}
        >
          <LinearGradient
            colors={[
              "rgba(26, 26, 26, 0.98)",
              "rgba(40, 40, 40, 0.96)",
              "rgba(26, 26, 26, 0.98)"
            ]}
            style={styles.gradient}
          >
            {/* Декоративный верхний бордер */}
            <LinearGradient
              colors={["#FFD700", "#B8860B", "#DAA520"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.topBorder}
            />

            {/* Компактный заголовок */}
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name='shield-lock' size={20} color='#FFD700' />
                <MaterialCommunityIcons
                  name='bell-ring'
                  size={16}
                  color='#FFD700'
                  style={styles.bellIcon}
                />
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Background Price Alerts</Text>
                <Text style={styles.subtitle}>Transparency & Control</Text>
              </View>
            </View>

            {/* Основной контент - БОЛЕЕ КОМПАКТНЫЙ */}
            <ScrollView
              style={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContentContainer}
            >
              <View style={styles.featureCard}>
                <MaterialCommunityIcons name='check-circle' size={15} color='#4CAF50' />
                <Text style={styles.featureText}>
                  Get notified even when app is closed
                </Text>
              </View>

              <View style={styles.featureCard}>
                <MaterialCommunityIcons name='server' size={15} color='#2196F3' />
                <Text style={styles.featureText}>
                  Secure server-side price monitoring
                </Text>
              </View>

              <View style={styles.infoBox}>
                <View style={styles.infoHeader}>
                  <Ionicons name='information-circle' size={13} color='#FFD700' />
                  <Text style={styles.infoTitle}>What's Transmitted</Text>
                </View>
                <View style={styles.dataList}>
                  <View style={styles.dataItem}>
                    <MaterialCommunityIcons
                      name='currency-btc'
                      size={11}
                      color='#4CAF50'
                    />
                    <Text style={styles.dataText}>Coin symbol (BTC, ETH, etc.)</Text>
                  </View>
                  <View style={styles.dataItem}>
                    <MaterialCommunityIcons
                      name='currency-usd'
                      size={11}
                      color='#4CAF50'
                    />
                    <Text style={styles.dataText}>Your target price</Text>
                  </View>
                  <View style={styles.dataItem}>
                    <MaterialCommunityIcons
                      name='swap-vertical'
                      size={11}
                      color='#4CAF50'
                    />
                    <Text style={styles.dataText}>Alert condition (above/below)</Text>
                  </View>
                </View>
                <Text style={styles.privacyNote}>
                  Your portfolio amounts and values{" "}
                  <Text style={styles.highlight}>never leave your device</Text>
                </Text>
              </View>

              <View style={styles.warningCard}>
                <MaterialCommunityIcons name='alert-circle' size={15} color='#FFD700' />
                <Text style={styles.warningText}>
                  Without consent, alerts work only when app is open
                </Text>
              </View>
            </ScrollView>

            {/* Кнопки */}
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
                activeOpacity={0.85}
              >
                <View style={styles.buttonInner}>
                  <Ionicons name='close-circle' size={16} color='#FF6B6B' />
                  <Text style={styles.cancelButtonText}>Local Only</Text>
                  <Text style={styles.buttonSubtext}>Alerts when app open</Text>
                </View>
                <LinearGradient
                  colors={[
                    "rgba(255, 107, 107, 0.2)",
                    "rgba(255, 87, 87, 0.1)",
                    "rgba(255, 107, 107, 0.05)"
                  ]}
                  style={styles.buttonBackground}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.agreeButton}
                onPress={handleAgree}
                activeOpacity={0.85}
              >
                <View style={styles.buttonInner}>
                  <Ionicons name='checkmark-circle' size={16} color='#4CAF50' />
                  <Text style={styles.agreeButtonText}>Enable Background</Text>
                  <Text style={styles.buttonSubtext}>Recommended</Text>
                </View>
                <LinearGradient
                  colors={[
                    "rgba(76, 175, 80, 0.25)",
                    "rgba(56, 142, 60, 0.15)",
                    "rgba(76, 175, 80, 0.05)"
                  ]}
                  style={styles.buttonBackground}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
              </TouchableOpacity>
            </View>

            {/* Футер */}
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.privacyLink}
                onPress={() => {
                  /* Открыть политику конфиденциальности */
                }}
              >
                <Text style={styles.privacyLinkText}>Privacy Policy</Text>
              </TouchableOpacity>
              <Text style={styles.disclaimer}>Change anytime in Settings</Text>
            </View>
          </LinearGradient>
        </Animated.View>
      </Animated.View>
    </Modal>
  )
}

export default AlertConsentModal
