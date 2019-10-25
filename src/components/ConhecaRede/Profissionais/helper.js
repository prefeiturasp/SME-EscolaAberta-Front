import { pontuarValor } from "components/utils";

export const formatarCargosProfissionais = cargosProfessores => {
  let novoCargosProfessores = [];
  let indice = 0;
  cargosProfessores.forEach(elem => {
    elem.titulo = cargoLabel(elem.titulo);
    let i;
    let achou = false;
    for (i = 0; i < indice + 1; i++) {
      if (
        novoCargosProfessores[i] &&
        novoCargosProfessores[i][elem.titulo] !== undefined
      ) {
        let jaTemEssaFormacao = false;
        novoCargosProfessores[i][elem.titulo].formacoes.forEach(formacao => {
          if (formacao.formacao === elem.formacao) {
            formacao.total += elem.total;
            jaTemEssaFormacao = true;
          }
        });
        if (!jaTemEssaFormacao) {
          novoCargosProfessores[i][elem.titulo].formacoes.push({
            formacao: elem.formacao,
            total: elem.total
          });
        }
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
  novoCargosProfessores = novoCargosProfessores.sort((a, b) =>
    getKey(a) > getKey(b) ? 1 : -1
  );
  return novoCargosProfessores;
};

export const cargosPorGrupo = novoCargosProfessores => {
  let grupos = inicializarGruposCargos;
  grupos.forEach(grupo => {
    grupo[getKey(grupo)].licenciatura_curta = 0;
    grupo[getKey(grupo)].licenciatura_plena = 0;
    grupo[getKey(grupo)].total = 0;
    grupo[getKey(grupo)].cargos.forEach(cargo => {
      cargo.formacoes = [];
    });
  });
  grupos.forEach(grupo => {
    grupo[getKey(grupo)].cargos.forEach(cargo => {
      const indice = novoCargosProfessores.findIndex(
        cargoFormatado => getKey(cargoFormatado) === cargo.tipo_cargo
      );
      if (indice !== -1) {
        cargo.formacoes =
          novoCargosProfessores[indice][cargo.tipo_cargo].formacoes;
        cargo.formacoes.forEach(formacao => {
          if (formacao.formacao === "LICENCIATURA CURTA") {
            grupo[getKey(grupo)].licenciatura_curta += formacao.total;
            grupo[getKey(grupo)].total += formacao.total;
          } else if (formacao.formacao === "LICENCIATURA PLENA") {
            grupo[getKey(grupo)].licenciatura_plena += formacao.total;
            grupo[getKey(grupo)].total += formacao.total;
          }
        });
      }
    });
  });
  return grupos;
};

export const getKey = obj => {
  return Object.keys(obj)[0];
};

export const totalProfissionaisPorEscolaridade = (cargo, titulo) => {
  const indice = cargo.formacoes.findIndex(
    formacao => formacao.formacao === titulo
  );
  if (indice !== -1) return pontuarValor(cargo.formacoes[indice].total);
  else return 0;
};

export const totalDoCargoPorEscolaridade = cargo => {
  let count = 0;
  cargo.formacoes.forEach(formacao => {
    if (
      formacao.formacao === "LICENCIATURA CURTA" ||
      formacao.formacao === "LICENCIATURA PLENA"
    )
      count += formacao.total;
  });
  return pontuarValor(count);
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
  return pontuarValor(total);
};

export const cargoLabel = cargo => {
  switch (cargo) {
    case "AGENTE DE APOIO - NIVEL I":
    case "AGENTE DE APOIO - NIVEL II":
      return "AGENTE DE APOIO - NÍVEIS I E II";
    case "ANALISTA ASSIST.DESENV.SOCIAL I":
    case "ANALISTA ASSIST.DESENV.SOCIAL IV":
      return "ANALISTA ASSISTENTE DE DESENVOLVIMENTO SOCIAL - NÍVEIS I E IV";
    case "ANALISTA DE INF.CULT. E DESP.- BIBLIOTECA":
      return "ANALISTA DE INFORMAÇÕES TÉCNICAS, CULTURAIS E DESPORTO - BIBLIOTECA";
    case "ANALISTA DE INF.CULT.E DESP.- ED.FISICA":
      return "ANALISTA DE INFORMAÇÕES TÉCNICAS, CULTURAIS E DESPORTO - EDUCAÇÃO FÍSICA";
    case "ANALISTA DE SAUDE NIVEL I":
    case "ANALISTA DE SAUDE NIVEL II":
    case "ANALISTA DE SAUDE NIVEL III":
    case "ANALISTA DE SAUDE NIVEL IV":
      return "ANALISTA DE SAÚDE - NÍVEIS I, II, III E IV";
    case "ANALISTA PLANEJ.DESENV.ORG.II":
    case "ANALISTA PLANEJ.DESENV.ORG.IV":
      return "ANALISTA DE PLANEJAMENTO E DESENVOLVIMENTO ORGANIZACIONAL – II E IV";
    case "ASSESSOR TECNICO I":
      return "ASSESSOR TÉCNICO I";
    case "ASSESSOR TECNICO II":
      return "ASSESSOR TÉCNICO II";
    case "ASSIST. DE ATIVIDADES ARTISTICAS":
      return "ASSISTENTE DE ATIVIDADES ARTÍSTICAS";
    case "ASSIST.DE SUPORTE TECNICO-N.I":
      return "ASSISTENTE DE SUPORTE TÉCNICO - NÍVEL I";
    case "ASSIST.GESTAO POLITICAS PUBLICAS-N.I":
    case "ASSIST.GESTAO POLITICAS PUBLICAS-N.II":
      return "ASSISTENTE DE GESTÃO E POLÍTICAS PÚBLICAS - NÍVEIS I E II";
    case "ASSISTENTE DE SAUDE - NIVEL I":
    case "ASSISTENTE DE SAUDE - NIVEL II":
    case "ASSISTENTE DE SAUDE - NIVEL III":
      return "ASSISTENTE DE SAÚDE – NÍVEIS I, II E III";
    case "ASSISTENTE TECNICO EDUCACIONAL":
      return "ASSISTENTE TÉCNICO EDUCACIONAL";
    case "AUXILIAR ADM. DE ENSINO":
      return "AUXILIAR ADMINISTRATIVO DE ENSINO";
    case "AUXILIAR TECNICO DE EDUCACAO":
      return "AUXILIAR TÉCNICO DE EDUCAÇÃO";
    case "COORDENADOR DE ACAO CULTURAL":
      return "COORDENADOR DE AÇÃO CULTURAL";
    case "COORDENADOR DE ACAO EDUCACIONAL":
      return "COORDENADOR DE AÇÃO EDUCACIONAL";
    case "COORDENADOR PEDAGOGICO":
      return "COORDENADOR PEDAGÓGICO";
    case "DIRETOR DE DIVISAO TECNICA":
      return "DIRETOR DE DIVISÃO TÉCNICA";
    case "DIRETOR DE NUCLEO TECNICO":
      return "DIRETOR DE NÚCLEO TÉCNICO";
    case "ESP.INF.TEC.CULT.DESP.-BIBLIOTECA":
      return "ESPECIALISTA EM INFORMAÇÕES TÉCNICAS, CULTURAIS E DESPORTO - BIBLIOTECA";
    case "ESP.INF.TEC.CULT.DESP.-ED.FISICA":
      return "ESPECIALISTA EM INFORMAÇÕES TÉCNICAS, CULTURAIS E DESPORTO - EDUCAÇÃO FÍSICA";
    case "PROF.1.GRAU NIVEL II":
      return "PROFESSOR 1º GRAU NÍVEL II";
    case "PROF.ADJ.DE ENS.FUND. I":
      return "PROFESSOR ADJUNTO DE ENSINO FUNDAMENTAL I";
    case "PROF.ADJ.ENS.FUND.II-CIENCIAS":
      return "PROFESSOR ADJUNTO DE ENSINO FUNDAMENTAL II - CIÊNCIAS";
    case "PROF.ADJ.ENS.FUND.II-GEOGRAFIA":
      return "PROFESSOR ADJUNTO DE ENSINO FUNDAMENTAL II - GEOGRAFIA";
    case "PROF.ADJ.ENS.FUND.II-MATEMATICA":
      return "PROFESSOR ADJUNTO DE ENSINO FUNDAMENTAL II - MATEMÁTICA";
    case "PROF.DE ED.INFANTIL":
      return "PROFESSOR DE EDUCAÇÃO INFANTIL";
    case "PROF.ED.INF.E ENS.FUND.I":
      return "PROFESSOR DE EDUCAÇÃO INFANTIL E ENSINO FUNDAMENTAL I";
    case "PROF.ENS.FUND.II E MED.-ARTES":
      return "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - ARTES";
    case "PROF.ENS.FUND.II E MED.-BIOLOGIA":
      return "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - BIOLOGIA";
    case "PROF.ENS.FUND.II E MED.-CIENCIAS":
      return "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - CIENCIAS";
    case "PROF.ENS.FUND.II E MED.-CONT.CUSTOS":
      return "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - CONTROLE DE CUSTOS";
    case "PROF.ENS.FUND.II E MED.-ECON.MERCADO":
      return "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - ECONOMIA DE MERCADO";
    case "PROF.ENS.FUND.II E MED.-ED.FISICA":
      return "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - EDUCAÇÃO FÍSICA";
    case "PROF.ENS.FUND.II E MED.-ESPANHOL":
      return "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - ESPANHOL";
    case "PROF.ENS.FUND.II E MED.-FILOSOFIA":
      return "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - FILOSOGIA";
    case "PROF.ENS.FUND.II E MED.-FISICA":
      return "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - FÍSICA";
    case "PROF.ENS.FUND.II E MED.-GEOGRAFIA":
      return "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - GEOGRAFIA";
    case "PROF.ENS.FUND.II E MED.-HIST.FILOS.EDUC.":
      return "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - HISTÓRIA E FILOSOFIA DA EDUCAÇÃO";
    case "PROF.ENS.FUND.II E MED.-HISTORIA":
      return "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - HISTÓRIA";
    case "PROF.ENS.FUND.II E MED.-INGLES":
      return "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - INGLÊS";
    case "PROF.ENS.FUND.II E MED.-MATEMATICA":
      return "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - MATEMÁTICA";
    case "PROF.ENS.FUND.II E MED.-PORTUGUES":
      return "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - PORTUGUÊS";
    case "PROF.ENS.FUND.II E MED.-PSICOLOGIA":
      return "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - PSICOLOGIA";
    case "PROF.ENS.FUND.II E MED.-QUIMICA":
      return "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - QUÍMICA";
    case "PROF.ENS.FUND.II E MED.-SOCIOLOGIA":
      return "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - SOCIOLIGIA";
    case "PROF.ENS.FUND.II E MEDIO-OUTR.COMP.":
      return "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - OUTROS COMPONENTES";
    case "PROF.ENS.FUND.II.E MED.-ADM.CONTROLE":
      return "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - ADMINISTRAÇÃO E CONTROLE";
    case "PROF.SUBST.DE 1.GR. NIVEL I":
      return "PROFESSOR SUBSTITUTO DE 1º GRAU NÍVEL I";
    case "PROF.SUBST.DE EDUCACAO INFANTIL":
      return "PROFESSOR SUBSTITUTO DE EDUCAÇÃO INFANTIL";
    case "PROF.TITULAR DE EDUCACAO INFANTIL":
      return "PROFESSOR TITULAR DE EDUCAÇÃO INFANTIL";
    case "PROF.TITULAR DE ENS.FUND.I":
      return "PROFESSOR TITULAR DE ENSINO FUNDAMENTAL I";
    case "PROFESSOR DE 2.GRAU":
      return "PROFESSOR DE 2º GRAU";
    case "PROFISSIONAL DE ENG. ARQ. AGR. GEO. I":
      return "PROFISSIONAL DE ENGENHARIA, ARQUITETURA, AGRONOMIA E GEOLOGIA I";
    case "SECRETARIO DE ESCOLA":
      return "SECRETÁRIO DE ESCOLA";
    case "SUPERVISOR TECNICO II":
      return "SUPERVISOR TÉCNICO II";
    case "ASSISTENTE TECNICO DE EDUCACAO I":
      return "ASSISTENTE TÉCNICO DE EDUCAÇÃO";
    case "ASSISTENTE TECNICO I":
      return "ASSISTENTE TÉCNICO I";
    case "COORDENADOR":
      return "COORDENADOR GERAL";
    default:
      return cargo;
  }
};

export const inicializarGruposCargos = [
  {
    "GESTÃO DA REDE MUNICIPAL DE EDUCAÇÃO": {
      ativo: false,
      licenciatura_curta: 0,
      licenciatura_plena: 0,
      total: 0,
      cargos: [
        {
          tipo_cargo: "DIRETOR REGIONAL DE EDUCAÇÃO",
          formacoes: []
        },
        {
          tipo_cargo: "GESTOR DE CENTRO EDUCACIONAL UNIFICADO",
          formacoes: []
        },
        {
          tipo_cargo: "COORDENADOR GERAL",
          formacoes: []
        },
        {
          tipo_cargo: "COORDENADOR II",
          formacoes: []
        },
        {
          tipo_cargo: "COORDENADOR IV",
          formacoes: []
        },
        {
          tipo_cargo: "COORDENADOR V",
          formacoes: []
        },
        {
          tipo_cargo: "COORDENADOR DE ESPORTES E LAZER",
          formacoes: []
        },
        {
          tipo_cargo: "COORDENADOR DE AÇÃO CULTURAL",
          formacoes: []
        },
        {
          tipo_cargo: "COORDENADOR DE AÇÃO EDUCACIONAL",
          formacoes: []
        },
        {
          tipo_cargo: "COORDENADOR DE PROJETOS",
          formacoes: []
        },
        {
          tipo_cargo: "DIRETOR DE DIVISÃO TÉCNICA",
          formacoes: []
        },
        {
          tipo_cargo: "DIRETOR DE NÚCLEO TÉCNICO",
          formacoes: []
        },
        {
          tipo_cargo: "SUPERVISOR ESCOLAR",
          formacoes: []
        },
        {
          tipo_cargo: "OFICIAL DE GABINETE",
          formacoes: []
        },
        {
          tipo_cargo:
            "ANALISTA ASSISTENTE DE DESENVOLVIMENTO SOCIAL - NÍVEIS I E IV",
          formacoes: []
        },
        {
          tipo_cargo:
            "ANALISTA DE INFORMAÇÕES TÉCNICAS, CULTURAIS E DESPORTO - BIBLIOTECA",
          formacoes: []
        },
        {
          tipo_cargo:
            "ANALISTA DE INFORMAÇÕES TÉCNICAS, CULTURAIS E DESPORTO - EDUCAÇÃO FÍSICA",
          formacoes: []
        },
        {
          tipo_cargo: "ANALISTA DE SAÚDE - NÍVEIS I, II, III E IV",
          formacoes: []
        },
        {
          tipo_cargo:
            "ANALISTA DE PLANEJAMENTO E DESENVOLVIMENTO ORGANIZACIONAL – II E IV",
          formacoes: []
        },
        {
          tipo_cargo: "ASSESSOR I",
          formacoes: []
        },
        {
          tipo_cargo: "ASSESSOR II",
          formacoes: []
        },
        {
          tipo_cargo: "ASSESSOR TÉCNICO I",
          formacoes: []
        },
        {
          tipo_cargo: "ASSESSOR TÉCNICO II",
          formacoes: []
        },
        {
          tipo_cargo: "ASSESSOR TÉCNICO III",
          formacoes: []
        },
        {
          tipo_cargo: "ASSISTENTE TÉCNICO I",
          formacoes: []
        },
        {
          tipo_cargo: "ASSISTENTE DE ATIVIDADES ARTÍSTICAS",
          formacoes: []
        },
        {
          tipo_cargo: "ASSISTENTE DE SUPORTE TÉCNICO - NÍVEL I",
          formacoes: []
        },
        {
          tipo_cargo: "ASSISTENTE TÉCNICO EDUCACIONAL",
          formacoes: []
        },
        {
          tipo_cargo:
            "ESPECIALISTA EM INFORMAÇÕES TÉCNICAS, CULTURAIS E DESPORTO - BIBLIOTECA",
          formacoes: []
        },
        {
          tipo_cargo:
            "ESPECIALISTA EM INFORMAÇÕES TÉCNICAS, CULTURAIS E DESPORTO - EDUCAÇÃO FÍSICA",
          formacoes: []
        },
        {
          tipo_cargo:
            "PROFISSIONAL DE ENGENHARIA, ARQUITETURA, AGRONOMIA E GEOLOGIA I",
          formacoes: []
        },
        {
          tipo_cargo: "SUPERVISOR TÉCNICO II",
          formacoes: []
        }
      ]
    }
  },
  {
    "GESTÃO ESCOLAR": {
      ativo: false,
      licenciatura_curta: 0,
      licenciatura_plena: 0,
      total: 0,
      cargos: [
        {
          tipo_cargo: "DIRETOR DE ESCOLA",
          formacoes: []
        },
        {
          tipo_cargo: "COORDENADOR PEDAGÓGICO",
          formacoes: []
        },
        {
          tipo_cargo: "ASSISTENTE DE DIRETOR DE ESCOLA",
          formacoes: []
        },
        {
          tipo_cargo: "AUXILIAR DE DESENVOLVIMENTO INFANTIL",
          formacoes: []
        },
        {
          tipo_cargo: "PROFESSOR TITULAR DE EDUCAÇÃO INFANTIL",
          formacoes: []
        },
        {
          tipo_cargo: "PROFESSOR DE EDUCAÇÃO INFANTIL",
          formacoes: []
        },
        {
          tipo_cargo: "PROFESSOR SUBSTITUTO DE EDUCAÇÃO INFANTIL",
          formacoes: []
        },
        {
          tipo_cargo: "PROFESSOR DE EDUCAÇÃO INFANTIL E ENSINO FUNDAMENTAL I",
          formacoes: []
        },
        {
          tipo_cargo: "PROFESSOR 1º GRAU NÍVEL II",
          formacoes: []
        },
        {
          tipo_cargo: "PROFESSOR SUBSTITUTO DE 1º GRAU NÍVEL I",
          formacoes: []
        },
        {
          tipo_cargo: "PROFESSOR TITULAR DE ENSINO FUNDAMENTAL I",
          formacoes: []
        },
        {
          tipo_cargo: "PROFESSOR ADJUNTO DE ENSINO FUNDAMENTAL I",
          formacoes: []
        },
        {
          tipo_cargo: "PROFESSOR DE 2º GRAU",
          formacoes: []
        },
        {
          tipo_cargo: "PROFESSOR ADJUNTO DE ENSINO FUNDAMENTAL II - CIÊNCIAS",
          formacoes: []
        },
        {
          tipo_cargo: "PROFESSOR ADJUNTO DE ENSINO FUNDAMENTAL II - GEOGRAFIA",
          formacoes: []
        },
        {
          tipo_cargo: "PROFESSOR ADJUNTO DE ENSINO FUNDAMENTAL II - MATEMÁTICA",
          formacoes: []
        },
        {
          tipo_cargo: "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - ARTES",
          formacoes: []
        },
        {
          tipo_cargo: "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - BIOLOGIA",
          formacoes: []
        },
        {
          tipo_cargo: "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - CIENCIAS",
          formacoes: []
        },
        {
          tipo_cargo:
            "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - CONTROLE DE CUSTOS",
          formacoes: []
        },
        {
          tipo_cargo:
            "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - ECONOMIA DE MERCADO",
          formacoes: []
        },
        {
          tipo_cargo:
            "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - EDUCAÇÃO FÍSICA",
          formacoes: []
        },
        {
          tipo_cargo: "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - ESPANHOL",
          formacoes: []
        },
        {
          tipo_cargo: "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - FILOSOGIA",
          formacoes: []
        },
        {
          tipo_cargo: "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - FÍSICA",
          formacoes: []
        },
        {
          tipo_cargo: "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - GEOGRAFIA",
          formacoes: []
        },
        {
          tipo_cargo:
            "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - HISTÓRIA E FILOSOFIA DA EDUCAÇÃO",
          formacoes: []
        },
        {
          tipo_cargo: "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - HISTÓRIA",
          formacoes: []
        },
        {
          tipo_cargo: "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - INGLÊS",
          formacoes: []
        },
        {
          tipo_cargo: "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - MATEMÁTICA",
          formacoes: []
        },
        {
          tipo_cargo: "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - PORTUGUÊS",
          formacoes: []
        },
        {
          tipo_cargo: "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - PSICOLOGIA",
          formacoes: []
        },
        {
          tipo_cargo: "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - QUÍMICA",
          formacoes: []
        },
        {
          tipo_cargo: "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - SOCIOLIGIA",
          formacoes: []
        },
        {
          tipo_cargo:
            "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - OUTROS COMPONENTES",
          formacoes: []
        },
        {
          tipo_cargo:
            "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - ADMINISTRAÇÃO E CONTROLE",
          formacoes: []
        }
      ]
    }
  },
  {
    "QUADRO DE APOIO": {
      ativo: false,
      licenciatura_curta: 0,
      licenciatura_plena: 0,
      total: 0,
      cargos: [
        {
          tipo_cargo: "AGENTE DE APOIO - NÍVEIS I E II",
          formacoes: []
        },
        {
          tipo_cargo: "AGENTE ESCOLAR",
          formacoes: []
        },
        {
          tipo_cargo: "AUXILIAR ADMINISTRATIVO DE ENSINO",
          formacoes: []
        },
        {
          tipo_cargo: "AUXILIAR TÉCNICO DE EDUCAÇÃO",
          formacoes: []
        },
        {
          tipo_cargo: "AUXILIAR DE SECRETARIA",
          formacoes: []
        },
        {
          tipo_cargo: "ASSISTENTE TÉCNICO DE EDUCAÇÃO",
          formacoes: []
        },
        {
          tipo_cargo: "INSPETOR DE ALUNOS",
          formacoes: []
        },
        {
          tipo_cargo: "SECRETÁRIO DE ESCOLA",
          formacoes: []
        },
        {
          tipo_cargo: "ENCARREGADO DE EQUIPE",
          formacoes: []
        },
        {
          tipo_cargo: "ENCARREGADO DE EQUIPE I",
          formacoes: []
        },
        {
          tipo_cargo: "ENCARREGADO DE EQUIPE II",
          formacoes: []
        },
        {
          tipo_cargo: "ASSISTENTE DE SAÚDE – NÍVEIS I, II E III",
          formacoes: []
        },
        {
          tipo_cargo:
            "ASSISTENTE DE GESTÃO E POLÍTICAS PÚBLICAS - NÍVEIS I E II",
          formacoes: []
        }
      ]
    }
  }
];
