import React, { Component } from "react";
import {
  listarVagasMatriculasSME,
  listarVagasMatriculasSMEPorDRE
} from "../../../services/estatisticas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { ToggleExpandir } from "../../ToggleExpandir";
import { formatarVagasMatriculas, totalPorFaixa } from "./helper";
import { getKey } from "../helper";
import "./style.scss";
import { pontuarValor } from "components/utils";

export class VagasMatriculas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vagasMatriculas: [],
      checks: [
        "EDUCAÇÃO INFANTIL",
        "EDUCAÇÃO ESPECIAL",
        "EDUCAÇÃO DE JOVENS E ADULTOS",
        "ENSINO FUNDAMENTAL",
        "ENSINO MÉDIO",
        "EDUCAÇÃO PROFISSIONAL"
      ],
      referencia: "",
      ativo: false,
      primeiroCheck: false,
      totalPorFaixa: null
    };
  }

  componentDidMount() {
    listarVagasMatriculasSME({ codesc: this.props.codesc }).then(lista => {
      this.setState({
        vagasMatriculas: formatarVagasMatriculas(lista.results),
        totalPorFaixa: totalPorFaixa(formatarVagasMatriculas(lista.results))
      });
    });
    this.setState({
      referencia: new Date(
        new Date().setDate(new Date().getDate() - 1)
      ).toLocaleDateString()
    });
  }

  onSelectChanged(value) {
    listarVagasMatriculasSMEPorDRE({ dre: value }).then(lista => {
      this.setState({
        vagasMatriculas: formatarVagasMatriculas(lista.results),
        totalPorFaixa: totalPorFaixa(formatarVagasMatriculas(lista.results))
      });
    });
    this.props.onDRESelected(value);
  }

  onMatriculaClicked(matricula) {
    let vagasMatriculas = this.state.vagasMatriculas;
    vagasMatriculas.forEach(vagaMatricula => {
      if (getKey(vagaMatricula) === getKey(matricula)) {
        vagaMatricula[getKey(vagaMatricula)].ativo = !vagaMatricula[
          getKey(vagaMatricula)
        ].ativo;
      }
    });
    this.setState({ vagasMatriculas, ativo: !this.state.ativo });
  }

  onCheckClicked(labels) {
    let checks = this.state.checks;
    if (!this.state.primeiroCheck) {
      checks = [];
      this.setState({ primeiroCheck: true });
    }
    if (!checks.includes(labels[0])) {
      labels.forEach(label => {
        checks.push(label);
      });
    } else {
      labels.forEach(label => {
        checks.forEach((check, index) => {
          if (check === label) {
            checks.splice(index, 1);
          }
        });
      });
      if (checks.length === 0) {
        checks = [
          "EDUCAÇÃO INFANTIL",
          "EDUCAÇÃO ESPECIAL",
          "EDUCAÇÃO DE JOVENS E ADULTOS",
          "ENSINO FUNDAMENTAL",
          "ENSINO MÉDIO",
          "EDUCAÇÃO PROFISSIONAL"
        ];
        this.setState({ primeiroCheck: false });
      }
    }
    this.setState({ checks });
  }

  render() {
    const { diretoriasRegionais } = this.props;
    const { ativo, vagasMatriculas, checks, totalPorFaixa } = this.state;
    return (
      <div className="mt-5 mb-5">
        <div className="estatisticas-cabecalho mb-5">
          <h1 className="border-bottom font-weight-light">
            Vagas e Matrículas por Série
          </h1>
          <div className="referencia mt-1 mb-5">
            Data de referência: {this.props.dataReferencia}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6">
            <select
              className="form-control"
              onChange={event => this.onSelectChanged(event.target.value)}
            >
              <option value="" disabled selected>Selecione uma DRE</option>
              {diretoriasRegionais.length &&
                diretoriasRegionais.map((e, key) => {
                  return (
                    <option key={key} value={e.dre} disabled={e.disabled}>
                      {e.diretoria}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <div className="card shadow-sm mb-3">
          <div className="card-header bg-white d-flex align-items-center font-weight-bold">
            <FontAwesomeIcon icon={faIdCard} className="cor-azul" />
            <div className="ml-3 fonte-14">Vagas e Matrículas</div>
            <div className="checkboxes ml-auto">
              <span>
                <input
                  onClick={() => this.onCheckClicked(["EDUCAÇÃO INFANTIL"])}
                  type="checkbox"
                />
                Infantil
              </span>
              <span>
                <input
                  onClick={() => this.onCheckClicked(["ENSINO FUNDAMENTAL"])}
                  type="checkbox"
                />
                Fundamental
              </span>
              <span>
                <input
                  onClick={() =>
                    this.onCheckClicked([
                      "ENSINO MÉDIO",
                      "EDUCAÇÃO PROFISSIONAL"
                    ])
                  }
                  type="checkbox"
                />
                Médio
              </span>
              <span>
                <input
                  onClick={() =>
                    this.onCheckClicked(["EDUCAÇÃO DE JOVENS E ADULTOS"])
                  }
                  type="checkbox"
                />
                EJA
              </span>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table
                className={`table text-center table-hover table-bordered matricula mb-0 fonte-14 ${ativo &&
                  "ativo"}`}
              >
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Total de turmas</th>
                    <th scope="col">Vagas oferecidas</th>
                    <th scope="col">Matrículas/Encaminhamento</th>
                    <th scope="col">Vagas remanescentes</th>
                    <th scope="col">Média Atendimentos/Turma</th>
                  </tr>
                </thead>
                <tbody>
                  {vagasMatriculas.map((matricula, indice) => {
                    return [
                      checks.includes(getKey(matricula)) && (
                        <tr className="main" key={indice}>
                          <td className="font-weight-bold">
                            {getKey(matricula)}
                          </td>
                          <td>
                            {pontuarValor(
                              matricula[getKey(matricula)].total_turmas
                            )}
                          </td>
                          <td>
                            {pontuarValor(
                              matricula[getKey(matricula)].vagas_oferecidas
                            )}
                          </td>
                          <td>
                            {pontuarValor(
                              matricula[getKey(matricula)].vagas_oferecidas -
                                matricula[getKey(matricula)].vagas_remanecentes
                            )}
                          </td>
                          <td>
                            {pontuarValor(
                              matricula[getKey(matricula)].vagas_remanecentes
                            )}
                          </td>
                          <td>
                            {matricula[getKey(matricula)].media_atendimento}{" "}
                            <ToggleExpandir
                              ativo={matricula[getKey(matricula)].ativo}
                              onClick={() => this.onMatriculaClicked(matricula)}
                            />
                          </td>
                        </tr>
                      ),
                      matricula[getKey(matricula)].ativo &&
                        matricula[getKey(matricula)].decseries.map(
                          (decserie, indice_) => {
                            return (
                              <tr key={indice_}>
                                <td className="font-weight-bold">
                                  {decserie.decserie}
                                </td>
                                <td>{pontuarValor(decserie.total_turmas)}</td>
                                <td>
                                  {pontuarValor(decserie.vagas_oferecidas)}
                                </td>
                                <td>
                                  {pontuarValor(
                                    decserie.vagas_oferecidas -
                                      decserie.vagas_remanecentes
                                  )}
                                </td>
                                <td>
                                  {pontuarValor(decserie.vagas_remanecentes)}
                                </td>
                                <td>{decserie.media_atendimento}</td>
                              </tr>
                            );
                          }
                        )
                    ];
                  })}
                </tbody>
                {totalPorFaixa && (
                  <tfoot>
                    <tr>
                      <td>TOTAL GERAL</td>
                      <td className="font-weight-bold bg-light">
                        {pontuarValor(totalPorFaixa.total_turmas)}
                      </td>
                      <td className="font-weight-bold bg-light">
                        {pontuarValor(totalPorFaixa.vagas_oferecidas)}
                      </td>
                      <td className="font-weight-bold bg-light">
                        {pontuarValor(
                          totalPorFaixa.vagas_oferecidas -
                            totalPorFaixa.vagas_remanecentes
                        )}
                      </td>
                      <td className="font-weight-bold bg-light">
                        {pontuarValor(totalPorFaixa.vagas_remanecentes)}
                      </td>
                      <td className="font-weight-bold bg-light">
                        {totalPorFaixa.media_atendimento}
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>
        </div>
        <div>
          Entenda o significado de cada modalidade, etapa e turmas da Rede
          Municipal de Ensino: acesse o{" "}
          <a href="https://educacao.sme.prefeitura.sp.gov.br/glossario-do-escola-aberta/">
            Glossário do Escola Aberta
          </a>
        </div>
      </div>
    );
  }
}

export default VagasMatriculas;
