import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: -1,
        // username: '',
        nickname: '',
        profileImage: '',
        // accessToken: '',
    },
    reducers: {
        setUserInfo(state, action) {
            state.id = action.payload.id;
            state.nickname = action.payload.nickname;
            state.profileImage = action.payload.profileImage || '';
        },
        resetUserInfo(state, action) {
            state.id = '';
            state.nickname = '';
            state.profileImage = '';
        },
    },
    extraReducers(builder) {

    } 
});

export const userReducer = userSlice.reducer;
export const { setUserInfo, resetUserInfo } = userSlice.actions;