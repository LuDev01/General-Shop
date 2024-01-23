import { useContext } from "react";
import { dataContext } from "./context/DataContext";
import { NavBar } from './NavBar';
import "./CartContent.css";

const CartTotal = () => {
  const { cart } = useContext(dataContext);
  <NavBar/>

  // Calcular el total sumando los valores numéricos de los precios
  const total = cart.reduce((acc, product) => {
    if (typeof product.price === 'number') {
      acc += product.price;
    }
    return acc;
  }, 0);

  return (
    <div className="cartTotal">
      <h3>Total a pagar: ${total}</h3>
    </div>
  );
};

export default CartTotal;


