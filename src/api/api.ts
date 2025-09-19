export type AgentStats = {
  label: string;
  count: number;
  color: string;
  status: "all" | "online" | "offline" | "pending" | "never_connected";
};


export const getAgentStats = async (): Promise<AgentStats[]> => {
  try {
    const token = localStorage.getItem("TOKEN"); // <-- Adjust key as needed
    if (!token) {
      console.error("No auth token found in localStorage");
      return [];
    }

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);

    const response = await fetch("http://192.168.68.111:3960/api/agent", {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      console.error("Failed to fetch agent stats, status:", response.status);
      return [];
    }

    const result = await response.json();
    const clients = result.clients || [];

    const active = clients.filter(
      (a: any) => a.connection?.toLowerCase() === "online"
    ).length;
    const disconnected = clients.filter(
      (a: any) => a.connection?.toLowerCase() === "offline"
    ).length;
    const pending = clients.filter(
      (a: any) =>
        !["online", "offline"].includes(a.connection?.toLowerCase() || "")
    ).length;
    const total = clients.length;
    const neverConnected = clients.filter(
      (a: any) => !a.connection || a.connection === "never_connected"
    ).length;

    return [
      {
        label: "Total agents",
        count: total,
        color: "#00b2a9",
        status: "all",
      },
      {
        label: "Active agents",
        count: active,
        color: "#f4a300",
        status: "online",
      },
      {
        label: "Disconnected agents",
        count: disconnected,
        color: "#cf3a3a",
        status: "offline",
      },
      {
        label: "Pending agents",
        count: pending,
        color: "#2a9df4",
        status: "pending",
      },
      {
        label: "Never connected agents",
        count: neverConnected,
        color: "#9c27b0",
        status: "never_connected",
      },
    ];
  } catch (error) {
    console.error("Failed to get agent stats:", error);
    return [];
  }
};
