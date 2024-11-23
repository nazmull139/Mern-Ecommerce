{/*   import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';



const productsApi = createApi({
    reducerPath: 'couponApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/coupon`,
        credentials: 'include'
    }),
    tagTypes: ["Coupon"],
    endpoints:(builder) => ({



        ////// ADD PRODUCTS 

        createCoupon: builder.mutation({
            query : (newCoupon) => ({
                url: "/create-coupon",
                method: "POST",
                body: newCoupon,
                credentials: "include"

            }),
            invalidatesTags: ["Coupon"],
        }),
        
        */}

 import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';

const couponApi = createApi({
    reducerPath: 'couponApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/coupon`,// Replace with your backend URL
        credentials: 'include', // Include credentials if needed
    }),
    tagTypes: ['Coupons'],
    endpoints: (builder) => ({
        ////// CREATE COUPON //////
        createCoupon: builder.mutation({
            query: (newCoupon) => ({
                url: '/create-coupon',
                method: 'POST',
                body: newCoupon,
            }),
            invalidatesTags: ['Coupons'],
        }),

        ////// VALIDATE COUPON //////
        validateCoupon: builder.query({
            query: (code) => ({
                url: '/validate',
                method: 'POST',
                body: { code },
            }),
        }),

        ////// USE COUPON //////
        useCoupon: builder.mutation({
            query: ({code}) => ({
                url: '/use',
                method: 'PATCH',
                body: { code },
            }),
            invalidatesTags: ['Coupons'],
        }),
    }),
});

export const {
    useCreateCouponMutation,
    useValidateCouponQuery,
    useUseCouponMutation,
} = couponApi;

export default couponApi;
