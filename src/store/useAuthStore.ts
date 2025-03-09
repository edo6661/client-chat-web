import { apiClient } from "@/lib/axios";
import { ApiErrorResponse, ApiSuccessResponse } from "@/types/response.type";
import { User } from "@/types/user.type";
import { create } from "zustand";
import { RegisterState } from "@/state/register.state";
import { handleError } from "@/utils/handle-error";
import { LoginState } from "@/state/login.state";

export interface AuthStore {
  authUser: User | null;
  isCheckingAuth: boolean;
  message: string | null;
  isUpdatingProfile: boolean;
  error: ApiErrorResponse | null;
  checkAuth: () => Promise<void>;
  clearMessage: () => void;
  clearError: () => void;
  register: (data: RegisterState) => Promise<void>;
  login: (data: LoginState) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: ({ profilePic }: { profilePic: string }) => Promise<void>;
  onlineUsers: User[];
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isCheckingAuth: true,
  message: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  error: null,
  onlineUsers: [],
  clearError: () => set({ error: null }),
  clearMessage: () => set({ message: null }),

  checkAuth: async () => {
    const controller = new AbortController();

    try {
      const res = await apiClient.get<
        ApiSuccessResponse<{
          user: User;
        }>
      >("/users/self");
      set({ authUser: res.data.user, message: res.message, error: null });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
    return controller.abort();
  },
  login: async (data) => {
    const controller = new AbortController();
    try {
      const res = await apiClient.post<
        ApiSuccessResponse<{
          user: User;
        }>
      >("/auth/login", data);
      set({ authUser: res.data.user, message: res.message, error: null });
    } catch (e) {
      console.log("ERROR:", e);

      set({ error: handleError(e) });
    }
    return controller.abort();
  },
  register: async (data) => {
    const controller = new AbortController();
    try {
      const res = await apiClient.post<ApiSuccessResponse<User>>(
        "/auth/register",
        data
      );

      set({ authUser: res.data, message: res.message, error: null });
    } catch (e) {
      set({ error: handleError(e) });
    }
    return controller.abort();
  },
  logout: async () => {
    const controller = new AbortController();
    try {
      await apiClient.post("/auth/logout");
      set({ authUser: null, message: "Logged out successfully", error: null });
    } catch (e) {
      set({ error: handleError(e) });
    }
    return controller.abort();
  },
  updateProfile: async ({ profilePic }) => {
    try {
      const res = await apiClient.put<ApiSuccessResponse<User>>(
        "/users/profile",
        {
          profilePic,
        }
      );
      console.log(res);
      set({ authUser: res.data, message: res.message, error: null });
    } catch (e) {
      set({ error: handleError(e) });
      console.error(e);
    }
  },
}));
