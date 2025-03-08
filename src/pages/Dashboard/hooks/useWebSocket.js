import { useState, useEffect } from 'react';

/**
 * Custom hook for WebSocket connection management
 *
 * @param {string} url - WebSocket URL
 * @param {string} activeTab - Current active tab
 * @param {Array} pendingReservations - Current pending reservations
 * @param {Function} setPendingReservations - Setter for pending reservations
 * @returns {Object} WebSocket related state
 */
export const useWebSocket = (url, activeTab, pendingReservations, setPendingReservations) => {
    const [messageData, setMessageData] = useState(null);

    useEffect(() => {
        // Establish the WebSocket connection
        const ws = new WebSocket(url);

        ws.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.onmessage = (event) => {
            // Parse the incoming message
            const parsedMessage = JSON.parse(event.data);

            // Extract the 'data' field from the message and store it in the state
            if (parsedMessage && parsedMessage.data) {
                console.log('Received message:', parsedMessage.data);
                setMessageData(parsedMessage.data);

                switch (activeTab) {
                    case 'pendingReservations':
                        // Check if ID is in pending reservations
                        const id = parsedMessage.data.id;
                        const reservation = pendingReservations.find((res) => res.id === id);
                        console.log(parsedMessage.data);
                        if (!reservation) {
                            const startTime = new Date(parsedMessage.data.startTime * 1000);
                            const endTime = new Date(parsedMessage.data.endTime * 1000);
                            const newReservation = {
                                ...parsedMessage.data,
                                startTime: startTime.toISOString().split('T')[1].split('.')[0], // Extract time part
                                endTime: endTime.toISOString().split('T')[0], // Extract date part
                                date: startTime.toISOString().split('T')[0] // Extract date part
                            };
                            setPendingReservations((prevReservations) => {
                                const reservationMap = new Map(prevReservations.map(res => [res.id, res]));
                                reservationMap.set(id, newReservation);
                                return Array.from(reservationMap.values());
                            });
                        }
                        break;
                    default:
                        break;
                }
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket Error: ', error);
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
        };

        // Cleanup WebSocket connection when the component is unmounted
        return () => {
            ws.close();
        };
    }, [url, activeTab, pendingReservations, setPendingReservations]);

    return { messageData };
};