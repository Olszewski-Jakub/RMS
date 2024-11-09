// MenuStyles.js
import { createGlobalStyle } from 'styled-components';

export const MenuStyles = createGlobalStyle`
  #menu {
    padding: 4rem 0;
  }

  #menu .container {
    max-width: 56rem;
    margin: 0 auto;
    padding: 0 1rem;
  }

  #menu h2 {
    font-family: serif;
    font-size: 1.875rem;
    text-align: center;
    margin-bottom: 2rem;
  }

  .tab-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .tab-button {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .tab-button.active {
    background-color: #111827;
    color: white;
  }

  .tab-button:not(.active) {
    background-color: #f3f4f6;
  }

  .menu-items {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .menu-item-info h3 {
    font-size: 1.25rem;
    font-weight: 500;
    margin: 0;
  }

  .menu-item-info p {
    color: #4b5563;
    margin: 0.25rem 0 0 0;
  }

  .menu-item-price {
    font-size: 1.25rem;
    font-weight: 500;
  }
`;