import { httpClient } from "../lib/http-client";
import { refractHttpError } from "../utils/http-error";
import type { CustomerResponse } from "../types/customer.types";

export interface GetCustomersParams {
    page?: number;
    size?: number;
    sort?: string;
}

export const getCustomers = async (params?: GetCustomersParams): Promise<CustomerResponse> => {
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

        const url = `/admin/user/shawa/list`;
        const response = await httpClient.post<CustomerResponse>(url, {}, { params: Object.fromEntries(queryParams) });
        return response;
    } catch (error) {
        return Promise.reject(refractHttpError(error));
    }
};
