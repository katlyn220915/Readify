import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/redux/store";

type initialState = {
  state: moreActionState;
};

type moreActionState = {
  isMoreActionBtnOpen: boolean;
  isOtherMoreActionBtnOpen: boolean;
  allTags: any[];
};

const initialState = {
  isMoreActionBtnOpen: false,
  isOtherMoreActionBtnOpen: false,
  allTags: [],
} as moreActionState;

export const moreAction = createSlice({
  name: "moreAction",
  initialState,
  reducers: {
    setMoreActionBtn: (state) => {
      state.isMoreActionBtnOpen = !state.isMoreActionBtnOpen;
      state.isOtherMoreActionBtnOpen = !state.isOtherMoreActionBtnOpen;
    },

    setMoreActionBtnClose: (state) => {
      state.isMoreActionBtnOpen = false;
      state.isOtherMoreActionBtnOpen = false;
    },

    setAllTags: (state, action) => {
      state.allTags = action.payload;
    },

    onCreateTags: (state, action) => {
      if (state.allTags !== undefined) {
        state.allTags = [...state.allTags, action.payload];
      } else {
        state.allTags = [action.payload];
      }
    },
  },
});

export const {
  setMoreActionBtn,
  setMoreActionBtnClose,
  setAllTags,
  onCreateTags,
} = moreAction.actions;
export const selectMoreAction = (state: RootState) => state.moreAction;
export default moreAction.reducer;
