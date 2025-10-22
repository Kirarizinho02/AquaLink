import { createContext, useEffect, useState } from "react";
import { auth, firestore } from "@/config/firebase";
import { doc, setDoc } from "firebase/firestore";
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
      weight: string;         
      birthdate: string;      
      gender: string;
      connectedBottle?: string;
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
    weight: string;
    birthdate: string;
    gender: string;
    connectedBottle?: string;
  }) => {
    // Cria usuário no Auth
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    await updateProfile(userCredential.user, {
      displayName: `${data.firstName} ${data.lastName}`,
    });
    
    const payload = {
      birthdate: data.birthdate,
      connectedBottle: data.connectedBottle ?? null,
      email: data.email,
      gender: data.gender,
      height: data.height,
      name: data.firstName,
      weight: data.weight,
      lastName: data.lastName,                    
    };

    await setDoc(doc(firestore, "users", userCredential.user.uid), payload);
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
