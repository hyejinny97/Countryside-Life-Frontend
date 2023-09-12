import { createSlice } from "@reduxjs/toolkit";

const messageModalSlice = createSlice({
  name: "messageModal",
  initialState: {
    show: false,
  },
  reducers: {
    disappearMessageModal(state, action) {
      state.show = false;
    },
    appearMessageModal(state, action) {
      state.show = true;
    },
  },
});

export const messageModalReducer = messageModalSlice.reducer;
export const { disappearMessageModal, appearMessageModal } =
  messageModalSlice.actions;
