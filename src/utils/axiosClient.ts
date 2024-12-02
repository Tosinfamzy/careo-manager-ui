import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Intercept all requests to add the Authorization header
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const refreshAuth = async (failedRequest: axios.AxiosError) => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    const response = await axios.post("/auth/refresh-tokens", {
      refresh_token: refreshToken,
    });

    const { access_token } = response.data;
    localStorage.setItem("access_token", access_token);

    if (failedRequest.response && failedRequest.response.config) {
      failedRequest.response.config.headers[
        "Authorization"
      ] = `Bearer ${access_token}`;
    }
    return Promise.resolve();
  } catch (error) {
    window.location.href = "/login";
    return Promise.reject(error);
  }
};

createAuthRefreshInterceptor(axiosClient, refreshAuth);

export default axiosClient;
