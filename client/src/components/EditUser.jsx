import React from "react";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axiosClient from "../axiosConfig";
import "./RegisterForm.css";

export const EditUser = (props) => {
  const [user, setUser] = useState({});

  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [documentType, setDocumentType] = useState(props.documentType);
  const [document, setDocument] = useState(props.document);
  const [email, setEmail] = useState(props.email);

  // const [errors, setErrors] = useState({
  //     firstName: "",
  //     lastName: "",
  //     documentType: "",
  //     document: "",
  //     email: "",
  //   });

  //   const [emailExists, setEmailExists] = useState(false);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const response = await axiosClient.get(`user/${props.id}`); // Send a GET request to your user endpoint
  //     const user = response.data;
  //   };
  //   fetchUser();
  // }, []);

  const handleSubmit = async (e) => {
    console.log(props.id);
    try {
      e.preventDefault();
      const token = localStorage.getItem("token"); // Get the token from local storage
      // const config = {
      //   headers: { Authorization: `Bearer ${token}` }, // Add the token to the request headers
      // };
      const response = await axiosClient.put(
        `users/${props.id}/edit`,
        {
          firstName,
          lastName,
          documentType,
          document,
          email,
        },
        // config
      );
      console.log(response.data);
      // props.refreshUser();
    } catch (error) {
      console.error("Error editing user:", error.message);
    }
  };

  return (
    <>
      <Container>
        <Form className="custom-border" onSubmit={(e) => handleSubmit(e)}>
          <h1 className="signUp-title">Edit your personal information</h1>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>First Name*</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {/* {errors.firstName && (
                      <div className="error-message">{errors.firstName}</div>
                    )} */}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Last Name*</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {/* {errors.lastName && (
                      <div className="error-message">{errors.lastName}</div>
                    )} */}
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Document Type*</Form.Label>
                <Form.Select
                  name="documentType"
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                >
                  <option>Choose one</option>
                  <option>ID Card</option>
                  <option>Passport</option>
                  <option>Foreign ID</option>
                  <option>Other</option>
                </Form.Select>
                {/* {errors.documentType && (
                          <div className="error-message">
                            {errors.documentType}
                          </div>
                        )} */}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Number *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your ID"
                  name="document"
                  value={document}
                  onChange={(e) => setDocument(e.target.value)}
                />
                {/* {errors.document && (
                          <div className="error-message">{errors.document}</div>
                        )} */}
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address *</Form.Label>
            <Form.Control
              type="email"
              placeholder="Your email address"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {/* {errors.email && (
                      <div className="error-message">{errors.email}</div>
                    )} */}
          </Form.Group>
          <Button
            type="submit"
            variant="flat"
            className="submit-button btn btn-outline-info"
          >
            Save changes
          </Button>
        </Form>
      </Container>
    </>
  );
};
