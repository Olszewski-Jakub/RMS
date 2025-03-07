import reservationService from '../../../services/reservation.service';

/**
 * Custom hook for managing reservations
 *
 * @param {Array} pendingReservations - Array of pending reservations
 * @param {Function} setPendingReservations - Setter for pending reservations
 * @param {Function} setAllReservations - Setter for all reservations
 * @param {Function} setLoading - Setter for loading state
 * @returns {Object} Reservation management functions
 */
export const useReservationManagement = (
    pendingReservations,
    setPendingReservations,
    setAllReservations,
    setLoading
) => {
    // Handle approving a single reservation
    const handleApproveReservation = async (id) => {
        setLoading(true);
        const updatedPending = pendingReservations.filter((res) => res.id !== id);
        setPendingReservations(updatedPending);

        try {
            await reservationService.confirm(id);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }

        setAllReservations((prevReservations) =>
            prevReservations.map((res) =>
                res.id === id ? {...res, status: 'confirmed'} : res
            )
        );
    };

    // Handle approving all pending reservations
    const approveAllReservations = async () => {
        setLoading(true);
        const updatedPending = pendingReservations.filter((res) => res.status !== 'pending');
        setPendingReservations(updatedPending);

        try {
            for (const res of pendingReservations) {
                await handleApproveReservation(res.id);
                await new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds delay
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    // Handle rejecting a reservation
    const handleRejectReservation = async (id) => {
        setLoading(true);
        const updatedPending = pendingReservations.filter((res) => res.id !== id);
        setPendingReservations(updatedPending);

        try {
            await reservationService.cancel(id);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }

        setAllReservations((prevReservations) =>
            prevReservations.map((res) =>
                res.id === id ? {...res, status: 'Cancelled'} : res
            )
        );
    };

    return {
        handleApproveReservation,
        approveAllReservations,
        handleRejectReservation
    };
};