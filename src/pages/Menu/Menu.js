import React, { useState, useEffect } from "react";
import "./Menu.css";
import menuItems from "../../constants/MenuItems.js";

const Menu = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState(menuItems);

    useEffect(() => {
        const filtered = menuItems.filter(item => 
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            item.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredItems(filtered);

    }, [searchTerm]);

    return(
        <div className="menu-container">
            <div className="searchbar-container">
                <input 
                    type="text"
                    placeholder="Search for food"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}

                />
            </div>
            <div className="menuItems-container">
                {/*<div className="menu-item">
                    <div className="menu-item-image-container">
                        <h1>FOOD IMAGE</h1>
                    </div>
                    <div className="menu-item-details-container">
                        <h3>Food Name</h3>
                        <h3>Price</h3>
                        <h3>Description</h3>
                    </div>
                </div>*/}
                {filteredItems.map((item) => (
                    <div key={item.id} className="menu-item">
                        <div className="item-image-container">
                            <h1>Item Image</h1>
                        </div>
                        <div className="menu-item-details-container">
                            <h3>{item.name}</h3>
                            <h3>{item.price}</h3>
                            <h3>{item.description}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Menu;
