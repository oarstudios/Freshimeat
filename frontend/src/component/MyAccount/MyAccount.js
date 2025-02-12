import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import "./MyAccount.css";
import cake from "../../assets/fishimage.png";
import homeIcon from "../../assets/home (1).png"; 
import AddressEditModal from "../Checkout/AddressEditModal"; 
import AddNewAddressModal from "../Checkout/AddNewAddressModal"; 


const MyAccount = () => {
  const [edit1, setEdit1] = useState(false);
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState("");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

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

  useEffect(() => {
    // Get the selected delivery slot from local storage
    const savedSlot = localStorage.getItem("selectedDeliverySlot") || "5th Jan 2025";
    setSelectedDeliveryDate(savedSlot);
  }, []);


  return (
    <div className="my-account-page">
      <div className="account-left">
        <div className="heading-row">
          <h2 className="heading">My Account</h2>
          {!edit1 && <button className="edit-button" onClick={() => setEdit1(true)}>Edit</button>}
        </div>
        <form className="account-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" value={username} onChange={(e) => setUsername(e.target.value)} readOnly={!edit1} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} readOnly={!edit1} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Set new password</label>
              <input type="password" id="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} readOnly={!edit1} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} readOnly={!edit1} />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} disabled={!edit1}>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>

            </div>
          </div>
          <div className="sbBtn">
            <button className="submit" type="submit" style={{ display: edit1 ? "block" : "none" }} onClick={() => setEdit1(false)}>Submit</button>
          </div>
        </form>

     
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
           
          </div>
        </div>
        <button className="logout-button">Logout</button>
      </div>

      <div className="account-right">
        <h2 className="heading">Orders</h2>
        <Link to="/order" className="orders-link">
          <div className="orders-item">
            <img src={cake} alt="Order" className="orders-image" />
            <div className="orders-details">
            <p className="orders-date">{selectedDeliveryDate}</p>
              <p className="orders-status pending">Pending</p>
              <span className="orders-items">Triple Chocolate Cheesecake x2</span>
            </div>
          </div>
        </Link>
      </div>
      {isEditing && <AddressEditModal address={currentAddress} onClose={() => setIsEditing(false)} onSave={handleSaveAddress} />}
      {isAdding && <AddNewAddressModal onClose={() => setIsAdding(false)} onSave={handleAddNewAddress} availableTypes={availableTypes} />}
    </div>
  );
};

export default MyAccount;
