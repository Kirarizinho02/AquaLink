import { createContext, useEffect, useState } from "react";
import { ref, set } from "firebase/database";
import { db, auth } from "@/config/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  type User,
} from "firebase/auth";

import type { UserCredential } from "firebase/auth";

interface AuthContextType {
  login: (
    email: string,
    password: string,
    remember: boolean
  ) => Promise<UserCredential>;
  loginWithGoogle: (remember: boolean) => Promise<UserCredential>;
  loginWithGithub: (remember: boolean) => Promise<UserCredential>;
  user: User | null;
  logout: () => Promise<void>;
    register: (
    data: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      height: string;
      date: string;
      gender: string;
    }
  ) => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub;
  }, []);

  const login = async (email: string, password: string, remember: boolean) => {
    await setPersistence(
      auth,
      remember ? browserLocalPersistence : browserSessionPersistence
    );
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async (remember: boolean) => {
    await setPersistence(
      auth,
      remember ? browserLocalPersistence : browserSessionPersistence
    );
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const loginWithGithub = async (remember: boolean) => {
    await setPersistence(
      auth,
      remember ? browserLocalPersistence : browserSessionPersistence
    );
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

const register = async (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  height: string;
  date: string;
  gender: string;
  connectedBottle?: string;
}) => {
  // Cria usuário autenticado
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );
  // Atualiza o nome do usuário no perfil do Auth
  await updateProfile(userCredential.user, {
    displayName: `${data.firstName} ${data.lastName}`,
  });
  // Salva dados no Realtime Database
  await set(ref(db, `users/${userCredential.user.uid}`), {
    uid: userCredential.user.uid,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    height: data.height,
    date: data.date,
    gender: data.gender,
    connectedBottle: data.connectedBottle || null,
    createdAt: new Date().toISOString(),
  });
};

  const logout = () => auth.signOut();

  return (
    <AuthContext.Provider
      value={{ login, loginWithGoogle, loginWithGithub, user, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
