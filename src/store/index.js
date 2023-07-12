import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
    }
});

export { store };
export { setUserInfo, resetUserInfo } from './slices/userSlice';