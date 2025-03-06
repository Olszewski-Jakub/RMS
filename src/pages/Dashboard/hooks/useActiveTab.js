import { useState, useEffect } from 'react';
import reservationService from '../../../services/reservation.service';
import openingHoursService from "../../../services/openingHours.service";
import tableService from "../../../services/table.service";
import userService from "../../../services/user.service";

/**
 * Custom hook for managing active tab and related data fetching
 *
 * @param {string} initialTab - Initial active tab
 * @param {Function} setAllReservations - Setter for all reservations
 * @param {Function} setOpeningHours - Setter for opening hours
 * @param {Function} setPendingReservation - Setter for pending reservations
 * @param {Function} setTables - Setter for tables
 * @param {Function} setEmployees - Setter for employees
 * @param {Function} setLoading - Setter for loading state
 * @returns {Array} Active tab and function to change active tab
 */
export const useActiveTab = (
    initialTab = 'pendingReservations',
    setAllReservations,
    setOpeningHours,
    setPendingReservation,
    setTables,
    setEmployees,
    setLoading
) => {
    const [activeTab, setActiveTab] = useState(initialTab);

    // Set initial hash based on initialTab
    useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (hash && ['pendingReservations', 'hours', 'tables', 'employees', 'allReservations'].includes(hash)) {
            setActiveTab(hash);
        } else {
            window.location.hash = initialTab;
        }
    }, [initialTab]);

    // Update tab when hash changes
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            if (hash && hash !== activeTab) {
                setActiveTab(hash);
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [activeTab]);

    // Handler for tab changes
    const handleTabChange = (newTab) => {
        if (window.location.hash !== `#${newTab}`) {
            window.location.hash = newTab;
        }
        setActiveTab(newTab);
    };

    // Fetch data based on active tab
    useEffect(() => {
        console.log(`Active tab changed to: ${activeTab}`);

        const fetchData = async () => {
            setLoading(true);

            try {
                switch (activeTab) {
                    case 'allReservations':
                        try {
                            const allReservationResponse = await reservationService.getAll();
                            const refactoredReservations = allReservationResponse.map(reservation => {
                                const start = new Date(reservation.startTime);
                                const end = new Date(reservation.endTime);
                                return {
                                    ...reservation,
                                    date: start.toISOString().split('T')[0],
                                    startTime: start.toISOString().split('T')[1].split('.')[0],
                                    endTime: end.toISOString().split('T')[1].split('.')[0],
                                };
                            });
                            setAllReservations(refactoredReservations);
                        } catch (error) {
                            console.error('Failed to fetch all reservations:', error);
                        }
                        break;
                    case "hours":
                        try {
                            const openingHoursReposne = await openingHoursService.getAll();
                            const hours = [];
                            for (const h of openingHoursReposne) {
                                h.isOpen = h.startTime != null && h.endTime != null;
                                hours.push(h);
                            }
                            setOpeningHours(hours);
                        } catch (error) {
                            console.error('Failed to fetch opening hours:', error);
                        }
                        break;
                    case "pendingReservations":
                        try {
                            const pendingReservationResponse = await reservationService.getByStatus("pending");
                            const refactoredReservations = pendingReservationResponse.map(reservation => {
                                const start = new Date(reservation.startTime);
                                const end = new Date(reservation.endTime);
                                return {
                                    ...reservation,
                                    date: start.toISOString().split('T')[0],
                                    startTime: start.toISOString().split('T')[1].split('.')[0],
                                    endTime: end.toISOString().split('T')[1].split('.')[0],
                                };
                            });
                            setPendingReservation(refactoredReservations);
                        } catch (e) {
                            console.log(e);
                        }
                        break;
                    case "tables":
                        try {
                            const tables = await tableService.getAll();
                            setTables(tables);
                        } catch (e) {
                            console.log(e);
                        }
                        break;
                    case "employees":
                        try {
                            const employees = await userService.getAllPrivilegedUsers();
                            setEmployees(employees);
                        } catch (e) {
                            console.log(e);
                        }
                        break;
                    default:
                        console.log(activeTab);
                        break;
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [activeTab, setAllReservations, setOpeningHours, setPendingReservation, setTables, setEmployees, setLoading]);

    return [activeTab, handleTabChange];
};