"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

import { onAuthStateChanged, getAuth } from "firebase/auth";
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

function AuthProvider({ children }: { children: React.ReactNode }) {
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
          console.log(user);
        } else {
          setIsLogin(false);
          setUser(null);
          setCurrentUserName(null);
          console.log("context is processing: " + "no user");
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

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside of AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
