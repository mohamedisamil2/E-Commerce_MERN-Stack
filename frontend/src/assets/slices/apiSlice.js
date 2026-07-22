import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut } from "./authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "",
  credentials: "include",
});

// This function calls a base query and adds extra logic to it; it's called a wrapper.
// هذه دالة تستدعي baseQuery و تضيف منطقا اضافيا تسمى الغلاف
const baseQueryWithAuth = async (args, api, extraOption) => {
  const result = await baseQuery(args, api, extraOption);

  if (result.error && result.error.status === 401) {
    api.dispatch(logOut());
  }
  return result;
};

// create api Slice
export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Users", "Products", "Orders", "Carts"],
  endpoints: (builder) => ({ builder }),
});
