import type { PaginatedResponse } from "./customer.types";

export interface ApiClient {
    id: string;
    active: boolean;
    owner: string;
    apiKey: string;
    description?: string;
    permissions: string[];
    createdAt: string;
    lastUsed?: string;
}

export type ApiClientResponse = PaginatedResponse<ApiClient>;
