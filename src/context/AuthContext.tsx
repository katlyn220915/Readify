"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import useFirebaseAuth from "@/hooks/firebase_auth/useFirebaseAuth";
import app from "@/lib/firebase/initialize";

interface AuthContextValue {
  currentUserName: null | string;
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  setCurrentUserName: Dispatch<SetStateAction<string | null>>;
  pending: boolean;
  user: any;
  logout: () => void;
  login: (user: any) => void;
}

const AuthContext = createContext<AuthContextValue>({
  currentUserName: null,
  isLogin: false,
  setIsLogin: () => {},
  setCurrentUserName: () => {},
  pending: false,
  user: null,
  logout: () => {},
  login: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = getAuth(app);
  const firebaseAuth = useFirebaseAuth();

  const [currentUserName, setCurrentUserName] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(false);
  const [pending, setPending] = useState(true);
  const [user, setUser] = useState<any>(null);

  function logout() {
    try {
      firebaseAuth.userSignout();
      setIsLogin(false);
      setUser(null);
      setCurrentUserName(null);
    } catch (e) {
      console.error(e);
    }
  }

  function login(user: any) {
    setIsLogin(true);
    setUser(user);
    setCurrentUserName(user.displayName);
  }

  useEffect(() => {
    setPending(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
        setUser(user);
        setCurrentUserName(user.displayName);
      } else {
        setIsLogin(false);
        setUser(null);
        setCurrentUserName(null);
      }
      setPending(false);
    });

    return () => unsubscribe();
  }, []);

  const contextValue: AuthContextValue = {
    currentUserName,
    isLogin,
    setIsLogin,
    setCurrentUserName,
    pending,
    user,
    logout,
    login,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
}
