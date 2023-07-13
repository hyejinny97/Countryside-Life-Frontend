import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';
import { toastReducer } from './slices/toastSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        toast: toastReducer,
    }
});

export { store };
export { setUserInfo, resetUserInfo, updateUserInfo } from './slices/userSlice';
export { runToast } from './slices/toastSlice';