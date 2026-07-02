import { apiSlice } from "./apiSlice";

const PRODUCTS_URL = "/api/products";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (keyword = "") => ({
        url: `${PRODUCTS_URL}?keyword=${keyword}`,
        method: "GET",
      }),
    }),
    getIdProduct: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetIdProductQuery, useGetProductsQuery } = productApiSlice;
