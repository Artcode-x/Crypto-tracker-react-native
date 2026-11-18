import { useEffect, useMemo, useRef, useState } from 'react';
import { View, Dimensions, Text, StyleSheet, PanResponder } from 'react-native';
import { G, Circle, Line } from 'react-native-svg';
import { LineChart } from 'react-native-chart-kit';
import * as Haptics from 'expo-haptics';
import { styles } from './ChartWhite.styles';

const CHART_WIDTH_PERCENTAGE = 0.78;
const CHART_HEIGHT = 200;
const CHART_INNER_HEIGHT = 190;
const PADDING_TOP = 15;
const PLOT_BOTTOM = PADDING_TOP + (CHART_INNER_HEIGHT * 3) / 4;
const SEGMENTS = 4;
const MAX_POINTS = 72;

const THEME = {
  bg: '#FFFFFF',
  grid: 'rgba(0, 0, 0, 0.08)',
  label: 'rgba(0, 0, 0, 0.55)',
  text: '#0F172A',
  muted: 'rgba(0, 0, 0, 0.45)',
  cross: 'rgba(0, 0, 0, 0.3)',
  border: 'rgba(212, 175, 55, 0.45)',
  up: '#10B981',
  down: '#EF4444',
};

/* ------------------------- helpers ------------------------- */

const getTimestamps = (chartData, count, chartDays) => {
  if (Array.isArray(chartData.timestamps) && chartData.timestamps.length === count) {
    return chartData.timestamps.map((t) => (t < 1e12 ? t * 1000 : t));
  }
  if (Array.isArray(chartData.labelDate) && chartData.labelDate.length === count) {
    const parsed = chartData.labelDate.map((raw) => {
      if (typeof raw === 'number') return raw < 1e12 ? raw * 1000 : raw;
      const t = Date.parse(raw);
      return isNaN(t) ? null : t;
    });
    if (parsed.every((t) => t !== null)) return parsed;
  }
  const now = Date.now();
  const spanMs = Math.max(1, chartDays) * 24 * 60 * 60 * 1000;
  const step = spanMs / Math.max(1, count - 1);
  return Array.from({ length: count }, (_, i) => now - spanMs + i * step);
};

const downsample = (values, times, max) => {
  const n = values.length;
  if (n <= max) return { values, times };
  const size = n / max;
  const v = [];
  const t = [];
  for (let i = 0; i < max; i++) {
    const start = Math.floor(i * size);
    const end = Math.max(start + 1, Math.floor((i + 1) * size));
    let sum = 0;
    for (let j = start; j < end; j++) sum += values[j];
    v.push(sum / (end - start));
    t.push(times[Math.min(end - 1, n - 1)]);
  }
  v[max - 1] = values[n - 1];
  t[max - 1] = times[n - 1];
  return { values: v, times: t };
};

const formatAxisLabel = (ts, chartDays) => {
  const d = new Date(ts);
  if (!isFinite(d.getTime())) return '';
  if (chartDays === 1) {
    return d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  }
  return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
};

const formatFullTime = (ts, chartDays) => {
  const d = new Date(ts);
  if (!isFinite(d.getTime())) return '';
  const time = d.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
  if (chartDays === 1) return time;
  const date = d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
  return `${date} · ${time}`;
};

const formatPrice = (v) => {
  if (!isFinite(v)) return '$0.00';
  const a = Math.abs(v);
  const d = a >= 1 ? 2 : a >= 0.01 ? 4 : a >= 0.0001 ? 6 : 8;
  return `$${v.toLocaleString('en-US', {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  })}`;
};

const getFontSize = (width) => {
  if (width < 350) return 7;
  if (width < 400) return 8;
  return 9;
};

/* ------------------------- component ------------------------- */

export const ChartWhite = ({
  coinHistoryData,
  chartData,
  is30DSelected,
  chartDays = 1,
}) => {
  const { width } = Dimensions.get('window');
  const chartWidth = width * CHART_WIDTH_PERCENTAGE;
  const svgWidth = chartWidth + 40;
  const fontSize = getFontSize(width);

  const [selected, setSelected] = useState(null);
  const geoRef = useRef({ n: 0, left: 0, span: 1 });
  const lastIdxRef = useRef(-1);

  const rawPrices = chartData?.prices;
  const hasData =
    !!coinHistoryData?.length && Array.isArray(rawPrices) && rawPrices.length > 1;

  const series = useMemo(() => {
    if (!hasData) return null;
    const times = getTimestamps(chartData, rawPrices.length, chartDays);
    const ds = downsample(rawPrices, times, MAX_POINTS);
    return {
      values: ds.values,
      times: ds.times,
      first: rawPrices[0],
      last: rawPrices[rawPrices.length - 1],
      high: Math.max(...rawPrices),
      low: Math.min(...rawPrices),
    };
  }, [hasData, chartData, rawPrices, chartDays]);

  useEffect(() => {
    setSelected(null);
    lastIdxRef.current = -1;
  }, [rawPrices, chartDays]);

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (e) => pick(e.nativeEvent.locationX),
      onPanResponderMove: (e) => pick(e.nativeEvent.locationX),
      onPanResponderRelease: () => clear(),
      onPanResponderTerminate: () => clear(),
    }),
  ).current;

  function pick(x) {
    const { n, left, span } = geoRef.current;
    if (!n) return;
    // +8 — компенсация marginLeft: -8 у LineChart
    const idx = Math.min(n - 1, Math.max(0, Math.round((x + 8 - left) / span)));
    if (idx !== lastIdxRef.current) {
      lastIdxRef.current = idx;
      setSelected(idx);
      Haptics.selectionAsync();
    }
  }

  function clear() {
    lastIdxRef.current = -1;
    setSelected(null);
  }

  if (!series) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>Loading chart...</Text>
      </View>
    );
  }

  const { values, times, first, last, high, low } = series;
  const n = values.length;

  const isPositive = last >= first;
  const lineColor = isPositive ? THEME.up : THEME.down;

  const shownIndex = selected !== null && selected < n ? selected : null;
  const shownValue = shownIndex !== null ? values[shownIndex] : last;
  const delta = first ? ((shownValue - first) / first) * 100 : 0;
  const deltaUp = delta >= 0;
  const deltaColor = deltaUp ? THEME.up : THEME.down;

  /* ----- Y-ось ----- */
  const min = Math.min(...values);
  const max = Math.max(...values);
  const step = (max - min) / SEGMENTS;
  const yDecimals =
    step > 0 ? Math.min(10, Math.max(0, Math.ceil(-Math.log10(step)) + 1)) : 4;

  const formatYLabel = (value) => {
    const num = parseFloat(value);
    if (isNaN(num)) return '0';
    return num.toLocaleString('en-US', {
      minimumFractionDigits: yDecimals,
      maximumFractionDigits: yDecimals,
    });
  };

  const gutter = Math.max(
    40,
    Math.ceil(`$${formatYLabel(String(max))}`.length * fontSize * 0.6) + 10,
  );

  geoRef.current = { n, left: gutter, span: (svgWidth - gutter) / n };

  /* ----- X-ось: подпись только под нужными точками ----- */
  let desired = 6;
  if (width >= 400) desired = 8;
  if (width >= 500) desired = 10;
  if (is30DSelected) desired = Math.max(4, Math.floor(desired * 0.8));
  const labelStep = Math.max(1, Math.floor(n / desired));
  const labels = new Array(n).fill('');
  let prevLabel = '';
  for (let i = 0; i < n; i += labelStep) {
    const l = formatAxisLabel(times[i], chartDays);
    if (l && l !== prevLabel) {
      labels[i] = l;
      prevLabel = l;
    }
  }

  const renderDotContent = ({ x, y, index }) => {
    if (index === shownIndex) {
      return (
        <G key={`sel-${index}`}>
          <Line
            x1={x}
            x2={x}
            y1={PADDING_TOP}
            y2={PLOT_BOTTOM}
            stroke={THEME.cross}
            strokeWidth={1}
            strokeDasharray='3,3'
          />
          <Circle cx={x} cy={y} r={9} fill={lineColor} fillOpacity={0.18} />
          <Circle
            cx={x}
            cy={y}
            r={4}
            fill={THEME.bg}
            stroke={lineColor}
            strokeWidth={2}
          />
        </G>
      );
    }
    if (shownIndex === null && index === n - 1) {
      return (
        <G key={`live-${index}`}>
          <Circle cx={x} cy={y} r={8} fill={lineColor} fillOpacity={0.2} />
          <Circle cx={x} cy={y} r={3.5} fill={lineColor} />
        </G>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {/* Цена + изменение */}
      <View style={ui.header}>
        <View>
          <Text style={ui.caption}>
            {shownIndex !== null
              ? formatFullTime(times[shownIndex], chartDays)
              : 'LAST PRICE'}
          </Text>
          <Text style={ui.price}>{formatPrice(shownValue)}</Text>
        </View>
        <View
          style={[
            ui.pill,
            {
              backgroundColor: deltaUp
                ? 'rgba(16, 185, 129, 0.12)'
                : 'rgba(239, 68, 68, 0.12)',
            },
          ]}
        >
          <Text style={[ui.pillText, { color: deltaColor }]}>
            {deltaUp ? '+' : '−'}
            {Math.abs(delta).toFixed(2)}%
          </Text>
        </View>
      </View>

      <View style={[styles.chartOuterContainer, { height: CHART_HEIGHT }]}>
        <LineChart
          data={{
            labels,
            datasets: [
              {
                data: values,
                strokeWidth: 1.75,
                color: () => lineColor,
              },
            ],
          }}
          width={svgWidth}
          height={CHART_INNER_HEIGHT}
          withVerticalLines={false}
          withHorizontalLines
          withInnerLines
          withOuterLines={false}
          withShadow
          withDots
          fromZero={false}
          formatYLabel={formatYLabel}
          segments={SEGMENTS}
          yAxisOffset={0}
          yAxisLabel='$'
          yAxisSuffix=''
          getDotColor={() => 'transparent'}
          getDotProps={() => ({ r: '0', strokeWidth: '0' })}
          renderDotContent={renderDotContent}
          chartConfig={{
            backgroundColor: THEME.bg,
            backgroundGradientFrom: THEME.bg,
            backgroundGradientTo: THEME.bg,
            decimalPlaces: yDecimals,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity * 0.1})`,
            labelColor: () => THEME.label,
            fillShadowGradient: lineColor,
            fillShadowGradientOpacity: 0.22,
            fillShadowGradientFrom: lineColor,
            fillShadowGradientFromOpacity: 0.22,
            fillShadowGradientTo: THEME.bg,
            fillShadowGradientToOpacity: 0,
            style: { borderRadius: 12 },
            paddingLeft: 30,
            paddingRight: gutter,
            paddingTop: PADDING_TOP,
            paddingBottom: 20,
            propsForBackgroundLines: {
              strokeWidth: 1,
              stroke: THEME.grid,
              strokeDasharray: '2,6',
            },
            propsForLabels: { fontSize, fontWeight: '500' },
            propsForVerticalLabels: { fontSize, dx: 0 },
            propsForHorizontalLabels: {
              fontSize: fontSize - 1,
              rotation: 0,
              dy: 8,
            },
          }}
          bezier
          style={{ marginLeft: -8, marginRight: -20, borderRadius: 12 }}
        />
        <View style={ui.overlay} {...pan.panHandlers} />
      </View>

      {/* High / Low / Range */}
      <View style={ui.stats}>
        <View style={ui.stat}>
          <Text style={ui.statLabel}>HIGH</Text>
          <Text style={ui.statValue}>{formatPrice(high)}</Text>
        </View>
        <View style={ui.stat}>
          <Text style={ui.statLabel}>LOW</Text>
          <Text style={ui.statValue}>{formatPrice(low)}</Text>
        </View>
        <View style={ui.stat}>
          <Text style={ui.statLabel}>RANGE</Text>
          <Text style={ui.statValue}>
            {low ? (((high - low) / low) * 100).toFixed(2) : '0.00'}%
          </Text>
        </View>
      </View>
    </View>
  );
};

const ui = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 6,
    paddingBottom: 4,
  },
  caption: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.2,
    color: THEME.muted,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: THEME.text,
    marginTop: 2,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  pillText: { fontSize: 12, fontWeight: '700' },
  overlay: { ...StyleSheet.absoluteFillObject },
  stats: {
    flexDirection: 'row',
    marginTop: 6,
    marginHorizontal: 8,
    paddingTop: 10,
    paddingBottom: 6,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: THEME.border,
  },
  stat: { flex: 1, alignItems: 'center' },
  statLabel: {
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1,
    color: THEME.muted,
  },
  statValue: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.text,
    marginTop: 3,
  },
});
