const API_EOL = process.env.REACT_APP_API_EOL;

export async function listarSeriesEstudantes(params) {
  const { codesc = "" } = params;
  return await fetch(`${API_EOL}/seriesestudantes/${codesc}`).then(
    seriesestudantes => seriesestudantes.json()
  );
}

export async function listarModalidades(params) {
  const { codesc = "" } = params;
  return await fetch(`${API_EOL}/modalidades/${codesc}`).then(modalidades =>
    modalidades.json()
  );
}

export async function listarAmbientes(params) {
  const { codesc = "" } = params;
  return await fetch(`${API_EOL}/ambientesbyescola/${codesc}`).then(ambientes =>
    ambientes.json()
  );
}

export async function listarTurnos(params) {
  const { codesc = "" } = params;
  return await fetch(`${API_EOL}/alunosserieturno/${codesc}`).then(turnos =>
    turnos.json()
  );
}

export async function listarServidoresEscolarizacao(params) {
  const { codesc = "" } = params;
  return await fetch(`${API_EOL}/totservescolarizacao/${codesc}`).then(
    servidores => servidores.json()
  );
}

export async function listarServidoresPorEscola(params) {
  const { codesc = "" } = params;
  return await fetch(`${API_EOL}/servidores/${codesc}`).then(servidores =>
    servidores.json()
  );
}

export async function listarVagasMatriculasSerie(params) {
  const { codesc = "" } = params;
  return await fetch(`${API_EOL}/totvagmatbyserie/${codesc}`).then(vagas =>
    vagas.json()
  );
}

export async function listarCargosProfissionais() {
  return await fetch(`${API_EOL}/smeprofissionais/`).then(cargosprofissionais =>
    cargosprofissionais.json()
  );
}

export async function listarCargosProfissionaisPorDRE(params) {
  const { dre = "" } = params;
  return await fetch(`${API_EOL}/smeprofissionais/${dre}`).then(cargosprofissionais =>
    cargosprofissionais.json()
  );
}

export async function listarAmbientesSME() {
  return await fetch(`${API_EOL}/smeambientes/`).then(cargosprofissionais =>
    cargosprofissionais.json()
  );
}

export async function listarAmbientesSMEPorDRE(params) {
  const { dre = "" } = params;
  return await fetch(`${API_EOL}/smeambientes/${dre}`).then(cargosprofissionais =>
    cargosprofissionais.json()
  );
}
