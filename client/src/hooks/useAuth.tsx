import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(`useAuth hook must be used within auth provider`);
  }

  return context;
}
