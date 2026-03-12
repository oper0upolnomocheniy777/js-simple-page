import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginFormData } from '../types';

const isAuth = localStorage.getItem('isAuth') === 'true';

const initialState: AuthState = {
  isAuthenticated: isAuth,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginFormData>) => {
      const { username, password } = action.payload;
      
      if (username === 'Admin' && password === '12345') {
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem('isAuth', 'true');
      } else {
        state.error = 'Имя пользователя или пароль введены не верно';
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.error = null;
      localStorage.setItem('isAuth', 'false');
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;