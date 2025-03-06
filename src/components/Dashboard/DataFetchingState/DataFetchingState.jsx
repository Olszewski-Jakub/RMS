// DataFetchingState.jsx
import React from 'react';
import LoadingIndicator from '../Loading/LoadingIndicator';
import './DataFetchingState.css';

const DataFetchingState = ({
                               isLoading,
                               isError,
                               isEmpty,
                               loadingText = 'Loading data...',
                               errorText = 'Something went wrong. Please try again.',
                               emptyText = 'No data available.',
                               onRetry = null,
                               children
                           }) => {
    if (isLoading) {
        return <LoadingIndicator text={loadingText}/>;
    }

    if (isError) {
        return (
            <div className="data-state-container error">
                <div className="data-state-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
                <div className="data-state-text">{errorText}</div>
                {onRetry && (
                    <button
                        className="data-state-retry-button"
                        onClick={onRetry}
                    >
                        Try Again
                    </button>
                )}
            </div>
        );
    }

    if (isEmpty) {
        return (
            <div className="data-state-container empty">
                <div className="data-state-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                    </svg>
                </div>
                <div className="data-state-text">{emptyText}</div>
            </div>
        );
    }

    return children;
};

export default DataFetchingState;