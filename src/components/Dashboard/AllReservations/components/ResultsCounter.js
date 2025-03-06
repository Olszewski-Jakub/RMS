import React from 'react';

/**
 * Component to display the count of filtered reservations
 *
 * @param {number} filteredCount - Number of reservations after filtering
 * @param {number} totalCount - Total number of reservations
 */
const ResultsCounter = ({ filteredCount, totalCount }) => {
    return (
        <div className="results-count">
            Showing {filteredCount} of {totalCount} reservations
        </div>
    );
};

export default ResultsCounter;