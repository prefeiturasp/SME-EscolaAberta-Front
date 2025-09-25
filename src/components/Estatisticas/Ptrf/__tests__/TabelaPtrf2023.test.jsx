import React from 'react';
import { render, screen, cleanup, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TabelaPtrf2023 } from '../TabelaPtrf2023';

describe('TabelaPtrf2023', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  const fullData = {
    REP_1_PARC: 100,
    REP_1_ADIC: 20,
    REP_2_PARC: 200,
    REP_2_ADIC: 50,
    REP_2_GREMIO: 10,
    REP_3_PARC: 300,
    REP_3_ADIC: 75,
  };

  it('renderiza os cabeçalhos fixos e as portarias', () => {
    render(<TabelaPtrf2023 dadosDaEscolaPtrf={{}} />);

    // Blocos de repasse
    expect(screen.getByRole('columnheader', { name: /1º Repasse/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /2º Repasse/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /3º Repasse/i })).toBeInTheDocument();

    // Portarias
    expect(screen.getAllByText(/Portaria SME nº 2\.340 de 20\/03\/2023/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Portaria SME nº 3\.517 de 27\/04\/2023/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Portaria SME nº 8\.593 de 31\/10\/2023/i)).toBeInTheDocument();
    expect(screen.getByText(/Portaria SME nº 9\.735 de 20\/12\/2023/i)).toBeInTheDocument();
  });

  it('renderiza todas as colunas quando todos os campos estão presentes', () => {
    render(<TabelaPtrf2023 dadosDaEscolaPtrf={fullData} />);

    // Cabeçalhos condicionais
    expect(screen.getByRole('columnheader', { name: /Básico\s*1ª Parcela/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Básico\s*2ª Parcela/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Grêmio Estudantil/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Básico\s*3ª Parcela/i })).toBeInTheDocument();

    // Este texto se repete em até 3 colunas; conferir quantidade exatamente 3 no cenário completo
    const allValorAdicionalHeaders = screen.getAllByRole('columnheader', {
      name: /Valor Adicional\s*Recursos\s*Extraordinários/i,
    });
    expect(allValorAdicionalHeaders.length).toBe(3);

    // Linha de dados: usar o tbody como segundo rowgroup
    const rowgroups = screen.getAllByRole('rowgroup');
    const tbody = rowgroups[1];
    const dataRow = within(tbody).getAllByRole('row')[0];

    // Verificações de valores com prefixo "R$ "
    expect(within(dataRow).getByText('R$ 100')).toBeInTheDocument();
    expect(within(dataRow).getByText('R$ 20')).toBeInTheDocument();
    expect(within(dataRow).getByText('R$ 200')).toBeInTheDocument();
    expect(within(dataRow).getByText('R$ 50')).toBeInTheDocument();
    expect(within(dataRow).getByText('R$ 10')).toBeInTheDocument();
    expect(within(dataRow).getByText('R$ 300')).toBeInTheDocument();
    expect(within(dataRow).getByText('R$ 75')).toBeInTheDocument();

    // Deve haver 7 células na linha de dados
    const cells = within(dataRow).getAllByRole('cell');
    expect(cells.length).toBe(7);
  });

  it('não renderiza colunas nem células para campos ausentes', () => {
    const partial = {
      REP_1_PARC: 100,
      // REP_1_ADIC ausente
      REP_2_PARC: 200,
      // REP_2_ADIC ausente
      // REP_2_GREMIO ausente
      // REP_3_PARC ausente
      REP_3_ADIC: 75,
    };

    render(<TabelaPtrf2023 dadosDaEscolaPtrf={partial} />);

    expect(screen.getByRole('columnheader', { name: /Básico\s*1ª Parcela/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Básico\s*2ª Parcela/i })).toBeInTheDocument();

    // “Valor Adicional …” existe apenas 1 vez (pelo REP_3_ADIC)
    const valorAdicionalHeaders = screen.getAllByRole('columnheader', {
      name: /Valor Adicional\s*Recursos\s*Extraordinários/i,
    });
    expect(valorAdicionalHeaders.length).toBe(1);

    expect(screen.queryByRole('columnheader', { name: /Grêmio Estudantil/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('columnheader', { name: /Básico\s*3ª Parcela/i })).not.toBeInTheDocument();

    // Linha de dados
    const rowgroups = screen.getAllByRole('rowgroup');
    const tbody = rowgroups[1];
    const dataRow = within(tbody).getAllByRole('row')[0];

    expect(within(dataRow).getByText('R$ 100')).toBeInTheDocument();
    expect(within(dataRow).getByText('R$ 200')).toBeInTheDocument();
    expect(within(dataRow).getByText('R$ 75')).toBeInTheDocument();

    // Ausentes
    expect(screen.queryByText('R$ 20')).not.toBeInTheDocument();
    expect(screen.queryByText('R$ 50')).not.toBeInTheDocument();
    expect(screen.queryByText('R$ 10')).not.toBeInTheDocument();
    expect(screen.queryByText('R$ 300')).not.toBeInTheDocument();
  });

  it('mostra "-" sem prefixo "R$ " quando o valor é "-"', () => {
    const withDashes = {
      REP_1_PARC: '-',
      REP_1_ADIC: '-',
      REP_2_PARC: '-',
      REP_2_ADIC: '-',
      REP_2_GREMIO: '-',
      REP_3_PARC: '-',
      REP_3_ADIC: '-',
    };

    render(<TabelaPtrf2023 dadosDaEscolaPtrf={withDashes} />);

    // tbody
    const rowgroups = screen.getAllByRole('rowgroup');
    const tbody = rowgroups[1];
    const dataRow = within(tbody).getAllByRole('row')[0];

    // Devem aparecer 7 células com '-' exato e nenhum "R$ -"
    const cells = within(dataRow).getAllByRole('cell');
    expect(cells.length).toBe(7);
    cells.forEach((cell) => {
      expect(cell).toHaveTextContent(/^-\s*$/);
    });
    expect(screen.queryByText(/R\$\s*-/)).not.toBeInTheDocument();
  });

  it('não quebra quando recebe objeto vazio (sem colunas condicionais)', () => {
    render(<TabelaPtrf2023 dadosDaEscolaPtrf={{}} />);

    // A tabela existe
    expect(screen.getByRole('table')).toBeInTheDocument();

    // tbody é o segundo rowgroup
    const rowgroups = screen.getAllByRole('rowgroup');
    const tbody = rowgroups[1];

    // Existe uma linha vazia no tbody
    const rows = within(tbody).getAllByRole('row');
    expect(rows.length).toBe(1);

    // A linha não tem células, pois todas são condicionais
    const cells = within(rows[0]).queryAllByRole('cell');
    expect(cells.length).toBe(0);
  });
});