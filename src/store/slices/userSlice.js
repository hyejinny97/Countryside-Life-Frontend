import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: -1,
        username: '',
        nickname: '',
        profileImage: '',
        // accessToken: '',
    },
    reducers: {
        setUserInfo(state, action) {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.nickname = action.payload.nickname;
            state.profileImage = action.payload.image || '';
        },
        resetUserInfo(state, action) {
            state.id = -1;
            state.username = '';
            state.nickname = '';
            state.profileImage = '';
        },
        updateUserInfo(state, action) {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.nickname = action.payload.nickname;
            state.profileImage = action.payload.image || '';
        },
    },
    extraReducers(builder) {

    } 
});

export const userReducer = userSlice.reducer;
export const { setUserInfo, resetUserInfo, updateUserInfo } = userSlice.actions;