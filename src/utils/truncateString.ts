export function truncateString(string = '', limit = 0) {  
    if (string.length <= limit) {
        return string
    }
  return string.substring(0, limit) + '...'
}