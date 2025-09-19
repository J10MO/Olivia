import { api } from "../mainapi";

interface RulePayload {
  filename: string;
  subfolder: string;
}

interface AddOrUpdateRule extends RulePayload {
  content: string;
}

interface CreateRule extends AddOrUpdateRule {
  overwrite: boolean;
}

export const rulesApi = api.injectEndpoints({
  endpoints: (build) => ({
    // GET: Get all rules
    getRules: build.query<any, void>({
      query: () => ({
        url: "rule",
        method: "GET",
      }),
      providesTags: ["rule"],
    }),

    // POST: Create a rule with overwrite flag
    addRule: build.mutation<any, CreateRule>({
      query: (body) => ({
        url: "rule",
        method: "POST",
        body,
      }),
      invalidatesTags: ["rule"],
    }),

    // PUT: Update a rule
    updateRule: build.mutation<any, AddOrUpdateRule>({
      query: (body) => ({
        url: "rule",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["rule"],
    }),

    // DELETE: Delete a rule by filename and subfolder (sent in body)
    deleteRule: build.mutation<any, RulePayload>({
      query: (body) => ({
        url: "rule",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["rule"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRulesQuery,
  useAddRuleMutation,
  useUpdateRuleMutation,
  useDeleteRuleMutation,
} = rulesApi;
