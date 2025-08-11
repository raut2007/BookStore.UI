// src/api/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Book, User } from '../types/models';

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "https://localhost:7240/api/User/all",
      transformResponse: (response: { data: User[] }) => response.data,
    }),
    getBooks: builder.query<Book[], void>({
      query: () => "https://localhost:7253/api/Book/all",
      transformResponse: (response: { data: any[] }) =>
        response.data.map((book) => ({
          id: book.id,
          title: book.name,
        })),
    }),
  }),
});

export const { useGetUsersQuery, useGetBooksQuery } = api;
