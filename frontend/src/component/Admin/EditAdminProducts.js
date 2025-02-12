import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FiLock, FiPlusCircle } from "react-icons/fi";
import { MdClose, MdCheck } from "react-icons/md"; // Icons for toggle
import "./EditAdminProducts.css";

const EditAdminProducts = () => {
  const { productId } = useParams(); // Get product ID from URL (for demo purposes)
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [defaultPrice, setDefaultPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Sea Fish");
  const [productTag, setProductTag] = useState("None");
  const [inStock, setInStock] = useState(true);
  const [isBestsellerActive, setIsBestsellerActive] = useState(false);

  const [categories, setCategories] = useState([
    "Sea Fish", "Fresh Water Fish", "Chicken", "Mutton", "Prawns", "Crab",
  ]);
  const [productTags, setProductTags] = useState([
    "Product Tag", "Bestseller", "New Arrival", "Limited Edition",
  ]);

  const [note, setNote] = useState(
    `• Deliveries will take place between 11 AM and 7 PM on the chosen date.`
  );
  const handleBestsellerToggle = () => {
    setIsBestsellerActive(!isBestsellerActive);
  };

  const handleDeleteProduct = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      alert("Product deleted (No backend functionality)");
    }
  };
  // Load Mock Product Data for Editing
  useEffect(() => {
    const mockProduct = {
      title: "Fresh Salmon",
      defaultPrice: 500,
      salePrice: 450,
      weight: 1000,
      description: "High-quality fresh salmon from the ocean.",
      category: "Sea Fish",
      tag: "Bestseller",
      inStock: true,
      images: [],
      note: `• Deliveries will take place between 11 AM and 7 PM on the chosen date.`,
    };

    setTitle(mockProduct.title);
    setDefaultPrice(mockProduct.defaultPrice);
    setSalePrice(mockProduct.salePrice);
    setWeight(mockProduct.weight);
    setDescription(mockProduct.description);
    setSelectedCategory(mockProduct.category);
    setProductTag(mockProduct.tag);
    setInStock(mockProduct.inStock);
    setImages(mockProduct.images);
    setNote(mockProduct.note);
  }, [productId]);

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    if (images.length + uploadedFiles.length > 3) {
      alert("You can only upload up to 3 images.");
      return;
    }
    setImages((prevImages) => [...prevImages, ...uploadedFiles]);
  };

  // Handle Image Delete
  const handleImageDelete = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Product details updated (No backend functionality)");
  };

  return (
    <div className="edit-admin-product-container">
      <div className="top-bars">
        <Link to="/admin">
          <button className="back-button">Back</button>
        </Link>
        {productTag === "Bestseller" && (
          <span
            className={`bestseller-tag ${isBestsellerActive ? "active" : ""}`}
            onClick={handleBestsellerToggle}
          >
            {isBestsellerActive ? <MdCheck className="check-icon" /> : <MdClose className="close-icon-best" />}
            Bestseller
          </span>
        )}
      </div>

      <form className="product-form" onSubmit={handleSubmit}>
        {/* Image Upload Section */}
        <div className="image-section">
          <label htmlFor="image-upload" className="upload-placeholder">
            <span>+</span>
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          <div className="uploaded-images-container">
            {images.map((image, index) => (
              <div className="uploaded-image-wrapper" key={index}>
                <img
                  src={typeof image === "string" ? image : URL.createObjectURL(image)}
                  alt={`Uploaded ${index + 1}`}
                  className="uploaded-image"
                />
                <button className="delete-image-button" onClick={() => handleImageDelete(index)}>
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="details-section">
          <input
            type="text"
            placeholder="Title of the Listing"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-title"
          />

          {/* Price Fields */}
          <div className="price-fields">
            <div className="input-wrapper">
              <span className="input-icon">₹</span>
              <input type="number" value={defaultPrice} onChange={(e) => setDefaultPrice(e.target.value)} className="input-field"/>
              <span className="input-label">Default price</span>
            </div>

            <div className="input-wrapper">
              <span className="input-icon">₹</span>
              <input type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} className="input-field"/>
              <span className="input-label">Sale price</span>
            </div>
          </div>

          {/* Weight Field */}
          <div className="input-wrapper">
            <FiLock className="input-icon" />
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="input-field"/>
            <span className="input-label">Weight (g)</span>
          </div>

          {/* Description */}
          <textarea placeholder="Product Description" value={description} onChange={(e) => setDescription(e.target.value)} className="input-description"/>

          {/* Category Selection */}
          <div className="categories-section">
            <p>Category</p>
            <div className="category-buttons">
              {categories.map((cat) => (
                <button key={cat} type="button" className={`category-button ${selectedCategory === cat ? "selected" : ""}`} onClick={() => setSelectedCategory(cat)}>{cat}</button>
              ))}
            </div>
          </div>

          {/* Product Tag Selection */}
          <div className="categories-section">
            <p>Product Tag</p>
            <select className="dropdownn" value={productTag} onChange={(e) => setProductTag(e.target.value)}>
              {productTags.map((tag) => (
                <option className="drop-list" key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>

          {/* In Stock Toggle */}
          <div className="categories-section">
            <p>In Stock</p>
            <div className="category-buttons">
              <button type="button" className={`category-button ${inStock ? "selected" : ""}`} onClick={() => setInStock(true)}>Yes</button>
              <button type="button" className={`category-button ${!inStock ? "selected" : ""}`} onClick={() => setInStock(false)}>No</button>
            </div>
          </div>

          {/* Edit Note Section */}
          <div className="edit-note-section">
            <p className="edit-note-title">Edit Note/Storage Instructions:</p>
            <textarea className="edit-note" onChange={(e) => setNote(e.target.value)} value={note} />
          </div>

          <div className="buttons-container">
             <button className="publish-button" type="submit">Update Product</button>
          <button className="delete-button" type="button" onClick={handleDeleteProduct}>Archive  Product</button>
         
        </div>
        </div>
      </form>
    </div>
  );
};

export default EditAdminProducts;
