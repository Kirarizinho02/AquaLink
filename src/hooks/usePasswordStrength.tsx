import { useMemo } from "react";

export type PasswordStrength =
  | "vazia"
  | "fraca"
  | "moderada"
  | "forte";

export interface PasswordCheckResult {
  strength: PasswordStrength;
  lengthValid: boolean;
  hasUpper: boolean;
  hasLower: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
  requirements: string[];
}

const usePasswordStrength = (password: string): PasswordCheckResult =>  {
  return useMemo(() => {
    if (!password) {
      return {
        strength: "vazia",
        lengthValid: false,
        hasUpper: false,
        hasLower: false,
        hasNumber: false,
        hasSymbol: false,
        requirements: [
          "Mínimo 8 caracteres",
          "Letra maiúscula",
          "Letra minúscula",
          "Número",
          "Símbolo",
        ],
      };
    }

    const lengthValid = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    const requirements: string[] = [];
    if (!lengthValid) requirements.push("Mínimo 8 caracteres");
    if (!hasUpper) requirements.push("Letra maiúscula");
    if (!hasLower) requirements.push("Letra minúscula");
    if (!hasNumber) requirements.push("Número");
    if (!hasSymbol) requirements.push("Símbolo");

    let strength: PasswordStrength = "fraca";
    const passed = [lengthValid, hasUpper, hasLower, hasNumber, hasSymbol].filter(Boolean).length;

    if (passed >= 4 && lengthValid) strength = "moderada";
    if (passed === 5 && lengthValid) strength = "forte";
    if (passed <= 2 || !lengthValid) strength = "fraca";

    return {
      strength,
      lengthValid,
      hasUpper,
      hasLower,
      hasNumber,
      hasSymbol,
      requirements,
    };
  }, [password]);
}

export { usePasswordStrength };