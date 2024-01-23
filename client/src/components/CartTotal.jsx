import { useContext } from "react";
import { dataContext } from "./context/DataContext";
import "./CartContent.css";

const CartTotal = () => {
  const { cart } = useContext(dataContext);

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


