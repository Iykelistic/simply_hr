export const formatDate = (dateString: string, format = 'MMM DD, YYYY'): string => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }

    // Simple formatting implementation
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const fullMonths = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    let result = format;

    // Replace year
    result = result.replace('YYYY', year.toString());
    result = result.replace('YY', String(year).slice(-2));

    // Replace month
    result = result.replace('MMMM', fullMonths[month]);
    result = result.replace('MMM', months[month]);
    result = result.replace('MM', String(month + 1).padStart(2, '0'));
    result = result.replace('M', (month + 1).toString());

    // Replace day
    result = result.replace('DD', String(day).padStart(2, '0'));
    result = result.replace('D', day.toString());

    return result;
};

export const isDateInFuture = (dateString: string): boolean => {
    const date = new Date(dateString);
    const today = new Date();

    // Reset time parts to compare only dates
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    return date > today;
};

/**
 * Get today's date in YYYY-MM-DD format
 * @returns Today's date in YYYY-MM-DD format
 */
export const getTodayString = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

/**
 * Convert date string to YYYY-MM-DD format
 * @param date - Date to convert
 * @returns Date in YYYY-MM-DD format
 */
export const formatDateForInput = (date: string | Date | null | undefined): string => {
    if (!date) return '';

    const d = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(d.getTime())) {
        return '';
    }

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

