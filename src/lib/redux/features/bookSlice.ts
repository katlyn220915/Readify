import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "@/lib/redux/store";
import BookProps from "@/types/BookProps";

type initialState = {
  state: bookState;
};

type bookState = {
  isProcessing: boolean;
  isError: boolean;
  bookList: BookProps[];
  isSuccessful: boolean;
  allTags: string[] | null;
};

const initialState = {
  isProcessing: false,
  isError: false,
  bookList: [],
  isSuccessful: false,
  allTags: [],
} as bookState;

export const book = createSlice({
  name: "book",
  initialState,
  reducers: {
    addNewBook: (state, action) => {
      state.bookList.push(action.payload);
    },
    bookListInitialize: (state, action) => {
      state.bookList = action.payload;
    },
    deleteBook: (state, action) => {
      state.bookList = state.bookList.filter(
        (book) => book.bookId !== action.payload
      );
      state.isSuccessful = true;
    },
    resetSuccessful: (state) => {
      state.isSuccessful = false;
    },
  },
});

export const { addNewBook, bookListInitialize, deleteBook, resetSuccessful } =
  book.actions;
export const selectBook = (state: RootState) => state.book;
export default book.reducer;
