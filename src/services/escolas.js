import { URL_API } from "./base";

export async function listarEscolas(params) {
  const { escola = '', bairro = '', distrito = '', tipo = '', dre = '', pagina = 1 } = params;
  return fetch(`${URL_API}/escolas/?search=${escola}&bairro=${bairro}&distrito=${distrito}&tipoesc=${tipo}&dre=${dre}&page=${pagina}`).then(escolas =>
    escolas.json()
  );
}

export async function listarBairros(params) {
  const { bairro = '' } = params;
  return fetch(`${URL_API}/bairros/?search=${bairro}`).then(bairros =>
    bairros.json()
  );
}

export async function listarDistritos(params) {
  const { distrito = '' } = params;
  return fetch(`${URL_API}/distritos/?search=${distrito}`).then(distritos =>
    distritos.json()
  );
}

export async function listarTiposEscola() {
  return fetch(`${URL_API}/tipo_escola/`).then(tipos => tipos.json());
}

export async function listarDREs() {
  return fetch(`${URL_API}/diretorias/`).then(dres => dres.json());
}
