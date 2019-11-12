export const pontuarValor = valor => {
  return parseFloat(valor).toLocaleString();
};

export const tipoEscolaFormatar = tipoEscola => {
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
