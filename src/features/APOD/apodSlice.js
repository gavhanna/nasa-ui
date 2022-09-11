import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apodService from "./apodService";

const initialState = {
  apod: {},
  apodArchive: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const handleError = (err) => {
  const message =
    (err.response && err.response.data && err.response.data.message) ||
    "Something went wrong";

  toast.error(message, {
    theme: "colored",
  });
  return message;
};

export const fetchApod = createAsyncThunk(
  "apod/fetchApod",
  async (selectedDate, thunkAPI) => {
    try {
      return await apodService.fetchApod(selectedDate);
    } catch (err) {
      const message = handleError(err);
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

export const fetchArchiveItems = createAsyncThunk(
  "apod/fetchArchiveItems",

  async ({ startDate, endDate }, thunkAPI) => {
    try {
      return await apodService.fetchArchiveItems({ startDate, endDate });
    } catch (err) {
      const message = handleError(err);
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

export const apodSlice = createSlice({
  name: "apod",
  initialState,
  reducers: {
    reset: (state) => {
      state.apod = {};
      state.apodArchive = [];
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApod.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchApod.fulfilled, (state, action) => {
        state.apod = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Success";
      })
      .addCase(fetchApod.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.apod = {};
      })
      .addCase(fetchArchiveItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArchiveItems.fulfilled, (state, action) => {
        state.apodArchive = [...state.apodArchive, ...action.payload.reverse()];
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Success";
      })
      .addCase(fetchArchiveItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.apodArchive = [];
      });
  },
});

export const { reset } = apodSlice.actions;
export default apodSlice.reducer;
