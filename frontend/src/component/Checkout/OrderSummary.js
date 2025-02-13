import { useState } from "react";
import "./OrderSummary.css";
import { useNavigate } from "react-router-dom";
import PaymentMethod from "./PaymentMethod";
import DeliveryTimeModal from "./DeliveryTimeModal"; // Import Delivery Popup
import clockIcon from "../../assets/time.png"; // Import Clock Icon
import homeIcon from "../../assets/home (1).png";

const OrderSummary = ({ address, orderItems, onBack }) => {
  const navigate = useNavigate();
  const [showDeliveryPopup, setShowDeliveryPopup] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("Today 90 mins"); // Default delivery slot
  const [selectedPayment, setSelectedPayment] = useState("paynow"); // Payment Selection

  const handleProceedToPayment = () => {
    if (selectedPayment) {
      console.log("Selected Payment Method:", selectedPayment);
      localStorage.setItem("selectedDeliverySlot", selectedSlot);
      localStorage.setItem("selectedPaymentMethod", selectedPayment);
      navigate("/order");
      // Navigate to payment processing page or trigger payment gateway here
    } else {
      alert("Please select a payment method before proceeding.");
    }
  };

  return (
    <div className="order-summary-container">
      <h2>Order Summary</h2>
      <button className="delivery-time-btn" onClick={() => setShowDeliveryPopup(true)}>
        <img src={clockIcon} alt="Clock Icon" className="clock-icon" /> {selectedSlot} ▼
      </button>

      {/* Deliver To Section */}
      <p className="deliver-to-text">Deliver to:</p>
      <div className="address-box">
        <div className="address-content">
          <p className="name">{address.firstName} {address.lastName} <span className="phone">{address.phone}</span></p>
          <p className="address">{address.address}, {address.landmark}, {address.city}, {address.state} - {address.pincode}</p>
        </div>
        <div className="address-actions">
          <button className="home-button-checkout">
            <img src={homeIcon} alt="Home Icon" className="home-icon" /> {address.addressType.toUpperCase()}
          </button>
        </div>
      </div>

      {/* User Order Details Section */}
      <div className="user-order-details">
        <h3 className="deliver-to-text">Order Details:</h3>
        {orderItems.map((product, index) => (
          <div key={index} className="user-order-item">
            <img src={product.image} alt="Product" className="user-order-img" />
            <div className="user-order-info">
              <p className="user-product-name">{product.name}</p>
              <p className="user-product-weight">{product.weight}</p>

              {/* Price & Quantity in One Row */}
              <div className="user-price-quantity">
                <p className="user-product-price">₹{product.price}</p>
                <p className="user-product-quantity">Quantity x{product.quantity}</p>
              </div>
            </div>
            <p className="user-final-price">Final Price: <span className="user-final-price-span">₹{product.price * product.quantity}</span></p>
          </div>
        ))}
      </div>

      {/* User Price Summary */}
      <div className="user-price-summary">
        <p className="user-price-text">Delivery:</p>
        <p className="user-price-value">₹110</p>
        <p className="user-price-text">Taxes:</p>
        <p className="user-price-value">₹0</p>
        <h3 className="user-price-total">Total:</h3>
        <h3 className="user-price-total-value">₹{orderItems.reduce((total, product) => total + product.price * product.quantity, 110)}</h3>
      </div>

      {/* Payment Method Selection */}
      <PaymentMethod selectedPayment={selectedPayment} setSelectedPayment={setSelectedPayment} />

      {/* Proceed Button */}
      <button className="select-address" onClick={handleProceedToPayment}>
        Proceed to Payment
      </button>

      {showDeliveryPopup && <DeliveryTimeModal onClose={() => setShowDeliveryPopup(false)} onSelectSlot={setSelectedSlot} />}
    </div>
  );
};

export default OrderSummary;
