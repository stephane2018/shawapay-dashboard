export interface Customer {
    profile: "CUSTOMER";
    createdAt: string;
    firstname: string;
    lastname: string;
    phone: string;
    validationStep: string | null;
    userId: string;
    isEnabled: boolean;
}

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface PaginatedResponse<T> {
    content: T[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export type CustomerResponse = PaginatedResponse<Customer>;
