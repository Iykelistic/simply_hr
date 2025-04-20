import { TransactionFormData, ValidationResult, FormErrors } from '../types';
import { isDateInFuture } from './dateUtils';

/**
 * Check if a value is a valid positive number
 * @param value - Value to check
 * @returns True if value is a valid positive number
 */
export const isPositiveNumber = (value: string | number): boolean => {
    const number = parseFloat(value as string);
    return !isNaN(number) && number > 0;
};

/**
 * Format a number as currency
 * @param value - Value to format
 * @param currency - Currency symbol (default: '$')
 * @param locale - Locale for number formatting (default: 'en-US')
 * @returns Formatted currency string
 */
export const formatCurrency = (
    value: number | string | null | undefined,
    currency = '$',
    locale = 'en-US'
): string => {
    if (value === null || value === undefined) return 'Invalid Amount';

    const number = parseFloat(value as string);

    if (isNaN(number)) {
        return 'Invalid Amount';
    }

    return `${currency}${number.toLocaleString(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
};


export const validateTransactionForm = (data: TransactionFormData): ValidationResult => {
    const errors: Record<string, string | undefined> = {};

    if (!data.amount) {
        errors.amount = 'Amount is required';
    } else if (!isPositiveNumber(data.amount)) {
        errors.amount = 'Amount must be a positive number';
    }

    if (!data.status) {
        errors.status = 'Status is required';
    } else if (!['Completed', 'Pending', 'Failed'].includes(data.status)) {
        errors.status = 'Invalid status';
    }

    if (!data.date) {
        errors.date = 'Date is required';
    } else if (isDateInFuture(data.date)) {
        errors.date = 'Date cannot be in the future';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};