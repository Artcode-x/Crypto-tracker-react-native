import axios from "axios"

export const FetchCandleData = async (symbol) => {
  try {
    const response = await axios.get(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1h&limit=10`
    )
    const prices = response.data.map((item) => ({
      time: new Date(item[0]).toLocaleString(),
      open: parseFloat(item[1]),
      high: parseFloat(item[2]),
      low: parseFloat(item[3]),
      close: parseFloat(item[4])
    }))

    return prices
  } catch (error) {
    console.log(error.message)
  }
}
