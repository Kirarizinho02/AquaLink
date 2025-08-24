import { useEffect, useState } from "react";
import { auth } from "@/config/firebase";

const Dashboard = () => {
  const [user, setUser] = useState<{ displayName?: string; email?: string } | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          displayName: firebaseUser.displayName ?? "Usuário",
          email: firebaseUser.email ?? "Email não disponível",
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Você não está logado.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        <strong>Nome:</strong> {user.displayName}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  );
};

export { Dashboard  };