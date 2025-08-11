// src/components/BookOrder.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Book, User } from "../types/models";
import { useGetUsersQuery, useGetBooksQuery } from "../api/apiSlice";
import { addBookToUser } from "../features/userBooks/userBookSlice";
import type { RootState } from "../store/store";

const BookOrder: React.FC = () => {
  const { data: users = [] } = useGetUsersQuery();
  const { data: books = [] } = useGetBooksQuery();
  const dispatch = useDispatch();
  const userBooks = useSelector((state: RootState) => state.userBooks);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleBookSelect = (book: Book) => {
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

export default BookOrder;
