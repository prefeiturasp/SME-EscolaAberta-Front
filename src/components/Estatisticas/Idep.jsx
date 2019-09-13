import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars, faChartBar} from "@fortawesome/free-solid-svg-icons";
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
    }

    render() {
        return(
            <div>
                <div className="mt-5 mb-5">
                    <div className="estatisticas-cabecalho mb-5">
                        <h1 className="border-bottom font-weight-light">IDEP</h1>
                        <div className="referencia mt-1 mb-5">Data de referência: {this.state.referencia}</div>
                    </div>
                    <div key="avaliacao-da-escola" className="card shadow-sm mb-3">
                        <div className="card-header bg-white d-flex align-items-center">
                            <FontAwesomeIcon icon={faChartBar} className="cor-azul" />
                            <div className="ml-3 fonte-14 font-weight-bold">Avaliação da Escola</div>
                            <a className="text-decoration-none cor-cinza ml-auto" data-toggle="collapse"
                               data-target='#avaliacao-da-escola' aria-expanded="false" aria-controls='avaliacao-da-escola' href='#avaliacao-da-escola'>
                                <FontAwesomeIcon icon={faBars} className="stretched-link" /> 
                            </a>
                        </div>

                        <div className="collapse fade" id='avaliacao-da-escola'>
                            <div className="card-body">
                                <div className='row'>
                                    <div className='col-12 col-md-4'>
                                        <p className='fonte-14'>Sua escola está inserida em um grupo com os seguintes índices:</p>
                                    </div>
                                    <div className='col-12 col-md-8'>
                                        Estou no Body
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}