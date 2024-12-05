import { api } from "./api";

export const Messages = {
  async getUnread(userId) {
    const options = {
      method: "GET",
      url: "/get-unread-messages",
      params: {
        userId,
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
