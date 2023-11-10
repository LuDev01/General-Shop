import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { products } from "./Products";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./Products.css";
import CardBody from "react-bootstrap/esm/CardBody";
import CardTitle from "react-bootstrap/esm/CardTitle";
import CardSubtitle from "react-bootstrap/esm/CardSubtitle";
import Dropdown from "react-bootstrap/Dropdown";
import { NavBar } from "./NavBar";

export const ProductDetails = () => {
  const { productId } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const product = products.find(
    (products) => products.id === parseInt(productId)
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <NavBar />
      <Card style={{ margin: "6rem" }}>
        <Row>
          <Col>
            <img src={product.image} alt="{product.name}" />
          </Col>
          <Col>
            <CardBody className="product-display">
              <CardTitle>
                <p>{product.description}</p>
              </CardTitle>
              <CardSubtitle style={{ fontWeight: "bold" }}>
                Price: {product.price}
              </CardSubtitle>{" "}
              <CardSubtitle
                className="sizes-display"
                style={{ fontWeight: "bold", marginTop: "2rem" }}
              >
                Sizes:
                <Dropdown>
                  <Dropdown.Toggle variant="info" id="dropdown-basic">
                    {selectedSize || "Choose your size"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {product.size.map((size) => (
                      <Dropdown.Item
                        key={size}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </CardSubtitle>
              <div className="product-info">
                <h3>Product information</h3>
                <p>Product information details</p>
              </div>
            </CardBody>
          </Col>
        </Row>
      </Card>
    </>
  );
};
