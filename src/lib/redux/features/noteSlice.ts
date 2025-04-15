import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "@/lib/redux/store";

type initialState = {
  state: noteActionState;
};

type noteActionState = {
  highlightList: any[];
  editNoteFieldOpen: boolean | string;
};

const initialState = {
  highlightList: [],
  editNoteFieldOpen: false,
} as noteActionState;

export const note = createSlice({
  name: "note",
  initialState,
  reducers: {
    setHighlight: (state, action) => {
      state.highlightList = action.payload;
    },
    addHighlight: (state, action) => {
      state.highlightList = [...state.highlightList, action.payload];
    },
    deleteHighlight: (state, action) => {
      state.highlightList = state.highlightList.filter(
        (cur) => cur.id !== action.payload
      );
    },
    setIsEditNoteFieldOpen: (state, action) => {
      state.editNoteFieldOpen = action.payload;
    },
    updateNote: (state, action) => {
      state.highlightList[action.payload.index].note = action.payload.note;
    },
    resetNotes: (state) => {
      return initialState;
    },
  },
});

export const {
  addHighlight,
  setHighlight,
  deleteHighlight,
  setIsEditNoteFieldOpen,
  updateNote,
  resetNotes,
} = note.actions;
export const selectNote = (state: RootState) => state.note;
export default note.reducer;
