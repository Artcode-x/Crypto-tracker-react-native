import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { Text, TouchableOpacity, View } from "react-native"
import { styles } from "./RiskSection.styles"

const RiskSection = ({
  expandedSection,
  setExpandedSection,
  portfolioMetrics,
  timeframe,
  getColorForValue
}) => {
  return (
    <TouchableOpacity
      onPress={() => setExpandedSection(expandedSection === "risk" ? null : "risk")}
      style={styles.sectionCard}
    >
      <View style={styles.sectionHeader}>
        <MaterialCommunityIcons name='shield' size={20} color='#FFD700' />
        <Text style={styles.sectionTitle}>Risk Analysis</Text>
        <Ionicons
          name={expandedSection === "risk" ? "chevron-up" : "chevron-down"}
          size={20}
          color='#FFD700'
        />
      </View>

      {expandedSection === "risk" && (
        <View style={styles.sectionContent}>
          <View style={styles.riskMetrics}>
            <View style={styles.riskItem}>
              <View style={styles.riskHeader}>
                <MaterialCommunityIcons
                  name='chart-bell-curve'
                  size={16}
                  color='#FF5252'
                />
                <Text style={styles.riskLabel}>Portfolio Volatility</Text>
              </View>
              <View style={styles.riskValueContainer}>
                <Text style={styles.riskValue}>
                  {portfolioMetrics.riskMetrics.volatility.toFixed(1)}%
                  {!portfolioMetrics.allDataLoaded && timeframe !== "24h" && "*"}
                </Text>
                <View style={styles.riskIndicator}>
                  <View
                    style={[
                      styles.riskLevel,
                      {
                        width: `${Math.min(
                          portfolioMetrics.riskMetrics.volatility,
                          100
                        )}%`,
                        backgroundColor:
                          portfolioMetrics.riskMetrics.volatility > 30
                            ? "#FF5252"
                            : portfolioMetrics.riskMetrics.volatility > 15
                            ? "#FFD700"
                            : "#4CAF50"
                      }
                    ]}
                  />
                </View>
                <Text style={styles.riskDescription}>
                  Average price swing of your assets
                </Text>
              </View>
            </View>

            <View style={styles.riskItem}>
              <View style={styles.riskHeader}>
                <MaterialCommunityIcons name='diversify' size={16} color='#4CAF50' />
                <Text style={styles.riskLabel}>Diversification Score</Text>
              </View>
              <View style={styles.riskValueContainer}>
                <Text style={styles.riskValue}>
                  {portfolioMetrics.riskMetrics.diversificationScore}/100
                </Text>
                <View style={styles.riskIndicator}>
                  <View
                    style={[
                      styles.riskLevel,
                      {
                        width: `${portfolioMetrics.riskMetrics.diversificationScore}%`,
                        backgroundColor:
                          portfolioMetrics.riskMetrics.diversificationScore > 70
                            ? "#4CAF50"
                            : portfolioMetrics.riskMetrics.diversificationScore > 40
                            ? "#FFD700"
                            : "#FF5252"
                      }
                    ]}
                  />
                </View>
                <Text style={styles.riskDescription}>
                  How well your portfolio is spread
                </Text>
              </View>
            </View>

            <View style={styles.riskItem}>
              <View style={styles.riskHeader}>
                <MaterialCommunityIcons
                  name='target'
                  size={16}
                  color={getColorForValue(
                    portfolioMetrics.allocationAnalysis.concentration,
                    false
                  )}
                />
                <Text style={styles.riskLabel}>Top Asset Concentration</Text>
              </View>
              <View style={styles.riskValueContainer}>
                <Text style={styles.riskValue}>
                  {portfolioMetrics.allocationAnalysis.concentration.toFixed(1)}%
                </Text>
                <Text style={styles.riskAdvice}>
                  {portfolioMetrics.allocationAnalysis.concentration > 40
                    ? "⚠️ High concentration - consider diversifying"
                    : portfolioMetrics.allocationAnalysis.concentration > 25
                    ? "⚖️ Moderately concentrated"
                    : "✅ Well diversified"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  )
}

export default RiskSection
