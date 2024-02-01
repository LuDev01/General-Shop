import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { DataContext } from "./context/DataContext";
import { ToastContainer, toast } from "react-toastify";
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
import "react-toastify/dist/ReactToastify.css";

export const ProductDetails = () => {
  const [data, setData] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const { addToCart } = useContext(DataContext);

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

  if (!data) {
    return <div>Product not found</div>;
  }
  const handleAddToCart = (data) => {
    toast.success("Product added to your cart!");
    addToCart(data);
  };

  return (
    <>
      <ToastContainer />
      <NavBar />
      <Card style={{ margin: "8rem 6rem " }}>
        <Row>
          <Col>
            {data && data.image && (
              <img src={data.image.url} alt="{data.name}" />
            )}
          </Col>
          <Col>
            <CardBody className="product-display">
              <CardTitle>
                <h2>{data.name}</h2>
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
              <br />
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
              <Button
                variant="info"
                disabled={!selectedSize}
                onClick={() => {
                  if (selectedSize) {
                    handleAddToCart({ ...data, size: selectedSize });
                  }
                }}
              >
                {selectedSize ? "Add to Cart" : "Select a Size"}
              </Button>
              <div className="product-info">
                <h3>Product information</h3>
                <p>{data.description}</p>
              </div>
            </CardBody>
          </Col>
        </Row>
      </Card>
      <Footer />
    </>
  );
};
