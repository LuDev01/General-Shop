import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import {jwtDecode} from 'jwt-decode';


export const Test = () => {
  const [name,setName]=useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); 
    const userId = jwtDecode(token);
    fetch("http://localhost:5000/products/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",

      body: JSON.stringify({
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
      }),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Form onSubmit={(e) => handleSubmit(e)}>
      <Form.Group className="mb">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter text"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group className="mb">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter text"
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter text"
            onChange={(e) => setBrand(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb">
          <Form.Label>Color</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter text"
            onChange={(e) => setColor(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Size</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter text"
            onChange={(e) => setSize(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter text"
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter text"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter text"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter text"
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};
