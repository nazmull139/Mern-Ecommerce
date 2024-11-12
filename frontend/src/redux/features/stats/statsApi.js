import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';


const statsApi = createApi({
    reducerPath: "statsApi",
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseUrl()}/api/stats`,
        credentials: 'include',
    }),
    tagTypes: ["Stats"],
    endpoints: (builder) =>  ({
        getUserStats : builder.query({
            query:(email)=>({
                url:`/user-stats/${email}`,
                method: 'GET',
            }),
            providesTags: ["Stats"]
        }),
        getAdminStats : builder.query({
            query:()=>({
                url:`/admin-stats`,
                method: 'GET',
            }),
            providesTags: ["Stats"]
        }),

    })

})

export const {useGetAdminStatsQuery, useGetUserStatsQuery} = statsApi ;
export default statsApi;