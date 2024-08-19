export const removeYearFromDate = (datesArray) => {
  return datesArray.map((date) => {
    // Разделяем строку даты по точке
    const parts = date.split(".")
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
