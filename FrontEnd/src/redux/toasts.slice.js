import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toasts: [],
};

const toastsSlice = createSlice({
  name: "toasts",
  initialState,
  reducers: {
    toast: (state, action) => {
      let { message, severity } = action.payload;
      if (!severity) {
        severity = "info";
      }
      state.toasts = [
        ...state.toasts,
        { message, severity, key: new Date().getTime() },
      ];
    },
    setToasts: (state, action) => {
      state.toasts = action.payload;
    },
  },
});

export const { toast, setToasts } = toastsSlice.actions;

export default toastsSlice.reducer;
