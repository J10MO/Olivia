// src/Api/MainApi.ts
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { BASIC_URL } from "./index";

// Base fetch with optional auth token
const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASIC_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("TOKEN");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Auth-handling wrapper for 401 errors
const baseQueryWithAuthHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  

  const isUnauthorized =
    result?.error?.status === 401 ||
    (typeof result?.error?.data === "object" &&
      (String(result.error.data || "").toLowerCase().includes("failed login") ||
       String(result.error.data || "").toLowerCase().includes("invalid token")));

  if (isUnauthorized) {
    console.warn("⛔ Detected unauthorized error. Skipping logout for now.");

    // Commented out for development purposes
   
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("User");

    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    
  }

  return result;
};


// ✅ Exportable API instance
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuthHandling,
  tagTypes: ["log","agent","getAgents","createAgent","rule","config"], // Add tags only when needed
  endpoints: () => ({}), // Extend this in separate slices
});
