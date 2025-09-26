# SME-EscolaAberta-Front


# Repositórios

Repositórios de código que envolvem a solução:  
- SME-EscolaAberta-API: [https://github.com/prefeiturasp/SME-EscolaAberta-API](https://github.com/prefeiturasp/SME-EscolaAberta-API)
- SME-EscolaAberta-Front: [https://github.com/prefeiturasp/SME-EscolaAberta-Front](https://github.com/prefeiturasp/SME-EscolaAberta-Front)


# Instalação e Configuração

Projeto EscolaAberta Frontend interface gráfica onde os usuários do sistema poderão interagir com a <a  href="https://github.com/prefeiturasp/SME-EscolaAberta-API" target="_blank">EscolaAberta API</a>

**Pré-requisitos**

- npm
- nvm (utilizar versão do node 18.20.8)

**Passos**

1.  clonar o projeto

```
git clone https://github.com/prefeiturasp/SME-EscolaAberta-Front
```

2.  criar arquivo `.env.local` na raiz do projeto com a variável de ambiente:

```
REACT_APP_API_EOL=
REACT_APP_API_RUA=
REACT_APP_API_CEP=
REACT_APP_API_NOMINATIM=
REACT_APP_API_IDEP_LOGIN=
REACT_APP_USUARIO_RF=
REACT_APP_USUARIO_CPF=
REACT_APP_USUARIO_MES=
REACT_APP_USUARIO_ANO=
REACT_APP_NODE_ENV="local"
```

3.  instalar bibliotecas

```
npm install
```

4.  rodar o projeto

```
npm start
```

5.  rodar testes

```
npm test
```
