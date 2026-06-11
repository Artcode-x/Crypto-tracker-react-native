import { Ionicons } from "@expo/vector-icons"
import { ActivityIndicator, Dimensions, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./ModalFavorite.styles"
import { SwitchTimeframeButtons } from "./components/SwitchTimeframeButtons/SwitchTimeframeButtons"
import FearGreedMeter from "./components/FearGreedMeter/FearGreedMeter"
import CandlestickChart from "./components/CandlestickChart/CandlestickChart"
import AnimatedGoldenSkeleton from "./components/AnimatedGoldenSkeleton/AnimatedGoldenSkeleton"
import { VolumeChart } from "./components/VolumeChart/VolumeChart"

const Content = ({
  selectedCoin,
  chartDays,
  santiment,
  fearGreedValue,
  coinName,
  minMax,
  loadingChart,
  prices,
  currentCandle,
  limit,
  setLimit,
  volumeData,
  onClose,
  screenHeight
}) => {
  const chartHeight = screenHeight * 0.32
  const volumeHeight = screenHeight * 0.12
  const { width } = Dimensions.get("window")
  
  return (
    <View style={styles.contentContainer}>
      {/* Заголовок */}
      <View style={styles.modalHeader}>
        <View style={styles.coinInfo}>
          <Text style={styles.selectedCoinName}>{selectedCoin?.name}</Text>
          <Text style={styles.selectedCoinSymbol}>
            {selectedCoin?.symbol?.toUpperCase()} • {chartDays}
          </Text>
        </View>
        <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
          <Ionicons name='close' size={20} color='#D4AF37' />
        </TouchableOpacity>
      </View>
      {coinName === "BTC" && (
        <>
          {/* Sentiment badge */}
          {santiment && (
            <View style={styles.sentimentBadge}>
              <Text style={styles.sentimentLabel}>Market Fear and Greed Index:</Text>
              <Text style={[styles.sentimentText, styles[santiment]]}>
                {santiment.toUpperCase()}
              </Text>
            </View>
          )}

          {santiment && fearGreedValue && (
            <View style={styles.meterContainer}>
              <FearGreedMeter value={fearGreedValue} size={200} />
            </View>
          )}
        </>
      )}

      {/* Инфо строка */}
      {prices.length > 0 && (
        <View style={styles.infoRow}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoText}>24h Low</Text>
            {loadingChart || !minMax.minPrice ? (
              <AnimatedGoldenSkeleton />
            ) : (
              <Text style={[styles.infoValue, { color: "lightblue" }]}>
                {minMax.minPrice && !isNaN(minMax.minPrice)
                  ? `${minMax.minPrice}$`
                  : "N/A"}
              </Text>
            )}
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoText}>Current</Text>
            {loadingChart || !selectedCoin?.current_price ? (
              <AnimatedGoldenSkeleton />
            ) : (
              <Text style={styles.infoValue}>
                ${selectedCoin?.current_price?.toFixed(2) || "0.00"}
              </Text>
            )}
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoText}>24h High</Text>
            {loadingChart || !minMax.minPrice ? (
              <AnimatedGoldenSkeleton />
            ) : (
              <Text style={[styles.infoValue, { color: "wheat" }]}>
                {minMax.maxPrice && !isNaN(minMax.maxPrice)
                  ? `${minMax.maxPrice}$`
                  : "N/A"}
              </Text>
            )}
          </View>
        </View>
      )}

      {/* График цены */}
      <View style={styles.chartWrapper}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Price Chart</Text>
          {prices.length > 0 && <Text style={styles.chartLimit}>Limit: {limit}</Text>}
        </View>

        {loadingChart ? (
          <View style={[styles.loadingContainer, { height: chartHeight }]}>
            <ActivityIndicator size='large' color='#D4AF37' />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : prices.length === 0 ? (
          // Плейсхолдер - когда вместо графика когда нет данных
          <View style={[styles.noDataPlaceholder, { height: chartHeight }]}>
            <Ionicons
              name='bar-chart-outline'
              size={48}
              color='rgba(255, 255, 255, 0.3)'
            />
            <Text style={styles.noDataPlaceholderText}>Chart Not Available</Text>
            <Text style={styles.noDataPlaceholderSubText}>
              The Binance API doesn't offer the ability to open this chart. Currently,
              detailed charts are only available for coins listed on Binance."
            </Text>
          </View>
        ) : (
          <View style={[styles.chartBox, { height: chartHeight }]}>
            <CandlestickChart
              data={prices}
              width={width * 0.9}
              height={chartHeight}
              limit={limit}
              setLimit={setLimit}
            />
          </View>
        )}

        {/* Цены под графиком */}
        {!loadingChart && prices.length > 0 && currentCandle && (
          <View style={styles.priceRow}>
            <View style={styles.priceItem}>
              <Text style={styles.priceLabel}>Low</Text>
              <Text style={[styles.priceValue, styles.priceLow]}>
                ${currentCandle.low?.toFixed(2) || "0.00"}
              </Text>
            </View>
            <View style={styles.priceItem}>
              <Text style={styles.priceLabel}>Open</Text>
              <Text style={[styles.priceValue, styles.priceOpen]}>
                ${currentCandle.open?.toFixed(2) || "0.00"}
              </Text>
            </View>
            <View style={styles.priceItem}>
              <Text style={styles.priceLabel}>Close</Text>
              <Text style={[styles.priceValue, styles.priceClose]}>
                ${currentCandle.close?.toFixed(2) || "0.00"}
              </Text>
            </View>
            <View style={styles.priceItem}>
              <Text style={styles.priceLabel}>High</Text>
              <Text style={[styles.priceValue, styles.priceHigh]}>
                ${currentCandle.high?.toFixed(2) || "0.00"}
              </Text>
            </View>
          </View>
        )}
      </View>
      {/* Volume - показываем только если есть данные графика */}
      {prices.length > 0 && (
        <View style={styles.volumeSection}>
          <Text style={styles.volumeTitle}>Volume</Text>
          <View style={[styles.volumeChartContainer, { height: volumeHeight }]}>
            <VolumeChart volumeData={volumeData} height={volumeHeight} />
          </View>
        </View>
      )}
      {/* Timeframe */}
      <View style={styles.timeframeSection}>
        <View style={styles.timeframeHeader}>
          <Text style={styles.timeframeTitle}>Timeframe:</Text>
          <Text style={styles.timeframeValue}>{chartDays}</Text>
        </View>
        <SwitchTimeframeButtons chartDays={chartDays} />
      </View>
      {/* Кнопка закрытия */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Content
