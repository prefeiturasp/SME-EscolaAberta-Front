import React, { Component } from "react";
import Menu from "../MenuSuperior/Menu";
import Auxiliar from "../MenuSuperior/Auxiliar";
import Rodape from "../Rodape/Rodape";
import InputCustomizado from "../Inputs/InputCustomizado";
import DatePicker from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";

export default class ConsultaPosicao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numeroProtocolo: "",
      nomeAluno: "",
      nomeMae: "",
      dataNascimento: ""
    }

    this.setDataNascimento = this.setDataNascimento.bind(this);
  }

  setNumeroProtocolo(event) {
    this.setState({ numeroProtocolo: event.target.value });
  }

  setNomeAluno(event) {
    this.setState({ nomeAluno: event.target.value });
  }

  setNomeMae(event) {
    this.setState({ nomeMae: event.target.value });
  }

  setDataNascimento(event) {
    this.setState({ dataNascimento: event });
  }

  render() {
    return (
      <div>
        <Menu />
        <Auxiliar texto="Consulte sua posição" />
        <div className="w-100 bg-light h-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-sm-12 pr-lg-0 pt-5 pb-5 consulta">
                <div>
                  <InputCustomizado
                    name="numero-protocolo"
                    id="numero-protocolo"
                    className="form-control rounded shadow-sm w-75 mx-auto mb-3"
                    placeholder="Número do Protocolo"
                  />
                </div>
                <div className="w-75 mx-auto mb-3 d-block text-center text-uppercase">ou</div>
                <div><InputCustomizado
                  name="nome-aluno"
                  id="nome-aluno"
                  className="form-control rounded shadow-sm w-75 mx-auto mb-2"
                  placeholder="Nome do Aluno"
                /></div>
                <div>
                  <InputCustomizado
                    name="nome-mae"
                    id="nome-mae"
                    className="form-control rounded shadow-sm w-75 mx-auto mb-2"
                    placeholder="Nome da Mãe"
                  />
                </div>
                <div className="w-75 mx-auto mb-4">
                  <DatePicker
                    id="data-nascimento"
                    className="form-control rounded shadow-sm"
                    placeholderText="Data de Nascimento"
                    onChange={this.setDataNascimento}
                    selected={this.state.dataNascimento}
                    locale={ptBR}
                    dateFormat="dd/MM/yyyy"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                </div>
                <button className="btn btn-lg btn-primary w-75 mx-auto d-block">Consultar</button>
              </div>
            </div>
          </div>
        </div>
        <Rodape />
      </div>
    );
  }
}
