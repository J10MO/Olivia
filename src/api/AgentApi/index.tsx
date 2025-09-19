import { api } from "../mainapi";

interface Agent {
  id?: string;
  name: string;
  localip: string;
  status: string;
  connection:string;
  
  // add more fields as needed
}

export const agentApi = api.injectEndpoints({
  endpoints: (build) => ({
    // GET: Fetch all agents
    getAgents: build.query<{ clients: Agent[] }, void>({
      query: () => ({
        url: "agent",
        method: "GET",
      }),
      providesTags: ["agent","getAgents"],
    }),

    // POST: Create a new agent
    createAgent: build.mutation<Agent, Agent>({
      query: (newAgent) => ({
        url: "agent",
        method: "POST",
        body: newAgent,
      }),
      invalidatesTags: ["agent","getAgents","createAgent"],
    }),

    // DELETE: Delete an agent by ID
    deleteAgent: build.mutation<void, string>({
      query: (agentid) => ({
        url: `agent`,
        method: "DELETE",
        body: { agentid },
      }),
      invalidatesTags: ["agent"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAgentsQuery,
  useCreateAgentMutation,
  useDeleteAgentMutation,
} = agentApi;
