import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/redux/store";

type initialState = {
  state: noteActionState;
};

type noteActionState = {
  highlightList: any[];
};

const initialState = {
  highlightList: [],
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
  },
});

export const { addHighlight, setHighlight } = note.actions;
export const selectMoreAction = (state: RootState) => state.moreAction;
export default note.reducer;
