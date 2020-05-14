import { pontuarValor } from "components/utils";
import { listarCEUs } from "services/escolas";

export const inicializarTiposEscola = [
  {
    "CENTRO DE CONVIVENCIA INFANTIL / CENTRO INFANTIL DE PROTECAO A SAUDE": {
      faixas: [],
    },
  },
  {
    "CENTRO DE EDUCACAO E CULTURA INDIGENA": {
      faixas: [],
    },
  },
  {
    "CENTRO DE EDUCACAO INFANTIL DIRETO": {
      faixas: [],
    },
  },
  {
    "CENTRO DE EDUCACAO INFANTIL INDIRETO": {
      faixas: [],
    },
  },
  {
    "CENTRO INTEGRADO DE EDUCACAO DE JOVENS E ADULTOS": {
      faixas: [],
    },
  },
  {
    "CENTRO MUNICIPAL DE CAPACITACAO E TREINAMENTO": {
      faixas: [],
    },
  },
  {
    "CENTRO MUNICIPAL DE EDUCACAO INFANTIL": {
      faixas: [],
    },
  },
  {
    "CENTRO DE EDUCACAO INFANTIL PARCEIRO": {
      faixas: [],
    },
  },
  {
    "ESCOLA MUNICIPAL DE EDUCACAO BILINGUE PARA SURDOS": {
      faixas: [],
    },
  },
  {
    "ESCOLA MUNICIPAL DE EDUCACAO INFANTIL": {
      faixas: [],
    },
  },
  {
    "ESCOLA MUNICIPAL DE ENSINO FUNDAMENTAL": {
      faixas: [],
    },
  },
  {
    "ESCOLA MUNICIPAL DE ENSINO FUNDAMENTAL E MEDIO": {
      faixas: [],
    },
  },
  {
    "ESCOLA TECNICA": {
      faixas: [],
    },
  },
  {
    "MOVIMENTO DE ALFABETIZACAO": {
      faixas: [],
    },
  },
  {
    "CENTRO EDUCACIONAL UNIFICADO": {
      faixas: [],
    },
  },
  {
    "ESCOLAS ESPECIAS PARCEIRAS": {
      faixas: [],
    },
  },
];

export const inicializarGruposEscolas = [
  {
    "EDUCAÇÃO INFANTIL": {
      ativo: false,
      escolas: [
        {
          tipo_escola: "CENTRO DE EDUCACAO INFANTIL DIRETO",
          faixas: [],
          sigla: "CEI DIRETO",
        },
        {
          tipo_escola: "CENTRO DE EDUCACAO INFANTIL INDIRETO",
          faixas: [],
          sigla: "CEI INDIRETO",
        },
        {
          tipo_escola: "CENTRO DE EDUCACAO INFANTIL PARCEIRO",
          faixas: [],
          sigla: "CEI PARCEIRO",
        },
        {
          tipo_escola: "CENTRO MUNICIPAL DE EDUCACAO INFANTIL",
          faixas: [],
          sigla: "CEMEI",
        },
        {
          tipo_escola: "ESCOLA MUNICIPAL DE EDUCACAO INFANTIL",
          faixas: [],
          sigla: "EMEI",
        },
        {
          tipo_escola:
            "CENTRO DE CONVIVENCIA INFANTIL / CENTRO INFANTIL DE PROTECAO A SAUDE",
          faixas: [],
          sigla: "CCI",
        },
      ],
    },
  },
  {
    "ENSINO FUNDAMENTAL E MÉDIO": {
      ativo: false,
      escolas: [
        {
          tipo_escola: "ESCOLA MUNICIPAL DE ENSINO FUNDAMENTAL",
          faixas: [],
          sigla: "EMEF",
        },
        {
          tipo_escola: "ESCOLA MUNICIPAL DE ENSINO FUNDAMENTAL E MEDIO",
          faixas: [],
          sigla: "EMEFM",
        },
      ],
    },
  },
  {
    "EDUCAÇÃO DE JOVENS E ADULTOS": {
      ativo: false,
      escolas: [
        {
          tipo_escola: "CENTRO INTEGRADO DE EDUCACAO DE JOVENS E ADULTOS",
          faixas: [],
          sigla: "CIEJA",
        },
      ],
    },
  },
  {
    "CURSOS TÉCNICOS E PROFISSIONALIZANTES": {
      ativo: false,
      escolas: [
        {
          tipo_escola: "CENTRO MUNICIPAL DE CAPACITACAO E TREINAMENTO",
          faixas: [],
          sigla: "CMCT",
        },
        {
          tipo_escola: "ESCOLA TECNICA",
          faixas: [],
          sigla: "ESCOLA TECNICA",
        },
      ],
    },
  },
  {
    "EDUCAÇÃO ESCOLAR INDÍGENA": {
      ativo: false,
      escolas: [
        {
          tipo_escola: "CENTRO DE EDUCACAO E CULTURA INDIGENA",
          faixas: [],
          sigla: "CECI",
        },
      ],
    },
  },
  {
    "EDUCAÇÃO ESPECIAL": {
      ativo: false,
      escolas: [
        {
          tipo_escola: "ESCOLA MUNICIPAL DE EDUCACAO BILINGUE PARA SURDOS",
          faixas: [],
          sigla: "EMEBS",
        },
        {
          tipo_escola: "ESCOLAS ESPECIAS PARCEIRAS",
          faixas: [],
          sigla: "ESPECIAIS",
        },
      ],
    },
  },
  {
    CEUs: {
      ativo: false,
      escolas: [
        {
          tipo_escola: "CENTRO EDUCACIONAL UNIFICADO",
          faixas: [],
          sigla: "CEU",
        },
      ],
    },
  },
];

export const formatarEscolas = (tiposEscola) => {
  let novoTiposEscola = inicializarTiposEscola;
  novoTiposEscola.forEach((elem) => {
    elem[getKey(elem)].faixas = [];
  });
  tiposEscola.forEach((tipoEscola) => {
    tipoEscola.tipoesc = tipoEscolaLabel(tipoEscola);
    novoTiposEscola.forEach((_, indice) => {
      if (novoTiposEscola[indice][tipoEscola.tipoesc] !== undefined) {
        let faixaExiste = false;
        if (novoTiposEscola[indice][tipoEscola.tipoesc].faixas.length) {
          novoTiposEscola[indice][tipoEscola.tipoesc].faixas.forEach(
            (faixa) => {
              if (faixa.faixa === tipoEscola.faixa) {
                faixa.count += tipoEscola.count;
                faixaExiste = true;
              }
            }
          );
        }
        if (!faixaExiste) {
          novoTiposEscola[indice][tipoEscola.tipoesc].faixas.push({
            faixa: tipoEscola.faixa,
            count: tipoEscola.count,
          });
        }
      }
    });
  });
  return novoTiposEscola;
};

export const formatarEscolasPorGrupo = (novoTiposEscola) => {
  let gruposEscolas = inicializarGruposEscolas;
  gruposEscolas.forEach((grupoEscola) => {
    grupoEscola[getKey(grupoEscola)].escolas.forEach((escola) => {
      escola.faixas = [];
    });
  });
  gruposEscolas.forEach((grupoEscola) => {
    grupoEscola[getKey(grupoEscola)].escolas.forEach((escola) => {
      novoTiposEscola.forEach((novoTipoEscola) => {
        if (escola.tipo_escola === getKey(novoTipoEscola)) {
          escola.faixas = novoTipoEscola[getKey(novoTipoEscola)].faixas;
        }
      });
    });
  });
  gruposEscolas = acrescentarTotalPorFaixa(gruposEscolas);
  gruposEscolas = acrescentarTotal(gruposEscolas);
  return gruposEscolas;
};

export const acrescentarTotalPorFaixa = (grupoEscolas) => {
  inicializaTotalPorFaixa.forEach((faixaLabel) => {
    grupoEscolas.forEach((grupo) => {
      let totalPorFaixa = 0;
      grupo[getKey(grupo)].escolas.forEach((escola) => {
        escola.faixas.forEach((faixa) => {
          if (faixaLabel.faixa === faixa.faixa) {
            totalPorFaixa += faixa.count;
          }
        });
      });
      grupo[getKey(grupo)][faixaLabel.faixa] = totalPorFaixa;
    });
  });
  return grupoEscolas;
};

export const acrescentarTotal = (grupoEscolas) => {
  grupoEscolas.forEach((grupo) => {
    let total = 0;
    grupo[getKey(grupo)].escolas.forEach((escola) => {
      inicializaTotalPorFaixa.forEach((faixaLabel) => {
        escola.faixas.forEach((faixa) => {
          if (faixaLabel.faixa === faixa.faixa) {
            total += faixa.count;
          }
        });
      });
    });
    grupo[getKey(grupo)].total = total;
  });
  return grupoEscolas;
};

export const quantidadeAlunosGrupo = (escola, faixa) => {
  const indice = escola.faixas.findIndex((item) => item.faixa === faixa);
  if (indice !== -1) {
    return escola.faixas[indice].count;
  } else {
    return 0;
  }
};

export const tipoEscolaLabel = (tipoEscola) => {
  switch (tipoEscola.tipoesc.trim()) {
    case "CEU EMEF":
    case "EMEF":
      return "ESCOLA MUNICIPAL DE ENSINO FUNDAMENTAL";
    case "EMEFM":
      return "ESCOLA MUNICIPAL DE ENSINO FUNDAMENTAL E MEDIO";
    case "ESP CONV":
      return "ESCOLAS ESPECIAS PARCEIRAS";
    case "MOVA":
      return "MOVIMENTO DE ALFABETIZACAO";
    case "CIEJA":
      return "CENTRO INTEGRADO DE EDUCACAO DE JOVENS E ADULTOS";
    case "CEI DIRET":
      return "CENTRO DE EDUCACAO INFANTIL DIRETO";
    case "CEI INDIR":
      return "CENTRO DE EDUCACAO INFANTIL INDIRETO";
    case "EMEBS":
      return "ESCOLA MUNICIPAL DE EDUCACAO BILINGUE PARA SURDOS";
    case "CEU EMEI":
    case "EMEI":
      return "ESCOLA MUNICIPAL DE EDUCACAO INFANTIL";
    case "CCI/CIPS":
      return "CENTRO DE CONVIVENCIA INFANTIL / CENTRO INFANTIL DE PROTECAO A SAUDE";
    case "CR.P.CONV":
      return "CENTRO DE EDUCACAO INFANTIL PARCEIRO";
    case "CEU CEI":
    case "CEMEI":
      return "CENTRO MUNICIPAL DE EDUCACAO INFANTIL";
    case "E TECNICA":
      return "ESCOLA TECNICA";
    case "CEU AT COMPL":
      return "CENTRO EDUCACIONAL UNIFICADO";
    case "CMCT":
      return "CENTRO MUNICIPAL DE CAPACITACAO E TREINAMENTO";
    case "CECI":
      return "CENTRO DE EDUCACAO E CULTURA INDIGENA";
    default:
      return tipoEscola.tipoesc;
  }
};

export const getKey = (obj) => {
  return Object.keys(obj)[0];
};

export const totalAlunosTipoEscolaGrupo = (tipoEscola) => {
  let count = 0;
  tipoEscola.faixas.forEach((faixa) => {
    count += faixa.count;
  });
  return pontuarValor(count);
};

export const inicializaTotalPorFaixa = [
  {
    faixa: "Sem estudantes cadastrados",
    total: 0,
  },
  {
    faixa: "1 a 250 estudantes",
    total: 0,
  },
  {
    faixa: "251 a 500 estudantes",
    total: 0,
  },
  {
    faixa: "501 a 1000 estudantes",
    total: 0,
  },
  {
    faixa: "1001 a 1500 estudantes",
    total: 0,
  },
  {
    faixa: "1501 a 2000 estudantes",
    total: 0,
  },
  {
    faixa: "2001 a 2500 estudantes",
    total: 0,
  },
  {
    faixa: "Mais que 2500 estudantes",
    total: 0,
  },
];

export const totalPorFaixa = (tiposEscolaFormatado) => {
  let totalPorFaixa = inicializaTotalPorFaixa;
  totalPorFaixa.forEach((elem) => {
    elem.total = 0;
  });
  tiposEscolaFormatado.forEach((tipoEscola) => {
    if (getKey(tipoEscola) !== "MOVIMENTO DE ALFABETIZACAO") {
      tipoEscola[getKey(tipoEscola)].faixas.forEach((faixa) => {
        const indice = totalPorFaixa.findIndex(
          (faixa_total) => faixa_total.faixa === faixa.faixa
        );
        if (indice !== -1) totalPorFaixa[indice].total += faixa.count;
      });
    }
  });
  return totalPorFaixa;
};

export const total = (tiposEscolaFormatado) => {
  let total = 0;
  tiposEscolaFormatado = totalPorFaixa(tiposEscolaFormatado);
  tiposEscolaFormatado.forEach((tipoEscola) => {
    total += tipoEscola.total;
  });
  return pontuarValor(total);
};

export const unificaTipoEscola = (listaTiposEscola, ceus) => {
  listaTiposEscola = listaTiposEscola.filter(
    (escola) => escola.tipoesc.trim() !== "CEU AT COMPL"
  );
  listaTiposEscola.push({
    tipoesc: "CEU AT COMPL",
    faixa: "Sem estudantes cadastrados",
    count: ceus.count,
  });
  return listaTiposEscola;
};
