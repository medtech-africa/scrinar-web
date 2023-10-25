export const formatDate = (dateVal: string) => {
  const date = new Date(dateVal)

  const formattedDate = date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  return formattedDate
}

export const formatTime = (dateVal: string) => {
  const formattedDate = new Date(dateVal).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
  return formattedDate
}
