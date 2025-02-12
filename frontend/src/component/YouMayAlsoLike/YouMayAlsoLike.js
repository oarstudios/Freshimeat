import React, { useState } from "react";
import img1 from "../../assets/chicken.png";
import img2 from "../../assets/fishimage.png";

const youMayAlsoLikeItems = [
  { name: "Seer Fish/ Surmai/ King Fish", price: 470, image: img1 },
  { name: "Prawns/ Kolambi/ Jhinga", price: 470, image: img2 },
  { name: "Medium White Pomfret/ Paplet Fish", price: 470, image: img1 },
  { name: "Bombay Duck Fish/ Bombil Fish", price: 470, image: img2 },
];

export default function YouMayAlsoLike() {
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
      <h2>You May Also Like</h2>
      <p>Explore our recommended products!</p>
      <div className="product-grid">
        {youMayAlsoLikeItems.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <div className="product-bottom">
                <div className="price-info">
                  <span className="current-price">₹{product.price}</span>
                  <span className="old-price">₹{product.price + 200}</span>
                  <div className="weight">500 g</div>
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
        ))}
      </div>
    </div>
  );
}
