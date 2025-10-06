import { toast } from "../redux/toasts.slice";

export const errorHandler = (error, thunkAPI, showToast = true) => {
  const errorMessage =
    error?.response?.data?.message || error.message || "An error occured";
  if (showToast) {
    thunkAPI.dispatch(toast({ message: errorMessage, severity: "error" }));
  }
  return thunkAPI.rejectWithValue(errorMessage);
};
