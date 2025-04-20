import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TransactionFormData } from '../types';
import TransactionForm from '../components/transactions/TransactionForm';
import { useTransactions } from '../hooks/useTransactions';
import { Snackbar, Alert } from '@mui/material';

const NewTransactionPage: React.FC = () => {
    const navigate = useNavigate();
    const { createTransaction, isCreating, createError } = useTransactions();

    // Snackbar state to control visibility, message, and severity
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    // Handle form submission
    const handleSubmit = useCallback(
        async (formData: TransactionFormData) => {
            try {
                await createTransaction(formData);
                // Show success Snackbar
                setSnackbarSeverity('success');
                setSnackbarMessage('Transaction added successfully!');
                setOpenSnackbar(true); // Open the Snackbar

                // Navigate back to list on success
                navigate('/', { state: { success: 'Transaction created successfully' } });
            } catch (error) {
                // Show error Snackbar
                setSnackbarSeverity('error');
                setSnackbarMessage('Failed to create transaction');
                setOpenSnackbar(true); // Open the Snackbar
                console.error('Failed to create transaction:', error);
            }
        },
        [createTransaction, navigate]
    );

    // Close the Snackbar
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Create New Transaction</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Enter the details for the new transaction
                </p>
            </div>

            <TransactionForm
                onSubmit={handleSubmit}
                isSubmitting={isCreating}
                error={createError}
            />

            {/* Snackbar for success/error messages */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000} // Auto-hide after 6 seconds
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default NewTransactionPage;
