import React from 'react'
export const TabelaPtrf2023 = ({dadosDaEscolaPtrf}) =>{
    return(
      <table className="table text-center table-bordered mb-0 fonte-14">
        <thead>
        <tr>
          <th colSpan='2' className="fonte-12 text-center align-middle background-th-tabela-ptrf">1º Repasse</th>
          <th colSpan='2' className="fonte-12 text-center align-middle background-th-tabela-ptrf">2º Repasse</th>
        </tr>
        <tr>
          <th colSpan='2' className="fonte-12 text-center align-middle background-th-tabela-ptrf">
            <p className='mb-0'>Portaria SME nº 2.340 de 20/03/2023</p>
            <p className='mb-0'>Portaria SME nº 3.517 de 27/04/2023</p>
          </th>
          <th colSpan='2' className="fonte-12 text-center align-middle background-th-tabela-ptrf">
            <p className='mb-0'>Portaria SME nº 2.340 de 20/03/2023</p>
            <p className='mb-0'>Portaria SME nº 3.517 de 27/04/2023</p>
          </th>
        </tr>
        <tr>
          {dadosDaEscolaPtrf.REP_1_PARC ? (
            <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Básico<br/> 1ª Parcela</th>
          ) : null}
          {dadosDaEscolaPtrf.REP_1_ADIC ? (
            <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Valor Adicional<br/> Recursos<br/> Extraordinários</th>
          ) : null}
          {dadosDaEscolaPtrf.REP_2_PARC ? (
            <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Básico<br/> 2ª Parcela</th>
          ): null }
          {dadosDaEscolaPtrf.REP_2_ADIC ? (
          <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Valor Adicional<br/> Recursos<br/> Extraordinários</th>
          ): null }

        </tr>
        </thead>
        <tbody>
        <tr>
          {dadosDaEscolaPtrf.REP_1_PARC ? (
          <td>{`${dadosDaEscolaPtrf.REP_1_PARC !== "-" ? "R$ " : ""}`}{dadosDaEscolaPtrf.REP_1_PARC}</td>
          ): null }
          {dadosDaEscolaPtrf.REP_1_ADIC ? (
            <td>{`${dadosDaEscolaPtrf.REP_1_ADIC !== "-" ? "R$ " : ""}`}{dadosDaEscolaPtrf.REP_1_ADIC}</td>
          ): null }
          {dadosDaEscolaPtrf.REP_2_PARC ? (
          <td>{`${dadosDaEscolaPtrf.REP_2_PARC !== "-" ? "R$ " : ""}`}{dadosDaEscolaPtrf.REP_2_PARC}</td>
          ): null }
          {dadosDaEscolaPtrf.REP_2_ADIC ? (
          <td>{`${dadosDaEscolaPtrf.REP_2_ADIC !== "-" ? "R$ " : ""}`}{dadosDaEscolaPtrf.REP_2_ADIC}</td>
          ): null }
        </tr>
        </tbody>
      </table>
    )
};
