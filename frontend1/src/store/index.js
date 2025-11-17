import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { userApi, setAuthToken } from "@/api";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    input: {
      name: "",
      email: "",
      password: "",
    },
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    user: null,
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      setAuthToken(null);
      state.isLoggedIn = false;
    },
    updateInput(state, action) {
      state.input = { ...state.input, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendRequest.pending, (state) => {
        (state.status = "loading"), (state.error = null);
      })
      .addCase(sendRequest.fulfilled, (state, action) => {
        state.status = "succeeded";
        // action.payload expected to be { user, token }
        state.user = action.payload?.user || null;
        state.isLoggedIn = true;
      })
      .addCase(sendRequest.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const sendRequest = createAsyncThunk(
  //name of thunk
  "auth/sendRequest",
  async ({ type, input }, { rejectWithValue }) => {
    try {
      if (!input?.email || !input?.password) {
        return rejectWithValue("Email or password missing");
      }
      // use userApi so instance headers and timeouts apply
      const res = await (type === "signup"
        ? userApi.signup({
          name: input.name,
          email: input.email,
          password: input.password,
        })
        : userApi.login({ email: input.email, password: input.password }));

      const data = res.data;
      // Validate response
      if (!data || !data.user) {
        return rejectWithValue("Response format is not proper");
      }
      // persist userId and token
      localStorage.setItem("userId", data.user._id);
      if (data.token) {
        localStorage.setItem("token", data.token);
        setAuthToken(data.token);
      }
      return { user: data.user, token: data.token };
    } catch (error) {
      return rejectWithValue(error.response?.data || error?.message);
    }
  }
);
export const authActions = authSlice.actions;
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
