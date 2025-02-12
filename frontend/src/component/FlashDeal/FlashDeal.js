import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import "./FlashDeal.css";

import flashIcon from "../../assets/Flash deals Lightning.png"; // Replace with the correct path to the flash icon
import seerFish from "../../assets/fishimage.png";
import prawns from "../../assets/fishimage.png";
import pomfret from "../../assets/fishimage.png";
import bombil from "../../assets/fishimage.png";

const flashDeals = [
  { name: "Seer Fish/ Surmai/ King Fish", price: 450, image: seerFish },
  { name: "Prawns/ Kolambi/ Jhinga", price: 440, image: prawns },
  { name: "Medium White Pomfret/ Paplet Fish", price: 430, image: pomfret },
  { name: "Bombay Duck Fish/ Bombil Fish", price: 420, image: bombil },
  { name: "Seer Fish/ Surmai/ King Fish", price: 450, image: seerFish },
  { name: "Prawns/ Kolambi/ Jhinga", price: 440, image: prawns },
  { name: "Medium White Pomfret/ Paplet Fish", price: 430, image: pomfret },
  { name: "Bombay Duck Fish/ Bombil Fish", price: 420, image: bombil },
];

export default function FlashDeal() {
  const [cart, setCart] = useState({});
  const [timeLeft, setTimeLeft] = useState(100 * 60); // 100 minutes in seconds (1hr 40min)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

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
    <div className="flash-deal">
      <div className="flash-deal-header">
        <div>
          <h2>Flash Deals</h2>
          {/* <p>Shop irresistible limited time deals</p> */}
        </div>
        <div className="flash-deal-timer">
          <span>Time left - {formatTime(timeLeft)}</span>
         
        </div>
        <img src={flashIcon} alt="Flash Sale" style={{ width: "38px", height: "68px", position: "absolute", right:"-15px" }} />
      </div>
      <div className="product-grid">
        {flashDeals.map((product, index) => (
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
