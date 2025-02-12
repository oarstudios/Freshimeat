import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import "./DealOfTheDay.css";

import seerFish from "../../assets/fishimage.png";
import prawns from "../../assets/fishimage.png";
import pomfret from "../../assets/fishimage.png";
import bombil from "../../assets/fishimage.png";

const dealOfTheDay = [
  { name: "Seer Fish/ Surmai/ King Fish", price: 470, image: seerFish },
  { name: "Prawns/ Kolambi/ Jhinga", price: 470, image: prawns },
  { name: "Medium White Pomfret/ Paplet Fish", price: 470, image: pomfret },
  { name: "Bombay Duck Fish/ Bombil Fish", price: 470, image: bombil },
];

export default function DealOfTheDay() {
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
      <h2>Deal of the Day</h2>
      <p>Exclusive offers on our finest seafood!</p>
      <div className="product-grid">
        {dealOfTheDay.map((product, index) => (
                <Link to={"/product"} className="product-card-link">
          <div key={index} className="product-card">
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
                    <button onClick={() => handleRemove(index)}>-</button>
                    <span>{cart[index]}</span>
                    <button onClick={() => handleAdd(index)}>+</button>
                  </div>
                ) : (
                  <button className="add-btn" onClick={() => handleAdd(index)}>
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
