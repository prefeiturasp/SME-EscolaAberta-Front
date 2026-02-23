import React from 'react'
import PropTypes from 'prop-types'

export const TabelaPtrf2025 = ({ dadosDaEscolaPtrf }) => {

  const isDefined = (valor) => valor !== null && valor !== undefined

  const renderValor = (valor) => {
    if (valor === "-" || valor === "0,00") {
      return "-"
    }
    return `R$ ${valor}`
  }

  const repasses = [
    {
      titulo: "1º Repasse",
      portarias: [
        "Portaria SME nº 2.386 de 20/02/2025"
      ],
      campos: [
        { key: "REP_1_VALOR_CALCULADO", label: <>Valor<br />Calculado</> },
        { key: "REP_1_VALOR_ADICIONAL_ALUNO", label: <>Valor Adicional<br />por Aluno</> },
        { key: "REP_1_VALOR_TOTAL", label: <>Valor Total do 1º<br />Repasse</> }
      ]
    },
    {
      titulo: "2º Repasse",
      portarias: [
        "Portaria SME nº 2.386 de 20/02/2025",
        "Portaria SME nº 6.550 de 26/06/2025",
        "Portaria SME nº 7.302 de 24/07/2025"
      ],
      campos: [
        { key: "REP_2_VALOR_CALCULADO", label: <>Valor<br />Calculado</> },
        { key: "REP_2_VALOR_ADICIONAL_ALUNO", label: <>Valor Adicional<br />por Aluno</> },
        { key: "REP_2_VALOR_GREMIO", label: <>Valor do Grêmio<br />Estudantil</> },
        { key: "REP_2_VALOR_TOTAL", label: <>Valor Total do 2º<br />Repasse</> }
      ]
    },
    {
      titulo: "3º Repasse",
      portarias: [
        "Portaria SME nº 2.386 de 20/02/2025",
        "Portaria SME nº 10.074 de 07/11/2025"
      ],
      campos: [
        { key: "REP_3_VALOR_CALCULADO", label: <>Valor<br />Calculado</> },
        { key: "REP_3_VALOR_ADICIONAL_ALUNO", label: <>Valor Adicional<br />por Aluno</> },
        { key: "REP_3_VALOR_TOTAL", label: <>Valor Total do 3º<br />Repasse</> }
      ]
    }
  ]

  const camposVisiveis = repasses.flatMap(repasse =>
    repasse.campos.filter(campo => isDefined(dadosDaEscolaPtrf[campo.key]))
  )

  return (
    <div className="tabela-wrapper">
      <table className="table text-center table-bordered mb-0 fonte-14">
        <thead>
          <tr>
            {repasses.map(repasse => {
              const colSpan = repasse.campos.filter(campo =>
                isDefined(dadosDaEscolaPtrf[campo.key])
              ).length

              return colSpan > 0 && (
                <th
                  key={repasse.titulo}
                  colSpan={colSpan}
                  className="fonte-12 text-center align-middle background-th-tabela-ptrf"
                >
                  {repasse.titulo}
                </th>
              )
            })}
          </tr>
          <tr>
            {repasses.map(repasse => {
              const colSpan = repasse.campos.filter(campo =>
                isDefined(dadosDaEscolaPtrf[campo.key])
              ).length
              return colSpan > 0 && (
                <th
                  key={`${repasse.titulo}-portarias`}
                  colSpan={colSpan}
                  className="fonte-12 text-center align-middle background-th-tabela-ptrf"
                >
                  {repasse.portarias.map(portaria => (
                    <p key={portaria} className="mb-0">{portaria}</p>
                  ))}
                </th>
              )
            })}
          </tr>
          <tr>
            {camposVisiveis.map(campo => (
              <th
                key={campo.key}
                className="fonte-12 background-th-tabela-ptrf"
              >
                {campo.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {camposVisiveis.map(campo => (
              <td key={campo.key}>
                {renderValor(dadosDaEscolaPtrf[campo.key])}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

TabelaPtrf2025.propTypes = {
  dadosDaEscolaPtrf: PropTypes.shape({
    REP_1_VALOR_CALCULADO: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    REP_1_VALOR_ADICIONAL_ALUNO: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    REP_1_VALOR_TOTAL: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    REP_2_VALOR_CALCULADO: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    REP_2_VALOR_ADICIONAL_ALUNO: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    REP_2_VALOR_GREMIO: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    REP_2_VALOR_TOTAL: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    REP_3_VALOR_CALCULADO: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    REP_3_VALOR_ADICIONAL_ALUNO: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    REP_3_VALOR_TOTAL: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired
}