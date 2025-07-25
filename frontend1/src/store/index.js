import { USER_URL } from "@/components/utils";
import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: true,
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
        state.user = action.payload;
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
      const res = await axios.post(`${USER_URL}/${type}`, {
        name: type === "signup" ? input.name : undefined,
        email: input.email,
        password: input.password,
      });
      const data = res.data;
      console.log(data);
      // Validate response
      if (!res.data || !res.data.user) {
        return rejectWithValue("Response format is not proper");
      }
      localStorage.setItem("userId", data.user._id);
      return data.user;
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
