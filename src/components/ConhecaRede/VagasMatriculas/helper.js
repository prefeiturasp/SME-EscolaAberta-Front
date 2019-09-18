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
