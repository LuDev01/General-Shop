import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import {jwtDecode} from 'jwt-decode';
import axiosClient from "../axiosConfig";
import axios from 'axios';


export const Test = (props) => {
  const [userId, setuserId] = useState("");
  const [name,setName]=useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  //Handle and convert img in base 64
   const handleImage = (e) => {
     const file = e.target.files[0];
     setFileToBase(file);
     console.log(file);
   }

   const setFileToBase = (file) => {
     const reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onloadend = () => {
       setImage(reader.result);
     }
   }

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); 
    const userId = jwtDecode(token);
    fetch("http://localhost:3000/crudProducts", {
      method: "POST",
      headers: {
        //"Content-Type": "application/json",
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
      .then((data) => console.log(data))
      .catch((error) => console.log("Error creando el producto", error));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const token = localStorage.getItem('token'); 
  //   const userId = jwtDecode(token);
  //   try {
  //     const response = await axiosClient.post("http://localhost:3000/crudProducts", {
  //       name,
  //       brand,
  //       category,
  //       color,
  //       size,
  //       price,
  //       quantity,
  //       description,
  //       image,
  //       userId,
  //     });

  //     alert("Product created successfully!");
  //     //props.refreshProducts();
  //     // handleClose();
  //   } catch (error) {
  //     console.error("Error creating product:", error.message);
  //     alert("Product creation failed. Please try again.");
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const {data} = await axiosClient.post('/crudProducts', {name, brand, category, color, size, price, quantity, description, image, userId})
  //     if (data.success === true){
  //       setName('');
  //       setBrand('');
  //       setCategory('');
  //       setColor('');
  //       setSize('');
  //       setPrice('');
  //       setQuantity('');
  //       setDescription('');
  //       setImage('');
  //       setuserId('');
  //       alert('Product created succesfully')
  //     }
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error,"Error creating product")
  //   }
  // }

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
            name="image"
            type="text"
            placeholder="Enter text"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control
            type="file"
            //accept="image/*"
            onChange={(e) => setImage(e.target.files)}
          />
        </Form.Group> 
        {/* <input type="file" name="image" id="" onChange={(e) => handleChange(e)}/> */}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};
