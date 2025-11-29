import axios, { type AxiosInstance, type AxiosInterceptorManager, type InternalAxiosRequestConfig, type AxiosResponse, type AxiosRequestConfig } from "axios";
import type { RequestBody } from "./api-type";
import { tokenManager } from "./token-manager./token-manager";
import { API_URL, REQUEST_HEADER_AUTH_KEY, TOKEN_TYPE, UNAUTHORIZED_STATUS_NUMBERS } from "../config/constante";
import { toast } from "sonner";


export class HttpClient {
  private static instance: HttpClient;
  private client: AxiosInstance;

  public interceptors: {
    request: AxiosInterceptorManager<InternalAxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };

  private constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        Accept: "application/json",
      },
      timeout: 60000, 
    });

    this.interceptors = this.client.interceptors;
    this.setupInterceptors();
  }

  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }

  public getClient(): AxiosInstance {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance.client;
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: RequestBody, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: RequestBody, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  public catchUnauthorizedResponse(callback: () => void) {
    return this.interceptors.response.use(
      (response) => response,
      (error) => {
        if (!error) {
          return Promise.reject(error);
        }

        const { response } = error;

        if (response && UNAUTHORIZED_STATUS_NUMBERS.includes(response.status)) {
          callback();
          toast.error("Session expirée. Veuillez vous reconnecter.");
          window.location.href = "/login";
        }

        return Promise.reject(error);
      }
    );
  }

  public rejectResponseInterceptor(interceptorId: number) {
    this.interceptors.response.eject(interceptorId);
  }

  public rejectRequestInterceptor(interceptorId: number) {
    this.interceptors.request.eject(interceptorId);
  }

  private setupInterceptors() {
    this.withAuthorization();
    this.withMultipartFormData();
  }

  private withAuthorization() {
    this.interceptors.request.use((config) => {
      const requestConfig = { ...config };

      const token = tokenManager.getToken();

      if (token) {
        requestConfig.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE} ${token}`;
      }

      return requestConfig;
    });
  }

  private withMultipartFormData() {
    this.interceptors.request.use((config) => {
      const requestConfig = { ...config };

      if (!requestConfig.headers["Content-Type"]) {
        if (config.data instanceof FormData) {
          requestConfig.headers["Content-Type"] = "multipart/form-data";
        } else if (config.data !== undefined) {
          requestConfig.headers["Content-Type"] = "application/json";
        }
      }

      return requestConfig;
    });
  }
}

export const httpClient = HttpClient.getInstance();
