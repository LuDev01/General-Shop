import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './PurchaseModal.css'

export const PurchaseModal = ({ isOpen, onRequestClose, onPurchaseComplete }) => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [nameError, setNameError] = useState('');

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
    validateName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const validateName = (name) => {
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      setNameError('Please enter a valid name with only letters and spaces.');
    } else {
      setNameError('');
    }
  };

  const handleSendOrder = () => {
    // Logic of sending the order and displaying messages
    if (!isFormValid()) {
      toast.error('Please fill in all required fields correctly.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } else {
      // Logic to send the order if necessary
      toast.success("Thanks for your purchase! Your order will arrive in 3 days 🛍️.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      onPurchaseComplete();
      onRequestClose();
    }
  };

  const isFormValid = () => {
    return fullName.trim() !== '' && address.trim() !== '' && nameError === '';
  };


  return (
    <>
      <ToastContainer/>
        <Modal show={isOpen} onHide={onRequestClose}>
          <Modal.Header closeButton>
            <Modal.Title className='shipment-info-title'>Shipment information</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <h5 className='info-title'>Enter Your Information</h5>
            <form className='purchase-form'>
              <label className='name-form'>Full name: </label>
              <input
                type="text"
                id="nameInput"
                placeholder="Enter your full name"
                className='name-input'
                value={fullName}
                onChange={handleFullNameChange}
              />
              {/* Display name error message if present */}
              {nameError && <div className="error-message">{nameError}</div>}
              <label className='address-form'>Address: </label>
              <input
                type="text"
                id="addressInput"
                placeholder="Enter your address"
                className='address-input'
                value={address}
                onChange={handleAddressChange}
              />
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={onRequestClose}>
              Cancel
            </Button>
            <Button onClick={handleSendOrder} disabled={!isFormValid}>
              Send order
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  );
};