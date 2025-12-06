export const removeYearFromDate = (datesArray) => {
  return datesArray.map((date) => {
    // Разделяем строку даты по точке
    const parts = date.split("/")
    // Преобразуем день в число, чтобы удалить ведущие нули
    const day = parseInt(parts[0], 10)
    // Возвращаем только день в формате строки
    return day.toString()
  })
}

export const uniqueDates = (datesArray) => {
  // Используем Set для хранения уникальных значений
  const uniqueSet = new Set(datesArray)

  // Преобразуем Set обратно в массив
  return Array.from(uniqueSet)
}

// для меньших ТФ
export const getTimeLabels = (prices) => {
  // Извлекаем время из объектов
  const timeLabels = prices.map((item) => {
    // item.time имеет формат "дата, время"
    const time = item.time.split(", ")[0]
    // Преобразуем строку времени в объект Date
    const date = new Date(time)

    // Убираем секунды
    const test = time.split(":").slice(0, 2).join(":")
    // Форматируем дату и время
    const optionsDate = { day: "numeric", month: "long", year: "numeric" }
    const optionsTime = { hour: "2-digit", minute: "2-digit" }
    // Получаем читаемую дату и время
    const readableDate = date.toLocaleDateString("ru-RU", optionsDate)
    const readableTime = date.toLocaleTimeString("ru-RU", optionsTime)

    return `${readableTime}`
  })

  // return time.split(":").slice(0, 2).join(":")
  // })
  // Показываем максимум 10 меток
  const step = Math.ceil(timeLabels.length / 7)
  // Возвращаем только каждую n-ю метку
  return timeLabels.filter((_, index) => index % step === 0)
}

// для больших ТФ
export const formatTime = (prices) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]

  return prices
    .map((item) => {
      const date = new Date(item.time)
      const formattedDate = `${date.getDate()} ${monthNames[date.getMonth()]} ${String(
        date.getFullYear()
      ).slice(-2)}`
      return formattedDate
    })
    .filter((_, index, array) => index % Math.ceil(array.length / 7) === 0)
}

export const formatCryptoAmount = (amount) => {
  // ЗАЩИТА ОТ UNDEFINED И NULL
  if (amount === undefined || amount === null) {
    return "0"
  }

  // Преобразуем в число
  const numAmount = Number(amount)

  // Проверяем, что это валидное число
  if (isNaN(numAmount)) {
    return "0"
  }

  // Если 0 - возвращаем "0"
  if (numAmount === 0) return "0"

  // Преобразуем в строку
  let result = numAmount.toString()

  // Обработка десятичных знаков
  if (result.includes(".")) {
    // Убираем лишние нули в конце
    while (result.endsWith("0")) {
      result = result.slice(0, -1)
    }

    // Убираем точку если она в конце
    if (result.endsWith(".")) {
      result = result.slice(0, -1)
    }
  }

  // Форматирование больших чисел без десятичных знаков
  if (!result.includes(".") && result.length > 3) {
    try {
      result = parseInt(result).toLocaleString("en-US")
    } catch (error) {
      // В случае ошибки возвращаем как есть
      console.warn("Ошибка форматирования числа:", amount, error)
    }
  }

  return result
}

// Формат чисел для аналитики
export const formatNumber = (num, decimals = 2) => {
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(decimals)}M`
  }
  if (num >= 1000) {
    return `$${(num / 1000).toFixed(decimals)}K`
  }
  return `$${num.toFixed(decimals)}`
}
