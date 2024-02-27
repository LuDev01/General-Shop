import { useState, useEffect } from "react";
import { DataContext } from "./DataContext";
import axiosClient from "../../axiosConfig";

export const DataProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("role") || "Guest");
  const [data, setData] = useState([]);
  const [cart, setCart] = useState(()=>{
    const userId = role === "Guest" ? "" : localStorage.getItem("user"); // Get the useriD from local storage only if the role is not "Guest"
    const savedCart=localStorage.getItem(`myCart_${role}${userId ? "_" + userId : ""}`);
    if(savedCart){
      return JSON.parse(savedCart);
    }
    else{
      return [];
    }
  });

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

  useEffect(() => {
    // Save the cart to localStorage whenever it changes
    const userId = role === "Guest" ? "" : localStorage.getItem("user"); // Get the token from local storage 
    localStorage.setItem(`myCart_${role}${userId ? "_" + userId : ""}`, JSON.stringify(cart));
  }, [cart,role]);


  const addToCart = (product, size) => {

    // Find the product in the data state
    const productFromData = data.find((p) => p._id === product._id);
    if (!productFromData) {
      console.error(`Product with id ${product._id} not found in data`);
      return false;
    }
    // Find the size in the product details
    const sizeFromData = productFromData.sizes[size];
    if (!sizeFromData) {
      console.error(`Size ${size} not found in product with id ${product._id}`);
      return false;
    }

    let added = false;
    setCart((currentCart) => {
      const index = currentCart.findIndex((p) => p._id === product._id && p.size === size);

      if (index >= 0) {
        // The product is already in the cart
        if(currentCart[index].quantity<sizeFromData){
          // There are still products available, increment quantity
          const newCart = [...currentCart];
          newCart[index] = {...newCart[index],quantity: newCart[index].quantity + 1};
          added = true;
          return newCart;
        }
        else {
            // No more products available
            alert(`Sorry, there are only ${sizeFromData} products of size ${size}`);
            return currentCart;
        }

      } else {
        // The product is not in the cart, add it with quantity 1
        added = true;
        return [...currentCart, { ...product,sizes:{[size]:sizeFromData} ,size, quantity: 1 }];
      }
    });
    return added;
  };

  const removeFromCart = (productId, size) => {
    setCart((currentCart) => {
      const index = currentCart.findIndex((p) => p._id === productId && p.size === size);
      if (index >= 0) {
        const newCart = [...currentCart];
        // Remove the product from the cart
        newCart.splice(index, 1);
        return newCart;
      } else {
        return currentCart;
      }
    });
  };
  
  const increaseQuantity = (productId, size) => {
    // Find the product in the data state
    const productFromData = data.find(p => p._id === productId);
    if (!productFromData) {
        console.error(`Product with id ${productId} not found in data`);
        return;
    }

    // Find the size in the product details
    const sizeFromData = productFromData.sizes[size];
    if (!sizeFromData) {
        console.error(`Size ${size} not found in product with id ${productId}`);
        return;
    }

    setCart((currentCart) => {
        const index = currentCart.findIndex((p) => p._id === productId && p.size === size);
        if (index >= 0) {
            // The product is already in the cart
            if (currentCart[index].quantity < sizeFromData) {
                // There are still products available, increment quantity
                const newCart = [...currentCart];
                newCart[index] = { ...newCart[index], quantity: newCart[index].quantity + 1 };
                return newCart;
            } else {
                // No more products available
                alert(`Sorry, there are only ${sizeFromData} products of size ${size}`);
                return currentCart;
            }
        } else {
            return currentCart;
        }
    });
};

const decreaseQuantity = (productId, size) => {
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


const clearCart=()=>{
    setCart([]);
}
  return (
    <DataContext.Provider
      value={{data, cart,setCart,role,setRole, addToCart,removeFromCart,increaseQuantity,decreaseQuantity,clearCart}} >{children}
    </DataContext.Provider>
  );
};
