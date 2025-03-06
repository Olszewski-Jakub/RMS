// LoadingIndicator.jsx
import React from 'react';
import './LoadingIndicator.css';

const LoadingIndicator = ({size = 'medium', fullScreen = false, text = 'Loading...'}) => {
    const sizeClass = {
        small: 'loading-indicator-sm',
        medium: 'loading-indicator-md',
        large: 'loading-indicator-lg'
    }[size] || 'loading-indicator-md';

    return (
        <div className={`loading-indicator-container ${fullScreen ? 'fullscreen' : ''}`}>
            <div className={`loading-indicator ${sizeClass}`}>
                <div className="spinner">
                    <div className="dot dot1"></div>
                    <div className="dot dot2"></div>
                    <div className="dot dot3"></div>
                </div>
                {text && <div className="loading-text">{text}</div>}
            </div>
        </div>
    );
};

export default LoadingIndicator;