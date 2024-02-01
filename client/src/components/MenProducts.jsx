import { useState, useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import { DataContext } from "./context/DataContext";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Notification from "./Notification";
import axiosClient from "../axiosConfig";
import "./Products.css";

export const MenProducts = () => {
  const [data, setData] = useState([]);
  const {addToCart } = useContext(DataContext);
  const navigate = useNavigate();
  
  const getProduct = async () => {
    try {
      const response = await axiosClient.get("products");
      setData(response.data.products);
    } catch (error) {
      console.error("Error showing product", error.message);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleAddToCart = (product) => {
    toast.success("Product added to your cart!");
    addToCart(product);
  };
  return (
    <>
      <ToastContainer />
      <NavBar />
      <h1 style={{ margin: "7rem", textAlign: "center" }}>
        Men Products Section{" "}
      </h1>
      <Row xs={1} md={3} className="g-4 m-4 ">
        {data
          .filter((product) =>
            ["man", "men"].includes(product.category.toLowerCase())
          )
          .map((product) => (
            <Col key={product._id}>
              <Card className="product-cards">
                <Card.Img
                  className="products-img"
                  variant="top"
                  src={product.image.url}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text>Price: {product.price}</Card.Text>
                  <Notification productId={product._id} />
                  <button type="submit" size="lg" className="submit-button btn btn-outline-warning" onClick={() =>navigate(`/productDetails/${product._id}`) }>Product details</button>
                  <button type="submit" size="lg" className="submit-button add-to-cart btn btn-outline-info " onClick={() => handleAddToCart(product)}>Add to cart</button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
      <Footer />
    </>
  );
};
