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
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import axiosClient from "../axiosConfig";
import "./Products.css";
import "react-toastify/dist/ReactToastify.css";

export const ProductDetails = () => {
  const [data, setData] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [displayedSize, setDisplayedSize] = useState(null);
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
    addToCart(data, selectedSize);
  };

  return (
    <>
      <ToastContainer />
      <NavBar />
      <Card style={{ margin: "8rem 6rem" }}>
        <Row>
          <Col className="col-prod-details text-center">
            {data && data.image && (
              <img src={data.image.url} alt="{data.name}" />
            )}
          </Col>
          <Col className="col-prod-details">
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
                  <Dropdown.Toggle variant="info" id="dropdown-basic" >
                    {selectedSize || "Choose your size"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu >
                    {Object.keys(data.sizes).map((size) => (
                      <Dropdown.Item
                        key={size}
                        onClick={() => {
                          setDisplayedSize(size);
                          if (data.sizes[size] === 0) {
                            toast.error(`Size ${size} is out of stock :(`);
                            setSelectedSize(null);
                          } else {
                            setSelectedSize(size);
                          }
                        }}
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
                      {displayedSize && (
                        <tr>
                          <td>{displayedSize}</td>
                          <td>
                            {data.sizes[displayedSize] === 0
                              ? "Out of stock"
                              : data.sizes[displayedSize]}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                  {displayedSize && data.sizes[displayedSize] === 0 && (
                    <p style={{ color: "red" }}>
                      The size {displayedSize} is not available.
                    </p>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => setModalShow(false)}>Close</Button>
                </Modal.Footer>
              </Modal>

              <br />

              {!selectedSize ? (
                <OverlayTrigger
                  overlay={
                    <Tooltip id="tooltip-disabled">
                      Please, select an available size to continue
                    </Tooltip>
                  }
                >
                  <span className="d-inline-block">
                    <Button
                      variant="info"
                      disabled={
                        !selectedSize ||
                        (selectedSize && data.sizes[selectedSize] === 0)
                      }
                      onClick={() => {
                        if (selectedSize && data.sizes[selectedSize] !== 0) {
                          handleAddToCart({ ...data, size: selectedSize });
                        }
                      }}
                      style={{ pointerEvents: "none" }}
                    >
                      {selectedSize ? "Add to Cart" : "Add to Cart"}
                    </Button>
                  </span>
                </OverlayTrigger>
              ) : (
                <Button
                  variant="info"
                  disabled={
                    !selectedSize ||
                    (selectedSize && data.sizes[selectedSize] === 0)
                  }
                  onClick={() => {
                    if (selectedSize && data.sizes[selectedSize] !== 0) {
                      handleAddToCart({ ...data, size: selectedSize });
                    }
                  }}
                >
                  {selectedSize ? "Add to Cart" : "Add to Cart"}
                </Button>
              )}
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
