import React from 'react'
import "./ptrf.css"
import {ExibeDadosPtrf2020} from "./ExibeDadosPtrf2020";
import {ExibeDadosPtrf2021} from "./ExibeDadosPtrf2021";
import {ExibeDadosPtrf2022} from "./ExibeDadosPtrf2022";
import {ExibeDadosPtrf2023} from "./ExibeDadosPtrf2023";
import NullView from "../NullView";

const Ptrf = ({codesc}) => {

  return (
    <>
      <div className="mt-5 mb-5">
        <div className="estatisticas-cabecalho mb-5">
          <h1 className="border-bottom font-weight-light">Programa de Transferência de Recursos Financeiros – PTRF</h1>
          <div className="referencia mt-1 mb-5">
            Verba recebida pela escola
          </div>
        </div>
      </div>
      {codesc ? (
        <>
          <ExibeDadosPtrf2020
            codesc={codesc}
          />
          <ExibeDadosPtrf2021
            codesc={codesc}
          />
          <ExibeDadosPtrf2022
            codesc={codesc}
          />
          <ExibeDadosPtrf2023
            codesc={codesc}
          />
        </>
      ):
        <NullView/>
      }
    </>
  )
};

export default Ptrf

