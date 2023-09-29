function generateAvatarUrl() {
  const randomIndex = Math.floor(Math.random() * 10000000)

  return `https://avatars.dicebear.com/api/bottts/${randomIndex}.svg`
}

export default generateAvatarUrl
