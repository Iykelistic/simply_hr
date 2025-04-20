export type TransactionStatus = 'Completed' | 'Pending' | 'Failed';

export interface Transaction {
    id: string;
    amount: number;
    status: TransactionStatus;
    date: string;
}

export interface TransactionFilters {
    search?: string;
    status?: TransactionStatus | '';
    startDate?: string;
    endDate?: string;
    minAmount?: string;
    maxAmount?: string;
    page?: number;
    limit?: number;
}

export interface PaginationInfo {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface TransactionsResponse {
    data: Transaction[];
    pagination: PaginationInfo;
}

export interface TransactionFormData {
    amount: string;
    status: TransactionStatus;
    date: string;
}

export interface ValidationResult {
    isValid: boolean;
    errors: Record<string, string | undefined>;
}

export interface FormErrors {
    amount?: string;
    status?: string;
    date?: string;
}

export interface User {
    id: number;
    username: string;
    name: string;
}

export interface AuthCredentials {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    login: (credentials: AuthCredentials) => Promise<AuthResponse>;
    logout: () => void;
}

export interface ApiError extends Error {
    status?: number;
}