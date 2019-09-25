export const inicializarTiposEscola = [
  {
    "CENTRO DE CONVIVENCIA INFANTIL / CENTRO INFANTIL DE PROTECAO A SAUDE": {
      faixas: []
    }
  },
  {
    "CENTRO DE EDUCACAO E CULTURA INDIGENA": {
      faixas: []
    }
  },
  {
    "CENTRO DE EDUCACAO INFANTIL DIRETO": {
      faixas: []
    }
  },
  {
    "CENTRO DE EDUCACAO INFANTIL INDIRETO": {
      faixas: []
    }
  },
  {
    "CENTRO EDUCACIONAL UNIFICADO - CEI": {
      faixas: []
    }
  },
  {
    "CENTRO EDUCACIONAL UNIFICADO - EMEF": {
      faixas: []
    }
  },
  {
    "CENTRO EDUCACIONAL UNIFICADO - EMEI": {
      faixas: []
    }
  },
  {
    "CENTRO INTEGRADO DE EDUCACAO DE JOVENS E ADULTOS": {
      faixas: []
    }
  },
  {
    "CENTRO MUNICIPAL DE CAPACITACAO E TREINAMENTO": {
      faixas: []
    }
  },
  {
    "CENTRO MUNICIPAL DE EDUCACAO INFANTIL": {
      faixas: []
    }
  },
  {
    "CRECHE PARTICULAR CONVENIADA": {
      faixas: []
    }
  },
  {
    "ESCOLA MUNICIPAL DE EDUCACAO BILINGUE PARA SURDOS": {
      faixas: []
    }
  },
  {
    "ESCOLA MUNICIPAL DE EDUCACAO INFANTIL": {
      faixas: []
    }
  },
  {
    "ESCOLA MUNICIPAL DE ENSINO FUNDAMENTAL": {
      faixas: []
    }
  },
  {
    "ESCOLA MUNICIPAL DE ENSINO FUNDAMENTAL E MEDIO": {
      faixas: []
    }
  },
  {
    "ESCOLA TECNICA": {
      faixas: []
    }
  },
  {
    "MOVIMENTO DE ALFABETIZACAO": {
      faixas: []
    }
  },
  {
    "CENTRO EDUCACIONAL UNIFICADO - ATENDIMENTO COMPLEMENTAR": {
      faixas: []
    }
  },
  {
    "ESCOLAS ESPECIAIS CONVENIADAS": {
      faixas: []
    }
  }
];

export const formatarEscolas = tiposEscola => {
  let novoTiposEscola = inicializarTiposEscola;
  novoTiposEscola.forEach(elem => {
    elem[getKey(elem)].faixas = [];
  });
  tiposEscola.forEach(tipoEscola => {
    tipoEscola.tipoesc = tipoEscolaLabel(tipoEscola);
    novoTiposEscola.forEach((_, indice) => {
      if (novoTiposEscola[indice][tipoEscola.tipoesc] !== undefined) {
        novoTiposEscola[indice][tipoEscola.tipoesc].faixas.push({
          faixa: tipoEscola.faixa,
          count: tipoEscola.count
        });
      }
    });
  });
  return novoTiposEscola;
};

export const tipoEscolaLabel = tipoEscola => {
  switch (tipoEscola.tipoesc) {
    case "EMEF":
      return "ESCOLA MUNICIPAL DE ENSINO FUNDAMENTAL";
    case "EMEFM":
      return "ESCOLA MUNICIPAL DE ENSINO FUNDAMENTAL E MEDIO";
    case "ESP CONV":
      return "ESCOLAS ESPECIAIS CONVENIADAS";
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
    case "EMEI":
      return "ESCOLA MUNICIPAL DE EDUCACAO INFANTIL";
    case "CEU EMEI":
      return "CENTRO EDUCACIONAL UNIFICADO - EMEI";
    case "CEU EMEF":
      return "CENTRO EDUCACIONAL UNIFICADO - EMEF";
    case "CEU CEI":
      return "CENTRO EDUCACIONAL UNIFICADO - CEI";
    case "CCI/CIPS":
      return "CENTRO DE CONVIVENCIA INFANTIL / CENTRO INFANTIL DE PROTECAO A SAUDE";
    case "CR.P.CONV":
      return "CRECHE PARTICULAR CONVENIADA";
    case "CEMEI":
      return "CENTRO MUNICIPAL DE EDUCACAO INFANTIL";
    case "E TECNICA":
      return "ESCOLA TECNICA";
    case "CEU AT COMPL":
      return "CENTRO EDUCACIONAL UNIFICADO - ATENDIMENTO COMPLEMENTAR";
    case "CMCT":
      return "CENTRO MUNICIPAL DE CAPACITACAO E TREINAMENTO";
    case "CECI":
      return "CENTRO DE EDUCACAO E CULTURA INDIGENA";
    default:
      return tipoEscola.tipoesc;
  }
};

export const getKey = obj => {
  return Object.keys(obj)[0];
};

export const quantidadeAlunos = (tipoEscola, faixa) => {
  const indice = tipoEscola[getKey(tipoEscola)].faixas.findIndex(
    item => item.faixa === faixa
  );
  if (indice !== -1) {
    return tipoEscola[getKey(tipoEscola)].faixas[indice].count;
  } else {
    return 0;
  }
};

export const totalAlunosTipoEscola = tipoEscola => {
  let count = 0;
  tipoEscola[getKey(tipoEscola)].faixas.forEach(faixa => {
    count += faixa.count;
  });
  return count;
};

export const inicializaTotalPorFaixa = [
  {
    faixa: "Sem estudantes cadastrados",
    total: 0
  },
  {
    faixa: "1 a 250 estudantes",
    total: 0
  },
  {
    faixa: "251 a 500 estudantes",
    total: 0
  },
  {
    faixa: "501 a 1000 estudantes",
    total: 0
  },
  {
    faixa: "1001 a 1500 estudantes",
    total: 0
  },
  {
    faixa: "1501 a 2000 estudantes",
    total: 0
  },
  {
    faixa: "2001 a 2500 estudantes",
    total: 0
  }
];

export const totalPorFaixa = tiposEscolaFormatado => {
  let totalPorFaixa = inicializaTotalPorFaixa;
  totalPorFaixa.forEach(elem => {
    elem.total = 0;
  });
  tiposEscolaFormatado.forEach(tipoEscola => {
    tipoEscola[getKey(tipoEscola)].faixas.forEach(faixa => {
      const indice = totalPorFaixa.findIndex(
        faixa_total => faixa_total.faixa === faixa.faixa
      );
      if (indice !== -1) totalPorFaixa[indice].total += faixa.count;
    });
  });
  return totalPorFaixa;
};

export const total = tiposEscolaFormatado => {
  let total = 0;
  tiposEscolaFormatado = totalPorFaixa(tiposEscolaFormatado);
  tiposEscolaFormatado.forEach(tipoEscola => {
    total += tipoEscola.total;
  });
  return total;
};
