import { LoginUsers } from "@/components";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import { AuthProvider } from "@/contexts/AuthContext";

const loginWithGoogleMock = vi.fn().mockResolvedValue(undefined);
const loginMock = vi.fn().mockResolvedValue(undefined);

vi.mock("@/hooks", () => ({
  useAuthContext: () => ({
    login: loginMock,
    loginWithGoogle: loginWithGoogleMock,
  }),
}));

describe("LoginUsers", () => {
  it("Renderiza o formulário de login", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <LoginUsers />
        </MemoryRouter>
      </AuthProvider>
    );
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
    expect(screen.getByText("Entrar")).toBeInTheDocument();
  });

  it("Chama login ao enviar o formulário", async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <LoginUsers />
        </MemoryRouter>
      </AuthProvider>
    );
    const emailInputs = screen.getAllByPlaceholderText("Email");
    fireEvent.change(emailInputs[0], {
      target: { value: "test@email.com" },
    });
    const passwordInputs = screen.getAllByPlaceholderText("Senha");
    fireEvent.change(passwordInputs[0], {
      target: { value: "12345678Aa!" },
    });
    const entrarButtons = screen.getAllByRole("button", { name: "Entrar" });
    fireEvent.click(entrarButtons[0]);

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith("test@email.com", "12345678Aa!");
    });
  });

  it("chama loginWithGoogle ao clicar no botão Google", async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <LoginUsers />
        </MemoryRouter>
      </AuthProvider>
    );
    const googleButtons = screen.getAllByRole("button", { name: /google/i });
    fireEvent.click(googleButtons[0]);
    await waitFor(() => {
      expect(loginWithGoogleMock).toHaveBeenCalled();
    });
  });
});
