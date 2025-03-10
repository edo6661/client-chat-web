import { apiClient } from "@/lib/axios";
import { ChatState } from "@/state/chat.state";
import { Message } from "@/types/message.type";
import { ApiErrorResponse, ApiSuccessResponse } from "@/types/response.type";
import { User } from "@/types/user.type";
import { handleError } from "@/utils/handle-error";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

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
  sendMessage: (data: ChatState) => Promise<void>;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.on("newMessage", (newMessage: Message) => {
      const isMessageForCurrentUser = newMessage.senderId === selectedUser._id;
      if (!isMessageForCurrentUser) return;

      set({ messages: [...get().messages, newMessage] });
    });
  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
  },
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
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
      set({ messages: res.data.messages, error: null });
    } catch (error) {
      set({ error: handleError(error) });
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (data) => {
    const { messages, selectedUser } = get();
    try {
      const res = await apiClient.post<
        ApiSuccessResponse<{
          message: Message;
        }>
      >(`/messages/send/${selectedUser?._id}`, data);
      set({ messages: [...messages, res.data.message], error: null });
    } catch (error) {
      set({ error: handleError(error) });
    }
  },
}));
