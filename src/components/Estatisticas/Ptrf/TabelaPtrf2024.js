import React from 'react'
export const TabelaPtrf2024 = ({ dadosDaEscolaPtrf }) => {
  return (
    <table className="table text-center table-bordered mb-0 fonte-14">
      <thead>
        <tr>
          <th colSpan='3' className="fonte-12 text-center align-middle background-th-tabela-ptrf">1º Repasse</th>
          <th colSpan='4' className="fonte-12 text-center align-middle background-th-tabela-ptrf">2º Repasse</th>
          <th colSpan='3' className="fonte-12 text-center align-middle background-th-tabela-ptrf">3º Repasse</th>
        </tr>
        <tr>
          <th colSpan='3' className="fonte-12 text-center align-middle background-th-tabela-ptrf">
            <p className='mb-0'>Portaria SME nº 4.445 de 29/04/2024</p>
          </th>
          <th colSpan='4' className="fonte-12 text-center align-middle background-th-tabela-ptrf">
            <p className='mb-0'>Portaria SME nº 4.445 de 29/04/2024</p>
            <p className='mb-0'>Portaria SME nº 7.489 de 13/08/2024</p>
            <p className='mb-0'>Portaria SME nº 7.674 de 23/08/2024</p>
          </th>
          <th colSpan='3' className="fonte-12 text-center align-middle background-th-tabela-ptrf">
            <p className='mb-0'>Portaria SME nº 4.445 de 29/04/2024</p>
            <p className='mb-0'>Portaria SME nº 7.489 de 13/08/2024</p>
            <p className='mb-0'>Portaria SME nº 7.674 de 23/08/2024</p>
            <p className='mb-0'>Portaria SME nº 9.581 de 24/10/2024</p>
            <p className='mb-0'>Portaria SME nº 10.726 de 09/12/2024</p>
            <p className='mb-0'>Portaria SME nº 11.057 de 26/12/2024</p>
          </th>
        </tr>
        <tr>
          {dadosDaEscolaPtrf.REP_1_PARC ? (
            <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Básico<br /> 1ª Parcela</th>
          ) : null}
          {dadosDaEscolaPtrf.REP_1_VULNE ? (
            <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Valor Adicional<br /> Vulnerabilidade</th>
          ) : null}
          {dadosDaEscolaPtrf.REP_1_ADIC ? (
            <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Valor Adicional<br /> Recursos<br /> Extraordinários</th>
          ) : null}
          {dadosDaEscolaPtrf.REP_2_PARC ? (
            <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Básico<br /> 2ª Parcela</th>
          ) : null}
          {dadosDaEscolaPtrf.REP_2_VULNE ? (
            <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Valor Adicional<br /> Vulnerabilidade</th>
          ) : null}
          {dadosDaEscolaPtrf.REP_2_ADIC ? (
            <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Valor Adicional<br /> Recursos<br /> Extraordinários</th>
          ) : null}
          {dadosDaEscolaPtrf.REP_2_GREMIO ? (
            <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Grêmio Estudantil</th>
          ) : null}
          {dadosDaEscolaPtrf.REP_3_PARC ? (
            <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Básico<br /> 3ª Parcela</th>
          ) : null}
          {dadosDaEscolaPtrf.REP_3_VULNE ? (
            <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Valor Adicional<br /> Vulnerabilidade</th>
          ) : null}
          {dadosDaEscolaPtrf.REP_3_ADIC ? (
            <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Valor Adicional<br /> Recursos<br /> Extraordinários</th>
          ) : null}
        </tr>
      </thead>
      <tbody>
        <tr>
          {dadosDaEscolaPtrf.REP_1_PARC ? (
            <td>{`${dadosDaEscolaPtrf.REP_1_PARC !== "-" ? "R$ " : ""}`}{dadosDaEscolaPtrf.REP_1_PARC}</td>
          ) : null}
          {dadosDaEscolaPtrf.REP_1_VULNE ? (
            <td>{`${dadosDaEscolaPtrf.REP_1_VULNE !== "-" ? "R$ " : ""}`}{dadosDaEscolaPtrf.REP_1_VULNE}</td>
          ) : null}
          {dadosDaEscolaPtrf.REP_1_ADIC ? (
            <td>{`${dadosDaEscolaPtrf.REP_1_ADIC !== "-" ? "R$ " : ""}`}{dadosDaEscolaPtrf.REP_1_ADIC}</td>
          ) : null}
          {dadosDaEscolaPtrf.REP_2_PARC ? (
            <td>{`${dadosDaEscolaPtrf.REP_2_PARC !== "-" ? "R$ " : ""}`}{dadosDaEscolaPtrf.REP_2_PARC}</td>
          ) : null}
          {dadosDaEscolaPtrf.REP_2_VULNE ? (
            <td>{`${dadosDaEscolaPtrf.REP_2_VULNE !== "-" ? "R$ " : ""}`}{dadosDaEscolaPtrf.REP_2_VULNE}</td>
          ) : null}
          {dadosDaEscolaPtrf.REP_2_ADIC ? (
            <td>{`${dadosDaEscolaPtrf.REP_2_ADIC !== "-" ? "R$ " : ""}`}{dadosDaEscolaPtrf.REP_2_ADIC}</td>
          ) : null}
          {dadosDaEscolaPtrf.REP_2_GREMIO ? (
            <td>{`${dadosDaEscolaPtrf.REP_2_GREMIO !== "-" ? "R$ " : ""}`}{dadosDaEscolaPtrf.REP_2_GREMIO}</td>
          ) : null}
          {dadosDaEscolaPtrf.REP_3_PARC ? (
            <td>{`${dadosDaEscolaPtrf.REP_3_PARC !== "-" ? "R$ " : ""}`}{dadosDaEscolaPtrf.REP_3_PARC}</td>
          ) : null}
          {dadosDaEscolaPtrf.REP_3_VULNE ? (
            <td>{`${dadosDaEscolaPtrf.REP_3_VULNE !== "-" ? "R$ " : ""}`}{dadosDaEscolaPtrf.REP_3_VULNE}</td>
          ) : null}
          {dadosDaEscolaPtrf.REP_3_ADIC ? (
            <td>{`${dadosDaEscolaPtrf.REP_3_ADIC !== "-" ? "R$ " : ""}`}{dadosDaEscolaPtrf.REP_3_ADIC}</td>
          ) : null}
        </tr>
      </tbody>
    </table>
  )
};
