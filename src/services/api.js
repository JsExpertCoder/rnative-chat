import axios from "axios";
import { BACKEND_API_URL } from "@env";

const api = axios.create({
  baseURL: BACKEND_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const setBearerToken = (token) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export { api, setBearerToken };
