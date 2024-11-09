import React from 'react';
import PropTypes from 'prop-types';

const MenuItems = ({ items }) => {
  return (
    <div className="menu-items">
      {items.map((item, index) => (
        <div key={index} className="menu-item">
          <div className="menu-item-info">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
          <span className="menu-item-price">{item.price}</span>
        </div>
      ))}
    </div>
  );
};
MenuItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MenuItems;
