import { useContext } from "react";
import { dataContext } from "./context/DataContext";
import "./CartContent.css";

const CartTotal = () => {
  const { cart } = useContext(dataContext);

  // Función para extraer el valor numérico de la cadena de precio
  const extractNumericValue = (priceString) => {
    const numericValue = parseFloat(priceString.replace(/[^\d.]/g, ''));
    return isNaN(numericValue) ? 0 : numericValue;
  };

  // Calcular el total sumando los valores numéricos de los precios
  const total = cart.reduce((acc, product) => acc + extractNumericValue(product.price), 0);

  return (
    <div className="cartTotal">
      <h3>Total to pay: ${total}</h3>
    </div>
  );
};

export default CartTotal;
