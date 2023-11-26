"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import useFirebaseAuth from "@/hooks/firebase_auth/useFirebaseAuth";

interface defultValue {
  currentUserName: null | string;
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  setCurrentUserName: Dispatch<SetStateAction<string | null>>;
}

const AuthContext = createContext<defultValue>({
  currentUserName: null,
  isLogin: false,
  setIsLogin: () => {},
  setCurrentUserName: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUserName, setCurrentUserName] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(false);

  const contextValue: defultValue = {
    currentUserName,
    isLogin,
    setIsLogin,
    setCurrentUserName,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside of AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
