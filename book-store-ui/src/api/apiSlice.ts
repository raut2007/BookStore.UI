// src/api/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Book, User } from '../interface/models';

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "https://f292xeazh9.execute-api.ap-south-1.amazonaws.com/dev/users",
      transformResponse: (response: { data: User[] }) => response.data,
    }),
    getBooks: builder.query<Book[], void>({
      query: () => "https://f292xeazh9.execute-api.ap-south-1.amazonaws.com/dev/users",
      transformResponse: (response: { data: Book[] }) =>
        response.data.map((book) => ({
          id: book.id,
          name: book.name,
        })),
    }),
  }),
});

export const { useGetUsersQuery, useGetBooksQuery } = api;
