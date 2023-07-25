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
            fetchArticle: builder.query({
                query: (articleId) => {
                    return {
                        url: `/community/${articleId}/`,
                        method: 'GET',
                    };
                },
                providesTags: (result, error, articleId) => {
                    return [{ type: 'article', articleId }]
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
            editArticle: builder.mutation({
                query: ({articleId, formData}) => {
                    return {
                        url: `/community/${articleId}/`,
                        method: 'PUT',
                        body: formData,
                        headers: {
                            'Authorization': axios.defaults.headers.common.Authorization,
                        },
                        formData: true,
                    }
                },
                invalidatesTags: (result, error, {articleId}) => {
                    return [{ type: 'articles' }, { type: 'article', articleId }]
                }
            }),
            deleteArticle: builder.mutation({
                query: (articleId) => {
                    return {
                        url: `/community/${articleId}/`,
                        method: 'DELETE',
                        headers: {
                            'Authorization': axios.defaults.headers.common.Authorization,
                        },
                    }
                },
                invalidatesTags: (result, error, articleId) => {
                    return [{ type: 'articles' }]
                }
            }),
            createComment: builder.mutation({
                query: ({formData, articleId}) => {
                    return {
                        url: `/community/${articleId}/comments/`,
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Authorization': axios.defaults.headers.common.Authorization,
                        },
                        formData: true,
                    }
                },
                invalidatesTags: (result, error, {articleId}) => {
                    return [{ type: 'articles' }, { type: 'article', articleId }]
                }
            }),
            editComment: builder.mutation({
                query: ({formData, articleId, commentId}) => {
                    return {
                        url: `/community/${articleId}/comments/${commentId}/`,
                        method: 'PUT',
                        body: formData,
                        headers: {
                            'Authorization': axios.defaults.headers.common.Authorization,
                        },
                        formData: true,
                    }
                },
                invalidatesTags: (result, error, {articleId}) => {
                    return [{ type: 'article', articleId }]
                }
            }),
            deleteComment: builder.mutation({
                query: ({articleId, commentId}) => {
                    return {
                        url: `/community/${articleId}/comments/${commentId}/`,
                        method: 'DELETE',
                        headers: {
                            'Authorization': axios.defaults.headers.common.Authorization,
                        },
                    }
                },
                invalidatesTags: (result, error, {articleId}) => {
                    return [{ type: 'articles' }, { type: 'article', articleId }]
                }
            }),
            postLike: builder.mutation({
                query: (articleId) => {
                    return {
                        url: `/community/${articleId}/likes/`,
                        method: 'POST',
                        headers: {
                            'Authorization': axios.defaults.headers.common.Authorization,
                        },
                    }
                },
                invalidatesTags: (result, error, articleId) => {
                    return [{type: 'articles'}, { type: 'article', articleId }]
                }
            }),
        }
    }
});

export { communityApi };
export const { 
    useFetchAllArticlesQuery,
    useCreateArticleMutation,
    useFetchArticleQuery,
    useEditArticleMutation,
    useDeleteArticleMutation,
    useCreateCommentMutation,
    useEditCommentMutation,
    useDeleteCommentMutation,
    usePostLikeMutation,
} = communityApi;