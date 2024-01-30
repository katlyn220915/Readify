import { configureStore } from "@reduxjs/toolkit";
import uploadReducer from "./features/uploadSlice";
import bookReducer from "./features/bookSlice";
import tagReducer from "./features/tagSlice";
import readReducer from "./features/readSlice";
import noteReducer from "./features/noteSlice";
import bookMarkReducer from "./features/bookMarkSlice";

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
