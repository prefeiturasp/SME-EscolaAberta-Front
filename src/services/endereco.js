const API_RUA = process.env.REACT_APP_API_RUA
const API_CEP = process.env.REACT_APP_API_CEP
const API_LAT_LNG = process.env.REACT_APP_API_NOMINATIM

export async function buscarLogradouroPorCep(params) {
  const { cep } = params;
  return fetch(`${API_CEP}${cep}/json`).then(logradouro =>
    logradouro.json()
  )
}

export async function buscarLatLngPorLogradouro(params) {
  const { logradouro } = params;
  return fetch(`${API_RUA}${logradouro}.js`).then(local =>
    local.json()
  )
}

export async function buscaLogradouroPorLatLng(params) {
  const { lat, lng } = params;
  return fetch(`${API_LAT_LNG}?format=json&lat=${lat}&lon=${lng}&zoom=17`).then(local =>
    local.json()
  )
}
