import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios";

// Create axios instance with base configuration
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Token getter function - will be set by Auth0Provider wrapper
let getAccessToken: (() => Promise<string>) | null = null;

export const setTokenGetter = (tokenGetter: () => Promise<string>) => {
  getAccessToken = tokenGetter;
};

// Request interceptor to add Auth0 token to all requests
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (getAccessToken) {
      try {
        const token = await getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error getting access token:", error);
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - Auth0 will handle re-authentication
      console.error("Unauthorized - token may be expired");
    }
    return Promise.reject(error);
  }
);
