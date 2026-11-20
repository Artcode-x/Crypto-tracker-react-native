import {
  ActivityIndicator,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Animated,
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDaysMain } from '../../store/reducersSlice';
import { mainDaySelector } from '../../store/toolkitSelectors';
import { InteractiveChart } from './InteractiveChart/InteractiveChart';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { styles } from './Chart.styles';

const TIME_PERIODS = [
  { label: '24H', value: 1 },
  { label: '7D', value: 7 },
  { label: '14D', value: 14 },
  { label: '30D', value: 30 },
];

const UP = '#00C853';
const DOWN = '#FF3B30';

const isNum = (v) => typeof v === 'number' && isFinite(v);

const formatPrice = (price) => {
  if (!isNum(price)) return '$0.00';
  const a = Math.abs(price);
  const d = a >= 1 ? 2 : a >= 0.01 ? 4 : a >= 0.0001 ? 6 : 8;
  return `$${price.toLocaleString('en-US', {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  })}`;
};

const formatLargeNumber = (num) => {
  if (!isNum(num) || num === 0) return '0';
  if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
  if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
  return num.toFixed(2);
};

const formatPercent = (v) => {
  if (!isNum(v)) return '—';
  return `${v >= 0 ? '+' : '−'}${Math.abs(v).toFixed(2)}%`;
};

const changeColor = (v) => (isNum(v) && v < 0 ? DOWN : UP);

export const Chart = ({
  selectedCoinData,
  chartData,
  modalVisible,
  closeModal,
  isloading,
  coinHistoryData,
}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const handleScrub = (active) => setScrollEnabled(!active);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const scrollViewRef = useRef(null);

  const chartDays = useSelector(mainDaySelector);
  const dispatch = useDispatch();

  const is30DSelected = chartDays === 30;
  const periodLabel = TIME_PERIODS.find((p) => p.value === chartDays)?.label ?? '';

  useEffect(() => {
    if (modalVisible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: false });
      }, 100);
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.9);
    }
  }, [modalVisible]);

  const openChart = (days) => {
    if (days === chartDays) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    dispatch(setChartDaysMain(days));
  };

  const toggleTheme = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsDarkTheme((prev) => !prev);
  };

  const getTrendIndicator = () => {
    if (!chartData?.prices || chartData.prices.length < 2) return null;
    const firstPrice = chartData.prices[0];
    const lastPrice = chartData.prices[chartData.prices.length - 1];
    if (!firstPrice) return null;
    return {
      isPositive: lastPrice >= firstPrice,
      percentage: Math.abs(((lastPrice - firstPrice) / firstPrice) * 100).toFixed(2),
    };
  };

  const trendData = getTrendIndicator();

  const change24h = selectedCoinData?.price_change_percentage_24h;
  const change7d = selectedCoinData?.price_change_percentage_7d_in_currency;
  const totalSupply = selectedCoinData?.market_data?.total_supply;

  return (
    <Modal
      animationType='fade'
      transparent
      visible={modalVisible}
      onRequestClose={closeModal}
      statusBarTranslucent
    >
      <View style={styles.modalBlurContainer}>
        <Animated.View
          style={[
            styles.modalContainer,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          <LinearGradient
            colors={['#0A0A0F', '#121218', '#0A0A0F']}
            style={styles.modalContent}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.header}>
              <View style={styles.coinHeader}>
                <View style={styles.coinImageContainer}>
                  <Image
                    source={{ uri: selectedCoinData?.image }}
                    style={styles.coinImage}
                  />
                  <View style={styles.coinImageGlow} />
                </View>
                <View style={styles.coinTitleContainer}>
                  <Text style={styles.coinName} numberOfLines={1}>
                    {selectedCoinData?.name}
                  </Text>
                  <Text style={styles.coinSymbol}>
                    {selectedCoinData?.symbol?.toUpperCase()}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={closeModal}
                style={styles.closeButton}
                activeOpacity={0.7}
              >
                <Ionicons name='close' size={22} color='#D4AF37' />
              </TouchableOpacity>
            </View>

            <ScrollView
              ref={scrollViewRef}
              scrollEnabled={scrollEnabled}
              showsVerticalScrollIndicator={false}
              style={styles.mainScroll}
              contentContainerStyle={styles.mainScrollContent}
            >
              <View style={styles.priceSection}>
                <Text style={styles.currentPrice}>
                  {formatPrice(selectedCoinData?.current_price)}
                </Text>
                <View
                  style={[
                    styles.priceChangeBadge,
                    {
                      backgroundColor:
                        isNum(change24h) && change24h < 0
                          ? 'rgba(255, 59, 48, 0.15)'
                          : 'rgba(0, 200, 83, 0.15)',
                    },
                  ]}
                >
                  <Ionicons
                    name={
                      isNum(change24h) && change24h < 0 ? 'trending-down' : 'trending-up'
                    }
                    size={14}
                    color={changeColor(change24h)}
                  />
                  <Text
                    style={[styles.priceChangeText, { color: changeColor(change24h) }]}
                  >
                    {isNum(change24h) ? `${Math.abs(change24h).toFixed(2)}%` : '—'}
                  </Text>
                </View>
              </View>

              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <View style={styles.statHeader}>
                    <MaterialIcons name='arrow-upward' size={14} color={UP} />
                    <Text style={styles.statLabel}>High</Text>
                  </View>
                  <Text style={styles.statValue}>
                    {formatPrice(selectedCoinData?.high_24h)}
                  </Text>
                </View>

                <View style={styles.statCard}>
                  <View style={styles.statHeader}>
                    <MaterialIcons name='arrow-downward' size={14} color={DOWN} />
                    <Text style={styles.statLabel}>Low</Text>
                  </View>
                  <Text style={styles.statValue}>
                    {formatPrice(selectedCoinData?.low_24h)}
                  </Text>
                </View>

                <View style={styles.statCard}>
                  <View style={styles.statHeader}>
                    <MaterialIcons name='emoji-events' size={14} color='#D4AF37' />
                    <Text style={styles.statLabel}>Rank</Text>
                  </View>
                  <Text style={styles.statValue}>
                    #{selectedCoinData?.market_cap_rank ?? '—'}
                  </Text>
                </View>

                <View style={styles.statCard}>
                  <View style={styles.statHeader}>
                    <MaterialIcons name='bar-chart' size={14} color='#667EEA' />
                    <Text style={styles.statLabel}>Market Cap</Text>
                  </View>
                  <Text style={styles.statValue}>
                    ${formatLargeNumber(selectedCoinData?.market_cap)}
                  </Text>
                </View>
              </View>

              {trendData && !isloading && (
                <View style={styles.trendIndicator}>
                  <View
                    style={[
                      styles.trendDot,
                      { backgroundColor: trendData.isPositive ? UP : DOWN },
                    ]}
                  />
                  <Text style={styles.trendText}>{periodLabel} PERFORMANCE</Text>
                  <Text
                    style={[
                      styles.trendPercentage,
                      { color: trendData.isPositive ? UP : DOWN },
                    ]}
                  >
                    {trendData.isPositive ? '+' : '−'}
                    {trendData.percentage}%
                  </Text>
                </View>
              )}

              <View style={styles.timePeriodsContainer}>
                {TIME_PERIODS.map((period) => {
                  const active = chartDays === period.value;
                  return (
                    <TouchableOpacity
                      key={period.value}
                      onPress={() => openChart(period.value)}
                      style={[
                        styles.timePeriodButton,
                        active && styles.timePeriodButtonActive,
                      ]}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.timePeriodText,
                          active && styles.timePeriodTextActive,
                        ]}
                      >
                        {period.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.chartSection}>
                <View style={styles.chartHeader}>
                  <Text style={styles.chartTitle}>Price Chart</Text>
                  <TouchableOpacity
                    onPress={toggleTheme}
                    style={styles.themeToggle}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      colors={
                        isDarkTheme ? ['#D4AF37', '#F7EF8A'] : ['#2D3748', '#4A5568']
                      }
                      style={styles.themeToggleGradient}
                    >
                      <Ionicons
                        name={isDarkTheme ? 'moon' : 'sunny'}
                        size={16}
                        color={isDarkTheme ? '#0A0A0F' : '#CBD5E0'}
                      />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>

                {isloading ? (
                  <View style={styles.chartLoader}>
                    <ActivityIndicator size='large' color='#D4AF37' />
                    <Text style={styles.loadingText}>Loading chart...</Text>
                  </View>
                ) : (
                  <View style={styles.chartWrapper}>
                    <InteractiveChart
                      coinHistoryData={coinHistoryData}
                      chartData={chartData}
                      is30DSelected={is30DSelected}
                      chartDays={chartDays}
                      isDark={isDarkTheme}
                      onScrubChange={handleScrub}
                    />
                  </View>
                )}
              </View>

              <View style={styles.additionalSection}>
                <Text style={styles.sectionTitle}>Additional Info</Text>

                <View style={styles.additionalGrid}>
                  <View style={styles.additionalCard}>
                    <LinearGradient
                      colors={['rgba(0, 200, 83, 0.1)', 'rgba(0, 200, 83, 0.05)']}
                      style={styles.additionalCardGradient}
                    >
                      <View style={styles.additionalIconContainer}>
                        <MaterialIcons name='show-chart' size={18} color={UP} />
                      </View>
                      <View>
                        <Text style={styles.additionalLabel}>7D Change</Text>
                        <Text
                          style={[
                            styles.additionalValue,
                            { color: changeColor(change7d) },
                          ]}
                        >
                          {formatPercent(change7d)}
                        </Text>
                      </View>
                    </LinearGradient>
                  </View>

                  <View style={styles.additionalCard}>
                    <LinearGradient
                      colors={['rgba(212, 175, 55, 0.1)', 'rgba(212, 175, 55, 0.05)']}
                      style={styles.additionalCardGradient}
                    >
                      <View style={styles.additionalIconContainer}>
                        <MaterialIcons name='attach-money' size={18} color='#D4AF37' />
                      </View>
                      <View>
                        <Text style={styles.additionalLabel}>24H Volume</Text>
                        <Text style={styles.additionalValue}>
                          ${formatLargeNumber(selectedCoinData?.total_volume)}
                        </Text>
                      </View>
                    </LinearGradient>
                  </View>

                  <View style={styles.additionalCard}>
                    <LinearGradient
                      colors={['rgba(102, 126, 234, 0.1)', 'rgba(102, 126, 234, 0.05)']}
                      style={styles.additionalCardGradient}
                    >
                      <View style={styles.additionalIconContainer}>
                        <MaterialIcons name='trending-up' size={18} color='#667EEA' />
                      </View>
                      <View>
                        <Text style={styles.additionalLabel}>24H Change</Text>
                        <Text
                          style={[
                            styles.additionalValue,
                            { color: changeColor(selectedCoinData?.price_change_24h) },
                          ]}
                        >
                          {formatPrice(selectedCoinData?.price_change_24h)}
                        </Text>
                      </View>
                    </LinearGradient>
                  </View>

                  <View style={styles.additionalCard}>
                    <LinearGradient
                      colors={['rgba(156, 39, 176, 0.1)', 'rgba(156, 39, 176, 0.05)']}
                      style={styles.additionalCardGradient}
                    >
                      <View style={styles.additionalIconContainer}>
                        <MaterialIcons name='stars' size={18} color='#9C27B0' />
                      </View>
                      <View>
                        <Text style={styles.additionalLabel}>ATH</Text>
                        <Text style={styles.additionalValue}>
                          {formatPrice(selectedCoinData?.ath)}
                        </Text>
                      </View>
                    </LinearGradient>
                  </View>
                </View>
              </View>

              {selectedCoinData?.market_data && (
                <View style={styles.marketDataSection}>
                  <Text style={styles.sectionTitle}>Market Data</Text>
                  <View style={styles.marketDataGrid}>
                    <View style={styles.marketDataCard}>
                      <Text style={styles.marketDataLabel}>Circulating Supply</Text>
                      <Text style={styles.marketDataValue}>
                        {formatLargeNumber(
                          selectedCoinData?.market_data?.circulating_supply,
                        )}
                      </Text>
                    </View>
                    <View style={styles.marketDataCard}>
                      <Text style={styles.marketDataLabel}>Total Supply</Text>
                      <Text style={styles.marketDataValue}>
                        {isNum(totalSupply) && totalSupply > 0
                          ? formatLargeNumber(totalSupply)
                          : '∞'}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </ScrollView>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );
};
