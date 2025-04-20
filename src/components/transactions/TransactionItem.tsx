import React from 'react';
import { Transaction } from '../../types';
import TransactionStatusBadge from './TransactionsStatusBadge';
import { formatDate } from '../../utils/dateUtils';
import { formatCurrency } from '../../utils/validationUtils';

interface TransactionItemProps {
    transaction: Transaction;
}

/**
 * Individual transaction item for the list
 */
const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
    const { id, amount, status, date } = transaction;

    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatCurrency(amount)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <TransactionStatusBadge status={status} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(date)}
            </td>
        </tr>
    );
};

export default TransactionItem;