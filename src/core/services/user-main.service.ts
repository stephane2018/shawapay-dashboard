import { httpClient } from "../lib/http-client";
import { refractHttpError } from "../utils/http-error";

export const getUsersList = async (): Promise<any> => {
    try {
        const response = await httpClient.get<any>(`/admin/user/shawa/list`);
        return response;
    } catch (error) {
        return Promise.reject(refractHttpError(error));
    }
};
