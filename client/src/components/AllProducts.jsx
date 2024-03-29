import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Notification from "./Notification";
import axiosClient from "../axiosConfig";
import NoData from "./assets/NoData.jpg";
import { useContext } from "react";
import { DataContext } from "./context/DataContext";
import {useNavigate} from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import './Products.css'

export const AllProducts = () => {
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
  const { cart, addToCart } = useContext(DataContext);

  const handleAddToCart = (product) => {
    toast.success("Product added to your cart!");
    addToCart(product);
  };

  return (
    <>
    <ToastContainer/>
      <Row xs={1} md={4} className="g-4">
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
                  <Card.Text>Price: ${product.price}</Card.Text>
                  <Notification productById={product._id} />

                  <button type="submit" size="lg" className="submit-button " onClick={() =>navigate(`/productDetails/${product._id}`) }>Product details</button>
                  {/* <button type="submit" size="lg" className="submit-button add-to-cart btn btn-outline-info " onClick={() => handleAddToCart(product)}>Add to cart</button> */}
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
};
