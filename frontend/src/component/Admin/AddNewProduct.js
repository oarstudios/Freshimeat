import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiLock, FiPlusCircle } from "react-icons/fi"; // Lock icon for weight, Plus icon for category add
import { FaChevronDown } from "react-icons/fa"; // Dropdown arrow
import "./AddNewProduct.css";

const AddNewProduct = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [defaultPrice, setDefaultPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Sea Fish");
  const [productTag, setProductTag] = useState("None");
  const [inStock, setInStock] = useState(true);

  // Popups
  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const [isTagPopupOpen, setIsTagPopupOpen] = useState(false);
  const [newTag, setNewTag] = useState("");

  const [categories, setCategories] = useState([
    "Sea Fish",
    "Fresh Water Fish",
    "Chicken",
    "Mutton",
    "Prawns",
    "Crab",
  ]);

  const [productTags, setProductTags] = useState([
    "Product Tag",
    "Bestseller",
    "New Arrival",
    "Limited Edition",
  ]);

  const [note, setNote] = useState(
    `• Deliveries will take place between 11 AM and 7 PM on the chosen date. Same-day orders will be delivered via Uber, additional charges will apply.
• Short messages will be inscribed on a plaque, while longer messages will be included on a card.`
  );

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

  // Open & Close Popups
  const openCategoryPopup = () => setIsCategoryPopupOpen(true);
  const closeCategoryPopup = () => setIsCategoryPopupOpen(false);

  const openTagPopup = () => setIsTagPopupOpen(true);
  const closeTagPopup = () => setIsTagPopupOpen(false);

  // Add New Category
  const addNewCategory = () => {
    if (newCategory.trim() !== "" && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setSelectedCategory(newCategory);
      setNewCategory("");
      closeCategoryPopup();
    }
  };

  // Add New Product Tag
  const addNewTag = () => {
    if (newTag.trim() !== "" && !productTags.includes(newTag)) {
      setProductTags([...productTags, newTag]);
      setProductTag(newTag);
      setNewTag("");
      closeTagPopup();
    }
  };

  // Handle Form Submission (Prevents Reload)
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Product details submitted (No backend functionality)");
  };

  return (
    <div className="add-new-product-container">
      <Link to="/admin">
        <button className="back-button">Back</button>
      </Link>

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
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index + 1}`}
                  className="uploaded-image"
                />
                <button
                  className="delete-image-button"
                  onClick={() => handleImageDelete(index)}
                >
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
    <input
      type="number"
      value={defaultPrice}
      onChange={(e) => setDefaultPrice(e.target.value)}
      className="input-field"
      placeholder=" " /* Keep this empty */
    />
    <span className="input-label">Default price</span>
  </div>

  <div className="input-wrapper">
    <span className="input-icon">₹</span>
    <input
      type="number"
      value={salePrice}
      onChange={(e) => setSalePrice(e.target.value)}
      className="input-field"
      placeholder=" "
    />
    <span className="input-label">Sale price</span>
  </div>
</div>

{/* Weight Field with Lock Icon */}
<div className="input-wrapper">
  <FiLock className="input-icon" />
  <input
    type="number"
    value={weight}
    onChange={(e) => setWeight(e.target.value)}
    className="input-field"
    placeholder=" "
  />
  <span className="input-label">Weight (g)</span>
</div>


          <textarea
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-description"
          />

          {/* Category Selection */}
<div className="categories-section">
  <div className="category-header-admin">
    <p>Category</p>  
    <button type="button" className="add-category-button" onClick={openCategoryPopup}>
      <FiPlusCircle className="add-category-icon" /> ADD NEW
    </button>
  </div>
  <div className="category-buttons">
    {categories.map((cat) => (
      <button
        key={cat}
        type="button"
        className={`category-button ${selectedCategory === cat ? "selected" : ""}`}
        onClick={() => setSelectedCategory(cat)}
      >
        {cat}
      </button>
    ))}
  </div>
</div>

{/* Product Tag Selection */}
<div className="categories-section">
  <div className="category-header-admin">
    <p>Product Tag</p>  
    <button type="button" className="add-category-button" onClick={openTagPopup}>
      <FiPlusCircle className="add-category-icon" /> ADD NEW
    </button>
  </div>
  <select className="dropdownn" value={productTag} onChange={(e) => setProductTag(e.target.value)}>
    {productTags.map((tag) => (
      <option className="drop-list" key={tag} value={tag}>{tag}</option>
    ))}
  </select>
</div>


          {/* Popups */}
          {isCategoryPopupOpen && (
            <div className="popup-overlay">
              <div className="popup-box">
                <button className="close-popup" onClick={closeCategoryPopup}>×</button>
                <p className="popup-title confirm-button" onClick={addNewCategory}><FiPlusCircle /> CONFIRM</p>
                <input type="text" placeholder="Type here" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="popup-input" />
              </div>
            </div>
          )}

          {isTagPopupOpen && (
            <div className="popup-overlay">
              <div className="popup-box">
                <button className="close-popup" onClick={closeTagPopup}>×</button>
                <p className="popup-title confirm-button" onClick={addNewTag}><FiPlusCircle /> CONFIRM</p>
                <input type="text" placeholder="Type here" value={newTag} onChange={(e) => setNewTag(e.target.value)} className="popup-input" />
              </div>
            </div>
          )}

          {/* In Stock Toggle */}
          <div className="categories-section">
            <p>In Stock</p>
            <div className="category-buttons">
              <button
                type="button"
                className={`category-button ${inStock ? "selected" : ""}`}
                onClick={() => setInStock(true)}
              >
                Yes
              </button>
              <button
                type="button"
                className={`category-button ${!inStock ? "selected" : ""}`}
                onClick={() => setInStock(false)}
              >
                No
              </button>
            </div>
          </div>

          {/* Edit Note Section */}
          <div className="edit-note-section">
            <p className="edit-note-title">Edit Note/Storage Instructions:</p>
            <textarea
              className="edit-note"
              onChange={(e) => setNote(e.target.value)}
              value={note}
            />
          </div>

          <button className="publish-button" type="submit">
            Publish Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewProduct;
