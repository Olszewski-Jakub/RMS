import React from "react";

/**
 * ErrorState component for displaying error messages
 */
const ErrorState = ({ message }) => {
    return (
        <div className="error-container">
            <div className="error-icon">❌</div>
            <p className="error-message">Error: {message}</p>
        </div>
    );
};

export default ErrorState;