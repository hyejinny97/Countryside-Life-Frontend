import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_API_URL;

const communityApi = createApi({
    reducerPath: 'community',
    baseQuery: fetchBaseQuery({
        baseUrl,
    }),
    endpoints(builder) {
        return {
            fetchAllArticles: builder.query({
                query: (params) => {
                    return {
                        url: '/community/',
                        params,
                        method: 'GET',
                    };
                },
            })
        }
    }
});

export { communityApi };
export const { 
    useFetchAllArticlesQuery,
} = communityApi;