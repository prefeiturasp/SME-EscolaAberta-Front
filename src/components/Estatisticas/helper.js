import { getKey } from "components/ConhecaRede/Profissionais/helper";

export const totalEstudantes = (lista, turno) => {
  let totalEstudantes = 0;
  lista.forEach(elem => {
    if (elem.desc_turno === turno) {
      totalEstudantes += elem.matric;
    }
  });
  return totalEstudantes;
};

export const totalDeProfissionais = lista => {
  let total = 0;
  lista.forEach(elem => {
    total += elem.total;
  });
  return total;
};

const EDUCACAO_INFANTIL = [
  "BERCARIO I",
  "BERCARIO I ESC DIFERENCIADA",
  "BERCARIO II",
  "BERCARIO II ESC DIFERENCIADA",
  "INFANTIL I",
  "INFANTIL I	E II",
  "INFANTIL I	ESC DIFERENCIADA",
  "INFANTIL II",
  "INFANTIL II ESC DIFERENCIADA",
  "MINI GRUPO I",
  "MINI GRUPO I	ESC DIFERENCIADA",
  "MINI GRUPO II",
  "MINI GRUPO II ESC DIFERENCIADA"
];

export const EDUCACAO_INFANTIL_ESPECIAL = [
  "INFANTIL I FI",
  "INFANTIL II FI",
  "INFANTIL LIBRAS EMEI"
];

export const EJA_CIEJA = ["M I", "M II", "M III", "M IV"];

export const EJA_ESCOLAS_EDUCACAO_ESPECIAL = [
  "EJA COMPLEMENTAR II EE",
  "EJA FINAL I EE",
  "EJA FINAL II EE"
];

export const EJA_ESCOLAS_ENSINO_FUNDAMENTAL = [
  "1. EJA MODULAR",
  "2. EJA MODULAR",
  "3. EJA MODULAR",
  "4. EJA MODULAR",
  "EJA ALFABETIZACAO I",
  "EJA ALFABETIZACAO II",
  "EJA BASICA I",
  "EJA BASICA II",
  "EJA COMPLEMENTAR I",
  "EJA COMPLEMENTAR II",
  "EJA FINAL I",
  "EJA FINAL II"
];

export const ENSINO_FUNDAMENTAL_DE_9_ANOS = [
  "1. ANO",
  "2. ANO",
  "3. ANO",
  "4. ANO",
  "5. ANO",
  "6. ANO",
  "7. ANO",
  "8. ANO",
  "9. ANO"
];

export const ENSINO_FUNDAMENTAL_9_ANOS_ESPECIAL = [
  "1. ANO",
  "2. ANO",
  "3. ANO",
  "4. ANO",
  "5. ANO",
  "6. ANO",
  "7. ANO",
  "8. ANO",
  "9. ANO",
  "CLASSE BILINGUE I"
];

export const ENSINO_MEDIO = ["1. SERIE", "2. SERIE", "3. SERIE"];

export const ESPEC_ENS_MEDIO = ["1. SERIE"];

export const NORMAL = ["1. ANO"];

export const TECNICO_MEDIO = [
  "1. MODULO",
  "1. MODULO NAO SME",
  "2. MODULO",
  "2. MODULO NAO SME",
  "3. MODULO",
  "3. MODULO NAO SME",
  "4. MODULO",
  "4. MODULO NAO SME"
];

const TITULOS = [
  {
    "EDUCACAO INFANTIL": EDUCACAO_INFANTIL
  },
  { "EDUCACAO INFANTIL ESPECIAL": EDUCACAO_INFANTIL_ESPECIAL },
  { "EJA CIEJA": EJA_CIEJA },
  { "EJA ESCOLAS EDUCACAO ESPECIAL": EJA_ESCOLAS_EDUCACAO_ESPECIAL },
  { "EJA ESCOLAS ENSINO FUNDAMENTAL": EJA_ESCOLAS_ENSINO_FUNDAMENTAL },
  { "ENSINO FUNDAMENTAL 9 ANOS ESPECIAL": ENSINO_FUNDAMENTAL_9_ANOS_ESPECIAL },
  { "ENSINO FUNDAMENTAL DE 9 ANOS": ENSINO_FUNDAMENTAL_DE_9_ANOS },
  { "ENSINO MEDIO": ENSINO_MEDIO },
  { "ESPEC ENS MEDIO": ESPEC_ENS_MEDIO },
  { "NORMAL": NORMAL },
  { "TECNICO MEDIO": TECNICO_MEDIO }
];

export const formatarVagasMatriculas = vagasMatriculas => {
  vagasMatriculas.forEach(vagaMatricula => {
    TITULOS.forEach(titulo => {
      if (getKey(titulo) === vagaMatricula.serie) {
        vagaMatricula.titulo = true;
      }
    });
  });
  let posicao = 0;
  vagasMatriculas.forEach(vagaMatricula => {
    if (vagaMatricula.titulo) {
      vagaMatricula.posicao = posicao;
      posicao++;
      vagasMatriculas.forEach(matricula => {
        const indice = TITULOS.findIndex(
          titulo => getKey(titulo) === vagaMatricula.serie
        );
        if (TITULOS[indice][vagaMatricula.serie].includes(matricula.serie)) {
          matricula.posicao = posicao;
          posicao++;
        }
      });
    }
  });
  return vagasMatriculas.sort((a, b) => (a.posicao > b.posicao ? 1 : -1));
};
