import { useContext } from "react";
import { dataContext } from "./context/DataContext";
import { NavBar } from './NavBar';
import "./CartContent.css";

const CartTotal = () => {
  const { cart } = useContext(dataContext);
  <NavBar/>

// Calculate the total by adding the numerical values of the prices
  const total = cart.reduce((acc, product) => {
    if (typeof product.price === 'number') {
      acc += product.price;
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




