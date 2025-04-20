import {
    Transaction,
    TransactionFilters,
    TransactionsResponse,
    TransactionFormData,
    AuthCredentials,
    AuthResponse,
    ApiError,
    TransactionStatus,
    User
} from '../types';

const INITIAL_TRANSACTIONS: Transaction[] = [
    {
        id: "TRX001",
        amount: 1500.0,
        status: "Completed",
        date: "2024-10-28"
    },
    {
        id: "TRX002",
        amount: 500.5,
        status: "Pending",
        date: "2024-10-27"
    },
    {
        id: "TRX003",
        amount: 750.25,
        status: "Completed",
        date: "2024-10-26"
    },
    {
        id: "TRX004",
        amount: 1200.0,
        status: "Failed",
        date: "2024-10-25"
    },
    {
        id: "TRX005",
        amount: 320.75,
        status: "Completed",
        date: "2024-10-24"
    },
    {
        id: "TRX006",
        amount: 890.0,
        status: "Pending",
        date: "2024-10-23"
    },
    {
        id: "TRX007",
        amount: 1750.5,
        status: "Failed",
        date: "2024-10-22"
    },
    {
        id: "TRX008",
        amount: 430.25,
        status: "Completed",
        date: "2024-10-21"
    },
    {
        id: "TRX009",
        amount: 950.0,
        status: "Pending",
        date: "2024-10-20"
    },
    {
        id: "TRX010",
        amount: 2100.75,
        status: "Completed",
        date: "2024-10-19"
    }
];

const STORAGE_KEYS = {
    TRANSACTIONS: 'transaction_dashboard_data',
    AUTH_TOKEN: 'auth_token',
    AUTH_USER: 'auth_user'
};

const initializeTransactions = (): void => {
    try {
        if (!localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)) {
            localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(INITIAL_TRANSACTIONS));
        }
    } catch (error) {
        console.error('Error initializing transactions in localStorage:', error);
    }
};

const getStoredTransactions = (): Transaction[] => {
    initializeTransactions();
    try {
        const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
        return data ? JSON.parse(data) : INITIAL_TRANSACTIONS;
    } catch (error) {
        console.error('Error retrieving transactions from localStorage:', error);
        return INITIAL_TRANSACTIONS; 
    }
};

const updateStoredTransactions = (transactions: Transaction[]): void => {
    try {
        localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
    } catch (error) {
        console.error('Error storing transactions in localStorage:', error);
    }
};

const getStoredAuthToken = (): string | null => {
    try {
        return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
        console.error('Error retrieving auth token from localStorage:', error);
        return null;
    }
};

const getStoredAuthUser = (): User | null => {
    try {
        const userData = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.error('Error retrieving auth user from localStorage:', error);
        return null;
    }
};

const setStoredAuth = (token: string, user: User): void => {
    try {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
        localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
    } catch (error) {
        console.error('Error storing auth data in localStorage:', error);
    }
};

const clearStoredAuth = (): void => {
    try {
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    } catch (error) {
        console.error('Error clearing auth data from localStorage:', error);
    }
};

const delay = (ms: number): Promise<void> =>
    new Promise(resolve => setTimeout(resolve, ms));

const simulateResponse = async <T>(data: T, shouldFail = false, delayTime = 500): Promise<T> => {
    await delay(delayTime);

    if (shouldFail) {
        const error = new Error('API request failed') as ApiError;
        error.status = 500;
        throw error;
    }

    return data;
};

const verifyAuthToken = (token: string): boolean => {
    return token === 'mock-jwt-token';
};


const API = {
    getTransactions: async (filters: TransactionFilters = {}): Promise<TransactionsResponse> => {
        const {
            search = '',
            status = '',
            startDate = '',
            endDate = '',
            minAmount = '',
            maxAmount = '',
            page = 1,
            limit = 10
        } = filters;

        await delay(800);


        const storedTransactions = getStoredTransactions();

        let filteredTransactions = [...storedTransactions];


        if (search) {
            filteredTransactions = filteredTransactions.filter(
                tx => tx.id.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (status) {
            filteredTransactions = filteredTransactions.filter(
                tx => tx.status === status
            );
        }

        if (startDate && endDate) {
            filteredTransactions = filteredTransactions.filter(
                tx => {
                    const txDate = new Date(tx.date);
                    const start = new Date(startDate);
                    const end = new Date(endDate);
                    end.setHours(23, 59, 59, 999); 

                    return txDate >= start && txDate <= end;
                }
            );
        }

        if (minAmount !== '') {
            filteredTransactions = filteredTransactions.filter(
                tx => tx.amount >= parseFloat(minAmount)
            );
        }

        if (maxAmount !== '') {
            filteredTransactions = filteredTransactions.filter(
                tx => tx.amount <= parseFloat(maxAmount)
            );
        }

        const totalCount = filteredTransactions.length;

        const startIndex = (page - 1) * limit;
        const paginatedData = filteredTransactions.slice(startIndex, startIndex + limit);

        return {
            data: paginatedData,
            pagination: {
                total: totalCount,
                page,
                limit,
                totalPages: Math.ceil(totalCount / limit)
            }
        };
    },

    getTransaction: async (id: string): Promise<Transaction> => {
        await delay(500);

        const storedTransactions = getStoredTransactions();
        const transaction = storedTransactions.find(tx => tx.id === id);

        if (!transaction) {
            const error = new Error(`Transaction with ID ${id} not found`) as ApiError;
            error.status = 404;
            throw error;
        }

        return transaction;
    },

    createTransaction: async (transactionData: TransactionFormData): Promise<Transaction> => {
        if (!transactionData.amount || isNaN(parseFloat(transactionData.amount))) {
            const error = new Error('Invalid amount') as ApiError;
            error.status = 400;
            throw error;
        }

        if (!['Completed', 'Pending', 'Failed'].includes(transactionData.status)) {
            const error = new Error('Invalid status') as ApiError;
            error.status = 400;
            throw error;
        }

        if (!transactionData.date) {
            const error = new Error('Date is required') as ApiError;
            error.status = 400;
            throw error;
        }

        await delay(1000);

        const storedTransactions = getStoredTransactions();

        const highestId = storedTransactions.reduce((max, tx) => {
            const idNum = parseInt(tx.id.replace('TRX', ''));
            return idNum > max ? idNum : max;
        }, 0);

        const newTransaction: Transaction = {
            id: `TRX${String(highestId + 1).padStart(3, '0')}`,
            amount: parseFloat(transactionData.amount),
            status: transactionData.status,
            date: transactionData.date
        };

        const updatedTransactions = [newTransaction, ...storedTransactions];
        updateStoredTransactions(updatedTransactions);

        return newTransaction;
    },

    deleteTransaction: async (id: string): Promise<boolean> => {
        await delay(700);

        const storedTransactions = getStoredTransactions();
        const index = storedTransactions.findIndex(tx => tx.id === id);

        if (index === -1) {
            const error = new Error(`Transaction with ID ${id} not found`) as ApiError;
            error.status = 404;
            throw error;
        }

        storedTransactions.splice(index, 1);
        updateStoredTransactions(storedTransactions);

        return true;
    },

    login: async (credentials: AuthCredentials): Promise<AuthResponse> => {
        await delay(1000);

        const storedToken = getStoredAuthToken();
        const storedUser = getStoredAuthUser();

        if (storedToken && storedUser && verifyAuthToken(storedToken)) {
            return {
                token: storedToken,
                user: storedUser
            };
        }

        if (!credentials.username || !credentials.password) {
            const error = new Error('Username and password are required') as ApiError;
            error.status = 400;
            throw error;
        }

        if (credentials.username === 'user' && credentials.password === 'password') {
            const response = {
                token: 'mock-jwt-token',
                user: {
                    id: 1,
                    username: credentials.username,
                    name: 'Demo User'
                }
            };

            setStoredAuth(response.token, response.user);

            return response;
        } else {
            const error = new Error('Invalid credentials') as ApiError;
            error.status = 401;
            throw error;
        }
    },

    checkAuth: async (): Promise<AuthResponse | null> => {
        await delay(300);

        const token = getStoredAuthToken();
        const user = getStoredAuthUser();

        if (token && user && verifyAuthToken(token)) {
            return { token, user };
        }

        return null;
    },

    logout: async (): Promise<void> => {
        await delay(300);
        clearStoredAuth();
    },

    resetData: (): void => {
        try {
            localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(INITIAL_TRANSACTIONS));
        } catch (error) {
            console.error('Error resetting application data:', error);
        }
    }
};

export default API;