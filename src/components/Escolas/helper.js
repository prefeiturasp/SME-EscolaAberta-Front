export const listaParaSelect = (lista, parametro) => {
  let novaLista = [];
  lista.forEach(elemento => {
    novaLista.push({ label: elemento[parametro], value: elemento[parametro] });
  });
  return novaLista;
};
