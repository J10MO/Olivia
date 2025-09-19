import { api } from "../mainapi";

interface LogQuery {
  size: number;
  query: {
    match: {
      [key: string]: string;
    };
  };
  sort?: Array<{
    [key: string]: {
      order: "asc" | "desc";
    };
  }>;
}

export const logApi = api.injectEndpoints({
  endpoints: (build) => ({
    // POST: Search logs using OpenSearch-style queries
    searchLogs: build.mutation<any, LogQuery>({
      query: (body) => ({
        url: "log",
        method: "POST",
        body,
      }),
      invalidatesTags: ["log"],
    }),

    // PUT: Update a log entry by ID
    updateLog: build.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `log/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["log"],
    }),

    // DELETE: Remove a log entry by ID
    deleteLog: build.mutation<any, string>({
      query: (id) => ({
        url: `log/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["log"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useSearchLogsMutation,
  useUpdateLogMutation,
  useDeleteLogMutation,
} = logApi;
