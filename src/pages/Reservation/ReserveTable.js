import React, {useState, useEffect} from "react";
import {ReserveTableContainer, PageTitle, ErrorMessage, SuccessMessage} from "./ReserveTableStyle";
import DateTimeForm from "./DateTimeForm";
import reservationService from "../../services/reservation.service";
import FloorPlan from "../../components/FloorPlan/FloorPlan";
import ReservationModal from "../../components/Reservation/ReservationModal";

const ReserveTable = () => {
    const [date, setDate] = useState(null);
    const [startTime, setStartTime] = useState({hour: '12', minute: '00', ampm: 'AM'});
    const [endTime, setEndTime] = useState({hour: '01', minute: '30', ampm: 'PM'});
    const [number, setNumber] = useState('');
    const [freeTables, setFreeTables] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    // State for modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTableId, setSelectedTableId] = useState(null);

    // Check if screen size is mobile
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Initial check
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const formatDateTime = (date, time) => {
        try {
            if (!date || !(date instanceof Date) || isNaN(date)) {
                console.error("Invalid date object:", date);
                return null;
            }

            const formattedDate = date.toISOString().split('T')[0];

            // Validate time object
            if (!time || !time.hour || !time.minute || !time.ampm) {
                console.error("Invalid time object:", time);
                return null;
            }

            const hours = parseInt(time.hour, 10);

            // Validate hours
            if (isNaN(hours) || hours < 1 || hours > 12) {
                console.error("Invalid hours:", time.hour);
                return null;
            }

            const adjustedHours = time.ampm === 'PM' ? (hours === 12 ? 12 : hours + 12) : (hours === 12 ? 0 : hours);

            return `${formattedDate}T${String(adjustedHours).padStart(2, '0')}:${time.minute}:00`;
        } catch (err) {
            console.error("Error formatting date time:", err);
            return null;
        }
    };

    const validateInputs = () => {
        setError(null);

        if (!date) {
            setError("Please select a date before searching");
            return false;
        }

        if (!(date instanceof Date) || isNaN(date)) {
            setError("Invalid date. Please select a valid date");
            return false;
        }

        if (!startTime || !endTime) {
            setError("Please select start and end times");
            return false;
        }

        // Calculate start and end times in minutes for comparison
        const startHour = parseInt(startTime.hour, 10);
        const startMinute = parseInt(startTime.minute, 10);
        const startInMinutes = (startTime.ampm === 'PM' && startHour !== 12 ? startHour + 12 : startHour) * 60 + startMinute;

        const endHour = parseInt(endTime.hour, 10);
        const endMinute = parseInt(endTime.minute, 10);
        const endInMinutes = (endTime.ampm === 'PM' && endHour !== 12 ? endHour + 12 : endHour) * 60 + endMinute;

        // Check if end time is after start time
        if (endInMinutes <= startInMinutes) {
            setError("End time must be after start time");
            return false;
        }

        return true;
    };

    const handleSearch = async () => {
        console.log("Search button clicked!");

        setSuccess(null);
        setSearchPerformed(true);

        try {
            setLoading(true);
            setError(null);

            // Validate inputs
            if (!validateInputs()) {
                setLoading(false);
                return;
            }

            const startDateTime = formatDateTime(date, startTime);
            const endDateTime = formatDateTime(date, endTime);

            // Validate formatted date times
            if (!startDateTime || !endDateTime) {
                setError("Invalid date or time format. Please try again");
                setLoading(false);
                return;
            }

            console.log("Sending request to API with:");
            console.log("Start Time:", startDateTime);
            console.log("End Time:", endDateTime);

            const response = await reservationService.getFreeTables(startDateTime, endDateTime);

            // Validate API response
            if (!response || !Array.isArray(response)) {
                console.error("Unexpected API response format:", response);
                setError("Received invalid data from the server. Please try again");
                setLoading(false);
                return;
            }
            const availableTables = response;
            setFreeTables(availableTables);

            if (availableTables.length === 0) {
                setError("No tables available for the selected time. Please try another time");
            } else {
                setSuccess(`Found ${availableTables.length} available table${availableTables.length > 1 ? 's' : ''}. Click on a green table to make your reservation`);
            }

        } catch (err) {
            console.error('Error fetching tables:', err);

            if (err.response && err.response.status === 401) {
                setError("Authentication error. Please log in again to continue");
            } else {
                setError("Failed to fetch available tables. Please try again");
            }
        } finally {
            setLoading(false);
        }
    };

    // Handle table selection - now opens the modal instead of immediate reservation
    const handleTableSelect = (tableId) => {
        console.log("FloorPlan selected:", tableId);

        // Only proceed if we have valid reservation data
        if (!validateInputs()) {
            console.error("Invalid reservation data. Please check your inputs and try again");
            return;
        }

        // Only allow selection of available tables
        const selectedTable = freeTables.find(table => table.id.toString() === tableId);
        if (!selectedTable || !selectedTable.isActive) {
            console.error(`Table ${tableId} is not available for reservation`);
            return;
        }


        setSelectedTableId(tableId);
        setIsModalOpen(true);
    };

    // Process the actual reservation
    const handleConfirmReservation = async (tableId) => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(null);

            // Validate inputs
            if (!validateInputs()) {
                setLoading(false);
                setIsModalOpen(false);
                return;
            }

            const startDateTime = formatDateTime(date, startTime);
            const endDateTime = formatDateTime(date, endTime);

            // Validate formatted date times
            if (!startDateTime || !endDateTime) {
                setError("Invalid date or time format. Please try again");
                setLoading(false);
                setIsModalOpen(false);
                return;
            }

            // Validate people number
            let peopleCount;
            try {
                peopleCount = parseInt(number, 10);
                if (isNaN(peopleCount) || peopleCount < 1) {
                    setError("Please enter a valid number of people");
                    setLoading(false);
                    setIsModalOpen(false);
                    return;
                }
            } catch (err) {
                setError("Please enter a valid number of people");
                setLoading(false);
                setIsModalOpen(false);
                return;
            }

            console.log("Creating reservation with:", {
                tableId,
                startDateTime,
                endDateTime,
                people: peopleCount
            });

            await reservationService.create(
                parseInt(tableId, 10),
                startDateTime,
                endDateTime,
                peopleCount
            );

            const updatedTables = freeTables.map((table) =>
                table.id === tableId ? {...table, isActive: false} : table
            );

            console.log("Updated Tables after reservation:", updatedTables);
            setFreeTables(updatedTables);
            console.log(`Table ${tableId} is now set to inactive.`);

            // Close the modal
            setIsModalOpen(false);

            // Show success message
            setSuccess(`Reservation confirmed for Table ${tableId} on ${date.toLocaleDateString()} at ${startTime.hour}:${startTime.minute} ${startTime.ampm} for ${peopleCount} ${peopleCount > 1 ? 'people' : 'person'}`);

        } catch (err) {
            console.error('Error creating reservation:', err);

            // Close the modal
            setIsModalOpen(false);

            // Provide more specific error messages based on the error
            if (err.response) {
                const status = err.response.status;
                if (status === 400) {
                    setError('Invalid reservation data. Please check your inputs and try again');
                } else if (status === 409) {
                    setError('This table has already been reserved. Please choose another table');
                } else if (status === 401) {
                    setError("Authentication error. Please log in again to continue");
                } else {
                    setError(`Failed to create reservation (Error ${status}). Please try again`);
                }
            } else if (err.request) {
                setError('Network error. Please check your connection and try again');
            } else {
                setError('Failed to create reservation. Please try again');
            }
        } finally {
            setLoading(false);
        }
    };

    // Close modal handler
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div id="reserve" style={{
            padding: isMobile ? '1.5rem 1rem' : '3rem 2rem',
            maxWidth: '1300px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <PageTitle style={{fontSize: isMobile ? '1.5rem' : '2rem', margin: isMobile ? '0 0 1rem' : '0 0 1.5rem'}}>
                Interactive Floor Plan
            </PageTitle>

            {error && <ErrorMessage style={{fontSize: isMobile ? '0.9rem' : '1rem'}}>{error}</ErrorMessage>}
            {success && <SuccessMessage style={{fontSize: isMobile ? '0.9rem' : '1rem'}}>{success}</SuccessMessage>}

            <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column-reverse' : 'row',
                gap: isMobile ? '1.5rem' : '2rem',
                width: '100%'
            }}>
                <ReserveTableContainer>
                    <FloorPlan
                        freeTables={freeTables}
                        onTableSelect={handleTableSelect}
                    />
                </ReserveTableContainer>
                <div style={{
                    width: isMobile ? '100%' : '40%'
                }}>
                    <DateTimeForm
                        date={date}
                        setDate={setDate}
                        startTime={startTime}
                        setStartTime={setStartTime}
                        endTime={endTime}
                        setEndTime={setEndTime}
                        number={number}
                        setNumber={setNumber}
                        onSearch={handleSearch}
                        loading={loading}
                        isMobile={isMobile}
                    />
                </div>
            </div>

            {

            }
            <ReservationModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                tableId={selectedTableId}
                date={date}
                startTime={startTime}
                endTime={endTime}
                people={number}
                onConfirm={handleConfirmReservation}
                loading={loading}
            />
        </div>
    );
};

export default ReserveTable;