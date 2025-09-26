import React from 'react';
import { render, screen, cleanup, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TabelaPtrf2024 } from '../TabelaPtrf2024';

describe('TabelaPtrf2024', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  const fullData = {
    REP_1_PARC: 100,
    REP_1_VULNE: 15,
    REP_1_ADIC: 20,
    REP_2_PARC: 200,
    REP_2_VULNE: 25,
    REP_2_ADIC: 50,
    REP_2_GREMIO: 10,
    REP_3_PARC: 300,
    REP_3_VULNE: 30,
    REP_3_ADIC: 75,
  };

  it('renderiza os cabeçalhos fixos e as portarias', () => {
    render(<TabelaPtrf2024 dadosDaEscolaPtrf={{}} />);

    // Blocos de repasse
    expect(screen.getByRole('columnheader', { name: /1º Repasse/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /2º Repasse/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /3º Repasse/i })).toBeInTheDocument();

    // Portarias (algumas repetem; use getAllByText e verifique contagens mínimas)
    expect(screen.getAllByText(/Portaria SME nº 4\.445 de 29\/04\/2024/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Portaria SME nº 7\.489 de 13\/08\/2024/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Portaria SME nº 7\.674 de 23\/08\/2024/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Portaria SME nº 9\.581 de 24\/10\/2024/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Portaria SME nº 10\.726 de 09\/12\/2024/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Portaria SME nº 11\.057 de 26\/12\/2024/i).length).toBeGreaterThanOrEqual(1);
  });

  it('renderiza todas as colunas quando todos os campos estão presentes', () => {
    render(<TabelaPtrf2024 dadosDaEscolaPtrf={fullData} />);

    // Cabeçalhos condicionais (use contagens quando há repetições)
    expect(screen.getByRole('columnheader', { name: /Básico\s*1ª Parcela/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Básico\s*2ª Parcela/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Grêmio Estudantil/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Básico\s*3ª Parcela/i })).toBeInTheDocument();

    // Vulnerabilidade aparece 3 vezes (1º, 2º e 3º repasses)
    const vulnerabHeaders = screen.getAllByRole('columnheader', { name: /Valor Adicional\s*Vulnerabilidade/i });
    expect(vulnerabHeaders.length).toBe(3);

    // Extraordinários aparece 3 vezes (1º, 2º e 3º repasses)
    const extraHeaders = screen.getAllByRole('columnheader', { name: /Valor Adicional\s*Recursos\s*Extraordinários/i });
    expect(extraHeaders.length).toBe(3);

    // Linha de dados (tbody é o segundo rowgroup)
    const rowgroups = screen.getAllByRole('rowgroup');
    const tbody = rowgroups[1];
    const dataRow = within(tbody).getAllByRole('row')[0];

    // Verificações de valores com prefixo "R$ "
    [
      'R$ 100', 'R$ 15', 'R$ 20',
      'R$ 200', 'R$ 25', 'R$ 50', 'R$ 10',
      'R$ 300', 'R$ 30', 'R$ 75',
    ].forEach(txt => {
      expect(within(dataRow).getByText(txt)).toBeInTheDocument();
    });

    // Deve haver 10 células na linha de dados
    const cells = within(dataRow).getAllByRole('cell');
    expect(cells.length).toBe(10);
  });

  it('não renderiza colunas nem células para campos ausentes', () => {
    const partial = {
      REP_1_PARC: 100,
      REP_2_PARC: 200,
      REP_2_ADIC: 50,
      REP_3_ADIC: 75,
      // Demais campos ausentes
    };

    render(<TabelaPtrf2024 dadosDaEscolaPtrf={partial} />);

    // Presentes
    expect(screen.getByRole('columnheader', { name: /Básico\s*1ª Parcela/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Básico\s*2ª Parcela/i })).toBeInTheDocument();

    // "Valor Adicional Recursos Extraordinários" presente 2 vezes (2º e 3º repasses)
    expect(
      screen.getAllByRole('columnheader', { name: /Valor Adicional\s*Recursos\s*Extraordinários/i }).length
    ).toBe(2);

    // Ausentes
    expect(screen.queryByRole('columnheader', { name: /Valor Adicional\s*Vulnerabilidade/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('columnheader', { name: /Grêmio Estudantil/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('columnheader', { name: /Básico\s*3ª Parcela/i })).not.toBeInTheDocument();

    // Linha de dados
    const rowgroups = screen.getAllByRole('rowgroup');
    const tbody = rowgroups[1];
    const dataRow = within(tbody).getAllByRole('row')[0];

    expect(within(dataRow).getByText('R$ 100')).toBeInTheDocument();
    expect(within(dataRow).getByText('R$ 200')).toBeInTheDocument();
    expect(within(dataRow).getByText('R$ 50')).toBeInTheDocument();
    expect(within(dataRow).getByText('R$ 75')).toBeInTheDocument();

    // Ausentes
    ['R$ 15','R$ 20','R$ 25','R$ 10','R$ 300','R$ 30'].forEach(txt => {
      expect(screen.queryByText(txt)).not.toBeInTheDocument();
    });
  });

  it('mostra "-" sem prefixo "R$ " quando o valor é "-"', () => {
    const withDashes = {
      REP_1_PARC: '-',
      REP_1_VULNE: '-',
      REP_1_ADIC: '-',
      REP_2_PARC: '-',
      REP_2_VULNE: '-',
      REP_2_ADIC: '-',
      REP_2_GREMIO: '-',
      REP_3_PARC: '-',
      REP_3_VULNE: '-',
      REP_3_ADIC: '-',
    };

    render(<TabelaPtrf2024 dadosDaEscolaPtrf={withDashes} />);

    const rowgroups = screen.getAllByRole('rowgroup');
    const tbody = rowgroups[1];
    const dataRow = within(tbody).getAllByRole('row')[0];

    // 10 colunas condicionais => 10 células com '-'
    const cells = within(dataRow).getAllByRole('cell');
    expect(cells.length).toBe(10);
    cells.forEach((cell) => {
      expect(cell).toHaveTextContent(/^-\s*$/);
    });

    // Não deve haver "R$ -"
    expect(screen.queryByText(/R\$\s*-/)).not.toBeInTheDocument();
  });

  it('não quebra quando recebe objeto vazio (sem colunas condicionais)', () => {
    render(<TabelaPtrf2024 dadosDaEscolaPtrf={{}} />);

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