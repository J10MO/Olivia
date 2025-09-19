import { api } from "../mainapi";




export const logApi = api.injectEndpoints({
  endpoints: (build) => ({
    getLogCount: build.mutation<{ count: number }, any>({
      query: (body) => ({
        url: "log/count",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetLogCountMutation } = logApi;
