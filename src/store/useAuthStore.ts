import { apiClient } from "@/lib/axios";
import { ApiErrorResponse, ApiSuccessResponse } from "@/types/response.type";
import { User } from "@/types/user.type";
import axios from "axios";
import { create } from "zustand";
import { toast } from "sonner";
import { RegisterState } from "@/state/register.state";
import { handleError } from "@/utils/handle-error";

export interface AuthStore {
  authUser: User | null;
  isCheckingAuth: boolean;
  message: string | null;
  isUpdatingProfile: boolean;
  error: ApiErrorResponse | null;
  checkAuth: () => Promise<void>;
  clearError: () => void;
  register: (data: RegisterState) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isCheckingAuth: true,
  message: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  error: null,
  clearError: () => set({ error: null }),

  checkAuth: async () => {
    const controller = new AbortController();

    try {
      const res = await apiClient.get<ApiSuccessResponse<User>>("/users/self");
      set({ authUser: res.data, message: res.message });
    } catch (error) {
      let errorMessage = "Failed to authenticate";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error("Authentication Error", {
        description: errorMessage,
        action: {
          label: "Dismiss",
          onClick: () => {
            toast.dismiss();
            set({ error: null });
          },
        },
      });
    } finally {
      set({ isCheckingAuth: false });
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

      set({ authUser: res.data, message: res.message });
    } catch (e) {
      set({ error: handleError(e) });
    }
    return controller.abort();
  },
  logout: async () => {
    const controller = new AbortController();
    try {
      await apiClient.post("/auth/logout");
      set({ authUser: null, message: "Logged out successfully" });
    } catch (e) {
      set({ error: handleError(e) });
    }
    return controller.abort();
  },
}));
