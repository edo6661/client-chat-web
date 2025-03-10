import {
  ApiErrorResponse,
  APIPaginatedResponse,
  ApiSuccessResponse,
} from "@/types/response.type";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
export const DELOYED_BASE_API_URL =
  "https://cold-augustina-edawg666-0300851b.koyeb.app";
export const BASE_API_URL = "http://localhost:5000";
export const BASE_URL = `${BASE_API_URL}/api/v1`;

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 20000,
    });
  }

  private handleError(error: AxiosError<ApiErrorResponse>): never {
    const errorMessage = error.response?.data.message || "Request failed";
    const errors = error.response?.data.errors || [];
    const status = error.response?.status;

    throw {
      message: errorMessage,
      errors,
      status,
      originalError: error,
    };
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.instance.get<ApiSuccessResponse<T>>(
        url,
        config
      );
      return response.data as T;
    } catch (error) {
      return this.handleError(error as AxiosError<ApiErrorResponse>);
    }
  }

  public async getPaginated<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<APIPaginatedResponse<T>> {
    try {
      const response = await this.instance.get<APIPaginatedResponse<T>>(
        url,
        config
      );
      return response.data;
    } catch (error) {
      return this.handleError(error as AxiosError<ApiErrorResponse>);
    }
  }

  public async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.instance.post<ApiSuccessResponse<T>>(
        url,
        data,
        config
      );
      return response.data as T;
    } catch (error) {
      return this.handleError(error as AxiosError<ApiErrorResponse>);
    }
  }

  public async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.instance.put<ApiSuccessResponse<T>>(
        url,
        data,
        config
      );
      return response.data as T;
    } catch (error) {
      return this.handleError(error as AxiosError<ApiErrorResponse>);
    }
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.instance.delete<ApiSuccessResponse<T>>(
        url,
        config
      );
      return response.data as T;
    } catch (error) {
      return this.handleError(error as AxiosError<ApiErrorResponse>);
    }
  }
}

export const apiClient = new ApiClient();
