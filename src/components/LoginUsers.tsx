import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa6";

import { Input } from "./ui/input";

import { logo_no_writing_aqualink_primary } from "@/assets";

import { UseAuthContext } from "@/hooks/UseAuthContext";
import { useNavigate } from "react-router-dom";

const LoginUsers = () => {
  const navigation = useNavigate();
  const { login, loginWithGoogle, loginWithGithub } = UseAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    try {
      await login(email, password);
      console.log("User logged in successfully"); // Caso de sucesso, onde usuário e senha são válidos
      navigation("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error); // Caso de erro (não específico)
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle(); // Abre um popup para o usuário fazer login com a conta Google
      console.log("User logged in successfully with Google");
      navigation("/dashboard");
    } catch (error) {
      // Usamos 'FirebaseError' para ter acesso a propriedades específicas de erro do Firebase Auth
      console.error("Error logging in with Google:", error);
      if (
        (error as import("firebase/app").FirebaseError).code ===
        "auth/popup-closed-by-user"
      ) {
        console.log("Popup fechado pelo usuário.");
      } else if (
        (error as import("firebase/app").FirebaseError).code ===
        "auth/cancelled-popup-request"
      ) {
        console.log("Requisição de popup cancelada.");
      }
    }
  };

  const handleGithubLogin = async () => {
    try {
      await loginWithGithub();
      console.log("User logged in successfully with GitHub");
      navigation("/dashboard");
    } catch (error) {
      console.error("Error logging in with GitHub:", error);
      if (
        (error as import("firebase/app").FirebaseError).code ===
        "auth/popup-closed-by-user"
      ) {
        console.log("Popup fechado pelo usuário.");
      } else if (
        (error as import("firebase/app").FirebaseError).code ===
        "auth/cancelled-popup-request"
      ) {
        console.log("Requisição de popup cancelada.");
      }
    }
  };

  return (
    <div className="relative min-h-[calc(100vh)] w-full overflow-hidden items-center content-center max-h-200">
      <div className="w-full space-y-4 text-center content-center flex items-center justify-center flex-col">
        <img
          src={logo_no_writing_aqualink_primary}
          alt="AquaLink Logo"
          className="max-w-[55px] mb-4 drop-shadow-verde-azul drop-shadow-md"
        />
        <h1 className="text-4xl font-bold">Login</h1>
        <p className="text-muted-foreground">
          Faça login para acessar sua conta AquaLink
        </p>
        <form className="w-90 gap-4 space-y-4" onSubmit={handleLogin}>
          <div className="text-start">
            <label className="font-medium">Email</label>
            <Input
              type="email"
              placeholder="Email"
              className="bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="text-start">
            <label className="font-medium">Senha</label>
            <Input
              type="password"
              placeholder="Senha"
              className="bg-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="relative mt-8">
            <button
              type="submit"
              className="w-full bg-azul-primario text-white py-2 rounded-lg hover:bg-azul-primario/80 transition duration-300 shadow-md cursor-pointer"
            >
              Entrar
            </button>
          </div>
        </form>
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-90 h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
          <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
            Ou continue com
          </span>
        </div>
        <div className="grid grid-cols-2 gap-x-3 w-90">
          <button
            className="hover:bg-secondary active:bg-secondary/40 flex items-center justify-center rounded-lg border py-2.5 duration-150 bg-white cursor-pointer"
            onClick={handleGithubLogin}
          >
            <FaGithub />
          </button>
          <button
            className="hover:bg-secondary active:bg-secondary/40 flex items-center justify-center rounded-lg border py-2.5 duration-150 bg-white cursor-pointer"
            onClick={handleGoogleLogin}
          >
            <FaGoogle />
          </button>
        </div>
        <p className="text-sm text-muted-foreground mt-6">
          Não tem uma conta?{" "}
          <a
            href="/register"
            className="underline underline-offset-4 hover:text-azul-primario transition-all duration-200"
          >
            Registre-se
          </a>
        </p>
      </div>
    </div>
  );
};

export { LoginUsers };
