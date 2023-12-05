import { useContext } from "react";
import { dataContext } from "./context/DataContext";

import CartElements from "./CartElements"
import CartTotal from "./CartTotal";
import { NavBar } from './NavBar';

import "./CartContent.css";

const CartContent = () => {
    const { cart } = useContext(dataContext);

    return (
        <>
            <NavBar/>
            <div style={{ margin: "8rem" }}>

            </div>
            {cart.length > 0 ? (
                <>
                    <CartElements/>
                    <CartTotal/>
                </>
            ) : (
                <h4>Your cart is empty</h4>
            )}
        </>
    );
};

export default CartContent;