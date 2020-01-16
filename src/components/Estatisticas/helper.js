import {
  getKey,
  cargoLabel
} from "components/ConhecaRede/Profissionais/helper";
import {
  labelDecserie,
  labelModalidade
} from "components/ConhecaRede/VagasMatriculas/helper";

export const totalEstudantes = (lista, turno) => {
  let totalEstudantes = 0;
  lista.forEach(elem => {
    if (elem.desc_turno === turno) {
      totalEstudantes += elem.matric;
    }
  });
  return totalEstudantes;
};

export const totalDeProfissionais = lista => {
  let total = 0;
  lista.forEach(elem => {
    total += elem.total;
  });
  return total;
};

const EDUCACAO_INFANTIL = [
  "BERCARIO I",
  "BERCARIO I ESC DIFERENCIADA",
  "BERCARIO II",
  "BERCARIO II ESC DIFERENCIADA",
  "INFANTIL I",
  "INFANTIL I	E II",
  "INFANTIL I	ESC DIFERENCIADA",
  "INFANTIL II",
  "INFANTIL II ESC DIFERENCIADA",
  "MINI GRUPO I",
  "MINI GRUPO I	ESC DIFERENCIADA",
  "MINI GRUPO II",
  "MINI GRUPO II ESC DIFERENCIADA"
];

export const EDUCACAO_INFANTIL_ESPECIAL = [
  "INFANTIL I FI",
  "INFANTIL II FI",
  "INFANTIL LIBRAS EMEI"
];

export const EJA_CIEJA = ["M I", "M II", "M III", "M IV"];

export const EJA_ESCOLAS_EDUCACAO_ESPECIAL = [
  "EJA COMPLEMENTAR II EE",
  "EJA FINAL I EE",
  "EJA FINAL II EE"
];

export const EJA_ESCOLAS_ENSINO_FUNDAMENTAL = [
  "1. EJA MODULAR",
  "2. EJA MODULAR",
  "3. EJA MODULAR",
  "4. EJA MODULAR",
  "EJA ALFABETIZACAO I",
  "EJA ALFABETIZACAO II",
  "EJA BASICA I",
  "EJA BASICA II",
  "EJA COMPLEMENTAR I",
  "EJA COMPLEMENTAR II",
  "EJA FINAL I",
  "EJA FINAL II"
];

export const ENSINO_FUNDAMENTAL_DE_9_ANOS = [
  "1. ANO",
  "2. ANO",
  "3. ANO",
  "4. ANO",
  "5. ANO",
  "6. ANO",
  "7. ANO",
  "8. ANO",
  "9. ANO"
];

export const ENSINO_FUNDAMENTAL_9_ANOS_ESPECIAL = [
  "1. ANO",
  "2. ANO",
  "3. ANO",
  "4. ANO",
  "5. ANO",
  "6. ANO",
  "7. ANO",
  "8. ANO",
  "9. ANO",
  "CLASSE BILINGUE I"
];

export const ENSINO_MEDIO = ["1. SERIE", "2. SERIE", "3. SERIE"];

export const ESPEC_ENS_MEDIO = ["1. SERIE"];

export const NORMAL = ["1. ANO"];

export const TECNICO_MEDIO = [
  "1. MODULO",
  "1. MODULO NAO SME",
  "2. MODULO",
  "2. MODULO NAO SME",
  "3. MODULO",
  "3. MODULO NAO SME",
  "4. MODULO",
  "4. MODULO NAO SME"
];

const TITULOS = [
  {
    "EDUCACAO INFANTIL": EDUCACAO_INFANTIL
  },
  { "EDUCACAO INFANTIL ESPECIAL": EDUCACAO_INFANTIL_ESPECIAL },
  { "EJA CIEJA": EJA_CIEJA },
  { "EJA ESCOLAS EDUCACAO ESPECIAL": EJA_ESCOLAS_EDUCACAO_ESPECIAL },
  { "EJA ESCOLAS ENSINO FUNDAMENTAL": EJA_ESCOLAS_ENSINO_FUNDAMENTAL },
  { "ENSINO FUNDAMENTAL 9 ANOS ESPECIAL": ENSINO_FUNDAMENTAL_9_ANOS_ESPECIAL },
  { "ENSINO FUNDAMENTAL DE 9 ANOS": ENSINO_FUNDAMENTAL_DE_9_ANOS },
  { "ENSINO MEDIO": ENSINO_MEDIO },
  { "ESPEC ENS MEDIO": ESPEC_ENS_MEDIO },
  { "NORMAL": NORMAL },
  { "TECNICO MEDIO": TECNICO_MEDIO }
];

export const formatarVagasMatriculas = vagasMatriculas => {
  vagasMatriculas.forEach(vagaMatricula => {
    TITULOS.forEach(titulo => {
      if (getKey(titulo) === vagaMatricula.serie) {
        vagaMatricula.titulo = true;
      }
    });
  });
  let posicao = 0;
  vagasMatriculas.forEach(vagaMatricula => {
    if (vagaMatricula.titulo) {
      vagaMatricula.posicao = posicao;
      posicao++;
      vagasMatriculas.forEach(matricula => {
        const indice = TITULOS.findIndex(
          titulo => getKey(titulo) === vagaMatricula.serie
        );
        if (TITULOS[indice][vagaMatricula.serie].includes(matricula.serie)) {
          matricula.posicao = posicao;
          posicao++;
        }
      });
    }
  });
  vagasMatriculas.forEach(vagaMatricula => {
    vagaMatricula.serie = labelDecserie(labelModalidade(vagaMatricula.serie));
  });
  vagasMatriculas = vagasMatriculas.sort((a, b) =>
    a.posicao > b.posicao ? 1 : -1
  );
  vagasMatriculas = normalizarDecserieAnos(vagasMatriculas);
  return vagasMatriculas;
};

export const normalizarDecserieAnos = matriculas => {
  let tipoMatricula = "";
  matriculas.forEach(matricula => {
    if (
      matricula.serie === "ENSINO FUNDAMENTAL" ||
      matricula.serie === "ENSINO MÉDIO" ||
      matricula.serie === "EDUCAÇÃO PROFISSIONAL" ||
      matricula.serie === "EDUCAÇÃO INFANTIL" ||
      matricula.serie === "EDUCAÇÃO ESPECIAL" ||
      matricula.serie === "EDUCAÇÃO EJA JOVENS E ADULTOS"
    ) {
      tipoMatricula = matricula.serie;
    }
    if (matricula.serie.includes("ANO")) {
      if (tipoMatricula === "EDUCAÇÃO ESPECIAL") {
        if (!matricula.serie.includes("MÉDIO")) {
          matricula.serie += " FUNDAMENTAL ESPECIAL";
        } else {
          matricula.serie = "1º ANO ESPECIAL MÉDIO";
        }
      } else if (tipoMatricula === "ENSINO FUNDAMENTAL") {
        matricula.serie += " FUNDAMENTAL";
      } else if (
        tipoMatricula === "ENSINO MÉDIO" &&
        !matricula.serie.includes("MÉDIO")
      ) {
        matricula.serie += " NORMAL";
      }
    }
  });
  return matriculas;
};

export const formatarConhecaservidores = servidoresCargos => {
  let servidoresPorGrupo = inicializarGruposConhecaEquipe;
  servidoresPorGrupo.forEach(grupo => {
    grupo[getKey(grupo)].licenciatura_curta = 0;
    grupo[getKey(grupo)].licenciatura_plena = 0;
    grupo[getKey(grupo)].total = 0;
    grupo[getKey(grupo)].cargos.forEach(cargo => {
      cargo.servidores = [];
    });
  });
  servidoresCargos.forEach(servidor => {
    servidoresPorGrupo.forEach(grupo => {
      grupo[getKey(grupo)].cargos.forEach(cargo => {
        if (cargo.tipo_cargo === cargoLabel(servidor.dc_cargo_atual.trim())) {
          cargo.servidores.push(servidor);
          grupo[getKey(grupo)].total += 1;
        }
      });
    });
  });
  return servidoresPorGrupo;
};

export const inicializarGruposConhecaEquipe = [
  {
    "GESTÃO DA REDE MUNICIPAL DE EDUCAÇÃO": {
      ativo: false,
      total: 0,
      cargos: [
        {
          tipo_cargo: "DIRETOR REGIONAL DE EDUCAÇÃO",
          servidores: []
        },
        {
          tipo_cargo: "GESTOR DE CENTRO EDUCACIONAL UNIFICADO",
          servidores: []
        },
        {
          tipo_cargo: "COORDENADOR GERAL",
          servidores: []
        },
        {
          tipo_cargo: "COORDENADOR II",
          servidores: []
        },
        {
          tipo_cargo: "COORDENADOR IV",
          servidores: []
        },
        {
          tipo_cargo: "COORDENADOR V",
          servidores: []
        },
        {
          tipo_cargo: "COORDENADOR DE ESPORTES E LAZER",
          servidores: []
        },
        {
          tipo_cargo: "COORDENADOR DE AÇÃO CULTURAL",
          servidores: []
        },
        {
          tipo_cargo: "COORDENADOR DE AÇÃO EDUCACIONAL",
          servidores: []
        },
        {
          tipo_cargo: "COORDENADOR DE PROJETOS",
          servidores: []
        },
        {
          tipo_cargo: "DIRETOR DE DIVISÃO TÉCNICA",
          servidores: []
        },
        {
          tipo_cargo: "DIRETOR DE NÚCLEO TÉCNICO",
          servidores: []
        },
        {
          tipo_cargo: "SUPERVISOR ESCOLAR",
          servidores: []
        },
        {
          tipo_cargo: "OFICIAL DE GABINETE",
          servidores: []
        },
        {
          tipo_cargo:
            "ANALISTA ASSISTENTE DE DESENVOLVIMENTO SOCIAL - NÍVEIS I E IV",
          servidores: []
        },
        {
          tipo_cargo:
            "ANALISTA DE INFORMAÇÕES TÉCNICAS, CULTURAIS E DESPORTO - BIBLIOTECA",
          servidores: []
        },
        {
          tipo_cargo:
            "ANALISTA DE INFORMAÇÕES TÉCNICAS, CULTURAIS E DESPORTO - EDUCAÇÃO FÍSICA",
          servidores: []
        },
        {
          tipo_cargo: "ANALISTA DE SAÚDE - NÍVEIS I, II, III E IV",
          servidores: []
        },
        {
          tipo_cargo:
            "ANALISTA DE PLANEJAMENTO E DESENVOLVIMENTO ORGANIZACIONAL – II E IV",
          servidores: []
        },
        {
          tipo_cargo: "ASSESSOR I",
          servidores: []
        },
        {
          tipo_cargo: "ASSESSOR II",
          servidores: []
        },
        {
          tipo_cargo: "ASSESSOR TÉCNICO I",
          servidores: []
        },
        {
          tipo_cargo: "ASSESSOR TÉCNICO II",
          servidores: []
        },
        {
          tipo_cargo: "ASSESSOR TÉCNICO III",
          servidores: []
        },
        {
          tipo_cargo: "ASSISTENTE TÉCNICO I",
          servidores: []
        },
        {
          tipo_cargo: "ASSISTENTE DE ATIVIDADES ARTÍSTICAS",
          servidores: []
        },
        {
          tipo_cargo: "ASSISTENTE DE SUPORTE TÉCNICO - NÍVEL I",
          servidores: []
        },
        {
          tipo_cargo: "ASSISTENTE TÉCNICO EDUCACIONAL",
          servidores: []
        },
        {
          tipo_cargo:
            "ESPECIALISTA EM INFORMAÇÕES TÉCNICAS, CULTURAIS E DESPORTO - BIBLIOTECA",
          servidores: []
        },
        {
          tipo_cargo:
            "ESPECIALISTA EM INFORMAÇÕES TÉCNICAS, CULTURAIS E DESPORTO - EDUCAÇÃO FÍSICA",
          servidores: []
        },
        {
          tipo_cargo:
            "PROFISSIONAL DE ENGENHARIA, ARQUITETURA, AGRONOMIA E GEOLOGIA I",
          servidores: []
        },
        {
          tipo_cargo: "SUPERVISOR TÉCNICO II",
          servidores: []
        }
      ]
    }
  },
  {
    "GESTÃO ESCOLAR": {
      ativo: false,
      total: 0,
      cargos: [
        {
          tipo_cargo: "DIRETOR DE ESCOLA",
          servidores: []
        },
        {
          tipo_cargo: "COORDENADOR PEDAGÓGICO",
          servidores: []
        },
        {
          tipo_cargo: "ASSISTENTE DE DIRETOR DE ESCOLA",
          servidores: []
        },
        {
          tipo_cargo: "AUXILIAR DE DESENVOLVIMENTO INFANTIL",
          servidores: []
        },
        {
          tipo_cargo: "PROFESSOR TITULAR DE EDUCAÇÃO INFANTIL",
          servidores: []
        },
        {
          tipo_cargo: "PROFESSOR DE EDUCAÇÃO INFANTIL",
          servidores: []
        },
        {
          tipo_cargo: "PROFESSOR SUBSTITUTO DE EDUCAÇÃO INFANTIL",
          servidores: []
        },
        {
          tipo_cargo: "PROFESSOR DE EDUCAÇÃO INFANTIL E ENSINO FUNDAMENTAL I",
          servidores: []
        },
        {
          tipo_cargo: "PROFESSOR 1º GRAU NÍVEL II",
          servidores: []
        },
        {
          tipo_cargo: "PROFESSOR SUBSTITUTO DE 1º GRAU NÍVEL I",
          servidores: []
        },
        {
          tipo_cargo: "PROFESSOR TITULAR DE ENSINO FUNDAMENTAL I",
          servidores: []
        },
        {
          tipo_cargo: "PROFESSOR ADJUNTO DE ENSINO FUNDAMENTAL I",
          servidores: []
        },
        {
          tipo_cargo: "PROFESSOR DE 2º GRAU",
          servidores: []
        },
        {
          tipo_cargo: "PROFESSOR ADJUNTO DE ENSINO FUNDAMENTAL II - CIÊNCIAS",
          servidores: []
        },
        {
          tipo_cargo: "PROFESSOR ADJUNTO DE ENSINO FUNDAMENTAL II - GEOGRAFIA",
          servidores: []
        },
        {
          tipo_cargo: "PROFESSOR ADJUNTO DE ENSINO FUNDAMENTAL II - MATEMÁTICA",
          servidores: []
        },
        {
          tipo_cargo: "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - ARTES",
          servidores: []
        },
        {
          tipo_cargo: "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - BIOLOGIA",
          servidores: []
        },
        {
          tipo_cargo: "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - CIENCIAS",
          servidores: []
        },
        {
          tipo_cargo:
            "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - CONTROLE DE CUSTOS",
          servidores: []
        },
        {
          tipo_cargo:
            "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - ECONOMIA DE MERCADO",
          servidores: []
        },
        {
          tipo_cargo:
            "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - EDUCAÇÃO FÍSICA",
          servidores: []
        },
        {
          tipo_cargo: "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - ESPANHOL",
          servidores: []
        },
        {
          tipo_cargo: "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - FILOSOGIA",
          servidores: []
        },
        {
          tipo_cargo: "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - FÍSICA",
          servidores: []
        },
        {
          tipo_cargo: "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - GEOGRAFIA",
          servidores: []
        },
        {
          tipo_cargo:
            "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - HISTÓRIA E FILOSOFIA DA EDUCAÇÃO",
          servidores: []
        },
        {
          tipo_cargo: "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - HISTÓRIA",
          servidores: []
        },
        {
          tipo_cargo: "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - INGLÊS",
          servidores: []
        },
        {
          tipo_cargo: "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - MATEMÁTICA",
          servidores: []
        },
        {
          tipo_cargo: "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - PORTUGUÊS",
          servidores: []
        },
        {
          tipo_cargo: "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - PSICOLOGIA",
          servidores: []
        },
        {
          tipo_cargo: "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - QUÍMICA",
          servidores: []
        },
        {
          tipo_cargo: "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - SOCIOLIGIA",
          servidores: []
        },
        {
          tipo_cargo:
            "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - OUTROS COMPONENTES",
          servidores: []
        },
        {
          tipo_cargo:
            "PROFESSOR DE ENSINO FUNDAMENTAL II E MÉDIO - ADMINISTRAÇÃO E CONTROLE",
          servidores: []
        }
      ]
    }
  },
  {
    "QUADRO DE APOIO": {
      ativo: false,
      total: 0,
      cargos: [
        {
          tipo_cargo: "AGENTE DE APOIO - NÍVEIS I E II",
          servidores: []
        },
        {
          tipo_cargo: "AGENTE ESCOLAR",
          servidores: []
        },
        {
          tipo_cargo: "AUXILIAR ADMINISTRATIVO DE ENSINO",
          servidores: []
        },
        {
          tipo_cargo: "AUXILIAR TÉCNICO DE EDUCAÇÃO",
          servidores: []
        },
        {
          tipo_cargo: "AUXILIAR DE SECRETARIA",
          servidores: []
        },
        {
          tipo_cargo: "ASSISTENTE TÉCNICO DE EDUCAÇÃO",
          servidores: []
        },
        {
          tipo_cargo: "INSPETOR DE ALUNOS",
          servidores: []
        },
        {
          tipo_cargo: "SECRETÁRIO DE ESCOLA",
          servidores: []
        },
        {
          tipo_cargo: "ENCARREGADO DE servidores",
          servidores: []
        },
        {
          tipo_cargo: "ENCARREGADO DE servidores I",
          servidores: []
        },
        {
          tipo_cargo: "ENCARREGADO DE servidores II",
          servidores: []
        },
        {
          tipo_cargo: "ASSISTENTE DE SAÚDE – NÍVEIS I, II E III",
          servidores: []
        },
        {
          tipo_cargo:
            "ASSISTENTE DE GESTÃO E POLÍTICAS PÚBLICAS - NÍVEIS I E II",
          servidores: []
        }
      ]
    }
  }
];
