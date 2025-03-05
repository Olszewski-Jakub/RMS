import styled from 'styled-components';

// Main container for the reservation section
export const ReserveTableContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  width: 100%;
  background-color: #f8f9fa;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 992px) {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    gap: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

// Floor plan container
export const FloorPlanContainer = styled.div`
  flex: 3;
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    padding: 1rem;
    flex: 1;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

// Styled form container
export const FormContainer = styled.div`
  flex: 2;
  padding: 2rem;
  background: linear-gradient(135deg, #ff7b00 0%, #ff9a44 100%);
  color: white;
  border-radius: 8px;
  
  h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    
    h3 {
      font-size: 1.3rem;
      margin-bottom: 1rem;
      text-align: center;
    }
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    
    h3 {
      font-size: 1.2rem;
    }
  }
`;

// Form group for labels and inputs
export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
    
    label {
      font-size: 0.9rem;
    }
  }
`;

// Styled select elements
export const StyledSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: white;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem;
    font-size: 16px; /* Prevents zoom on iOS */
    border-radius: 4px;
  }
`;

// Styled input elements
export const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: white;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
  }
  
  &::placeholder {
    color: #aaa;
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem;
    font-size: 16px; /* Prevents zoom on iOS */
    border-radius: 4px;
  }
`;

// Time selector container
export const TimeSelectContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  
  select {
    flex: 1;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
    
    select {
      width: 100%;
    }
  }
`;

// Search button
export const SearchButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #ffffff;
  color: #ff7b00;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #f8f8f8;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    background-color: #e0e0e0;
    color: #999;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 0.9rem;
    min-height: 44px; /* Better touch target */
  }
`;

// Table component
export const Table = styled.div`
  position: relative;
  background-color: ${props => props.isActive ? '#8cb369' : '#718096'};
  border-radius: 4px;
  cursor: ${props => props.isActive ? 'pointer' : 'not-allowed'};
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  touch-action: manipulation; /* Improves touch handling */
  
  &:hover {
    transform: ${props => props.isActive ? 'translateY(-2px)' : 'none'};
    box-shadow: ${props => props.isActive ? '0 4px 8px rgba(0, 0, 0, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.2)'};
  }
  
  &::after {
    content: "${props => props.tableId}";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-weight: bold;
    font-size: ${props => props.isMobile ? '0.9rem' : '1rem'};
  }
  
  @media (max-width: 768px) {
    &:hover {
      transform: none; /* Remove hover effect on mobile */
    }
  }
`;

// Chair component
export const Chair = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #b85c38;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

// Legend component for the floor plan
export const Legend = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 10px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 5;
  
  @media (max-width: 768px) {
    padding: 8px;
    right: 5px;
    top: 5px;
    font-size: 0.8rem;
  }
`;

// Legend item
export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  @media (max-width: 768px) {
    gap: 5px;
  }
`;

// Error message
export const ErrorMessage = styled.div`
  background-color: #fff1f0;
  border: 1px solid #ffa39e;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  color: #cf1322;
  font-weight: 500;
  display: flex;
  align-items: center;
  
  &::before {
    content: "⚠️";
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    
    &::before {
      font-size: 1rem;
    }
  }
`;

// Page title
export const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: #2d3748;
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  
  &::after {
    content: "";
    width: 80px;
    height: 4px;
    background: linear-gradient(135deg, #ff7b00 0%, #ff9a44 100%);
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    
    &::after {
      width: 60px;
      height: 3px;
      bottom: -8px;
    }
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 1.2rem;
    
    &::after {
      width: 50px;
    }
  }
`;

// Success message
export const SuccessMessage = styled.div`
  background-color: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  color: #52c41a;
  font-weight: 500;
  display: flex;
  align-items: center;
  
  &::before {
    content: "✅";
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    
    &::before {
      font-size: 1rem;
    }
  }
`;