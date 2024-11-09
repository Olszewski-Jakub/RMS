import React from 'react';
import PropTypes from 'prop-types';

const MenuTabs = ({ menuItems, activeMenuTab, setActiveMenuTab }) => {
  return (
    <div className="tab-container">
      {Object.keys(menuItems).map((tab) => (
        <button
          key={tab}
          className={`tab-button ${activeMenuTab === tab ? 'active' : ''}`}
          onClick={() => setActiveMenuTab(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};
MenuTabs.propTypes = {
  menuItems: PropTypes.object.isRequired,
  activeMenuTab: PropTypes.string.isRequired,
  setActiveMenuTab: PropTypes.func.isRequired,
};

export default MenuTabs;