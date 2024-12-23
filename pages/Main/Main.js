import React, { useEffect, useState } from "react";
import {styles} from './Main.styles'
import {
  View,
  Text,
  StatusBar,
  TextInput,
  Modal,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { getMarketData } from "../../services/cryptoService";
import { removeYearFromDate, uniqueDates } from "../../helpers/helpers";
import { LineChart } from "react-native-chart-kit";
import CoinList from "../../components/CoinList/CoinList";
import { pick } from "lodash";
import { CandleChart } from "react-native-wagmi-charts";

const Main = () => {
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const [selectedCoinData, setSelectedCoinData] = useState(null);
  const [coinHistoryData, setCoinHistoryData] = useState([]); // Добавлено для хранения исторических данных
  const [modalVisible, setModalVisible] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [chartDays, setChartDays] = useState('1')
  const [flagForLoader, setFlagForLoader] = useState(false)
   
  const fetchMarketData = async () => {
    try {
      setFlagForLoader(true)
      const marketData = await getMarketData();
      setData(marketData);
    } catch (error) {
      console.log(error.message);
    } finally {
      setFlagForLoader(false)
    }
   

    // Для обновления избранного
    // marketData.forEach(coin => {

    //   const coinData = {
    //     name: coin.name,
    //     current_price: coin.current_price,
    //     price_change_percentage_24h: coin.price_change_percentage_24h,
    //     image: coin.image,
    //     otherInfo: coin.otherInfo,
    //     market_cap_rank: coin.market_cap_rank,
    //     symbol: coin.symbol,
    //   };
    //   dispatch(updateFavorite(test));
    //  });
  };
  
  //  Авто-обновления котировок на главной
  useEffect(() => {
    fetchMarketData(); // Получаем данные при первом монтировании компонента
    const interval = setInterval(() => {
      fetchMarketData();
 console.log('data update');
    }, 60000);
 // Очистка интервала при размонтировании компонента
  return () => clearInterval(interval);
}, []);

  const fetchCoinHistoricalData = async (coinId, chartDays) => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${chartDays}`
    ); // Получаем данные для графика за разные таймфреймы/дни
    if (!response.ok) {
      throw new Error("Ошибка при получении данных");
    }
    const result = await response.json();
    return result.prices;
  };

  const openModal = async (item) => {
    setSelectedCoinData(item);
    setModalVisible(true);
    setIsLoading(true);
    try {
      const historicalData = await fetchCoinHistoricalData(item.id);
      setCoinHistoryData(historicalData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCoinData(null);
    setCoinHistoryData([]); // Сбрасываем исторические данные при закрытии
  };

  const prepareChartData = (data) => {
    const labels = data.map(([timestamp]) =>
      new Date(timestamp).toLocaleDateString()
    ); // Получаем метки для графика

    const uniquedates = uniqueDates(labels);
    const labelDate = removeYearFromDate(uniquedates);
    const prices = data.map(([, price]) => price);
    return { labelDate, prices };
  };

  const chartData = prepareChartData(coinHistoryData);

  const openChart = (days) => {
    setChartDays(days)
  }
 
// Для получения новых исторических данных при изменении chartDays(таймфрейм недельки/дни), чтобы данные на графике менялись не закрывая его.
// При переключении Таймфрейма график будет перерисован
useEffect(() => {
  if (selectedCoinData) { // Проверяем, выбрана ли монета
    const fetchHistoricalData = async () => {
      setIsLoading(true);
      try {
        const historicalData = await fetchCoinHistoricalData(selectedCoinData.id, chartDays);
        setCoinHistoryData(historicalData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistoricalData();
  }
}, [chartDays, selectedCoinData]); 

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0e0275" />
      <View style={styles.header}>
        <Text style={styles.title}>CryptoCurrencies</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Cryptos"
          placeholderTextColor="#858585"
          onChangeText={(text) => text && setSearch(text)}
        />
      </View>
      {flagForLoader ? ( <ActivityIndicator size="large" color="red" />) : ( 
    // ...flatlist...
    <CoinList 
    data={data}
    openModal={openModal}
    refreshing={refreshing}
    setRefreshing={setRefreshing}
    search={search}
    fetchMarketData={fetchMarketData}
    />
      )}
     
     
      {/* Модальное окно с графиком */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedCoinData && (
              <>
                <Text style={styles.modalTitle}>{selectedCoinData.name}</Text>
                {isloading ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : null}
                {/* График */}
                <View>
                  {coinHistoryData.length > 0 && (
                    <LineChart
                      data={{
                        labels: chartData.labelDate,
                        datasets: [
                          {
                            data: chartData.prices,
                            strokeWidth: 4, // толщина линии
                            // Цвет линии: Логика определения цвета была изменена таким образом, чтобы проверять только последние две цены: lastPrice и previousPrice. Если последняя цена выше предыдущей, линия становится зеленой, если ниже — красной.
                            color: (opacity = 1) => {
                              const lastPrice =
                                chartData.prices[chartData.prices.length - 1];
                              const previousPrice =
                                chartData.prices[chartData.prices.length - 2];
                              return lastPrice > previousPrice
                                ? `rgba(0, 255, 0, ${opacity})` // зеленый цвет при росте
                                : `rgba(255, 0, 0, ${opacity})`; // красный цвет при падении
                            },
                          },
                        ],
                      }}
                      width={Dimensions.get("window").width * 0.9} // Ширина графика
                      height={400}
                      chartConfig={{
                        backgroundColor: "#ffffff",
                        backgroundGradientFrom: "#ffffff",
                        backgroundGradientTo: "#ffffff",
                        decimalPlaces: 2,
                        color: (opacity = 1) => `none`,
                        labelColor: (opacity = 1) => `black`, // Цвет меток
                        style: {
                          borderRadius: 16,
                          borderWidth: 1, // Установите ширину границы
                          // borderColor: "#e0e0e0", // Цвет границы
                        },
                        propsForDots: {
                          r: "0", // радиус 0, чтобы скрыть точки
                        },
                        
                        // propsForHorizontalLines: {
                        //   strokeDasharray: "", // Сплошная линия
                        // },
                        // Новый стиль для меток
                        propsForLabels: {
                          fontSize: 10, // Уменьшение шрифта меток
                        },
                      }}
                      // bezier //  Bezier для сплошных линий
                      style={{
                        marginVertical: 10,
                        borderRadius: 16,
                        elevation: 10,
                      // borderColor: "#e0e0e0", // Цвет границы графика
                      }}
                    />
                  )}
                 
                </View>
{isloading ? (null) : ( 
<>
    <Text>Выбранный диапазон дней: {chartDays}</Text>
    <View style={styles.chartButtons}>
      <TouchableOpacity onPress={() => openChart(1)}>
        <Text style={[styles.chartButton, chartDays === 1 && styles.activeButton]}>
          <Text style={[styles.buttonText, chartDays === 1 && styles.activeButtonText]}>24H</Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openChart(7)}>
        <Text style={[styles.chartButton, chartDays === 7 && styles.activeButton]}>
          <Text style={[styles.buttonText, chartDays === 7 && styles.activeButtonText]}>7D</Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openChart(14)}>
        <Text style={[styles.chartButton, chartDays === 14 && styles.activeButton]}>
          <Text style={[styles.buttonText, chartDays === 14 && styles.activeButtonText]}>14D</Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openChart(30)}>
        <Text style={[styles.chartButton, chartDays === 30 && styles.activeButton]}>
          <Text style={[styles.buttonText, chartDays === 30 && styles.activeButtonText]}>30D</Text>
        </Text>
      </TouchableOpacity>
    </View>
  </>

 )}
                <TouchableOpacity
                  onPress={closeModal}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};


export default Main;
