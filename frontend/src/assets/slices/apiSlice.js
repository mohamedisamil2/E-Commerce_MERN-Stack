import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "",
  credentials: "include",
});

// create api Slice

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Users", "Products", "Orders", "Carts"],
  endpoints: (builder) => ({ builder }),
});
