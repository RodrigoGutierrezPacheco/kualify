// context/AuthContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
  email: string;
  id: string | { id: string };
  role: 'user' | 'professional' | 'admin';
  exp: number;
  iat: number;
}

interface NormalizedUser {
  email: string;
  id: string;
  role: 'user' | 'professional' | 'admin';
}

interface AuthContextType {
  token: string | null;
  user: NormalizedUser | null;
  userId: string | null; // Nueva propiedad para el ID directo
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [rawUser, setRawUser] = useState<User | null>(null);

  // Normaliza el usuario y extrae el ID
  const normalizeUser = (user: User | null): { normalizedUser: NormalizedUser | null, userId: string | null } => {
    if (!user) return { normalizedUser: null, userId: null };

    const userId = typeof user.id === 'object' ? user.id.id : user.id;
    return {
      normalizedUser: {
        ...user,
        id: userId
      },
      userId
    };
  };

  const { normalizedUser: user, userId } = useMemo(() => normalizeUser(rawUser), [rawUser]);

  const login = (token: string) => {
    try {
      const decoded = jwtDecode<User>(token);
      setToken(token);
      setRawUser(decoded);
      localStorage.setItem('tokenK', token);
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      logout();
    }
  };

  const logout = () => {
    setToken(null);
    setRawUser(null);
    localStorage.removeItem('tokenK');
    window.location.href = "/";
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('tokenK');
    if (storedToken) {
      try {
        const decoded = jwtDecode<User>(storedToken);
        const currentTime = Date.now() / 1000;
        
        if (decoded.exp && currentTime > decoded.exp) {
          logout(); // Token expirado
          return;
        }
  
        setToken(storedToken);
        setRawUser(decoded);
      } catch (error) {
        console.error("Error al decodificar el token almacenado:", error);
        logout();
      }
    }
  }, []);

  const value: AuthContextType = {
    token,
    user,
    userId,
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