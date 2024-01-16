import {useEffect,useState} from "react";
import { NavBar } from "./NavBar";
import {Footer} from "./Footer";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Notification from "./Notification";
import axiosClient from "../axiosConfig";
import "./Products.css";

export const WomenProducts = () => {
  const [data, setData] = useState([]);
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
  return (
    <>
      <NavBar />
      <h1 style={{ margin: "7rem", textAlign: "center" }}>
        Women Products Section
      </h1>
      <Row xs={1} md={3} className="g-4 m-4 ">
        {data
          .filter((el) =>  ["woman", "women"].includes(el.category.toLowerCase()))
          .map((el) => (
            <Col key={el._id}>
              <Card className="product-cards">
                <Card.Img
                  className="products-img"
                  variant="top"
                  src={el.image.url}
                />
                <Card.Body>
                  <Card.Title>{el.name}</Card.Title>
                  <Card.Text>{el.description}</Card.Text>
                  <Card.Text>Price: {el.price}</Card.Text>
                  <Notification productId={el._id} />
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
      <Footer/>
    </>
  );
};
