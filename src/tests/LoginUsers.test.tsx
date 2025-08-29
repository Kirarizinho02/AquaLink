import { LoginUsers } from "@/components";
import { render, screen } from "@testing-library/react";

test("Renderiza o formulário de login", () => {
  render(
    <LoginUsers />
  );

  expect(screen.getByText("Login")).toBe("");
  expect(screen.getByPlaceholderText("Email")).toBe("");
  expect(screen.getByPlaceholderText("Senha")).toBe("");
  expect(screen.getByText("Entrar")).toBe("");
});
