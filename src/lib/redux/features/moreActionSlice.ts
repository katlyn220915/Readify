import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/redux/store";
import BookProps from "@/types/BookProps";

type initialState = {
  state: moreActionState;
};

type moreActionState = {
  isMoreActionBtnOpen: boolean;
  isOtherMoreActionBtnOpen: boolean;
};

const initialState = {
  isMoreActionBtnOpen: false,
  isOtherMoreActionBtnOpen: false,
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
  },
});

export const { setMoreActionBtn, setMoreActionBtnClose } = moreAction.actions;
export const selectMoreAction = (state: RootState) => state.moreAction;
export default moreAction.reducer;
