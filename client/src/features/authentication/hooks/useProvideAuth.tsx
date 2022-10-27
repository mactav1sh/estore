import { AxiosError } from 'axios';
import { useReducer } from 'react';
import axios from '../../../lib/axios';
import storage from '../../../utils/storage';
import { IUser, IState, ACTIONTYPE } from '../types';

// REDUCER
const authReducer = (state: IState, action: ACTIONTYPE): IState => {
  switch (action.type) {
    case 'SET_USER':
      return { status: 'success', user: action.payload, error: null };

    case 'SET_LOADING':
      return { status: 'loading', user: null, error: null };

    case 'SET_ERROR':
      return {
        status: 'error',
        user: null,
        error: action.payload,
      };

    case 'RESET':
      return {
        status: 'idle',
        user: null,
        error: null,
      };

    default:
      throw new Error(`invalid action`);
  }
};

// HOOK
function useProvideAuth() {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    error: null,
    status: 'idle',
  });

  // SIGN IN
  async function signIn(
    email: string,
    password: string
  ): Promise<void | IUser> {
    dispatch({ type: 'SET_LOADING' });

    try {
      const response = await axios.post('/users/sign-in', {
        email,
        password,
      });

      if (response.statusText === 'OK') {
        dispatch({ type: 'SET_USER', payload: response.data.user });

        // Get token from headers
        const token = response.headers.authorization?.replace(
          'Bearer ',
          ''
        ) as string;

        // Add token to local storage
        storage.setItem('token', token);

        return response.data.user;
      }
    } catch (error) {
      const axiosError = error as AxiosError;

      dispatch({
        type: 'SET_ERROR',
        payload: axiosError.response?.data as Error,
      });
    }
  }
  // REGISTER
  async function signUp(
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ): Promise<void | IUser> {
    dispatch({ type: 'SET_LOADING' });

    try {
      const response = await axios.post('/users/sign-up', {
        name,
        email,
        password,
        passwordConfirm,
      });

      if (response.statusText === 'Created') {
        dispatch({ type: 'SET_USER', payload: response.data.user });

        // Get token from headers
        const token = response.headers.authorization?.replace(
          'Bearer ',
          ''
        ) as string;

        // Add token to local storage
        storage.setItem('token', token);

        return response.data.user;
      }
    } catch (error) {
      const axiosError = error as AxiosError;

      dispatch({
        type: 'SET_ERROR',
        payload: axiosError.response?.data as Error,
      });
    }
  }

  // // TODO: IMPLEMENT AFTER REGISTRATION
  // // GET USER FROM STORAGE
  // async function getUser() {
  //   let user: IUser;
  //   // get token from storage
  //   const token = storage.getItem('token');
  //   try {
  //     if (token) {
  //       // get user from api
  //       const response = await axios.get(`/users/profile` /*TODO:ADD HEADERS*/);
  //       console.log(response);
  //     }
  //   } catch (error) {
  //     const axiosError = error as AxiosError;
  //     dispatch({
  //       type: 'SET_ERROR',
  //       payload: axiosError.response?.data as Error,
  //     });
  //   }
  // }

  return { signIn, signUp, ...state };
}

export { useProvideAuth };
