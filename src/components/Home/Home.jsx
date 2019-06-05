import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menu from "../MenuSuperior/Menu";
import Buscador from "../Buscador/Buscador";
import logoEscolaAberta from "../../img/escola_aberta.png";
import imgAluno from "../../img/aluno.png";
import imgSociedadeGoverno from "../../img/sociedade-governo.png";
import Rodape from "../Rodape/Rodape";

export default class Home extends Component {
  componentDidMount() {
    document.querySelector('.conteudo').style.marginTop = (document.querySelector('.busca-escolas').clientHeight / 2) / 2 + 'px';
  }

  render() {
    return (
      <div>
        <Menu />
        <div className="w-100 busca-escolas position-relative">
          <div className="container d-flex justify-content-center">
            <div className="conteudo">
              <div className="col-lg-7 col-sm-12 text-center m-auto">
                <img src={logoEscolaAberta} alt="Escola Aberta" className="mb-5" />
                <h2>Aqui você encontra todas as informações sobre sua escola</h2>
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
                <h2 className="cor-azul mb-4">Acompanhamento no desenvolvimento escolar</h2>
                <p className="mb-0">Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              </div>
              <div className="col-lg-6">
                <img src={imgAluno} alt="" className="img-fluid rounded" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 sociedade-governo text-white">
          <div className="container pt-5 pb-5">
            <div className="row">
              <div className="col-lg-4 col-sm-12 mb-4 mb-lg-0">
                <h2 className="mb-4">Espaço aberto aos pais e alunos</h2>
                <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce faucibus risus nec diam venenatis ultrices. Aenean volutpat ultrices sodales.</p>
                <button type="button" className="btn btn-success btn-lg pt-3 pr-5 pb-3 pl-5 mt-4 font-weight-bold">Conheça</button>
              </div>
              <div className="col-lg-8 col-sm-12 d-flex justify-content-lg-end justify-content-center">
                <img src={imgSociedadeGoverno} alt="Sociedade e Governo" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 incentivo-leitura">
          <div className="container pt-5 pb-5">
            <div className="row">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <h2 className="cor-azul mb-4">Incentivo à leitura</h2>
                <p>Paragraph - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget tristique urna, vitae mollis eros. Vestibulum posuere semper metus, id laoreet urna blandit a. Maecenas commodo faucibus egestas. Fusce posuere nunc nec leo vulputate sodales. Praesent nec vehicula risus.</p>
                <p className="mb-0">Sed et lacus euismod, auctor mi et, finibus risus. Vivamus sit amet feugiat odio, quis tempor quam. <Link to="">Morbi condimentum</Link> arcu lorem, nec accumsan erat euismod eu.</p>
              </div>
              <div className="col-lg-6"></div>
            </div>
          </div>
        </div>
        <div className="w-100 numeros">
          <div className="container pt-5 pb-5">
            <div className="row">
              <div className="col-lg-3 col-sm-12 d-flex justify-content-center mb-4 mb-lg-0">
                <div className="border border-white bg-white rounded-circle">
                  <span className="valor mt-5">256 mil</span>
                  <span className="texto mt-3 pl-3 pr-3">Aenean vel eros faucibus</span>
                </div>
              </div>
              <div className="col-lg-3 col-sm-12 d-flex justify-content-center mb-4 mb-lg-0">
                <div className="border border-white bg-white rounded-circle">
                  <span className="valor mt-5">89% </span>
                  <span className="texto mt-3 pl-3 pr-3">Aenean vel eros faucibus</span>
                </div>
              </div>
              <div className="col-lg-3 col-sm-12 d-flex justify-content-center mb-4 mb-lg-0">
                <div className="border border-white bg-white rounded-circle">
                  <span className="valor mt-5">Alunos </span>
                  <span className="texto mt-3 pl-3 pr-3">Aenean vel eros faucibus</span>
                </div>
              </div>
              <div className="col-lg-3 col-sm-12 d-flex justify-content-center">
                <div className="border border-white bg-white rounded-circle">
                  <span className="valor mt-5">1 milhão</span>
                  <span className="texto mt-3 pl-3 pr-3">Aenean vel eros faucibus</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Rodape />
      </div>
    );
  }
}
