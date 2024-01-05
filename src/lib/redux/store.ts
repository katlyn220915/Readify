import { configureStore } from "@reduxjs/toolkit";
import uploadReducer from "./features/uploadSlice";
import bookReducer from "./features/bookSlice";
import moreActionReducer from "./features/moreActionSlice";
import readReducer from "./features/readSlice";
import noteReducer from "./features/noteSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      upload: uploadReducer,
      book: bookReducer,
      moreAction: moreActionReducer,
      read: readReducer,
      note: noteReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
