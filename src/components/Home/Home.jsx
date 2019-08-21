import React, { Component } from "react";
import Menu from "../MenuSuperior/Menu";
import Buscador from "../Buscador/Buscador";
import logoEscolaAberta from "../../img/escola_aberta.png";
import imgAluno from "../../img/aluno.png";
import imgSociedadeGoverno from "../../img/sociedade-governo.png";
import Rodape from "../Rodape/Rodape";

export default class Home extends Component {
  componentDidMount() {
    document.querySelector(".conteudo").style.marginTop =
      document.querySelector(".busca-escolas").clientHeight / 2 / 2 + "px";
  }

  render() {
    return (
      <div>
        <Menu />
        <div className="w-100 busca-escolas position-relative">
          <div className="container d-flex justify-content-center">
            <div className="conteudo">
              <div className="col-lg-7 col-sm-12 text-center m-auto">
                <img
                  src={logoEscolaAberta}
                  alt="Escola Aberta"
                  className="mb-5"
                />
                <h2>
                  Aqui você encontra todas as informações sobre sua escola
                </h2>
              </div>
              <div className="col-lg-12 col-sm-12">
                <Buscador />
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 desenvolvimento-escolar">
          <div className="container pt-5 pb-5">
            <div className="row">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <h2 className="cor-azul mb-4">
                  Pesquise os principais números da escola
                </h2>
                <p className="mb-0">
                  Na plataforma Escola Aberta você não apenas encontra as
                  escolas municipais de São Paulo mais próximas ou faz uma busca
                  por nome ou por endereço. Para cada escola, é possível
                  consultar também as principais estatísticas: saber, por
                  exemplo, as séries, períodos, quantidade de turmas e de
                  estudantes, vagas oferecidas e atendidas, quantos e quais
                  profissionais trabalham lá, que ambientes a escola possui e
                  como está a avaliação dela no Índice de Desenvolvimento da
                  Educação (IDEP).
                </p>
              </div>
              <div className="col-lg-6">
                <img
                  src={imgAluno}
                  alt="Acompanhamento no desenvolvimento escolar"
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 sociedade-governo text-white">
          <div className="container pt-5 pb-5">
            <div className="row">
              <div className="col-lg-4 col-sm-12 mb-4 mb-lg-0">
                <h2 className="mb-4">Conheça a Rede Municipal de Ensino</h2>
                <p className="mb-0">
                  É possível consultar também os dados gerais, agregados, de
                  toda a Rede Municipal de Educação, com opção de recorte por
                  cada Diretoria Regional de Educação. Informação é chave para
                  participação!
                </p>
              </div>
              <div className="col-lg-8 col-sm-12 d-flex justify-content-lg-end justify-content-center">
                <img
                  src={imgSociedadeGoverno}
                  alt="Sociedade e Governo"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 incentivo-leitura">
          <div className="container pt-5 pb-5">
            <div className="row">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <h2 className="cor-azul mb-4">Acesse nossa base de dados</h2>
                <p>
                  A plataforma Escola Aberta apresenta em linguagem clara,
                  acessível a qualquer cidadão, os dados que estão disponíveis
                  em formato aberto no Portal da Transparência. Se você sabe
                  trabalhar com grandes bases de dados e quer gerar suas
                  próprias análises e visualizações, pode ir direto às nossas
                  fontes [
                  <a href="http://dados.prefeitura.sp.gov.br/organization/educacao1">
                    clique aqui
                  </a>
                  ].
                </p>
              </div>
              <div className="col-lg-6" />
            </div>
          </div>
        </div>
        <Rodape />
      </div>
    );
  }
}
