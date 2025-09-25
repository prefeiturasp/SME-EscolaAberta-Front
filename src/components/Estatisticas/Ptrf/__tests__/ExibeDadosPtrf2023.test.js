import React from 'react';
import { render, screen, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ExibeDadosPtrf2023 } from '../ExibeDadosPtrf2023';

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: (props) => <i data-testid="fa-icon" {...props} />,
}));

jest.mock('../TabelaPtrf2023', () => ({
  TabelaPtrf2023: ({ dadosDaEscolaPtrf }) => (
    <div data-testid="tabela-mock">
      {dadosDaEscolaPtrf && dadosDaEscolaPtrf.EOL
        ? `EOL:${dadosDaEscolaPtrf.EOL};TOTAL:${dadosDaEscolaPtrf.TOTAL}`
        : 'sem-dados'}
    </div>
  ),
}));

jest.mock('../DadosPtrf2023', () => ({
  DadosPtrf2023: [
    {
      EOL: '123',
      UNIDADE: 'Escola A',
      DRE: 'DRE-1',
      REP_1_PARC: 100,
      REP_1_ADIC: 20,
      REP_2_PARC: 200,
      REP_2_ADIC: 50,
      REP_2_GREMIO: 10,
      REP_3_PARC: 300,
      REP_3_ADIC: 75,
      TOTAL: 755,
    },
    {
      EOL: '456',
      UNIDADE: 'Escola B',
      DRE: 'DRE-2',
      REP_1_PARC: 80,
      REP_1_ADIC: 10,
      REP_2_PARC: 120,
      REP_2_ADIC: 20,
      REP_2_GREMIO: 0,
      REP_3_PARC: 150,
      REP_3_ADIC: 30,
      TOTAL: 410,
    },
  ],
}));

describe('ExibeDadosPtrf2023', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('renderiza o card e título com TOTAL quando encontra a escola pelo codesc', async () => {
    render(<ExibeDadosPtrf2023 codesc="123" />);

    expect(screen.getAllByTestId('fa-icon').length).toBeGreaterThan(0);

    expect(
      await screen.findByText(/2023 - Total repassado para a escola: R\$ 755/i)
    ).toBeInTheDocument();

    const trigger = screen.getByRole('link', { name: '' });
    expect(trigger).toHaveAttribute('data-target', '#dadosPtrf2023');
    expect(trigger).toHaveAttribute('href', '#dadosPtrf2023');
    expect(await screen.findByTestId('tabela-mock')).toHaveTextContent(
      'EOL:123;TOTAL:755'
    );
  });

  it('atualiza os dados quando o prop codesc muda', async () => {
    const { rerender } = render(<ExibeDadosPtrf2023 codesc="123" />);

    expect(await screen.findByText(/R\$ 755/i)).toBeInTheDocument();
    expect(screen.getByTestId('tabela-mock')).toHaveTextContent('EOL:123;TOTAL:755');

    await act(async () => {
      rerender(<ExibeDadosPtrf2023 codesc="456" />);
    });

    expect(await screen.findByText(/R\$ 410/i)).toBeInTheDocument();
    expect(screen.getByTestId('tabela-mock')).toHaveTextContent('EOL:456;TOTAL:410');
  });

  it('mostra TOTAL indefinido/ausente quando codesc não corresponde a nenhuma escola', async () => {
    render(<ExibeDadosPtrf2023 codesc="999" />);

    expect(
      screen.getByText(/2023 - Total repassado para a escola: R\$/i)
    ).toBeInTheDocument();

    expect(screen.getByTestId('tabela-mock')).toHaveTextContent('sem-dados');
  });
});