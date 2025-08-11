// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/apiSlice";
import userBooksReducer from "../features/userBooks/userBookSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    userBooks: userBooksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
