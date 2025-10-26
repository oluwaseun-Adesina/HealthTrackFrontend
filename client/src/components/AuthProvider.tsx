import { createContext, useContext, useEffect } from "react";
import { useLocation } from "wouter";
import { setUnauthorizedHandler } from "@/lib/api";
import { logout } from "@/lib/auth";

const AuthContext = createContext<{}>({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleUnauthorized = () => {
      setTimeout(() => {
        logout();
        setLocation("/login");
      }, 500);
    };

    setUnauthorizedHandler(handleUnauthorized);

    return () => {
      setUnauthorizedHandler(null);
    };
  }, [setLocation]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
