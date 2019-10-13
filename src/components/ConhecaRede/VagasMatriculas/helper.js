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
  vagasMatriculas.forEach(vagaMatricula => {
    if (vagaMatricula.decserie === "") {
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
        decserie: vagaMatricula.decserie,
        media_atendimento: vagaMatricula.media_atendimento,
        total_turmas: vagaMatricula.total_turmas,
        vagas_oferecidas: vagaMatricula.vagas_oferecidas,
        vagas_remanecentes: vagaMatricula.vagas_remanecentes
      });
    }
  });
  return matriculas;
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
