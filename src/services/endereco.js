const API_RUA = process.env.REACT_APP_API_RUA
const API_CEP = process.env.REACT_APP_API_CEP

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
