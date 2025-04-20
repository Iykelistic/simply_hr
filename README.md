# Transaction Dashboard (TypeScript + Vite)

A comprehensive React-based dashboard for viewing, filtering, and creating financial transactions, built with TypeScript and Vite.

## Features

- **Transaction List View**: Display transactions with ID, amount, status, and date
- **Advanced Filtering**: Search by ID, filter by status, date range, and amount range
- **Create New Transactions**: Form with validation for adding new transactions
- **Responsive Design**: Fully responsive UI that works on desktop and mobile
- **Authentication**: Simulated login functionality with protected routes
- **Error Handling**: Comprehensive error states and loading indicators

## Technical Implementation

- React with TypeScript for type safety
- Vite for fast development and optimized builds
- React Router for navigation
- React Query for data fetching, caching, and state management
- TailwindCSS for styling and responsive design
- React Hook Form for form state and validation
- Error boundaries for graceful error handling
- Vitest for unit testing

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. Clone the repository

2. Install dependencies:
```bash
npm install
# or with yarn
yarn
```

3. Start the development server:
```bash
npm run dev
# or with yarn
yarn dev
```

The app will be available at http://localhost:3000.

### Authentication

- For demo purposes, use the following credentials:
  - Username: `user`
  - Password: `password`


## API Endpoints

The app uses a simulated API with the following endpoints:

- `GET /transactions` - Get a list of transactions with optional filtering
- `POST /transactions` - Create a new transaction
- `POST /login` - Authenticate a user

In a real application, I would replace the mock API in `services/api.ts` with actual API calls.


## Build for Production

```bash
npm run build
# or with yarn
yarn build
```

This command builds the app for production to the `dist` folder.

## Key Implementation Details

### Type Safety

The application leverages TypeScript for enhanced type safety:

- Strong typing for all components and functions
- Interface definitions for data models
- Type guards for runtime safety
- Generic typing for reusable components

### Error Handling

The application has several layers of error handling:

1. **Input Validation**: Form inputs are validated before submission
2. **API Error Handling**: All API requests are wrapped in try/catch blocks
3. **Error Boundaries**: React error boundaries catch and display errors in the UI
4. **Loading States**: Clear loading indicators during asynchronous operations

### State Management

- React Query handles server state (fetching, caching, updating)
- Local component state for UI elements
- Context API for global state like authentication

### Responsive Design

- Mobile-first approach using TailwindCSS
- Adaptive layouts for different screen sizes
- Optimized interactions for touch devices

### Performance Optimizations

- Vite's fast development server and optimized builds
- Debounced search inputs to reduce API calls
- Pagination to limit data loading
- React Query caching to minimize redundant requests
- Memoized components to reduce unnecessary re-renders

## Edge Cases Handled

- Empty data states
- Loading states
- Error states
- Invalid form inputs
- Network failures
- Authentication failures
- Pagination edge cases
- Filter combinations
- Date validation (preventing future dates)
- Amount validation (ensuring positive values)
- Mobile-friendly UI adaptations
- Session handling (local storage)

## Future Enhancements

- Sorting functionality for the transaction list
- Export functionality (CSV, PDF)
- Data visualization (charts, graphs)
- Dark mode theme
- Advanced filtering options
- User preferences storage
- Real-time updates with WebSockets or something