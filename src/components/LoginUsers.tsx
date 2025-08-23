import { FaGithub, FaGoogle } from "react-icons/fa6";
import { Input } from "./ui/input";
import { logo_no_writing_aqualink_primary } from "@/assets";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/config/firebase";

const LoginUsers = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully"); // Caso de sucesso, onde usuário e senha são válidos
    } catch (error) {
      console.error("Error logging in:", error); // Caso de erro (não específico)
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider(); // Cria uma nova instância do provedor Google
    try {
      await signInWithPopup(auth, provider); // Abre um popup para o usuário fazer login com a conta Google
      console.log("User logged in successfully with Google");
    } catch (error) {
      // Usamos 'FirebaseError' para ter acesso a propriedades específicas de erro do Firebase Auth
      console.error("Error logging in with Google:", error);
      if ((error as import("firebase/app").FirebaseError).code === "auth/popup-closed-by-user") {
        console.log("Popup fechado pelo usuário.");
      } else if ((error as import("firebase/app").FirebaseError).code === "auth/cancelled-popup-request") {
        console.log(
          "Requisição de popup cancelada."
        );
      }
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-100px)] w-full overflow-hidden items-center content-center max-h-200">
      <div className="w-full space-y-4 text-center content-center flex items-center justify-center flex-col">
        <img
          src={logo_no_writing_aqualink_primary}
          alt="AquaLink Logo"
          className="max-w-[55px] mb-4"
        />
        <h1 className="text-4xl font-bold">Login</h1>
        <p className="text-muted-foreground">
          Faça login para acessar sua conta AquaLink
        </p>
        <div className="grid grid-cols-2 gap-x-3 w-90">
          <button className="hover:bg-secondary active:bg-secondary/40 flex items-center justify-center rounded-lg border py-2.5 duration-150 bg-white cursor-pointer">
            <FaGithub />
          </button>
          <button className="hover:bg-secondary active:bg-secondary/40 flex items-center justify-center rounded-lg border py-2.5 duration-150 bg-white cursor-pointer" onClick={handleGoogleLogin}>
            <FaGoogle />
          </button>
        </div>
        <div className="relative w-90">
          <span className="bg-secondary block h-px w-full"></span>
          <p className="absolute inset-x-0 -top-2 mx-auto inline-block w-fit px-2 text-sm">
            {" "}
            Ou continue com{" "}
          </p>
        </div>
        <form className="w-90 gap-4 space-y-4" onSubmit={handleLogin}>
          <div className="text-start">
            <label className="font-medium">Email</label>
            <Input
              type="email"
              placeholder="Email"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="relative mt-8">
            <button
              type="submit"
              className="w-full bg-azul-primario text-white py-2 rounded-lg hover:bg-azul-primario/80 transition duration-300 shadow-md"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { LoginUsers };
