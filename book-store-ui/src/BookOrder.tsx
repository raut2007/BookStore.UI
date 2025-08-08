import React, { useState } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";

// Dummy API setup
const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      queryFn: async () => {
        return {
          data: [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" },
            { id: 3, name: "Charlie" },
          ],
        };
      },
    }),
    getBooks: builder.query({
      queryFn: async () => {
        return {
          data: [
            { id: 101, title: "React Basics" },
            { id: 102, title: "Redux Toolkit" },
            { id: 103, title: "Node.js Guide" },
          ],
        };
      },
    }),
  }),
});

const { useGetUsersQuery, useGetBooksQuery } = api;

// User-book selection state
const userBookSlice = createSlice({
  name: "userBooks",
  initialState: {},
  reducers: {
    addBookToUser: (state, action) => {
      const { userId, book } = action.payload;
      if (!state[userId]) state[userId] = [];
      if (!state[userId].find((b) => b.id === book.id)) {
        state[userId].push(book);
      }
    },
  },
});
const { addBookToUser } = userBookSlice.actions;

// Store setup
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    userBooks: userBookSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Main UI Component
const BookOrder = () => {
  const { data: users = [] } = useGetUsersQuery();
  const { data: books = [] } = useGetBooksQuery();
  const dispatch = useDispatch();
  const userBooks = useSelector((state) => state.userBooks);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleBookSelect = (book) => {
    if (selectedUser) {
      dispatch(addBookToUser({ userId: selectedUser.id, book }));
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial", textAlign: "left" }}>
      <h2>User List</h2>
      <div style={{ display: "flex", gap: 10 }}>
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => setSelectedUser(user)}
            style={{
              padding: 10,
              backgroundColor:
                selectedUser?.id === user.id ? "#007bff" : "#e0e0e0",
              color: selectedUser?.id === user.id ? "white" : "black",
              border: "none",
              borderRadius: 5,
            }}
          >
            {user.name}
          </button>
        ))}
      </div>

      <hr />

      <h3>Book List</h3>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {books.map((book) => (
          <button
            key={book.id}
            onClick={() => handleBookSelect(book)}
            style={{
              padding: 8,
              backgroundColor: "#f8f8f8",
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          >
            {book.title}
          </button>
        ))}
      </div>

      <hr />

      <h3>User Book Selections</h3>
      <div style={{ display: "flex", overflowX: "auto", gap: 20 }}>
        {users.map((user) => (
          <div
            key={user.id}
            style={{ border: "1px solid #ccc", padding: 10, minWidth: 150 }}
          >
            <strong>{user.name}</strong>
            <ul>
              {(userBooks[user.id] || []).map((book) => (
                <li key={book.id}>{book.title}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

// App with Provider
const BookOrderApp = () => (
  <Provider store={store}>
    <BookOrder />
  </Provider>
);

export default BookOrderApp;
