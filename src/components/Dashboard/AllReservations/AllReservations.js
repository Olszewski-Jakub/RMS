import React from 'react';
import './AllReservations.css';

// Component imports
import ReservationsTable from './components/ReservationsTable';
import FilterSidebar from './components/FilterSidebar';
import ResultsCounter from './components/ResultsCounter';

// Custom hooks
import { useReservationFilters } from './hooks/useReservationFilters';

/**
 * AllReservations component
 *
 * Main component for displaying and filtering reservations
 *
 * @param {Array} allReservations - All reservation data
 * @param {boolean} filtersVisible - Whether the filter sidebar is visible
 * @param {Function} setFiltersVisible - Function to set filter sidebar visibility
 */
const AllReservations = ({ allReservations, filtersVisible, setFiltersVisible }) => {
    // Use custom hook for filtering functionality
    const {
        filters,
        filteredReservations,
        handleFilterChange,
        clearFilters
    } = useReservationFilters(allReservations);

    // Get unique status options for the filter dropdown
    const statusOptions = [...new Set(allReservations.map(res => res.status))];

    // Toggle filter sidebar visibility
    const toggleFilters = () => {
        setFiltersVisible(!filtersVisible);
    };

    return (
        <div className="app-container">
            <div className="main-content-ar">
                {/* Results counter */}
                <ResultsCounter
                    filteredCount={filteredReservations.length}
                    totalCount={allReservations.length}
                />

                {/* Reservations table */}
                <ReservationsTable reservations={filteredReservations} />
            </div>

            {/* Filter sidebar */}
            <FilterSidebar
                isVisible={filtersVisible}
                filters={filters}
                statusOptions={statusOptions}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
                onToggle={toggleFilters}
            />
        </div>
    );
};

export default AllReservations;