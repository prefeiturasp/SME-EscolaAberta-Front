export const formatarDados = dados => {
  let indices_indices = [];
  dados.indices.indices.forEach(indice => {
    indices_indices.push(indice.toFixed(2));
  });
  dados.indices.indices = indices_indices;
  let metas_metas = [];
  dados.metas.metas.forEach(meta => {
    metas_metas.push(meta.toFixed(2));
  });
  dados.metas.metas = metas_metas;
  return dados;
};
