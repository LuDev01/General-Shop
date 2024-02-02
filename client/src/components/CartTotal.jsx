import { useContext } from "react";
import { DataContext } from "./context/DataContext";
import { useState } from 'react';
import { NavBar } from './NavBar';
import {PurchaseModal} from "./PurchaseModal";
import { ToastContainer, toast } from "react-toastify";
import axiosClient from "../axiosConfig";
import "./CartTotal.css";

export const CartTotal = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(DataContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate the total by adding the numerical values of the prices
  const total = cart.reduce((acc, product) => {
    if (typeof product.price === 'number' && typeof product.quantity === 'number') {
      acc += product.price * product.quantity;
    }
    return acc;
  }, 0);

  // const checkStockQuantities = async () => {
  //   try {
  //     const productDataPromises = cart.map(product => axiosClient.get(`/products/${product._id}`));
  //     const responses = await Promise.all(productDataPromises);


  //     for (let i = 0; i < responses.length; i++) {
  //       const latestProductData = responses[i].data.productById;
  //       const product = cart[i];
  //       console.log("latest:",latestProductData);
  //       console.log("product size:",product.size);
  //       console.log("latest product size: ",latestProductData.productById.sizes);


  //       // Check if the sizes object exists
  //       if (product.size && latestProductData.sizes && latestProductData.sizes[product.size]) {
  //         // Check the stock quantity for the selected size
  //         if (product.quantity > latestProductData.sizes[product.size]) {
  //           return false;
  //         }
  //       } else {
  //         console.error(`Sizes object not found for product ${product._id}`);
  //         return false;
  //       }
  //     }
  //   } catch (error) {
  //     console.error(`Failed to fetch product data: ${error}`);
  //     return false;
  //   }

  //   return true;
  // };
  // const handleCheckout = async () => {
  //   const isStockAvailable = await checkStockQuantities();
  
  //   if (!isStockAvailable) {
  //     toast.error("Some items in your cart are out of stock. Please adjust the quantities and try again.");
  //   } else {
  //     // Proceed with the checkout
  //     setIsModalOpen(true);
  //   }
  // };

  return (
    <>
    <ToastContainer/>
      <NavBar className="nav-bar-custom"/>
      <div className="cart-content-total">
        {cart.length > 0 ? (
          <>
            <h1 className="shopping-cart-title">Shopping Cart</h1>
            <div className="cart-items-total">
              <div className="product-column">
                <h4 className="column-header">Product</h4>
              </div>
              <div className="empty-column">
                <h4 className="column-header">&nbsp;</h4>
              </div>
              <div className="price-column">
                <h4 className="column-header">Unit Price</h4>
              </div>
              <div className="quantity-controls-column">
                <h4 className="column-header">Quantity </h4>
              </div>
              <div className="remove-button-column">
                <h4 className="column-header">Remove</h4>
              </div>
            </div>

            {cart.map((product) => (
              <div className="cart-items-total" key={`${product._id}-${product.size}`}>
                {/* Column 1: Product */}
                <div className="product-column">
                  <img src={product.image.url} alt="product-card" className="picture" />
                </div>

                {/* Column 2 */}
                <div className="empty-column">
                  <div className="product-details">
                    <h3 className="name">{product.name}</h3>
                    <p>Size: {product.size}</p>
                  </div>
                </div>

                {/* Column 3: Price */}
                <div className="price-column">
                  <h4 className="price">${product.price}</h4>
                </div>
               
                {/* Column 4: Quantity Controls */}
                <div className="quantity-controls-column">
                  <div className="quantity-controls">
                    <button className="less-button" onClick={() => decreaseQuantity(product._id,product.size)}>
                      -
                    </button>
                    <span>{product.quantity}</span>
                    <button className="plus-button" onClick={() => increaseQuantity(product._id,product.size)}>
                      +
                    </button>
                  </div>
                </div>

                {/* Column 5: Remove Button */}
                <div className="remove-button-column">
                  <button className="remove-button-total" onClick={() => removeFromCart(product._id,product.size)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}

              <div className="cart-total">
                <h3>Total Purchase: ${total}</h3>
                <div className="complete-purchase-column">
                  {/* <button className="complete-purchase-button" onClick={handleCheckout} > */}
                  <button className="complete-purchase-button" onClick={()=>setIsModalOpen(true)} >
                    Complete purchase
                  </button>
                </div>
              </div>
              <PurchaseModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
              />
          </>
        ) : (
          <div className="empty-cart-message"style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center"}}>
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

