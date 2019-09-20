import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faChartBar} from "@fortawesome/free-solid-svg-icons";

const IdepMetas = () => (
    <div>
        <div key="metas-idep" className="card shadow-sm mb-3">
            <div className="card-header bg-white d-flex align-items-center">
                <FontAwesomeIcon icon={faChartBar} className="cor-azul"/>
                <div className="ml-3 fonte-14 font-weight-bold">Saiba como as metas são estabelecidas</div>
                <a className="text-decoration-none cor-cinza ml-auto" data-toggle="collapse"
                   data-target='#metas-idep' aria-expanded="false" aria-controls='metas-idep' href='#metas-idep'>
                    <FontAwesomeIcon icon={faBars} className="stretched-link"/>
                </a>
            </div>
            <div className="collapse fade" id='metas-idep'>
                <div className="card-body">
                    <div className='row'>
                        <div className='col-12 col-md-4'>
                            <div className="pb-4 mb-4">
                                <p className='fonte-14 mt-4 mb-4'>
                                    As metas serão estabelecidas para os próximos cinco anos, a partir dos grupos
                                    formados considerando o <strong>Índice Sócio Econômico (INSE) e Indicador de
                                    Complexidade de Gestão (ICG)</strong>, levando em conta somente as escolas que
                                    compõem cada grupo, objetivando, assim, a diminuição da desigualdade dos resultados
                                    ao longo dos anos. Dessa maneira, as diferenças entre os resultados das escolas
                                    serão minimizadas dentro do grupo ao qual cada uma faz parte, como também, entre os
                                    grupos estabelecidos.
                                </p>
                            </div>
                        </div>
                        <div className='col-12 col-md-8 mt-4'>
                            <div className="col-12 p-4 pb-2 border-azul-escuro-4 mb-3">
                                <p className="fonte-14 mb-0">
                                    <span className="font-color-azul-escuro"><strong>ÍNDICE SÓCIO-ECONÔMICO (INSE)</strong></span>
                                    <br/>
                                    <span>Consiste em um construto latente que sintetiza, de forma unidimensional, informações a respeito da escolaridade dos pais e da renda familiar. O objetivo do Inse é contextualizar o desempenho da escolas nas avaliações e exames que realizam, bem como sua prática educativa, caracterizando, dessa forma, o padrão de vida dos estudantes e suas famílias.</span>
                                </p>
                            </div>
                            <div className="col-12 p-4 pb-2 border-azul-escuro-4 mb-3">
                                <p className="fonte-14 mb-0">
                                    <span className="font-color-azul-escuro"><strong>INDICADOR DE COMPLEXIDADE DE GESTÃO (ICG)</strong></span>
                                    <br/>
                                    <span>Esse indicador das escolas sintetiza, em uma única medida, informações de porte, turnos de funcionamento, nível de complexidade das etapas de ensino e quantidade de etapas ofertadas. Há vários fatores envolvidos na gestão de uma escola, porém, o ICG mostra, com validade, a contextualização dos resultados das avaliações. O ICG é divulgado em 6 níveis, mas para utilizá-lo na constituição das metas, eles foram reagrupados em dois grupos sendo: Grupo 1, formado pelos níveis 1, 2 e 3; e Grupo 2, formado pelos níveis 4, 5 e 6.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default IdepMetas;
