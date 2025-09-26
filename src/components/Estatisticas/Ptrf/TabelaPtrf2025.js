import React from 'react'
export const TabelaPtrf2025 = ({ dadosDaEscolaPtrf }) => {
  return (
    <table className="table text-center table-bordered mb-0 fonte-14">
      <thead>
        <tr>
          <th colSpan='2' className="fonte-12 text-center align-middle background-th-tabela-ptrf">1º Repasse</th>
        </tr>
        <tr>
          <th colSpan='2' className="fonte-12 text-center align-middle background-th-tabela-ptrf">
            <p className='mb-0'>Portaria SME nº 2.386 de 20/02/2025</p>
          </th>
        </tr>
        <tr>
          {dadosDaEscolaPtrf.REP_1_PARC ? (
            <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Valor Total do 1º Repasse</th>
          ) : null}
          {dadosDaEscolaPtrf.REP_1_ADIC ? (
            <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Valor Adicional<br /> Recursos<br /> Extraordinários</th>
          ) : null}
        </tr>
      </thead>
      <tbody>
        <tr>
          {dadosDaEscolaPtrf.REP_1_PARC ? (
            <td>{`${dadosDaEscolaPtrf.REP_1_PARC !== "-" ? "R$ " : ""}`}{dadosDaEscolaPtrf.REP_1_PARC}</td>
          ) : null}
          {dadosDaEscolaPtrf.REP_1_ADIC ? (
            <td>{`${dadosDaEscolaPtrf.REP_1_ADIC !== "-" ? "R$ " : ""}`}{dadosDaEscolaPtrf.REP_1_ADIC}</td>
          ) : null}
        </tr>
      </tbody>
    </table>
  )
};
