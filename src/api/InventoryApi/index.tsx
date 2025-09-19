import { api } from "../mainapi";

export const inventoryApi = api.injectEndpoints({
  endpoints: (build) => ({
    getInventoryData: build.mutation<any, { agentid: string }>({
      query: (body) => ({
        url: "inventorydata",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetInventoryDataMutation } = inventoryApi;
