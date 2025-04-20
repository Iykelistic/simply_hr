import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Transaction, 
  TransactionFilters, 
  TransactionFormData,
  TransactionsResponse 
} from '../types';
import API from '../services/api';

interface UseTransactionsReturn {
  transactions: Transaction[];
  pagination: TransactionsResponse['pagination'] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<unknown>;
  createTransaction: (data: TransactionFormData) => void;
  isCreating: boolean;
  createError: Error | null;
  useTransaction: (id: string) => {
    transaction: Transaction | undefined;
    isLoading: boolean;
    error: Error | null;
  };
}

export function useTransactions(filters: TransactionFilters = {}): UseTransactionsReturn {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['transactions', filters],
    queryFn: () => API.getTransactions(filters),
    placeholderData: keepPreviousData => keepPreviousData, 
    staleTime: 1000 * 60 * 5,
  });
  

  const { 
    mutate: createTransaction, 
    isPending: isCreating, 
    error: createError 
  } = useMutation({
    mutationFn: (newTransaction: TransactionFormData) => API.createTransaction(newTransaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
  
  const useTransaction = (id: string) => {
    const { data: transaction, isLoading, error } = useQuery({
      queryKey: ['transaction', id],
      queryFn: () => API.getTransaction(id),
      enabled: !!id, // Only run query if ID exists
    });
    
    return { transaction, isLoading, error: error as Error | null };
  };
  
  return {
    transactions: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    error: error as Error | null,
    refetch,
    createTransaction,
    isCreating,
    createError: createError as Error | null,
    useTransaction,
  };
}