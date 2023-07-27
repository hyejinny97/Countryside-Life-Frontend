import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const key = process.env.REACT_APP_KAKAO_REST_API_KEY;

const locationApi = createApi({
    reducerPath: 'location',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://dapi.kakao.com/v2/local',
        prepareHeaders: (headers) => {
            headers.set('Authorization', `KakaoAK ${key}`)
        }
    }),
    endpoints(builder) {
        return {
            getCoordFromAdd: builder.query({
                query: ({ query, page=1 }) => {
                    return {
                        url: '/search/address',
                        params: {
                            query,
                            page,
                            size: 5,
                        }
                    }
                }
            }),
            getAddFromCoord: builder.query({
                query: ({ latitude, longitude }) => {
                    return {
                        url: '/geo/coord2address',
                        params: {
                            x: longitude,
                            y: latitude,
                        }
                    }
                }
            }),
        }
    }
});

export { locationApi };
export const { 
    useGetCoordFromAddQuery,
    useGetAddFromCoordQuery,
} = locationApi;