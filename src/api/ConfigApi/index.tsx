import { api } from "../mainapi";

export const configApi = api.injectEndpoints({
  endpoints: (build) => ({
    // GET config (returns string or object with config text)
    getConfig: build.query<{ config: string }, void>({
      query: () => ({
        url: "config",
        method: "GET",
      }),
      providesTags: ["config"],
    }),

    // PUT update config
    updateConfig: build.mutation<void, { config: string }>({
      query: (body) => ({
        url: "config",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["config"],
    }),
  }),
});

export const { useGetConfigQuery, useUpdateConfigMutation } = configApi;
