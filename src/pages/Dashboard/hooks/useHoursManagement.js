import { useState } from 'react';
import openingHoursService from "../../../services/openingHours.service";

/**
 * Custom hook for managing opening hours
 *
 * @param {Array} openingHours - Array of opening hours
 * @param {Function} setOpeningHours - Setter for opening hours
 * @param {Function} setLoading - Setter for loading state
 * @returns {Object} Hours management state and functions
 */
export const useHoursManagement = (
    openingHours,
    setOpeningHours,
    setLoading
) => {
    const [editingHours, setEditingHours] = useState(false);

    // Handle changing opening hours fields
    const handleHoursChange = (dayId, field, value) => {
        setOpeningHours((prevHours) =>
            prevHours.map((day) =>
                day.dayId === dayId ? {...day, [field]: value} : day
            )
        );
    };

    // Toggle day open/closed
    const handleToggleDay = (dayId) => {
        setOpeningHours((prevHours) =>
            prevHours.map((hours) =>
                hours.dayId === dayId ? {...hours, isOpen: !hours.isOpen} : hours
            )
        );
    };

    // Toggle edit mode
    const toggleHoursEditMode = () => {
        setEditingHours(!editingHours);
    };

    // Save hours to the server
    const saveHours = async () => {
        setLoading(true);
        setEditingHours(false);
        try {
            for (const hour of openingHours) {
                if (hour.isOpen === false) {
                    hour.startTime = null;
                    hour.endTime = null;
                }
                await openingHoursService.update(hour.dayId, hour.startTime, hour.endTime, hour.day);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    return {
        editingHours,
        handleHoursChange,
        handleToggleDay,
        toggleHoursEditMode,
        saveHours
    };
};