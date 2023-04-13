export interface IUser {
  _id: string;
  email: string;
  password: string;
  name: string;
  role: string;
}

// REDUCER STATE
export interface IState {
  user: IUser | null;
  error: Error | null;
  status: 'loading' | 'success' | 'error' | 'idle';
}

// REDUCER ACTION TYPES
export type ACTIONTYPE =
  | { type: 'SET_LOADING' }
  | { type: 'SET_USER'; payload: IUser }
  | { type: 'SET_ERROR'; payload: Error | null }
  | { type: 'RESET' };
