import axios from "axios"
// import moment from "moment"

// const formatSparkline = (numbers) => {
//   const sevenDaysAgo = moment().subtract(7, "days").unix()
//   let formattedSparkline = numbers.map((item, index) => {
//     return {
//       x: sevenDaysAgo + (index + 1) * 3600,
//       y: item,
//     }
//   })

//   return formattedSparkline
// }

// export const getHistoricalData = async (coinId) => {
//   try {
//     const response = await fetch(`https://api.example.com/historical/${coinId}`) // Замените на ваш реальный URL API
//     if (!response.ok) {
//       throw new Error(`Ошибка при получении данных: ${response.status}`)
//     }
//     const data = await response.json()
//     return data // Предполагается, что API возвращает объект, содержащий historicalData.prices
//   } catch (error) {
//     console.error("Ошибка в getHistoricalData:", error)
//     throw error // Пробрасываем ошибку выше для дальнейшей обработки
//   }
// }

// const formatMarketData = (data) => {
//   let formattedData = []

//   data.forEach((item) => {
//     const formattedSparkline = formatSparkline(item.sparkline_in_7d.price)

//     const formattedItem = {
//       ...item,
//       sparkline_in_7d: {
//         price: formattedSparkline,
//       },
//     }

//     formattedData.push(formattedItem)
//   })

//   return formattedData
// }

// export const getMarketData = async () => {
//   try {
//     const response = await axios.get(
//       "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d"
//     )
//     const data = response.data
//     const formattedResponse = formatMarketData(data)
//     return formattedResponse
//   } catch (error) {
//     console.log(error.message)
//   }
// }

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
