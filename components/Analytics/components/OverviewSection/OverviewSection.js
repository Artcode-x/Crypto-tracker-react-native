import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { Text, TouchableOpacity, View } from "react-native"
import { styles } from "./OverviewSection.styles"

const OverviewSection = ({
  expandedSection,
  setExpandedSection,
  portfolioMetrics,
  timeframe,
  getColorForValue
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        setExpandedSection(expandedSection === "overview" ? null : "overview")
      }
      style={styles.sectionCard}
    >
      <View style={styles.sectionHeader}>
        <MaterialCommunityIcons name='chart-bar' size={20} color='#FFD700' />
        <Text style={styles.sectionTitle}>Quick Overview</Text>
        <Ionicons
          name={expandedSection === "overview" ? "chevron-up" : "chevron-down"}
          size={20}
          color='#FFD700'
        />
      </View>

      {expandedSection === "overview" && (
        <View style={styles.sectionContent}>
          <View style={styles.overviewGrid}>
            <View style={styles.overviewItem}>
              <MaterialCommunityIcons name='crown' size={16} color='#FFD700' />
              <Text style={styles.overviewLabel}>Best Performer</Text>
              <Text style={styles.overviewValue} numberOfLines={1}>
                {portfolioMetrics.bestPerformer?.symbol || "N/A"}
              </Text>
              <Text
                style={[
                  styles.overviewChange,
                  {
                    color: getColorForValue(portfolioMetrics.bestPerformer?.priceChange)
                  }
                ]}
              >
                {portfolioMetrics.bestPerformer?.priceChange >= 0 ? "+" : ""}
                {portfolioMetrics.bestPerformer?.priceChange?.toFixed(2)}%
                {!portfolioMetrics.bestPerformer?.hasData && timeframe !== "24h" && "*"}
              </Text>
            </View>

            <View style={styles.overviewItem}>
              <MaterialCommunityIcons name='alert-octagon' size={16} color='#FF5252' />
              <Text style={styles.overviewLabel}>Worst Performer</Text>
              <Text style={styles.overviewValue} numberOfLines={1}>
                {portfolioMetrics.worstPerformer?.symbol || "N/A"}
              </Text>
              <Text
                style={[
                  styles.overviewChange,
                  {
                    color: getColorForValue(portfolioMetrics.worstPerformer?.priceChange)
                  }
                ]}
              >
                {portfolioMetrics.worstPerformer?.priceChange >= 0 ? "+" : ""}
                {portfolioMetrics.worstPerformer?.priceChange?.toFixed(2)}%
                {!portfolioMetrics.worstPerformer?.hasData && timeframe !== "24h" && "*"}
              </Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{portfolioMetrics.totalAssets}</Text>
              <Text style={styles.statLabel}>Assets</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {Math.round(portfolioMetrics.allocationAnalysis.top3)}%
              </Text>
              <Text style={styles.statLabel}>Top 3</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {portfolioMetrics.riskMetrics.diversificationScore}
              </Text>
              <Text style={styles.statLabel}>Diversification</Text>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  )
}

export default OverviewSection
