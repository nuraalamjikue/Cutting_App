import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  user: {
    employeeCode: string;
    employeeName: string;
    userID: number;
    token: string;
  } | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        employeeCode: string;
        employeeName: string;
        userID: number;
        token: string;
      }>,
    ) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: () => initialState, // Reset state to initial values on logout
  },
});

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;
