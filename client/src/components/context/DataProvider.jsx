import { useState, useEffect } from 'react';
import { DataContext } from './DataContext';
import axiosClient from '../../axiosConfig';

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Getting the products
                const response = await axiosClient.get("products");
                setData(response.data.products);
            } catch (error) {
                console.error("Error fetching products:", error.message);
            }
        };

        fetchData();
    }, []); 

    // const addToCart = (product) => {    
    //     setCart((cart) => [...cart, product]);
    // };

    const addToCart = (product,size) => {
        setCart((currentCart) => {
            const index = currentCart.findIndex((p) => p._id === product._id && p.size === size);
            if (index >= 0) {
                // The product is already in the cart, increment quantity
                const newCart = [...currentCart];
                newCart[index] = { ...newCart[index], quantity: newCart[index].quantity + 1 };
                return newCart;
            } else {
                // The product is not in the cart, add it with quantity 1
                return [...currentCart, { ...product,size, quantity: 1 }];
            }
        });
    };


    const removeFromCart = (productId,size) => {
        setCart((currentCart) => {
            const index = currentCart.findIndex((p) => p._id === productId && p.size === size);
            if (index >= 0) {
                const newCart = [...currentCart];
                if (newCart[index].quantity > 1) {
                    // If the product quantity is more than 1, decrease it by 1
                    newCart[index] = { ...newCart[index], quantity: newCart[index].quantity - 1 };
                } else {
                    // If the product quantity is 1, remove the product from the cart
                    newCart.splice(index, 1);
                }
                return newCart;
            } else {
                return currentCart;
            }
        });
    };

    const increaseQuantity = (productId,size) => {
        setCart((currentCart) => {
            const index = currentCart.findIndex((p) => p._id === productId && p.size === size);
            if (index >= 0) {
                const newCart = [...currentCart];
                newCart[index] = { ...newCart[index], quantity: newCart[index].quantity + 1 };
                return newCart;
            } else {
                return currentCart;
            }
        });
    };
    
    const decreaseQuantity = (productId,size) => {
        setCart((currentCart) => {
            const index = currentCart.findIndex((p) => p._id === productId && p.size === size);
            if (index >= 0 && currentCart[index].quantity > 1) {
                const newCart = [...currentCart];
                newCart[index] = { ...newCart[index], quantity: newCart[index].quantity - 1 };
                return newCart;
            } else {
                return currentCart;
            }
        });
    };
    
    
    return (
        <DataContext.Provider value={{ data, cart, addToCart, removeFromCart,increaseQuantity,decreaseQuantity }}>
            {children}
        </DataContext.Provider>
    );
};