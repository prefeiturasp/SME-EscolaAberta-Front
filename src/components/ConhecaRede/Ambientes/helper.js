const AMBIENTES_PERMITIDOS = [
  "BRINQUEDOTECA",
  "ELEVADOR",
  "LABORATORIO DE INFORMATICA",
  "LABORATORIO DIVERSOS",
  "PARQUE",
  "QUADRA",
  "RAMPA",
  "SALA DE AULA",
  "SALA DE LEITURA",
  "SANITARIO ACESSIVEL A PESSOAS COM DEFICIENCIA"
];

export const normalizarAmbiente = ambiente => {
  switch (ambiente) {
    case "LABORATORIO DE BIOLOGIA":
    case "LABORATORIO DE CIENCIAS":
    case "LABORATORIO DE PROTESE":
    case "LABORATORIO DE QUIMICA":
      return "LABORATORIO DIVERSOS";
    case "PARQUE INFANTIL":
      return "PARQUE";
    case "QUADRA COBERTA":
    case "QUADRA DESCOBERTA":
      return "QUADRA";
    case "SALA DE AULA ADAPTADA":
    case "SALA DE AULA OCIOSA":
    case "SALA DE AULA PROPRIA":
      return "SALA DE AULA";
    default:
      return ambiente;
  }
};

export const incluirAmbientesNaoContemplados = ambientes => {
  AMBIENTES_PERMITIDOS.forEach(ambientePermitido => {
    const indice = ambientes.findIndex(
      ambiente => ambientePermitido === ambiente.ambiente
    );
    if (indice === -1) {
      ambientes.push({ ambiente: ambientePermitido, total: 0 });
    }
  })
  return ambientes;
}

export const ambientesFormatados = ambientes => {
  let ambientesPermitidos = [];
  ambientes.forEach(ambiente => {
    ambiente.ambiente = normalizarAmbiente(ambiente.ambiente);
    if (AMBIENTES_PERMITIDOS.includes(ambiente.ambiente)) {
      const indice = ambientesPermitidos.findIndex(
        ambientePermitido => ambientePermitido.ambiente === ambiente.ambiente
      );
      if (indice === -1) ambientesPermitidos.push(ambiente);
      else ambientesPermitidos[indice].total += ambiente.total;
    }
  });
  ambientesPermitidos = incluirAmbientesNaoContemplados(ambientesPermitidos);
  return ambientesPermitidos.sort((a, b) => (a.ambiente > b.ambiente ? 1 : -1));;
};
