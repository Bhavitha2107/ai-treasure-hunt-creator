export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validateHuntTitle = (title) => {
  return title.trim().length >= 3
}

export const validateClueCount = (count) => {
  return count >= 1 && count <= 8
}

export const validateName = (name) => {
  return name.trim().length >= 2
}

export const validateAnswer = (answer) => {
  return answer.trim().length > 0
}
