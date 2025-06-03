const API_URL = 'https://rest.coincap.io/v3/assets'
const API_KEY =
  '2bcfd955ffdd5d06f87c1c7cc6ba1332958ff14f9a7293cd627df7fd89c3f35e'
const LIMIT = 20

function getAssets() {
  return fetch(`${API_URL}?apiKey=${API_KEY}&limit=${LIMIT}`)
    .then((response) => response.json())
    .then((data) => data.data)
}

function getAsset(id) {
  return fetch(`${API_URL}/${id}?apiKey=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => data.data)
}

function getAssetHistory(id) {
  const now = new Date()
  const end = now.getTime()
  now.setDate(now.getDate() - 1)
  const start = now.getTime()

  return fetch(
    `${API_URL}/${id}/history?apiKey=${API_KEY}&interval=h1&start=${start}&end=${end}`
  )
    .then((response) => response.json())
    .then((data) => data.data)
}

export default {
  getAssets,
  getAsset,
  getAssetHistory,
}
