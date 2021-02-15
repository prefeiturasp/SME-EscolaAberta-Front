const API_IDEP_LOGIN = "REPLACE_IDEP_LOGIN";
const USUARIO_RF = "REPLACE_USUARIO_RF";
const USUARIO_CPF = "REPLACE_USUARIO_CPF";
const USUARIO_MES = "REPLACE_USUARIO_MES";
const USUARIO_ANO = "REPLACE_USUARIO_ANO";

export async function loginIdep() {
  const requestInfo = {
    method: "POST",
    body: JSON.stringify({
      rf: USUARIO_RF,
      cpf: USUARIO_CPF,
      mesnasc: USUARIO_MES,
      anonasc: USUARIO_ANO
    }),
    headers: new Headers({
      "Content-type": "application/json",
      Accept: "application/json"
    })
  };
  return await fetch(`${API_IDEP_LOGIN}/login/`, requestInfo)
    .then(resposta => {
      if (resposta.ok) {
        return resposta.json();
      } else {
        throw new Error("Não foi possível se logar!!");
      }
    })
    .then(token => {
      localStorage.setItem("auth-token", token.token);
    });
}

export async function dadosIdep(codesc = null) {
  const BASE_HEADER = {
    method: "GET",
    headers: {
      Authorization: `JWT ${localStorage.getItem("auth-token")}`
    }
  };

  if (codesc && localStorage.getItem("auth-token")) {
    return await fetch(`${API_IDEP_LOGIN}/barchart/${codesc}`, BASE_HEADER)
      .then(resposta => {
        if (resposta.ok) {
          return resposta.json();
        } else {
          throw new Error("Não foi possível obter os dados desta escola");
        }
      })
      .catch(error => {
        console.log(error.message);
      });
  }
}
