import React, { useState } from "react";
import "./ProductPage.css";
import img1 from "../../assets/fishimage.png";
import img2 from "../../assets/mutton.png";

const product = {
  name: "Whole Cleaned (with head) Black Pomfret Fish/ Halwa Fish",
  unitWeight: 250, // Weight per unit in grams
  unitPrice: 170, // Price per unit
  originalPrice: 500, // Old price
  images: [img1, img2], // Product images
  inStock: true, // Change to false if out of stock
};

const ProductPage = () => {
  const [cart, setCart] = useState(0);
  const [mainImage, setMainImage] = useState(product.images[0]);

  // Switch main image when thumbnail is clicked
  const handleImageChange = (image) => {
    setMainImage(image);
  };

  // Add product to cart
  const handleAdd = () => {
    setCart((prev) => prev + 1);
  };

  // Remove product from cart
  const handleRemove = () => {
    setCart((prev) => (prev > 1 ? prev - 1 : 0));
  };

  // Calculate total price & weight dynamically
  const totalPrice = cart * product.unitPrice;
  const totalWeight = cart * product.unitWeight;
  const unitSellingPrice = (product.unitPrice / product.unitWeight).toFixed(2); // ₹ per gram

  return (
    <div className="product-container">
      {/* Main Product Image */}
      <img src={mainImage} alt={product.name} className="product-image" />

      {/* Small Images below Main Image */}
      <div className="product-thumbnails">
        {product.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`thumbnail-image ${mainImage === image ? "active" : ""}`}
            onClick={() => handleImageChange(image)}
          />
        ))}
      </div>

      {/* Product Details */}
      <h2 className="product-title">{product.name}</h2>
      <p className="product-subtitle">
        {product.unitWeight} g | Unit Selling Price: ₹{unitSellingPrice}/g
      </p>

      <div className="product-bottom">
        <div className="product price-info">
          <span className="product-current current-price">₹{product.unitPrice}</span>
          <span className="product-old old-price">₹{product.originalPrice}</span>
        </div>

        {product.inStock ? (
          cart > 0 ? (
            <div className="quantity-control">
              <button onClick={handleRemove}>-</button>
              <span>{cart}</span>
              <button onClick={handleAdd}>+</button>
            </div>
          ) : (
            <button className="add-btn" onClick={handleAdd}>
              ADD
            </button>
          )
        ) : (
          <p className="product-outofstock">Currently Out of Stock</p>
        )}
      </div>

      {/* Dynamic Total Price & Weight */}
      {cart > 0 && (
        <p className="product-weight">
          Total Price: ₹{totalPrice} | Total Weight: {totalWeight}g
        </p>
      )}

      <hr className="productdown"  />

      {/* Description */}
      <h3 className="section-title">Description</h3>
      <p className="product-warning">Actual Product Weight may vary by 10g - 20g.</p>
      <p className="product-description">
        Experience the rich, buttery taste of Seer Fish (Surmai), freshly sourced from the pristine waters of the Indian Ocean. A seafood delicacy loved across coastal regions, Seer Fish is prized for its firm texture, mild flavor, and high nutritional value.
      </p>
      <p className="product-description">
        Sourced from the Indian Ocean – Wild-caught and fresh.  
        Perfect for Lunch – Light, protein-rich, and easy to digest.  
        Versatile Cooking – Ideal for grilling, frying, or making flavorful curries.  
        Health Benefits – High in Omega-3, low in fat, and great for heart health.
      </p>

      <hr className="productdown" />

      {/* Storage Instructions */}
      <h3 className="section-title">Storage Instructions</h3>
      <ul className="product-description">
        <li>Store in an airtight container or vacuum-sealed bag below 4°C.</li>
        <li>Consume within 1-2 days.</li>
        <li>Keep airtight to prevent odor absorption and freezer burn.</li>
      </ul>
    </div>
  );
};

export default ProductPage;
