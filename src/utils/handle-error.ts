import { ApiErrorResponse } from "@/types/response.type";
export const handleError = (e: unknown): ApiErrorResponse => {
  if (e && typeof e === "object" && "message" in e) {
    const apiError = e as ApiErrorResponse;
    return apiError;
  } else if (e instanceof Error) {
    return {
      message: e.message,
    };
  } else {
    return {
      message: "An error occurred",
    };
  }
};
