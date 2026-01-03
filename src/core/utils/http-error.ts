import { type AxiosError } from "axios";
import { type ErrorApiResponse } from "../lib/api-type";

export const refractHttpError = (error: unknown): string | ErrorApiResponse => {
    const axiosError = error as AxiosError<ErrorApiResponse>;

    if (axiosError.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const data = axiosError.response.data;
        if (data && data.message) {
            return data.message;
        }
        return `Error: ${axiosError.response.status} - ${axiosError.response.statusText}`;
    } else if (axiosError.request) {
        // The request was made but no response was received
        return "Aucune réponse du serveur. Veuillez vérifier votre connexion.";
    } else {
        // Something happened in setting up the request that triggered an Error
        return axiosError.message || "Une erreur inattendue est survenue.";
    }
};
