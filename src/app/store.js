import { configureStore } from "@reduxjs/toolkit";
import apodReducer from "../features/APOD/apodSlice";

export const store = configureStore({
  reducer: {
    apod: apodReducer,
  },
});
