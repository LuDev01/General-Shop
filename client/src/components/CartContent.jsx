// CartContent.js

import React, { useContext } from "react";
import { dataContext } from "./context/DataContext";
import { NavBar } from './NavBar';
import CartElements from "./CartElements"
import "./CartContent.css";
import CartTotal from "./CartTotal";

export const CartContent = () => {
    const { cart } = useContext(dataContext);
  
    return (
      <>
        <NavBar />
        <div className="cartContentContainer">
          {cart.length > 0 ? (
            <>
              <CartElements />
              <CartTotal />
            </>
          ) : (
            <h4>Your cart is empty</h4>
          )}
        </div>
      </>
    );
};
