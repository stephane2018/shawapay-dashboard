import type { PaginatedResponse } from "./customer.types";

export interface ApiClient {
    id: string;
    active: boolean;
    owner: string;
    apiKey: string;
}

export type ApiClientResponse = PaginatedResponse<ApiClient>;
