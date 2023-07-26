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
                    const tags = result?.results?.map(rst => {
                        return { type: 'article', id: rst.id }
                    }) || [{ type: 'article', id: 'NoData' }];
                    
                    if (params.category) tags.push({ type: 'category', id: params.category });
                    else if (params.search) tags.push({ type: 'search' });
                    else tags.push({ type: 'category', id: '전체' });
                    
                    return tags;
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
                    return [{ type: 'article', id: articleId }]
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
                    return [
                        { type: 'category', id: '전체' }, 
                        { type: 'category', id: result.category },
                        { type: 'search' }, 
                        { type: 'article', id: 'NoData' }, 
                        { type: 'userArticle' }
                    ]
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
                    return [{ type: 'article', id: articleId }]
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
                    return [{ type: 'article', id: articleId }]
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
                    return [
                        { type: 'article', id: articleId }, 
                        { type: 'userComment' }
                    ]
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
                    return [{ type: 'article', id: articleId }]
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
                    return [{ type: 'article', id: articleId }]
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
                    return [{ type: 'article', id: articleId }, { type: 'userLike' }]
                }
            }),
            fetchUserArticles: builder.query({
                query: ({accessToken, page=1}) => {
                    return {
                        url: '/community/user',
                        method: 'GET',
                        headers: {
                            // 'Authorization': axios.defaults.headers.common.Authorization,
                            'Authorization': accessToken,
                        },
                        params: {
                            page
                        },
                    }
                },
                providesTags: (result, error) => {
                    const tags = result?.results?.map(rst => {
                        return { type: 'article', id: rst.id }
                    }) || [{ type: 'article', id: 'NoData' }];
                    tags.push({ type: 'userArticle' })

                    return tags;
                }
            }),
            fetchUserComments: builder.query({
                query: ({accessToken, page=1}) => {
                    return {
                        url: '/community/comments/user',
                        method: 'GET',
                        headers: {
                            'Authorization': accessToken,
                        },
                        params: {
                            page
                        },
                    }
                },
                providesTags: (result, error) => {
                    const tags = result?.results?.map(rst => {
                        return { type: 'article', id: rst.id }
                    }) || [{ type: 'article', id: 'NoData' }];
                    tags.push({ type: 'userComment' })

                    return tags;
                }
            }),
            fetchUserLikes: builder.query({
                query: ({accessToken, page=1}) => {
                    return {
                        url: '/community/likes/user',
                        method: 'GET',
                        headers: {
                            'Authorization': accessToken,
                        },
                        params: {
                            page
                        },
                    }
                },
                providesTags: (result, error) => {
                    const tags = result?.results?.map(rst => {
                        return { type: 'article', id: rst.id }
                    }) || [{ type: 'article', id: 'NoData' }];
                    tags.push({ type: 'userLike' })

                    return tags;
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
    useFetchUserArticlesQuery,
    useFetchUserCommentsQuery,
    useFetchUserLikesQuery,
} = communityApi;