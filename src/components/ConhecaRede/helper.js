export const agregarDefaultDiretoriaRegional = lista => {
  return [{ diretoria: "Selecione uma DRE", dre: "" }].concat(lista);
};

export const getKey = obj => {
  return Object.keys(obj)[0];
};
