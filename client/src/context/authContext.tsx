import { createContext, ReactNode } from 'react';
import { useProvideAuth } from '../features/authentication';
import { IUser } from '../features/authentication/types';

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

  status: string;
  error: Error | null;
  user: IUser | null;
}

export const AuthContext = createContext<IAuthContext | null>(null);
AuthContext.displayName = 'AuthContext';

function AuthProvider({ children }: IProps) {
  const value = useProvideAuth();

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
