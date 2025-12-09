import { Text, TouchableOpacity, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { styles } from "./EmptyState.styles"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import NotificationService from "../../../../services/NotificationService"

const EmptyState = ({ notificationPermission }) => (
  <View style={styles.emptyState}>
    <LinearGradient
      colors={["rgba(212, 175, 55, 0.1)", "rgba(183, 121, 31, 0.05)"]}
      style={styles.emptyStateGradient}
    >
      <MaterialCommunityIcons
        name='treasure-chest'
        size={60}
        color='rgba(212, 175, 55, 0.3)'
      />
      <Text style={styles.emptyTitle}>Your Watchlist is Empty</Text>
      <Text style={styles.emptySubtitle}>Add coins to start building your portfolio</Text>
      {!notificationPermission && (
        <TouchableOpacity
          onPress={() => NotificationService.requestPermissions()}
          style={styles.notificationPermissionButton}
        >
          <LinearGradient
            colors={["#D4AF37", "#B3791F"]}
            style={styles.notificationPermissionGradient}
          >
            <Ionicons name='notifications-outline' size={16} color='#000' />
            <Text style={styles.notificationPermissionText}>Enable Price Alerts</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </LinearGradient>
  </View>
)

export default EmptyState
