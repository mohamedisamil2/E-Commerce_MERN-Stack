import { apiSlice } from "./apiSlice";

const ORDERS_URL = "/api/orders";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDERS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Carts", "Orders"]
    }),
    getOrder: builder.query({
      query: () => ({
        url: `${ORDERS_URL}`,
        method: "GET",
      }),
      providesTags:["Carts","Orders"],
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderQuery } = orderApiSlice;
