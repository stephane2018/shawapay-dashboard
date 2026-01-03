import { httpClient } from "../lib/http-client";
import { refractHttpError } from "../utils/http-error";
import type { TransactionResponse } from "../types/transaction.types";

export interface GetTransactionsParams {
    page?: number;
    size?: number;
    sort?: string;
}

export const getTransactions = async (params?: GetTransactionsParams): Promise<TransactionResponse> => {
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

        const url = `/operation/transactions`;
        const response = await httpClient.post<TransactionResponse>(url, {}, { params: Object.fromEntries(queryParams) });
        return response;
    } catch (error) {
        return Promise.reject(refractHttpError(error));
    }
};
