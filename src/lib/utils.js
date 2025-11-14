import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Обрезка текста
export const isTruncated = (text, maxWidth, fontSize = 12) => {
  if (!text) return false

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  context.font = `${fontSize}px system-ui`

  const width = context.measureText(text).width
  return width > maxWidth
}
