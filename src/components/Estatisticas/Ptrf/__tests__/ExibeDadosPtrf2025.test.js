import React from 'react';
import { render, screen, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ExibeDadosPtrf2025 } from '../ExibeDadosPtrf2025';

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: (props) => <i data-testid="fa-icon" {...props} />,
}));

jest.mock('../TabelaPtrf2025', () => ({
  TabelaPtrf2025: ({ dadosDaEscolaPtrf }) => (
    <div data-testid="tabela-mock">
      {dadosDaEscolaPtrf && dadosDaEscolaPtrf.EOL
        ? `EOL:${dadosDaEscolaPtrf.EOL};TOTAL:${dadosDaEscolaPtrf.TOTAL}`
        : 'sem-dados'}
    </div>
  ),
}));

jest.mock('../DadosPtrf2025', () => ({
  DadosPtrf2025: [
    {
      EOL: '123',
      UNIDADE: 'Escola A',
      DRE: 'DRE-1',
      REP_1_VALOR_CALCULADO: 100,
      REP_1_VALOR_ADICIONAL_ALUNO: 0,
      REP_1_VALOR_TOTAL: 100,
      REP_2_VALOR_CALCULADO: 200,
      REP_2_VALOR_ADICIONAL_ALUNO: 50,
      REP_2_VALOR_GREMIO: 10,
      REP_2_VALOR_TOTAL: 260,
      REP_3_VALOR_CALCULADO: 300,
      REP_3_VALOR_ADICIONAL_ALUNO: 75,
      REP_3_VALOR_TOTAL: 375,
      TOTAL: 735,
    },
    {
      EOL: '456',
      UNIDADE: 'Escola B',
      DRE: 'DRE-2',
      REP_1_VALOR_CALCULADO: 80,
      REP_1_VALOR_ADICIONAL_ALUNO: 0,
      REP_1_VALOR_TOTAL: 80,
      REP_2_VALOR_CALCULADO: 120,
      REP_2_VALOR_ADICIONAL_ALUNO: 20,
      REP_2_VALOR_GREMIO: 0,
      REP_2_VALOR_TOTAL: 140,
      REP_3_VALOR_CALCULADO: 150,
      REP_3_VALOR_ADICIONAL_ALUNO: 30,
      REP_3_VALOR_TOTAL: 180,
      TOTAL: 400,
    },
  ],
}));

describe('ExibeDadosPtrf2025', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('renderiza o card e título com TOTAL quando encontra a escola pelo codesc', async () => {
    render(<ExibeDadosPtrf2025 codesc="123" />);

    expect(screen.getAllByTestId('fa-icon').length).toBeGreaterThan(0);

    expect(
      await screen.findByText(/2025 - Total repassado para a escola: R\$?\s?735/i)
    ).toBeInTheDocument();

    const trigger = screen.getByRole('link');
    expect(trigger).toHaveAttribute('data-target', '#dadosPtrf2025');
    expect(trigger).toHaveAttribute('href', '#dadosPtrf2025');

    expect(await screen.findByTestId('tabela-mock')).toHaveTextContent(
      'EOL:123;TOTAL:735'
    );
  });

  it('atualiza os dados quando o prop codesc muda', async () => {
    const { rerender } = render(<ExibeDadosPtrf2025 codesc="123" />);

    expect(await screen.findByText(/R\$?\s?735/i)).toBeInTheDocument();
    expect(screen.getByTestId('tabela-mock')).toHaveTextContent('EOL:123;TOTAL:735');

    await act(async () => {
      rerender(<ExibeDadosPtrf2025 codesc="456" />);
    });

    expect(await screen.findByText(/R\$?\s?400/i)).toBeInTheDocument();
    expect(screen.getByTestId('tabela-mock')).toHaveTextContent('EOL:456;TOTAL:400');
  });

  it('mostra TOTAL indefinido/ausente quando codesc não corresponde', () => {
    render(<ExibeDadosPtrf2025 codesc="999" />);

    expect(
      screen.getByText(/2025 - Total repassado para a escola: R\$/i)
    ).toBeInTheDocument();

    expect(screen.getByTestId('tabela-mock')).toHaveTextContent('sem-dados');
  });
});