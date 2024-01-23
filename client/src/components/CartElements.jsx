import { useContext } from "react";
import { dataContext } from "./context/DataContext";
import "./CartContent.css";

export const CartElements = () => {
    const {cart} = useContext(dataContext);
    return (
        <>
            {cart.map((product) => {
                return (
                    <div className="cartContent" key={product._id}>
                        <img src={product.image.url} alt="product-card" />
                        <h3 className="name">{product.name}</h3>
                        <h4 className="price">{product.price}</h4>
                    </div>
                );
            })}
        </>
    );
}

export default CartElements;
