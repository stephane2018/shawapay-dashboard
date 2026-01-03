import type { PaginatedResponse } from "./customer.types";

export interface BackofficeUser {
    id: string;
    username: string;
}

export type BackofficeUserResponse = PaginatedResponse<BackofficeUser>;
