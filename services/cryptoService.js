import axios from "axios"

export const getMarketData = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d"
    )
    const data = response.data

    return data
  } catch (error) {
    console.log(error.message)
  }
}
