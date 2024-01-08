import React from 'react'
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axiosClient from "../axiosConfig";
import { FaEdit } from "react-icons/fa";

export const EditProduct = (props) => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState(props.name);
    const [brand, setBrand] = useState(props.brand);
    const [category, setCategory] = useState(props.category);
    const [color, setColor] = useState(props.color);
    const [size, setSize] = useState(props.size);
    const [price, setPrice] = useState(props.price);
    const [quantity, setQuantity] = useState(props.quantity);
    const [description, setDescription] = useState(props.description);
    const [image, setImage] = useState(props.image);
    const [userId,setUserId]=useState(props.userId)
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const handleSubmit = async (e) => {
        console.log(props.id);
        try {
          e.preventDefault();
          const response = await axiosClient.put(`products/${props.id}/edit`, {
            name,
            brand,
            category,
            color,
            size,
            price,  
            quantity,
            description,
            image,
            userId,
          });
          alert("Product edited successfully!");
          console.log(response.data)
          props.refreshProducts();
          handleClose();
        } catch (error) {
          console.error("Error editing product:", error.message);
          alert("Product edition failed. Please try again.");
        }
      };

  return (
    <>
    <FaEdit onClick={handleShow}/>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Size</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>
            <Modal.Footer>
              <Button type="submit" className="button-panel-left">
                Save Changes
              </Button>
              <Button variant="danger" onClick={handleClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
