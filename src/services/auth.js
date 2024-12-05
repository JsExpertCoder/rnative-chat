import { api } from "./api";

export const Auth = {
  async login(email, password) {
    const options = {
      method: "POST",
      url: "/login",
      data: {
        email,
        password,
      },
    };

    try {
      const response = await api.request(options);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
