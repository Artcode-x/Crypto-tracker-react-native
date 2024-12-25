import React, { useEffect, useState } from "react";
import {styles} from './Main.styles'
import {
  View,
  Text,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { getMarketData } from "../../services/cryptoService";
import CoinList from "../../components/CoinList/CoinList";
import prepareChartData from '../../components/PrepareChartData/PrepareChartData'
import { Chart } from "../../components/Chart/Chart";
import { useSelector } from "react-redux";
import { daysSelector } from "../../store/toolkitSelectors";
import { pick } from "lodash";
import { CandleChart } from "react-native-wagmi-charts";
import fetchCoinHistoricalData from "../../components/fetchCoinHistoricalData/fetchCoinHistoricalData";

const Main = () => {
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const [selectedCoinData, setSelectedCoinData] = useState(null);
  const [coinHistoryData, setCoinHistoryData] = useState([]); // Добавлено для хранения исторических данных
  const [modalVisible, setModalVisible] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [flagForLoader, setFlagForLoader] = useState(false)

  const switchChartDays = useSelector(daysSelector)

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

  const chartData = prepareChartData(coinHistoryData);

// Для получения новых исторических данных при изменении chartDays(таймфрейм недельки/дни), чтобы данные на графике менялись не закрывая его.
// При переключении Таймфрейма график будет перерисован
useEffect(() => {
  if (selectedCoinData) { // Проверяем, выбрана ли монета
    const fetchHistoricalData = async () => {
      setIsLoading(true);
      try {
        const historicalData = await fetchCoinHistoricalData(selectedCoinData.id, switchChartDays);
        setCoinHistoryData(historicalData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistoricalData();
  }

  
}, [switchChartDays, selectedCoinData]); 

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
    <Chart 
    selectedCoinData={selectedCoinData}
    chartData={chartData}
    modalVisible={modalVisible}
    closeModal={closeModal}
    isloading={isloading}
    coinHistoryData={coinHistoryData}
    />
    </View>
  );
};


export default Main;
