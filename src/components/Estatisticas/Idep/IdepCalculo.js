import React, {Component} from 'react';
import './idep.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faChartBar} from "@fortawesome/free-solid-svg-icons";

export default class IdepCalculo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            indice_exibicao: this.props.anoInicial.indices.indices[0],
            fluxo_exibicao: this.props.anoInicial.parametros.fluxo,
            aprendizado_exibicao: this.props.anoInicial.indices.indices[0] / this.props.anoInicial.parametros.fluxo.replace(",", "."),
            selectedOption: 'ano_inicial'
        };
    }

    handleOptionChange(evento) {
        this.setState({selectedOption: evento.target.value});
        if (evento.target.value === 'ano_inicial') {
            this.setState({indice_exibicao: this.props.anoInicial.indices.indices[0]});
            this.setState({fluxo_exibicao: this.props.anoInicial.parametros.fluxo});
            this.setState({aprendizado_exibicao: this.props.anoInicial.indices.indices[0] / this.props.anoInicial.parametros.fluxo.replace(",", ".")});
        } else if (evento.target.value === 'ano_final') {
            this.setState({indice_exibicao: this.props.anoFinal.indices.indices[0]});
            this.setState({fluxo_exibicao: this.props.anoFinal.parametros.fluxo});
            this.setState({aprendizado_exibicao: this.props.anoFinal.indices.indices[0] / this.props.anoFinal.parametros.fluxo.replace(",", ".")});
        }
    }

    static arredondamentoDecimal(numero) {
        let numero_em_string = numero.toString();
        if (numero_em_string.includes(',')) {
            numero_em_string.replace(',', '.');
        } else if (numero_em_string.includes('.')) {
            numero_em_string.replace(".", ",")
        }
        let n = parseFloat(numero_em_string).toFixed(2);
        return n.replace(".", ",")
    }

    render() {
        return (
            <div>
                <div key="calculo-idep" className="card shadow-sm mb-3">
                    <div className="card-header bg-white d-flex align-items-center">
                        <FontAwesomeIcon icon={faChartBar} className="cor-azul"/>
                        <div className="ml-3 fonte-14 font-weight-bold">Entenda como o IDEP é calculado</div>
                        <a className="text-decoration-none cor-cinza ml-auto" data-toggle="collapse"
                           data-target='#calculo-idep' aria-expanded="false" aria-controls='calculo-idep' href='#calculo-idep'>
                            <FontAwesomeIcon icon={faBars} className="stretched-link"/>
                        </a>
                    </div>
                    <div className="collapse fade" id='calculo-idep'>
                        <div className="card-body">
                            <div className="d-flex justify-content-end p-2 bd-highlight">
                                <div className="form-check form-check-inline">
                                    <input onChange={this.handleOptionChange.bind(this)} className="form-check-input" type="radio" name="escolhaAno" id="nse" value="ano_inicial" checked={this.state.selectedOption === 'ano_inicial'}/>
                                    <label className="form-check-label fonte-12" htmlFor="nse">Anos Iniciais</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input onChange={this.handleOptionChange.bind(this)} className="form-check-input" type="radio" name="escolhaAno" id="icg" value="ano_final" checked={this.state.selectedOption === 'ano_final'}/>
                                    <label className="form-check-label fonte-12" htmlFor="icg">Anos Finais</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12 col-md-4'>
                                    <div className="pb-4 mb-4">
                                        <p className='fonte-14 mb-4'>
                                            <strong>O Índice de Desenvolvimento da Educação (IDEP) </strong>foi criado
                                            para medir o desempenho das escolas da Rede Municipal de Ensino, levando em
                                            conta os componentes curriculares avaliados na Prova São Paulo e o fluxo
                                            escolar.
                                        </p>
                                        <p className='fonte-14 mt-4 mb-4'>O IDEP, portanto, combina aspectos pedagógicos e sociais, permitindo que a
                                            escola seja avaliada a partir da sua realidade.</p>
                                        <p className='fonte-14 mt-4 mb-4'>A combinação dessas informações traça um perfil da Rede que ajudará a
                                            identificar boas práticas e a planejar estratégias pedagógicas.</p>
                                    </div>
                                </div>
                                <div className='col-12 col-md-8'>
                                    <div className="container">
                                        <div className="row">

                                            <div className="col-md-3 block">
                                                <div className="mb-1 titulo-circle">Aprendizado</div>
                                                <div className="circle circle-azul-escuro">
                                                    <p className='titulo-numeros'>{IdepCalculo.arredondamentoDecimal(this.state.aprendizado_exibicao)}</p>
                                                </div>
                                                <div className="mt-3 cor-cinza bottom-label fonte-14">
                                                    Quanto maior a nota, maior o aprendizado
                                                </div>
                                            </div>

                                            <div className=" align-self-center d-lg-block d-none operadores">X</div>

                                            <div className="col-md-3 block">
                                                <div className="mb-1 titulo-circle">Fluxo</div>
                                                <div className="circle circle-verde">
                                                    <p className='titulo-numeros'>{this.state.fluxo_exibicao.substring(0, 4)}</p>
                                                </div>
                                                <div className="mt-3 cor-cinza bottom-label fonte-14">
                                                    Quanto maior o valor, maior a aprovação
                                                </div>
                                            </div>
                                            <div className=" align-self-center d-lg-block d-none operadores">=</div>
                                            <div className="col-md-3 block">
                                                <div className="mb-1 titulo-circle">IDEP</div>
                                                <div className="circle circle-azul-claro">
                                                    <p className='titulo-numeros'>{IdepCalculo.arredondamentoDecimal(this.state.indice_exibicao)}</p>
                                                </div>
                                                <div className="mt-3 cor-cinza bottom-label fonte-14">
                                                    Meta
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-12 border-top border-bottom">
                                            <p className="fonte-16 pt-2 pb-2 mb-0 ">Anos Iniciais</p>
                                        </div>
                                        <div className="col-md-3 block">
                                            <div className="circle circle-azul-claro mb-0">
                                                <p className="font-size-20">
                                                    <strong>Média Ponderada </strong>
                                                    <br/> 3º ano
                                                    <br/>
                                                    <span className="fonte-14 pt-1">Prova São Paulo <br/>2017/2018</span>
                                                </p>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center pontos pontos-azul">.....</div>
                                            <p className="fonte-12 mb-0">
                                                <strong>DISCIPLINAS AVALIADAS:</strong>
                                            </p>
                                            <p className="fonte-12">
                                                <br/>
                                                Língua Portuguesa
                                                <br/>
                                                Matemática
                                                <br/>
                                                Ciências
                                            </p>
                                        </div>
                                        <div className="col-md-3 block">
                                            <div className="circle circle-azul-claro mb-0">
                                                <p className="font-size-20">
                                                    <strong>Média Ponderada </strong>
                                                    <br/> 5º ano
                                                    <br/>
                                                    <span className="fonte-14 pt-1">Prova São Paulo <br/>2017/2018</span>
                                                </p>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center pontos pontos-azul-claro">.....</div>
                                            <p className="fonte-12 mb-0">
                                                <strong>DISCIPLINAS AVALIADAS:</strong>
                                            </p>
                                            <p className="fonte-12">
                                                <br/>
                                                Língua Portuguesa
                                                <br/>
                                                Matemática
                                                <br/>
                                                Ciências
                                            </p>
                                        </div>
                                        <div className="col-md-3 block">
                                            <div className="circle circle-azul-claro mb-0">
                                                <p className="font-size-20">
                                                    <strong>
                                                        MP 3º ano
                                                        <br/>+ MP 5º ano
                                                        <br/>÷ 6
                                                    </strong>
                                                </p>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center pontos pontos-azul-claro">.....</div>
                                            <p className="fonte-12 mb-0">
                                                <strong>MP(Média Ponderada)</strong>
                                            </p>
                                            <p className="fonte-12">
                                                <br/>
                                                Soma das duas médias
                                                <br/>
                                                dividido por 6
                                                <br/>
                                                (número de avaliações)
                                            </p>
                                        </div>
                                        <div className="col-md-3 block">
                                            <div className="circle circle-azul-claro mb-0">
                                                <p className="font-size-20">
                                                    <strong>
                                                        Fluxo
                                                    </strong>
                                                    <br/>
                                                    1º ano ao
                                                    <br/>
                                                    5º ano
                                                </p>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center pontos pontos-azul-claro">.....</div>
                                            <p className="fonte-12 mb-0">
                                                <strong>MP(Média Ponderada)</strong>
                                            </p>
                                            <p className="fonte-12">
                                                <br/>
                                                Reprovação
                                                <br/>
                                                Abandono
                                                <br/>
                                                Aprovação
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-12 border-top border-bottom">
                                            <p className="fonte-16 pt-2 pb-2 mb-0 ">Anos Finais</p>
                                        </div>
                                        <div className="col-md-3 block">
                                            <div className="circle circle-azul-escuro mb-0">
                                                <p className="font-size-20">
                                                    <strong>Média Ponderada </strong>
                                                    <br/> 7º ano
                                                    <br/>
                                                    <span className="fonte-14 pt-1">Prova São Paulo <br/>2017/2018</span>
                                                </p>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center pontos pontos-azul-claro">.....</div>
                                            <p className="fonte-12 mb-0">
                                                <strong>DISCIPLINAS AVALIADAS:</strong>
                                            </p>
                                            <p className="fonte-12">
                                                <br/>
                                                Língua Portuguesa
                                                <br/>
                                                Matemática
                                                <br/>
                                                Ciências
                                            </p>
                                        </div>
                                        <div className="col-md-3 block">
                                            <div className="circle circle-azul-escuro mb-0">
                                                <p className="font-size-20">
                                                    <strong>Média Ponderada </strong>
                                                    <br/> 9º ano
                                                    <br/>
                                                    <span className="fonte-14 pt-1">Prova São Paulo <br/>2017/2018</span>
                                                </p>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center pontos pontos-azul">.....</div>
                                            <p className="fonte-12 mb-0">
                                                <strong>DISCIPLINAS AVALIADAS:</strong>
                                            </p>
                                            <p className="fonte-12">
                                                <br/>
                                                Língua Portuguesa
                                                <br/>
                                                Matemática
                                                <br/>
                                                Ciências
                                            </p>
                                        </div>
                                        <div className="col-md-3 block">
                                            <div className="circle circle-azul-escuro mb-0">
                                                <p className="font-size-20">
                                                    <strong>
                                                        MP 7º ano
                                                        <br/>+ MP 9º ano
                                                        <br/>÷ 6
                                                    </strong>
                                                </p>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center pontos pontos-azul">.....</div>
                                            <p className="fonte-12 mb-0">
                                                <strong>MP (Média Ponderada)</strong>
                                            </p>
                                            <p className="fonte-12">
                                                <br/>
                                                Soma das duas médias
                                                <br/>
                                                dividido por 6
                                                <br/>
                                                (número de avaliações)
                                            </p>
                                        </div>
                                        <div className="col-md-3 block">
                                            <div className="circle circle-azul-escuro mb-0">
                                                <p className="font-size-20">
                                                    <strong>
                                                        Fluxo
                                                    </strong>
                                                    <br/>
                                                    6º ano ao
                                                    <br/>
                                                    9º ano
                                                </p>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center pontos pontos-azul">.....</div>
                                            <p className="fonte-12 mb-0">
                                                <strong>MP (Média Ponderada)</strong>
                                            </p>
                                            <p className="fonte-12">
                                                <br/>
                                                Reprovação
                                                <br/>
                                                Abandono
                                                <br/>
                                                Aprovação
                                            </p>
                                        </div>
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