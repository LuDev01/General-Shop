import React, { useContext } from "react";
import { DataContext } from "./context/DataContext";
import { NavBar } from "./NavBar";
import "./CartContent.css";
// import {CartTotal} from "./CartTotal";

export const CartContent = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(DataContext);

  // Calculate the total by adding the numerical values of the prices
  const total = cart.reduce((acc, product) => {
    if (typeof product.price === 'number') {
      acc += product.price;
    }
    return acc;
  }, 0);

  return (
    <>
      <NavBar />
      <div className="cart-content">
        {cart.length > 0 ? (
          <>
            {cart.map((product) => (
              <div className="cart-items" key={product._id}>
                <img
                  src={product.image.url}
                  alt="product-card"
                  className="picture"
                />
                <div className="product-details">
                  <div className="name-container">
                    <h3 className="name">{product.name}</h3>
                    <h4 className="price">${product.price}</h4>
                    {/* <h4 className="quantity">Quantity: {product.quantity}</h4> */}
                    <div className="quantity-controls">
                      <button onClick={() => decreaseQuantity(product._id)}>
                        -
                      </button>
                      <span>{product.quantity}</span>
                      <button onClick={() => increaseQuantity(product._id)}>
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(product._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
              <div className="cart-total">
                <h3>Total Purchase: ${total}</h3>
              </div>
            {/* <CartTotal /> */}
          </>
        ) : (
          <div
            className="empty-cart-message"
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              fill="currentColor"
              className="bi bi-cart-x"
              viewBox="0 0 16 16"
            >
              <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793z" />
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
            </svg>
            <h4 className="empty-cart-message">Your cart is empty</h4>
          </div>
        )}
      </div>
    </>
  );
};
