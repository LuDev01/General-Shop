import { useContext } from "react";
import { DataContext } from "./context/DataContext";
import { NavBar } from './NavBar';
import "./CartContent.css";

const CartTotal = () => {
  const { cart } = useContext(DataContext);
  <NavBar/>

// Calculate the total by adding the numerical values of the prices
  const total = cart.reduce((acc, product) => {
    if (typeof product.price === 'number' && typeof product.quantity === 'number') {
      acc += product.price * product.quantity;
    }
    return acc;
  }, 0);

  return (
    <div className="cart-total">
      <h3>Total Purchase: ${total}</h3>
    </div>
  );
};

export default CartTotal;




