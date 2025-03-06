import { useState, useEffect } from 'react';

/**
 * Custom hook for managing reservation filters and filtered results
 *
 * @param {Array} allReservations - Array of all reservation objects
 * @returns {Object} Filter state and methods
 */
export const useReservationFilters = (allReservations) => {
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [filters, setFilters] = useState({
        name: '',
        date: '',
        startTime: '',
        endTime: '',
        table: '',
        status: ''
    });

    // Initialize filtered reservations with all reservations
    useEffect(() => {
        setFilteredReservations(allReservations);
    }, [allReservations]);

    // Apply filters whenever the filter values change
    useEffect(() => {
        applyFilters();
    }, [filters, allReservations]);

    // Filter function
    const applyFilters = () => {
        let results = [...allReservations];

        // Filter by name
        if (filters.name) {
            results = results.filter(res =>
                res.fullName.toLowerCase().includes(filters.name.toLowerCase())
            );
        }

        // Filter by date
        if (filters.date) {
            results = results.filter(res => res.date === filters.date);
        }

        // Filter by start time
        if (filters.startTime) {
            results = results.filter(res => res.startTime === filters.startTime);
        }

        // Filter by end time
        if (filters.endTime) {
            results = results.filter(res => res.endTime === filters.endTime);
        }

        // Filter by table
        if (filters.table) {
            results = results.filter(res => res.tableId);
        }

        // Filter by status
        if (filters.status) {
            results = results.filter(res => res.status === filters.status);
        }

        setFilteredReservations(results);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            name: '',
            date: '',
            startTime: '',
            endTime: '',
            table: '',
            status: ''
        });
        setFilteredReservations(allReservations);
    };

    return {
        filters,
        filteredReservations,
        handleFilterChange,
        clearFilters
    };
};