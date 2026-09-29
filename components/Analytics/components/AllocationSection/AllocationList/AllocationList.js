import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Text, TouchableOpacity, View } from "react-native"
import { styles } from "./AllocationList.styles"

const AllocationList = ({
  assets,
  colors,
  showSmallAllocations,
  onToggleSmallAllocations,
  getColorForValue
}) => {
  const largeAssets = assets.filter((asset) => (asset.allocation / 100) * 360 >= 5)
  const smallAssets = assets.filter((asset) => (asset.allocation / 100) * 360 < 5)

  return (
    <View style={styles.combinedLegendContainer}>
      <Text style={styles.combinedLegendTitle}>Allocation Details</Text>

      {/* Маленькие аллокации (если есть) */}
      {smallAssets.length > 0 && (
        <View style={styles.smallAllocationsSection}>
          <TouchableOpacity
            style={styles.smallAllocationsHeader}
            onPress={onToggleSmallAllocations}
          >
            <MaterialCommunityIcons
              name={showSmallAllocations ? "chevron-up" : "chevron-down"}
              size={16}
              color='#FFD700'
            />
            <Text style={styles.smallAllocationsTitle}>
              Small Allocations ({smallAssets.length})
            </Text>
            <View style={styles.smallAllocationsBadge}>
              <Text style={styles.smallAllocationsBadgeText}>{smallAssets.length}</Text>
            </View>
          </TouchableOpacity>

          {showSmallAllocations && (
            <View style={styles.smallAllocationsGrid}>
              {smallAssets.map((asset, index) => {
                const colorIndex = assets.findIndex((a) => a.id === asset.id)
                const color = colors[colorIndex]

                return (
                  <View key={asset.id} style={styles.smallAllocationItem}>
                    <View
                      style={[styles.smallAllocationColor, { backgroundColor: color }]}
                    />
                    <Text style={styles.smallAllocationSymbol} numberOfLines={1}>
                      {asset.symbol?.toUpperCase()}
                    </Text>
                    <Text style={styles.smallAllocationPercent}>
                      {asset.allocation.toFixed(1)}%
                    </Text>
                  </View>
                )
              })}
            </View>
          )}

          {!showSmallAllocations && smallAssets.length > 4 && (
            <Text style={styles.smallAllocationsHint}>
              Tap to expand {smallAssets.length} small allocations
            </Text>
          )}
        </View>
      )}
      {/* Большие аллокации */}
      {largeAssets.map((asset, index) => {
        const colorIndex = assets.findIndex((a) => a.id === asset.id)
        const color = colors[colorIndex]

        return (
          <View key={asset.id} style={styles.legendItem}>
            <View style={styles.legendLeft}>
              <View style={[styles.legendColor, { backgroundColor: color }]} />
              <View style={styles.legendText}>
                <Text style={styles.legendSymbol}>{asset.symbol?.toUpperCase()}</Text>
                <Text style={styles.legendName} numberOfLines={1}>
                  {asset.name}
                </Text>
              </View>
            </View>

            <View style={styles.legendRight}>
              <Text style={styles.legendAllocation}>{asset.allocation.toFixed(1)}%</Text>
              <Text
                style={[
                  styles.legendChange,
                  { color: getColorForValue(asset.priceChange) }
                ]}
              >
                {asset.priceChange >= 0 ? "+" : ""}
                {asset.priceChange.toFixed(2)}%
              </Text>
            </View>
          </View>
        )
      })}
    </View>
  )
}

export default AllocationList
