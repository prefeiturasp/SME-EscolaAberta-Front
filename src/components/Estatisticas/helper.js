export const totalEstudantes = (lista, turno) => {
  let totalEstudantes = 0;
  lista.forEach(elem => {
    if (elem.desc_turno === turno){
      totalEstudantes += elem.matric;
    }
  })
  return totalEstudantes;
};
