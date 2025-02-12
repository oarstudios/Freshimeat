import React, { useState } from "react";
import "./PincodePopup.css";
import logo from "../../assets/Seema Fish Logo.svg";

const PincodePopup = ({ onClose, onSubmit }) => {
  const [pincode, setPincode] = useState("");
  const [serviceMessage, setServiceMessage] = useState("");
  const [isServiceable, setIsServiceable] = useState(null);

  const handleSubmit = () => {
    onSubmit(pincode);
    
    // Example serviceable PIN codes
    const serviceablePincodes = ["400001", "400002", "400003"];

    if (serviceablePincodes.includes(pincode)) {
      setServiceMessage("Awesome! We serve in your city.");
      setIsServiceable(true);
    } else {
      setServiceMessage("Sorry! We do not serve in your city yet.");
      setIsServiceable(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <img src={logo} alt="Logo" className="popup-logo" />
        <h3 className="popup-title">Choose Delivery Location</h3>

        <input
          type="text"
          placeholder="Enter your city's PINCODE"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="pincode-input"
        />

        <button onClick={handleSubmit} className="continue-btn">
          Continue
        </button>

        {serviceMessage && (
          <p className={`service-message ${isServiceable ? "serviceable" : "not-serviceable"}`}>
            {serviceMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default PincodePopup;