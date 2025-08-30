import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePasswordStrength } from "@/hooks";

describe("usePasswordStrength", () => {
  it("retorna 'vazia' para senha vazia", () => {
    const { result } = renderHook(() => usePasswordStrength(""));
    expect(result.current.strength).toBe("vazia");
    expect(result.current.requirements).toContain("Mínimo 8 caracteres");
  });

  it("retorna 'fraca' para senha curta", () => {
    const { result } = renderHook(() => usePasswordStrength("abc"));
    expect(result.current.strength).toBe("fraca");
    expect(result.current.requirements).toContain("Mínimo 8 caracteres");
  });

  it("retorna 'moderada' para senha com 4 requisitos", () => {
    const { result } = renderHook(() => usePasswordStrength("Abcdef12"));
    expect(result.current.strength).toBe("moderada");
    expect(result.current.requirements).toContain("Símbolo");
  });

  it("retorna 'forte' para senha com todos requisitos", () => {
    const { result } = renderHook(() => usePasswordStrength("Abcdef12!"));
    expect(result.current.strength).toBe("forte");
    expect(result.current.requirements.length).toBe(0);
  });

  it("retorna requisitos faltantes corretamente", () => {
    const { result } = renderHook(() => usePasswordStrength("abcdef12"));
    expect(result.current.requirements).toContain("Letra maiúscula");
    expect(result.current.requirements).toContain("Símbolo");
  });
});