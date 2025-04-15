import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "@/lib/redux/store";

type initialState = {
  state: tagState;
};

type tagState = {
  allUserTags: any[];
  deleteId: any;
  updateId: any;
  updateName: any;
};

const initialState = {
  allUserTags: [],
  deleteId: null,
  updateId: null,
  updateName: null,
} as tagState;

export const tag = createSlice({
  name: "tag",
  initialState,
  reducers: {
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

export const { setAllUserTags, onCreateTag, onDeleteTag, onUpdateTag, reset } =
  tag.actions;
export const selectTag = (state: RootState) => state.tag;
export default tag.reducer;
