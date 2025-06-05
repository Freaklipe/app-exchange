const API_URL = 'https://rest.coincap.io/v3'
const API_KEY = '2bcfd955ffdd5d06f87c1c7cc6ba1332958ff14f9a7293cd627df7fd89c3f35e'
const LIMIT = 20

async function getAssets() {
  const response = await fetch(`${API_URL}/assets?apiKey=${API_KEY}&limit=${LIMIT}`)
  const { data } = await response.json()
  return data
}

async function getAsset(id) {
  const response = await fetch(`${API_URL}/assets/${id}?apiKey=${API_KEY}`)
  const { data } = await response.json()
  return data
}

async function getAssetHistory(id) {
  const now = new Date()
  const end = now.getTime()
  now.setDate(now.getDate() - 1)
  const start = now.getTime()

  const response = await fetch(`${API_URL}/assets/${id}/history?apiKey=${API_KEY}&interval=h1&start=${start}&end=${end}`)
  const { data } = await response.json()
  return data
}

async function getMarkets(coin) {
  const response = await fetch(`${API_URL}/assets/${coin}/markets?apiKey=${API_KEY}&limit=5`)
  const { data } = await response.json()
  return data
}

async function getExchange(id) {
  const response = await fetch(`${API_URL}/exchanges/${id}`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    }
  })
  const { data } = await response.json()
  return data
}

export default {
  getAssets,
  getAsset,
  getMarkets,
  getExchange,
  getAssetHistory,
}
