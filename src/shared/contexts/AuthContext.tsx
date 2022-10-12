import { createContext, FC, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthService } from '../services/auth/auth.service';

interface IAuthContextData {
  isAuthenticated: boolean,
  login: (email: string, password: string) => Promise<string | void>,
  logout: () => void,
}

const AuthContext = createContext({} as IAuthContextData);

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const token = localStorage.getItem('TOKEN');

    if (token) setToken(JSON.parse(token));
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth(email, password);

    if (result instanceof Error) return result.message;

    localStorage.setItem('TOKEN', JSON.stringify(result.token));

    setToken(result.token);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('TOKEN');

    setToken(undefined);
  }, []);

  const isAuthenticated = useMemo(() => !!token, [token]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);