import { useState } from "react";
import "./Checkout.css";
import homeIcon from "../../assets/home (1).png"; 
import AddressEditModal from "./AddressEditModal"; 
import AddNewAddressModal from "./AddNewAddressModal"; 
import OrderSummary from "./OrderSummary"; // Import Order Summary
import img1 from "../../assets/fishimage.png"

const Checkout = () => {
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false); // Toggle between address selection and order summary
  const [currentAddress, setCurrentAddress] = useState(null);

  const [addresses, setAddresses] = useState([
    {
      id: 0,
      firstName: "Omkar",
      lastName: "Garate",
      phone: "+91 99888 77766",
      addressType: "home1",
      address: "Flat No. 502, Sai Residency, 5th Road, Khar West",
      landmark: "Near XYZ Mall",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400052"
    }
  ]);

  const handleEditClick = (index) => {
    setCurrentAddress({ ...addresses[index] });
    setIsEditing(true);
  };

  const handleSaveAddress = (updatedAddress) => {
    setAddresses(addresses.map((addr) =>
      addr.id === updatedAddress.id ? updatedAddress : addr
    ));
    setIsEditing(false);
  };

  const handleAddNewAddress = (newAddress) => {
    setAddresses([...addresses, { id: addresses.length, ...newAddress }]);
    setIsAdding(false);
  };

  const usedAddressTypes = addresses.map((addr) => addr.addressType);
  const availableTypes = ["home1", "home2", "office"].filter(type => !usedAddressTypes.includes(type));
  const disableAddButton = availableTypes.length === 0;

  return (
    <div className="checkout-container">
      {showOrderSummary ? (
        <OrderSummary 
        address={addresses[selectedAddress]} 
        orderItems={[
          { name: "Whole Black Pomfret Fish / Halwa Fish", weight: "1000 g", price: 970, quantity: 3, image: img1 },
          { name: "Whole Black Pomfret Fish / Halwa Fish", weight: "1000 g", price: 970, quantity: 3, image: img1 },
          { name: "Whole Black Pomfret Fish / Halwa Fish", weight: "1000 g", price: 970, quantity: 3, image: img1 }
        ]}
      />
      
      ) : (
        <div className="address-section">
          <h2>Your Saved Addresses</h2>
          {addresses.map((addr, index) => (
            <div
              key={addr.id}
              className={`address-box ${selectedAddress === index ? "selected" : ""}`}
              onClick={() => setSelectedAddress(index)}
            >
              <div className="address-content">
                <p className="name">{addr.firstName} {addr.lastName} <span className="phone">{addr.phone}</span></p>
                <p className="address">{addr.address}, {addr.landmark}, {addr.city}, {addr.state} - {addr.pincode}</p>
              </div>
              <div className="address-actions">
                <button className="home-button-checkout">
                  <img src={homeIcon} alt="Home Icon" className="home-icon" /> {addr.addressType.toUpperCase()}
                </button>
                <button className="edit-button" onClick={(e) => { e.stopPropagation(); handleEditClick(index); }}>EDIT</button>
              </div>
            </div>
          ))}
          <div className="buttons">
            <button className="add-address" onClick={() => setIsAdding(true)} disabled={disableAddButton}>
              Add New Address
            </button>
            <button className="select-address" onClick={() => setShowOrderSummary(true)}>Select Address</button>
          </div>
        </div>
      )}

      {isEditing && <AddressEditModal address={currentAddress} onClose={() => setIsEditing(false)} onSave={handleSaveAddress} />}
      {isAdding && <AddNewAddressModal onClose={() => setIsAdding(false)} onSave={handleAddNewAddress} availableTypes={availableTypes} />}
    </div>
  );
};

export default Checkout;
