import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Notification from "./Notification";
import axiosClient from "../axiosConfig";
import { useState, useEffect } from "react";


export const AllProducts = () => {
  const [data, setData] = useState([]);
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

  return (
    <>
      <Row xs={1} md={3} className="g-4 m-4 ">
        {data &&
          data.map((el) => (
            <Col key={el._id}>
              <Card className="product-cards">
                <Card.Img
                  className="products-img"
                  variant="top"
                  src={`https://res.cloudinary.com/generalshop/image/upload/v1705014943/onlineShop/${el._id}.png`}
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
    </>
  );
};
