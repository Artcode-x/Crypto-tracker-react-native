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
    introduction: true,
    dataCollection: false,
    dataUsage: false,
    dataSharing: false,
    userRights: false,
    security: false,
    thirdParties: false,
    childrenPrivacy: false,
    contact: false
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

  const handleEmailContact = () => {
    Linking.openURL(
      "mailto:Alex-artcode@yandex.ru?subject=Crypto-Tracker Privacy Inquiry"
    )
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
              Last Updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
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
              <Text style={styles.overviewValue}>Enhanced Protection</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Введение */}
        <TouchableOpacity
          onPress={() => toggleSection("introduction")}
          style={styles.sectionCard}
        >
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name='information' size={20} color='#FFD700' />
            <Text style={styles.sectionTitle}>Introduction</Text>
            <Ionicons
              name={expandedSections.introduction ? "chevron-up" : "chevron-down"}
              size={20}
              color='#FFD700'
            />
          </View>

          {expandedSections.introduction && (
            <View style={styles.sectionContent}>
              <Text style={styles.infoText}>
                Welcome to <Text style={styles.highlight}>Crypto-Tracker</Text> ("we,"
                "our," or "us"). This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you use our mobile
                application (the "App").
              </Text>

              <Text style={styles.infoText}>
                We respect your privacy and are committed to protecting your personal
                data. Please read this Privacy Policy carefully. By using the App, you
                agree to the collection and use of information in accordance with this
                policy.
              </Text>

              <View style={styles.warningBox}>
                <MaterialCommunityIcons name='alert-circle' size={20} color='#FFD700' />
                <Text style={styles.warningText}>
                  <Text style={styles.bold}>Important:</Text> We do not collect personal
                  identification information (name, email, phone number). All data stays
                  on your device unless explicitly shared by you.
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>

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
            <Text style={styles.sectionTitle}>1. Information We Collect</Text>
            <Ionicons
              name={expandedSections.dataCollection ? "chevron-up" : "chevron-down"}
              size={20}
              color='#FFD700'
            />
          </View>

          {expandedSections.dataCollection && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionSubtitle}>
                A. Portfolio Data (Stored Locally)
              </Text>
              <View style={styles.dataCategory}>
                <View style={styles.categoryHeader}>
                  <MaterialCommunityIcons name='currency-btc' size={16} color='#4CAF50' />
                  <Text style={styles.categoryTitle}>Cryptocurrency Holdings</Text>
                </View>
                <Text style={styles.categoryText}>
                  • Cryptocurrency amounts you manually enter{"\n"}• Asset prices from
                  external APIs (CoinGecko){"\n"}• Portfolio allocation percentages{"\n"}•
                  Historical performance calculations
                </Text>
                <View style={styles.dataNote}>
                  <MaterialCommunityIcons name='cellphone' size={12} color='#2196F3' />
                  <Text style={styles.noteText}>Stored locally using AsyncStorage</Text>
                </View>
              </View>

              <Text style={styles.sectionSubtitle}>
                B. Analytics Data (Generated On-Device)
              </Text>
              <View style={styles.dataCategory}>
                <View style={styles.categoryHeader}>
                  <MaterialCommunityIcons
                    name='chart-timeline'
                    size={16}
                    color='#FF5252'
                  />
                  <Text style={styles.categoryTitle}>Performance Metrics</Text>
                </View>
                <Text style={styles.categoryText}>
                  • Risk analysis calculations{"\n"}• Diversification scores{"\n"}•
                  Volatility measurements{"\n"}• Performance metrics (24h, 7d, 30d, 1y)
                </Text>
              </View>

              <Text style={styles.sectionSubtitle}>C. Alert Data</Text>
              <View style={styles.dataCategory}>
                <View style={styles.categoryHeader}>
                  <MaterialCommunityIcons name='bell' size={16} color='#9C27B0' />
                  <Text style={styles.categoryTitle}>Price Alerts</Text>
                </View>
                <Text style={styles.categoryText}>
                  • Price alert configurations{"\n"}• Alert trigger conditions{"\n"}•
                  Notification preferences{"\n"}• Alert history (triggered alerts)
                </Text>
              </View>

              <Text style={styles.sectionSubtitle}>
                D. Device Information (Automatic)
              </Text>
              <View style={styles.dataCategory}>
                <View style={styles.categoryHeader}>
                  <MaterialCommunityIcons name='devices' size={16} color='#FF9800' />
                  <Text style={styles.categoryTitle}>Technical Data</Text>
                </View>
                <Text style={styles.categoryText}>
                  • Device type and model{"\n"}• Operating system version{"\n"}• App
                  version and settings{"\n"}• Crash reports and performance data
                </Text>
                <View style={styles.dataNote}>
                  <MaterialCommunityIcons name='information' size={12} color='#2196F3' />
                  <Text style={styles.noteText}>
                    Used for app optimization and bug fixes
                  </Text>
                </View>
              </View>

              <Text style={styles.infoText}>
                <Text style={styles.bold}>Note:</Text> We do NOT collect:
                {"\n"}• Personal identification information
                {"\n"}• Financial account details
                {"\n"}• Location data (GPS)
                {"\n"}• Contact lists or address books
                {"\n"}• Biometric data
              </Text>
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
            <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
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
                  <Text style={styles.usageTitle}>Portfolio Management</Text>
                  <Text style={styles.usageText}>
                    Calculate portfolio value, performance metrics, and generate
                    investment insights based on your holdings.
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
                    Analyze volatility, concentration risks, and diversification to help
                    you make informed investment decisions.
                  </Text>
                </View>
              </View>

              <View style={styles.usageItem}>
                <View style={styles.usageIconContainer}>
                  <MaterialCommunityIcons name='bell-ring' size={16} color='#9C27B0' />
                </View>
                <View style={styles.usageContent}>
                  <Text style={styles.usageTitle}>Alert Notifications</Text>
                  <Text style={styles.usageText}>
                    Monitor price conditions and send push notifications when your
                    configured alerts are triggered.
                  </Text>
                </View>
              </View>

              <View style={styles.usageItem}>
                <View style={styles.usageIconContainer}>
                  <MaterialCommunityIcons
                    name='cellphone-cog'
                    size={16}
                    color='#2196F3'
                  />
                </View>
                <View style={styles.usageContent}>
                  <Text style={styles.usageTitle}>App Functionality</Text>
                  <Text style={styles.usageText}>
                    Maintain app performance, fix bugs, and improve user experience
                    through technical optimization.
                  </Text>
                </View>
              </View>

              <View style={styles.usageItem}>
                <View style={styles.usageIconContainer}>
                  <MaterialCommunityIcons name='shield-check' size={16} color='#00BCD4' />
                </View>
                <View style={styles.usageContent}>
                  <Text style={styles.usageTitle}>Security Purposes</Text>
                  <Text style={styles.usageText}>
                    Protect against fraudulent activity and ensure the security of your
                    data and the app's integrity.
                  </Text>
                </View>
              </View>

              <View style={styles.noteBox}>
                <MaterialCommunityIcons name='lightbulb' size={16} color='#FFD700' />
                <Text style={styles.noteText}>
                  <Text style={styles.bold}>Key Point:</Text> All data processing happens
                  locally on your device. No personal data is sent to our servers for
                  processing.
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* Секция: Третьи стороны */}
        <TouchableOpacity
          onPress={() => toggleSection("thirdParties")}
          style={styles.sectionCard}
        >
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name='api' size={20} color='#FFD700' />
            <Text style={styles.sectionTitle}>3. Third-Party Services</Text>
            <Ionicons
              name={expandedSections.thirdParties ? "chevron-up" : "chevron-down"}
              size={20}
              color='#FFD700'
            />
          </View>

          {expandedSections.thirdParties && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionSubtitle}>External APIs We Use</Text>
              <View style={styles.dataCategory}>
                <View style={styles.categoryHeader}>
                  <MaterialCommunityIcons name='web' size={16} color='#4CAF50' />
                  <Text style={styles.categoryTitle}>CoinGecko API</Text>
                </View>
                <Text style={styles.categoryText}>
                  • Source for cryptocurrency prices{"\n"}• Market data and statistics
                  {"\n"}• Historical price data{"\n"}• 10-minute cache to reduce API calls
                </Text>
                <TouchableOpacity
                  style={styles.externalLink}
                  onPress={() =>
                    handleOpenExternalLink("https://www.coingecko.com/en/api")
                  }
                >
                  <MaterialCommunityIcons name='open-in-new' size={14} color='#2196F3' />
                  <Text style={styles.linkText}>CoinGecko API Terms of Service</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.dataCategory}>
                <View style={styles.categoryHeader}>
                  <MaterialCommunityIcons name='chart-bar' size={16} color='#FF9800' />
                  <Text style={styles.categoryTitle}>Binance API</Text>
                </View>
                <Text style={styles.categoryText}>
                  • Source for detailed candlestick chart data{"\n"}• Historical
                  klines/OHLCV data (Open, High, Low, Close, Volume){"\n"}•
                  High-resolution timeframes (1min, 5min, 1h, etc.){"\n"}• Real-time
                  WebSocket connections for live price updates
                </Text>
                <View style={styles.dataNote}>
                  <MaterialCommunityIcons name='information' size={12} color='#2196F3' />
                  <Text style={styles.noteText}>
                    Used exclusively for chart visualization. No personal or portfolio
                    data is transmitted.
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.externalLink}
                  onPress={() =>
                    handleOpenExternalLink("https://developers.binance.com/docs/")
                  }
                >
                  <MaterialCommunityIcons name='open-in-new' size={14} color='#2196F3' />
                  <Text style={styles.linkText}>Binance API Documentation</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.sectionSubtitle}>Data Flow to Third Parties</Text>
              <View style={styles.dataNote}>
                <MaterialCommunityIcons name='information' size={12} color='#2196F3' />
                <Text style={styles.noteText}>
                  When fetching market data, we send ONLY cryptocurrency symbols/IDs to
                  the API. No personal or portfolio data is shared.
                </Text>
              </View>
              <View style={styles.warningBox}>
                <MaterialCommunityIcons name='alert' size={20} color='#FFD700' />
                <View style={styles.warningContent}>
                  <Text style={styles.warningTitle}>Third-Party Privacy Policies</Text>
                  <Text style={styles.warningText}>
                    We encourage you to review the privacy policies of these third-party
                    services. We are not responsible for their data practices.
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
            <Text style={styles.sectionTitle}>4. Data Storage & Security</Text>
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
                  <Text style={styles.metricLabel}>Storage Duration:</Text>
                  <Text style={styles.metricValue}>Device Lifetime</Text>
                </View>
                <Text style={styles.metricDescription}>
                  Data persists on your device until you delete it or uninstall the app
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
                  <Text style={styles.metricValue}>Local Device Only</Text>
                </View>
                <Text style={styles.metricDescription}>
                  All portfolio data is stored locally using AsyncStorage. No cloud
                  storage or external servers are used.
                </Text>
              </View>

              <View style={styles.securityMetric}>
                <View style={styles.metricRow}>
                  <MaterialCommunityIcons name='encryption' size={16} color='#2196F3' />
                  <Text style={styles.metricLabel}>Security Measures:</Text>
                  <Text style={styles.metricValue}>Device-Level Protection</Text>
                </View>
                <Text style={styles.metricDescription}>
                  Uses your device's built-in security features. Data is protected by your
                  device's lock screen and encryption.
                </Text>
              </View>

              <View style={styles.securityMetric}>
                <View style={styles.metricRow}>
                  <MaterialCommunityIcons name='cached' size={16} color='#9C27B0' />
                  <Text style={styles.metricLabel}>API Cache:</Text>
                  <Text style={styles.metricValue}>10 Minutes</Text>
                </View>
                <Text style={styles.metricDescription}>
                  Market data is cached locally to reduce API calls and improve app
                  performance
                </Text>
              </View>

              <View style={styles.warningBox}>
                <MaterialCommunityIcons name='alert' size={20} color='#FF5252' />
                <View style={styles.warningContent}>
                  <Text style={styles.warningTitle}>Important Security Notes</Text>
                  <Text style={styles.warningText}>
                    • Data is NOT backed up to cloud services{"\n"}• Uninstalling the app
                    will PERMANENTLY delete all data{"\n"}• No recovery options for lost
                    data{"\n"}• Use your device's backup features to preserve data{"\n"}•
                    We recommend regular manual exports of your portfolio
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
            <Text style={styles.sectionTitle}>5. Your Data Rights</Text>
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
                  <MaterialCommunityIcons name='eye' size={24} color='#4CAF50' />
                  <Text style={styles.rightTitle}>Right to Access</Text>
                  <Text style={styles.rightText}>
                    View all data stored on your device through app settings
                  </Text>
                </View>

                <View style={styles.rightItem}>
                  <MaterialCommunityIcons name='pencil' size={24} color='#2196F3' />
                  <Text style={styles.rightTitle}>Right to Modify</Text>
                  <Text style={styles.rightText}>
                    Edit or update your portfolio data at any time
                  </Text>
                </View>

                <View style={styles.rightItem}>
                  <MaterialCommunityIcons name='delete' size={24} color='#FF5252' />
                  <Text style={styles.rightTitle}>Right to Delete</Text>
                  <Text style={styles.rightText}>
                    Remove portfolio data or alerts via app settings
                  </Text>
                </View>

                <View style={styles.rightItem}>
                  <MaterialCommunityIcons name='download' size={24} color='#9C27B0' />
                  <Text style={styles.rightTitle}>Right to Export</Text>
                  <Text style={styles.rightText}>
                    Export your portfolio data in JSON format
                  </Text>
                </View>
              </View>

              <Text style={styles.sectionSubtitle}>How to Exercise Your Rights:</Text>

              <View style={styles.stepList}>
                <View style={styles.stepItem}>
                  <Text style={styles.stepNumber}>1</Text>
                  <Text style={styles.stepText}>
                    <Text style={styles.bold}>Access Data:</Text> Go to Settings → View
                    Portfolio Data
                  </Text>
                </View>

                <View style={styles.stepItem}>
                  <Text style={styles.stepNumber}>2</Text>
                  <Text style={styles.stepText}>
                    <Text style={styles.bold}>Modify Data:</Text> Edit amounts directly in
                    your portfolio
                  </Text>
                </View>

                <View style={styles.stepItem}>
                  <Text style={styles.stepNumber}>3</Text>
                  <Text style={styles.stepText}>
                    <Text style={styles.bold}>Delete Data:</Text> Settings → Clear All
                    Data
                  </Text>
                </View>

                <View style={styles.stepItem}>
                  <Text style={styles.stepNumber}>4</Text>
                  <Text style={styles.stepText}>
                    <Text style={styles.bold}>Export Data:</Text> Settings → Export
                    Portfolio
                  </Text>
                </View>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => {
                    // Здесь должна быть реализация экспорта
                    alert("Export feature would be implemented here")
                  }}
                >
                  <MaterialCommunityIcons name='export' size={16} color='#FFFFFF' />
                  <Text style={styles.actionButtonText}>Export My Data</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.clearButton]}
                  onPress={() => {
                    // Здесь должна быть реализация очистки
                    alert("Clear data feature would be implemented here")
                  }}
                >
                  <MaterialCommunityIcons name='delete-sweep' size={16} color='#FFFFFF' />
                  <Text style={styles.actionButtonText}>Clear All Data</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* Секция: Дети */}
        <TouchableOpacity
          onPress={() => toggleSection("childrenPrivacy")}
          style={styles.sectionCard}
        >
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name='baby-face-outline' size={20} color='#FFD700' />
            <Text style={styles.sectionTitle}>6. Children's Privacy</Text>
            <Ionicons
              name={expandedSections.childrenPrivacy ? "chevron-up" : "chevron-down"}
              size={20}
              color='#FFD700'
            />
          </View>

          {expandedSections.childrenPrivacy && (
            <View style={styles.sectionContent}>
              <Text style={styles.infoText}>
                Our App is{" "}
                <Text style={styles.bold}>
                  NOT intended for children under 13 years of age
                </Text>
                . We do not knowingly collect personal information from children under 13.
              </Text>

              <Text style={styles.infoText}>
                If you are a parent or guardian and believe your child has provided us
                with personal information, please contact us immediately at
                <Text style={styles.highlight}> Alex-artcode@yandex.ru</Text> so we can
                take appropriate action.
              </Text>

              <View style={styles.noteBox}>
                <MaterialCommunityIcons name='school' size={16} color='#FFD700' />
                <Text style={styles.noteText}>
                  Parents and guardians should monitor their children's use of financial
                  applications and provide appropriate guidance.
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* Секция: Обновления политики */}
        <TouchableOpacity
          onPress={() => toggleSection("policyUpdates")}
          style={styles.sectionCard}
        >
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name='update' size={20} color='#FFD700' />
            <Text style={styles.sectionTitle}>7. Policy Updates</Text>
            <Ionicons
              name={expandedSections.policyUpdates ? "chevron-up" : "chevron-down"}
              size={20}
              color='#FFD700'
            />
          </View>

          {expandedSections.policyUpdates && (
            <View style={styles.sectionContent}>
              <Text style={styles.infoText}>
                We may update this Privacy Policy from time to time. We will notify you of
                any changes by:
              </Text>

              <View style={styles.updateMethods}>
                <View style={styles.updateMethod}>
                  <MaterialCommunityIcons name='bell' size={16} color='#4CAF50' />
                  <Text style={styles.updateMethodText}>In-app notifications</Text>
                </View>

                <View style={styles.updateMethod}>
                  <MaterialCommunityIcons name='email' size={16} color='#2196F3' />
                  <Text style={styles.updateMethodText}>Email (if provided)</Text>
                </View>

                <View style={styles.updateMethod}>
                  <MaterialCommunityIcons name='web' size={16} color='#9C27B0' />
                  <Text style={styles.updateMethodText}>
                    Updated "Last Updated" date in the app
                  </Text>
                </View>
              </View>

              <Text style={styles.infoText}>
                You are advised to review this Privacy Policy periodically for any
                changes. Changes to this Privacy Policy are effective when they are posted
                in the app.
              </Text>

              <View style={styles.noteBox}>
                <MaterialCommunityIcons name='history' size={16} color='#FFD700' />
                <Text style={styles.noteText}>
                  Previous versions of this policy will be available upon request.
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* Контакты */}
        <View style={styles.footerCard}>
          <Text style={styles.footerTitle}>Contact Information</Text>

          <View style={styles.contactInfo}>
            <MaterialCommunityIcons name='email' size={20} color='#FFD700' />
            <TouchableOpacity onPress={handleEmailContact}>
              <Text style={styles.contactLink}>Alex-artcode@yandex.ru</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.contactDescription}>
            For privacy-related questions, data access requests, or to report a security
            concern, please contact us via email.
          </Text>

          <View style={styles.responseTime}>
            <MaterialCommunityIcons name='clock-fast' size={16} color='#4CAF50' />
            <Text style={styles.responseTimeText}>
              We aim to respond to all inquiries within 48 hours
            </Text>
          </View>

          <View style={styles.versionInfo}>
            <Text style={styles.versionText}>
              App Version: 2.0.0 • Privacy Policy v2.0
            </Text>
            <Text style={styles.disclaimer}>
              This privacy policy applies to all features of the Crypto-Tracker app. By
              using this app, you acknowledge you have read and understood this policy.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.printButton}
            onPress={() => {
              // Здесь можно добавить функцию печати/сохранения
              alert("Print/save feature would be implemented here")
            }}
          >
            <MaterialCommunityIcons name='printer' size={16} color='#FFFFFF' />
            <Text style={styles.printButtonText}>Save/Print This Policy</Text>
          </TouchableOpacity>
        </View>

        {/* Пустой блок для отступа */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default PrivacyPolicy
