import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "@/lib/redux/store";

type initialState = {
  state: uploadState;
};

type uploadState = {
  isUploading: boolean;
  isUploadError: boolean;
  uploadErrorMes: string;
  isUploadSuccessful: boolean;
  fileName: string;
};

const initialState = {
  isUploading: false,
  isUploadError: false,
  uploadErrorMes: "",
  isUploadSuccessful: false,
  fileName: "",
} as uploadState;

export const upload = createSlice({
  name: "upload",
  initialState,
  reducers: {
    uploading: (state, action: PayloadAction<string>) => {
      if (action.payload.length >= 15) {
        const cuttedName = action.payload.slice(0, 14).concat("...");
        state.fileName = cuttedName;
      } else {
        state.fileName = action.payload;
      }
      state.isUploading = true;
    },
    error: (state, action: PayloadAction<string>) => {
      state.isUploadError = true;
      state.isUploading = false;
      state.uploadErrorMes = action.payload;
    },
    success: (state) => {
      state.isUploading = false;
      state.isUploadSuccessful = true;
    },
    reset: () => {
      return initialState;
    },
  },
});

export const { uploading, error, success, reset } = upload.actions;
export const selectUpload = (state: RootState) => state.upload;
export default upload.reducer;
