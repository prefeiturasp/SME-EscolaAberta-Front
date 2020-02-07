import { getKey } from "../helper";

export const mediaAtendimento = matricula => {
  let media = 0;
  matricula.decseries.forEach(item => {
    media += item.media_atendimento;
  });
  return Math.ceil(media / matricula.decseries.length);
};

export const formatarVagasMatriculas = vagasMatriculas => {
  let matriculas = [];
  let indice = 0;
  let indiceJaExisteMatricula = null;
  vagasMatriculas.forEach(vagaMatricula => {
    vagaMatricula.modalidade = labelModalidade(vagaMatricula.modalidade);
    matriculas.forEach((matricula, indice_) => {
      if (matricula[vagaMatricula.modalidade] !== undefined) {
        indiceJaExisteMatricula = indice_;
      }
    });
    if (indiceJaExisteMatricula) {
      if (
        vagaMatricula.decserie !== "" &&
        ORDENACAO_DECSERIE[vagaMatricula.modalidade][
          labelDecserie(vagaMatricula.decserie)
        ] !== undefined
      ) {
        matriculas[indiceJaExisteMatricula][
          vagaMatricula.modalidade
        ].decseries.push({
          decserie: labelDecserie(vagaMatricula.decserie),
          media_atendimento: vagaMatricula.media_atendimento,
          total_turmas: vagaMatricula.total_turmas || 0,
          vagas_oferecidas: vagaMatricula.vagas_oferecidas || 0,
          vagas_remanecentes: vagaMatricula.vagas_remanecentes || 0,
          posicao: ORDENACAO_DECSERIE[vagaMatricula.modalidade]
            ? ORDENACAO_DECSERIE[vagaMatricula.modalidade][
                labelDecserie(vagaMatricula.decserie)
              ]
            : 0
        });
      }
    } else if (vagaMatricula.decserie === "") {
      indice++;
      matriculas[indice] = {};
      matriculas[indice][vagaMatricula.modalidade] = {
        decseries: [],
        ativo: false
      };
      matriculas[indice][vagaMatricula.modalidade].media_atendimento =
        vagaMatricula.media_atendimento;
      matriculas[indice][vagaMatricula.modalidade].total_turmas =
        vagaMatricula.total_turmas;
      matriculas[indice][vagaMatricula.modalidade].vagas_oferecidas =
        vagaMatricula.vagas_oferecidas;
      matriculas[indice][vagaMatricula.modalidade].vagas_remanecentes =
        vagaMatricula.vagas_remanecentes;
    } else {
      matriculas[indice][vagaMatricula.modalidade].decseries.push({
        decserie: labelDecserie(vagaMatricula.decserie),
        media_atendimento: vagaMatricula.media_atendimento,
        total_turmas: vagaMatricula.total_turmas || 0,
        vagas_oferecidas: vagaMatricula.vagas_oferecidas || 0,
        vagas_remanecentes: vagaMatricula.vagas_remanecentes || 0
      });
    }
    indiceJaExisteMatricula = null;
  });
  matriculas = normalizarDecserieAnos(matriculas);
  matriculas = ordenarMatriculas(matriculas);
  matriculas = normalizarEnsinoProfissional(matriculas);
  return matriculas;
};

export const ordenarMatriculas = matriculas => {
  let novoMatriculas = [];
  matriculas.forEach(matricula => {
    matricula[getKey(matricula)].decseries = matricula[
      getKey(matricula)
    ].decseries.sort((a, b) => (a.posicao > b.posicao ? 1 : -1));
    novoMatriculas[ORDENACAO_MATRICULA[getKey(matricula)]] = matricula;
  });
  return novoMatriculas;
};

export const labelModalidade = modalidade => {
  switch (modalidade) {
    case "EDUCACAO INFANTIL":
      return "EDUCAÇÃO INFANTIL";
    case "EDUCACAO INFANTIL ESPECIAL":
    case "EJA ESCOLAS EDUCACAO ESPECIAL":
    case "ENSINO FUNDAMENTAL 9 ANOS ESPECIAL":
    case "ESPEC ENS MEDIO":
      return "EDUCAÇÃO ESPECIAL";
    case "EJA CIEJA":
    case "EJA ESCOLAS ENSINO FUNDAMENTAL":
      return "EDUCAÇÃO DE JOVENS E ADULTOS";
    case "ENSINO FUNDAMENTAL DE 9 ANOS":
      return "ENSINO FUNDAMENTAL";
    case "ENSINO MEDIO":
    case "NORMAL":
      return "ENSINO MÉDIO";
    case "TECNICO MEDIO":
      return "EDUCAÇÃO PROFISSIONAL";
    default:
      return modalidade;
  }
};

export const labelDecserie = decserie => {
  switch (decserie) {
    case "BERCARIO I":
      return "BERÇÁRIO I";
    case "BERCARIO I ESC DIFERENCIADA":
      return "BERÇÁRIO I ESCOLA DIFERENCIADA";
    case "BERCARIO II":
      return "BERÇÁRIO II";
    case "BERCARIO II ESC DIFERENCIADA":
      return "BERÇÁRIO II ESCOLA DIFERENCIADA";
    case "INFANTIL I ESC DIFERENCIADA":
      return "INFANTIL I ESCOLA DIFERENCIADA";
    case "INFANTIL II ESC DIFERENCIADA":
      return "INFANTIL II ESCOLA DIFERENCIADA";
    case "MINI GRUPO I ESC DIFERENCIADA":
      return "MINI GRUPO I ESCOLA DIFERENCIADA";
    case "MINI GRUPO II ESC DIFERENCIADA":
      return "MINI GRUPO II ESCOLA DIFERENCIADA";
    case "1. ANO":
      return "1º ANO";
    case "2. ANO":
      return "2º ANO";
    case "3. ANO":
      return "3º ANO";
    case "4. ANO":
      return "4º ANO";
    case "5. ANO":
      return "5º ANO";
    case "6. ANO":
      return "6º ANO";
    case "7. ANO":
      return "7º ANO";
    case "8. ANO":
      return "8º ANO";
    case "9. ANO":
      return "9º ANO";
    case "1. SERIE":
      return "1º ANO MÉDIO";
    case "2. SERIE":
      return "2º ANO MÉDIO";
    case "3. SERIE":
      return "3º ANO MÉDIO";
    case "M I":
      return "MÓDULO I EJA CIEJA";
    case "M II":
      return "MÓDULO II EJA CIEJA";
    case "M III":
      return "MÓDULO III EJA CIEJA";
    case "M IV":
      return "MÓDULO IV EJA CIEJA";
    case "EJA ALFABETIZACAO I":
      return "EJA ALFABETIZAÇÃO I";
    case "EJA ALFABETIZACAO II":
      return "EJA ALFABETIZAÇÃO II";
    case "EJA BASICA I":
      return "EJA BÁSICA I";
    case "EJA BASICA II":
      return "EJA BÁSICA II";
    case "INFANTIL I FI":
      return "INFANTIL I";
    case "INFANTIL II FI":
      return "INFANTIL II";
    case "EJA COMPLEMENTAR II EE":
      return "EJA COMPLEMENTAR II ESPECIAL";
    case "EJA FINAL I EE":
      return "EJA FINAL I ESPECIAL";
    case "EJA FINAL II EE":
      return "EJA FINAL II ESPECIAL";
    case "1. MODULO":
    case "1. MODULO NAO SME":
      return "1. MÓDULO TÉCNICO MÉDIO";
    case "2. MODULO":
    case "2. MODULO NAO SME":
      return "2. MÓDULO TÉCNICO MÉDIO";
    case "3. MODULO":
    case "3. MODULO NAO SME":
      return "3. MÓDULO TÉCNICO MÉDIO";
    case "4. MODULO":
    case "4. MODULO NAO SME":
      return "4. MÓDULO TÉCNICO MÉDIO";
    default:
      return decserie;
  }
};

export const normalizarDecserieAnos = matriculas => {
  matriculas.forEach(matricula => {
    matricula[getKey(matricula)].decseries.forEach(decserie => {
      if (decserie.decserie.includes("ANO")) {
        if (getKey(matricula) === "EDUCAÇÃO ESPECIAL") {
          if (!decserie.decserie.includes("MÉDIO")) {
            decserie.decserie += " FUNDAMENTAL ESPECIAL";
          } else {
            decserie.decserie = "1º ANO ESPECIAL MÉDIO";
          }
        } else if (getKey(matricula) === "ENSINO FUNDAMENTAL") {
          decserie.decserie += " FUNDAMENTAL";
        } else if (
          getKey(matricula) === "ENSINO MÉDIO" &&
          !decserie.decserie.includes("MÉDIO")
        ) {
          decserie.decserie += " NORMAL";
        }
      }
    });
  });
  return matriculas;
};

export const normalizarEnsinoProfissional = matriculas => {
  let indice = 0;
  let indiceEducacaoProfissional = null;
  matriculas.forEach((matricula, key) => {
    if (matricula["EDUCAÇÃO PROFISSIONAL"] !== undefined) {
      indiceEducacaoProfissional = key;
    }
  });
  let novoDecSeries = [];
  if (
    indiceEducacaoProfissional &&
    matriculas[indiceEducacaoProfissional]["EDUCAÇÃO PROFISSIONAL"].decseries
      .length === 7
  ) {
    for (indice; indice < 6; indice += 2) {
      matriculas[indiceEducacaoProfissional]["EDUCAÇÃO PROFISSIONAL"].decseries[
        indice
      ].media_atendimento =
        (matriculas[indiceEducacaoProfissional]["EDUCAÇÃO PROFISSIONAL"]
          .decseries[indice].media_atendimento +
          matriculas[indiceEducacaoProfissional]["EDUCAÇÃO PROFISSIONAL"]
            .decseries[indice + 1].media_atendimento) /
        2;
      matriculas[indiceEducacaoProfissional]["EDUCAÇÃO PROFISSIONAL"].decseries[
        indice
      ].total_turmas +=
        matriculas[indiceEducacaoProfissional][
          "EDUCAÇÃO PROFISSIONAL"
        ].decseries[indice + 1].total_turmas;
      matriculas[indiceEducacaoProfissional]["EDUCAÇÃO PROFISSIONAL"].decseries[
        indice
      ].vagas_oferecidas +=
        matriculas[indiceEducacaoProfissional][
          "EDUCAÇÃO PROFISSIONAL"
        ].decseries[indice + 1].vagas_oferecidas;
      matriculas[indiceEducacaoProfissional]["EDUCAÇÃO PROFISSIONAL"].decseries[
        indice
      ].vagas_remanecentes +=
        matriculas[indiceEducacaoProfissional][
          "EDUCAÇÃO PROFISSIONAL"
        ].decseries[indice + 1].vagas_remanecentes;
      novoDecSeries.push(
        matriculas[indiceEducacaoProfissional]["EDUCAÇÃO PROFISSIONAL"]
          .decseries[indice]
      );
    }
    novoDecSeries.push(
      matriculas[indiceEducacaoProfissional]["EDUCAÇÃO PROFISSIONAL"]
        .decseries[6]
    );
    matriculas[indiceEducacaoProfissional][
      "EDUCAÇÃO PROFISSIONAL"
    ].decseries = novoDecSeries;
  }
  return matriculas;
};

export const ORDENACAO_MATRICULA = {
  "EDUCAÇÃO INFANTIL": 0,
  "ENSINO FUNDAMENTAL": 1,
  "ENSINO MÉDIO": 2,
  "EDUCAÇÃO DE JOVENS E ADULTOS": 3,
  "EDUCAÇÃO ESPECIAL": 4,
  "EDUCAÇÃO PROFISSIONAL": 5
};

export const ORDENACAO_DECSERIE = {
  "EDUCAÇÃO INFANTIL": {
    "BERÇÁRIO I": 0,
    "BERÇÁRIO II": 1,
    "INFANTIL I": 2,
    "INFANTIL I  E II": 3,
    "INFANTIL II": 4,
    "MINI GRUPO I": 5,
    "MINI GRUPO II": 6,
    "BERÇÁRIO I ESCOLA DIFERENCIADA": 7,
    "BERÇÁRIO II ESCOLA DIFERENCIADA": 8,
    "INFANTIL I ESCOLA DIFERENCIADA": 9,
    "INFANTIL II ESCOLA DIFERENCIADA": 10,
    "MINI GRUPO I ESCOLA DIFERENCIADA": 11,
    "MINI GRUPO II ESCOLA DIFERENCIADA": 12
  },
  "ENSINO FUNDAMENTAL": {
    "1º ANO": 0,
    "2º ANO": 1,
    "3º ANO": 2,
    "4º ANO": 3,
    "5º ANO": 4,
    "6º ANO": 5,
    "7º ANO": 6,
    "8º ANO": 7,
    "9º ANO": 8
  },
  "ENSINO MÉDIO": {
    "1º ANO MÉDIO": 0,
    "2º ANO MÉDIO": 1,
    "3º ANO MÉDIO": 2,
    "1º ANO": 3,
    "2º ANO": 4,
    "3º ANO": 5,
    "4º ANO": 6
  },
  "EDUCAÇÃO DE JOVENS E ADULTOS": {
    "MÓDULO I EJA CIEJA": 0,
    "MÓDULO II EJA CIEJA": 1,
    "MÓDULO III EJA CIEJA": 2,
    "MÓDULO IV EJA CIEJA": 3,
    "1. EJA MODULAR": 4,
    "2. EJA MODULAR": 5,
    "3. EJA MODULAR": 6,
    "4. EJA MODULAR": 7,
    "EJA ALFABETIZAÇÃO I": 8,
    "EJA ALFABETIZAÇÃO II": 9,
    "EJA BÁSICA I": 10,
    "EJA BÁSICA II": 11,
    "EJA COMPLEMENTAR I": 12,
    "EJA COMPLEMENTAR II": 13,
    "EJA FINAL I": 14,
    "EJA FINAL II": 15
  },
  "EDUCAÇÃO ESPECIAL": {
    "INFANTIL I": 0,
    "INFANTIL II": 1,
    "INFANTIL LIBRAS EMEI": 2,
    "EJA COMPLEMENTAR II ESPECIAL": 3,
    "EJA FINAL I ESPECIAL": 4,
    "EJA FINAL II ESPECIAL": 5,
    "1º ANO": 6,
    "2º ANO": 7,
    "3º ANO": 8,
    "4º ANO": 9,
    "5º ANO": 10,
    "6º ANO": 11,
    "7º ANO": 12,
    "8º ANO": 13,
    "9º ANO": 14,
    "1º ANO MÉDIO": 15,
    "CLASSE BILINGUE I": 16
  },
  "EDUCAÇÃO PROFISSIONAL": {
    "1. MÓDULO TÉCNICO MÉDIO": 0,
    "2. MÓDULO TÉCNICO MÉDIO": 1,
    "3. MÓDULO TÉCNICO MÉDIO": 2,
    "4. MÓDULO TÉCNICO MÉDIO": 3
  }
};

export const totalPorFaixa = vagasMatriculasFormatadas => {
  let totalPorFaixa = {
    media_atendimento: 0,
    total_turmas: 0,
    vagas_oferecidas: 0,
    vagas_remanecentes: 0
  };
  vagasMatriculasFormatadas.forEach(matricula => {
    totalPorFaixa.media_atendimento +=
      matricula[getKey(matricula)].media_atendimento;
    totalPorFaixa.total_turmas += matricula[getKey(matricula)].total_turmas;
    totalPorFaixa.vagas_oferecidas +=
      matricula[getKey(matricula)].vagas_oferecidas;
    totalPorFaixa.vagas_remanecentes +=
      matricula[getKey(matricula)].vagas_remanecentes;
  });
  totalPorFaixa.media_atendimento = Math.ceil(
    totalPorFaixa.media_atendimento / vagasMatriculasFormatadas.length
  );
  return totalPorFaixa;
};

export const dadosParaGraficos = totalPorFaixa => {
  let dados = [];
  dados.push({
    dado: "Matrículas/Encaminhamento",
    valor: totalPorFaixa.vagas_oferecidas - totalPorFaixa.vagas_remanecentes
  });
  dados.push({
    dado: "Vagas Remanescentes",
    valor: totalPorFaixa.vagas_remanecentes
  });
  return dados;
};

export const dadosParaGraficosPorFaixa = matricula => {
  let dados = [];
  dados.push({
    dado: "Matrículas/Encaminhamento",
    valor:
      matricula[getKey(matricula)].vagas_oferecidas -
      matricula[getKey(matricula)].vagas_remanecentes
  });
  dados.push({
    dado: "Vagas Remanescentes",
    valor: matricula[getKey(matricula)].vagas_remanecentes
  });
  return dados;
};
