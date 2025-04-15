import { configureStore } from "@reduxjs/toolkit";

import bookMarkReducer from "./features/bookMarkSlice";
import bookReducer from "./features/bookSlice";
import noteReducer from "./features/noteSlice";
import readReducer from "./features/readSlice";
import tagReducer from "./features/tagSlice";
import uploadReducer from "./features/uploadSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      upload: uploadReducer,
      book: bookReducer,
      tag: tagReducer,
      read: readReducer,
      note: noteReducer,
      bookMark: bookMarkReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
