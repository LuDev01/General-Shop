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
    const [userId,setUserId]=useState(props.id)
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
      
    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('brand', brand);
        formData.append('category', category);
        formData.append('color', color);
        formData.append('size', size);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('description', description);
        formData.append('image', image);
        formData.append('userId', userId);
    
        const response = await axiosClient.put(`products/${props.id}/edit`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        props.refreshProducts();
        handleClose();
      } catch (error) {
        console.error("Error editing product:", error.message);
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
                type="file"
                placeholder="Enter text"
                name="image"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImage(file); 
                }}
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
