import { useState } from 'react';

/**
 * Custom hook for managing UI state
 *
 * @returns {Object} UI state and setter functions
 */
export const useUIState = () => {
    const [reservationFilterMode, setReservationFilterMode] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [loading, setLoading] = useState(false);

    // Toggle reservation filter mode
    const toggleReservationFilterMode = () => {
        setReservationFilterMode(!reservationFilterMode);
    };

    // Handle sidebar toggle
    const handleSidebarToggle = (isCollapsed) => {
        setSidebarCollapsed(isCollapsed);
    };

    return {
        reservationFilterMode,
        sidebarCollapsed,
        loading,
        setLoading,
        toggleReservationFilterMode,
        handleSidebarToggle
    };
};