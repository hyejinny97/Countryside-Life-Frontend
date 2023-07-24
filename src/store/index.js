import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userReducer } from '@store/slices/userSlice';
import { toastReducer } from '@store/slices/toastSlice';
import { communityApi } from '@store/apis/communityApi';

const store = configureStore({
    reducer: {
        user: userReducer,
        toast: toastReducer,
        [communityApi.reducerPath]: communityApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(communityApi.middleware);
    }
});

setupListeners(store.dispatch);

export { store };
export { setUserInfo, resetUserInfo, updateUserInfo } from '@store/slices/userSlice';
export { runToast } from '@store/slices/toastSlice';
export { 
    communityApi, 
    useFetchAllArticlesQuery, 
    useCreateArticleMutation,
    useFetchArticleQuery,
    useEditArticleMutation,
    useDeleteArticleMutation,
} from '@store/apis/communityApi';
