import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';


// query :  whn get method 
// mutation : when others method

const authApi = createApi({

    reducerPath: 'authAPi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/auth`,
        credentials: 'include'
    }),
    tagTypes: ["Users"], 

    endpoints: (builder) => ({


        registerUser: builder.mutation({
            query: (newUser) => ({
                url: "/register",
                method: "POST",
                body: newUser
            })
        }),

        verifyEmail:builder.mutation({
            query:({ code })=>({
                url:"/verify-email",
                method:"POST",
                body:{ code }
            }),
            invalidatesTags: ["Users"],
        }),


        loginUser: builder.mutation({
            query: (credentials) => ({
                url: "login",
                method: "POST",
                body: credentials

            })
        }),


        logoutUser : builder.mutation({
            query:()=>({
                url: '/logout',
                method: 'POST'

            })

        }), 


        getUsers: builder.query({
            query: () => ({
                url: "/users",
                method: 'GET'
            }),
            refetchOnMount: true,
            invalidatesTags: ["Users"],
        }),


        deleteUser: builder.mutation({
            query:(userId)=>({
                url:`/users/${userId}`,
                method: "DELETE"

            }),
            invalidatesTags: ['Users']
        }), 
        


        updateUserRole: builder.mutation({
            query:({userId,role})=>({
                url: `/users/${userId}`,
                method: 'PUT',
                body: {role}
            }),
            refetchOnMount: true,
            invalidatesTags: ['Users']
        }),


        editProfile: builder.mutation({
            query:({id , profileData })=>({
                url:`/edit-profile/${id}`,
                method:"PATCH",
                body: profileData
            })
        }),



    }),


});


export const{  useRegisterUserMutation , useLoginUserMutation , useLogoutUserMutation ,useGetUsersQuery , useDeleteUserMutation ,

    useUpdateUserRoleMutation , useEditProfileMutation , useVerifyEmailMutation } = authApi;

export default authApi;