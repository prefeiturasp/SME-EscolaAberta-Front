import React from 'react';
import { render, screen, cleanup, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TabelaPtrf2025 } from '../TabelaPtrf2025';

describe('TabelaPtrf2025', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  const fullData = {
    REP_1_VALOR_CALCULADO: 500,
    REP_1_VALOR_ADICIONAL_ALUNO: 75,
    REP_1_VALOR_TOTAL: 575,

    REP_2_VALOR_CALCULADO: 300,
    REP_2_VALOR_ADICIONAL_ALUNO: 50,
    REP_2_VALOR_GREMIO: 20,
    REP_2_VALOR_TOTAL: 370,

    REP_3_VALOR_CALCULADO: 200,
    REP_3_VALOR_ADICIONAL_ALUNO: 30,
    REP_3_VALOR_TOTAL: 230,
  };

  it('não renderiza repasses quando não houver dados', () => {
    render(<TabelaPtrf2025 dadosDaEscolaPtrf={{}} />);

    expect(screen.queryByText(/1º Repasse/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/2º Repasse/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/3º Repasse/i)).not.toBeInTheDocument();
  });

  it('renderiza títulos dos repasses quando houver campos visíveis', () => {
    render(<TabelaPtrf2025 dadosDaEscolaPtrf={{
      REP_2_VALOR_GREMIO: 10
    }} />);

    expect(screen.queryByText(/1º Repasse/i)).not.toBeInTheDocument();
    expect(screen.getByText(/2º Repasse/i)).toBeInTheDocument();
    expect(screen.queryByText(/3º Repasse/i)).not.toBeInTheDocument();
  });

  it('renderiza apenas portarias do repasse visível', () => {
    render(<TabelaPtrf2025 dadosDaEscolaPtrf={{
      REP_3_VALOR_TOTAL: 100
    }} />);

    expect(screen.getByText(/3º Repasse/i)).toBeInTheDocument();

    expect(screen.getByText(/Portaria SME nº 2\.386/i)).toBeInTheDocument();
    expect(screen.getByText(/Portaria SME nº 10\.074/i)).toBeInTheDocument();

    expect(screen.queryByText(/Portaria SME nº 6\.550/i)).not.toBeInTheDocument();
  });

  it('renderiza todas as colunas quando todos os campos estão presentes', () => {
    render(<TabelaPtrf2025 dadosDaEscolaPtrf={fullData} />);

    const headerRows = screen.getAllByRole('row');
    const dynamicHeaderRow = headerRows[2];

    const dynamicHeaders = within(dynamicHeaderRow).getAllByRole('columnheader');

    expect(dynamicHeaders.length).toBe(10);

    const rowgroups = screen.getAllByRole('rowgroup');
    const tbody = rowgroups[1];
    const dataRow = within(tbody).getByRole('row');

    const cells = within(dataRow).getAllByRole('cell');
    expect(cells.length).toBe(10);
  });

  it('renderiza apenas colunas existentes', () => {
    const partialData = {
      REP_1_VALOR_TOTAL: 575,
      REP_2_VALOR_GREMIO: 20,
      REP_3_VALOR_CALCULADO: 200,
    };

    render(<TabelaPtrf2025 dadosDaEscolaPtrf={partialData} />);

    const headerRows = screen.getAllByRole('row');
    const dynamicHeaderRow = headerRows[2];

    const dynamicHeaders = within(dynamicHeaderRow).getAllByRole('columnheader');

    expect(dynamicHeaders.length).toBe(3);

    const rowgroups = screen.getAllByRole('rowgroup');
    const tbody = rowgroups[1];
    const dataRow = within(tbody).getByRole('row');

    const cells = within(dataRow).getAllByRole('cell');
    expect(cells.length).toBe(3);
  });

  it('mostra "-" sem prefixo R$ quando valor é "-"', () => {
    const withDashes = {
      REP_1_VALOR_CALCULADO: '-',
      REP_2_VALOR_TOTAL: '-',
    };

    render(<TabelaPtrf2025 dadosDaEscolaPtrf={withDashes} />);

    const rowgroups = screen.getAllByRole('rowgroup');
    const tbody = rowgroups[1];
    const dataRow = within(tbody).getByRole('row');

    const cells = within(dataRow).getAllByRole('cell');

    expect(cells.length).toBe(2);

    cells.forEach((cell) => {
      expect(cell).toHaveTextContent(/^-\s*$/);
    });

    expect(screen.queryByText(/R\$\s*-/)).not.toBeInTheDocument();
  });

  it('não quebra com objeto vazio', () => {
    render(<TabelaPtrf2025 dadosDaEscolaPtrf={{}} />);

    expect(screen.getByRole('table')).toBeInTheDocument();

    const rowgroups = screen.getAllByRole('rowgroup');
    const tbody = rowgroups[1];
    const rows = within(tbody).getAllByRole('row');

    expect(rows.length).toBe(1);

    const cells = within(rows[0]).queryAllByRole('cell');
    expect(cells.length).toBe(0);
  });

  it('deve renderizar coluna quando valor é 0 (valor válido)', () => {
    const dataWithZero = {
      REP_2_VALOR_GREMIO: 0,
    };

    render(<TabelaPtrf2025 dadosDaEscolaPtrf={dataWithZero} />);

    const headerRows = screen.getAllByRole('row');
    const dynamicHeaderRow = headerRows[2];

    expect(
      within(dynamicHeaderRow).getByRole('columnheader', {
        name: /Valor do Grêmio Estudantil/i,
      })
    ).toBeInTheDocument();

    const rowgroups = screen.getAllByRole('rowgroup');
    const tbody = rowgroups[1];
    const dataRow = within(tbody).getByRole('row');

    expect(within(dataRow).getByText('R$ 0')).toBeInTheDocument();
  });
});