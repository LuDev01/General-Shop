import React from "react";
import { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ImageContext } from "./context/ImageContext";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axiosClient from "../axiosConfig";
import "./RegisterForm.css";
import "react-toastify/dist/ReactToastify.css";

export const EditUser = (props) => {
  const [user, setUser] = useState({});
  const [image, setImage] = useState(props.image);
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [documentType, setDocumentType] = useState(props.documentType);
  const [document, setDocument] = useState(props.document);
  const [email, setEmail] = useState(props.email);
  const {
    imageURL,
    imageURLClient,
    updateImageURLAdmin,
    updateImageURLClient,
  } = useContext(ImageContext);
  const role = localStorage.getItem("role"); // get the role from localStorage
  const userId=localStorage.getItem("user");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("documentType", documentType);
    formData.append("document", document);
    formData.append("email", email);
    if(image){
      formData.append("image", image);
    }
    try {
      const response = await axiosClient.put(
        `users/${props.id}/edit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const newImageURL = response.data.user.image.url;
      if (role === "Admin") {
        updateImageURLAdmin(newImageURL);
        localStorage.setItem(`AdminImg_${userId}`, newImageURL);
      } else if (role === "Client") {
        updateImageURLClient(newImageURL);
        localStorage.setItem(`ClientImg_${userId}`, newImageURL);
      }

      toast.success("User edited successfully!");
      // props.refreshUser();
    } catch (error) {
      console.error("Error editing user:", error.message);
      toast.error("Error editing user");
    }
  };

  useEffect(() => {
    setImage(props.image);
    setFirstName(props.firstName);
    setLastName(props.lastName);
    setDocumentType(props.documentType);
    setDocument(props.document);
    setEmail(props.email);
  }, [props]);
  

  return (
    <>
      <ToastContainer />
      <Container>
        <Form className="custom-border" onSubmit={(e) => handleSubmit(e)}>
          <h1 className="signUp-title">Edit your personal information</h1>
          <Form.Group className="mb-3">
            <div className="text-center mx-auto mt-3 mb-3">
              <img
                src={role === "Admin" ? imageURL : imageURLClient}
                style={{ borderRadius: "50%", width: "7rem", height: "8rem" }}
                alt="profile"
              />
            </div>
            <Form.Control
              type="file"
              name="image"
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);
                const newImageURL = URL.createObjectURL(file);
                if (role === 'Admin') {
                  updateImageURLAdmin(newImageURL);
                } else if (role === 'Client') {
                  updateImageURLClient(newImageURL);
                }
              }}
            />
          </Form.Group>

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
