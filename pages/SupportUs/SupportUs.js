// SupportUs.js
import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  Clipboard,
  Alert
} from "react-native"
import { styles } from "./SupportUs-styles"
import { LinearGradient } from "expo-linear-gradient"
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons"

const SupportUs = () => {
  const [walletCopied, setWalletCopied] = useState(false)

  const usdtWallet = "TLwXzzrTvXXD4iVAPeXAT3TwLRBpZswMDt"

  const copyToClipboard = async (text) => {
    try {
      await Clipboard.setString(text)
      setWalletCopied(true)
      Alert.alert("Copied!", "USDT wallet address copied to clipboard", [{ text: "OK" }])
      setTimeout(() => setWalletCopied(false), 3000)
    } catch (error) {
      Alert.alert("Error", "Failed to copy address")
    }
  }

  const handleEmailContact = () => {
    Linking.openURL(
      "mailto:Alex-artcode@yandex.ru?subject=Crypto-Tracker Support Inquiry"
    )
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer} edges={["left", "right"]}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header with title */}
        <LinearGradient colors={["#2A2D3E", "#1A1C29"]} style={styles.headerCard}>
          <View style={styles.headerTop}>
            <MaterialCommunityIcons name='code-braces' size={28} color='#4CAF50' />
            <Text style={styles.headerTitle}>Support Development</Text>
          </View>

          <Text style={styles.headerSubtitle}>
            Voluntary donations to support ongoing development
          </Text>
        </LinearGradient>
        {/* Important Legal Disclaimer - ADD THIS */}
        <View style={styles.disclaimerCard}>
          <MaterialCommunityIcons name='alert-circle' size={24} color='#FF9800' />
          <Text style={styles.disclaimerText}>
            <Text style={styles.bold}>Important:</Text> This is a voluntary donation, not
            a purchase. You are not buying any goods, services, or premium features. All
            donations are final and non-refundable.
          </Text>
        </View>
        {/* Donation Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name='currency-usd' size={20} color='#4CAF50' />
            <Text style={styles.sectionTitle}>Donate with USDT (TRC20)</Text>
          </View>

          <View style={styles.sectionContent}>
            <Text style={styles.infoText}>
              If you wish to support the development of Crypto-Tracker, you can send a
              voluntary donation to the following USDT wallet address:
            </Text>

            {/* Wallet Address Card */}
            <View style={styles.walletCard}>
              <LinearGradient
                colors={["#2A2D3E", "#1E2235"]}
                style={styles.walletGradient}
              >
                <View style={styles.walletHeader}>
                  <FontAwesome5 name='wallet' size={20} color='#4CAF50' />
                  <Text style={styles.walletTitle}>USDT Wallet Address (TRC20)</Text>
                </View>

                <Text style={styles.walletNote}>
                  TRC20 network recommended for lower transaction fees
                </Text>

                <TouchableOpacity
                  style={[
                    styles.walletAddressContainer,
                    walletCopied && styles.walletAddressContainerCopied
                  ]}
                  onPress={() => copyToClipboard(usdtWallet)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.walletAddressText} numberOfLines={1}>
                    {usdtWallet}
                  </Text>
                  <View style={styles.copyButton}>
                    <MaterialCommunityIcons
                      name={walletCopied ? "check-circle" : "content-copy"}
                      size={20}
                      color={walletCopied ? "#4CAF50" : "#FFFFFF"}
                    />
                    <Text style={styles.copyButtonText}>
                      {walletCopied ? "Copied!" : "Copy"}
                    </Text>
                  </View>
                </TouchableOpacity>

                <Text style={styles.walletHint}>Tap to copy address to clipboard</Text>
              </LinearGradient>
            </View>

            <View style={styles.securityNote}>
              <MaterialCommunityIcons name='shield-check' size={16} color='#4CAF50' />
              <Text style={styles.securityText}>
                Always verify the wallet address before sending.
              </Text>
            </View>
          </View>
        </View>
        {/* About Section - REVISED */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name='information' size={20} color='#2196F3' />
            <Text style={styles.sectionTitle}>About Voluntary Donations</Text>
          </View>

          <View style={styles.sectionContent}>
            <Text style={styles.infoText}>
              Crypto-Tracker is developed and maintained by a single independent
              developer.
              <Text style={styles.bold}> Voluntary donations help offset costs</Text>
              such as server hosting, API services, and development tools.
            </Text>

            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <MaterialCommunityIcons name='server' size={16} color='#2196F3' />
                <Text style={styles.featureText}>Server hosting and API costs</Text>
              </View>

              <View style={styles.featureItem}>
                <MaterialCommunityIcons name='tools' size={16} color='#4CAF50' />
                <Text style={styles.featureText}>Development tools and licenses</Text>
              </View>

              <View style={styles.featureItem}>
                <MaterialCommunityIcons name='security' size={16} color='#FF9800' />
                <Text style={styles.featureText}>Security and maintenance</Text>
              </View>
            </View>

            <View style={styles.noteBox}>
              <MaterialCommunityIcons name='check-circle' size={20} color='#4CAF50' />
              <Text style={styles.noteText}>
                The app remains completely free and functional regardless of donations.
                Donations are appreciated but not required.
              </Text>
            </View>
          </View>
        </View>
        {/* Footer with Legal Info */}

        <View style={styles.footerCard}>
          <Text style={styles.footerTitle}>Thank You for Your Support!</Text>

          <Text style={styles.footerText}>
            Every contribution, no matter the size, helps ensure Crypto-Tracker continues
            to improve and serve the cryptocurrency community.
          </Text>

          {/* Ваш оригинальный стиль контакта */}
          <View style={styles.contactInfo}>
            <MaterialCommunityIcons name='email' size={20} color='#FFD700' />
            <TouchableOpacity onPress={handleEmailContact}>
              <Text style={styles.contactLink}>Alex-artcode@yandex.ru</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.contactDescription}>
            Contact for donation confirmations, questions, or transparency reports
          </Text>

          {/* Юридическая секция */}
          <View style={styles.legalSection}>
            <Text style={styles.legalTitle}>Legal Information</Text>
            <Text style={styles.legalText}>
              • Donations are voluntary contributions{"\n"}• No goods, services, or
              features are sold{"\n"}• All donations are final and non-refundable{"\n"}•
              Donations do not guarantee any specific updates or features{"\n"}• The
              developer is not a financial institution
            </Text>
          </View>

          <View style={styles.versionInfo}>
            <Text style={styles.versionText}>
              © {new Date().getFullYear()} Alexander Butylev | Crypto-Tracker
            </Text>
            <Text style={styles.disclaimer}>
              This is an independent development project.
            </Text>
          </View>
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default SupportUs
