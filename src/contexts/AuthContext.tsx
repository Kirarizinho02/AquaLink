import { createContext } from "react";
import { auth } from "@/config/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";

import type { UserCredential } from "firebase/auth";

interface AuthContextType {
  login: (email: string, password: string) => Promise<UserCredential>;
  loginWithGoogle: () => Promise<UserCredential>;
  loginWithGithub: () => Promise<UserCredential>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const login = (email: string, password: string) => 
    signInWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const loginWithGithub = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

  return (
    <AuthContext.Provider value={{ login, loginWithGoogle, loginWithGithub }}>
      {children}
    </AuthContext.Provider>
  );
};

