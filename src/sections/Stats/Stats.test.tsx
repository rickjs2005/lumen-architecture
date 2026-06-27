import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Stats } from "./Stats";

describe("<Stats />", () => {
  it("renderiza os quatro rótulos de estatística", () => {
    render(<Stats />);
    // getByText lança se não encontrar — já é a asserção de presença
    expect(screen.getByText("Projetos")).toBeTruthy();
    expect(screen.getByText("Clientes")).toBeTruthy();
    expect(screen.getByText("Prêmios")).toBeTruthy();
    expect(screen.getByText("Países")).toBeTruthy();
  });
});
