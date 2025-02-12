import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiFilter } from "react-icons/fi";
import { FaArchive } from "react-icons/fa"; // Archive icon
import "./AdminProducts.css";
import productImage1 from "../../assets/fishimage.png";
import productImage2 from "../../assets/fishimage.png";
import FilterComponent from "./FilterComponent"; // Import the Filter Component

const products = [
  {
    id: 1,
    name: "Triple Chocolate Cheesecake",
    price: "200",
    image: productImage1,
    tag: "Bestseller",
  },
  {
    id: 2,
    name: "Strawberry Chocolate",
    price: "600",
    image: productImage2,
    tag: null,
  },
  {
    id: 3,
    name: "Chocolate Mousse",
    price: "800",
    image: productImage1,
    tag: null,
  },
  {
    id: 4,
    name: "Vanilla Delight",
    price: "500",
    image: productImage2,
    tag: "New",
  },
  {
    id: 5,
    name: "Red Velvet Cake",
    price: "000",
    image: productImage1,
    tag: null,
  },
];

const AdminProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 50;
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Filter pop-up state

  // Handle Search Input
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, endIndex);

  // Handle Page Change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="admin-home-page">
      <div className="main-content">
        {/* Header Section */}
        <div className="admin-products-header">
          {/* <button className="back-button">Back</button> */}

          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
            />
            <FiSearch className="search-icon" />
          </div>

          {/* Archive & Filter Buttons */}
          <div className="admin-icons">
            <button className="archive-button">
              <FaArchive />
              Archive
            </button>
            <button className="filter-button" onClick={() => setIsFilterOpen(true)}>
              <FiFilter />
              Filter
            </button>
          </div>
        </div>

        {/* Filter Popup */}
        {isFilterOpen && <FilterComponent onClose={() => setIsFilterOpen(false)} />}

        <div className="cakes-grid">
          {/* Add Product Button */}
          <Link to="/admin/add-product" style={{ textDecoration: "none" }}>
            <div className="add-product-card">
              <button className="add-product-button">+ Add New Product</button>
            </div>
          </Link>

          {/* Product Cards */}
          {displayedProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="product-bottom">
                  <div className="price-info">
                    <span className="current-price">₹{product.price}</span>
                    <span className="old-price">₹470</span>
                    <div className="weight">250 g</div>
                  </div>
                  <Link to="/admin/edit-product" style={{ textDecoration: "none" }}>
                    <button className="add-btn">Edit</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination-container">
          <p className="pagination-text">
            Showing {endIndex > filteredProducts.length ? filteredProducts.length : endIndex} of {filteredProducts.length} Products
          </p>
          <div className="pagination-buttons">
            <button
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`pagination-btn ${currentPage === index + 1 ? "active" : ""}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
