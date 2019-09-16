import React, { Component } from 'react';
import IdepAvaliacaoDaEscola from "./IdepAvaliacaoDaEscola";
import IdepCalculo from "./IdepCalculo";
const API_IDEP_LOGIN = process.env.REACT_APP_API_IDEP_LOGIN
const USUARIO_RF = process.env.REACT_APP_USUARIO_RF
const USUARIO_CPF = process.env.REACT_APP_USUARIO_CPF
const USUARIO_MES = process.env.REACT_APP_USUARIO_MES
const USUARIO_ANO = process.env.REACT_APP_USUARIO_ANO

export default class Idep extends Component{
    constructor(props){
        super(props);
        this.state = {
            codesc: this.props.codesc,
            referencia: "",
            ano_inicial:'',
            ano_final:'',
        };
    }

    componentWillMount() {
        this.setState({ referencia: new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString() });

        // Fazendo o Login e Obtendo o Token
        const requestInfo = {
            method:'POST',
            body:JSON.stringify({rf: USUARIO_RF, cpf:USUARIO_CPF, mesnasc: USUARIO_MES, anonasc:USUARIO_ANO}),
            headers: new Headers({
                'Content-type' : 'application/json',
                Accept:'application/json'
            })
        };
        fetch(`${API_IDEP_LOGIN}/login/`, requestInfo)
            .then(resposta =>{
                if (resposta.ok){
                    return resposta.json();
                }else {
                    throw new Error('Não foi possível se logar!!');
                }
            })
            .then(token => {
                localStorage.setItem('auth-token',token.token);
            })
            .catch(error =>{
                console.log(error.message);
            });

        const BASE_HEADER = {
            method: "GET",
            headers: {
                Authorization: `JWT ${localStorage.getItem('auth-token')}`
            }
        };
        fetch(`${API_IDEP_LOGIN}/barchart/${this.state.codesc}`,  BASE_HEADER)
            .then(resposta => {
                if (resposta.ok){
                    return resposta.json();
                }else{
                    throw new Error('Não foi possível obter os dados desta escola');
                }
            })
            .then(retorno =>{
                this.setState({ano_inicial: retorno.result.ano_inicial})
                this.setState({ano_final: retorno.result.ano_final})
            })
            .catch(error =>{
                console.log(error.message);
            });
    }

    render() {
        return(
            <div>
                <div className="mt-5 mb-5 container-geral-idep">
                    <div className="estatisticas-cabecalho mb-5">
                        <h1 className="border-bottom font-weight-light">IDEP</h1>
                        <div className="referencia mt-1 mb-5">Data de referência: {this.state.referencia}</div>
                    </div>
                    {
                        (this.state.ano_inicial && this.state.ano_final)
                            ? <IdepAvaliacaoDaEscola anoInicial={this.state.ano_inicial} anoFinal = {this.state.ano_final}/>
                            : null
                    }

                    {
                        (this.state.ano_inicial && this.state.ano_final)
                            ? <IdepCalculo anoInicial={this.state.ano_inicial} anoFinal = {this.state.ano_final}/>
                            : null
                    }

                </div>
            </div>
        );
    }


}