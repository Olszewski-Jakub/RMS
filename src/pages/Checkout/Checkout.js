import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import "./Checkout.css";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get cart from location state or from localStorage if it's available
  const { cart = [] } = location.state || { cart: JSON.parse(localStorage.getItem("cart")) || [] };

  const [updatedCart, setUpdatedCart] = useState(cart);

  // Get total of the order
  const getTotal = () => {
    return updatedCart.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
  };

  // Save cart to localStorage whenever it is updated
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }, [updatedCart]);

  // Navigate back to Menu page
  const handleBackToMenu = () => {
    // Save the current cart to localStorage before navigating back
    navigate("/menu", { state: { cart: updatedCart } });
  };

  // Handle item quantity change
  const addToCart = item => {
    const updatedCartList = updatedCart.map(cartItem =>
      cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
    setUpdatedCart(updatedCartList);
  };

  const removeFromCart = item => {
    const updatedCartList = updatedCart
      .map(cartItem =>
        cartItem.id === item.id && cartItem.quantity > 0 ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
      )
      .filter(cartItem => cartItem.quantity > 0);
    setUpdatedCart(updatedCartList);
  };

  return (
    <div className='checkout-page'>
      <div className='checkout-container'>
        <button className='back-btn' onClick={handleBackToMenu}>
          <MdOutlineKeyboardArrowLeft size={20} /> Back to Menu
        </button>

        {/* Container for the cart icon and checkout title */}
        <div className='checkout-title-container'>
          <FaShoppingCart className='cart-icon' />
          <h2 className='checkout-title'>Order Summary</h2>
        </div>

        {/* Ordered Items */}
        <div className='ordered-items-container'>
          {updatedCart.length === 0 ? (
            <p>No items in the cart</p>
          ) : (
            updatedCart.map(item => (
              <div key={item.id} className='ordered-item'>
                <div className='ordered-item-header'>
                  <div className='ordered-name-container'>
                    <p className='ordered-name'>{item.name}</p>
                  </div>
                  <span className='ordered-item-price'>€{(Number(item.price) * item.quantity).toFixed(2)}</span>
                </div>
                <div className='ordered-btn-container'>
                  <button className='quantity-btn' onClick={() => removeFromCart(item)}>
                    <FiMinus size={14} />
                  </button>
                  <span className='quantity-value'>{item.quantity}</span>
                  <button className='quantity-btn' onClick={() => addToCart(item)}>
                    <FiPlus size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Total */}
        <div className='ordered-total-container'>
          <span className='total-label'>Total</span>
          <span className='total-value'>€{getTotal().toFixed(2)}</span>
        </div>

        {/* Proceed to Payment or Place Order */}
        <button className='checkout-btn'>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default Checkout;
