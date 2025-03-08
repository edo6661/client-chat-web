import { create } from "zustand";
export interface ChatStore {
  messages: string[];
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
}));
