import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CategoryFull.css"

import seerFish from "../../assets/fishimage.png";
import prawns from "../../assets/fishimage.png";
import pomfret from "../../assets/fishimage.png";
import bombil from "../../assets/fishimage.png";
import DealOfTheDay from "../DealOfTheDay/DealOfTheDay";
import AboutUs from "../AboutUs/AboutUs";

const categoryFull = [
  { id: 1, name: "Seer Fish/ Surmai/ King Fish", price: 470, image: seerFish },
  { id: 2, name: "Prawns/ Kolambi/ Jhinga", price: 470, image: prawns },
  { id: 3, name: "Medium White Pomfret/ Paplet Fish", price: 470, image: pomfret },
  { id: 4, name: "Bombay Duck Fish/ Bombil Fish", price: 470, image: bombil },
  { id: 5, name: "Seer Fish/ Surmai/ King Fish", price: 470, image: seerFish },
  { id: 6, name: "Prawns/ Kolambi/ Jhinga", price: 470, image: prawns },
  { id: 7, name: "Medium White Pomfret/ Paplet Fish", price: 470, image: pomfret },
  { id: 8, name: "Bombay Duck Fish/ Bombil Fish", price: 470, image: bombil },
  { id: 9, name: "Seer Fish/ Surmai/ King Fish", price: 470, image: seerFish },
  { id: 10, name: "Prawns/ Kolambi/ Jhinga", price: 470, image: prawns },
  { id: 11, name: "Medium White Pomfret/ Paplet Fish", price: 470, image: pomfret },
  { id: 12, name: "Bombay Duck Fish/ Bombil Fish", price: 470, image: bombil },
];

function CategoryFull() {
    const [cart, setCart] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
  
    const totalPages = Math.ceil(categoryFull.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = categoryFull.slice(startIndex, startIndex + itemsPerPage);
  
    const handleAdd = (productId) => {
      setCart((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
    };
  
    const handleRemove = (productId) => {
      setCart((prev) => {
        const updatedCart = { ...prev };
        if (updatedCart[productId] > 1) {
          updatedCart[productId] -= 1;
        } else {
          delete updatedCart[productId];
        }
        return updatedCart;
      });
    };
  
    return (
      <>
        <div className="best-sellers">
          <h2>Sea Fish Products</h2>
          <p>Explore our wide range of fresh Sea Fish</p>
          <div className="product-grid">
            {paginatedItems.map((product) => (
              <Link to={"/product"} className="product-card-link" key={product.id}>
                <div className="product-card">
                  <img src={product.image} alt={product.name} />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <div className="product-bottom">
                      <div className="price-info">
                        <span className="current-price">₹{product.price}</span>
                        <span className="old-price">₹470</span>
                        <div className="weight">250 g</div>
                      </div>
                      {cart[product.id] ? (
                        <div className="quantity-control">
                          <button onClick={(e) => { e.preventDefault(); handleRemove(product.id); }}>-</button>
                          <span>{cart[product.id]}</span>
                          <button onClick={(e) => { e.preventDefault(); handleAdd(product.id); }}>+</button>
                        </div>
                      ) : (
                        <button className="add-btn" onClick={(e) => { e.preventDefault(); handleAdd(product.id); }}>
                          ADD
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
  
          {/* Pagination controls */}
          <div className="pagination1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
        <DealOfTheDay />
        <AboutUs />
      </>
    );
  }
  

export default CategoryFull;
