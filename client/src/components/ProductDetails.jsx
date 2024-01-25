import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/esm/Table";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CardBody from "react-bootstrap/esm/CardBody";
import CardTitle from "react-bootstrap/esm/CardTitle";
import CardSubtitle from "react-bootstrap/esm/CardSubtitle";
import Dropdown from "react-bootstrap/Dropdown";
import axiosClient from "../axiosConfig";
import "./Products.css";

export const ProductDetails = () => {
  const [data, setData] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [modalShow, setModalShow] = useState(false);

  const { id } = useParams(); // Access route parameters with useParams
  console.log("Product ID:", id);

  const getProductId = async () => {
    try {
      // const response = await axiosClient.get(`products/${props.id}`);
      const response = await axiosClient.get(`products/${id}`);
      console.log("this is the response of the server", response.data);
      setData(response.data.productById);
    } catch (error) {
      console.log("Error showing the products", error.message);
    }
  };
  useEffect(() => {
    getProductId();
  }, []);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevCount) => prevCount - 1);
    }
  };
  const handleIncrement = () => {
    if (quantity < 10) {
      setQuantity((prevCount) => prevCount + 1);
    }
  };

  if (!data) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <NavBar />
      <Card style={{ margin: "8rem 6rem " }}>
        <Row>
          <Col>
            <img src={data.image.url} alt="{data.name}" />
          </Col>
          <Col>
            <CardBody className="product-display">
              <CardTitle>
                <p>{data.description}</p>
              </CardTitle>
              <CardSubtitle style={{ fontWeight: "bold" }}>
                Price: {data.price}
              </CardSubtitle>
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
                    {Object.keys(data.sizes).map((size) => (
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
              <br />
              <Button variant="info" onClick={() => setModalShow(true)}>
                Check Store Availability
              </Button>
              <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Store availability
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Size</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedSize && (
                        <tr>
                          <td>{selectedSize}</td>
                          <td>{data.sizes[selectedSize]}</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => setModalShow(false)}>Close</Button>
                </Modal.Footer>
              </Modal>

              <br />
              <div className="row">
                <div className="col-md-3 mt-3">
                  <div className="input-group">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      className="input-group-text"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className="form-control text-center"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />

                    <button
                      type="button"
                      onClick={handleIncrement}
                      className="input-group-text"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="product-info">
                <h3>Product information</h3>
                <p>Product information details</p>
              </div>
            </CardBody>
          </Col>
        </Row>
      </Card>
      <Footer />
    </>
  );
};
