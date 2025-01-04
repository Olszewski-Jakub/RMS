import React, { useState, useEffect } from "react";
import "./Menu.css";
import menuItems from "../../constants/MenuItems.js";
import { FaRegClock } from "react-icons/fa6";

const Menu = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState(menuItems);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const filtered = menuItems.filter(item => 
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            item.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
            item.time.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        setFilteredItems(filtered);

    }, [searchTerm]);

    const addToCart = (item) => {
        const existingItem = cart.find(cartItem => cartItem.id === item.id);

        if(existingItem){
            setCart(cart.map(cartItem => 
                cartItem.id === item.id
                ? {...cartItem, quantity: cartItem.quantity + 1}
                : cartItem
            ));
        }else{
            setCart([...cart, {...item, quantity: 1}]);
        }
    };

    const removeFromCart = (itemId) => {
        setCart(cart.map(item => 
            item.id === itemId && item.quantity > 1
            ? {...item, quantity: item.quantity - 1} 
            : item
        ).filter(item => item.quantity > 0));
    };
    
    const getTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      };

    return(
        <div className="menu-container">
            <div className="searchbar-container">
                <input 
                    type="text"
                    placeholder="Search for food"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="food-searchbar"
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
                        <p style={{marginTop: "0.5rem", marginBottom: "0.5rem", fontSize: "1.25rem"}}>{item.name}</p>
                        <div className="menu-item-details-container">
                            <div className="menu-item-info-container">
                                <span><FaRegClock style={{marginRight: "0.25rem"}}/> {item.time}</span>
                                <span>{item.kcal} kcal</span>
                            </div>
                            <div className="menu-item-btn-container">
                                <p style={{fontSize: "1.25rem", marginTop: "0.5rem"}}>&euro;{item.price}</p>
                                <button className="item-btn" onClick={() => console.log("+++")}>+</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Menu;
