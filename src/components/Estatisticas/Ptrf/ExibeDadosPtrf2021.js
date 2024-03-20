import React, {useEffect, useState} from "react";
import {DadosPtrf2021} from "./DadosPtrf2021";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faDollarSign} from "@fortawesome/free-solid-svg-icons";
import {TabelaPtrf2021} from "./TabelaPtrf2021";

export const ExibeDadosPtrf2021 = ({codesc}) => {

  const [dadosDaEscolaPtrf, setDadosDaEscolaPtrf] = useState({})

  useEffect(()=>{
    let escola = DadosPtrf2021.filter(item => String(item.EOL) === String(codesc));
    if (escola && escola.length > 0){
      setDadosDaEscolaPtrf({
        EOL: escola[0].EOL,
        UNIDADE: escola[0].UNIDADE,
        DRE: escola[0].DRE,
        REP_1_PARC: escola[0].REP_1_PARC,
        REP_2_PARC: escola[0].REP_2_PARC,
        REP_2_ADIC: escola[0].REP_2_ADIC,
        REP_2_CUIDADO: escola[0].REP_2_CUIDADO,
        REP_3_PARC: escola[0].REP_3_PARC,
        REP_3_ADIC: escola[0].REP_3_ADIC,
        REP_3_MULTI: escola[0].REP_3_MULTI,
        REP_3_COMPL: escola[0].REP_3_COMPL,
        TOTAL: escola[0].TOTAL,
      })
    }

  }, [codesc])

  return (
    <div key='dadosPtrf2021' className="card shadow-sm mt-3 mb-3">
      <div className="card-header bg-white d-flex align-items-center">
        <FontAwesomeIcon icon={faDollarSign} className="cor-azul"/>
        <div className="ml-3 fonte-14 font-weight-bold">
          2021 - Total repassado para a escola: R$ {dadosDaEscolaPtrf.TOTAL}
        </div>
        <a
          className="text-decoration-none cor-cinza ml-auto"
          data-toggle="collapse"
          data-target={`#dadosPtrf2021`}
          aria-expanded="false"
          aria-controls={`dadosPtrf2021`}
          href={`#dadosPtrf2021`}
        >
          <FontAwesomeIcon icon={faBars} className="stretched-link"/>
        </a>
      </div>
      <div className="collapse fade" id='dadosPtrf2021'>
        <div className="card-body p-0">
          <div className="table-responsive">
            <TabelaPtrf2021
              dadosDaEscolaPtrf={dadosDaEscolaPtrf}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
