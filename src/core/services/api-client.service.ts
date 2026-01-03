import { httpClient } from "../lib/http-client";
import { refractHttpError } from "../utils/http-error";
import type { ApiClientResponse } from "../types/api-client.types";

export interface GetApiClientsParams {
    page?: number;
    size?: number;
    sort?: string;
}

export const getApiClients = async (params?: GetApiClientsParams): Promise<ApiClientResponse> => {
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

        const url = `/admin/user/api/client/list`;
        const response = await httpClient.post<ApiClientResponse>(url, {}, { params: Object.fromEntries(queryParams) });
        return response;
    } catch (error) {
        return Promise.reject(refractHttpError(error));
    }
};
