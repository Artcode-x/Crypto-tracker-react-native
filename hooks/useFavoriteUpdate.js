import { useEffect, useRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { coinSelector } from "../store/toolkitSelectors"
import { UpdateFavoriteCoins } from "../components/Api/Api"
import { rewriteFavorite } from "../store/reducersSlice"

export const useFavoriteUpdate = (intervalMinutes = 1) => {
  const dispatch = useDispatch()
  const favoriteCoins = useSelector(coinSelector)
  const updateIntervalRef = useRef(null)
  const isUpdatingRef = useRef(false)
  const updateCountRef = useRef(0)
  const lastUpdateTimeRef = useRef(Date.now())

  // Функция обновления цен избранных монет
  const updateFavoritePrices = useCallback(async () => {
    // Проверка, прошло ли достаточно времени с последнего обновления
    const now = Date.now()
    const timeSinceLastUpdate = now - lastUpdateTimeRef.current

    if (timeSinceLastUpdate < 60000) {
      // Минимум 60 секунд между обновлениями
      console.log(
        `Слишком рано для обновления, ждем... (${Math.round(
          (60000 - timeSinceLastUpdate) / 1000
        )} сек)`
      )
      return
    }

    updateCountRef.current += 1
    const updateNumber = updateCountRef.current

    // Если нет избранных монет или уже идет обновление
    if (!favoriteCoins || favoriteCoins.length === 0) {
      console.log(`Обновление #${updateNumber}: Нет избранных монет`)
      return
    }

    if (isUpdatingRef.current) {
      console.log(`Обновление #${updateNumber}: Уже идет обновление`)
      return
    }

    isUpdatingRef.current = true
    const startTime = Date.now()
    lastUpdateTimeRef.current = now

    console.log(`\n ==== ОБНОВЛЕНИЕ ИЗБРАННОГО #${updateNumber} ====`)
    console.log(
      `Время с последнего обновления: ${Math.round(timeSinceLastUpdate / 1000)} сек`
    )
    console.log(`Монет для обновления: ${favoriteCoins.length}`)
    console.log(
      `ID монет: ${favoriteCoins.map((c) => c.symbol.toUpperCase()).join(", ")}`
    )

    try {
      // Получение ID всех избранных монет
      const coinIds = favoriteCoins.map((coin) => coin.id)

      // Добавляем задержку между запросами
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log(`Отправляем запрос на обновление...`)
      const updatedCoins = await UpdateFavoriteCoins(coinIds)

      if (updatedCoins && updatedCoins.length > 0) {
        const endTime = Date.now()
        const duration = endTime - startTime

        console.log(`Успешно обновлено ${updatedCoins.length} монет`)
        console.log(`Время обновления: ${duration}ms`)

        // Объединяем старые данные с новыми
        console.log(`Объединяем данные...`)
        const mergedCoins = favoriteCoins.map((oldCoin) => {
          const updatedCoin = updatedCoins.find((c) => c.id === oldCoin.id)

          if (updatedCoin) {
            return {
              ...oldCoin,
              current_price: updatedCoin.current_price,
              price_change_percentage_24h: updatedCoin.price_change_percentage_24h,
              market_cap: updatedCoin.market_cap,
              market_cap_rank: updatedCoin.market_cap_rank,
              sparkline_in_7d: updatedCoin.sparkline_in_7d,
              // Сохранение пользовательских данных
              userAmount: oldCoin.userAmount,
              userValue: oldCoin.userValue
            }
          }
          return oldCoin
        })

        // Обновляем в Redux
        console.log(`Отправляем обновление в Redux...`)
        dispatch(rewriteFavorite(mergedCoins))
        console.log(`Redux обновлен успешно`)
      } else {
        console.log(`Обновленные данные пусты или не получены`)
      }
    } catch (error) {
      console.error(`Ошибка обновления #${updateNumber}:`, error.message)

      // При ошибке 429 увеличиваем интервал
      if (error.message.includes("429")) {
        console.log(`Обнаружена ошибка 429, увеличиваем интервал обновления`)
        if (updateIntervalRef.current) {
          clearInterval(updateIntervalRef.current)
          // Устанавливаем новый интервал - 5 минут
          updateIntervalRef.current = setInterval(updateFavoritePrices, 5 * 60 * 1000)
          console.log(`Новый интервал: 5 минут`)
        }
      }
    } finally {
      isUpdatingRef.current = false
      const totalTime = Date.now() - startTime
      console.log(`Обновление #${updateNumber} завершено за ${totalTime}ms`)
      console.log(`==== КОНЕЦ ОБНОВЛЕНИЯ #${updateNumber} ====\n`)
    }
  }, [favoriteCoins, dispatch])

  // Запускаем интервал обновления - ТОЛЬКО ПРИ ИЗМЕНЕНИИ КОЛИЧЕСТВА МОНЕТ
  useEffect(() => {
    console.log(`Инициализация автообновления избранного`)
    console.log(`Количество монет: ${favoriteCoins?.length || 0}`)

    // Очищаем предыдущий интервал
    if (updateIntervalRef.current) {
      clearInterval(updateIntervalRef.current)
    }

    if (favoriteCoins && favoriteCoins.length > 0) {
      console.log(`Устанавливаем интервал: ${intervalMinutes} минут`)

      // Первое обновление с задержкой в 5 секунд
      setTimeout(() => {
        console.log(`Первое обновление через 5 секунд...`)
        updateFavoritePrices()
      }, 5000)

      // Устанавливаем интервал
      updateIntervalRef.current = setInterval(() => {
        console.log(`Таймер сработал, запускаем обновление...`)
        updateFavoritePrices()
      }, intervalMinutes * 60 * 1000)

      console.log(`Интервал обновления установлен`)
    } else {
      console.log(`Автообновление не запущено: нет избранных монет`)
    }

    // Очистка интервала при размонтировании
    return () => {
      if (updateIntervalRef.current) {
        console.log(`Очистка интервала обновления`)
        clearInterval(updateIntervalRef.current)
      }
    }
  }, [favoriteCoins?.length]) // Только при изменении количества монет

  return { updateFavoritePrices }
}
