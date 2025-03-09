import { apiClient } from "@/lib/axios";
import { Message } from "@/types/message.type";
import { ApiErrorResponse, ApiSuccessResponse } from "@/types/response.type";
import { User } from "@/types/user.type";
import { handleError } from "@/utils/handle-error";
import { create } from "zustand";

export interface ChatStore {
  messages: Message[];
  users: User[];
  error: ApiErrorResponse | null;
  selectedUser: User | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  setSelectedUser: (user: User | null) => void;
  getUsers: () => Promise<void>;
  getMessages: (receiverId: string) => Promise<void>;
  sendMessage: (data) => Promise<void>;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  // ! optimize later
  setSelectedUser: (user) => set({ selectedUser: user }),
  error: null,
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await apiClient.get<
        ApiSuccessResponse<{
          users: User[];
        }>
      >("/users");
      set({ users: res.data.users, error: null });
    } catch (error) {
      set({ error: handleError(error) });
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (receiverId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await apiClient.get<
        ApiSuccessResponse<{
          messages: Message[];
        }>
      >(`/messages/${receiverId}`);
      console.log("RES: ", res);
      set({ messages: res.data.messages, error: null });
    } catch (error) {
      set({ error: handleError(error) });
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (data) => {
    const { messages, selectedUser } = useChatStore.getState();
    try {
      const res = await apiClient.post<
        ApiSuccessResponse<{
          messages: Message[];
        }>
      >(`/messages/send/${selectedUser?._id}`, data);
      set({ messages: [...messages, ...res.data.messages], error: null });
    } catch (error) {
      set({ error: handleError(error) });
    }
  },
}));
