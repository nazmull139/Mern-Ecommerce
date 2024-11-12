import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';



const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/products`,
        credentials: 'include'
    }),
    tagTypes: ["Products"],
    endpoints:(builder) => ({


        ///// ALL PRODUCTS /////
        fetchAllProducts: builder.query({
            query:({ category , color , minPrice , maxPrice , page = 1 , limit = 10 ,})=>{
                    const queryParams = new URLSearchParams({
                            category: category || '', 
                            color: color || '',
                            minPrice : minPrice || 0,
                            maxPrice : maxPrice || '',
                            page: page.toString(),
                            limit: limit.toString(),

                    }).toString();
                    return `/?${queryParams}`;
            },
            providesTags: ["Products"],
        }),

        //// SINGLE PRODUCTS ////

        fetchProductById: builder.query({
            query:(id) => `/${id}`,
            providesTags: (result , error , id)=>[{type : "Products", id}],
        }),


        ////// ADD PRODUCTS 

        AddProduct: builder.mutation({
            query : (newProduct) => ({
                url: "/create-product",
                method: "POST",
                body: newProduct,
                credentials: "include"

            }),
            invalidatesTags: ["Products"],
        }),

        /////////// RELATED PRODUCTS 

         fetchRelatedProducts: builder.query({
            query: (id) => `/related/${id}`
         }),

         //////// UPDATE PRODUCTS

         updateProduct: builder.mutation({
            query:({id , ...rest}) => ({
                url: `update-product/${id}`,
                method: "PATCH",
                body: rest,
                credentials: "include",
            }),
            invalidatesTags:["Products"],
         }),

         //////// DELETE PRODUCTS 

         deleteProduct: builder.mutation({
            query:(id) => ({
                url: `/${id}`,
                method: "DELETE",
               
                credentials: "include",
            }),
            invalidatesTags:(result , error , id) => [{type: "Products", id}],
         }),



    }),
});



export const {useFetchAllProductsQuery , useFetchProductByIdQuery , useAddProductMutation , useUpdateProductMutation , useDeleteProductMutation , useFetchRelatedProductsQuery} = productsApi ;

export default productsApi ;