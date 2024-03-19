import React, {useEffect, useState} from "react";
import {DadosPtrf2023} from "./DadosPtrf2023";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faDollarSign} from "@fortawesome/free-solid-svg-icons";
import {TabelaPtrf2023} from "./TabelaPtrf2023";

export const ExibeDadosPtrf2023 = ({codesc}) => {

  const [dadosDaEscolaPtrf, setDadosDaEscolaPtrf] = useState({})

  useEffect(()=>{
    let escola = DadosPtrf2023.filter(item => String(item.EOL) === String(codesc));
    if (escola && escola.length > 0){
      setDadosDaEscolaPtrf({
        EOL: escola[0].EOL,
        UNIDADE: escola[0].UNIDADE,
        DRE: escola[0].DRE,
        REP_1_PARC: escola[0].REP_1_PARC,
        REP_1_ADIC: escola[0].REP_1_ADIC,
        REP_2_PARC: escola[0].REP_2_PARC,
        REP_2_ADIC: escola[0].REP_2_ADIC,
        TOTAL: escola[0].TOTAL,
      })
    }

  }, [codesc])

  return (
    <div key='dadosPtrf2023' className="card shadow-sm mt-3 mb-3">
      <div className="card-header bg-white d-flex align-items-center">
        <FontAwesomeIcon icon={faDollarSign} className="cor-azul"/>
        <div className="ml-3 fonte-14 font-weight-bold">
          2023 - Total repassado para a escola: R$ {dadosDaEscolaPtrf.TOTAL}
        </div>
        <a
          className="text-decoration-none cor-cinza ml-auto"
          data-toggle="collapse"
          data-target={`#dadosPtrf2023`}
          aria-expanded="false"
          aria-controls={`dadosPtrf2023`}
          href={`#dadosPtrf2023`}
        >
          <FontAwesomeIcon icon={faBars} className="stretched-link"/>
        </a>
      </div>
      <div className="collapse fade" id='dadosPtrf2023'>
        <div className="card-body p-0">
          <div className="table-responsive">
            <TabelaPtrf2023
              dadosDaEscolaPtrf={dadosDaEscolaPtrf}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
