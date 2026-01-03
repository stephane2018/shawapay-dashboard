import { useQuery } from "@tanstack/react-query";
import { getTransactions, type GetTransactionsParams } from "../services/transaction.service";

export const useTransactions = (params?: GetTransactionsParams) => {
    return useQuery({
        queryKey: ["transactions", params],
        queryFn: () => getTransactions(params),
    });
};
