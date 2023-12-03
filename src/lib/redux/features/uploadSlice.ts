import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/redux/store";

type initialState = {
  state: uploadState;
};

type uploadState = {
  isUploading: boolean;
  isError: boolean;
  errorMes: string;
  isSuccessful: boolean;
  fileName: string;
};

const initialState = {
  isUploading: false,
  isError: false,
  errorMes: "",
  isSuccessful: false,
  fileName: "原子習慣",
} as uploadState;

export const upload = createSlice({
  name: "upload",
  initialState,
  reducers: {
    uploading: (state, action: PayloadAction<string>) => {
      state.fileName = action.payload;
      state.isUploading = true;
    },
    error: (state, action: PayloadAction<string>) => {
      state.isError = true;
      state.isUploading = false;
      state.errorMes = action.payload;
    },
    success: (state) => {
      state.isUploading = false;
      state.isSuccessful = true;
    },
    reset: () => {
      return initialState;
    },
  },
});

export const { uploading, error, success, reset } = upload.actions;
export const selectUpload = (state: RootState) => state.upload;
export default upload.reducer;
