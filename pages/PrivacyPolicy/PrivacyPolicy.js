import React from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  SafeAreaView
} from "react-native"
import { useSelector } from "react-redux"
import { styles } from "./PrivacyPolicy.styles"
import { LinearGradient } from "expo-linear-gradient"
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"
import { userAssetsSelector } from "../../store/toolkitSelectors"

const PrivacyPolicy = () => {
  const userAssets = useSelector(userAssetsSelector)
  const assetsCount = Object.keys(userAssets || {}).filter(
    (key) => userAssets[key] > 0
  ).length

  const [expandedSections, setExpandedSections] = React.useState({
    dataCollection: true,
    dataUsage: false,
    dataSharing: false,
    userRights: false,
    security: false
  })

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleOpenExternalLink = async (url) => {
    try {
      await Linking.openURL(url)
    } catch (error) {
      console.error("Error opening URL:", error)
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer} edges={["left", "right"]}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Шапка с заголовком */}
        <LinearGradient
          colors={["rgba(26, 26, 26, 0.95)", "rgba(40, 40, 40, 0.9)"]}
          style={styles.headerCard}
        >
          <View style={styles.headerTop}>
            <MaterialCommunityIcons name='shield-lock' size={24} color='#FFD700' />
            <Text style={styles.headerTitle}>Privacy Policy</Text>
          </View>

          <View style={styles.lastUpdated}>
            <MaterialCommunityIcons
              name='calendar-clock'
              size={12}
              color='rgba(255, 255, 255, 0.6)'
            />
            <Text style={styles.lastUpdatedText}>
              Last Updated: {new Date().toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.overviewCard}>
            <View style={styles.overviewRow}>
              <MaterialCommunityIcons name='database' size={16} color='#4CAF50' />
              <Text style={styles.overviewLabel}>Your Portfolio Status:</Text>
              <Text style={styles.overviewValue}>
                {assetsCount} active asset{assetsCount !== 1 ? "s" : ""}
              </Text>
            </View>
            <View style={styles.overviewRow}>
              <MaterialCommunityIcons name='chart-bar' size={16} color='#2196F3' />
              <Text style={styles.overviewLabel}>Data Retention:</Text>
              <Text style={styles.overviewValue}>Local storage only</Text>
            </View>
            <View style={styles.overviewRow}>
              <MaterialCommunityIcons name='security' size={16} color='#FFD700' />
              <Text style={styles.overviewLabel}>Privacy Level:</Text>
              <Text style={styles.overviewValue}>Enhanced</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Введение */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Welcome to CryptoPortfolio Analytics</Text>
          <Text style={styles.infoText}>
            This Privacy Policy explains how we collect, use, and protect your information
            when you use our Analytics features. Your privacy is our top priority.
          </Text>
          <View style={styles.warningBox}>
            <MaterialCommunityIcons name='alert-circle' size={20} color='#FFD700' />
            <Text style={styles.warningText}>
              Note: We never collect personal identification information. All data stays
              on your device.
            </Text>
          </View>
        </View>

        {/* Секция: Сбор данных */}
        <TouchableOpacity
          onPress={() => toggleSection("dataCollection")}
          style={styles.sectionCard}
        >
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons
              name='database-arrow-down'
              size={20}
              color='#FFD700'
            />
            <Text style={styles.sectionTitle}>Data We Collect</Text>
            <Ionicons
              name={expandedSections.dataCollection ? "chevron-up" : "chevron-down"}
              size={20}
              color='#FFD700'
            />
          </View>

          {expandedSections.dataCollection && (
            <View style={styles.sectionContent}>
              <View style={styles.dataCategory}>
                <View style={styles.categoryHeader}>
                  <MaterialCommunityIcons name='currency-btc' size={16} color='#4CAF50' />
                  <Text style={styles.categoryTitle}>Portfolio Data</Text>
                </View>
                <Text style={styles.categoryText}>
                  • Cryptocurrency holdings (amounts){"\n"}• Asset prices from CoinGecko
                  API
                  {"\n"}• Historical performance calculations{"\n"}• Portfolio allocation
                  percentages
                </Text>
                <View style={styles.dataNote}>
                  <MaterialCommunityIcons name='information' size={12} color='#2196F3' />
                  <Text style={styles.noteText}>Stored locally on your device</Text>
                </View>
              </View>

              <View style={styles.dataCategory}>
                <View style={styles.categoryHeader}>
                  <MaterialCommunityIcons
                    name='chart-timeline'
                    size={16}
                    color='#FF5252'
                  />
                  <Text style={styles.categoryTitle}>Analytics Data</Text>
                </View>
                <Text style={styles.categoryText}>
                  • Performance metrics (24h, 7d, 30d, 1y){"\n"}• Risk analysis
                  calculations
                  {"\n"}• Diversification scores{"\n"}• Volatility measurements
                </Text>
              </View>

              <View style={styles.dataCategory}>
                <View style={styles.categoryHeader}>
                  <MaterialCommunityIcons name='api' size={16} color='#9C27B0' />
                  <Text style={styles.categoryTitle}>External Data</Text>
                </View>
                <Text style={styles.categoryText}>
                  • CoinGecko API for real-time prices{"\n"}• Historical data (with 10-min
                  cache){"\n"}• Market cap and volume data{"\n"}• Simulated data when API
                  fails
                </Text>
                <TouchableOpacity
                  style={styles.externalLink}
                  onPress={() =>
                    handleOpenExternalLink("https://www.coingecko.com/en/api")
                  }
                >
                  <MaterialCommunityIcons name='open-in-new' size={14} color='#2196F3' />
                  <Text style={styles.linkText}>CoinGecko API Terms</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* Секция: Использование данных */}
        <TouchableOpacity
          onPress={() => toggleSection("dataUsage")}
          style={styles.sectionCard}
        >
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name='chart-box' size={20} color='#FFD700' />
            <Text style={styles.sectionTitle}>How We Use Your Data</Text>
            <Ionicons
              name={expandedSections.dataUsage ? "chevron-up" : "chevron-down"}
              size={20}
              color='#FFD700'
            />
          </View>

          {expandedSections.dataUsage && (
            <View style={styles.sectionContent}>
              <View style={styles.usageItem}>
                <View style={styles.usageIconContainer}>
                  <MaterialCommunityIcons name='calculator' size={16} color='#4CAF50' />
                </View>
                <View style={styles.usageContent}>
                  <Text style={styles.usageTitle}>Portfolio Analytics</Text>
                  <Text style={styles.usageText}>
                    Calculate performance metrics, generate insights, and provide
                    investment recommendations based on your holdings.
                  </Text>
                </View>
              </View>

              <View style={styles.usageItem}>
                <View style={styles.usageIconContainer}>
                  <MaterialCommunityIcons
                    name='chart-bell-curve'
                    size={16}
                    color='#FF5252'
                  />
                </View>
                <View style={styles.usageContent}>
                  <Text style={styles.usageTitle}>Risk Assessment</Text>
                  <Text style={styles.usageText}>
                    Analyze volatility, concentration risks, and diversification scores to
                    help you make informed decisions.
                  </Text>
                </View>
              </View>

              <View style={styles.usageItem}>
                <View style={styles.usageIconContainer}>
                  <MaterialCommunityIcons name='robot' size={16} color='#9C27B0' />
                </View>
                <View style={styles.usageContent}>
                  <Text style={styles.usageTitle}>Data Simulation</Text>
                  <Text style={styles.usageText}>
                    When API data is unavailable, we use simulated calculations based on
                    available 24h data. These are clearly marked as "simulated".
                  </Text>
                </View>
              </View>

              <View style={styles.usageItem}>
                <View style={styles.usageIconContainer}>
                  <MaterialCommunityIcons name='cellphone' size={16} color='#2196F3' />
                </View>
                <View style={styles.usageContent}>
                  <Text style={styles.usageTitle}>Local Processing</Text>
                  <Text style={styles.usageText}>
                    All calculations happen on your device. No data is sent to external
                    servers for processing.
                  </Text>
                </View>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* Секция: Хранение и безопасность */}
        <TouchableOpacity
          onPress={() => toggleSection("security")}
          style={styles.sectionCard}
        >
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name='shield-check' size={20} color='#FFD700' />
            <Text style={styles.sectionTitle}>Data Storage & Security</Text>
            <Ionicons
              name={expandedSections.security ? "chevron-up" : "chevron-down"}
              size={20}
              color='#FFD700'
            />
          </View>

          {expandedSections.security && (
            <View style={styles.sectionContent}>
              <View style={styles.securityMetric}>
                <View style={styles.metricRow}>
                  <MaterialCommunityIcons
                    name='clock-outline'
                    size={16}
                    color='#FFD700'
                  />
                  <Text style={styles.metricLabel}>Cache Duration:</Text>
                  <Text style={styles.metricValue}>10 minutes</Text>
                </View>
                <Text style={styles.metricDescription}>
                  Historical data is cached locally to reduce API calls and improve
                  performance
                </Text>
              </View>

              <View style={styles.securityMetric}>
                <View style={styles.metricRow}>
                  <MaterialCommunityIcons
                    name='cellphone-link'
                    size={16}
                    color='#4CAF50'
                  />
                  <Text style={styles.metricLabel}>Storage Location:</Text>
                  <Text style={styles.metricValue}>Device Only</Text>
                </View>
                <Text style={styles.metricDescription}>
                  All portfolio data is stored locally using AsyncStorage. No cloud
                  storage is used.
                </Text>
              </View>

              <View style={styles.securityMetric}>
                <View style={styles.metricRow}>
                  <MaterialCommunityIcons name='encryption' size={16} color='#2196F3' />
                  <Text style={styles.metricLabel}>Encryption:</Text>
                  <Text style={styles.metricValue}>Device-Level</Text>
                </View>
                <Text style={styles.metricDescription}>
                  Uses your device's built-in security. No additional encryption keys are
                  managed by the app.
                </Text>
              </View>

              <View style={styles.warningBox}>
                <MaterialCommunityIcons name='alert' size={20} color='#FF5252' />
                <View style={styles.warningContent}>
                  <Text style={styles.warningTitle}>Important Security Note</Text>
                  <Text style={styles.warningText}>
                    • Data is not backed up to cloud{"\n"}• Uninstalling the app will
                    delete all data{"\n"}• No recovery options for lost data{"\n"}• Use
                    device backup features for preservation
                  </Text>
                </View>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* Секция: Права пользователя */}
        <TouchableOpacity
          onPress={() => toggleSection("userRights")}
          style={styles.sectionCard}
        >
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name='account-cog' size={20} color='#FFD700' />
            <Text style={styles.sectionTitle}>Your Rights</Text>
            <Ionicons
              name={expandedSections.userRights ? "chevron-up" : "chevron-down"}
              size={20}
              color='#FFD700'
            />
          </View>

          {expandedSections.userRights && (
            <View style={styles.sectionContent}>
              <View style={styles.rightsGrid}>
                <View style={styles.rightItem}>
                  <MaterialCommunityIcons name='delete' size={24} color='#FF5252' />
                  <Text style={styles.rightTitle}>Data Deletion</Text>
                  <Text style={styles.rightText}>
                    Remove portfolio data anytime via app settings
                  </Text>
                </View>

                <View style={styles.rightItem}>
                  <MaterialCommunityIcons name='eye' size={24} color='#4CAF50' />
                  <Text style={styles.rightTitle}>Transparency</Text>
                  <Text style={styles.rightText}>
                    See exactly what data is stored on your device
                  </Text>
                </View>

                <View style={styles.rightItem}>
                  <MaterialCommunityIcons name='download' size={24} color='#2196F3' />
                  <Text style={styles.rightTitle}>Export</Text>
                  <Text style={styles.rightText}>
                    Export your portfolio data in JSON format
                  </Text>
                </View>

                <View style={styles.rightItem}>
                  <MaterialCommunityIcons name='cog' size={24} color='#FFD700' />
                  <Text style={styles.rightTitle}>Control</Text>
                  <Text style={styles.rightText}>
                    Disable analytics features completely
                  </Text>
                </View>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButton}>
                  <MaterialCommunityIcons name='export' size={16} color='#FFFFFF' />
                  <Text style={styles.actionButtonText}>Export My Data</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionButton, styles.clearButton]}>
                  <MaterialCommunityIcons name='delete-sweep' size={16} color='#FFFFFF' />
                  <Text style={styles.actionButtonText}>Clear All Data</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* Контакты и обновления */}
        <View style={styles.footerCard}>
          <Text style={styles.footerTitle}>Contact & Updates</Text>

          <View style={styles.contactInfo}>
            <MaterialCommunityIcons name='email' size={16} color='#FFD700' />
            <Text style={styles.contactText}>
              Questions? Contact: Alex-artcode@yandex.ru
            </Text>
          </View>

          <View style={styles.contactInfo}>
            <MaterialCommunityIcons name='update' size={16} color='#4CAF50' />
            <Text style={styles.contactText}>
              Policy updates will be shown in-app with clear notifications
            </Text>
          </View>

          <View style={styles.versionInfo}>
            <Text style={styles.versionText}>
              App Version: 1.0.0 • Privacy Policy v1.0
            </Text>
            <Text style={styles.disclaimer}>
              This privacy policy applies only to the Analytics features of the app.
              General app privacy is covered in our main Privacy Policy.
            </Text>
          </View>
        </View>

        {/* Пустой блок для отступа от таб-бара (60px + доп отступ) */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default PrivacyPolicy
