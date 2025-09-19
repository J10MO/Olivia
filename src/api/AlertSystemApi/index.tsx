// src/api/apiClient.ts
import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000", // Replace with your real URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
