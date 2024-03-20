import React from 'react'
export const TabelaPtrf2021 = ({dadosDaEscolaPtrf}) =>{
    return(
      <table className="table text-center table-bordered mb-0 fonte-14">
        <thead>
        <tr>
          <th className="fonte-12 text-center align-middle background-th-tabela-ptrf">1º Repasse</th>
          <th colSpan='3' className="fonte-12 text-center align-middle background-th-tabela-ptrf">2º Repasse</th>
          <th colSpan='4' className="fonte-12 text-center align-middle background-th-tabela-ptrf">3º Repasse</th>
        </tr>
        <tr>
          <th
            className="fonte-12 text-center align-middle background-th-tabela-ptrf">
            <p className='mb-0'>Portaria SME nº 1.561 de 10/03/2021 </p>
            <p className='mb-0'>Portaria SME nº 1.840 de 25/03/2021</p>
          </th>
          <th colSpan='3'
              className="fonte-12 text-center align-middle background-th-tabela-ptrf">
            <p className='mb-0'>Portaria SME nº 1.561 de 10/03/2021 </p>
            <p className='mb-0'>Portaria SME nº 4.749 de 26/07/2021</p>
            <p className='mb-0'>IN SME nº 31 de 30/07/2021</p>
          </th>
          <th colSpan='4'
              className="fonte-12 text-center align-middle background-th-tabela-ptrf">
            <p className='mb-0'>Portaria SME nº 1.561 de 10/03/2021</p>
            <p className='mb-0'>Portaria SME nº 7.118 de 16/12/2021</p>
            <p className='mb-0'>Portaria SME nº 7.116 de 16/12/2021</p>
            <p className='mb-0'>Portaria SME nº 7.117 de 16/12/2021</p>
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
          {dadosDaEscolaPtrf.REP_2_CUIDADO ? (
            <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Programa de<br/> cuidados com as<br/> estudantes</th>
          ): null }
          {dadosDaEscolaPtrf.REP_3_PARC ? (
            <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Básico<br/> 3ª Parcela</th>
          ): null }
          {dadosDaEscolaPtrf.REP_3_ADIC ? (
            <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Valor Adicional<br/> Recursos<br/> Extraordinários</th>
          ) : null}
          {dadosDaEscolaPtrf.REP_3_MULTI ? (
            <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Sala de Recursos<br/> Multifuncionais</th>
          ) : null}
          {dadosDaEscolaPtrf.REP_3_COMPL ? (
            <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Material Complementar</th>
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
          {dadosDaEscolaPtrf.REP_2_CUIDADO ? (
            <td>{`${dadosDaEscolaPtrf.REP_2_CUIDADO !== "-" ? "R$ " : ""}`}{dadosDaEscolaPtrf.REP_2_CUIDADO}</td>
          ): null }
          {dadosDaEscolaPtrf.REP_3_PARC ? (
            <td>{`${dadosDaEscolaPtrf.REP_3_PARC !== "-" ? "R$ " : ""}`}{dadosDaEscolaPtrf.REP_3_PARC}</td>
          ): null }
          {dadosDaEscolaPtrf.REP_3_ADIC ? (
            <td>{`${dadosDaEscolaPtrf.REP_3_ADIC !== "-" ? "R$ " : ""}`}{dadosDaEscolaPtrf.REP_3_ADIC}</td>
          ): null }
          {dadosDaEscolaPtrf.REP_3_MULTI ? (
            <td>{`${dadosDaEscolaPtrf.REP_3_MULTI !== "-" ? "R$ " : ""}`}{dadosDaEscolaPtrf.REP_3_MULTI}</td>
          ): null }
          {dadosDaEscolaPtrf.REP_3_COMPL ? (
            <td>{`${dadosDaEscolaPtrf.REP_3_COMPL !== "-" ? "R$ " : ""}`}{dadosDaEscolaPtrf.REP_3_COMPL}</td>
          ): null }
        </tr>
        </tbody>
      </table>
    )
};
