/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createApi,
  fetchBaseQuery,
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  DefinitionType,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { logout } from "../features/auth/authSlice";
import { HYDRATE } from "next-redux-wrapper";
import { Action, PayloadAction } from "@reduxjs/toolkit";
import { setLoading } from "../features/loading/loadingSlice";

type RootState = any;

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

// Base query
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  // credentials: "include",
  prepareHeaders: (headers) => {
    const token = Cookies.get("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Custom base query to handle loading and other logic
const customBaseQuery: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  const { dispatch } = api;

  // Set loading to true before starting the request
  dispatch(setLoading(true));

  try {
    const result = await baseQuery(args, api, extraOptions);

    // Handle unauthorized cases
    if (result.error?.status === 401 || result.error?.status === 403) {
      dispatch(logout());
      Cookies.remove("token", { path: "/" });
    }

    return result;
  } catch (error) {
    // Handle errors
    console.error("API request error:", error);
    return { error };
  } finally {
    // Set loading to false after the request is complete
    dispatch(setLoading(false));
  }
};

// Base API
const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: customBaseQuery,
  tagTypes: [
    "product",
    "user",
    "shop",
    "follower",
    "review",
    "recentProduct",
    "flashSale",
    "order",
    "transaction",
    "coupon",
    "category",
  ],
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  endpoints: () => ({}),
});

export default baseApi;
