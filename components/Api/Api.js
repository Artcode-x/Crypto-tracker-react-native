import axios from "axios"

export async function GetMarketData() {
  const response = await axios.get(
    //  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=7d"
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=7d"
  )
  const data = response.data
  return data
}

export async function FetchCoinHistoricalData(coinId, switchChartDays) {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${switchChartDays}`
  ) // Получаем данные для графика за разные таймфреймы/дни
  if (!response.ok) {
    throw new Error("Ошибка при получении данных")
  }
  const result = await response.json()
  return result.prices
}
