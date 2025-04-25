// context/AuthContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
  email: string;
  sub: string; // ID del usuario
  role?: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const login = (token: string) => {
    try {
      const decoded = jwtDecode<User>(token); // Decodifica el JWT
      setToken(token);
      setUser(decoded);
      localStorage.setItem('tokenK', token);
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      logout();
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('tokenK');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('tokenK');
    if (storedToken) {
      try {
        const decoded = jwtDecode<User>(storedToken);
        setToken(storedToken);
        setUser(decoded);
      } catch (error) {
        console.log(error)
        logout();
      }
    }
  }, []);

  const value: AuthContextType = {
    token,
    user,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};