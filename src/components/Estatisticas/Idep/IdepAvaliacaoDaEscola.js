import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faChartBar} from "@fortawesome/free-solid-svg-icons";

class IdepAvaliacaoDaEscola extends Component{

    constructor(props){
        super(props);

        this.state= {
            icg_exibicao: this.props.anoInicial.parametros.icg,
            nse_exibicao: this.props.anoInicial.parametros.nse,
            selectedOption: 'ano_inicial'
        };
    }

    handleOptionChange(evento){
        this.setState({selectedOption: evento.target.value});
        if (evento.target.value === 'ano_inicial') {
            this.setState({icg_exibicao: this.props.anoInicial.parametros.icg});
            this.setState({nse_exibicao: this.props.anoInicial.parametros.nse});
        }else if(evento.target.value === 'ano_final'){
            this.setState({icg_exibicao: this.props.anoFinal.parametros.icg});
            this.setState({nse_exibicao: this.props.anoFinal.parametros.nse});
       }
    }

    render() {
        return(
            <div>

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
                            <div className="d-flex justify-content-end p-2 bd-highlight">
                                <div className="form-check form-check-inline">
                                    <input onChange={this.handleOptionChange.bind(this)} className="form-check-input" type="radio" name="escolhaAnoAvaliacao" id="nseAvaliacao" value="ano_inicial" checked={this.state.selectedOption === 'ano_inicial'}/>
                                    <label className="form-check-label fonte-12" htmlFor="nseAvaliacao">Anos Iniciais</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input onChange={this.handleOptionChange.bind(this)} className="form-check-input" type="radio" name="escolhaAnoAvaliacao" id="icgAvaliacao" value="ano_final" checked={this.state.selectedOption === 'ano_final'}/>
                                    <label className="form-check-label fonte-12" htmlFor="icgAvaliacao">Anos Finais</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12 col-md-4'>
                                    <p className='fonte-14'>Sua escola está inserida em um grupo com os seguintes índices:</p>
                                    <div className="pb-4 mb-4">
                                        <button type="button" className="btn btn-outline-dark mr-3">
                                            INSE: {this.state.nse_exibicao}
                                        </button>
                                        <button type="button" className="btn btn-outline-dark">
                                            ICG: {this.state.icg_exibicao}
                                        </button>
                                        <p className='fonte-14 mt-4 mb-4'>
                                            O gráfico ao lado apresenta as metas estabelecidas para a sua escola com base no seu grupo. Para o ano de 2018, o IDEP foi calculado utilizando as notas da Prova São Paulo — edições 2017 e 2018. As metas foram definidas para os próximos 5 anos, a partir do ano de 2019.
                                        </p>
                                        <button type="button" className="btn btn-outline-primary">NOTA TÉCNICA</button>
                                    </div>
                                </div>
                                <div className='col-12 col-md-8'>
                                    Estou no Body
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default IdepAvaliacaoDaEscola;