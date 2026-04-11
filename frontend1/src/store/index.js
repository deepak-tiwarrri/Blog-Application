import {
  createAsyncThunk,
  createSlice
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
    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendRequest.pending, (state) => {
        (state.status = "loading"), (state.error = null);
      })
      .addCase(sendRequest.fulfilled, (state, action) => {
        state.status = "succeeded";
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

      const res_data = res.data;
      console.log("----response data: send request:", res_data);

      // Response structure: { success, message, data: { user, accessToken, refreshToken }, timestamp }
      const data = res_data.data;
      
      // Validate response
      if (!data || !data.user) {
        console.error("User data missing in response:", res_data);
        return rejectWithValue("Response format is not proper");
      }
      
      // Extract user and tokens from nested data
      const user = data.user;
      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;
      
      console.log("----extracted user:", user);
      console.log("----extracted tokens:", { accessToken: !!accessToken, refreshToken: !!refreshToken });
      
      // persist userId and tokens
      localStorage.setItem("userId", user._id);
      if (accessToken) {
        localStorage.setItem("token", accessToken);
        setAuthToken(accessToken);
      }
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }
      
      return { user, token: accessToken };
    } catch (error) {
      console.log('----error send request - response:', error?.response?.data);
      console.log('----error send request - message:', error?.message);
      console.log('----error send request - full error:', error);
      return rejectWithValue(error.response?.data || error?.message);
    }
  }
);
export const authActions = authSlice.actions;
export const { logout, updateInput, updateUser, login } = authSlice.actions;

export default authSlice.reducer; 