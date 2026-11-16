import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import {
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
  Image,
  Animated,
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Svg, { Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './CoinList2.styles';
import { rewriteFavorite, setCoin, setDuplicate } from '../../store/reducersSlice';
import {
  bottomInset,
  coinSelector,
  duplicateSelector,
} from '../../store/toolkitSelectors';
import { RFValue } from 'react-native-responsive-fontsize';

// ───────── Константы ─────────
const UP = '#3DDC97';
const DOWN = '#F2555A';
const GOLD = '#D4AF37';

const SIDE_PADDING = 0;
const GAP = 10;
const RADIUS = 20;
const CARD_PAD = 12;

const SPARK_POINTS = 24;

// ───────── Хелперы ─────────
const formatPrice = (p) => {
  if (p === null || p === undefined || isNaN(p)) return '—';
  const decimals = p >= 1 ? 2 : p >= 0.01 ? 6 : 8;
  const [int, frac] = Number(p).toFixed(decimals).split('.');
  return `$${int.replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')},${frac}`;
};

const getSparkline = (item) => {
  const raw =
    item?.sparkline_in_7d?.price ??
    item?.sparkline ??
    item?.otherInfo?.sparkline_in_7d?.price;
  if (!Array.isArray(raw) || raw.length < 2) return null;
  return raw.slice(-SPARK_POINTS);
};

const buildPaths = (prices, w, h) => {
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min;
  const stepX = w / (prices.length - 1);
  const pad = 3;

  const pts = prices.map((p, i) => {
    const y = range === 0 ? h / 2 : h - pad - ((p - min) / range) * (h - pad * 2);
    return [i * stepX, y];
  });

  const line = pts
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(' ');
  const area = `${line} L${w} ${h} L0 ${h} Z`;
  return { line, area };
};

// ───────── Мини-график ─────────
const Sparkline = React.memo(({ prices, color, width, height, id }) => {
  const paths = useMemo(
    () => (prices && width > 0 && height > 0 ? buildPaths(prices, width, height) : null),
    [prices, width, height],
  );
  if (!paths) return null;

  const gradId = `spark-${id}`;
  return (
    <Svg width={width} height={height}>
      <Defs>
        <SvgGradient id={gradId} x1='0' y1='0' x2='0' y2='1'>
          <Stop offset='0' stopColor={color} stopOpacity='0.35' />
          <Stop offset='1' stopColor={color} stopOpacity='0' />
        </SvgGradient>
      </Defs>
      <Path d={paths.area} fill={`url(#${gradId})`} />
      <Path
        d={paths.line}
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin='round'
        strokeLinecap='round'
        fill='none'
        strokeOpacity={0.7}
      />
    </Svg>
  );
});

// ───────── Карточка монеты (Компактный Layout) ─────────
const CoinCard = React.memo(
  ({ item, isFavorite, cardWidth, cardHeight, onOpen, onToggleFavorite }) => {
    const scale = useRef(new Animated.Value(1)).current;

    const change = Number(item.price_change_percentage_24h) || 0;
    const isUp = change >= 0;
    const color = isUp ? UP : DOWN;
    const sparkline = useMemo(() => getSparkline(item), [item]);

    const [chartHeight, setChartHeight] = useState(0);
    const onChartLayout = useCallback((e) => {
      const h = Math.floor(e.nativeEvent.layout.height);
      setChartHeight((prev) => (prev === h ? prev : h));
    }, []);

    const handleStar = () => {
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.3, duration: 110, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }),
      ]).start();
      onToggleFavorite(item);
    };

    return (
      <View style={[cardStyles.shadow, { width: cardWidth, height: cardHeight }]}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => onOpen(item)}
          style={cardStyles.card}
        >
          {/* ФОН: Градиент + Подсветка тренда */}
          <LinearGradient
            colors={['#3A3B40', '#2A2B30']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <LinearGradient
            colors={
              isUp
                ? ['rgba(61,220,151,0.08)', 'rgba(24,25,30,0)']
                : ['rgba(242,85,90,0.10)', 'rgba(24,25,30,0)']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.6 }}
            style={StyleSheet.absoluteFill}
          />

          {/* ВЕРХ: Лого + Название + Кнопка */}
          <View style={cardStyles.header}>
            <View style={cardStyles.headerLeft}>
              <View style={cardStyles.logoBox}>
                <Image source={{ uri: item.image }} style={cardStyles.logo} />
              </View>
              <View style={cardStyles.titleBlock}>
                <Text style={cardStyles.symbol} numberOfLines={1}>
                  {String(item.symbol || '').toUpperCase()}
                </Text>
                <Text style={cardStyles.name} numberOfLines={1}>
                  {item.name}
                </Text>
              </View>
            </View>

            <Animated.View style={{ transform: [{ scale }] }}>
              <TouchableOpacity
                onPress={handleStar}
                activeOpacity={0.7}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                style={[cardStyles.starBtn, isFavorite && cardStyles.starBtnActive]}
              >
                <Ionicons
                  name={isFavorite ? 'checkmark' : 'add'}
                  size={14}
                  color={isFavorite ? GOLD : '#8B93A5'}
                />
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* СЕРЕДИНА: График (в потоке, занимает оставшееся место) */}
          <View
            style={cardStyles.chartWrap}
            onLayout={onChartLayout}
            pointerEvents='none'
          >
            {chartHeight > 0 && (
              <Sparkline
                prices={sparkline}
                color={color}
                width={cardWidth - CARD_PAD * 2}
                height={chartHeight}
                id={item.id}
              />
            )}
          </View>

          {/* НИЗ: Цена + Процент */}
          <View style={cardStyles.footer}>
            <Text style={cardStyles.price} numberOfLines={1} adjustsFontSizeToFit>
              {formatPrice(item.current_price)}
            </Text>
            <View
              style={[
                cardStyles.badge,
                {
                  backgroundColor: isUp
                    ? 'rgba(61,220,151,0.14)'
                    : 'rgba(242,85,90,0.14)',
                  borderColor: isUp ? 'rgba(61,220,151,0.35)' : 'rgba(242,85,90,0.35)',
                },
              ]}
            >
              <Ionicons name={isUp ? 'caret-up' : 'caret-down'} size={10} color={color} />
              <Text style={[cardStyles.badgeText, { color }]}>
                {Math.abs(change).toFixed(2)}%
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  },
);

// ───────── Список ─────────
const CoinList2 = ({
  data,
  openModal,
  search,
  refreshing,
  setRefreshing,
  fetchMarketData,
  errorMessage,
  isSearching,
  searchResultsCount,
  searchError,
  loadMoreData,
  isLoadingMore,
  hasMore,
}) => {
  const favoriteCoins = useSelector(coinSelector);
  const doubles = useSelector(duplicateSelector);
  const bottomInsets = useSelector(bottomInset);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [msgDouble, setMsgDouble] = useState(false);

  const onEndReachedCalledDuringMomentum = useRef(true);
  const favoritesRef = useRef(favoriteCoins);
  favoritesRef.current = favoriteCoins;

  const { width: windowWidth } = useWindowDimensions();
  const numColumns = windowWidth >= 768 ? 3 : 2; // порог под планшет

  const [listWidth, setListWidth] = useState(() => Math.max(0, windowWidth - 42));

  const handleLayout = useCallback((e) => {
    const w = Math.floor(e.nativeEvent.layout.width);
    setListWidth((prev) => (prev === w ? prev : w));
  }, []);

  const { cardWidth, cardHeight } = useMemo(() => {
    const w = Math.floor(
      (listWidth - SIDE_PADDING * 2 - GAP * (numColumns - 1)) / numColumns,
    );
    // 85
    const h = Math.round(w * 0.99);
    return { cardWidth: w, cardHeight: h };
  }, [listWidth, numColumns]);

  const hasData = data && data.length > 0;
  const showSearchStatus = search && search.length >= 2;

  const favoriteIds = useMemo(() => {
    const set = new Set();
    if (Array.isArray(favoriteCoins)) {
      favoriteCoins.forEach((c) => c && c.id && set.add(c.id));
    }
    return set;
  }, [favoriteCoins]);

  useEffect(() => {
    if (!Array.isArray(data) || !Array.isArray(favoriteCoins)) return;
    const updatedCoins = [];
    data.forEach((coin) => {
      if (!coin || !coin.id) return;
      const existing = favoriteCoins.find((f) => f && f.id === coin.id);
      if (existing && existing.current_price !== coin.current_price) {
        updatedCoins.push({
          name: coin.name,
          current_price: coin.current_price,
          price_change_percentage_24h: coin.price_change_percentage_24h,
          image: coin.image,
          otherInfo: coin.otherInfo,
          market_cap_rank: coin.market_cap_rank,
          symbol: coin.symbol,
          id: coin.id,
        });
      }
    });
    if (updatedCoins.length > 0) {
      dispatch(rewriteFavorite(updatedCoins));
    }
  }, [data, favoriteCoins, dispatch]);

  const handleToggleFavorite = useCallback(
    (item) => {
      if (!item || !item.id) return;
      const coinData = {
        name: item.name,
        current_price: item.current_price,
        price_change_percentage_24h: item.price_change_percentage_24h,
        image: item.image,
        otherInfo: item.otherInfo,
        market_cap_rank: item.market_cap_rank,
        symbol: item.symbol,
        id: item.id,
      };
      const isDuplicate = (favoritesRef.current || []).some((f) => f && f.id === item.id);
      if (isDuplicate) {
        dispatch(setDuplicate(item.id));
        setMsgDouble(true);
        setTimeout(() => setMsgDouble(false), 1500);
      } else {
        dispatch(setCoin(coinData));
        setModalVisible(true);
        setTimeout(() => setModalVisible(false), 1000);
      }
    },
    [dispatch],
  );

  const handleEndReached = useCallback(() => {
    if (search || isLoadingMore || !hasMore || !loadMoreData || isSearching) return;
    if (onEndReachedCalledDuringMomentum.current) return;
    onEndReachedCalledDuringMomentum.current = true;
    loadMoreData();
    setTimeout(() => {
      onEndReachedCalledDuringMomentum.current = false;
    }, 2000);
  }, [search, isLoadingMore, hasMore, loadMoreData, isSearching]);

  const handleMomentumScrollBegin = useCallback(() => {
    onEndReachedCalledDuringMomentum.current = false;
  }, []);

  const renderFooter = useCallback(() => {
    if (!isLoadingMore || search) return null;
    return (
      <View style={styles.footerContainer}>
        <LinearGradient
          colors={['rgba(212, 175, 55, 0.2)', 'transparent']}
          style={styles.footerGradient}
        >
          <ActivityIndicator size='small' color={GOLD} />
          <Text style={styles.footerText}>Loading more assets...</Text>
        </LinearGradient>
      </View>
    );
  }, [isLoadingMore, search]);

  const renderSearchStatus = useCallback(() => {
    if (!search || search.length < 2) return null;
    if (searchError) {
      return (
        <View style={styles.searchErrorContainer}>
          <Ionicons name='alert-circle-outline' size={20} color='#FF6B6B' />
          <Text style={styles.searchErrorText}>{searchError}</Text>
          <Text style={styles.searchErrorSubtext}>
            Please wait a moment and try again
          </Text>
        </View>
      );
    }
    if (isSearching) {
      return (
        <View style={styles.searchingContainer}>
          <ActivityIndicator size='small' color='#FFD700' />
          <Text style={styles.searchingText}>Searching coins...</Text>
        </View>
      );
    }
    if (searchResultsCount === 0) {
      return (
        <View style={styles.noResultsContainer}>
          <Ionicons name='search-outline' size={30} color='#666' />
          <Text style={styles.noResultsText}>No coins found for "{search}"</Text>
          <Text style={styles.noResultsSubtext}>Try another search term</Text>
        </View>
      );
    }
    if (searchResultsCount > 0) {
      return (
        <View style={styles.resultsCountContainer}>
          <Text style={styles.resultsCountText}>
            Found {searchResultsCount} result{searchResultsCount !== 1 ? 's' : ''} for "
            {search}"
          </Text>
        </View>
      );
    }
    return null;
  }, [search, isSearching, searchResultsCount, searchError]);

  const renderItem = useCallback(
    ({ item }) => {
      if (!item || !item.id) return null;
      return (
        <CoinCard
          item={item}
          isFavorite={favoriteIds.has(item.id)}
          cardWidth={cardWidth}
          cardHeight={cardHeight}
          onOpen={openModal}
          onToggleFavorite={handleToggleFavorite}
        />
      );
    },
    [favoriteIds, cardWidth, cardHeight, openModal, handleToggleFavorite],
  );

  const keyExtractor = useCallback((item, index) => item?.id ?? `coin-${index}`, []);

  return (
    <>
      <FlatList
        style={styles.list}
        onLayout={handleLayout}
        data={data || []}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        // numColumns={2}
        numColumns={numColumns}
        key={numColumns}
        columnWrapperStyle={cardStyles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingHorizontal: SIDE_PADDING,
            paddingTop: 8,
            paddingBottom: bottomInsets.bottom > 0 ? bottomInsets.bottom + 60 : 55,
          },
        ]}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
        onMomentumScrollBegin={handleMomentumScrollBegin}
        ListFooterComponent={renderFooter}
        ListHeaderComponent={showSearchStatus ? renderSearchStatus : null}
        ListEmptyComponent={
          !showSearchStatus && !refreshing && !hasData ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No data to display</Text>
            </View>
          ) : null
        }
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true);
          try {
            await fetchMarketData();
          } catch (error) {
            console.error('Error refreshing:', error);
          } finally {
            setRefreshing(false);
            onEndReachedCalledDuringMomentum.current = false;
          }
        }}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={7}
      />

      <Modal
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType='fade'
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successModal}>
            <Ionicons name='checkmark-circle' size={50} color='#4CAF50' />
            <Text style={styles.modalTitle}>Success!</Text>
            <Text style={styles.modalText}>Coin added to favorites</Text>
          </View>
        </View>
      </Modal>

      <Modal
        transparent
        visible={msgDouble}
        onRequestClose={() => setMsgDouble(false)}
        animationType='fade'
      >
        <View style={styles.modalOverlay}>
          <View style={styles.warningModal}>
            <Ionicons name='warning' size={50} color='#FFD700' />
            <Text style={styles.modalTitle}>Already Added</Text>
            <Text style={styles.modalText}>
              You already have {doubles} in your favorites!
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

// ───────── Стили карточек (Компактные) ─────────
const cardStyles = StyleSheet.create({
  row: {
    gap: GAP,
    justifyContent: 'flex-start',
    marginBottom: GAP,
  },
  shadow: {
    borderRadius: RADIUS,
    backgroundColor: '#18191E',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  card: {
    flex: 1,
    borderRadius: RADIUS,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    flexDirection: 'column',
    padding: CARD_PAD,
  },

  // ВЕРХНЯЯ ЧАСТЬ
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoBox: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  logo: { width: 20, height: 20, borderRadius: 10 },
  titleBlock: {
    flex: 1,
    justifyContent: 'center',
  },
  symbol: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  name: { color: '#8B93A5', fontSize: 10, marginTop: 1 },
  starBtn: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  starBtnActive: {
    backgroundColor: 'rgba(212,175,55,0.20)',
  },

  // СЕРЕДИНА (График)
  chartWrap: {
    flex: 1,
    minHeight: 10,
    justifyContent: 'flex-end',
    marginBottom: 4,
  },

  // НИЖНЯЯ ЧАСТЬ
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  price: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    // paddingHorizontal: 5,
    paddingHorizontal: 2,
    paddingVertical: 1,
    borderRadius: 4,
    borderWidth: 1,
  },
  badgeText: { fontSize: RFValue(9), fontWeight: '600' },
});

export default CoinList2;
