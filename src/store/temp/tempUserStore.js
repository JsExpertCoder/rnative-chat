import { create } from "zustand";

export const useTempUserStore = create((set) => ({
  data: null,
  save: (data) => set(() => ({ data })),
  remove: () => set(() => ({ data: null })),
}));
