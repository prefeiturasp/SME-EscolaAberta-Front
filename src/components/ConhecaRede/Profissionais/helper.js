export const formatarCargosProfissionais = cargosProfessores => {
  let novoCargosProfessores = [];
  let indice = 0;
  cargosProfessores.forEach(elem => {
    let i;
    let achou = false;
    for (i = 0; i < indice + 1; i++) {
      if (
        novoCargosProfessores[i] &&
        novoCargosProfessores[i][elem.titulo] !== undefined
      ) {
        novoCargosProfessores[i][elem.titulo].formacoes.push({
          formacao: elem.formacao,
          total: elem.total
        });
        achou = true;
      }
    }
    if (!achou) {
      novoCargosProfessores[indice] = {};
      novoCargosProfessores[indice][elem.titulo] = { formacoes: [] };
      novoCargosProfessores[indice][elem.titulo].formacoes.push({
        formacao: elem.formacao,
        total: elem.total
      });
      indice = indice + 1;
    }
  });
  return novoCargosProfessores.sort((a, b) => (getKey(a) > getKey(b) ? 1 : -1));
};

export const getKey = obj => {
  return Object.keys(obj)[0];
};

export const totalProfissionaisPorEscolaridade = (cargo, titulo) => {
  const indice = cargo[getKey(cargo)].formacoes.findIndex(
    formacao => formacao.formacao === titulo
  );
  if (indice !== -1) return cargo[getKey(cargo)].formacoes[indice].total;
  else return 0;
};

export const totalDoCargoPorEscolaridade = cargo => {
  let count = 0;
  cargo[getKey(cargo)].formacoes.forEach(formacao => {
    if (
      formacao.formacao === "LICENCIATURA CURTA" ||
      formacao.formacao === "LICENCIATURA PLENA"
    )
      count += formacao.total;
  });
  return count;
};

export const inicializaTotalPorFormacao = [
  {
    formacao: "ENSINO MEDIO/NORMAL",
    total: 0
  },
  {
    formacao: "LICENCIATURA CURTA",
    total: 0
  },
  {
    formacao: "LICENCIATURA PLENA",
    total: 0
  }
  /*{
    formacao: "BACHARELADO",
    total: 0
  },
  {
    formacao: "POS GRADUACAO LATO SENSU",
    total: 0
  },
  {
    formacao: "OUTROS",
    total: 0
  }*/
];

export const totalPorFormacao = cargosProfissionaisFormatado => {
  let totalPorFormacao = inicializaTotalPorFormacao;
  totalPorFormacao.forEach(elem => {
    elem.total = 0;
  });
  cargosProfissionaisFormatado.forEach(cargoProfissional => {
    cargoProfissional[getKey(cargoProfissional)].formacoes.forEach(formacao => {
      const indice = totalPorFormacao.findIndex(
        formacao_total => formacao_total.formacao === formacao.formacao
      );
      if (indice !== -1) {
        totalPorFormacao[indice].total += formacao.total;
      }
    });
  });
  return totalPorFormacao;
};

export const total = cargosProfissionaisFormatado => {
  let total = 0;
  cargosProfissionaisFormatado = totalPorFormacao(cargosProfissionaisFormatado);
  cargosProfissionaisFormatado.forEach(cargo => {
    total += cargo.total;
  });
  return total;
};
