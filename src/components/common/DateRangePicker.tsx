import React from 'react';
import { formatDateForInput } from '../../utils/dateUtils';

interface DateRangePickerProps {
    startDate: string;
    endDate: string;
    onStartDateChange: (date: string) => void;
    onEndDateChange: (date: string) => void;
    maxDate?: string | Date;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    maxDate
}) => {
    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStartDate = e.target.value;
        onStartDateChange(newStartDate);

        if (endDate && new Date(endDate) < new Date(newStartDate)) {
            onEndDateChange(newStartDate);
        }
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEndDate = e.target.value;
        onEndDateChange(newEndDate);

        if (startDate && new Date(startDate) > new Date(newEndDate)) {
            onStartDateChange(newEndDate);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row gap-2">
            <div className="w-full sm:w-1/2">
                <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                    From
                </label>
                <input
                    type="date"
                    id="start-date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    max={formatDateForInput(maxDate || new Date())}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div className="w-full sm:w-1/2">
                <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
                    To
                </label>
                <input
                    type="date"
                    id="end-date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    max={formatDateForInput(maxDate || new Date())}
                    min={startDate}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
        </div>
    );
};

export default DateRangePicker;