import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./OrderSection.css";
import cake from "../../assets/fishimage.png";
import FullStar from "../../assets/material-symbols_star.svg";
import EmptyStar from "../../assets/material-symbols_star-outline.svg";
import UploadIcon from "../../assets/Vector.svg";

const OrderSection = () => {
  const [ratings, setRatings] = useState({});
  const [inputs, setInputs] = useState({});
  const [submittedReviews, setSubmittedReviews] = useState({});
   const [selectedDeliveryDate, setSelectedDeliveryDate] = useState("");

  // Static Order & Product Data
  const order = {
    billId: "123456789",
    createdAt: "2025-02-10T00:00:00Z",
    billPrice: 1500,
    shippingAddress: {
      phoneNo: "+91 99888 77766",
      address: "Flat No. 502, Sai Residency, Mumbai, Maharashtra - 400052",
    },
  };

  const orderItems = [
    {
      id: "1",
      name: "Triple Chocolate Cheesecake",
      image: cake,
      weight: "500g",
      price: 500,
      quantity: 2,
    },
    {
      id: "2",
      name: "Classic Red Velvet Cake",
      image: cake,
      weight: "1kg",
      price: 700,
      quantity: 1,
    },
  ];


 

  // Handle Review Input Changes
  const handleTextChange = (e, productId) => {
    setInputs((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], review: e.target.value },
    }));
  };

  // Handle Image Upload
  const handleImageUpload = (e, productId) => {
    const files = Array.from(e.target.files);
    const fileURLs = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
  
    setInputs((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        media: [...(prev[productId]?.media || []), ...fileURLs],
      },
    }));
  };

  const handleRemoveImage = (productId, index) => {
    setInputs((prev) => {
      const updatedMedia = prev[productId]?.media?.filter((_, i) => i !== index) || [];
      return {
        ...prev,
        [productId]: { ...prev[productId], media: updatedMedia },
      };
    });
  };
  

  // Handle Rating Click
  const handleClick = (index, productId) => {
    setRatings((prev) => ({
      ...prev,
      [productId]: index + 1,
    }));
    setInputs((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], rating: index + 1 },
    }));
  };

  // Handle Review Submission
  const handleReviewSubmit = (e, productId) => {
    e.preventDefault();
    setSubmittedReviews((prev) => ({ ...prev, [productId]: true }));
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()} ${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`;
  };

  useEffect(() => {
      // Get the selected delivery slot from local storage
      const savedSlot = localStorage.getItem("selectedDeliverySlot");
      setSelectedDeliveryDate(savedSlot);
    }, []);
  return (
    <div className="order-section">
      <div className="order-left">
        <h3 className="order-id">Order ID: {order.billId}</h3>
        <h2 className="order-date">{formatDate(order.createdAt)}</h2>
        <p className="delivered-date-order-section">Delivery: {selectedDeliveryDate}</p>
        <h3 className="customer-name">John Doe</h3>
        <p className="customer-phone">Phone: {order.shippingAddress.phoneNo}</p>
        <p className="customer-address">Address: {order.shippingAddress.address}</p>

        {/* Feedback Section */}
        <h3 className="feedback-title">Tell us how much you loved it!</h3>
        {orderItems.map((item) => (
         <form
         className="feedback-item"
         key={item.id}
         onSubmit={(e) => handleReviewSubmit(e, item.id)}
         encType="multipart/form-data"
       >
         <div className="item-details">
           <img src={item.image} alt={item.name} className="item-image" />
           <p className="item-name">{item.name}</p>
         </div>
         <div className="rating-section">
           {[...Array(5)].map((_, index) => (
             <img
               key={index}
               src={index < (ratings[item.id] || 0) ? FullStar : EmptyStar}
               alt="Star"
               className="star-icon"
               onClick={() => handleClick(index, item.id)}
               style={{ cursor: "pointer" }}
             />
           ))}
         </div>
         <div className="review-container">
           <textarea
             className="review-box"
             placeholder="Write a review"
             value={inputs[item.id]?.review || ""}
             onChange={(e) => handleTextChange(e, item.id)}
           />
           <div className="image-preview-grid">
             {(inputs[item.id]?.media || []).map((media, index) => (
               <div key={index} className="image-preview">
                 <img src={media.preview} alt="Uploaded" className="uploaded-preview" />
                 <button className="remove-image-btn" onClick={() => handleRemoveImage(item.id, index)}>❌</button>
               </div>
             ))}
           </div>
           <label htmlFor={`upload-${item.id}`} className="upload-icon">
             <img src={UploadIcon} alt="Upload Icon" />
           </label>
           <input
             id={`upload-${item.id}`}
             type="file"
             accept="image/*"
             multiple
             onChange={(e) => handleImageUpload(e, item.id)}
             style={{ display: "none" }}
           />
           <button className="submit-btn" disabled={!inputs[item.id]?.review || submittedReviews[item.id]} type="submit">
             {submittedReviews[item.id] ? "Submitted" : "Submit"}
           </button>
         </div>
       </form>
        ))}
      </div>

      <div className="billing-right">
        {/* Order Details Section */}
        <div className="user-order-details">
          <h3 className="order-details-title">Order Details:</h3>
          {orderItems.map((product, index) => (
            <div key={index} className="user-order-item">
              <img src={product.image} alt="Product" className="user-order-img" />
              <div className="user-order-info">
                <p className="user-product-name">{product.name}</p>
                <p className="user-product-weight">{product.weight}</p>
                <div className="user-price-quantity-order">
                  <p className="user-product-price">₹{product.price}</p>
                  <p className="user-product-quantity">Quantity x{product.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Price Summary */}
<div className="user-price-summary">
  <p className="user-price-text">Delivery:</p>
  <p className="user-price-value">₹110</p>
  
  <p className="user-price-text">Subtotal:</p>
  <p className="user-price-value">
    ₹{orderItems.reduce((total, product) => total + product.price * product.quantity, 0)}
  </p>

  <h3 className="user-price-total">Total:</h3>
  <h3 className="user-price-total-value">
    ₹{orderItems.reduce((total, product) => total + product.price * product.quantity, 0) + 110}
  </h3>
</div>


       
      </div>
    </div>
  );
};

export default OrderSection;
