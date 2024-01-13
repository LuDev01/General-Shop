import React from 'react'
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { MdDelete } from "react-icons/md";
import axiosClient from "../axiosConfig";

export const DeleteProduct = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.delete(`products/${props.id}/delete`);
      props.refreshProducts();
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };
  return (
    <>
    <MdDelete onClick={handleShow}/>
    <Modal show={show} onHide={handleClose}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Modal.Header closeButton>
            <Modal.Title>You're about to delete your product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you completely sure you want to delete the selected product?
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" className="button-panel-left">
              Yes, I'm sure!
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Nope
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
