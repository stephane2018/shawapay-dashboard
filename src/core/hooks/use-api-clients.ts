import { useQuery } from "@tanstack/react-query";
import { getApiClients, type GetApiClientsParams } from "../services/api-client.service";

export const useApiClients = (params?: GetApiClientsParams) => {
    return useQuery({
        queryKey: ["api-clients", params],
        queryFn: () => getApiClients(params),
    });
};
