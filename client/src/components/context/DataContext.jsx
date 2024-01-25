import { createContext, useState, useEffect } from 'react';
import axiosClient from '../../axiosConfig';

export const dataContext = createContext();

const DataProvider = ({ children }) => {
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

    const addToCart = (product) => {
        setCart((cart) => [...cart, product]);
    };

    return (
        <dataContext.Provider value={{ data, cart, addToCart }}>
            {children}
        </dataContext.Provider>
    );
};

export default DataProvider;
