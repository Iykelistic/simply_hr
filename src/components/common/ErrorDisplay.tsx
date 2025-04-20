import React from 'react';

interface ErrorDisplayProps {
    error: Error | { message: string } | null;
    retry?: (() => void) | null;
}

/**
 * Component to display errors consistently throughout the app
 */
const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, retry = null }) => {
    if (!error) return null;

    return (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 my-3">
            <div className="flex">
                <div className="flex-shrink-0">
                    {/* Error icon */}
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium">Error</h3>
                    <div className="mt-2 text-sm">
                        <p>{error.message || 'An unexpected error occurred'}</p>
                    </div>
                    {retry && (
                        <div className="mt-4">
                            <button
                                type="button"
                                className="px-3 py-2 text-sm font-medium text-red-800 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                                onClick={retry}
                            >
                                Try again
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ErrorDisplay;