import { STOP_WORDS } from "../constants";

const API_EOL = process.env.REACT_APP_API_EOL;

export async function listarEscolas(params) {
  let {
    escola = "",
    bairro = "",
    distrito = "",
    tipo = "",
    dre = "",
    subpref = "",
    pagina = 1,
  } = params;
  if (
    STOP_WORDS.includes(
      (escola.split(" ")[0] + " " + escola.split(" ")[1]).toUpperCase()
    )
  ) {
    escola = escola
      .substr(escola.indexOf(" ") + 1)
      .substr(escola.indexOf(" ") + 1);
  } else if (STOP_WORDS.includes(escola.split(" ")[0].toUpperCase())) {
    escola = escola.substr(escola.indexOf(" ") + 1);
  }
  return await fetch(
    `${API_EOL}/escolas/?search=${escola}&bairro=${bairro}&distrito=${distrito}&tipoesc=${tipo}&dre=${dre}&subpref=${subpref}&page=${pagina}`
  ).then((escolas) => escolas.json());
}

export async function listarEscolasLocalizacao(params) {
  const { lat, lon } = params;
  return await fetch(
    `${API_EOL}/localizador?lat=${lat}&lon=${lon}&radius=2`
  ).then((escolas) => escolas.json());
}

export async function listarBairros(params) {
  const { bairro = "" } = params;
  return await fetch(`${API_EOL}/bairros/?search=${bairro}`).then((bairros) =>
    bairros.json()
  );
}

export async function listarDistritos(params) {
  const { distrito = "" } = params;
  return await fetch(
    `${API_EOL}/distritos/?search=${distrito}`
  ).then((distritos) => distritos.json());
}

export async function listarSubpref(params) {
  const { subpref = "" } = params;
  return await fetch(`${API_EOL}/subpref/?search=${subpref}`).then((subprefs) =>
    subprefs.json()
  );
}

export async function listarTiposEscola() {
  return await fetch(`${API_EOL}/tipo_escola/`).then((tipos) => tipos.json());
}

export async function listarDREs() {
  return await fetch(`${API_EOL}/diretorias/`).then((dres) => dres.json());
}

export async function listarTiposEscolaPorFaixa() {
  return await fetch(`${API_EOL}/smeescolas/`).then((tiposescola) =>
    tiposescola.json()
  );
}

export async function listarTiposEscolaPorFaixaPorDRE(params) {
  const { dre = "" } = params;
  return await fetch(`${API_EOL}/smeescolas/${dre}`).then((tiposescola) =>
    tiposescola.json()
  );
}

// TODO: remover filter e count -1 quando o ceu for inalgurado
export async function listarCEUs() {
  return await fetch(`${API_EOL}/ceus/`).then((ceus) => ceus.json()).then((ceus) => {
    ceus.count = ceus.count -1;
    return ceus
  });
}

// TODO: remover filter e count -1 quando o ceu for inalgurado
export async function listarCEUsPorDRE(params) {
  const INVALID_CD = "200793"
  const { dre = "" } = params;
  return await fetch(`${API_EOL}/ceus/?dre=${dre}`).then((ceus) => ceus.json()).then((ceus) => {
    ceus.count = ceus.count -1;
    ceus.results.filter(el => el.cd_unidade !== INVALID_CD);
    return ceus
  }
  );
 }
