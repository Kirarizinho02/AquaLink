import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/config/firebase";

// Para criar uma rota acessível somente a usuários logados, criamos o componente ProtectedRoute
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => { // Verifica se o usuário está autenticado
    const unsubscribe = auth.onAuthStateChanged((user) => { 
      if (!user) {
        navigate("/login");
      } // Se o usuário não estiver autenticado, redireciona para a página de login
    });
    return () => unsubscribe();
  }, [navigate]); // O efeito depende da função de navegação

  return <>{children}</>;
};