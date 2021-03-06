export const formatarDados = dados => {
  if (typeof dados.indices.indices === "object") {
    let indices_indices = [];
    dados.indices.indices.forEach(indice => {
      try {
        indices_indices.push(indice.toFixed(2));
      } catch {
        indices_indices.push(indice);
      }
    });
    dados.indices.indices = indices_indices;
  }
  if (typeof dados.metas.metas === "object") {
    let metas_metas = [];
    dados.metas.metas.forEach(meta => {
      try {
        metas_metas.push(meta.toFixed(2));
      } catch {
        metas_metas.push(meta);
      }
    });
    dados.metas.metas = metas_metas;
  }
  return dados;
};
