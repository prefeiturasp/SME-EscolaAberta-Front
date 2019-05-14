const API_EOL = process.env.REACT_APP_API_EOL

export async function listarEscolas(params) {
  const { escola = '', bairro = '', distrito = '', tipo = '', dre = '', pagina = 1 } = params;
  return fetch(`${API_EOL}/escolas/?search=${escola}&bairro=${bairro}&distrito=${distrito}&tipoesc=${tipo}&dre=${dre}&page=${pagina}`).then(escolas =>
    escolas.json()
  );
}

export async function listarBairros(params) {
  const { bairro = '' } = params;
  return fetch(`${API_EOL}/bairros/?search=${bairro}`).then(bairros =>
    bairros.json()
  );
}

export async function listarDistritos(params) {
  const { distrito = '' } = params;
  return fetch(`${API_EOL}/distritos/?search=${distrito}`).then(distritos =>
    distritos.json()
  );
}

export async function listarTiposEscola() {
  return fetch(`${API_EOL}/tipo_escola/`).then(tipos => tipos.json());
}

export async function listarDREs() {
  return fetch(`${API_EOL}/diretorias/`).then(dres => dres.json());
}
