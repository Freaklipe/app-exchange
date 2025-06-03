const API_URL = 'https://rest.coincap.io/v3/assets'
const API_KEY =
  '2bcfd955ffdd5d06f87c1c7cc6ba1332958ff14f9a7293cd627df7fd89c3f35e'
const LIMIT = 20
function getAssets() {
  return fetch(`${API_URL}?apiKey=${API_KEY}&limit=${LIMIT}`)
    .then((response) => response.json())
    .then((data) => data.data)
}

export default {
  getAssets,
}
