import { createContext, ReactNode, useEffect } from 'react';
import { useProvideAuth } from '../features/authentication';
import { IUser } from '../features/authentication/types';
import { storage } from '../utils';

interface IProps {
  children?: ReactNode;
}

interface IAuthContext {
  signIn: (email: string, password: string) => Promise<void | IUser>;

  signUp: (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) => Promise<void | IUser>;
  getUser(token: string): Promise<void>;

  status: string;
  error: Error | null;
  user: IUser | null;
}

export const AuthContext = createContext<IAuthContext | null>(null);
AuthContext.displayName = 'AuthContext';

function AuthProvider({ children }: IProps) {
  const value = useProvideAuth();
  // get token here with useEffect
  useEffect(() => {
    const token = storage.getItem('token');
    if (token) {
      value.getUser(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
