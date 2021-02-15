export const pontuarValor = (valor) => {
  return parseFloat(valor).toLocaleString();
};

export const tipoEscolaFormatar = (tipoEscola) => {
  switch (tipoEscola) {
    case "CEI DIRET":
    case "CEI INDIR":
    case "CR.P.CONV":
      return "CEI";
    case "ESP CONV":
    case "E TECNICA":
    case "MOVA":
      return "";
    case "CEU AT COMPL":
      return "CEU";
    case "CCI/CIPS":
      return "CCI";
    default:
      return tipoEscola;
  }
};

export const SIGLA_NOME_ESCOLA = [
  "DEP. ",
  ", DEP.",
  "VER. ",
  ", VER.",
  ", VER",
  "DR. ",
  ", DR.",
  "BRIG. ",
  ", BRIG.",
  "CDE. ",
  ", CDE.",
  "CEL. ",
  ", CEL.",
  "CTE. ",
  ", CTE.",
  "DA. ",
  ", DA.",
  "DES. ",
  ", DES.",
  "DRA. ",
  ", DRA.",
  "CTE. ",
  ", CTE.",
  "ENG. ",
  ", ENG.",
  ", ENG",
  "GEN. ",
  ", GEN.",
  "GOV. ",
  ", GOV.",
  "IRMA ",
  ", IRMA",
  "MAL. ",
  ", MAL.",
  "ME. ",
  ", ME.",
  "PE. ",
  ", PE.",
  "PREF. ",
  ", PREF.",
  "PRES. ",
  ", PRES.",
  "PROFA. ",
  ", PROFA.",
  "PROF. ",
  ", PROF.",
  ", PROF",
  "SEN. ",
  ", SEN.",
  "VEREADOR. ",
  ", VEREADOR.",
];

export const limpaStrNomeEscola = (nome) => {
  if (nome) {
    for (let i = 0; i < SIGLA_NOME_ESCOLA.length; i++) {
      nome = nome.replace(SIGLA_NOME_ESCOLA[i], "");
    }
    nome = nome.replace(".", "").replace(",", "").replace(/ /g, "");
  }
  return nome;
};

export const nomeEscolaFormatar = (escola) => {
  if (
    limpaStrNomeEscola(escola.nomesc) ===
      limpaStrNomeEscola(escola.nomescofi) ||
    !escola.nomescofi
  ) {
    return tipoEscolaFormatar(escola.tipoesc) + " " + escola.nomesc;
  } else {
    return (
      tipoEscolaFormatar(escola.tipoesc) +
      " " +
      escola.nomesc +
      " - " +
      tipoEscolaFormatar(escola.tipoesc) +
      " " +
      escola.nomescofi
    );
  }
};
