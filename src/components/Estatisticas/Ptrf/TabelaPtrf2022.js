import React from 'react'
export const TabelaPtrf2022 = ({dadosDaEscolaPtrf}) =>{
    return(
      <table className="table text-center table-bordered mb-0 fonte-14">
        <thead>
        <tr>
          <th className="fonte-12 text-center align-middle background-th-tabela-ptrf">1º Repasse</th>
          <th colSpan='3' className="fonte-12 text-center align-middle background-th-tabela-ptrf">2º Repasse</th>
          <th colSpan='4' className="fonte-12 text-center align-middle background-th-tabela-ptrf">3º Repasse</th>
        </tr>
        <tr>
          <th className="fonte-12 text-center align-middle background-th-tabela-ptrf">
            <p className='mb-0'>Portaria SME nº 2.056 de 15/03/2022</p>
            <p className='mb-0'>Portaria SME nº 2.438 de 12/04/2022</p>
          </th>
          <th colSpan='3' className="fonte-12 text-center align-middle background-th-tabela-ptrf">
            <p className='mb-0'>Portaria SME nº 2.056 de 15/03/2022</p>
            <p className='mb-0'>Portaria SME nº 2.438 de 12/04/2022</p>
            <p className='mb-0'>Portaria SME nº 3.376 de 06/06/2022</p>
          </th>
          <th colSpan='2' className="fonte-12 text-center align-middle background-th-tabela-ptrf">
            <p className='mb-0'>Portaria SME nº 2.056 de 15/03/2022 </p>
            <p className='mb-0'>Portaria SME nº 2.438 de 12/04/2022</p>
            <p className='mb-0'>Portaria SME nº 5.113 de 03/10/2022 </p>
          </th>
        </tr>
        <tr>
          {dadosDaEscolaPtrf.REP_1_PARC ? (
            <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Básico<br/> 1ª Parcela</th>
          ) : null}
          {dadosDaEscolaPtrf.REP_2_PARC ? (
            <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Básico<br/> 2ª Parcela</th>
          ): null }
          {dadosDaEscolaPtrf.REP_2_ADIC ? (
          <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Valor Adicional<br/> Recursos<br/> Extraordinários</th>
          ): null }
          {dadosDaEscolaPtrf.REP_2_GREMIO ? (
            <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Grêmio Estudantil</th>
          ): null }
          {dadosDaEscolaPtrf.REP_3_PARC ? (
            <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Básico<br/> 3ª Parcela</th>
          ): null }
          {dadosDaEscolaPtrf.REP_3_ADIC ? (
            <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Valor Adicional<br/> Recursos<br/> Extraordinários</th>
          ) : null}
        </tr>
        </thead>
        <tbody>
        <tr>
          {dadosDaEscolaPtrf.REP_1_PARC ? (
          <td>{`${dadosDaEscolaPtrf.REP_1_PARC !== "-" ? "R$ " : ""}`}{dadosDaEscolaPtrf.REP_1_PARC}</td>
          ): null }
          {dadosDaEscolaPtrf.REP_2_PARC ? (
          <td>{`${dadosDaEscolaPtrf.REP_2_PARC !== "-" ? "R$ " : ""}`}{dadosDaEscolaPtrf.REP_2_PARC}</td>
          ): null }
          {dadosDaEscolaPtrf.REP_2_ADIC ? (
          <td>{`${dadosDaEscolaPtrf.REP_2_ADIC !== "-" ? "R$ " : ""}`}{dadosDaEscolaPtrf.REP_2_ADIC}</td>
          ): null }
          {dadosDaEscolaPtrf.REP_2_GREMIO ? (
            <td>{`${dadosDaEscolaPtrf.REP_2_GREMIO !== "-" ? "R$ " : ""}`}{dadosDaEscolaPtrf.REP_2_GREMIO}</td>
          ): null }
          {dadosDaEscolaPtrf.REP_3_PARC ? (
            <td>{`${dadosDaEscolaPtrf.REP_3_PARC !== "-" ? "R$ " : ""}`}{dadosDaEscolaPtrf.REP_3_PARC}</td>
          ): null }
          {dadosDaEscolaPtrf.REP_3_ADIC ? (
            <td>{`${dadosDaEscolaPtrf.REP_3_ADIC !== "-" ? "R$ " : ""}`}{dadosDaEscolaPtrf.REP_3_ADIC}</td>
          ): null }
        </tr>
        </tbody>
      </table>
    )
};
