import React, {useEffect, useState} from "react";
import {DadosPtrf2022} from "./DadosPtrf2022";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faDollarSign} from "@fortawesome/free-solid-svg-icons";
import {TabelaPtrf2022} from "./TabelaPtrf2022";

export const ExibeDadosPtrf2022 = ({codesc}) => {

  const [dadosDaEscolaPtrf, setDadosDaEscolaPtrf] = useState({})

  useEffect(()=>{
    let escola = DadosPtrf2022.filter(item => String(item.EOL) === String(codesc));
    if (escola && escola.length > 0){
      setDadosDaEscolaPtrf({
        EOL: escola[0].EOL,
        UNIDADE: escola[0].UNIDADE,
        DRE: escola[0].DRE,
        REP_1_PARC: escola[0].REP_1_PARC,
        REP_2_PARC: escola[0].REP_2_PARC,
        REP_2_ADIC: escola[0].REP_2_ADIC,
        REP_2_GREMIO: escola[0].REP_2_GREMIO,
        REP_3_PARC: escola[0].REP_3_PARC,
        REP_3_ADIC: escola[0].REP_3_ADIC,
        TOTAL: escola[0].TOTAL,
      })
    }

  }, [codesc])

  return (
    <div key='dadosPtrf2022' className="card shadow-sm mt-3 mb-3">
      <div className="card-header bg-white d-flex align-items-center">
        <FontAwesomeIcon icon={faDollarSign} className="cor-azul"/>
        <div className="ml-3 fonte-14 font-weight-bold">
          2022 - Total repassado para a escola: R$ {dadosDaEscolaPtrf.TOTAL}
        </div>
        <a
          className="text-decoration-none cor-cinza ml-auto"
          data-toggle="collapse"
          data-target={`#dadosPtrf2022`}
          aria-expanded="false"
          aria-controls={`dadosPtrf2022`}
          href={`#dadosPtrf2022`}
        >
          <FontAwesomeIcon icon={faBars} className="stretched-link"/>
        </a>
      </div>
      <div className="collapse fade" id='dadosPtrf2022'>
        <div className="card-body p-0">
          <div className="table-responsive">
            <TabelaPtrf2022
              dadosDaEscolaPtrf={dadosDaEscolaPtrf}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
