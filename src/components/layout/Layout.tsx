import React, { ReactNode } from 'react';
import Header from './Header';
import ErrorBoundary from '../common/ErrorBoundary';

interface LayoutProps {
    children: ReactNode;
}

/**
 * Main layout wrapper for the application
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <ErrorBoundary>
                    {children}
                </ErrorBoundary>
            </main>
            <footer className="bg-gray-100 mt-10">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Transaction Dashboard. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;

