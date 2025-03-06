// src/pages/Menu/Menu.js
import React, { useState, useEffect } from "react";
import "./Menu.css";
import menuItems from "../../constants/MenuItems.js";
import { FaRegClock, FaSearch, FaShoppingCart, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { IoFastFoodOutline, IoFlameOutline } from "react-icons/io5";
import { FiPlus, FiMinus } from "react-icons/fi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const images = require.context("../../assets/menuFoodImages", false, /\.(png|jpg|jpeg|webp|avif)$/);
menuItems.forEach(item => {
  item.image = images(`./food${item.id}.png`);
});

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(menuItems);
  const [cart, setCart] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileCart, setShowMobileCart] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  // Check screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Extract unique categories
  useEffect(() => {
    const uniqueCategories = ["All", ...new Set(menuItems.map(item => item.category))];
    setCategories(uniqueCategories);
  }, []);

  // Filter items based on search and category
  useEffect(() => {
    let filtered = menuItems;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.time.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (activeCategory !== "All") {
      filtered = filtered.filter(item => item.category === activeCategory);
    }

    setFilteredItems(filtered);
  }, [searchTerm, activeCategory]);

  const addToCart = item => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      setCart(
        cart.map(cartItem => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem))
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = itemId => {
    setCart(
      cart
        .map(item => (item.id === itemId && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item))
        .filter(item => item.quantity > 0)
    );
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
  };

  const toggleMobileCart = () => {
    setShowMobileCart(!showMobileCart);
  };

  const getItemTotalPrice = item => {
    return (Number(item.price) * item.quantity).toFixed(2);
  };

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const stickyElement = document.querySelector(".sticky-searchbar");
      if (window.scrollY > 48) {
        // 3rem in pixels
        stickyElement.classList.add("sticky-padding");
      } else {
        stickyElement.classList.remove("sticky-padding");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className='menu-page'>
      <div
        style={{
          display: "flex",
          gap: "2rem",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 1rem",
          position: "relative",
        }}>
        {}
        <div
          className='menu-container'
          style={{
            width: !isMobile && cart.length > 0 ? "calc(100% - 350px)" : "100%",
          }}>
          {}
          <div className='sticky-searchbar'>
            <div className='searchbar-container'>
              <div className='search-input-wrapper'>
                <FaSearch className='search-icon' />
                <input
                  type='text'
                  placeholder='Search for food, category, or time...'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className='food-searchbar'
                />
              </div>
            </div>
          </div>

          {}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
              overflow: "auto",
              padding: "0.5rem 0 1.5rem",
              gap: "0.75rem",
              scrollbarWidth: "none",
            }}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "2rem",
                  border: "none",
                  backgroundColor: activeCategory === category ? "var(--primary)" : "var(--white)",
                  color: activeCategory === category ? "white" : "var(--text-medium)",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  fontWeight: activeCategory === category ? "600" : "normal",
                  boxShadow: activeCategory === category ? "0 4px 10px rgba(255, 125, 5, 0.2)" : "var(--shadow-soft)",
                  transition: "var(--transition)",
                }}>
                {category}
              </button>
            ))}
          </div>

          {}
          <h2 className='menu-section-title'>Our Menu</h2>

          {}
          <div className='menuItems-container'>
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <div key={item.id} className='menu-item'>
                  <div className='item-image-container'>
                    {}
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  </div>
                  <div className='menu-item-content'>
                    <h3 className='menu-item-name'>{item.name}</h3>
                    <div className='menu-item-badges'>
                      <span className='menu-item-badge'>{item.category}</span>
                    </div>
                    <div className='menu-item-details-container'>
                      <div className='menu-item-info-container'>
                        <div className='menu-item-info'>
                          <FaRegClock className='info-icon' /> {item.time}
                        </div>
                        <div className='menu-item-info'>
                          <IoFlameOutline className='info-icon' /> {item.kcal} kcal
                        </div>
                      </div>
                      <div className='menu-item-btn-container'>
                        <div className='menu-item-price'>&euro;{Number(item.price).toFixed(2)}</div>
                        <button className='item-btn' onClick={() => addToCart(item)}>
                          <FiPlus />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  padding: "3rem 0",
                  color: "var(--text-light)",
                }}>
                No items found. Try a different search.
              </div>
            )}
          </div>
        </div>

        {}
        {!isMobile && cart.length > 0 && (
          <div className='checkout-container'>
            <div className='checkout-header-container'>
              <FaShoppingCart className='cart-icon' />
              <h3 className='checkout-title'>Your Order</h3>
            </div>
            <div className='ordered-items-container'>
              {cart.map(item => (
                <div key={item.id} className='ordered-item'>
                  <div className='ordered-item-header'>
                    <div className='ordered-name-container'>
                      <p className='ordered-name'>{item.name}</p>
                    </div>
                    <span className='ordered-item-price'>&euro;{getItemTotalPrice(item)}</span>
                  </div>
                  <div className='ordered-btn-container'>
                    <button className='quantity-btn' onClick={() => removeFromCart(item.id)}>
                      <FiMinus size={14} />
                    </button>
                    <span className='quantity-value'>{item.quantity}</span>
                    <button className='quantity-btn' onClick={() => addToCart(item)}>
                      <FiPlus size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className='ordered-total-container'>
              <span className='total-label'>Total</span>
              <span className='total-value'>&euro;{getTotal().toFixed(2)}</span>
            </div>
            <button className='checkout-btn'>
              Proceed to Checkout
              <MdOutlineKeyboardArrowRight size={20} />
            </button>
          </div>
        )}

        {}
        {isMobile && cart.length > 0 && (
          <div className='mobile-cart-toggle' onClick={toggleMobileCart}>
            <div className='mobile-cart-info'>
              <FaShoppingCart className='mobile-cart-icon' />
              <span className='mobile-cart-total'>
                &euro;{getTotal().toFixed(2)} • {cart.reduce((acc, item) => acc + item.quantity, 0)} items
              </span>
            </div>
            <div className='mobile-cart-toggle-icon'>{showMobileCart ? <FaChevronDown /> : <FaChevronUp />}</div>
          </div>
        )}

        {}
        {isMobile && showMobileCart && (
          <div
            className='mobile-cart-visible'
            onClick={e => {
              if (e.target === e.currentTarget) {
                setShowMobileCart(false);
              }
            }}>
            <div className='mobile-cart-content'>
              <div className='checkout-header-container'>
                <FaShoppingCart className='cart-icon' />
                <h3 className='checkout-title'>Your Order</h3>
              </div>
              <div className='ordered-items-container'>
                {cart.map(item => (
                  <div key={item.id} className='ordered-item'>
                    <div className='ordered-item-header'>
                      <div className='ordered-name-container'>
                        <p className='ordered-name'>{item.name}</p>
                      </div>
                      <span className='ordered-item-price'>&euro;{getItemTotalPrice(item)}</span>
                    </div>
                    <div className='ordered-btn-container'>
                      <button className='quantity-btn' onClick={() => removeFromCart(item.id)}>
                        <FiMinus size={14} />
                      </button>
                      <span className='quantity-value'>{item.quantity}</span>
                      <button className='quantity-btn' onClick={() => addToCart(item)}>
                        <FiPlus size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className='ordered-total-container'>
                <span className='total-label'>Total</span>
                <span className='total-value'>&euro;{getTotal().toFixed(2)}</span>
              </div>
              <button className='checkout-btn'>
                Proceed to Checkout
                <MdOutlineKeyboardArrowRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
