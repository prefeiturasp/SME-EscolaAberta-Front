const API_EOL = process.env.REACT_APP_API_EOL

export async function listarEscolas(params) {
  const { escola = '', bairro = '', distrito = '', tipo = '', dre = '', pagina = 1 } = params;
  return await fetch(`${API_EOL}/escolas/?search=${escola}&bairro=${bairro}&distrito=${distrito}&tipoesc=${tipo}&dre=${dre}&page=${pagina}`).then(escolas =>
    escolas.json()
  );
}

export async function listarEscolasLocalizacao(params) {
  const { lat, lon } = params;
  return await fetch(`${API_EOL}/localizador?lat=${lat}&lon=${lon}&radius=2`).then(escolas =>
    escolas.json()
  );
}

export async function listarBairros(params) {
  const { bairro = '' } = params;
  return await fetch(`${API_EOL}/bairros/?search=${bairro}`).then(bairros =>
    bairros.json()
  );
}

export async function listarDistritos(params) {
  const { distrito = '' } = params;
  return await fetch(`${API_EOL}/distritos/?search=${distrito}`).then(distritos =>
    distritos.json()
  );
}

export async function listarSubpref(params) {
  const { subpref = '' } = params;
  return await fetch(`${API_EOL}/subpref/?search=${subpref}`).then(subprefs =>
    subprefs.json()
  );
}

export async function listarTiposEscola() {
  return await fetch(`${API_EOL}/tipo_escola/`).then(tipos => tipos.json());
}

export async function listarDREs() {
  return await fetch(`${API_EOL}/diretorias/`).then(dres => dres.json());
}

export async function listarTiposEscolaPorFaixa() {
  return await fetch(`${API_EOL}/smeescolas/`).then(tiposescola => tiposescola.json());
}

export async function listarTiposEscolaPorFaixaPorDRE(params) {
  const { dre = '' } = params;
  return await fetch(`${API_EOL}/smeescolas/${dre}`).then(tiposescola => tiposescola.json());
}
