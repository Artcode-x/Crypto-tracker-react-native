import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Text, View } from "react-native"
import { styles } from "./RecommendSection.styles"

const RecommendSection = ({ portfolioMetrics, timeframe }) => {
  return (
    <View style={styles.recommendationCard}>
      <View style={styles.recommendationHeader}>
        <MaterialCommunityIcons name='lightbulb' size={20} color='#FFD700' />
        <Text style={styles.recommendationTitle}>Insights & Tips</Text>
      </View>
      <View style={styles.recommendationContent}>
        {/* Если мало активов */}
        {portfolioMetrics.totalAssets <= 2 && (
          <View style={styles.tipItem}>
            <MaterialCommunityIcons name='plus-circle' size={16} color='#4CAF50' />
            <Text style={styles.tipText}>
              Consider adding more assets to improve diversification
            </Text>
          </View>
        )}
        {/* Если много в одном (concentration > 40) */}
        {portfolioMetrics.allocationAnalysis.concentration > 40 && (
          <View style={styles.tipItem}>
            <MaterialCommunityIcons name='scale-balance' size={16} color='#FF5252' />
            <Text style={styles.tipText}>
              High concentration in top asset. Consider rebalancing
            </Text>
          </View>
        )}
        {/* Если рынок падает (portfolioChange < -3)  */}
        {portfolioMetrics.portfolioChange < -3 && (
          <View style={styles.tipItem}>
            <MaterialCommunityIcons name='alert' size={16} color='#FFD700' />
            <Text style={styles.tipText}>
              Market is down. Could be a buying opportunity for strong assets
            </Text>
          </View>
        )}
        {timeframe !== "24h" && !portfolioMetrics.allDataLoaded && (
          <View style={styles.tipItem}>
            <MaterialCommunityIcons name='clock-outline' size={16} color='#2196F3' />
            <Text style={styles.tipText}>
              Historical data is still loading. Check back in a moment.
            </Text>
          </View>
        )}
        {portfolioMetrics.hasSimulatedData && (
          <View style={styles.tipItem}>
            <MaterialCommunityIcons name='robot' size={16} color='#9C27B0' />
            <Text style={styles.tipText}>
              Using simulated data for some assets. Real data may vary.
            </Text>
          </View>
        )}
        <View style={styles.tipItem}>
          <MaterialCommunityIcons name='chart-line' size={16} color='#4CAF50' />
          <Text style={styles.tipText}>
            Track your portfolio regularly and rebalance quarterly
          </Text>
        </View>
      </View>
    </View>
  )
}

export default RecommendSection
