import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Notification from "./Notification";
import axiosClient from "../axiosConfig";
import NoData from "./assets/NoData.jpg";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { dataContext } from "./context/DataContext";
import './Products.css'
import {useNavigate} from 'react-router-dom';

export const AllProducts = (productId) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  console.log("this is the data ", data);
  const getProduct = async () => {
    try {
      const response = await axiosClient.get("products");
      console.log("this is the response of the server", response.data);
      setData(response.data.products);
    } catch (error) {
      console.log("Error showing the products", error.message);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  //Carrito
  const { cart, addToCart } = useContext(dataContext);

  const handleAddToCart = (product) => {
    
    toast.success("Product added to your cart!");
    addToCart(product);
  };

  return (
    <>
      <Row xs={1} md={5} className="g-4 m-4 ">
        {data &&
          data.map((product) => (
            <Col key={product._id}>
              <Card className="product-cards">
                <Card.Img
                  className="products-img"
                  variant="top"
                  src={product.image ? product.image.url : NoData}
                  onError={(e) => {
                    e.target.onerror = null; // Prevents infinite looping in case default image also fails to load
                    e.target.src = NoData;
                  }}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text>Price: ${product.price}</Card.Text>
                  <Notification productId={product._id} />
                  {/* <Button onClick={() => handleAddToCart(el)}>Add to Cart</Button> */}
                  {/* <button
                    type="submit"
                    size="lg"
                    className="submit-button btn btn-outline-info mb-3"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to cart Majo
                  </button> */}
                  <button type="submit" size="lg" className="submit-button btn btn-outline-warning" onClick={() =>navigate(`/productDetails/${productId}`) }>Product details</button>
                  <button type="submit" size="lg" className="submit-button add-to-cart btn btn-outline-info " onClick={() => handleAddToCart(product)}>Add to cart</button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
};
