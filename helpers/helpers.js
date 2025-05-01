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
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек"
  ]

  const timeLabels = prices.map((item) => {
    const time = item.time

    const date = new Date(time)

    const day = date.getDate()

    const monthIndex = date.getMonth()

    const year = date.getFullYear().toString().slice(-2) // две последние цифры года

    // Форматируем дату как "дд мес год", например "1 мая 25"
    const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`

    return formattedDate
  })

  const step = Math.ceil(timeLabels.length / 8)

  return timeLabels.filter((_, index) => index % step === 0)
}
