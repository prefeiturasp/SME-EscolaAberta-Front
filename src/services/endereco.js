let API_RUA = "REPLACE_API_RUA";
let API_CEP = "REPLACE_API_CEP";
let API_LAT_LNG = "REPLACE_API_NOMINATIM";
if (process.env.REACT_APP_NODE_ENV === "local") {
  API_RUA = process.env.REACT_APP_API_RUA;
  API_CEP = process.env.REACT_APP_API_CEP;
  API_LAT_LNG = process.env.REACT_APP_API_NOMINATIM;
}


export async function buscarLogradouroPorCep(params, options = {}) {
  const { cep } = params;
  return await fetch(`${API_CEP}${cep}/json`, options).then(logradouro =>
    logradouro.json()
  );
}

export async function buscarLatLngPorLogradouro(params, options = {}) {
  const { logradouro } = params;
  return await fetch(`${API_RUA}${encodeURIComponent(logradouro)}.js`, options).then(local => local.json());
}

export async function buscarLatLngPorLogradouroV2(params, options = {}) {
  const { logradouro } = params;
  return await fetch(
    `https://georef.sme.prefeitura.sp.gov.br/v1/search?text=${encodeURIComponent(logradouro)}&size=10&boundary.gid=whosonfirst:locality:101965533`,
    options
  ).then(local => local.json());
}

export async function buscaLogradouroPorLatLng(params, options = {}) {
  const { lat, lng } = params;
  return await fetch(
    `${API_LAT_LNG}?format=json&lat=${lat}&lon=${lng}&zoom=17`,
    options
  ).then(local => local.json());
}
