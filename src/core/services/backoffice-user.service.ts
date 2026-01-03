import { httpClient } from "../lib/http-client";
import { refractHttpError } from "../utils/http-error";
import type { BackofficeUserResponse } from "../types/backoffice-user.types";

export interface GetBackofficeUsersParams {
    page?: number;
    size?: number;
    sort?: string;
}

export const getBackofficeUsers = async (params?: GetBackofficeUsersParams): Promise<BackofficeUserResponse> => {
    try {
        const queryParams = new URLSearchParams();

        if (params?.page !== undefined) {
            queryParams.append('page', params.page.toString());
        }
        if (params?.size !== undefined) {
            queryParams.append('size', params.size.toString());
        }
        if (params?.sort) {
            queryParams.append('sort', params.sort);
        }

        const url = `/admin/user/list`;
        const response = await httpClient.post<BackofficeUserResponse>(url, {}, { params: Object.fromEntries(queryParams) });
        return response;
    } catch (error) {
        return Promise.reject(refractHttpError(error));
    }
};
