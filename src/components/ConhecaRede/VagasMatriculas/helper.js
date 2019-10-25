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
      if (vagaMatricula.decserie !== "") {
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
  return ordenarMatriculas(matriculas);
};

export const ordenarMatriculas = matriculas => {
  matriculas.forEach(matricula => {
    matricula[getKey(matricula)].decseries = matricula[
      getKey(matricula)
    ].decseries.sort((a, b) => (a.posicao > b.posicao ? 1 : -1));
  });
  return matriculas;
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
    default:
      return decserie;
  }
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
