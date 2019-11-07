export const listaParaSelect = (lista, parametro) => {
  let novaLista = [];
  lista.forEach(elemento => {
    novaLista.push({ label: elemento[parametro], value: elemento[parametro] });
  });
  return novaLista;
};

export const formatarListaTiposescola = lista => {
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].tipoesc === "MOVA") {
      lista.splice(i, 1);
    }
  }
  return lista;
};
