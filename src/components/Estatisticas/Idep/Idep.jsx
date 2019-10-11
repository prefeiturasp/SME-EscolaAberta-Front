import React, { Component } from "react";
import IdepAvaliacaoDaEscola from "./IdepAvaliacaoDaEscola";
import IdepCalculo from "./IdepCalculo";
import IdepMetas from "./IdepMetas";
import { dadosIdep, loginIdep } from "../../../services/idep";
import { formatarDados } from "./helper";
export default class Idep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      codesc: this.props.codesc,
      referencia: "",
      ano_inicial: "",
      ano_final: "",
      msg: ""
    };
  }

  componentWillMount() {
    this.setState({
      referencia: new Date(
        new Date().setDate(new Date().getDate() - 1)
      ).toLocaleDateString()
    });

    loginIdep().then(_ => {
      dadosIdep(this.state.codesc)
        .then(retorno => {
          this.setState({ ano_inicial: retorno.result.ano_inicial });
          this.setState({ ano_final: retorno.result.ano_final });

          if (!this.state.ano_inicial && !this.state.ano_final) {
            this.setState({ msg: "Nenhum índice encontrado." });
          }
        })
        .catch(error => {
          console.log(error.message);
        });
    });
  }

  render() {
    return (
      <div>
        <div className="mt-5 mb-5 container-geral-idep">
          <div className="estatisticas-cabecalho mb-5">
            <h1 className="border-bottom font-weight-light">IDEP</h1>
            <div className="referencia mt-1 mb-5">
              Data de referência: {this.props.dataReferencia}
            </div>
          </div>

          {this.state.msg !== "" ? (
            <p className="fonte-14">
              <strong>{this.state.msg}</strong>
            </p>
          ) : null}

          {this.state.ano_inicial && this.state.ano_final ? (
            <IdepAvaliacaoDaEscola
              anoInicial={formatarDados(this.state.ano_inicial)}
              anoFinal={formatarDados(this.state.ano_final)}
            />
          ) : null}

          {this.state.ano_inicial && this.state.ano_final ? (
            <IdepCalculo
              anoInicial={this.state.ano_inicial}
              anoFinal={this.state.ano_final}
            />
          ) : null}

          {this.state.ano_inicial && this.state.ano_final ? (
            <IdepMetas
              anoInicial={this.state.ano_inicial}
              anoFinal={this.state.ano_final}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
