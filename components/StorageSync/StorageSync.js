import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AppState } from "react-native"
import { setCoin, updateUserAsset } from "../../store/reducersSlice"

const StorageSync = () => {
  const dispatch = useDispatch()
  const coinItem = useSelector((state) => state.store.coinItem)
  const userAssets = useSelector((state) => state.store.userAssets)

  const hasLoadedRef = useRef(false)
  const appStateRef = useRef(AppState.currentState)
  const saveTimeoutRef = useRef(null)

  // 1. Загружаем данные ОДИН РАЗ при старте приложения
  useEffect(() => {
    if (hasLoadedRef.current) return

    const loadData = async () => {
      try {
        console.log("📥 StorageSync: Загружаем данные...")

        const [fav, assets] = await Promise.all([
          AsyncStorage.getItem("@user_favorites"),
          AsyncStorage.getItem("@user_assets")
        ])

        if (fav) {
          const favorites = JSON.parse(fav)
          console.log(`📥 Загружено ${favorites.length} монет`)

          // 🔥 ФИЛЬТРАЦИЯ: Проверяем что монеты еще не загружены
          const existingIds = new Set(coinItem.map((c) => c.id))
          const newFavorites = favorites.filter((coin) => !existingIds.has(coin.id))

          newFavorites.forEach((coin) => {
            dispatch(setCoin(coin))
          })

          if (newFavorites.length < favorites.length) {
            console.log(
              `⚠️ Пропущено ${favorites.length - newFavorites.length} дубликатов`
            )
          }
        }

        if (assets) {
          const assetsData = JSON.parse(assets)
          console.log(`📥 Активы: ${Object.keys(assetsData).length}`)

          Object.entries(assetsData).forEach(([coinId, amount]) => {
            dispatch(updateUserAsset({ coinId, amount }))
          })
        }

        hasLoadedRef.current = true
        console.log("✅ Загрузка завершена")
      } catch (e) {
        console.error("❌ Ошибка загрузки:", e)
      }
    }

    loadData()
  }, [dispatch, coinItem]) // Добавили coinItem для проверки дубликатов

  // 2. Сохраняем только при закрытии приложения
  useEffect(() => {
    const saveOnExit = async () => {
      try {
        // 🔥 ОТМЕНЯЕМ предыдущий таймер если есть
        if (saveTimeoutRef.current) {
          clearTimeout(saveTimeoutRef.current)
        }

        // 🔥 ДЕБАУНС: сохраняем через 300мс после последнего вызова
        saveTimeoutRef.current = setTimeout(async () => {
          const assetsCount = Object.keys(userAssets).length
          console.log(`💾 Сохраняем: Монеты: ${coinItem.length}, Активы: ${assetsCount}`)

          // 🔥 ФИЛЬТРАЦИЯ: сохраняем только актуальные активы
          const coinIds = new Set(coinItem.map((coin) => coin.id))
          const filteredAssets = {}

          Object.entries(userAssets).forEach(([coinId, amount]) => {
            if (coinIds.has(coinId)) {
              filteredAssets[coinId] = amount
            }
          })

          const favoritesToSave = coinItem.map((coin) => ({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            // Добавление ценовых данных, чтобы не было пробелов при перезагрузке в карточках избранного
            current_price: coin.current_price || 0,
            price_change_percentage_24h: coin.price_change_percentage_24h || 0,
            market_cap_rank: coin.market_cap_rank || 0,
            //  market_cap: savedCoin.market_cap || 0,
            // timestamp когда данные были обновлены
            price_updated_at: new Date().toISOString()
          }))

          await AsyncStorage.setItem("@user_favorites", JSON.stringify(favoritesToSave))
          await AsyncStorage.setItem("@user_assets", JSON.stringify(filteredAssets))
          console.log("✅ Данные сохранены")
        }, 300)
      } catch (e) {
        console.error("❌ Ошибка сохранения:", e)
      }
    }

    // Слушаем изменение состояния приложения
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      // Когда приложение уходит в фон - сохраняем
      if (
        appStateRef.current === "active" &&
        (nextAppState === "background" || nextAppState === "inactive")
      ) {
        console.log("📱 Приложение сворачивается...")
        saveOnExit()
      }

      appStateRef.current = nextAppState
    })

    // Сохраняем при размонтировании компонента
    return () => {
      subscription.remove()
      saveOnExit()

      // Очищаем таймер
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [coinItem, userAssets])

  return null
}

export default StorageSync
