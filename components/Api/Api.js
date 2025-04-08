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

export async function Get24hrMinMaxPrices(symbol) {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}USDT`
    )
    const data = await response.json()

    if (!data || Object.keys(data).length === 0) {
      console.log("Нет данных для данного символа.")
      return
    }

    const minPrice = parseFloat(data.lowPrice) // Минимальная цена за 24 часа
    const maxPrice = parseFloat(data.highPrice) // Максимальная цена за 24 часа
    return { minPrice, maxPrice }
    // console.log(`Минимальная цена за 24 часа: ${minPrice}`)
    // console.log(`Максимальная цена за 24 часа: ${maxPrice}`)
  } catch (error) {
    console.error("Ошибка при получении данных:", error)
  }
}

export async function FetchCandleData(symbol, days) {
  try {
    const response = await axios.get(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=${days}&limit=10`
    )
    const prices = response.data.map((item) => ({
      time: new Date(item[0]).toLocaleString(),
      open: parseFloat(item[1]),
      high: parseFloat(item[2]),
      low: parseFloat(item[3]),
      close: parseFloat(item[4]),
      volume: parseFloat(item[5])
    }))

    return prices
  } catch (error) {
    console.log(error.message)
    return []
  }
}
