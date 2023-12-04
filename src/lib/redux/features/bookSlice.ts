import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/redux/store";
import BookProps from "@/types/BookProps";

type initialState = {
  state: bookState;
};

type bookState = {
  isProcessing: boolean;
  isError: boolean;
  bookList: Array<BookProps>;
};

const initialState = {
  isProcessing: false,
  isError: false,
  bookList: [],
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
    },
    addTag: (state, action) => {},
  },
});

export const { addNewBook, bookListInitialize, deleteBook } = book.actions;
export const selectBook = (state: RootState) => state.book;
export default book.reducer;
