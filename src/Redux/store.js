import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import userReducer from './userSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    auth:authReducer
  },
});
export default store; 
