// Генерация цветовой палитры
export const generateProfessionalPalette = (numColors) => {
  const professionalColors = [
    "#2E86AB",
    "#A23B72",
    "#F18F01",
    "#C73E1D",
    "#6B8F71",
    "#3D5A80",
    "#EE6C4D",
    "#98C1D9",
    "#293241",
    "#E0FBFC",
    "#5D576B",
    "#F7567C",
    "#99E1D9",
    "#2F3061",
    "#6CA6C1",
    "#E76F51",
    "#264653",
    "#2A9D8F",
    "#E9C46A",
    "#F4A261"
  ]

  if (numColors <= professionalColors.length) {
    return professionalColors.slice(0, numColors)
  }

  const colors = [...professionalColors]
  for (let i = professionalColors.length; i < numColors; i++) {
    const hue = (i * 137.508) % 360
    const saturation = 40 + Math.random() * 30
    const lightness = 40 + Math.random() * 20
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`)
  }
  return colors
}

// Получение контрастного цвета текста
export const getContrastColor = (hexColor) => {
  if (!hexColor || typeof hexColor !== "string") return "#FFFFFF"

  const color = hexColor.replace("#", "")
  if (color.length !== 6 && color.length !== 3) return "#FFFFFF"

  try {
    let r, g, b

    if (color.length === 6) {
      r = parseInt(color.substr(0, 2), 16)
      g = parseInt(color.substr(2, 2), 16)
      b = parseInt(color.substr(4, 2), 16)
    } else {
      r = parseInt(color[0] + color[0], 16)
      g = parseInt(color[1] + color[1], 16)
      b = parseInt(color[2] + color[2], 16)
    }

    const yiq = (r * 299 + g * 587 + b * 114) / 1000
    return yiq >= 150 ? "#000000" : "#FFFFFF"
  } catch (error) {
    return "#FFFFFF"
  }
}

// Позиционирование текста на сегменте
export const getLabelPosition = (centerX, centerY, radius, angle) => {
  const angleRad = (angle * Math.PI) / 180
  const x = centerX + radius * Math.cos(angleRad - Math.PI / 2)
  const y = centerY + radius * Math.sin(angleRad - Math.PI / 2)
  return { x, y }
}

// Создание сегмента диаграммы
export const createDonutSegment = (
  centerX,
  centerY,
  outerRadius,
  innerRadius,
  startAngle,
  endAngle
) => {
  const startRad = ((startAngle - 90) * Math.PI) / 180
  const endRad = ((endAngle - 90) * Math.PI) / 180

  const x1 = centerX + outerRadius * Math.cos(startRad)
  const y1 = centerY + outerRadius * Math.sin(startRad)
  const x2 = centerX + outerRadius * Math.cos(endRad)
  const y2 = centerY + outerRadius * Math.sin(endRad)
  const x3 = centerX + innerRadius * Math.cos(endRad)
  const y3 = centerY + innerRadius * Math.sin(endRad)
  const x4 = centerX + innerRadius * Math.cos(startRad)
  const y4 = centerY + innerRadius * Math.sin(startRad)

  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0

  return [
    `M ${x1} ${y1}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
    `L ${x3} ${y3}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
    "Z"
  ].join(" ")
}

// Форматирование числа (потом в helpers)
export const formatCurrency = (num, decimals = 2) => {
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(decimals)}M`
  }
  if (num >= 1000) {
    return `$${(num / 1000).toFixed(decimals)}K`
  }
  return `$${num.toFixed(decimals)}`
}
