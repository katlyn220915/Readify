import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/redux/store";
import BookProps from "@/types/BookProps";
import { literata, roboto, inter } from "@/app/fonts/fonts";
import { stat } from "fs";

type initialState = {
  state: readState;
};

type readState = {
  isLoading: boolean;
  currentBook: null | BookProps;
  currentCategory: string | undefined;
  currentChapter: string | undefined;
  fontSize: number;
  lineSpacing: number;
  lineWidth: string;
  typeface: {
    title: string;
    type: "serif" | "sans-serif";
    variable: string;
    className: any;
  };
  isActionMenuOpen: boolean;
  markerColor: string;
  isDeleteMode: boolean;
  deleteHighlightID: string | null;
  readingProgress: number;
  isAddNoteBlockOpen: boolean;
};

const initialState = {
  isLoading: false,
  currentBook: null,
  currentCategory: "mylibrary",
  currentChapter: undefined,
  fontSize: 20,
  lineSpacing: 1.4,
  lineWidth: "X-large",
  typeface: {
    title: "Literata",
    type: "serif",
    variable: "--font-literata",
    className: literata.className,
  },
  isActionMenuOpen: false,
  markerColor: "marker-default",
  isDeleteMode: false,
  deleteHighlightID: null,
  readingProgress: 0,
  isAddNoteBlockOpen: true,
} as readState;

export const read = createSlice({
  name: "read",
  initialState,
  reducers: {
    setCurrentBook: (state, action) => {
      state.currentBook = action.payload.currentBook;
      state.currentCategory = action.payload.category;
      state.currentChapter = action.payload.chapter;
    },

    setCurrentChapter: (state, action) => {
      const chapter = action.payload.replaceAll("/", "");
      state.currentChapter = chapter;
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

    setActionMenuToggle: (state, action) => {
      state.isActionMenuOpen = action.payload;
    },

    setMarkerColor: (state, action) => {
      state.markerColor = action.payload;
    },

    setDeleteHighlightMode: (state, action) => {
      state.isDeleteMode = action.payload.isDeleteMode;
      state.deleteHighlightID = action.payload.highlightId;
    },

    setIsAddNoteBlockOpen: (state, action) => {
      state.isActionMenuOpen = action.payload;
      state.isAddNoteBlockOpen = action.payload;
    },

    setTypeface: (state, action) => {
      state.typeface = action.payload;
    },
  },
});

export const {
  setCurrentBook,
  setCurrentChapter,
  setFontSize,
  setLineSpacing,
  setLineWidth,
  setActionMenuToggle,
  setMarkerColor,
  setDeleteHighlightMode,
  setIsAddNoteBlockOpen,
  setTypeface,
} = read.actions;
export const selectRead = (state: RootState) => state.read;
export default read.reducer;
