import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "../services/auth.services";
import { errorHandler } from "../utils/errorHandler";

const initialState = {
  user: null,
  tokens: null,
  status: "idle",
  error: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      const response = await authServices.register(formData);
      return response;
    } catch (error) {
      return errorHandler(error, thunkAPI);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const response = await authServices.login(formData);

      return response;
    } catch (error) {
      return errorHandler(error, thunkAPI);
    }
  }
);

export const sendEmailVerification = createAsyncThunk(
  "auth/sendEmailVerification",
  async (args, thunkAPI) => {
    try {
      const response = await authServices.sendEmailVerification();
      return response;
    } catch (error) {
      return errorHandler(error, thunkAPI);
    }
  }
);
//sendPasswordToUser
export const sendPasswordToUser = createAsyncThunk(
  "auth/sendPasswordToUser",
  async (args, thunkAPI) => {
    try {
      const response = await authServices.sendPasswordToUser();
      return response;
    } catch (error) {
      return errorHandler(error, thunkAPI);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verify",
  async (token, thunkAPI) => {
    try {
      const response = await authServices.verifyEmail(token);
      return response;
    } catch (error) {
      return errorHandler(error, thunkAPI);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgot_password",
  async (formData, thunkAPI) => {
    try {
      const response = await authServices.forgotPassword(formData);
      return response;
    } catch (error) {
      return errorHandler(error, thunkAPI);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/reset_password",
  async (formData, thunkAPI) => {
    try {
      console.log(formData.token);
      const response = await authServices.resetPassword(
        formData.password,
        formData.token
      );
      return response;
    } catch (error) {
      return errorHandler(error, thunkAPI);
    }
  }
);
export const getUser = createAsyncThunk(
  "auth/getUser",
  async (args, thunkAPI) => {
    try {
      return await authServices.me();
    } catch (error) {
      return errorHandler(error, thunkAPI);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = "idle";
      state.error = null;
    },
    logout: (state) => initialState,
    setAdmin: (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.tokens = action.payload.tokens;
        state.status = "success";
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload.user;
        state.tokens = action.payload.tokens;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload;
      });
    //    .addCase(getUser.pending, (state) => {
    //   state.statusGetUser = REQUEST_STATUS.loading;
    // })
    //    .addCase(getUser.fulfilled, (state, action) => {
    //   state.statusGetUser = REQUEST_STATUS.success;
    //   state.user = action.payload;
    // })
    //    .addCase(getUser.rejected, (state, action) => {
    //   state.statusGetUser = REQUEST_STATUS.error;
    //   state.error = action.payload;
    // });
  },
});

export const { reset, logout, setAdmin } = authSlice.actions;

export default authSlice.reducer;
