export function generateRandomId() {
  return Math.floor(1000 + Math.random() * 9000)
}

export function cutText(text: string, maxLength: number) {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text
}

export function isValidUrl(url: string) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}
