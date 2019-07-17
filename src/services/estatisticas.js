const API_EOL = process.env.REACT_APP_API_EOL

export async function listarModalidades(params) {
  const { codesc = '' } = params;
  return fetch(`${API_EOL}/modalidades/${codesc}`).then(modalidades =>
    modalidades.json()
  );
}

export async function listarAmbientes(params) {
  const { codesc = '' } = params;
  return fetch(`${API_EOL}/ambientesbyescola/${codesc}`).then(ambientes =>
    ambientes.json()
  );
}

export async function listarTurnos(params) {
  const { codesc = '' } = params;
  return fetch(`${API_EOL}/alunosserieturno/${codesc}`).then(turnos =>
    turnos.json()
  );
}
