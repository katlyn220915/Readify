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

import app from "@/lib/firebase/initialize";

interface defultValue {
  currentUserName: null | string;
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  setCurrentUserName: Dispatch<SetStateAction<string | null>>;
  pending: boolean;
  user: any;
}

const AuthContext = createContext<defultValue>({
  currentUserName: null,
  isLogin: false,
  setIsLogin: () => {},
  setCurrentUserName: () => {},
  pending: false,
  user: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUserName, setCurrentUserName] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(false);
  const [pending, setPending] = useState(true);
  const [user, setUser] = useState<any>();
  const auth = getAuth(app);

  useEffect(() => {
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLogin(true);
          setUser(user);
          setCurrentUserName(user.displayName);
        } else {
          setIsLogin(false);
          setUser(null);
          setCurrentUserName(null);
        }
      });
    } catch (e) {
      console.error(e);
    } finally {
      setPending(false);
    }
  }, [isLogin, auth]);

  const contextValue: defultValue = {
    currentUserName,
    isLogin,
    setIsLogin,
    setCurrentUserName,
    pending,
    user,
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
