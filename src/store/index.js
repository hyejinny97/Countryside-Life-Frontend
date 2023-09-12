import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userReducer } from "@store/slices/userSlice";
import { toastReducer } from "@store/slices/toastSlice";
import { messageModalReducer } from "@store/slices/messageModalSlice";
import { communityApi } from "@store/apis/communityApi";
import { locationApi } from "@store/apis/locationApi";

const store = configureStore({
  reducer: {
    user: userReducer,
    toast: toastReducer,
    messageModal: messageModalReducer,
    [communityApi.reducerPath]: communityApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(communityApi.middleware)
      .concat(locationApi.middleware);
  },
});

setupListeners(store.dispatch);

export { store };
export {
  setUserInfo,
  resetUserInfo,
  updateUserInfo,
} from "@store/slices/userSlice";
export { runToast } from "@store/slices/toastSlice";
export {
  disappearMessageModal,
  appearMessageModal,
} from "@store/slices/messageModalSlice";
export {
  communityApi,
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
} from "@store/apis/communityApi";
export {
  locationApi,
  useGetCoordFromAddQuery,
  useGetAddFromCoordQuery,
} from "@store/apis/locationApi";
