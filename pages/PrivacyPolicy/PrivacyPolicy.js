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
    backgroundAlerts: true,
    dataCollection: false,
    dataUsage: false,
    thirdParties: false,
    dataRetention: false,
    userRights: true,
    compliance: true,
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
              <MaterialCommunityIcons name='shield-check' size={16} color='#4CAF50' />
              <Text style={styles.overviewLabel}>Your Data:</Text>
              <Text style={styles.overviewValue}>Stays on Device</Text>
            </View>
            <View style={styles.overviewRow}>
              <MaterialCommunityIcons name='hand-okay' size={16} color='#2196F3' />
              <Text style={styles.overviewLabel}>Consent:</Text>
              <Text style={styles.overviewValue}>Explicit & Optional</Text>
            </View>
            <View style={styles.overviewRow}>
              <MaterialCommunityIcons name='toggle-switch' size={16} color='#FFD700' />
              <Text style={styles.overviewLabel}>Control:</Text>
              <Text style={styles.overviewValue}>Always Yours</Text>
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
                This Privacy Policy describes the policies of{" "}
                <Text style={styles.highlight}>Alexander Butylev</Text> ("Developer"), the
                individual developer of the{" "}
                <Text style={styles.highlight}>Crypto-Tracker </Text>
                mobile application ("App").
              </Text>

              <Text style={styles.infoText}>
                I respect your privacy and am committed to protecting your information.
                This policy explains what data is collected, how it's used, and your
                rights.
              </Text>

              <View style={styles.warningBox}>
                <MaterialCommunityIcons name='alert-circle' size={20} color='#FFD700' />
                <Text style={styles.warningText}>
                  <Text style={styles.bold}>Core Principle:</Text> Your cryptocurrency
                  portfolio amounts and values are stored{" "}
                  <Text style={styles.bold}>only on your device</Text>. The App functions
                  entirely locally unless you explicitly opt-in for background alerts.
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* Background Alerts - NEW COMPREHENSIVE SECTION */}
        <TouchableOpacity
          onPress={() => toggleSection("backgroundAlerts")}
          style={styles.sectionCard}
        >
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name='bell-ring' size={20} color='#FFD700' />
            <Text style={styles.sectionTitle}>Background Price Alerts</Text>
            <Ionicons
              name={expandedSections.backgroundAlerts ? "chevron-up" : "chevron-down"}
              size={20}
              color='#FFD700'
            />
          </View>

          {expandedSections.backgroundAlerts && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionSubtitle}>Two Alert Modes</Text>

              <View style={styles.comparisonTable}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>Feature</Text>
                  <Text style={styles.tableHeader}>Local Alerts (Default)</Text>
                  <Text style={styles.tableHeader}>Background Alerts (Opt-in)</Text>
                </View>

                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>When alerts work</Text>
                  <Text style={styles.tableCellYes}>Only when app is open/active</Text>
                  <Text style={styles.tableCellYes}>24/7, even when app is closed</Text>
                </View>

                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Data sent to server</Text>
                  <Text style={styles.tableCellNo}>None - completely private</Text>
                  <Text style={styles.tableCellYes}>Minimal alert config only</Text>
                </View>

                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Requires consent</Text>
                  <Text style={styles.tableCellNo}>No consent needed</Text>
                  <Text style={styles.tableCellYes}>Explicit user consent required</Text>
                </View>

                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>User control</Text>
                  <Text style={styles.tableCellYes}>Always available</Text>
                  <Text style={styles.tableCellYes}>Enable/disable anytime</Text>
                </View>
              </View>

              <Text style={styles.sectionSubtitle}>Consent Process</Text>
              <View style={styles.dataCategory}>
                <View style={styles.categoryHeader}>
                  <MaterialCommunityIcons name='hand-okay' size={16} color='#4CAF50' />
                  <Text style={styles.categoryTitle}>Step-by-Step Consent</Text>
                </View>
                <Text style={styles.categoryText}>
                  1. <Text style={styles.bold}>Initial Disclosure:</Text> Clear in-app
                  modal explains background alerts before any data transmission.
                  {"\n"}
                  2. <Text style={styles.bold}>Explicit Action Required:</Text> You must
                  tap "Agree" or "Enable" - no pre-checked boxes.
                  {"\n"}
                  3. <Text style={styles.bold}>Persistent Control:</Text> Toggle button on
                  Alerts page allows you to enable/disable anytime.
                  {"\n"}
                  4. <Text style={styles.bold}>Revocation:</Text> Disabling removes all
                  your data from our servers immediately.
                </Text>
                <View style={styles.dataNote}>
                  <MaterialCommunityIcons name='shield-check' size={12} color='#4CAF50' />
                  <Text style={styles.noteText}>
                    This consent process complies with Google Play's "Prominent
                    Disclosure" requirements.
                  </Text>
                </View>
              </View>

              <Text style={styles.sectionSubtitle}>
                What Data is Transmitted (If Enabled)
              </Text>
              <View style={styles.dataCategory}>
                <View style={styles.categoryHeader}>
                  <MaterialCommunityIcons
                    name='database-export'
                    size={16}
                    color='#2196F3'
                  />
                  <Text style={styles.categoryTitle}>Minimal Alert Configuration</Text>
                </View>
                <Text style={styles.categoryText}>
                  • <Text style={styles.bold}>Coin Identifier:</Text> Public symbol like
                  "bitcoin", "ethereum"
                  {"\n"}• <Text style={styles.bold}>Target Price:</Text> Your specified
                  alert threshold
                  {"\n"}• <Text style={styles.bold}>Condition:</Text> "above" or "below"
                  the target price
                  {"\n"}• <Text style={styles.bold}>Device Token:</Text> Anonymous
                  Firebase Cloud Messaging token
                  {"\n"}• <Text style={styles.bold}>Alert ID:</Text> Random identifier for
                  your alert
                </Text>
                <View style={styles.dataNote}>
                  <MaterialCommunityIcons name='alert' size={12} color='#FF9800' />
                  <Text style={styles.noteText}>
                    <Text style={styles.bold}>NOT transmitted:</Text> Your portfolio
                    amounts, transaction history, personal information, or wallet
                    addresses.
                  </Text>
                </View>
              </View>

              <View style={styles.warningBox}>
                <MaterialCommunityIcons name='shield-off' size={20} color='#4CAF50' />
                <Text style={styles.warningText}>
                  <Text style={styles.bold}>Local-Only Mode (Default):</Text> If you
                  decline background alerts, the app works completely offline. Price
                  alerts only trigger when the app is actively running on your device. No
                  data leaves your device.
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* Data Collection */}
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
            <Text style={styles.sectionTitle}>1. Information Collection</Text>
            <Ionicons
              name={expandedSections.dataCollection ? "chevron-up" : "chevron-down"}
              size={20}
              color='#FFD700'
            />
          </View>

          {expandedSections.dataCollection && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionSubtitle}>A. Data Stored Locally (Always)</Text>
              <View style={styles.dataCategory}>
                <View style={styles.categoryHeader}>
                  <MaterialCommunityIcons name='cellphone' size={16} color='#4CAF50' />
                  <Text style={styles.categoryTitle}>On Your Device Only</Text>
                </View>
                <Text style={styles.categoryText}>
                  • Cryptocurrency amounts you enter
                  {"\n"}• Calculated portfolio value and performance
                  {"\n"}• Price alerts configuration (local mode)
                  {"\n"}• App settings and preferences
                  {"\n"}• Favorite coins list
                </Text>
                <View style={styles.dataNote}>
                  <MaterialCommunityIcons name='lock' size={12} color='#2196F3' />
                  <Text style={styles.noteText}>
                    This data never leaves your device unless you explicitly enable
                    background alerts.
                  </Text>
                </View>
              </View>

              <Text style={styles.sectionSubtitle}>
                B. Data Processed by Server (Opt-in Only)
              </Text>
              <View style={styles.dataCategory}>
                <View style={styles.categoryHeader}>
                  <MaterialCommunityIcons name='server' size={16} color='#9C27B0' />
                  <Text style={styles.categoryTitle}>Only With Your Consent</Text>
                </View>
                <Text style={styles.categoryText}>
                  This data is ONLY transmitted if you explicitly enable background
                  alerts:
                  {"\n"}• Alert configuration (coin, target price, condition)
                  {"\n"}• Anonymous device token for notifications
                  {"\n"}• Alert status and timestamps
                </Text>
              </View>

              <View style={styles.dataCategory}>
                <View style={styles.categoryHeader}>
                  <MaterialCommunityIcons name='close-box' size={16} color='#F44336' />
                  <Text style={styles.categoryTitle}>I Do NOT Collect</Text>
                </View>
                <Text style={styles.categoryText}>
                  • Your name, email, or personal identification
                  {"\n"}• Exact geographic location
                  {"\n"}• Private keys, seed phrases, or wallet addresses
                  {"\n"}• Banking or payment information
                  {"\n"}• Contacts, photos, or other device data
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* Data Usage */}
        <TouchableOpacity
          onPress={() => toggleSection("dataUsage")}
          style={styles.sectionCard}
        >
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name='chart-box' size={20} color='#FFD700' />
            <Text style={styles.sectionTitle}>2. How I Use Your Information</Text>
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
                  <Text style={styles.usageTitle}>Core App Functions</Text>
                  <Text style={styles.usageText}>
                    To calculate and display your portfolio, show market data, and manage
                    your watchlists using data stored locally on your device.
                  </Text>
                </View>
              </View>

              <View style={styles.usageItem}>
                <View style={styles.usageIconContainer}>
                  <MaterialCommunityIcons name='bell-alert' size={16} color='#9C27B0' />
                </View>
                <View style={styles.usageContent}>
                  <Text style={styles.usageTitle}>Local Price Alerts</Text>
                  <Text style={styles.usageText}>
                    To monitor prices and trigger alerts when the app is actively running
                    on your device.
                  </Text>
                </View>
              </View>

              <View style={styles.usageItem}>
                <View style={styles.usageIconContainer}>
                  <MaterialCommunityIcons name='server' size={16} color='#2196F3' />
                </View>
                <View style={styles.usageContent}>
                  <Text style={styles.usageTitle}>Background Alerts (Opt-in)</Text>
                  <Text style={styles.usageText}>
                    Only if you enable: To monitor cryptocurrency prices 24/7 on our
                    server and send you push notifications when your conditions are met.
                  </Text>
                </View>
              </View>

              <View style={styles.noteBox}>
                <MaterialCommunityIcons name='scale-balance' size={16} color='#FFD700' />
                <Text style={styles.noteText}>
                  <Text style={styles.bold}>Legal Basis:</Text> Local processing is
                  necessary for app functionality. Server processing for background alerts
                  is based solely on your{" "}
                  <Text style={styles.bold}>explicit consent</Text>.
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* Third Parties */}
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
              <Text style={styles.sectionSubtitle}>Data Sources</Text>
              <View style={styles.dataCategory}>
                <View style={styles.categoryHeader}>
                  <MaterialCommunityIcons name='chart-line' size={16} color='#4CAF50' />
                  <Text style={styles.categoryTitle}>Market Data APIs</Text>
                </View>
                <Text style={styles.categoryText}>
                  • <Text style={styles.bold}>CoinGecko/Binance:</Text> For cryptocurrency
                  prices
                  {"\n"}• <Text style={styles.bold}>Data Sent:</Text> Only public coin
                  symbols
                  {"\n"}• <Text style={styles.bold}>No user data:</Text> Your information
                  is never sent
                </Text>
              </View>

              <Text style={styles.sectionSubtitle}>
                Infrastructure (Background Alerts Only)
              </Text>
              <View style={styles.dataCategory}>
                <View style={styles.categoryHeader}>
                  <MaterialCommunityIcons name='server' size={16} color='#2196F3' />
                  <Text style={styles.categoryTitle}>Backend Server</Text>
                </View>
                <Text style={styles.categoryText}>
                  • <Text style={styles.bold}>Purpose:</Text> Processes background alerts
                  {"\n"}• <Text style={styles.bold}>Only used if:</Text> You enable
                  background alerts
                  {"\n"}• <Text style={styles.bold}>Data:</Text> Encrypted alert
                  configurations
                </Text>
              </View>

              <View style={styles.dataCategory}>
                <View style={styles.categoryHeader}>
                  <MaterialCommunityIcons name='firebase' size={16} color='#FF9800' />
                  <Text style={styles.categoryTitle}>Firebase Cloud Messaging</Text>
                </View>
                <Text style={styles.categoryText}>
                  • <Text style={styles.bold}>Purpose:</Text> Delivers push notifications
                  {"\n"}• <Text style={styles.bold}>Data Shared:</Text> Device token and
                  notification content
                  {"\n"}• <Text style={styles.bold}>Link:</Text>{" "}
                  <Text
                    style={styles.linkText}
                    onPress={() =>
                      handleOpenExternalLink(
                        "https://firebase.google.com/support/privacy"
                      )
                    }
                  >
                    Firebase Privacy Policy
                  </Text>
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* Data Retention */}
        <TouchableOpacity
          onPress={() => toggleSection("dataRetention")}
          style={styles.sectionCard}
        >
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name='database-clock' size={20} color='#FFD700' />
            <Text style={styles.sectionTitle}>4. Data Retention</Text>
            <Ionicons
              name={expandedSections.dataRetention ? "chevron-up" : "chevron-down"}
              size={20}
              color='#FFD700'
            />
          </View>

          {expandedSections.dataRetention && (
            <View style={styles.sectionContent}>
              <View style={styles.retentionItem}>
                <MaterialCommunityIcons name='cellphone' size={16} color='#4CAF50' />
                <View style={styles.retentionContent}>
                  <Text style={styles.retentionTitle}>Local Device Data</Text>
                  <Text style={styles.retentionText}>
                    • <Text style={styles.bold}>Retention:</Text> Until you delete it or
                    uninstall the app
                    {"\n"}• <Text style={styles.bold}>Storage:</Text> Your device's local
                    storage
                    {"\n"}• <Text style={styles.bold}>Backup:</Text> Not automatically
                    backed up by us
                  </Text>
                </View>
              </View>

              <View style={styles.retentionItem}>
                <MaterialCommunityIcons name='server' size={16} color='#2196F3' />
                <View style={styles.retentionContent}>
                  <Text style={styles.retentionTitle}>Server Data (If Enabled)</Text>
                  <Text style={styles.retentionText}>
                    • <Text style={styles.bold}>Active Alerts:</Text> Stored while
                    enabled, deleted immediately when disabled
                    {"\n"}• <Text style={styles.bold}>Triggered Alerts:</Text> History
                    kept for 24 hours, then deleted
                    {"\n"}• <Text style={styles.bold}>Inactive Devices:</Text> Data
                    removed after 30 days of inactivity
                    {"\n"}• <Text style={styles.bold}>When you disable:</Text> All your
                    data is immediately deleted
                  </Text>
                </View>
              </View>

              <View style={styles.securityBox}>
                <MaterialCommunityIcons
                  name='server-security'
                  size={20}
                  color='#FFD700'
                />
                <Text style={styles.securityText}>
                  <Text style={styles.bold}>Security Measures:</Text> All communications
                  use HTTPS/TLS encryption. Server data is encrypted at rest. Regular
                  security updates are applied.
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* User Rights */}
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
                  <Text style={styles.rightTitle}>Access & View</Text>
                  <Text style={styles.rightText}>View all your data in app settings</Text>
                </View>

                <View style={styles.rightItem}>
                  <MaterialCommunityIcons
                    name='toggle-switch'
                    size={24}
                    color='#2196F3'
                  />
                  <Text style={styles.rightTitle}>Control Alerts</Text>
                  <Text style={styles.rightText}>
                    Enable/disable background alerts anytime
                  </Text>
                </View>

                <View style={styles.rightItem}>
                  <MaterialCommunityIcons name='delete' size={24} color='#FF5252' />
                  <Text style={styles.rightTitle}>Delete</Text>
                  <Text style={styles.rightText}>Delete portfolio data or alerts</Text>
                </View>

                <View style={styles.rightItem}>
                  <MaterialCommunityIcons name='chart-box' size={24} color='#9C27B0' />
                  <Text style={styles.rightTitle}>Portfolio Analytics</Text>
                  <Text style={styles.rightText}>
                    View detailed portfolio analytics with performance metrics
                  </Text>
                </View>
              </View>

              <Text style={styles.sectionSubtitle}>How to Exercise Your Rights</Text>
              <View style={styles.stepList}>
                <View style={styles.stepItem}>
                  <Text style={styles.stepNumber}>1</Text>
                  <Text style={styles.stepText}>
                    <Text style={styles.bold}>For background alerts:</Text> Use the toggle
                    button at the top of the page on Price Alerts
                  </Text>
                </View>

                <View style={styles.stepItem}>
                  <Text style={styles.stepNumber}>2</Text>
                  <Text style={styles.stepText}>
                    <Text style={styles.bold}>To delete server data:</Text> Disable
                    background alerts
                  </Text>
                </View>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* Compliance */}
        <TouchableOpacity
          onPress={() => toggleSection("compliance")}
          style={styles.sectionCard}
        >
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name='gavel' size={20} color='#FFD700' />
            <Text style={styles.sectionTitle}>6. Compliance & Standards</Text>
            <Ionicons
              name={expandedSections.compliance ? "chevron-up" : "chevron-down"}
              size={20}
              color='#FFD700'
            />
          </View>

          {expandedSections.compliance && (
            <View style={styles.sectionContent}>
              <View style={styles.complianceItem}>
                <MaterialCommunityIcons name='google' size={16} color='#4285F4' />
                <View style={styles.complianceContent}>
                  <Text style={styles.complianceTitle}>Google Play Requirements</Text>
                  <Text style={styles.complianceText}>
                    • Prominent disclosure before data collection
                    {"\n"}• Explicit opt-in consent for background features
                    {"\n"}• Clear privacy policy with developer contact
                    {"\n"}• User control over data sharing
                  </Text>
                </View>
              </View>

              <View style={styles.complianceItem}>
                <MaterialCommunityIcons name='earth' size={16} color='#4CAF50' />
                <View style={styles.complianceContent}>
                  <Text style={styles.complianceTitle}>GDPR Compliance (EEA Users)</Text>
                  <Text style={styles.complianceText}>
                    • Lawful basis: Explicit consent (Article 6(1)(a))
                    {"\n"}• Right to access, rectify, delete (Articles 15-17)
                    {"\n"}• Right to data portability (Article 20)
                    {"\n"}• Right to object to processing (Article 21)
                  </Text>
                </View>
              </View>

              <View style={styles.complianceItem}>
                <MaterialCommunityIcons name='shield-star' size={16} color='#FF9800' />
                <View style={styles.complianceContent}>
                  <Text style={styles.complianceTitle}>Security Standards</Text>
                  <Text style={styles.complianceText}>
                    • TLS 1.2+ encryption for all communications
                    {"\n"}• Data encryption at rest (AES-256)
                    {"\n"}• Regular security updates and audits
                    {"\n"}• Minimal data collection principle
                  </Text>
                </View>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* Children's Privacy */}
        <TouchableOpacity
          onPress={() => toggleSection("childrenPrivacy")}
          style={styles.sectionCard}
        >
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name='baby-face-outline' size={20} color='#FFD700' />
            <Text style={styles.sectionTitle}>7. Children's Privacy</Text>
            <Ionicons
              name={expandedSections.childrenPrivacy ? "chevron-up" : "chevron-down"}
              size={20}
              color='#FFD700'
            />
          </View>

          {expandedSections.childrenPrivacy && (
            <View style={styles.sectionContent}>
              <Text style={styles.infoText}>
                The App is{" "}
                <Text style={styles.bold}>NOT intended for children under 13</Text>. I do
                not knowingly collect personal information from children under 13.
              </Text>
              <Text style={styles.infoText}>
                If you believe a child has provided information, please contact me
                immediately for data deletion.
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Contact Information */}
        <View style={styles.footerCard}>
          <Text style={styles.footerTitle}>Contact Information</Text>

          <View style={styles.contactInfo}>
            <MaterialCommunityIcons name='account' size={20} color='#FFD700' />
            <Text style={styles.contactText}>Developer: Alexander Butylev</Text>
          </View>

          <View style={styles.contactInfo}>
            <MaterialCommunityIcons name='email' size={20} color='#FFD700' />
            <TouchableOpacity onPress={handleEmailContact}>
              <Text style={styles.contactLink}>Alex-artcode@yandex.ru</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.contactDescription}>
            Use this email for: advertising offers, privacy questions, data requests,
            security concerns, or to report potential issues.
          </Text>

          <View style={styles.responseTime}>
            <MaterialCommunityIcons name='clock-fast' size={16} color='#4CAF50' />
            <Text style={styles.responseTimeText}>
              I aim to respond to privacy inquiries within 48 hours.
            </Text>
          </View>

          <View style={styles.versionInfo}>
            <Text style={styles.versionText}>
              © {new Date().getFullYear()} Alexander Butylev | App Version: 1.0.0 |
              Privacy Policy v1.0
            </Text>
            <Text style={styles.disclaimer}>
              This policy applies to the Crypto-Tracker app and associated background
              alert services.
            </Text>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default PrivacyPolicy
