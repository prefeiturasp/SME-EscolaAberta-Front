import React from 'react'
export const TabelaPtrf = ({dadosDaEscolaPtrf}) =>{
    return(
      <table className="table text-center table-bordered mb-0 fonte-14">
        <thead>
        <tr>
          <th colSpan={dadosDaEscolaPtrf.REC_EXTRA ? '4' : '3'} className="fonte-12 text-center align-middle background-th-tabela-ptrf">1º Repasse</th>
          <th colSpan='5' className="fonte-12 text-center align-middle background-th-tabela-ptrf">2º Repasse</th>
        </tr>
        <tr>
          <th colSpan={dadosDaEscolaPtrf.REC_EXTRA ? '4' : '3'} className="fonte-12 text-center align-middle background-th-tabela-ptrf">
            <p className='mb-0'>Portaria SME nº 4.790 de 29/06/2020</p>
            <p className='mb-0'>Portaria SME nº 5.787 de 12/11/2020</p>
            <p className='mb-0'>Portaria SME nº 6.013 de 22/12/2020</p>
          </th>
          <th colSpan='5' className="fonte-12 text-center align-middle background-th-tabela-ptrf">
            <p className='mb-0'>Portaria SME nº 6.013 de 22/12/2020</p>
            <p className='mb-0'>Portaria SME nº 6.014 de 23/12/2020</p>
            <p className='mb-0'>Portaria SME nº 6.015 de 23/12/2020</p>
            <p className='mb-0'>Portaria SME nº 6.016 de 23/12/2020</p>
          </th>
        </tr>
        <tr>
          {dadosDaEscolaPtrf.BAS_1PAR ? (
            <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Básico<br/> 1ª Parcela</th>
          ): null }
          {dadosDaEscolaPtrf.BAS_2PAR ? (
          <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Básico<br/> 2ª Parcela</th>
          ): null }
          {dadosDaEscolaPtrf.REC_EXTRA ? (
          <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Valor Adicional<br/> Recursos<br/> Extraordinários</th>
          ): null }
          {dadosDaEscolaPtrf.BAS_3PAR ? (
          <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Básico<br/> 3ª Parcela</th>
          ): null }
          {dadosDaEscolaPtrf.REC_EXTRA2 ? (
          <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Valor Adicional<br/> Recursos<br/> Extraordinários</th>
          ): null }
          {dadosDaEscolaPtrf.EM ? (
          <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Ensino Médio</th>
          ): null }
          {dadosDaEscolaPtrf.SALA_LEITURA ? (
          <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Salas e Espaços<br/> de Leitura</th>
          ): null }
          {dadosDaEscolaPtrf.MAT_PEDAG ? (
          <th scope="col" className="fonte-12 text-center align-middle background-th-tabela-ptrf">Material<br/> Pedagógico</th>
          ): null }
        </tr>
        </thead>
        <tbody>
        <tr>
          {dadosDaEscolaPtrf.BAS_1PAR ? (
          <td>R$ {dadosDaEscolaPtrf.BAS_1PAR}</td>
          ): null }
          {dadosDaEscolaPtrf.BAS_2PAR ? (
          <td>R$ {dadosDaEscolaPtrf.BAS_2PAR}</td>
          ): null }
          {dadosDaEscolaPtrf.REC_EXTRA ? (
          <td>R$ {dadosDaEscolaPtrf.REC_EXTRA}</td>
          ): null }
          {dadosDaEscolaPtrf.BAS_3PAR ? (
          <td>R$ {dadosDaEscolaPtrf.BAS_3PAR}</td>
          ): null }
          {dadosDaEscolaPtrf.REC_EXTRA2 ? (
          <td>R$ {dadosDaEscolaPtrf.REC_EXTRA2}</td>
          ): null }
          {dadosDaEscolaPtrf.EM ? (
          <td>R$ {dadosDaEscolaPtrf.EM}</td>
          ): null }
          {dadosDaEscolaPtrf.SALA_LEITURA ? (
          <td>R$ {dadosDaEscolaPtrf.SALA_LEITURA}</td>
          ): null }
          {dadosDaEscolaPtrf.MAT_PEDAG ? (
          <td>R$ {dadosDaEscolaPtrf.MAT_PEDAG}</td>
          ): null }
        </tr>
        </tbody>
      </table>
    )
};
