import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
    name: 'toast',
    initialState: {
        cnt: 0,
        toastContent: '',
    },
    reducers: {
        runToast(state, action) {
            state.cnt += 1;
            state.toastContent = action.payload;
        },
    }
})

export const toastReducer = toastSlice.reducer;
export const { runToast } = toastSlice.actions;