import { httpClient } from "../lib/http-client";
import { refractHttpError } from "../utils/http-error";

export interface LoginCredentials {
    username: string;
    password: string;
    [key: string]: unknown;
}

export const login = async (credentials: LoginCredentials): Promise<any> => {
    try {
        const response = await httpClient.post<any>(`/admin/user/login`, credentials, { skipAuth: true });
        return response;
    } catch (error) {
        return Promise.reject(refractHttpError(error));
    }
};

export const getCaisseInfos = async (): Promise<any> => {
    try {
        const response = await httpClient.post<any>(`/admin/caisse`, {});
        console.log(response);
        return response;
    } catch (error) {
        return Promise.reject(refractHttpError(error));
    }
};
