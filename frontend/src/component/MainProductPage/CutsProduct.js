import React, { useState } from "react";
import "./CutsProduct.css";
import img1 from "../../assets/fishimage.png";

const cuts = [
  { id: 1, name: "Whole Black Pomfret Fish", weight: "500 g", price: 670, originalPrice: 770, img: img1 },
  { id: 2, name: "Whole Black Pomfret Fish", weight: "1000 g", price: 970, originalPrice: 1070, img: img1 },
  { id: 3, name: "Steaks (with skin) Black Pomfret", weight: "500 g", price: 730, originalPrice: 870, img: img1 },
  { id: 4, name: "Steaks Black Pomfret Fish", weight: "500 g", price: null, originalPrice: null, img: img1, outOfStock: true },
];

const CutsProduct = () => {
  const [cart, setCart] = useState({}); // Track quantity of each item

  const handleAdd = (id, price) => {
    setCart((prev) => ({
      ...prev,
      [id]: { quantity: (prev[id]?.quantity || 0) + 1, price },
    }));
  };

  const handleRemove = (id) => {
    setCart((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[id]?.quantity > 1) {
        updatedCart[id].quantity -= 1;
      } else {
        delete updatedCart[id];
      }
      return updatedCart;
    });
  };

  return (
    <div className="cuts-container">
      <h3 className="cuts-title">Explore other Cuts/ Quantity in this product</h3>
      {cuts.map((cut) => {
        const totalPrice = cart[cut.id] ? cart[cut.id].quantity * cut.price : 0;

        return (
          <div key={cut.id} className="cut-item">
            <img src={cut.img} alt={cut.name} className="cut-image" />
            <div className="cut-details">
              <p className="cut-name">{cut.name}</p>
              <p className="cut-weight">{cut.weight} | Total Price: ₹{totalPrice || cut.price || "—"}</p>

              <div className="product-bottom">
                <div className="price-info">
                  {cut.price ? (
                    <>
                      <span className="current-price">₹{cut.price}</span>
                      <span className="old-price">₹{cut.originalPrice}</span>
                    </>
                  ) : (
                    <p className="product-outofstock">Currently Out of Stock</p>
                  )}
                </div>

                {!cut.outOfStock && (
                  cart[cut.id]?.quantity > 0 ? (
                    <div className="quantity-control">
                      <button onClick={() => handleRemove(cut.id)}>-</button>
                      <span>{cart[cut.id].quantity}</span>
                      <button onClick={() => handleAdd(cut.id, cut.price)}>+</button>
                    </div>
                  ) : (
                    <button className="add-btn" onClick={() => handleAdd(cut.id, cut.price)}>
                      ADD
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CutsProduct;
