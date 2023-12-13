import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/redux/store";
import BookProps from "@/types/BookProps";
import { NavItem } from "epubjs";

type initialState = {
  state: readState;
};

type readState = {
  isLoading: boolean;
  currentBook: null | BookProps;
  content: null | [];
};

const initialState = {
  isLoading: false,
  currentBook: null,
  content: null,
} as readState;

export const read = createSlice({
  name: "read",
  initialState,
  reducers: {
    setCurrentBook: (state, action) => {
      state.currentBook = action.payload;
    },
  },
});

export const { setCurrentBook } = read.actions;
export const selectRead = (state: RootState) => state.read;
export default read.reducer;
