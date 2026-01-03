import { useQuery } from "@tanstack/react-query";
import { getCustomers, type GetCustomersParams } from "../services/customer.service";

export const useCustomers = (params?: GetCustomersParams) => {
    return useQuery({
        queryKey: ["customers", params],
        queryFn: () => getCustomers(params),
    });
};
