import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import "./BestSellers.css";

import seerFish from "../../assets/fishimage.png";
import prawns from "../../assets/fishimage.png";
import pomfret from "../../assets/fishimage.png";
import bombil from "../../assets/fishimage.png";

const bestSellers = [
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

export default function BestSellers() {
  const [cart, setCart] = useState({});

  const handleAdd = (index) => {
    setCart((prev) => ({ ...prev, [index]: (prev[index] || 0) + 1 }));
  };

  const handleRemove = (index) => {
    setCart((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[index] > 1) {
        updatedCart[index] -= 1;
      } else {
        delete updatedCart[index];
      }
      return updatedCart;
    });
  };

  return (
    <div className="best-sellers">
      <h2>Best Sellers</h2>
      <p>Try out our people favorites!</p>
      <div className="product-grid">
        {bestSellers.map((product, index) => (
          <Link to={"/product"} className="product-card-link">
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
                  {cart[index] ? (
                    <div className="quantity-control">
                      <button onClick={(e) => { e.preventDefault(); handleRemove(index); }}>-</button>
                      <span>{cart[index]}</span>
                      <button onClick={(e) => { e.preventDefault(); handleAdd(index); }}>+</button>
                    </div>
                  ) : (
                    <button className="add-btn" onClick={(e) => { e.preventDefault(); handleAdd(index); }}>
                      ADD
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
