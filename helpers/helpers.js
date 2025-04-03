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
    const time = item.time.split(", ")[1]
    // Убираем секунды
    return time.split(":").slice(0, 2).join(":")
  })
  // Показываем максимум 10 меток
  const step = Math.ceil(timeLabels.length / 7)
  // Возвращаем только каждую n-ю метку
  return timeLabels.filter((_, index) => index % step === 0)
}

// для больших ТФ

export const formatTime = (prices) => {
  const timeLabels = prices.map((item) => {
    const time = item.time.split(", ")[0]
    const dateParts = time.split(".")

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
    const day = dateParts[0]
    const monthIndex = parseInt(dateParts[1], 10) - 1
    const year = dateParts[2].slice(2, 4)

    const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`

    return formattedDate
  })

  const step = Math.ceil(timeLabels.length / 8)

  return timeLabels.filter((_, index) => index % step === 0)
}
