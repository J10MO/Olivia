import { api } from "../mainapi";

export const firewallApi = api.injectEndpoints({
  endpoints: (build) => ({
     addFirewallIp: build.mutation<any, { agentid: string; srcip: string }>({
      query: (body) => ({
        url: "firewall/ip",
        method: "POST",
        body,
      }),
    }),

   deleteFirewallIp: build.mutation<any, { agentid: string; srcip: string }>({
      query: (body) => ({
        url: "firewall/ip",
        method: "DELETE",
        body,  // send both agentid and srcip in body
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useAddFirewallIpMutation, useDeleteFirewallIpMutation } = firewallApi;
