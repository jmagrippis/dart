export function getItem(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch (err) {
    return null
  }
}
