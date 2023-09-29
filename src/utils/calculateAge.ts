function calculateAge(dateOfBirth: string) {
  const dob = new Date(dateOfBirth) // Parse the date of birth string
  const today = new Date() // Get the current date

  // Calculate the age in milliseconds
  const ageInMilliseconds = today.getTime() - dob.getTime()

  // Convert milliseconds to years
  const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25
  const age = Math.floor(ageInMilliseconds / millisecondsPerYear)

  return age
}

export default calculateAge
