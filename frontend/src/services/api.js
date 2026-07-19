import axios from 'axios'

const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'
const API_VERSION = import.meta.env.REACT_APP_API_VERSION || 'v1'

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/${API_VERSION}`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('firebaseToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Hunt APIs
export const huntAPI = {
  create: (huntData) => api.post('/hunts/create', huntData),
  getById: (huntId) => api.get(`/hunts/${huntId}`),
  list: () => api.get('/hunts'),
  update: (huntId, data) => api.put(`/hunts/${huntId}`, data),
  delete: (huntId) => api.delete(`/hunts/${huntId}`),
}

// Clue APIs
export const clueAPI = {
  generate: (huntId, data) => api.post(`/clues/generate`, { hunt_id: huntId, ...data }),
  getByHunt: (huntId) => api.get(`/clues/hunt/${huntId}`),
  submitAnswer: (clueId, answer) => api.post(`/clues/${clueId}/answer`, { answer }),
}

// Score APIs
export const scoreAPI = {
  submit: (data) => api.post('/scores/submit', data),
  getByHunt: (huntId) => api.get(`/scores/hunt/${huntId}`),
  getUserScore: (userId, huntId) => api.get(`/scores/user/${userId}/hunt/${huntId}`),
}

// Leaderboard APIs
export const leaderboardAPI = {
  getByHunt: (huntId, limit = 10) => api.get(`/leaderboard/${huntId}?limit=${limit}`),
}

// Certificate APIs
export const certificateAPI = {
  generate: (data) => api.post('/certificates/generate', data),
  getByScore: (scoreId) => api.get(`/certificates/${scoreId}`),
  download: (certId) => api.get(`/certificates/${certId}/download`, { responseType: 'blob' }),
}

export default api
