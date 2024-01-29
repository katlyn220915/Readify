import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/redux/store";

type initialState = {
  state: moreActionState;
};

type moreActionState = {
  isMoreActionBtnOpen: boolean;
  isOtherMoreActionBtnOpen: boolean;
  allUserTags: any[];
  deleteId: any;
  updateId: any;
  updateName: any;
};

const initialState = {
  isMoreActionBtnOpen: false,
  isOtherMoreActionBtnOpen: false,
  allUserTags: [],
  deleteId: null,
  updateId: null,
  updateName: null,
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

    setAllUserTags: (state, action) => {
      state.allUserTags = action.payload;
      if (state.allUserTags.length < 0) return;
      state.allUserTags = state.allUserTags.sort((a, b) => b.id - a.id);
    },

    onCreateTag: (state, action) => {
      state.allUserTags = [...state.allUserTags, action.payload];
    },

    onDeleteTag: (state, action) => {
      state.allUserTags = state.allUserTags.filter(
        (cur) => cur.id !== action.payload
      );
      state.deleteId = action.payload;
    },

    onUpdateTag: (state, action) => {
      state.allUserTags = state.allUserTags.filter(
        (cur) => cur.id !== action.payload.id
      );
      state.allUserTags = [
        ...state.allUserTags,
        {
          id: action.payload.id,
          name: action.payload.name,
        },
      ];
      state.updateId = action.payload.id;
      state.updateName = action.payload.name;
    },
    reset: (state) => {
      state.deleteId = null;
      state.updateId = null;
      state.updateName = null;
    },
  },
});

export const {
  setMoreActionBtn,
  setMoreActionBtnClose,
  setAllUserTags,
  onCreateTag,
  onDeleteTag,
  onUpdateTag,
  reset,
} = moreAction.actions;
export const selectMoreAction = (state: RootState) => state.moreAction;
export default moreAction.reducer;
