import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Horizontal legend at the bottom of the floor plan
const LegendContainer = styled.div`
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%); 
    background-color: rgba(255, 255, 255, 0.5); 
    border-radius: 20px;
    padding: 4px 12px;
    display: flex;
    flex-direction: row; 
    align-items: center;
    gap: 12px;
    border: 1px solid rgba(234, 234, 234, 0.3);
    font-size: ${props => props.isMobile ? '0.7rem' : '0.8rem'};
    pointer-events: none;
    backdrop-filter: blur(2px);
    z-index: 80;
`;

const LegendItem = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

const ColorBox = styled.div`
    width: ${props => props.isMobile ? '10px' : '12px'};
    height: ${props => props.isMobile ? '10px' : '12px'};
    border-radius: 2px;
    background-color: ${props => props.color};
`;

const LegendText = styled.span`
    color: #333;
    font-weight: 500;
    white-space: nowrap;
`;

// Bottom positioned Legend component
const Legend = ({ isMobile }) => {
    return (
        <LegendContainer isMobile={isMobile}>
            <LegendItem>
                <ColorBox color="#8cb369" isMobile={isMobile} />
                <LegendText>Available</LegendText>
            </LegendItem>
            <LegendItem>
                <ColorBox color="#718096" isMobile={isMobile} />
                <LegendText>Reserved</LegendText>
            </LegendItem>
        </LegendContainer>
    );
};

Legend.propTypes = {
    isMobile: PropTypes.bool
};

Legend.defaultProps = {
    isMobile: false
};

export default Legend;