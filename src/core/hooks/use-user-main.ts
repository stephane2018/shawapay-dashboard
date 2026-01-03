import { useQuery } from "@tanstack/react-query";
import { getUsersList } from "../services/user-main.service";

export const useUsersList = () => {
    return useQuery({
        queryKey: ["users-list"],
        queryFn: () => getUsersList(),
    });
};
