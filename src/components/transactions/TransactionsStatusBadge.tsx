import React from 'react';
import { TransactionStatus } from '../../types';

interface TransactionStatusBadgeProps {
    status: TransactionStatus;
}


const TransactionStatusBadge: React.FC<TransactionStatusBadgeProps> = ({ status }) => {
    const colorScheme: Record<string, string> = {
        Completed: 'bg-green-100 text-green-800',
        Pending: 'bg-yellow-100 text-yellow-800',
        Failed: 'bg-red-100 text-red-800',
        default: 'bg-gray-100 text-gray-800'
    };

    const colors = colorScheme[status] || colorScheme.default;

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors}`}>
            {status}
        </span>
    );
};

export default TransactionStatusBadge;