import { useQuery } from "@tanstack/react-query";
import { getBackofficeUsers, type GetBackofficeUsersParams } from "../services/backoffice-user.service";

export const useBackofficeUsers = (params?: GetBackofficeUsersParams) => {
    return useQuery({
        queryKey: ["backoffice-users", params],
        queryFn: () => getBackofficeUsers(params),
    });
};
