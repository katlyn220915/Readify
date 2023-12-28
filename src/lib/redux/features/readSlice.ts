import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/redux/store";
import BookProps from "@/types/BookProps";

type initialState = {
  state: readState;
};

type readState = {
  isLoading: boolean;
  currentBook: null | BookProps;
  currentCategory: string | undefined;
  currentChapter: string | undefined;
  bookDocuments: any;
  fontSize: number;
  lineSpacing: number;
  lineWidth: string;
  isActionMenuOpen: boolean;
  actionMenuPositionX: number;
  actionMenuPositionY: number;
  markerColor: string;
  isDeleteMode: boolean;
  deleteHighlightID: number | null;
  readingProgress: number;
};

const initialState = {
  isLoading: false,
  currentBook: null,
  currentCategory: undefined,
  currentChapter: undefined,
  bookDocuments: [],
  fontSize: 20,
  lineSpacing: 1.4,
  lineWidth: "X-large",
  isActionMenuOpen: false,
  actionMenuPositionX: 0,
  actionMenuPositionY: 0,
  markerColor: "marker-default",
  isDeleteMode: false,
  deleteHighlightID: null,
  readingProgress: 0,
} as readState;

export const read = createSlice({
  name: "read",
  initialState,
  reducers: {
    setCurrentBook: (state, action) => {
      state.currentBook = action.payload.currentBook;
      state.currentCategory = action.payload.category;
    },

    setCurrentChapter: (state, action) => {
      state.currentChapter = action.payload;
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
    setActionMenuPosition: (state, action) => {
      state.isActionMenuOpen = true;
      state.actionMenuPositionX = action.payload.positionX;
      state.actionMenuPositionY = action.payload.positionY;
    },
    setActionMenuPositionY: (state, action) => {
      state.actionMenuPositionY = action.payload;
    },
    setMarkerColor: (state, action) => {
      state.markerColor = action.payload;
    },
    setDeleteHighlightMode: (state, action) => {
      state.isDeleteMode = action.payload.isDeleteMode;
      state.deleteHighlightID = action.payload.highlightId;
    },
    setBookDocuments: (state, action) => {
      state.bookDocuments = action.payload;
    },
    setReadinProgress: (state, action) => {
      state.readingProgress = state.readingProgress + 1;
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
  setActionMenuPosition,
  setActionMenuPositionY,
  setMarkerColor,
  setDeleteHighlightMode,
  setBookDocuments,
  setReadinProgress,
} = read.actions;
export const selectRead = (state: RootState) => state.read;
export default read.reducer;
