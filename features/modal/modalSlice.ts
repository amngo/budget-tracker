import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  open: boolean;
  componentPath: string | null;
  componentProps: {};
}

const initialState: ModalState = {
  open: false,
  componentPath: null,
  componentProps: {},
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ path: string; props: {} }>) => {
      state.open = true;
      state.componentPath = action.payload.path;
      state.componentProps = action.payload.props;
    },
    closeModal: (state) => {
      state.open = false;
      state.componentPath = null;
      state.componentProps = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
