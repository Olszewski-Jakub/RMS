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
  }
`;

// Floor plan container
export const FloorPlanContainer = styled.div`
  flex: 3;
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.05);
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
`;

// Form group for labels and inputs
export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
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
`;

// Time selector container
export const TimeSelectContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  
  select {
    flex: 1;
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
`;

// Table component
export const Table = styled.div`
  position: relative;
  background-color: ${props => props.isActive ? '#8cb369' : '#718096'};
  border-radius: 4px;
  cursor: ${props => props.isActive ? 'pointer' : 'not-allowed'};
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
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
    font-size: 1rem;
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
`;