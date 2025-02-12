import React, { useState } from "react";
import "./AddNewAddressModal.css";
import homeActiveIcon from "../../assets/home (1).png";
import homeInactiveIcon from "../../assets/home (2).png";
import officeActiveIcon from "../../assets/location (1).png";
import officeInactiveIcon from "../../assets/location.png";

const AddNewAddressModal = ({ onClose, onSave, availableTypes }) => {
  const [newAddress, setNewAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    landmark: "",
    state: "Maharashtra",
    city: "",
    pincode: "",
    phone: "",
    addressType: ""
  });

  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!newAddress.addressType) {
      alert("Please select an address type.");
      return;
    }
    onSave(newAddress);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button-pop" onClick={onClose}>×</button>

        <h2>Add New Address</h2>

        {/* Address Type Selection */}
        <div className="address-type">
          <button
            className={`home-button ${newAddress.addressType === "home1" ? "active" : "inactive"}`}
            onClick={() => setNewAddress({ ...newAddress, addressType: "home1" })}
            disabled={!availableTypes.includes("home1")}
          >
            <img 
              src={newAddress.addressType === "home1" ? homeActiveIcon : homeInactiveIcon} 
              alt="Home Icon" 
              className="home-icon" 
            />
            HOME 1
          </button>

          <button
            className={`home-button ${newAddress.addressType === "home2" ? "active" : "inactive"}`}
            onClick={() => setNewAddress({ ...newAddress, addressType: "home2" })}
            disabled={!availableTypes.includes("home2")}
          >
            <img 
              src={newAddress.addressType === "home2" ? homeActiveIcon : homeInactiveIcon} 
              alt="Home Icon" 
              className="home-icon" 
            />
            HOME 2
          </button>

          <button
            className={`home-button ${newAddress.addressType === "office" ? "active" : "inactive"}`}
            onClick={() => setNewAddress({ ...newAddress, addressType: "office" })}
            disabled={!availableTypes.includes("office")}
          >
            <img 
              src={newAddress.addressType === "office" ? officeActiveIcon : officeInactiveIcon} 
              alt="Office Icon" 
              className="home-icon" 
            />
            OFFICE
          </button>
        </div>

        {/* Address Form */}
        <div className="input-group">
          <div className="input-container">
            <input type="text" name="firstName" value={newAddress.firstName} onChange={handleChange} />
            <label>First Name*</label>
          </div>
          <div className="input-container">
            <input type="text" name="lastName" value={newAddress.lastName} onChange={handleChange} />
            <label>Last Name*</label>
          </div>
        </div>

        <textarea name="address" value={newAddress.address} onChange={handleChange} placeholder="Full Address"></textarea>
        <div className="input-container">
          <input type="text" name="landmark" value={newAddress.landmark} onChange={handleChange} placeholder="Landmark" />
        </div>

        <div className="input-group">
          <div className="input-container">
            <select name="state" value={newAddress.state} onChange={handleChange}>
              <option value="Maharashtra">Maharashtra</option>
            </select>
          </div>
          <div className="input-container">
            <input type="text" name="city" value={newAddress.city} onChange={handleChange} placeholder="City" />
          </div>
          <div className="input-container">
            <input type="text" name="pincode" value={newAddress.pincode} onChange={handleChange} placeholder="Pincode" />
          </div>
        </div>

        <div className="input-container">
          <input type="text" name="phone" value={newAddress.phone} onChange={handleChange} placeholder="Phone Number" />
        </div>

        {/* Save Button */}
        <div className="modal-buttons">
          <button className="select-address" onClick={handleSave}>Save Address</button>
        </div>
      </div>
    </div>
  );
};

export default AddNewAddressModal;
