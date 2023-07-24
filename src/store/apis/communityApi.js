import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
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
                providesTags: (result, error, params) => {
                    // return [{ type: 'articles', category: params.category || '전체' }]
                    return [{ type: 'articles' }]
                }
            }),
            createArticle: builder.mutation({
                query: (formData) => {
                    return {
                        url: '/community/',
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Authorization': axios.defaults.headers.common.Authorization,
                        },
                        formData: true,
                    }
                },
                invalidatesTags: (result, error) => {
                    // return [{ type: 'articles', category: '전체' }, { type: 'articles', category: result.category }]
                    return [{ type: 'articles' }]
                }
            }),
        }
    }
});

export { communityApi };
export const { 
    useFetchAllArticlesQuery,
    useCreateArticleMutation,
} = communityApi;