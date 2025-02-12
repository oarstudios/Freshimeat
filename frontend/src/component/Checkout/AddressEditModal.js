import React, { useState } from "react";
import "./AddressEditModal.css";

const AddressEditModal = ({ address, onClose, onSave, onDelete }) => {
  const [editedAddress, setEditedAddress] = useState({ ...address });

  const handleChange = (e) => {
    setEditedAddress({ ...editedAddress, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(editedAddress);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      onDelete(address.id);
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button-pop" onClick={onClose}>×</button>
        
        <h2>Edit Address</h2>
        
        <div className="input-group">
          <div className="input-container">
            <input type="text" name="firstName" value={editedAddress.firstName} onChange={handleChange} />
            <label>First Name*</label>
          </div>
          <div className="input-container">
            <input type="text" name="lastName" value={editedAddress.lastName} onChange={handleChange} />
            <label>Last Name*</label>
          </div>
        </div>

        <textarea name="address" value={editedAddress.address} onChange={handleChange} placeholder="Full Address"></textarea>
        <div className="input-container"> 
          <input type="text" name="landmark" value={editedAddress.landmark} onChange={handleChange} placeholder="Landmark" />
        </div>

        <div className="input-group">
          <div className="input-container">
            <select name="state" value={editedAddress.state} onChange={handleChange}>
              <option value="Maharashtra">Maharashtra</option>
            </select>
          </div>
          <div className="input-container">
            <input type="text" name="city" value={editedAddress.city} onChange={handleChange} placeholder="City"/>
          </div>
          <div className="input-container">
            <input type="text" name="pincode" value={editedAddress.pincode} onChange={handleChange} placeholder="Pincode" />
          </div>
        </div>

        <div className="input-container">
          <input type="text" name="phone" value={editedAddress.phone} onChange={handleChange} placeholder="Phone Number"/>
        </div>

        <div className="modal-buttons">
          <button className="select-address" onClick={handleSave}>Update Address</button>
          <button className="delete-button-checkout" onClick={handleDelete}>Delete Address</button>
        </div>
      </div>
    </div>
  );
};

export default AddressEditModal;
