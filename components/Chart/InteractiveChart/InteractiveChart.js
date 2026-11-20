import { useEffect, useMemo, useRef, useState } from 'react';
import { View, Dimensions, Text, StyleSheet, PanResponder } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import { LineChart } from 'react-native-chart-kit';

import { styles as extStyles } from './InteractiveChart.styles';

const CHART_WIDTH_PERCENTAGE = 0.78;
const CHART_INNER_HEIGHT = 190;
const CHART_OUTER_HEIGHT = 200;
const PADDING_TOP = 15;
const PLOT_HEIGHT = (CHART_INNER_HEIGHT * 3) / 4;
const PLOT_BOTTOM = PADDING_TOP + PLOT_HEIGHT;
const SEGMENTS = 4;
const MAX_POINTS = 72;
const CHART_MARGIN_LEFT = -8;
const AUTO_HIDE_MS = 1500;

const THEMES = {
  dark: {
    bg: '#0F121B',
    grid: 'rgba(255, 255, 255, 0.07)',
    label: 'rgba(255, 255, 255, 0.5)',
    text: '#FFFFFF',
    muted: 'rgba(255, 255, 255, 0.45)',
    cross: 'rgba(255, 255, 255, 0.35)',
    border: 'rgba(212, 175, 55, 0.25)',
    up: '#00C853',
    down: '#FF3B30',
    pillUp: 'rgba(0, 200, 83, 0.14)',
    pillDown: 'rgba(255, 59, 48, 0.14)',
    labelColor: `rgba(255, 255, 255, 0.6)`,
    gridLineColor: `rgba(255, 255, 255, 0.1)`,
  },
  light: {
    // bg: '#FFFFFF',
    bg: '#F5F7FA',
    grid: 'rgba(0, 0, 0, 0.08)',
    label: 'rgba(0, 0, 0, 0.55)',
    text: '#0F172A',
    muted: 'rgba(0, 0, 0, 0.45)',
    cross: 'rgba(0, 0, 0, 0.35)',
    border: 'rgba(212, 175, 55, 0.45)',
    up: '#10B981',
    down: '#EF4444',
    pillUp: 'rgba(16, 185, 129, 0.12)',
    pillDown: 'rgba(239, 68, 68, 0.12)',
    labelColor: `rgba(0, 0, 0, 0.6)`,
    gridLineColor: `rgba(0, 0, 0, 0.1)`,
  },
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

export const InteractiveChart = ({
  coinHistoryData,
  chartData,
  is30DSelected,
  chartDays = 1,
  isDark = true,
  onScrubChange,
}) => {
  const THEME = isDark ? THEMES.dark : THEMES.light;

  const { width } = Dimensions.get('window');
  const chartWidth = width * CHART_WIDTH_PERCENTAGE;
  const svgWidth = chartWidth + 40;
  const fontSize = getFontSize(width);

  const [selected, setSelected] = useState(null);
  const [dotPos, setDotPos] = useState({ x: 0, y: 0 });

  const lastIdxRef = useRef(-1);
  const hideTimerRef = useRef(null);
  const scrubCbRef = useRef(onScrubChange);
  scrubCbRef.current = onScrubChange;

  // ref на функцию pick, чтобы PanResponder всегда видел актуальную
  const pickRef = useRef(() => {});
  const endRef = useRef(() => {});

  const rawPrices = chartData?.prices;
  const pricesLen = Array.isArray(rawPrices) ? rawPrices.length : 0;
  const hasData = !!coinHistoryData?.length && pricesLen > 1;

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
  }, [hasData, chartData, chartDays, rawPrices]);

  // сброс при смене периода/данных
  useEffect(() => {
    clearTimeout(hideTimerRef.current);
    lastIdxRef.current = -1;
    setSelected(null);
    scrubCbRef.current?.(false);
  }, [pricesLen, chartDays]);

  // cleanup
  useEffect(
    () => () => {
      clearTimeout(hideTimerRef.current);
      scrubCbRef.current?.(false);
    },
    [],
  );

  const n = series?.values.length ?? 0;

  // ---- PanResponder ----
  const pan = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: (e) => {
          clearTimeout(hideTimerRef.current);
          scrubCbRef.current?.(true);
          pickRef.current(e.nativeEvent.locationX);
        },
        onPanResponderMove: (e) => pickRef.current(e.nativeEvent.locationX),
        onPanResponderRelease: () => {
          endRef.current();
        },
        onPanResponderTerminate: () => endRef.current(),
      }),
    [],
  );

  // обновляем pickRef при каждом рендере (n меняется)
  pickRef.current = (x) => {
    if (!n) return;
    const idx = Math.min(n - 1, Math.max(0, Math.round((x / svgWidth) * (n - 1))));
    if (idx !== lastIdxRef.current) {
      lastIdxRef.current = idx;
      setSelected(idx);
    }
  };

  endRef.current = () => {
    scrubCbRef.current?.(false);
    clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      lastIdxRef.current = -1;
      setSelected(null);
    }, AUTO_HIDE_MS);
  };

  if (!series) {
    return (
      <View style={extStyles.noDataContainer}>
        <Text style={[extStyles.noDataText, { color: THEME.muted }]}>
          Loading chart...
        </Text>
      </View>
    );
  }

  const { values, times, first, last, high, low } = series;

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
  const range = max - min || 1;
  const step = range / SEGMENTS;
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

  /* ----- X-ось ----- */
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

  /*
   * ВАЖНО: chart-kit сам считает координаты точек. Мы ловим их через
   * renderDotContent и сохраняем в dotPos, а рисуем маркер в Svg-оверлее.
   * Это гарантирует, что маркер попадёт ровно в точку на графике.
   */
  const renderDotContent = ({ x, y, index }) => {
    const targetIndex = shownIndex !== null ? shownIndex : n - 1;
    if (index === targetIndex) {
      // сохраняем координаты для Svg-оверлея
      if (dotPos.x !== x || dotPos.y !== y) {
        // setState в рендере нельзя — откладываем
        queueMicrotask(() => setDotPos({ x, y }));
      }
    }
    return null; // ничего не рисуем через chart-kit
  };

  return (
    // <View style={extStyles.container}>
    <View style={[extStyles.container, { backgroundColor: THEME.bg }]}>
      {/* Шапка: цена + % */}
      <View style={ui.header}>
        <View>
          <Text style={[ui.caption, { color: THEME.muted }]}>
            {shownIndex !== null
              ? formatFullTime(times[shownIndex], chartDays)
              : 'LAST PRICE'}
          </Text>
          <Text style={[ui.price, { color: THEME.text }]}>{formatPrice(shownValue)}</Text>
        </View>
        <View
          style={[ui.pill, { backgroundColor: deltaUp ? THEME.pillUp : THEME.pillDown }]}
        >
          <Text style={[ui.pillText, { color: deltaColor }]}>
            {deltaUp ? '+' : '−'}
            {Math.abs(delta).toFixed(2)}%
          </Text>
        </View>
      </View>

      {/* График + слой взаимодействия */}
      <View
        style={[extStyles.chartOuterContainer, { height: CHART_OUTER_HEIGHT }]}
        collapsable={false}
        {...pan.panHandlers}
      >
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
            color: (opacity = 1) => THEME.gridLineColor,
            labelColor: () => THEME.label,
            fillShadowGradient: lineColor,
            fillShadowGradientOpacity: isDark ? 0.28 : 0.22,
            fillShadowGradientFrom: lineColor,
            fillShadowGradientFromOpacity: isDark ? 0.28 : 0.22,
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
          style={{
            marginLeft: CHART_MARGIN_LEFT,
            marginRight: -20,
            borderRadius: 12,
          }}
        />

        {/* Svg-оверлей: кроссхэйр + маркер. pointerEvents=none, чтобы не мешать жестам */}
        <Svg
          //   style={StyleSheet.absoluteFill}
          style={[StyleSheet.absoluteFill, { left: CHART_MARGIN_LEFT }]}
          pointerEvents='none'
          width={svgWidth}
          height={CHART_INNER_HEIGHT}
        >
          {shownIndex !== null && (
            <Line
              x1={dotPos.x}
              x2={dotPos.x}
              y1={PADDING_TOP}
              y2={PLOT_BOTTOM}
              stroke={THEME.cross}
              strokeWidth={1}
              strokeDasharray='3,3'
            />
          )}
          <Circle cx={dotPos.x} cy={dotPos.y} r={9} fill={lineColor} fillOpacity={0.2} />
          {shownIndex !== null ? (
            <Circle
              cx={dotPos.x}
              cy={dotPos.y}
              r={4.5}
              fill={THEME.bg}
              stroke={lineColor}
              strokeWidth={2}
            />
          ) : (
            <Circle cx={dotPos.x} cy={dotPos.y} r={3.5} fill={lineColor} />
          )}
        </Svg>
      </View>

      {/* High / Low / Range */}
      <View style={[ui.stats, { borderTopColor: THEME.border }]}>
        <View style={ui.stat}>
          <Text style={[ui.statLabel, { color: THEME.muted }]}>HIGH</Text>
          <Text style={[ui.statValue, { color: THEME.text }]}>{formatPrice(high)}</Text>
        </View>
        <View style={ui.stat}>
          <Text style={[ui.statLabel, { color: THEME.muted }]}>LOW</Text>
          <Text style={[ui.statValue, { color: THEME.text }]}>{formatPrice(low)}</Text>
        </View>
        <View style={ui.stat}>
          <Text style={[ui.statLabel, { color: THEME.muted }]}>RANGE</Text>
          <Text style={[ui.statValue, { color: THEME.text }]}>
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
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 2,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  pillText: { fontSize: 12, fontWeight: '700' },
  stats: {
    flexDirection: 'row',
    marginTop: 6,
    marginHorizontal: 8,
    paddingTop: 10,
    paddingBottom: 6,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  stat: { flex: 1, alignItems: 'center' },
  statLabel: {
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1,
  },
  statValue: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 3,
  },
});
