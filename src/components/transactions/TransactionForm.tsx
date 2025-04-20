import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { TransactionFormData, TransactionStatus, FormErrors } from '../../types';
import { validateTransactionForm } from '../../utils/validationUtils';
import { isDateInFuture, getTodayString } from '../../utils/dateUtils';
import ErrorDisplay from '../common/ErrorDisplay';
import Loader from '../layout/Loader';

interface TransactionFormProps {
    onSubmit: (data: TransactionFormData) => void;
    isSubmitting: boolean;
    error: Error | null;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, isSubmitting, error }) => {
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState<TransactionFormData>({
        amount: '',
        status: 'Pending', // Default status
        date: getTodayString()
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        if (formErrors[name as keyof FormErrors]) {
            setFormErrors({
                ...formErrors,
                [name]: undefined
            });
        }

        if (name === 'date' && isDateInFuture(value)) {
            setFormErrors({
                ...formErrors,
                date: 'Date cannot be in the future'
            });
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validation = validateTransactionForm(formData);

        if (!validation.isValid) {
            setFormErrors(validation.errors);
            return;
        }


        onSubmit(formData);
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Create New Transaction
                </h3>

                {error && <ErrorDisplay error={error} />}

                <form onSubmit={handleSubmit} className="mt-5">
                    <div className="grid grid-cols-6 gap-6">

                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                Amount
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <input
                                    type="number"
                                    name="amount"
                                    id="amount"
                                    className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md ${formErrors.amount ? 'border-red-300' : ''
                                        }`}
                                    placeholder="0.00"
                                    aria-describedby="amount-currency"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    min="0.01"
                                    step="0.01"
                                    required
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm" id="amount-currency">
                                        USD
                                    </span>
                                </div>
                            </div>
                            {formErrors.amount && (
                                <p className="mt-2 text-sm text-red-600" id="amount-error">
                                    {formErrors.amount}
                                </p>
                            )}
                        </div>


                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${formErrors.status ? 'border-red-300' : ''
                                    }`}
                                value={formData.status}
                                onChange={handleChange}
                                required
                            >
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                                <option value="Failed">Failed</option>
                            </select>
                            {formErrors.status && (
                                <p className="mt-2 text-sm text-red-600" id="status-error">
                                    {formErrors.status}
                                </p>
                            )}
                        </div>


                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                Date
                            </label>
                            <input
                                type="date"
                                name="date"
                                id="date"
                                className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${formErrors.date ? 'border-red-300' : ''
                                    }`}
                                value={formData.date}
                                onChange={handleChange}
                                max={getTodayString()}
                                required
                            />
                            {formErrors.date && (
                                <p className="mt-2 text-sm text-red-600" id="date-error">
                                    {formErrors.date}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader size="small" text="" />
                                    <span className="ml-2">Saving...</span>
                                </>
                            ) : (
                                'Create Transaction'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TransactionForm;