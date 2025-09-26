import React from 'react';
import { render, screen, cleanup, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TabelaPtrf2025 } from '../TabelaPtrf2025';

describe('TabelaPtrf2025', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  const fullData = {
    REP_1_PARC: 500,
    REP_1_ADIC: 75,
  };

  it('renderiza cabeçalhos fixos e a portaria', () => {
    render(<TabelaPtrf2025 dadosDaEscolaPtrf={{}} />);

    // Bloco do 1º Repasse
    expect(screen.getByRole('columnheader', { name: /1º Repasse/i })).toBeInTheDocument();

    // Portaria
    expect(screen.getByText(/Portaria SME nº 2\.386 de 20\/02\/2025/i)).toBeInTheDocument();
  });

  it('renderiza todas as colunas quando REP_1_PARC e REP_1_ADIC estão presentes', () => {
    render(<TabelaPtrf2025 dadosDaEscolaPtrf={fullData} />);

    // Cabeçalhos condicionais
    expect(
      screen.getByRole('columnheader', { name: /Valor Total do 1º Repasse/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Valor Adicional\s*Recursos\s*Extraordinários/i })
    ).toBeInTheDocument();

    // Linha de dados (tbody é o segundo rowgroup)
    const rowgroups = screen.getAllByRole('rowgroup');
    const tbody = rowgroups[1];
    const dataRow = within(tbody).getAllByRole('row')[0];

    // Valores com prefixo "R$ "
    expect(within(dataRow).getByText('R$ 500')).toBeInTheDocument();
    expect(within(dataRow).getByText('R$ 75')).toBeInTheDocument();

    // Deve haver 2 células na linha de dados
    const cells = within(dataRow).getAllByRole('cell');
    expect(cells.length).toBe(2);
  });

  it('não renderiza colunas/células ausentes quando apenas um campo está presente', () => {
    // Apenas REP_1_PARC
    const onlyParc = { REP_1_PARC: 500 };
    render(<TabelaPtrf2025 dadosDaEscolaPtrf={onlyParc} />);

    expect(
      screen.getByRole('columnheader', { name: /Valor Total do 1º Repasse/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('columnheader', { name: /Valor Adicional\s*Recursos\s*Extraordinários/i })
    ).not.toBeInTheDocument();

    let rowgroups = screen.getAllByRole('rowgroup');
    let tbody = rowgroups[1];
    let dataRow = within(tbody).getAllByRole('row')[0];
    expect(within(dataRow).getAllByRole('cell').length).toBe(1);
    expect(within(dataRow).getByText('R$ 500')).toBeInTheDocument();
    expect(screen.queryByText('R$ 75')).not.toBeInTheDocument();

    cleanup(); // Render novo cenário

    // Apenas REP_1_ADIC
    const onlyAdic = { REP_1_ADIC: 75 };
    render(<TabelaPtrf2025 dadosDaEscolaPtrf={onlyAdic} />);

    expect(
      screen.getByRole('columnheader', { name: /Valor Adicional\s*Recursos\s*Extraordinários/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('columnheader', { name: /Valor Total do 1º Repasse/i })
    ).not.toBeInTheDocument();

    rowgroups = screen.getAllByRole('rowgroup');
    tbody = rowgroups[1];
    dataRow = within(tbody).getAllByRole('row')[0];
    expect(within(dataRow).getAllByRole('cell').length).toBe(1);
    expect(within(dataRow).getByText('R$ 75')).toBeInTheDocument();
    expect(screen.queryByText('R$ 500')).not.toBeInTheDocument();
  });

  it('mostra "-" sem prefixo "R$ " quando o valor é "-"', () => {
    const withDashes = {
      REP_1_PARC: '-',
      REP_1_ADIC: '-',
    };

    render(<TabelaPtrf2025 dadosDaEscolaPtrf={withDashes} />);

    const rowgroups = screen.getAllByRole('rowgroup');
    const tbody = rowgroups[1];
    const dataRow = within(tbody).getAllByRole('row')[0];

    // Duas células com '-' e nenhuma "R$ -"
    const cells = within(dataRow).getAllByRole('cell');
    expect(cells.length).toBe(2);
    cells.forEach((cell) => {
      expect(cell).toHaveTextContent(/^-\s*$/);
    });
    expect(screen.queryByText(/R\$\s*-/)).not.toBeInTheDocument();
  });

  it('não quebra quando recebe objeto vazio (sem colunas condicionais)', () => {
    render(<TabelaPtrf2025 dadosDaEscolaPtrf={{}} />);

    // Tabela existe
    expect(screen.getByRole('table')).toBeInTheDocument();

    // tbody é o segundo rowgroup; terá 1 linha sem células
    const rowgroups = screen.getAllByRole('rowgroup');
    const tbody = rowgroups[1];
    const rows = within(tbody).getAllByRole('row');
    expect(rows.length).toBe(1);

    const cells = within(rows[0]).queryAllByRole('cell');
    expect(cells.length).toBe(0);
  });
});