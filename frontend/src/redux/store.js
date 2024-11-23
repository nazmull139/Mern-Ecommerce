import { configureStore } from '@reduxjs/toolkit'
import authApi from './features/auth/authApi'
import authReducer from "./features/auth/authSlice"
import cartReducer from "./features/cart/cartSlice"
import couponApi from './features/coupon/couponApi'
import orderApi from './features/orders/orderApi'
import productsApi from './features/products/productsApi'
import reviewApi from './features/reviews/reviewsApi'
import statsApi from './features/stats/statsApi'


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [authApi.reducerPath] : authApi.reducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [reviewApi.reducerPath] : reviewApi.reducer,
   [orderApi.reducerPath] : orderApi.reducer,
   [statsApi.reducerPath] : statsApi.reducer,
   [couponApi.reducerPath] : couponApi.reducer,
  },
    
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,productsApi.middleware , reviewApi.middleware , orderApi.middleware , statsApi.middleware , couponApi.middleware  ),
})