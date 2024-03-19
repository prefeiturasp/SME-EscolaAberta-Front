import React, {useEffect, useState} from "react";
import {DadosPtrf2020} from "./DadosPtrf2020";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faDollarSign} from "@fortawesome/free-solid-svg-icons";
import {TabelaPtrf} from "./TabelaPtrf";

export const ExibeDadosPtrf2020 = ({codesc}) => {

  const [dadosDaEscolaPtrf, setDadosDaEscolaPtrf] = useState({})

  useEffect(()=>{
    let escola = DadosPtrf2020.filter(item => String(item.EOL) === String(codesc));
    if (escola && escola.length > 0){
      setDadosDaEscolaPtrf({
        EOL: escola[0].EOL,
        UNIDADE: escola[0].UNIDADE,
        DRE: escola[0].DRE,
        BAS_1PAR: escola[0].BAS_1PAR,
        BAS_2PAR: escola[0].BAS_2PAR,
        REC_EXTRA: escola[0].REC_EXTRA,
        BAS_3PAR: escola[0].BAS_3PAR,
        REC_EXTRA2: escola[0].REC_EXTRA2,
        EM: escola[0].EM,
        SALA_LEITURA: escola[0].SALA_LEITURA,
        MAT_PEDAG: escola[0].MAT_PEDAG,
        TOTAL: escola[0].TOTAL,
      })
    }

  }, [codesc])

  return (
    <div key='dadosPtrf2020' className="card shadow-sm mt-3 mb-3">
      <div className="card-header bg-white d-flex align-items-center">
        <FontAwesomeIcon icon={faDollarSign} className="cor-azul"/>
        <div className="ml-3 fonte-14 font-weight-bold">
          2020 - Total repassado para a escola: R$ {dadosDaEscolaPtrf.TOTAL}
        </div>
        <a
          className="text-decoration-none cor-cinza ml-auto"
          data-toggle="collapse"
          data-target={`#dadosPtrf2020`}
          aria-expanded="false"
          aria-controls={`dadosPtrf2020`}
          href={`#dadosPtrf2020`}
        >
          <FontAwesomeIcon icon={faBars} className="stretched-link"/>
        </a>
      </div>
      <div className="collapse fade" id='dadosPtrf2020'>
        <div className="card-body p-0">
          <div className="table-responsive">
            <TabelaPtrf
              dadosDaEscolaPtrf={dadosDaEscolaPtrf}
            />
          </div>
        </div>
      </div>
    </div>
  )

}
