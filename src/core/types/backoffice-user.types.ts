import type { PaginatedResponse } from "./customer.types";

export interface BackofficeUser {
    id: string;
    username: string;
    email: string;
    role: string;
    active: boolean;
    createdAt: string;
    lastLogin?: string;
}

export type BackofficeUserResponse = PaginatedResponse<BackofficeUser>;
