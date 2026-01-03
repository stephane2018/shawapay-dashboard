import type { PaginatedResponse } from "./customer.types";

export type TransactionType = "CREDIT" | "DEBIT";
export type AccountType = "PRIMARY" | "SECONDARY";
export type TransactionStatus = null | "PENDING" | "COMPLETED" | "FAILED";

export interface Transaction {
    id: string;
    type: TransactionType;
    status: TransactionStatus;
    amount: number;
    accountType: AccountType;
    createdAt: string;
    userId: string;
}

export type TransactionResponse = PaginatedResponse<Transaction>;
