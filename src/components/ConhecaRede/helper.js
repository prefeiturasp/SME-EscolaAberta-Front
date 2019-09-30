export const agregarDefaultDiretoriaRegional = lista => {
  return [{ diretoria: "Selecione uma DRE", dre: "" }].concat(lista);
};

export const getKey = obj => {
  return Object.keys(obj)[0];
};

export const dreLabel = (dres, value) => {
  let label = value;
  dres.forEach(dre => {
    if (dre.dre === value) {
      label = dre.diretoria;
    }
  });
  return label;
};

export const formatarData = data => {
  let novaData = data.split("-");
  return novaData[2] + "/" + novaData[1] + "/" + novaData[0];
};