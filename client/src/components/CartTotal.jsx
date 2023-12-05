import { useContext } from "react";
import { dataContext } from "./context/DataContext";
import "./CartContent.css";

const CartTotal = () => {
    const {cart} = useContext(dataContext);

    const total = cart.reduce((acc,el) => acc + el.price, 0);
    return (
        <div className="cartTotal">
            <h3>Total to pay: ${total}</h3>
        </div>
    )
};

export default CartTotal