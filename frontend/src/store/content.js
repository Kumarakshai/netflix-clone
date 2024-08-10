import { create } from "zustand";

export const useContentStore = create((set) => ({
  // contentType: "tv",
  setContentType: (type) => set({ contentType: type }),
}));
