import React, { useState } from "react";
import "./CartPopup.css";
import sampleImage from "../../assets/fishimage.png"; // Sample product image
import closeIcon from "../../assets/close.png"; // Close icon for popup
import { Link } from "react-router-dom";

const initialCart = [
  { id: 1, name: "Whole Black Pomfret Fish", weight: "1000 g", price: 970, originalPrice: 1070, quantity: 3, img: sampleImage },
  { id: 2, name: "Whole Black Pomfret Fish", weight: "1000 g", price: 970, originalPrice: 1070, quantity: 3, img: sampleImage },
];

const CartPopup = ({ isOpen, onClose }) => {
  const [cart, setCart] = useState(initialCart);

  const handleAdd = (id) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const handleRemove = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      )
    );
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryCharges = 40;
  const total = subtotal + deliveryCharges;

  // Calculate total quantity of all products in cart
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={`cart-popup ${isOpen ? "show" : ""}`}>
      <div className="cart-popup-content">
        <div className="cart-header">
          <img src={closeIcon} alt="Close" className="close-icon clsicon" onClick={onClose} />
          <h2>Cart</h2>
        </div>

        {/* Total Items Section */}
        <div className="cart-total-items">
          <span>PRODUCT</span>
          <span>QUANTITY</span>
        </div>

        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cut-item">
              <img src={item.img} alt={item.name} className="cut-image" />
              <div className="cut-details">
                <p className="cut-name">{item.name}</p>
                <p className="cut-weight">
                  {item.weight} | Total Price: ₹{item.price * item.quantity}
                </p>

                <div className="product-bottom">
                  <div className="price-info">
                    <span className="current-price">₹{item.price}</span>
                    <span className="old-price">₹{item.originalPrice}</span>
                  </div>

                  <div className="quantity-control">
                    <button onClick={() => handleRemove(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleAdd(item.id)}>+</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <span>Delivery Charges</span>
            <span>₹{deliveryCharges}</span>
          </div>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span className="total-price">₹{total}</span>
          </div>
        </div>

        {/* Close Cart Popup when Proceeding to Checkout */}
        <Link to="/checkout" className="checkout-link" style={{ textDecoration: "none" }} onClick={onClose}>
          <button className="checkout-button">Proceed to Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default CartPopup;
