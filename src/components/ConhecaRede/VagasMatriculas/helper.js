import { getKey } from "../helper";

export const mediaAtendimento = matricula => {
  let media = 0;
  matricula.decseries.forEach(item => {
    media += item.media_atendimento;
  })
  return Math.ceil(media / matricula.decseries.length);
}

export const normalizar9Anos = vagasMatriculasFormatadas => {
  let matricula9anos = null;
  let matriculaDe9anos = null;
  vagasMatriculasFormatadas.forEach((matricula, index) => {
    if (getKey(matricula) === "ENSINO FUNDAMENTAL 9 ANOS") {
      matricula9anos = matricula[getKey(matricula)];
    } else if (getKey(matricula) === "ENSINO FUNDAMENTAL DE 9 ANOS") {
      matriculaDe9anos = matricula[getKey(matricula)];
      matriculaDe9anos.indice = index;
    }
  });
  if (matricula9anos && matriculaDe9anos) {
    matricula9anos.decseries.forEach(decserie => {
      matriculaDe9anos.decseries.forEach(decserieDe9anos => {
        if (decserie.decserie === decserieDe9anos.decserie) {
          decserie.total_turmas += decserieDe9anos.total_turmas;
          decserie.vagas_oferecidas += decserieDe9anos.vagas_oferecidas;
          decserie.vagas_remanecentes += decserieDe9anos.vagas_remanecentes;
          decserie.media_atendimento += decserieDe9anos.media_atendimento;
        }
      })
    })
    matricula9anos.total_turmas += matriculaDe9anos.total_turmas;
    matricula9anos.vagas_oferecidas += matriculaDe9anos.vagas_oferecidas;
    matricula9anos.vagas_remanecentes += matriculaDe9anos.vagas_remanecentes;
    matricula9anos.media_atendimento = mediaAtendimento(matricula9anos);
    vagasMatriculasFormatadas.splice(matriculaDe9anos.indice, 1);
  }
  return vagasMatriculasFormatadas;
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
  return normalizar9Anos(matriculas);
};
