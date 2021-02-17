import React, {memo} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faDollarSign} from "@fortawesome/free-solid-svg-icons";
import "./ptrf.css"
import {TabelaPtrf} from "./TabelaPtrf";

const Ptrf = ({dadosDaEscolaPtrf}) => {

  const indice = "abc";

  return (
    <>
      <div className="mt-5 mb-5">
        <div className="estatisticas-cabecalho mb-5">
          <h1 className="border-bottom font-weight-light">Programa de Transferência de Recursos Financeiros – PTRF</h1>
          <div className="referencia mt-1 mb-5">
            Verba recebida pela escola em 2020
          </div>
        </div>
      </div>
      <div key={indice} className="card shadow-sm mt-3 mb-3">
        <div className="card-header bg-white d-flex align-items-center">
          <FontAwesomeIcon icon={faDollarSign} className="cor-azul"/>
          <div className="ml-3 fonte-14 font-weight-bold">
            Total repassado para a escola em 2020: R$ {dadosDaEscolaPtrf.TOTAL}
          </div>
          <a
            className="text-decoration-none cor-cinza ml-auto"
            data-toggle="collapse"
            data-target={`#${indice}`}
            aria-expanded="false"
            aria-controls={`${indice}`}
            href={`#${indice}`}
          >
            <FontAwesomeIcon icon={faBars} className="stretched-link"/>
          </a>
        </div>
        <div className="collapse fade" id={`${indice}`}>
          <div className="card-body p-0">
            <div className="table-responsive">
              <TabelaPtrf
                dadosDaEscolaPtrf={dadosDaEscolaPtrf}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default memo(Ptrf)

