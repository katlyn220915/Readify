import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "@/lib/redux/store";

type initialState = {
  state: bookMarkState;
};

type bookMarkState = {
  height: number;
  transform: number;
  isIndicatorIntersecting: boolean;
};

const initialState = {
  height: 0,
  transform: 0,
  isIndicatorIntersecting: true,
  bookMarkParagraph: 0,
} as bookMarkState;

export const bookMark = createSlice({
  name: "bookMark",
  initialState,
  reducers: {
    setPosition: (state, action) => {
      state.height = action.payload.height;
      state.transform = action.payload.transform;
    },
    resetPosition: (state) => {
      return initialState;
    },
    setIndicatorIntersecting: (state, action) => {
      state.isIndicatorIntersecting = action.payload;
    },
  },
});

export const { setPosition, resetPosition, setIndicatorIntersecting } =
  bookMark.actions;
export const selectRead = (state: RootState) => state.read;
export default bookMark.reducer;
