import { createGlobalStyle } from 'styled-components';

export const LocationStyles = createGlobalStyle`
  .location-section {
    padding: 5rem 0;
    background-color: #f8f9fa;
  }

  .location-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .location-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .location-header h2 {
    font-size: 2.5rem;
    color: #1a1a1a;
    margin-bottom: 1rem;
    font-family: serif;
  }

  .location-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: start;
  }

  .contact-info {
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .info-group {
    margin-bottom: 1.5rem;
  }

  .info-group h3 {
    font-size: 1.25rem;
    color: #1a1a1a;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .info-group p {
    color: #666;
    line-height: 1.6;
    margin: 0;
  }

  .map-container {
    background: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .map {
    width: 100%;
    height: 400px;
    background-color: #e8e8e8;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
  }

  .operating-hours {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .day {
    color: #666;
  }

  .hours {
    color: #1a1a1a;
  }

  .contact-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background-color: #4a5568;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 1rem;
    text-decoration: none;
  }

  .contact-button:hover {
    background-color: #2d3748;
  }

  @media (max-width: 768px) {
    .location-content {
      grid-template-columns: 1fr;
    }
    
    .map {
      height: 300px;
    }
  }
`;