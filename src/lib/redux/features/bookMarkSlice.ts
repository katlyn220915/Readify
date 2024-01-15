import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/redux/store";

type initialState = {
  state: bookMarkState;
};

type bookMarkState = {
  height: number;
  transform: number;
};

const initialState = {
  height: 0,
  transform: 0,
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
  },
});

export const { setPosition, resetPosition } = bookMark.actions;
export const selectRead = (state: RootState) => state.read;
export default bookMark.reducer;
