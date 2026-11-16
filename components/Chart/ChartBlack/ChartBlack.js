import { View, Dimensions, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { styles } from './ChartBlack.styles';

const CHART_WIDTH_PERCENTAGE = 0.78;
const CHART_HEIGHT = 200;
const CHART_INNER_HEIGHT = 190;

export const ChartBlack = ({
  coinHistoryData,
  chartData,
  is30DSelected,
  chartDays = 1,
}) => {
  const { width } = Dimensions.get('window');
  const chartWidth = width * CHART_WIDTH_PERCENTAGE;

  if (
    !coinHistoryData ||
    coinHistoryData.length === 0 ||
    !chartData?.prices ||
    chartData.prices.length === 0
  ) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>Loading chart...</Text>
      </View>
    );
  }

  const prices = chartData.prices;
  const isPositive = prices[prices.length - 1] > prices[0];
  const lineColor = isPositive ? '#00C853' : '#FF3B30';

  /* ------------------------- Y-ось ------------------------- */

  const formatYLabel = (value) => {
    const num = parseFloat(value);
    if (isNaN(num)) return '0';

    if (Math.abs(num) < 0.000001 && num !== 0) return num.toExponential(3);
    if (Math.abs(num) < 0.001 && num !== 0) return num.toFixed(6);
    if (Math.abs(num) < 1) return num.toFixed(4);

    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const hasSmallNumbers = () => Math.min(...prices) < 0.001;

  const getDecimalPlaces = () => (hasSmallNumbers() ? 6 : 2);

  const getSegments = () => {
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min;
    if (range < 0.001) return 6;
    if (range < 0.1) return 5;
    return 4;
  };

  /* ------------------------- X-ось ------------------------- */

  const getTimestamps = () => {
    if (
      Array.isArray(chartData.timestamps) &&
      chartData.timestamps.length === prices.length
    ) {
      return chartData.timestamps.map((t) => (t < 1e12 ? t * 1000 : t));
    }
    if (
      Array.isArray(chartData.labelDate) &&
      chartData.labelDate.length === prices.length
    ) {
      const parsed = chartData.labelDate.map((raw) => {
        if (typeof raw === 'number') return raw < 1e12 ? raw * 1000 : raw;
        const t = Date.parse(raw);
        return isNaN(t) ? null : t;
      });
      if (parsed.every((t) => t !== null)) return parsed;
    }

    const now = Date.now();
    const spanMs = Math.max(1, chartDays) * 24 * 60 * 60 * 1000;
    const step = spanMs / Math.max(1, prices.length - 1);
    return prices.map((_, i) => now - spanMs + i * step);
  };

  const formatLabel = (ts) => {
    const d = new Date(ts);
    if (!isFinite(d.getTime())) return '';

    if (chartDays === 1) {
      return d.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    return d.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
    });
  };

  const getFilteredLabels = () => {
    const timestamps = getTimestamps();
    if (!timestamps.length) return [];

    const screenWidth = Dimensions.get('window').width;
    let desiredLabelsCount = 6;
    if (screenWidth >= 400) desiredLabelsCount = 8;
    if (screenWidth >= 500) desiredLabelsCount = 10;
    if (is30DSelected)
      desiredLabelsCount = Math.max(4, Math.floor(desiredLabelsCount * 0.8));

    const step = Math.max(1, Math.floor(timestamps.length / desiredLabelsCount));

    const seen = new Set();
    const result = [];
    for (let i = 0; i < timestamps.length; i += step) {
      const label = formatLabel(timestamps[i]);
      if (!label || seen.has(label)) continue;
      seen.add(label);
      result.push(label);
    }

    if (result.length === 0) {
      return [formatLabel(timestamps[timestamps.length - 1])];
    }

    return result.slice(0, 10);
  };

  const getFontSize = () => {
    if (width < 350) return 7;
    if (width < 400) return 8;
    return 9;
  };

  const filteredLabels = getFilteredLabels();

  return (
    <View style={styles.container}>
      <View style={[styles.chartOuterContainer, { height: CHART_HEIGHT }]}>
        <LineChart
          data={{
            labels: filteredLabels,
            datasets: [
              {
                data: prices,
                strokeWidth: 1.5,
                color: () => lineColor,
              },
            ],
          }}
          width={chartWidth + 40}
          height={CHART_INNER_HEIGHT}
          withVerticalLines={false}
          withHorizontalLines={true}
          withDots={false}
          withInnerLines={false}
          withOuterLines={false}
          fromZero={false}
          formatYLabel={formatYLabel}
          segments={getSegments()}
          yAxisOffset={0}
          chartConfig={{
            backgroundColor: '#1A1F2E',
            backgroundGradientFrom: '#1A1F2E',
            backgroundGradientTo: '#1A1F2E',
            decimalPlaces: getDecimalPlaces(),
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity * 0.1})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity * 0.6})`,
            style: { borderRadius: 12 },
            paddingLeft: 30,
            paddingRight: 40,
            paddingTop: 15,
            paddingBottom: 20,
            propsForBackgroundLines: {
              strokeWidth: 1,
              stroke: 'rgba(255, 255, 255, 0.1)',
              strokeDasharray: '3,3',
            },
            propsForLabels: {
              fontSize: getFontSize(),
              fontWeight: '500',
            },
            propsForVerticalLabels: {
              fontSize: getFontSize(),
              dx: 0,
            },
            propsForHorizontalLabels: {
              fontSize: getFontSize() - 1,
              rotation: 0,
              dy: 8,
            },
          }}
          bezier
          style={{
            marginLeft: -8,
            marginRight: -20,
            borderRadius: 12,
          }}
          yAxisLabel={hasSmallNumbers() ? '$' : ''}
          yAxisSuffix=''
          getDotProps={(value, index) => {
            const total = prices.length;
            if (index >= total - 1) {
              return { r: '0', strokeWidth: '0' };
            }
            return {};
          }}
        />
      </View>

      {hasSmallNumbers() && (
        <View style={styles.smallNumberIndicator}>
          <Text style={styles.smallNumberText}>
            ⚡ Displaying values with high precision
          </Text>
        </View>
      )}
    </View>
  );
};
