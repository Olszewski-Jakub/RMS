import React, { useState, useEffect } from "react";
import "./Menu.css";
import menuItems from "../../constants/MenuItems.js";
import { FaRegClock } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

const Menu = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState(menuItems);
    const [cart, setCart] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const [showMobileCart, setShowMobileCart] = useState(false);

    // Check screen size
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        // Initial check
        handleResize();
        
        // Add event listener
        window.addEventListener('resize', handleResize);
        
        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
            item.id === itemId && item.quantity > 0
            ? {...item, quantity: item.quantity - 1} 
            : item
        ).filter(item => item.quantity > 0));
    };
    
    const getTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };
    
    const toggleMobileCart = () => {
        setShowMobileCart(!showMobileCart);
    };

    return(
        <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            position: "relative"
        }}>
            {/* Mobile Cart Toggle Button (only on mobile) */}
            {isMobile && cart.length > 0 && (
                <div 
                    style={{
                        position: "fixed",
                        bottom: showMobileCart ? "auto" : "0",
                        top: showMobileCart ? "0" : "auto",
                        left: "0",
                        right: "0",
                        backgroundColor: "#FF7D05",
                        padding: "0.5rem",
                        textAlign: "center",
                        cursor: "pointer",
                        zIndex: 100,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: showMobileCart ? "0 0 8px 8px" : "8px 8px 0 0",
                        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)"
                    }}
                    onClick={toggleMobileCart}
                >
                    <IoCartOutline style={{ color: "white", fontSize: "1.5rem", marginRight: "0.5rem" }} />
                    <span style={{ color: "white", fontWeight: "bold" }}>
                        {showMobileCart ? "Hide Cart" : `Your Order: €${getTotal().toFixed(2)}`}
                    </span>
                    {showMobileCart ? 
                        <BsChevronDown style={{ marginLeft: "0.5rem", color: "white" }} /> : 
                        <BsChevronUp style={{ marginLeft: "0.5rem", color: "white" }} />
                    }
                </div>
            )}
            
            <div className="menu-container" style={{
                width: (!isMobile && cart.length > 0) ? "80%" : "100%",
                marginBottom: isMobile ? "4rem" : "0"
            }}>
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
                    {filteredItems.map((item) => (
                        <div key={item.id} className="menu-item">
                            <div className="item-image-container">
                                <h1>Menu Image goes here</h1> 
                            </div>
                            <p style={{marginTop: "0.5rem", marginBottom: "0.5rem", fontSize: "1.25rem"}}>{item.name}</p>
                            <div className="menu-item-details-container">
                                <div className="menu-item-info-container">
                                    <span><FaRegClock style={{marginRight: "0.25rem"}}/> {item.time}</span>
                                    <span>{item.kcal} kcal</span>
                                </div>
                                <div className="menu-item-btn-container">
                                    <p style={{fontSize: "1.25rem", marginTop: "0.5rem"}}>&euro;{item.price}</p>
                                    <button className="item-btn" onClick={() => addToCart(item)}>+</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Desktop and Mobile Cart */}
            {cart.length > 0 && (
                <div className="checkout-container" style={{
                    display: isMobile ? (showMobileCart ? "block" : "none") : "block",
                    position: isMobile ? "fixed" : "relative",
                    top: isMobile ? "2.5rem" : "auto",
                    bottom: isMobile ? "0" : "auto",
                    left: isMobile ? "0" : "auto",
                    right: isMobile ? "0" : "auto",
                    backgroundColor: "white",
                    zIndex: isMobile ? "99" : "auto",
                    maxHeight: isMobile ? "80vh" : "auto",
                    overflowY: isMobile ? "auto" : "visible",
                    boxShadow: isMobile ? "0 -5px 15px rgba(0, 0, 0, 0.1)" : "none"
                }}>
                    <div className="checkout-header-container">
                        <IoCartOutline className="cart-icon"/>
                        <p>Your Order</p>
                    </div>
                    <div className="checkout-content-container">
                        {cart.map((item) => (
                            <div key={item.id} className="ordered-item">
                                <div className="ordered-name-container">
                                    <p>{item.name}</p>
                                </div>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    <span className="ordered-quantity">&euro;{item.price}</span>
                                    <div className="ordered-btn-container">
                                        <button onClick={() => removeFromCart(item.id)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => addToCart(item)}>+</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="ordered-total-container">
                            <span style={{color: "black"}}>Total : </span>
                            <span>&euro;{getTotal().toFixed(2)}</span>
                        </div>
                        <button style={{
                            width: "100%",
                            marginTop: "1.5rem",
                            padding: "1rem",
                            borderRadius: "1rem",
                            border: "none",
                            backgroundColor: "#FF7D05",
                            color: "white",
                            cursor:"pointer"
                            }}
                        >Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Menu;