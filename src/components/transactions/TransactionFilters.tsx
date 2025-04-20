import React, { useState, useEffect, ChangeEvent } from 'react';
import { TransactionFilters as FiltersType, TransactionStatus } from '../../types';
import { useDebounce } from '../../hooks/useDebounce';
import DateRangePicker from '../common/DateRangePicker';

interface TransactionFiltersProps {
    onFilterChange: (filters: FiltersType) => void;
}


const TransactionFilters: React.FC<TransactionFiltersProps> = ({ onFilterChange }) => {
    const [search, setSearch] = useState<string>('');
    const [status, setStatus] = useState<TransactionStatus | ''>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [minAmount, setMinAmount] = useState<string>('');
    const [maxAmount, setMaxAmount] = useState<string>('');

    const debouncedSearch = useDebounce(search, 500);
    const debouncedMinAmount = useDebounce(minAmount, 500);
    const debouncedMaxAmount = useDebounce(maxAmount, 500);

    const handleReset = (): void => {
        setSearch('');
        setStatus('');
        setStartDate('');
        setEndDate('');
        setMinAmount('');
        setMaxAmount('');
    };

    useEffect(() => {
        onFilterChange({
            search: debouncedSearch,
            status,
            startDate,
            endDate,
            minAmount: debouncedMinAmount,
            maxAmount: debouncedMaxAmount
        });
    }, [debouncedSearch, status, startDate, endDate, debouncedMinAmount, debouncedMaxAmount, onFilterChange]);

    return (
        <div className="bg-white shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Filter Transactions</h3>

                <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-2">
                        <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                            Search by ID
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="search"
                                id="search"
                                value={search}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="Transaction ID"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                            Status
                        </label>
                        <div className="mt-1">
                            <select
                                id="status"
                                name="status"
                                value={status}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                    setStatus(e.target.value as TransactionStatus | '')}
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                                <option value="">All Statuses</option>
                                <option value="Completed">Completed</option>
                                <option value="Pending">Pending</option>
                                <option value="Failed">Failed</option>
                            </select>
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="amount-range" className="block text-sm font-medium text-gray-700">
                            Amount Range
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <div className="relative flex items-stretch flex-grow focus-within:z-10">
                                <input
                                    type="number"
                                    name="min-amount"
                                    id="min-amount"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                                    placeholder="Min $"
                                    value={minAmount}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setMinAmount(e.target.value)}
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                            <div className="flex-shrink-0 inline-flex items-center px-3 border border-l-0 border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                to
                            </div>
                            <div className="relative flex items-stretch flex-grow focus-within:z-10">
                                <input
                                    type="number"
                                    name="max-amount"
                                    id="max-amount"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                    placeholder="Max $"
                                    value={maxAmount}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setMaxAmount(e.target.value)}
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                        </div>
                    </div>


                    <div className="sm:col-span-6">
                        <label className="block text-sm font-medium text-gray-700">
                            Date Range
                        </label>
                        <div className="mt-1">
                            <DateRangePicker
                                startDate={startDate}
                                endDate={endDate}
                                onStartDateChange={setStartDate}
                                onEndDateChange={setEndDate}
                            />
                        </div>
                    </div>
                </div>


                <div className="mt-6 flex justify-end">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionFilters;