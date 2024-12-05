import { api } from "./api";

export const Team = {
  async getMembers() {
    const options = {
      method: "GET",
      url: "/get-team-members",
    };

    try {
      const response = await api.request(options);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
