import { configureStore } from '@reduxjs/toolkit'
import authApi from './features/auth/authApi'
import authReducer from "./features/auth/authSlice"
import cartReducer from "./features/cart/cartSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [authApi.reducerPath] : authApi.reducer,
    auth: authReducer,
  },
    
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware)
})