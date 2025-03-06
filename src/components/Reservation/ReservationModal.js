import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 450px;
  padding: 1.5rem;
  position: relative;
  animation: modalFadeIn 0.3s ease;
  
  @keyframes modalFadeIn {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 0.75rem;
`;

const ModalTitle = styled.h3`
  margin: 0;
  color: #333;
  font-size: 1.25rem;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  transition: color 0.2s;
  
  &:hover {
    color: #ff6b6b;
  }
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 0.75rem;
  
  &:last-of-type {
    margin-bottom: 1.5rem;
  }
`;

const InfoLabel = styled.span`
  flex: 0 0 120px;
  font-weight: 500;
  color: #555;
`;

const InfoValue = styled.span`
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const CancelButton = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: #f1f1f1;
  color: #333;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #e1e1e1;
  }
`;

const ReserveButton = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: #8cb369;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #7a9e58;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ReservationModal = ({
                              isOpen,
                              onClose,
                              tableId,
                              date,
                              startTime,
                              endTime,
                              people,
                              onConfirm,
                              loading
                          }) => {
    if (!isOpen) return null;

    // Format date and time for display
    const formatDate = (date) => {
        if (!date || !(date instanceof Date) || isNaN(date)) return 'Not specified';
        return date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    const formatTime = (time) => {
        if (!time || !time.hour || !time.minute || !time.ampm) return 'Not specified';
        return `${time.hour}:${time.minute} ${time.ampm}`;
    };

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm(tableId);
        }
    };

    // Prevent clicks inside the modal from closing it
    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={handleModalClick}>
                <ModalHeader>
                    <ModalTitle>Reserve Table #{tableId}</ModalTitle>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                </ModalHeader>

                <InfoRow>
                    <InfoLabel>Date:</InfoLabel>
                    <InfoValue>{formatDate(date)}</InfoValue>
                </InfoRow>

                <InfoRow>
                    <InfoLabel>Time:</InfoLabel>
                    <InfoValue>{formatTime(startTime)} to {formatTime(endTime)}</InfoValue>
                </InfoRow>

                <InfoRow>
                    <InfoLabel>Party Size:</InfoLabel>
                    <InfoValue>{people || 'Not specified'} {people && people !== 1 ? 'people' : 'person'}</InfoValue>
                </InfoRow>

                <ButtonContainer>
                    <CancelButton onClick={onClose}>Cancel</CancelButton>
                    <ReserveButton
                        onClick={handleConfirm}
                        disabled={loading || !people || !date}
                    >
                        {loading ? 'Processing...' : 'Confirm Reservation'}
                    </ReserveButton>
                </ButtonContainer>
            </ModalContent>
        </ModalOverlay>
    );
};

ReservationModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    tableId: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    startTime: PropTypes.shape({
        hour: PropTypes.string,
        minute: PropTypes.string,
        ampm: PropTypes.string
    }),
    endTime: PropTypes.shape({
        hour: PropTypes.string,
        minute: PropTypes.string,
        ampm: PropTypes.string
    }),
    people: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onConfirm: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

ReservationModal.defaultProps = {
    loading: false
};

export default ReservationModal;