import React from "react";

/**
 * LoadingState component for displaying a loading spinner and message
 */
const LoadingState = ({ message = "Loading floor plan..." }) => {
    return (
        <div className="loading-container">
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
            <p className="loading-text">{message}</p>
        </div>
    );
};

export default LoadingState;