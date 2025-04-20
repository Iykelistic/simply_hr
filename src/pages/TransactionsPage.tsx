import React, { useState, useCallback } from 'react';
import { TransactionFilters as FiltersType } from '../types';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionList from '../components/transactions/TransactionList';
import { useTransactions } from '../hooks/useTransactions';


const TransactionsPage: React.FC = () => {
    // State for filters and pagination
    const [filters, setFilters] = useState<FiltersType>({});
    const [page, setPage] = useState<number>(1);

    // Combine filters with pagination for API call
    const combinedFilters: FiltersType = {
        ...filters,
        page
    };

    // Fetch transactions using custom hook
    const {
        transactions,
        pagination,
        isLoading,
        error,
        refetch
    } = useTransactions(combinedFilters);

    // Handle filter changes
    const handleFilterChange = useCallback((newFilters: FiltersType) => {
        setFilters(newFilters);
        setPage(1); // Reset to first page when filters change
    }, []);

    // Handle page changes
    const handlePageChange = useCallback((newPage: number) => {
        setPage(newPage);
    }, []);

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
                <p className="mt-1 text-sm text-gray-500">
                    View and manage all transactions
                </p>
            </div>

            <TransactionFilters onFilterChange={handleFilterChange} />

            <TransactionList
                transactions={transactions}
                isLoading={isLoading}
                error={error}
                pagination={pagination}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default TransactionsPage;

