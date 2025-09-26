import React, { useEffect, useState } from "react";
import { DadosPtrf2024 } from "./DadosPtrf2024";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { TabelaPtrf2024 } from "./TabelaPtrf2024";

export const ExibeDadosPtrf2024 = ({ codesc }) => {

  const [dadosDaEscolaPtrf, setDadosDaEscolaPtrf] = useState({})

  useEffect(() => {
    let escola = DadosPtrf2024.filter(item => String(item.EOL) === String(codesc));
    if (escola && escola.length > 0) {
      setDadosDaEscolaPtrf({
        EOL: escola[0].EOL,
        UNIDADE: escola[0].UNIDADE,
        DRE: escola[0].DRE,
        REP_1_PARC: escola[0].REP_1_PARC,
        REP_1_ADIC: escola[0].REP_1_ADIC,
        REP_1_VULNE: escola[0].REP_1_VULNE,
        REP_2_PARC: escola[0].REP_2_PARC,
        REP_2_VULNE: escola[0].REP_2_VULNE,
        REP_2_ADIC: escola[0].REP_2_ADIC,
        REP_2_GREMIO: escola[0].REP_2_GREMIO,
        REP_3_PARC: escola[0].REP_3_PARC,
        REP_3_ADIC: escola[0].REP_3_ADIC,
        REP_3_VULNE: escola[0].REP_3_VULNE,
        TOTAL: escola[0].TOTAL,
      })
    }

  }, [codesc])

  return (
    <div key='dadosPtrf2024' className="card shadow-sm mt-3 mb-3">
      <div className="card-header bg-white d-flex align-items-center">
        <FontAwesomeIcon icon={faDollarSign} className="cor-azul" />
        <div className="ml-3 fonte-14 font-weight-bold">
          2024 - Total repassado para a escola: R$ {dadosDaEscolaPtrf.TOTAL}
        </div>
        <a
          className="text-decoration-none cor-cinza ml-auto"
          data-toggle="collapse"
          data-target={`#dadosPtrf2024`}
          aria-expanded="false"
          aria-controls={`dadosPtrf2024`}
          href={`#dadosPtrf2024`}
        >
          <FontAwesomeIcon icon={faBars} className="stretched-link" />
        </a>
      </div>
      <div className="collapse fade" id='dadosPtrf2024'>
        <div className="card-body p-0">
          <div className="table-responsive">
            <TabelaPtrf2024
              dadosDaEscolaPtrf={dadosDaEscolaPtrf}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
