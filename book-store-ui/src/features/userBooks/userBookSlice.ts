// src/features/userBooks/userBookSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Book } from "../../interface/models";


interface UserBooksState {
  [userId: number]: Book[];
}

const initialState: UserBooksState = {};

const userBookSlice = createSlice({
  name: "userBooks",
  initialState,
  reducers: {
    addBookToUser: (
      state,
      action: PayloadAction<{ userId: number; book: Book }>
    ) => {
      const { userId, book } = action.payload;
      if (!state[userId]) state[userId] = [];
      if (!state[userId].find((b: Book) => b.id === book.id)) {
        state[userId].push(book);
      }
    },
  },
});

export const { addBookToUser } = userBookSlice.actions;
export default userBookSlice.reducer;
