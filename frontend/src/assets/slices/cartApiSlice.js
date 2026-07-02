import { apiSlice } from "./apiSlice";

const CART_URL = "/api/carts";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (data) => ({
        url: `${CART_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Carts"],
    }),
    getByIdCart: builder.query({
      query: (id) => ({
        url: `${CART_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["Carts"],
    }),
    getAllItemCart: builder.query({
      query: () => ({
        url: `${CART_URL}`,
        method: "GET",
      }),
      providesTags: ["Carts"],
    }),
    updateQty: builder.mutation({
      query: ({ productId, qty }) => ({
        url: `${CART_URL}/qty`,
        method: "PUT",
        body: { productId, qty },
      }),
      invalidatesTags: ["Carts"],
    }),
    deleteItemCart: builder.mutation({
      query: (productId) => ({
        url: `${CART_URL}/${productId}`,
        method: "DELETE",
        body: productId,
      }),
    }),
    clearItemCart: builder.mutation({
      query: () => ({
        url: `${CART_URL}/clear`,
        method: "DELETE",
      }),
      invalidatesTags: ["Carts"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetAllItemCartQuery,
  useGetByIdCartQuery,
  useUpdateQtyMutation,
  useDeleteItemCartMutation,
  useClearItemCartMutation,
} = cartApiSlice;
