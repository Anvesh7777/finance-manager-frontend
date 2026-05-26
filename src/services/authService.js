import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {

  throw new Error(
    "VITE_API_BASE_URL is missing"
  );
}

const authAPI = axios.create({

  baseURL: API_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR
authAPI.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem("token");

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {

    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR
authAPI.interceptors.response.use(

  (response) => response,

  (error) => {

    // AUTO LOGOUT ON 401
    if (
      error?.response?.status === 401
    ) {

      localStorage.removeItem("token");

      localStorage.removeItem("username");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// REGISTER
export const registerUser =
  async (userData) => {

    const response =
      await authAPI.post(
        "/users/register",
        userData
      );

    return response.data;
  };

// LOGIN
export const loginUser =
  async (loginData) => {

    const response =
      await authAPI.post(
        "/users/login",
        loginData
      );

    return response.data;
  };

export default authAPI;