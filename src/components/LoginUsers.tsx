/* eslint-disable @typescript-eslint/no-explicit-any */

import { useId, useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa6";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { LoginAlerts } from "./LoginAlerts";

import { logo_no_writing_aqualink_primary } from "@/assets";

import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { useAuthContext } from "@/hooks";

type AlertType = {
  type: "error" | "success";
  message: string;
  details?: string[];
};

const LoginUsers = () => {
  const id = useId();
  const navigation = useNavigate();
  const { login, loginWithGoogle, loginWithGithub } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [alert, setAlert] = useState<AlertType | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    setAlert(null);
    try {
      await login(email, password, remember);
      setAlert({
        type: "success",
        message: "Login realizado com sucesso!",
      }); // Caso de sucesso, onde usuário e senha são válidos
      setTimeout(() => navigation("/dashboard"), 1200);
    } catch (error: any) {
      let details: string[] = [];
      if (error.code === "auth/user-not-found") {
        details = ["Usuário não encontrado."];
      } else if (error.code === "auth/wrong-password") {
        details = ["Senha incorreta."];
      } else if (error.code === "auth/invalid-email") {
        details = ["Email inválido."];
      } else if (error.code === "auth/invalid-credential") {
        details = ["Credenciais inválidas."];
      } else {
        details = [error.message || "Erro desconhecido."];
      }
      setAlert({
        type: "error",
        message: "Erro ao fazer login.",
        details,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle(remember); // Abre um popup para o usuário fazer login com a conta Google
      setAlert({
        type: "success",
        message: "Login com Google realizado com sucesso!",
      });
      setTimeout(() => navigation("/dashboard"), 1200);
    } catch (error: any) {
      let details: string[] = [];
      if (error.code === "auth/popup-closed-by-user") {
        details = ["Popup fechado pelo usuário."];
      } else if (error.code === "auth/cancelled-popup-request") {
        details = ["Requisição de popup cancelada."];
      } else {
        details = [error.message || "Erro desconhecido."];
      }
      setAlert({
        type: "error",
        message: "Erro ao fazer login com Google.",
        details,
      });
    }
  };

  const handleGithubLogin = async () => {
    setAlert(null);
    try {
      await loginWithGithub(remember);
      setAlert({
        type: "success",
        message: "Login com GitHub realizado com sucesso!",
      });
      setTimeout(() => navigation("/dashboard/overview"), 1200);
    } catch (error: any) {
      let details: string[] = [];
      if (error.code === "auth/popup-closed-by-user") {
        details = ["Popup fechado pelo usuário."];
      } else if (error.code === "auth/cancelled-popup-request") {
        details = ["Requisição de popup cancelada."];
      } else {
        details = [error.message || "Erro desconhecido."];
      }
      setAlert({
        type: "error",
        message: "Erro ao fazer login com GitHub.",
        details,
      });
    }
  };

  const handleForgotPassword = async () => {
    setAlert(null);
    if (!email) {
      setAlert({
        type: "error",
        message: "Por favor, insira seu email para redefinir a senha.",
      });
      return;
    }
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setAlert({
        type: "success",
        message: "Email de redefinição de senha enviado!",
      });
    } catch (error: any) {
      setAlert({
        type: "error",
        message: "Erro ao enviar email de redefinição de senha.",
        details: [error.message || "Tente novamente."],
      });
    }
  };

  return (
    <div className="relative min-h-[calc(100vh)] w-full overflow-hidden items-center content-center max-h-200 pt-8">
      <div className="w-full space-y-4 text-center content-center flex items-center justify-center flex-col">
        <a onClick={() => navigation("/")} className="cursor-pointer">
          <img
            src={logo_no_writing_aqualink_primary}
            alt="AquaLink Logo"
            className="max-w-[55px] drop-shadow-verde-azul dark:drop-shadow-azul-primario drop-shadow-md"
          />
        </a>
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
              className="bg-white dark:bg-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="text-start">
            <Input
              type="password"
              placeholder="Senha"
              className="bg-white dark:bg-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="inline-flex justify-between w-90">
            <div className="inline-flex items-center gap-2">
              <Checkbox
                id={id}
                checked={remember}
                onCheckedChange={(checked) => setRemember(checked === true)}
              />
              <Label htmlFor={id}>Lembrar de mim</Label>
            </div>
            <p
              className="text-muted-foreground cursor-pointer hover:text-azul-quaternario transition-all duration-200 text-sm"
              onClick={handleForgotPassword}
            >
              Esqueceu a senha?
            </p>
          </div>
          <div className="relative mt-4">
            <Button
              type="submit"
              className="w-full bg-azul-primario py-2 rounded-lg hover:bg-azul-primario/80 transition duration-300 shadow-sm cursor-pointer dark:shadow-azul-secundario text-white"
            >
              Entrar
            </Button>
          </div>
        </form>
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-90 h-px my-4 bg-gray-200 border-0 dark:bg-gray-800" />
          <span className="absolute px-3 font-medium text-black -translate-x-1/2 left-1/2 dark:text-white dark:bg-primary bg-absolute-white rounded-2xl">
            Ou continue com
          </span>
        </div>
        <div className="grid grid-cols-2 gap-x-3 w-90">
          <button
            name="google"
            className="hover:bg-secondary active:bg-secondary/40 flex items-center justify-center rounded-lg border py-2.5 duration-150 bg-primary cursor-pointer gap-2 h-10"
            onClick={handleGoogleLogin}
          >
            <FaGoogle />
            <p>Google</p>
          </button>
          <button
            name="github"
            className="hover:bg-secondary active:bg-secondary/40 flex items-center justify-center rounded-lg border py-2.5 duration-150 bg-primary cursor-pointer gap-2 h-10"
            onClick={handleGithubLogin}
          >
            <FaGithub />
            <p>GitHub</p>
          </button>
        </div>
        <p className="text-sm text-muted-foreground mt-6">
          Não tem uma conta?{" "}
          <a
            href="/register"
            className="underline underline-offset-4 hover:text-azul-primario dark:hover:text-azul-quaternario transition-all duration-200"
          >
            Registre-se
          </a>
        </p>
        {alert && typeof alert === "object" && "type" in alert && (
          <LoginAlerts
            type={alert.type}
            message={alert.message}
            details={alert.details}
          />
        )}
      </div>
    </div>
  );
};

export { LoginUsers };
