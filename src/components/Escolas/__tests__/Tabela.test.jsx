import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import TabelaEscolas from "../Tabela";

describe("TabelaEscolas - coluna DRE", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  const baseEscola = {
    codesc: "019428",
    nomesc: "SOCRATES BRASILEIRO SAMPAIO DE SOUSA VIEIRA DE OLIVEIRA",
    nomescofi: "SOCRATES BRASILEIRO SAMPAIO DE SOUSA VIEIRA DE OLIVEIRA",
    tipoesc: "EMEF",
    latitude: -23.630902,
    longitude: -46.759264
  };

  const renderTabela = (escola) =>
    render(
      <MemoryRouter>
        <TabelaEscolas
          lista={[escola]}
          loading={false}
          atualizarMapa={jest.fn()}
        />
      </MemoryRouter>
    );

  it("exibe a DRE quando 'diretoria' vem no formato antigo (maiúsculo, sem acento)", () => {
    renderTabela({
      ...baseEscola,
      diretoria: "DIRETORIA REGIONAL DE EDUCACAO CAMPO LIMPO"
    });

    expect(screen.getByText("CAMPO LIMPO")).toBeInTheDocument();
  });

  it("exibe a DRE quando 'diretoria' vem no formato atual (com acentuação)", () => {
    renderTabela({
      ...baseEscola,
      diretoria: "Diretoria Regional de Educação Campo Limpo"
    });

    expect(screen.getByText("Campo Limpo")).toBeInTheDocument();
  });
});
