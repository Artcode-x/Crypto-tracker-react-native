const fetchCoinHistoricalData = async (coinId, switchChartDays) => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${switchChartDays}`
    ); // Получаем данные для графика за разные таймфреймы/дни
    if (!response.ok) {
      throw new Error("Ошибка при получении данных");
    }
    const result = await response.json();
    return result.prices;
  };

  export default fetchCoinHistoricalData