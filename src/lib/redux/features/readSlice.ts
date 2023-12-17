import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/redux/store";
import BookProps from "@/types/BookProps";

type initialState = {
  state: readState;
};

type readState = {
  isLoading: boolean;
  currentBook: null | BookProps;
  fontSize: number;
  lineSpacing: number;
  lineWidth: string;
};

const initialState = {
  isLoading: false,
  currentBook: null,
  fontSize: 20,
  lineSpacing: 1.4,
  lineWidth: "X-large",
} as readState;

export const read = createSlice({
  name: "read",
  initialState,
  reducers: {
    setCurrentBook: (state, action) => {
      state.currentBook = action.payload;
    },
    setFontSize: (state, action) => {
      if (action.payload) {
        state.fontSize = state.fontSize + 1;
      } else {
        state.fontSize = state.fontSize - 1;
      }
    },
    setLineSpacing: (state, action) => {
      if (action.payload && state.lineSpacing >= 2.2) return;
      if (!action.payload && state.lineSpacing <= 1.2) return;
      if (action.payload) {
        const newLineSpacing = state.lineSpacing + 0.1;
        state.lineSpacing = Number(newLineSpacing.toFixed(1));
      } else {
        const newLineSpacing = state.lineSpacing - 0.1;
        state.lineSpacing = Number(newLineSpacing.toFixed(1));
      }
    },
    setLineWidth: (state, action) => {
      state.lineWidth = action.payload;
    },
  },
});

export const { setCurrentBook, setFontSize, setLineSpacing, setLineWidth } =
  read.actions;
export const selectRead = (state: RootState) => state.read;
export default read.reducer;
