import React, { useState } from 'react';
import { MenuStyles } from './MenuStyle';
import MenuTabs from './MenuTabs';
import MenuItems from './MenuItems';

const MenuSection = () => {
  const menuItems = {
    appetizers: [
      { name: 'Crispy Calamari', description: 'Lightly fried with citrus aioli', price: '$14' },
      { name: 'Garden Salad', description: 'Fresh seasonal greens', price: '$12' }
    ],
    main: [
      { name: 'Grilled Salmon', description: 'Atlantic salmon with herbs', price: '$32' },
      { name: 'Filet Mignon', description: '8oz center cut beef', price: '$45' }
    ],
    desserts: [
      { name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a molten center', price: '$10' },
      { name: 'Tiramisu', description: 'Espresso', price: '$12' }
    ],
    drinks: [
      { name: 'Margarita', description: 'Tequila, lime juice, triple sec', price: '$14' },
      { name: 'Old Fashioned', description: 'Bourbon, sugar, bitters', price: '$16' }
    ]
  };

  const [activeMenuTab, setActiveMenuTab] = useState('main');

  return (
    <div id="menu">
      <MenuStyles />
      <section>
        <div className="container">
          <h2>Our Menu</h2>
          <MenuTabs menuItems={menuItems} activeMenuTab={activeMenuTab} setActiveMenuTab={setActiveMenuTab} />
          <MenuItems items={menuItems[activeMenuTab]} />
        </div>
      </section>
    </div>
  );
};

export default MenuSection;