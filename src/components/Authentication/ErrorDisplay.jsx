import React from 'react';

/**
 * Component to display error messages
 *
 * @param {string} error - Error message to display
 * @returns {JSX.Element|null} Error display component or null if no error
 */
const ErrorDisplay = ({ error }) => {
    if (!error) return null;

    return (
        <div className="auth-error">
            {error}
        </div>
    );
};

export default ErrorDisplay;